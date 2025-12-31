
from datetime import datetime, timedelta, timezone
from typing import Annotated, cast
from zoneinfo import ZoneInfo

import ariblib.constants
from fastapi import APIRouter, Body, Depends, Query

from app import logging, schemas
from app.routers.ReservationConditionsRouter import EncodeEDCBSearchKeyInfo
from app.routers.ReservationsRouter import GetCtrlCmdUtil
from app.utils.edcb import EventInfo, SearchKeyInfo
from app.utils.edcb.CtrlCmdUtil import CtrlCmdUtil
from app.utils.edcb.EDCBUtil import EDCBUtil
from app.utils.TSInformation import TSInformation


# ルーター
router = APIRouter(
    tags = ['Programs'],
    prefix = '/api/programs',
)


def DecodeEDCBEventInfo(event_info: EventInfo) -> schemas.Program:
    """
    EDCB の EventInfo オブジェクトを schemas.Program オブジェクトに変換する
    Program.updateFromEDCB() での変換処理を移植したもの

    Args:
        event_info (EventInfo): EDCB の EventInfo オブジェクト

    Returns:
        schemas.Program: schemas.Program オブジェクト
    """

    # 番組タイトル・番組概要
    title: str = ''
    description: str = ''
    if 'short_info' in event_info:
        title = TSInformation.formatString(event_info['short_info']['event_name']).strip()
        description = TSInformation.formatString(event_info['short_info']['text_char']).strip()

    # 番組詳細
    detail: dict[str, str] = {}
    if 'ext_info' in event_info:

        # 番組詳細テキストから取得した、見出しと本文の辞書ごとに
        for head, text in EDCBUtil.parseProgramExtendedText(event_info['ext_info']['text_char']).items():

            # 見出しと本文
            ## 見出しのみ ariblib 側で意図的に重複防止のためのタブ文字付加が行われる場合があるため、
            ## strip() では明示的に半角スペースと改行のみを指定している
            head_hankaku = TSInformation.formatString(head).replace('◇', '').strip(' \r\n')  # ◇ を取り除く
            ## ないとは思うが、万が一この状態で見出しが衝突しうる場合は、見出しの後ろにタブ文字を付加する
            while head_hankaku in detail.keys():
                head_hankaku += '\t'
            ## 見出しが空の場合、固定で「番組内容」としておく
            if head_hankaku == '':
                head_hankaku = '番組内容'
            text_hankaku = TSInformation.formatString(text).strip()
            detail[head_hankaku] = text_hankaku

            # 番組概要が空の場合、番組詳細の最初の本文を概要として使う
            # 空でまったく情報がないよりかは良いはず
            if description.strip() == '':
                description = text_hankaku

    # 番組開始時刻
    ## 万が一取得できなかった場合は 1970/1/1 9:00 とする
    start_time = event_info.get('start_time', datetime(1970, 1, 1, 9, tzinfo=ZoneInfo('Asia/Tokyo')))

    # 番組終了時刻
    ## 終了時間未定の場合、とりあえず5分とする
    end_time = start_time + timedelta(seconds=event_info.get('duration_sec', 300))

    # schemas.Program オブジェクトを作成
    program = schemas.Program(
        id = f'NID{event_info["onid"]}-SID{event_info["sid"]:03d}-EID{event_info["eid"]}',
        channel_id = f'NID{event_info["onid"]}-SID{event_info["sid"]:03d}',
        network_id = event_info['onid'],
        service_id = event_info['sid'],
        event_id = event_info['eid'],
        title = title,
        description = description,
        detail = detail,
        start_time = start_time,
        end_time = end_time,
        duration = (end_time - start_time).total_seconds(),
        is_free = bool(event_info['free_ca_flag'] == 0),
        genres = [],
        video_type = None,
        video_codec = None,
        video_resolution = None,
        primary_audio_type = '',
        primary_audio_language = '',
        primary_audio_sampling_rate = '',
        secondary_audio_type = None,
        secondary_audio_language = None,
        secondary_audio_sampling_rate = None,
    )

    # ジャンル
    ## 数字だけでは開発中の視認性が低いのでテキストに変換する
    program.genres = []  # デフォルト値
    content_info = event_info.get('content_info')
    if content_info is not None:
        for content_data in content_info['nibble_list']:  # ジャンルごとに

            # 大まかなジャンルを取得
            genre_tuple = ariblib.constants.CONTENT_TYPE.get(content_data['content_nibble'] >> 8)
            if genre_tuple is not None:

                # major … 大分類
                # middle … 中分類
                genre_dict: schemas.Genre = {
                    'major': genre_tuple[0].replace('／', '・'),
                    'middle': genre_tuple[1].get(content_data['content_nibble'] & 0xf, '未定義').replace('／', '・'),
                }

                # BS/地上デジタル放送用番組付属情報がジャンルに含まれている場合、user_nibble から値を取得して書き換える
                # たとえば「中止の可能性あり」や「延長の可能性あり」といった情報が取れる
                if genre_dict['major'] == '拡張':
                    if genre_dict['middle'] == 'BS/地上デジタル放送用番組付属情報':
                        user_nibble = (content_data['user_nibble'] >> 8 << 4) | (content_data['user_nibble'] & 0xf)
                        genre_dict['middle'] = ariblib.constants.USER_TYPE.get(user_nibble, '未定義')
                    # 「拡張」はあるがBS/地上デジタル放送用番組付属情報でない場合はなんの値なのかわからないのでパス
                    else:
                        continue

                # ジャンルを追加
                program.genres.append(genre_dict)

    # 映像情報
    ## テキストにするために ariblib.constants や TSInformation の値を使う
    program.video_type = None
    program.video_codec = None
    program.video_resolution = None
    component_info = event_info.get('component_info')
    if component_info is not None:
        ## 映像の種類
        component_types = ariblib.constants.COMPONENT_TYPE.get(component_info['stream_content'])
        if component_types is not None:
            program.video_type = component_types.get(component_info['component_type'])
        ## 映像のコーデック
        program.video_codec = TSInformation.STREAM_CONTENT.get(component_info['stream_content'])
        ## 映像の解像度
        program.video_resolution = TSInformation.COMPONENT_TYPE.get(component_info['component_type'])

    # 音声情報
    program.primary_audio_type = ''
    program.primary_audio_language = ''
    program.primary_audio_sampling_rate = ''
    program.secondary_audio_type = None
    program.secondary_audio_language = None
    program.secondary_audio_sampling_rate = None
    audio_info = event_info.get('audio_info')
    if audio_info is not None and len(audio_info['component_list']) > 0:

        ## 主音声
        audio_component_info = audio_info['component_list'][0]
        program.primary_audio_type = ariblib.constants.COMPONENT_TYPE[0x02].get(audio_component_info['component_type'], '')
        program.primary_audio_sampling_rate = ariblib.constants.SAMPLING_RATE.get(audio_component_info['sampling_rate'], '')
        ## 2021/09 現在の EDCB では言語コードが取得できないため、日本語か英語で固定する
        ## EpgDataCap3 のパーサー止まりで EDCB 側では取得していないらしい
        program.primary_audio_language = '日本語'
        ## デュアルモノのみ
        if program.primary_audio_type == '1/0+1/0モード(デュアルモノ)':
            if audio_component_info['es_multi_lingual_flag'] != 0:  # デュアルモノ時の多言語フラグ
                program.primary_audio_language += '+英語'
            else:
                program.primary_audio_language += '+副音声'

        # 副音声（存在する場合）
        if len(audio_info['component_list']) > 1:
            audio_component_info = audio_info['component_list'][1]
            program.secondary_audio_type = ariblib.constants.COMPONENT_TYPE[0x02].get(audio_component_info['component_type'], '')
            program.secondary_audio_sampling_rate = ariblib.constants.SAMPLING_RATE.get(audio_component_info['sampling_rate'], '')
            ## 2021/09 現在の EDCB では言語コードが取得できないため、副音声で固定する
            ## 英語かもしれないし解説かもしれない
            program.secondary_audio_language = '副音声'
            ## デュアルモノのみ
            if program.secondary_audio_type == '1/0+1/0モード(デュアルモノ)':
                if audio_component_info['es_multi_lingual_flag'] != 0:  # デュアルモノ時の多言語フラグ
                    program.secondary_audio_language += '+英語'
                else:
                    program.secondary_audio_language += '+副音声'

    return program


