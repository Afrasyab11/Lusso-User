import { useState } from 'react';
import TextPopup from '../../../../components/common/CopyToClipboardPopup';
import DataGrid from '../../../../components/dataGrid/DataGrid';
import { apiEndpoints } from '../../../../constants/api-endpoints';
import { COLOR_ENUM } from '../../../../constants/colors.constant';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import { useAppSelector } from '../../../../redux/hooks';
import { daysAgoDate } from '../../../../utils/utils';
import useAnalyticsStatsHook from '../hooks/useAnalyticsStatsHook';
import '../SocialAnalytics.scss';
import { graphConfigGeneratorInsta, tilesConfiguration } from '../utils';
import AnalyticCompTop from './AnalyticsCompTop';
import AnalyticsConnectScreen from './AnalyticsConnect';
import DonutChart from './DonutChart';
import TilesAndGraphStats from './TilesAndGraphStats';

function isIconEnumKey(key: string): key is keyof typeof ICON_ENUM {
    return key in ICON_ENUM;
}

const lineChartDataSet = {
    configuration: {
        tooltip: {
            companyImpressions: { label: 'Impressions', color: COLOR_ENUM.INSTAGRAM },
            followers: { label: 'Followers', color: COLOR_ENUM.FACEBOOK },
            paidFollowers: { label: 'Paid Followers', color: COLOR_ENUM.YOUTUBE },
            posts: { label: 'Posts', color: COLOR_ENUM.X },
        },
        lines: [
            {
                dataKey: 'companyImpressions',
                stroke: 'url(#instagram)',
            },
            {
                dataKey: 'followers',
                stroke: 'url(#facebook)',
            },
            {
                dataKey: 'paidFollowers',
                stroke: 'url(#youtube)',
            },
        ],
        bars: [
            {
                dataKey: 'posts',
            },
        ],
    },
};

