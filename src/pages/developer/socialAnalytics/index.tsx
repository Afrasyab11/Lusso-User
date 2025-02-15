import { useState } from 'react';
import TextPopup from '../../../components/common/CopyToClipboardPopup';
import DataGrid from '../../../components/dataGrid/DataGrid';
import { apiEndpoints } from '../../../constants/api-endpoints';
import { ICON_ENUM } from '../../../constants/icons.constant';
import { checkNullOrEmpty, daysAgoDate } from '../../../utils/utils';
import AnalyticCompTop from './Components/AnalyticsCompTop';
import BarTilesAndGraph from './Components/BarTilesAndGraph';
import {
    growthStats,
    Impressions,
    InteractionsState,
    noOfPostsState,
    SPLASH_ENUM,
} from './constants/analytics.constants';

import useAnalyticsStatsHook from './hooks/useAnalyticsStatsHook';
import './SocialAnalytics.scss';
import { graphConfigGeneratorInsta, progressBarConfiguration, tilesConfiguration } from './utils';

function isIconEnumKey(key: string): key is keyof typeof ICON_ENUM {
    return key in ICON_ENUM;
}

const SocialAnalytics = () => {
    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(180),
        endDate: daysAgoDate(1),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [list, setList] = useState<string>('');

    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.social.getSocialAnalyticsStatistics,
        dates,
        [dates],
        true,
    );
    const { followers, impressions, interactions, posts, postCount } =
        socialAnalytics;

    const PopupClipBoard = (data: any) => {
        setIsDialogOpen(!isDialogOpen);
        setList(data?.text ?? '');
    };

    const columns = [
        {
            header: '',
            target: 'text',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start ">
                    <img
                        src={
                            rowData?.picture ?? 'https://via.placeholder.com/60?text=No+Image'
                        }
                        alt={`img_placeholder_${rowId}`}
                        width={45}
                        onError={e => {
                            (e.target as HTMLImageElement).src =
                                'https://via.placeholder.com/60?text=No+Image';
                        }}
                    />

                    <div className="space-y-3 ">
                        <p className="truncate overflow-hidden max-w-xs">{value ?? ''}</p>
                        <div className="flex flex-col lg:flex-row justify-between">
                            {!checkNullOrEmpty(value) && (
                                <button
                                    onClick={() => PopupClipBoard(rowData)}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={ICON_ENUM?.FILE_MORE_LINE?.icon ?? ''}
                                        alt={'FILE_MORE_LINE_' + rowId}
                                    />{' '}
                                    <p>More</p>
                                </button>
                            )}
                            <button className="flex items-center gap-2">
                                <img
                                    src={ICON_ENUM?.BX_BOOK?.icon ?? ''}
                                    alt={'BX_BOOK_' + rowId}
                                />{' '}
                                <p>Reuse content</p>
                            </button>
                            {!checkNullOrEmpty(rowData?.link) &&
                                <a
                                    className="flex items-center gap-2"
                                    href={rowData?.link ?? '#'}
                                    target="_blank"
                                >
                                    <img
                                        src={ICON_ENUM?.VIEW_CIRCLE?.icon ?? ''}
                                        alt={'VIEW_CIRCLE_' + rowId}
                                    />{' '}
                                    <p>View</p>
                                </a>}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            header: 'Network',
            target: 'network',
            cellRender: (value: string, rowData: any, rowNo: number) => (
                <div className="flex justify-center">
                    {!checkNullOrEmpty(value) && <img
                        src={
                            SPLASH_ENUM[value?.toUpperCase() as keyof typeof SPLASH_ENUM]
                                .icon
                        }
                        width={25}
                        alt={value ?? 'network_Img_' + rowNo}
                    />}
                </div>
            ),
        },
        // {
        //     header: 'Date',
        //     target: 'date',
        //     cellRender: (value: string, rowNo: number, rowData: any) => (
        //         <div className="flex flex-col">
        //             <span>{value ?? ''}</span> <span>{rowData?.timestamp ?? ''}</span>
        //         </div>
        //     ),
        // },
        {
            header: 'Impressions',
            target: 'metrics',
            cellRender: (value: any) => (
                <div className="flex flex-col">
                    <span>{value?.IMPRESSIONS ?? ''}</span>
                </div>
            ),
        },

        {
            header: 'Interaction',
            target: 'metrics',
            cellRender: (value: any) => (
                <div className="flex flex-col">
                    <span>{value?.INTERACTIONS ?? ''}</span>
                </div>
            ),
        },
    ];

    return (
        <div className="dashboard-container text-white p-6">
            {/* Header Section */}
            <AnalyticCompTop
                title="Dashboard App Analytics"
                onChangeCalender={onChange}
                calenderValue={dates}
            />

            <div className="space-y-5">
                <h2 className="text-2xl">Account</h2>
                <BarTilesAndGraph
                    progressBar={progressBarConfiguration(
                        growthStats.progressBarTile,
                        followers?.headerCalculations?.headerItems ?? [],
                    )}
                    topTiles={tilesConfiguration(growthStats.topTiles, [
                        ...(followers?.headerCalculations?.headerItems ?? []),
                    ])}
                    data={{
                        ...growthStats.graphConfiguration,
                        dataSet: graphConfigGeneratorInsta(
                            ['facebook', 'instagram', 'twitter', 'linkedIn'],
                            { ...followers },
                        ),
                    }}
                    loading={loading}
                />
                <BarTilesAndGraph
                    progressBar={progressBarConfiguration(
                        Impressions.progressBarTile,
                        impressions?.headerCalculations?.headerItems ?? [],
                    )}
                    topTiles={tilesConfiguration(Impressions?.topTiles, [
                        ...(impressions?.headerCalculations?.headerItems ?? []),
                    ])}
                    data={{
                        ...Impressions.graphConfiguration,
                        dataSet: graphConfigGeneratorInsta(
                            ['facebook', 'instagram', 'twitter', 'linkedin'],
                            { ...impressions },
                        ),
                    }}
                    loading={loading}
                />

                <h2 className="text-2xl">Posts</h2>
                <BarTilesAndGraph
                    progressBar={progressBarConfiguration(
                        InteractionsState.progressBarTile,
                        interactions?.headerCalculations?.headerItems ?? [],
                    )}
                    topTiles={tilesConfiguration(InteractionsState?.topTiles, [
                        ...(interactions?.headerCalculations?.headerItems ?? []),
                    ])}
                    data={{
                        ...InteractionsState?.graphConfiguration,
                        dataSet: graphConfigGeneratorInsta(
                            ['facebook', 'instagram', 'twitter', 'linkedIn'],
                            { ...interactions },
                        ),
                    }}
                    loading={loading}
                />
                <BarTilesAndGraph
                    progressBar={progressBarConfiguration(
                        noOfPostsState.progressBarTile,
                        postCount?.headerCalculations?.headerItems ?? [],
                    )}
                    topTiles={tilesConfiguration(noOfPostsState.topTiles, [
                        ...(postCount?.headerCalculations?.headerItems ?? []),
                    ])}
                    data={{
                        ...noOfPostsState.graphConfiguration,
                        dataSet: graphConfigGeneratorInsta(
                            [
                                'facebook',
                                'youtube',
                                'instagram',
                                'twitter',
                                'linkedIn',
                                'tiktok',
                                'twich',
                            ],
                            { ...postCount },
                        ),
                    }}
                    loading={loading}
                />
                <div className="p-4 card-bg-dev rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">List of posts</span>
                    </div>
                    <DataGrid
                        key={posts?.length + '_' + loading}
                        columns={columns}
                        data={posts ?? []}
                    />
                </div>
            </div>
            <TextPopup
                content={list}
                isOpen={isDialogOpen}
                onOpenChange={PopupClipBoard}
                showReuseBtn={true}
            />
        </div>
    );
};

export default SocialAnalytics;