@router.post(
    '/search',
    summary = '番組検索 API',
    response_description = '検索結果の番組情報のリスト。',
    response_model = schemas.Programs,
)
async def ProgramSearchAPI(
    program_search_condition: Annotated[schemas.ProgramSearchCondition, Body(description='番組検索条件。')],
    edcb: Annotated[CtrlCmdUtil, Depends(GetCtrlCmdUtil)],
):
    """
    番組情報を検索する。
    """

    # schemas.ProgramSearchCondition オブジェクトを SearchKeyInfo オブジェクトに変換
    search_key_info = await EncodeEDCBSearchKeyInfo(program_search_condition)

    # EDCB の EPG ストアに保存されているすべての番組情報を検索
    ## 過去番組は検索対象外
    event_info_list: list[EventInfo] | None = await edcb.sendSearchPg([cast(SearchKeyInfo, search_key_info)])
    if event_info_list is None:
        # None が返ってきた場合は空のリストを返す
        return schemas.Programs(total=0, programs=[])

    # EDCB の EventInfo オブジェクトを schemas.Program オブジェクトに変換
    programs = [DecodeEDCBEventInfo(event_info) for event_info in event_info_list]

    return schemas.Programs(total=len(programs), programs=programs)


@router.get(
    '/timetable',
    summary = 'EDCB 番組表 API',
    response_description = 'EDCB 番組表データ。',
    response_model = schemas.EDCBEPGData,
)
async def EDCBTimetableAPI(
    edcb: Annotated[CtrlCmdUtil, Depends(GetCtrlCmdUtil)],
    date_offset: Annotated[int, Query(alias='date', description='日付オフセット (0: 当日, 1: 翌日, -1: 前日, ...)')] = 0,
):
    """
    EDCB から番組表データを取得し、番組表 UI 向けの形式で返す API。
    Program.updateFromEDCB() のロジックを参考にして実装。
    """

    logging.info(f'[ProgramsRouter][EDCBTimetableAPI] Fetching EDCB EPG data: date_offset={date_offset}')

    # 指定された日付の開始時刻と終了時刻を計算（4時始まり）
    base_date = datetime.now(ZoneInfo('Asia/Tokyo')).replace(hour=4, minute=0, second=0, microsecond=0)
    target_date = base_date + timedelta(days=date_offset)
    start_time = target_date
    end_time = target_date + timedelta(hours=24)

    # EDCB から番組情報を取得
    # 指定された日付範囲の番組を取得
    edcb.setConnectTimeOutSec(30)  # タイムアウトを30秒に設定

    # EDCB の sendEnumPgInfoEx を使って番組情報を取得
    # 引数: [マスク, サービスID, 開始時刻(FILETIME), 終了時刻(FILETIME)]
    # FILETIME は UTC 基準なので、UTC に変換した上で変換する
    start_ft = EDCBUtil.datetimeToFileTime(start_time.astimezone(timezone.utc))
    end_ft = EDCBUtil.datetimeToFileTime(end_time.astimezone(timezone.utc))
    service_event_info_list = await edcb.sendEnumPgInfoEx([
        0xffffffffffff,  # マスク (全サービス)
        0xffffffffffff,  # サービス ID (全サービス)
        start_ft,        # 開始時刻 (FILETIME)
        end_ft,          # 終了時刻 (FILETIME)
    ])

    if service_event_info_list is None:
        logging.error('[ProgramsRouter][EDCBTimetableAPI] Failed to get programs from EDCB (response is None)')
        return schemas.EDCBEPGData(
            title='番組表',
            tabs=[],
            dates=[],
            channels=[],
            programs=[],
            current_tab_id=0,
            current_date_offset=date_offset,
            is_custom=False,
        )

    if len(service_event_info_list) == 0:
        logging.warning('[ProgramsRouter][EDCBTimetableAPI] No programs returned from EDCB')
        return schemas.EDCBEPGData(
            title='番組表',
            tabs=[],
            dates=[],
            channels=[],
            programs=[],
            current_tab_id=0,
            current_date_offset=date_offset,
            is_custom=False,
        )

    # チャンネルごとに番組をグループ化
    channels_dict: dict[tuple[int, int, int], dict[str, object]] = {}
    for service_info in service_event_info_list:
        # sendEnumPgInfoEx() の戻り値は service_info と event_list を持つ
        service = service_info['service_info']
        onid = service['onid']
        tsid = service['tsid']
        sid = service['sid']
        key = (onid, tsid, sid)

        if key not in channels_dict:
            channels_dict[key] = {
                'service': service,
                'events': [],
            }

        # このサービスの番組情報を追加
        for event_info in service_info['event_list']:
            # ONID と SID を event_info に追加（DecodeEDCBEventInfo で必要）
            event_info['onid'] = onid
            event_info['sid'] = sid
            event_info['tsid'] = tsid
            channels_dict[key]['events'].append(event_info)

    # チャンネル情報を構築
    channels: list[schemas.EDCBEPGChannel] = []
    programs: list[schemas.EDCBEPGProgram] = []

    for (onid, tsid, sid), channel_data in sorted(channels_dict.items()):
        service = channel_data['service']
        event_list = cast(list[EventInfo], channel_data['events'])

        # チャンネル名は service_info に含まれる service_name を利用する
        service_name_raw = cast(dict[str, object], service).get('service_name', '')
        channel_name = TSInformation.formatString(str(service_name_raw)) if service_name_raw else f'SID{sid}'

        # チャンネル情報を追加
        channels.append(schemas.EDCBEPGChannel(
            onid=onid,
            sid=sid,
            name=channel_name,
            min_width=148,
            width=148,
            colspan=1,
        ))

        # このチャンネルの番組情報を処理
        for event_info in event_list:
            # 番組開始時刻が範囲内かチェック
            event_start = event_info.get('start_time', start_time)
            if event_start < start_time or event_start >= end_time:
                continue

            # schemas.Program に変換
            program = DecodeEDCBEventInfo(event_info)

            # event_id を EDCB の HTML と同じ形式に揃える (onid-tsid-sid-eid)
            tsid = event_info.get('tsid', 0)
            eid = event_info.get('eid', program.event_id)
            epg_event_id = f'{onid}-{tsid}-{sid}-{eid}'

            # 番組表表示用の座標を計算
            # 4時を起点として、分単位で top 座標を計算（1時間 = 120px）
            minutes_from_start = (event_start - start_time).total_seconds() / 60
            top = int(minutes_from_start * 2)  # 1分 = 2px

            # 番組の長さ（高さ）を計算
            duration_minutes = program.duration / 60
            height = int(duration_minutes * 2)  # 1分 = 2px

            # 開始時刻の分表示（例: "00", "30"）
            start_minute = event_start.strftime('%M')

            # ジャンルから CSS クラス名を取得
            content_class = 'cont-0'  # デフォルト
            if program.genres:
                # 最初のジャンルの大分類から cont-N を決定
                major_genre = program.genres[0]['major']
                genre_map = {
                    'ニュース・報道': 'cont-0',
                    'スポーツ': 'cont-1',
                    '情報・ワイドショー': 'cont-2',
                    'ドラマ': 'cont-3',
                    '音楽': 'cont-4',
                    'バラエティ': 'cont-5',
                    '映画': 'cont-6',
                    'アニメ・特撮': 'cont-7',
                    'ドキュメンタリー・教養': 'cont-8',
                    '劇場・公演': 'cont-9',
                    '趣味・教育': 'cont-10',
                    '福祉': 'cont-11',
                }
                content_class = genre_map.get(major_genre, 'cont-15')

            # 過去番組かどうか判定
            is_past = event_start < datetime.now(ZoneInfo('Asia/Tokyo'))

            # 番組表用のデータを追加
            programs.append(schemas.EDCBEPGProgram(
                event_id=epg_event_id,
                title=program.title,
                start_minute=start_minute,
                content_class=content_class,
                height=height,
                left=0,
                top=top,
                width=148,
                is_past=is_past,
                is_reserved=False,  # TODO: 予約情報との照合
                reservation_link=None,
                info_link=f'epginfo.html?id={epg_event_id}',
                channel_onid=onid,
                channel_sid=sid,
            ))

    # 日付ナビゲーション情報を生成
    dates: list[schemas.EDCBEPGDate] = []
    for offset in range(-7, 8):  # 前後7日分
        date = base_date + timedelta(days=offset)
        dates.append(schemas.EDCBEPGDate(
            display_text=date.strftime('%m/%d') + ['月', '火', '水', '木', '金', '土', '日'][date.weekday()],
            date_offset=offset,
            is_current=(offset == date_offset),
            link=None if offset == date_offset else f'?date={offset}',
        ))

    # タブ情報（EDCB では全チャンネル統合のみ）
    tabs: list[schemas.EDCBEPGTab] = [
        schemas.EDCBEPGTab(
            name='すべて',
            tab_id=0,
            is_current=True,
            link=None,
        ),
    ]

    epg_data = schemas.EDCBEPGData(
        title='番組表 - EDCB',
        tabs=tabs,
        dates=dates,
        channels=channels,
        programs=programs,
        current_tab_id=0,
        current_date_offset=date_offset,
        is_custom=False,
    )

    logging.info(f'[ProgramsRouter][EDCBTimetableAPI] Successfully fetched {len(channels)} channels and {len(programs)} programs')
    return epg_data