const pageOverviewStats = {
    topTiles: [
        {
            title: 'Followers',
            targetKey: 'followers',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Paid Followers',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Impressions',
            targetKey: 'companyImpressions',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Posts',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    bottomTiles: [
        {
            title: 'Followers',
            targetKey: 'followers',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily followers',
            targetKey: 'dailyfollowers',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Followers per post',
            targetKey: 'followersperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily impressions',
            targetKey: 'dailyimpressions',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Impressions per post',
            targetKey: 'impressionsperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily posts',
            targetKey: 'dailyposts',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 1,
        },
    ],
    graphConfiguration: { configuration: lineChartDataSet.configuration },
};

const balanceOfFollowersStats = {
    graphConfiguration: {
        configuration: {
            tooltip: {
                balance: { label: 'Followers', color: COLOR_ENUM.FACEBOOK },
            },
            bars: [
                {
                    dataKey: 'balance',
                    stroke: 'url(#facebook)',
                },
            ],
        },
    },
};

const postsPublishOverviewStats = {
    topTiles: [
        {
            title: 'Engagement',
            targetKey: 'Engagement',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            valueDecimal: 2,
        },
        {
            title: 'Interactions',
            targetKey: 'Interactions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Impressions',
            targetKey: 'Impressions',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Posts',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                engagement: { label: 'Engagement', color: COLOR_ENUM.FACEBOOK },
                impressions: { label: 'Impressions', color: COLOR_ENUM.INSTAGRAM },
                interactions: { label: 'Interactions', color: COLOR_ENUM.YOUTUBE },
                posts: { label: 'Posts', color: COLOR_ENUM.X },
            },
            lines: [
                {
                    dataKey: 'impressions',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'engagement',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'interactions',
                    stroke: 'url(#youtube)',
                },
            ],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};

const postsPublishInteractionsStats = {
    topTiles: [
        {
            title: 'Reactions',
            targetKey: 'Reactions',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Comments',
            targetKey: 'Comments',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Shares',
            targetKey: 'Shares',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Clicks',
            targetKey: 'Clicks',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    bottomTiles: [
        {
            title: 'Daily reactions',
            targetKey: 'Dailyreactions',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Reactions per post',
            targetKey: 'Reactionsperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 1,
        },
        {
            title: 'Daily comments',
            targetKey: 'Dailycomments',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
        },
        {
            title: 'Comments per post',
            targetKey: 'Commentsperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
        },
        {
            title: 'Daily clicks',
            targetKey: 'Dailyclicks',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Clicks per post',
            targetKey: 'Clicksperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                reactions: { label: 'Reactions', color: COLOR_ENUM.FACEBOOK },
                shares: { label: 'Shares', color: COLOR_ENUM.INSTAGRAM },
                comments: { label: 'Comments', color: COLOR_ENUM.YOUTUBE },
                clicks: { label: 'Clicks', color: COLOR_ENUM.X },
                posts: { label: 'Posts', color: COLOR_ENUM.X },
            },
            lines: [
                {
                    dataKey: 'shares',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'reactions',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'comments',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'clicks',
                },
            ],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};

const LinkedinAnalytics = () => {
    const { connectedPlatforms } = useAppSelector(
        state => state?.socialAnalytics,
    );

    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(30),
        endDate: daysAgoDate(1),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [list, setList] = useState<string>('');

    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.getLinkedinStatistics,
        dates,
        [dates],
        connectedPlatforms['linkedin']
    );
    console.log("socialAnalytics linkdIN", socialAnalytics)
    const {
        growth,
        balanceOfFollowers,
        demographics,
        listOfPosts,
        postPublishedInteractions,
        postPublishedSummary,
    } = socialAnalytics;

    const postCalculation =
        (growth?.headerCalculations || []).filter(
            (i: any) => i?.name?.toLowerCase() === 'posts',
        ) ?? [];
    const postGraphStats = growth?.posts ?? {};

    const PopupClipBoard = (data: any) => {
        console.log("data", data)
        setIsDialogOpen(!isDialogOpen)
        setList(data?.comment)
    }
    const columns = [
        {
            header: '',
            target: 'comment',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start">
                    {rowData?.type !== 'document' && (
                        <img
                            src={rowData?.picture || 'https://via.placeholder.com/60?text=No+Image'}
                            alt={`img_placeholder_${rowId}`}
                            width={45}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60?text=No+Image';
                            }}
                        />

                    )}
                    <div className="space-y-3">
                        <p className="truncate overflow-hidden max-w-xs">{value ?? ''}</p>
                        <div className="flex flex-col lg:flex-row justify-between">
                            {rowData?.comment && (
                                <button onClick={() => PopupClipBoard(rowData)} className="flex items-center gap-2">
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

                            <a
                                className="flex items-center gap-2"
                                href={rowData?.url ?? '#'}
                                target="_blank"
                            >
                                <img
                                    src={ICON_ENUM?.VIEW_CIRCLE?.icon ?? ''}
                                    alt={'VIEW_CIRCLE_' + rowId}
                                />{' '}
                                <p>View</p>
                            </a>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            header: 'Date',
            target: 'created',
            cellRender: (value: any, rowNo: number, rowData: any) => {
                const dateAndTime = value?.dateTime ? value?.dateTime?.split('T') : [];
                return (
                    <div className="flex flex-col">
                        {dateAndTime.length === 0 ? (
                            ''
                        ) : dateAndTime.length === 1 ? (
                            <span>{value[0] ?? ''}</span>
                        ) : (
                            <>
                                <span>{value[0] ?? ''}</span> <span>{value[1] ?? ''}</span>
                            </>
                        )}
                    </div>
                );
            },
        },
        {
            header: 'Comments',
            target: 'comments',
        },
        {
            header: 'Clicks',
            target: 'clicks',
        },
        {
            header: 'Shares',
            target: 'shares',
        },
        {
            header: 'Impressions',
            target: 'impressions',
        },
        {
            header: 'Engagement',
            target: 'engagement',
            cellRender: (value: number) => value.toFixed(2),
        },
        {
            header: 'Video views',
            target: 'videoViews',
        },
        {
            header: 'Viewers',
            target: 'viewers',
        },
        {
            header: 'Time watched',
            target: 'timeWatched',
            cellRender: (value: number) => value + 's',
        },
        {
            header: 'Avg. time watched',
            target: 'timeWatchedForVideoViews',
            cellRender: (value: number) => value + 's',
        },
    ];

    return (
        <>
            <AnalyticsConnectScreen platform='linkedin'>
                <div className="dashboard-container text-white p-6">
                    {/* Header Section */}
                    <AnalyticCompTop
                        title="Linkedin App Analytics"
                        onChangeCalender={onChange}
                        calenderValue={dates}
                    />

                    <div className="space-y-5">
                        <h2 className="text-2xl">Page Overview</h2>
                        <TilesAndGraphStats
                            title="Growth"
                            loading={loading}
                            topTiles={tilesConfiguration(
                                pageOverviewStats.topTiles,
                                growth?.headerCalculations ?? [],
                            )}
                            bottomTiles={tilesConfiguration(
                                pageOverviewStats.bottomTiles,
                                growth?.footerCalculations ?? [],
                            )}
                            data={{
                                ...pageOverviewStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['companyImpressions', 'followers', 'paidFollowers', 'posts'],
                                    growth,
                                ),
                            }}
                        />
                        <TilesAndGraphStats
                            title="Balance of Followers"
                            loading={loading}
                            data={{
                                ...balanceOfFollowersStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(['balance'], balanceOfFollowers),
                            }}
                            gridConfig={{ lg: '3' }}
                        />

                        <h2 className="text-2xl">Demographics</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart
                                title="Followers by country"
                                loading={loading}
                                data={demographics?.followersByCountry?.data ?? []}
                            />
                            <DonutChart
                                title="Followers by area"
                                loading={loading}
                                data={demographics?.followersByArea?.data ?? []}
                            />
                            <DonutChart
                                title="Followers by industry"
                                loading={loading}
                                data={demographics?.followersByIndustry?.data ?? []}
                            />
                            <DonutChart
                                title="Followers by functions"
                                loading={loading}
                                data={demographics?.followersByFunctions?.data ?? []}
                            />
                            <DonutChart
                                title="Followers by seniority"
                                loading={loading}
                                data={demographics?.followersBySeniority?.data ?? []}
                            />
                            <DonutChart
                                title="Followers by company size"
                                loading={loading}
                                data={demographics?.followersByCompanySize?.data ?? []}
                            />
                        </div>

                        <h2 className="text-2xl">Posts published in periods</h2>
                        <TilesAndGraphStats
                            title="Overview"
                            loading={loading}
                            topTiles={tilesConfiguration(
                                postsPublishOverviewStats.topTiles,
                                postCalculation?.length === 0
                                    ? postPublishedSummary?.headerCalculations
                                    : [
                                        ...postPublishedSummary?.headerCalculations,
                                        ...postCalculation,
                                    ],
                            )}
                            data={{
                                ...postsPublishOverviewStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['engagement', 'impressions', 'interactions', 'posts'],
                                    { ...postPublishedSummary, posts: postGraphStats },
                                ),
                            }}
                        />
                        <TilesAndGraphStats
                            title="Interactions"
                            topTiles={tilesConfiguration(
                                postsPublishInteractionsStats.topTiles,
                                postPublishedInteractions?.headerCalculations ?? [],
                            )}
                            bottomTiles={tilesConfiguration(
                                postsPublishInteractionsStats.bottomTiles,
                                postPublishedInteractions?.footerCalculations ?? [],
                            )}
                            data={{
                                ...postsPublishInteractionsStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['clicks', 'comments', 'reactions', 'shares', 'posts'],
                                    { ...postPublishedInteractions, posts: postGraphStats },
                                ),
                            }}
                        />

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">List of posts</span>
                                <button>
                                    <img src={ICON_ENUM?.THREE_DOTS?.icon ?? ''} alt="more options" />
                                </button>
                            </div>
                            <DataGrid
                                key={listOfPosts?.response?.data?.length}
                                columns={columns}
                                data={listOfPosts?.response?.data ?? []}

                            />
                        </div>
                    </div>
                </div>
            </AnalyticsConnectScreen>
            <TextPopup
                content={list}
                isOpen={isDialogOpen}
                onOpenChange={PopupClipBoard}
                showReuseBtn={true}
            />
        </>
    );
};

export default LinkedinAnalytics;
