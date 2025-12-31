
import Message from '@/message';
import APIClient from '@/services/APIClient';


/** EDCB 番組表のチャンネル情報 */
export interface IEDCBEPGChannel {
    onid: number;
    sid: number;
    name: string;
    min_width: number;
    width: number;
    colspan: number;
}

/** EDCB 番組表の番組情報 */
export interface IEDCBEPGProgram {
    event_id: string;
    title: string;
    start_minute: string;
    content_class: string;
    height: number;
    left: number;
    top: number;
    width: number;
    is_past: boolean;
    is_reserved: boolean;
    reservation_link: string | null;
    info_link: string;
    channel_onid: number;
    channel_sid: number;
}

/** EDCB 番組表の日付情報 */
export interface IEDCBEPGDate {
    display_text: string;
    date_offset: number;
    is_current: boolean;
    link: string | null;
}

/** EDCB 番組表のタブ情報 */
export interface IEDCBEPGTab {
    name: string;
    tab_id: number;
    is_current: boolean;
    link: string | null;
}

/** EDCB 番組表データ */
export interface IEDCBEPGData {
    title: string;
    tabs: IEDCBEPGTab[];
    dates: IEDCBEPGDate[];
    channels: IEDCBEPGChannel[];
    programs: IEDCBEPGProgram[];
    current_tab_id: number;
    current_date_offset: number;
    is_custom: boolean;
}


/**
 * EDCB 番組表データを取得する
 * @param tab タブ ID (0: 地デジ, 1: BS, 2: CS, ...)
 * @param cust カスタム表示 (0: すべて, 1: カスタム)
 * @param date 日付オフセット (0: 当日, 1: 翌日, -1: 前日, ...)
 * @returns EDCB 番組表データ、または null（エラー時）
 */
async function fetchEDCBEPGData(tab = 0, cust = 1, date = 0): Promise<IEDCBEPGData | null> {
    const response = await APIClient.get<IEDCBEPGData>('/programs/timetable', {
        params: { date },
    });

    // エラー時は null を返す
    if (response.type === 'error') {
        Message.error('番組表の取得に失敗しました');
        return null;
    }

    return response.data;
}


export default {
    fetchEDCBEPGData,
};
