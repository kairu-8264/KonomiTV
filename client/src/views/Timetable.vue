<template>
    <div class="route-container">
        <HeaderBar />
        <main>
            <Navigation />
            <div class="timetable-container">
                <!-- ローディング表示 -->
                <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px;">
                    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                </div>

                <!-- エラー表示 -->
                <div v-else-if="error" class="d-flex justify-center align-center" style="min-height: 400px;">
                    <v-alert type="error" variant="tonal" max-width="600">
                        {{ error }}
                    </v-alert>
                </div>

                <!-- 番組表表示 -->
                <div v-else class="timetable-content">
                    <!-- タブとナビゲーション -->
                    <div class="timetable-nav pa-4">
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            <v-chip
                                v-for="tab in tabs"
                                :key="tab.tab_id"
                                :color="tab.is_current ? 'primary' : 'default'"
                                :variant="tab.is_current ? 'flat' : 'outlined'"
                                @click="loadTab(tab.tab_id)"
                            >
                                {{ tab.name }}
                            </v-chip>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <v-chip
                                v-for="date in dates"
                                :key="date.date_offset"
                                :color="date.is_current ? 'secondary' : 'default'"
                                :variant="date.is_current ? 'flat' : 'outlined'"
                                size="small"
                                @click="loadDate(date.date_offset)"
                            >
                                {{ date.display_text }}
                            </v-chip>
                        </div>
                    </div>

                    <!-- 番組表テーブル -->
                    <div class="timetable-wrapper">
                        <div class="timetable-scroll">
                            <table class="timetable-table">
                                <!-- ヘッダー行 -->
                                <thead>
                                    <tr class="timetable-header">
                                        <th class="time-header"></th>
                                        <th
                                            v-for="(channel, index) in channels"
                                            :key="`${channel.onid}-${channel.sid}`"
                                            :colspan="channel.colspan"
                                            :class="{ 'separator': isSeparator(index) }"
                                        >
                                            <div class="channel-name">{{ channel.name }}</div>
                                        </th>
                                    </tr>
                                </thead>

                                <!-- 番組表本体 -->
                                <tbody>
                                    <tr>
                                        <!-- 時間軸 -->
                                        <td class="time-column">
                                            <div
                                                v-for="hour in timeAxis"
                                                :key="hour"
                                                class="time-cell"
                                                :style="{ height: `${HOUR_HEIGHT}px` }"
                                            >
                                                {{ hour }}
                                            </div>
                                        </td>

                                        <!-- 各チャンネルの番組 -->
                                        <td
                                            v-for="(channel, channelIndex) in channels"
                                            :key="`${channel.onid}-${channel.sid}`"
                                            :colspan="channel.colspan"
                                            class="program-column"
                                            :class="{ 'separator': isSeparator(channelIndex) }"
                                        >
                                            <div class="programs-wrapper" :style="{ height: `${totalHeight}px` }">
                                                <div
                                                    v-for="program in getProgramsForChannel(channel)"
                                                    :key="program.event_id"
                                                    class="program-item"
                                                    :class="[
                                                        `genre-${getGenreClass(program.content_class)}`,
                                                        { 'past': program.is_past, 'reserved': program.is_reserved }
                                                    ]"
                                                    :style="getProgramStyle(program)"
                                                    @click="openProgramDetail(program)"
                                                >
                                                    <div class="program-time">{{ program.start_minute }}</div>
                                                    <div class="program-title">{{ program.title }}</div>
                                                    <v-icon v-if="program.is_reserved" class="reserved-icon" size="small">
                                                        mdi-check-circle
                                                    </v-icon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import HeaderBar from '@/components/HeaderBar.vue';
import Navigation from '@/components/Navigation.vue';
import TimetableService, { IEDCBEPGChannel, IEDCBEPGProgram, IEDCBEPGDate, IEDCBEPGTab } from '@/services/Timetable';

export default defineComponent({
    name: 'Timetable',
    components: {
        HeaderBar,
        Navigation,
    },
    data() {
        return {
            loading: true,
            error: null as string | null,
            channels: [] as IEDCBEPGChannel[],
            programs: [] as IEDCBEPGProgram[],
            dates: [] as IEDCBEPGDate[],
            tabs: [] as IEDCBEPGTab[],
            currentTabId: 0,
            currentDateOffset: 0,
            HOUR_HEIGHT: 120, // 1時間あたりの高さ（px）
            timeAxis: [] as number[], // 時間軸（4時～28時）
        };
    },
    computed: {
        totalHeight(): number {
            return this.HOUR_HEIGHT * 24; // 24時間分
        },
    },
    async mounted() {
        this.initTimeAxis();
        await this.loadTimetable();
    },
    methods: {
        // 時間軸の初期化（4時～28時）
        initTimeAxis() {
            for (let i = 4; i <= 28; i++) {
                this.timeAxis.push(i);
            }
        },

        // 番組表のロード
        async loadTimetable(tab = 0, cust = 1, date = 0) {
            this.loading = true;
            this.error = null;

            try {
                const data = await TimetableService.fetchEDCBEPGData(tab, cust, date);
                if (data === null) {
                    this.error = '番組表の取得に失敗しました';
                    return;
                }
                this.tabs = data.tabs;
                this.dates = data.dates;
                this.channels = data.channels;
                this.programs = data.programs;
                this.currentTabId = data.current_tab_id;
                this.currentDateOffset = data.current_date_offset;
            } catch (error: any) {
                this.error = '番組表の取得に失敗しました';
                console.error('Failed to load timetable:', error);
            } finally {
                this.loading = false;
            }
        },

        // タブ切り替え
        async loadTab(tabId: number) {
            await this.loadTimetable(tabId, 1, this.currentDateOffset);
        },

        // 日付切り替え
        async loadDate(dateOffset: number) {
            await this.loadTimetable(this.currentTabId, 1, dateOffset);
        },

        // チャンネルに属する番組を取得
        getProgramsForChannel(channel: IEDCBEPGChannel): IEDCBEPGProgram[] {
            return this.programs.filter(p => {
                return p.channel_onid === channel.onid && p.channel_sid === channel.sid;
            });
        },

        // 番組のスタイルを取得
        getProgramStyle(program: IEDCBEPGProgram): Record<string, string> {
            return {
                position: 'absolute',
                top: `${program.top}px`,
                left: '0',
                width: '100%',
                height: `${program.height}px`,
                minHeight: `${program.height}px`,
            };
        },

        // ジャンルクラスを取得
        getGenreClass(contentClass: string): string {
            const match = contentClass.match(/cont-(\d+)/);
            return match ? match[1] : '0';
        },

        // セパレーター判定
        isSeparator(index: number): boolean {
            // チャンネルグループ間の区切り（適宜調整）
            return false;
        },

        // 番組詳細を開く
        openProgramDetail(program: IEDCBEPGProgram) {
            console.log('Program clicked:', program);
            // TODO: 番組詳細ダイアログの実装
        },
    },
});

</script>

<style lang="scss" scoped>

.timetable-container {
    width: 100%;
    height: calc(100vh - 64px);
    overflow: hidden;
}

.timetable-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.timetable-nav {
    background: rgb(var(--v-theme-background));
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.timetable-wrapper {
    flex: 1;
    overflow: auto;
}

.timetable-scroll {
    min-width: 100%;
    position: relative;
}

.timetable-table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    background: rgb(var(--v-theme-surface));

    thead {
        position: sticky;
        top: 0;
        z-index: 10;
        background: rgb(var(--v-theme-surface));
    }

    .timetable-header {
        th {
            padding: 12px 8px;
            border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
            background: rgb(var(--v-theme-surface-variant));
            font-weight: 600;
            font-size: 13px;
            text-align: center;
            min-width: 148px;
            white-space: nowrap;

            &.separator {
                border-left: 3px solid rgba(var(--v-theme-on-surface), 0.3);
            }
        }
    }

    .time-header {
        position: sticky;
        left: 0;
        z-index: 11;
        width: 60px;
        min-width: 60px !important;
        background: rgb(var(--v-theme-surface-variant));
    }

    .time-column {
        position: sticky;
        left: 0;
        z-index: 5;
        width: 60px;
        min-width: 60px;
        padding: 0;
        background: rgb(var(--v-theme-surface-variant));
        border-right: 2px solid rgba(var(--v-theme-on-surface), 0.2);
        vertical-align: top;
    }

    .time-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
        font-size: 14px;
        font-weight: 500;
    }

    .program-column {
        padding: 0;
        border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
        vertical-align: top;
        position: relative;

        &.separator {
            border-left: 3px solid rgba(var(--v-theme-on-surface), 0.3);
        }
    }

    .programs-wrapper {
        position: relative;
        width: 100%;
    }

    .program-item {
        position: absolute;
        width: calc(100% - 4px);
        margin: 2px;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.2s;
        border: 1px solid rgba(0, 0, 0, 0.1);

        &:hover {
            z-index: 100;
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        &.past {
            opacity: 0.6;
        }

        &.reserved {
            border: 2px solid rgb(var(--v-theme-primary));
        }

        .program-time {
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 2px;
            color: #000000;
        }

        .program-title {
            font-size: 12px;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            color: #000000;
        }

        .reserved-icon {
            position: absolute;
            top: 4px;
            right: 4px;
            color: rgb(var(--v-theme-primary));
        }
    }
}

// ジャンルごとの色分け
.genre-0 { background: #f5f5f5; } // ニュース/報道
.genre-1 { background: #e3f2fd; } // スポーツ
.genre-2 { background: #fff3e0; } // 情報/ワイドショー
.genre-3 { background: #f3e5f5; } // ドラマ
.genre-4 { background: #fce4ec; } // 音楽
.genre-5 { background: #e8f5e9; } // バラエティ
.genre-6 { background: #fff9c4; } // 映画
.genre-7 { background: #ffe0b2; } // アニメ/特撮
.genre-8 { background: #e1f5fe; } // ドキュメンタリー/教養
.genre-9 { background: #f1f8e9; } // 劇場/公演
.genre-10 { background: #fbe9e7; } // 趣味/教育
.genre-11 { background: #ede7f6; } // 福祉
.genre-12 { background: #e0f2f1; } // その他
.genre-13 { background: #efebe9; }
.genre-14 { background: #eceff1; }
.genre-15 { background: #fafafa; }

.channel-name {
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
