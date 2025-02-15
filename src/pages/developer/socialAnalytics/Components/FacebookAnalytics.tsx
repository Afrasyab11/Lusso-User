import { useState } from 'react';
import TextPopup from '../../../../components/common/CopyToClipboardPopup';
import DataGrid from '../../../../components/dataGrid/DataGrid';
import { apiEndpoints } from '../../../../constants/api-endpoints';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import useGetCountry from '../../../../hooks/getCountryName';
import { useAppSelector } from '../../../../redux/hooks';
import {
    checkNullOrEmpty,
    daysAgoDate,
    fomatedDateMonthDY,
} from '../../../../utils/utils';
import {
    balanceOfLikesStats,
    growthStats,
    pageClicksStats,
    postPublishInteractionStats,
    postPublishOverviewStats,
    postViewedInPeriodStats,
    storiesPublishStats,
} from '../constants/facebook.constants';
import useAnalyticsStatsHook from '../hooks/useAnalyticsStatsHook';
import '../SocialAnalytics.scss';
import { graphConfigGeneratorInsta, tilesConfiguration } from '../utils';
import AnalyticCompTop from './AnalyticsCompTop';
import AnalyticsConnectScreen from './AnalyticsConnect';
import DonutChart from './DonutChart';
import TilesAndGraphStats from './TilesAndGraphStats';

const FacebookAnalytics = () => {
    const { getCountry } = useGetCountry();
    const { connectedPlatforms } = useAppSelector(state => state?.socialAnalytics);

    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(30),
        endDate: daysAgoDate(1),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [list, setList] = useState<string>('');
    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.facebook.getFacebookStatistics,
        dates,
        [dates],
        connectedPlatforms['facebook'],
    );
    const {
        growth,
        balanceofLikes,
        postsViewedInPeriod,
        reachByGender,
        reachByAge,
        distribution,
        clicksOnPage,
        postPublishedOverview,
        postPublishedInteractions,
        listOfPosts,
        storiesPublished,
        competitors,
    } = socialAnalytics;

    const { followersByCountry, followersByLanguage, postType, impressions } =
        distribution ?? {};
    const { totalContent } = growth ?? {};
    const postCard = { name: 'posts', value: totalContent?.post ?? 0 };

    const PopupClipBoard = (data: any) => {
        console.log('data', data);
        setIsDialogOpen(!isDialogOpen);
        setList(data?.text);
    };

    const columns = [
        {
            header: '',
            target: 'text',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start w-80">
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
                    <div className="space-y-3">
                        <p className="w-60 truncate">{value ?? ''}</p>
                        <div className="flex flex-col lg:flex-row justify-between gap-3">
                            {rowData?.text && (
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
                            <a
                                className="flex items-center gap-2"
                                href={rowData?.link ?? '#'}
                                target="_blank"
                            >
                                <img
                                    src={ICON_ENUM?.VIEW_CIRCLE?.icon ?? ''}
                                    alt={'VIEW_CIRCLE_' + rowId}
                                />
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
            cellRender: (value: any) => {
                const splitDate = value?.dateTime?.split(' ');
                return (
                    <div className="flex flex-col">
                        <span>{splitDate[0] ? fomatedDateMonthDY(splitDate[0]) : ''}</span>{' '}
                        <span>{splitDate?.length > 0 ? splitDate[1] : ''}</span>
                    </div>
                );
            },
        },
        { header: 'Reactions', target: 'reactions' },
        { header: 'Comments', target: 'comments' },
        { header: 'Shares', target: 'shares' },
        { header: 'Clicks', target: 'clicks' },
        { header: 'Link clicks', target: 'linkclicks' },
        { header: 'Impressions', target: 'impressions' },
        { header: 'Video views', target: 'videoViews' },
        { header: 'Video time watched', target: 'videoTimeWatched' },
        { header: 'Engagement', target: 'engagement' },
        { header: 'Spent', target: 'spend' },
    ];

    const storiesColumns = [
        {
            header: '',
            target: 'name',
            cellRender: (value: any, rowId: number) => (
                <div className="flex flex-col space-y-1 items-start">
                    <p>{value ?? ''}</p>
                    <p>Link clicks</p>
                    <button className="flex items-center gap-2">
                        <img src={ICON_ENUM?.STATS?.icon ?? ''} alt={'STATS_' + rowId} />{' '}
                        <p>More stats</p>
                    </button>
                </div>
            ),
        },
        {
            header: 'Date',
            target: 'date',
            cellRender: (value: string, rowNo: number, rowData: any) => (
                <div className="flex flex-col">
                    <span>{value ?? ''}</span> <span>{rowData?.timestamp ?? ''}</span>
                </div>
            ),
        },
        {
            header: 'Type',
            target: 'type',
        },
    ];

    return (
        <>
            <AnalyticsConnectScreen platform={'facebook'}>
                <div className="dashboard-container text-white p-6">
                    {/* Header Section */}
                    <AnalyticCompTop
                        title="Facebook App Analytics"
                        onChangeCalender={onChange}
                        calenderValue={dates}
                    />

                    <div className="space-y-5">
                        <h2 className="text-2xl">Page Overview</h2>
                        <TilesAndGraphStats
                            title="Growth"
                            topTiles={tilesConfiguration(growthStats.topTiles, [
                                ...(growth?.headerCalculations ?? []),
                                { ...postCard },
                            ])}
                            bottomTiles={tilesConfiguration(
                                growthStats.bottomTiles,
                                growth?.footerCalculations ?? [],
                            )}
                            data={{
                                ...growthStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['followers', 'likes', 'impressions', 'pageVisits', 'posts'],
                                    { ...growth, posts: growth?.totalContent?.content ?? {} },
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Balance of likes"
                            topTiles={tilesConfiguration(balanceOfLikesStats.topTiles, [
                                ...(balanceofLikes?.headerCalculations ?? []),
                                { ...postCard },
                            ])}
                            data={{
                                ...balanceOfLikesStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['acquired', 'lost', 'posts'],
                                    {
                                        ...balanceofLikes,
                                        posts: totalContent?.content ?? {},
                                    },
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title=" Posts viewed in period"
                            topTiles={tilesConfiguration(postViewedInPeriodStats.topTiles, [
                                postsViewedInPeriod?.impressionsHeaderItem ?? {},
                                postsViewedInPeriod?.reactionHeaderItem ?? {},
                            ])}
                            data={{
                                ...postViewedInPeriodStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['impressions', 'reactions'],
                                    postsViewedInPeriod,
                                ),
                            }}
                            loading={loading}
                        />

                        <h2 className="text-2xl">Demographics</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart
                                title="Reach by gender"
                                loading={loading}
                                data={
                                    !checkNullOrEmpty(reachByGender?.headerCalculations)
                                        ? reachByGender?.headerCalculations?.map(
                                            ({ name, value }: { [key: string]: any }) => ({
                                                key: name,
                                                value,
                                            }),
                                        )
                                        : []
                                }
                            />
                            <DonutChart
                                title="Reach by age"
                                loading={loading}
                                data={
                                    !checkNullOrEmpty(reachByAge?.headerCalculations)
                                        ? reachByAge?.headerCalculations?.map(
                                            ({ name, value }: { [key: string]: any }) => ({
                                                key: name,
                                                value,
                                            }),
                                        )
                                        : []
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart
                                title=" Followers by country"
                                loading={loading}
                                data={
                                    !checkNullOrEmpty(followersByCountry?.data)
                                        ? followersByCountry?.data?.map((country: any) => ({
                                            ...country,
                                            key: getCountry(country?.key),

                                        }))
                                        : []
                                }
                            />
                            <DonutChart
                                title=" Followers by language"
                                loading={loading}
                                data={
                                    !checkNullOrEmpty(followersByLanguage?.data)
                                        ? followersByLanguage?.data
                                        : []
                                }
                            />
                        </div>
                        {/* 
                <MapStats
                    title="Followers by country"
                    data={{
                        totalUsers: 2431340,
                        activeUsers: 92980,
                        newUsers: 92980,
                        activeUsersPercentage: 27,
                        newUsersPercentage: 63,
                        locations: [
                            {
                                flag: ICON_ENUM?.USA?.icon,
                                name: 'United States',
                                lat: 41.8781,
                                lng: -87.6298,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.ROMANIA?.icon,
                                name: 'Romania',
                                lat: 52.52,
                                lng: 13.405,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.CANADA?.icon,
                                name: 'Canada',
                                lat: 31.2304,
                                lng: 121.4737,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.INDIA?.icon,
                                name: 'India',
                                lat: -3.119,
                                lng: -60.0217,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.UK?.icon,
                                name: 'United Kingdom',
                                lat: -20.9176,
                                lng: 142.7028,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.ITALY?.icon,
                                name: 'Italy',
                                lat: -17.9176,
                                lng: 102.7028,
                                value: '55,750',
                                percentage: '27.3',
                            },
                        ],
                    }}
                /> */}

                        <h2 className="text-2xl">Clicks on page</h2>
                        <TilesAndGraphStats
                            title="Clicks"
                            topTiles={tilesConfiguration(pageClicksStats.topTiles, [
                                clicksOnPage?.headerItem ?? {},
                                postCard,
                            ])}
                            data={{
                                ...pageClicksStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(['totalClicks', 'posts'], {
                                    ...clicksOnPage,
                                    posts: totalContent?.content ?? {},
                                }),
                            }}
                            loading={loading}
                        />
                        <h2 className="text-2xl">Posts published in periods</h2>
                        <TilesAndGraphStats
                            title="Overview"
                            topTiles={tilesConfiguration(postPublishOverviewStats.topTiles, [
                                ...(postPublishedOverview?.headerCalculations ?? []),
                                postCard,
                            ])}
                            data={{
                                ...postPublishOverviewStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    [
                                        'engagement',
                                        'interactions',
                                        'impressions',
                                        'avgReachPerPost',
                                        'posts',
                                    ],
                                    {
                                        ...postPublishedOverview,
                                        posts: totalContent?.content ?? {},
                                    },
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Interactions"
                            topTiles={tilesConfiguration(
                                postPublishInteractionStats.topTiles,
                                [
                                    ...(postPublishedInteractions?.headerCalculations ?? []),
                                    postCard,
                                ],
                            )}
                            bottomTiles={tilesConfiguration(
                                postPublishInteractionStats.bottomTiles,
                                postPublishedInteractions?.footerCalculations,
                            )}
                            data={{
                                ...postPublishInteractionStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    [
                                        'engagement',
                                        'interactions',
                                        'impressions',
                                        'avgReachPerPost',
                                        'posts',
                                    ],
                                    {
                                        ...postPublishedInteractions,
                                        posts: totalContent?.content ?? {},
                                    },
                                ),
                            }}
                            loading={loading}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart
                                title=" Types"
                                loading={loading}
                                data={postType?.data ?? []}
                            />
                            <DonutChart
                                title="Impressions"
                                loading={loading}
                                data={impressions?.data ?? []}
                            />
                        </div>

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">List of posts</span>
                            </div>
                            <DataGrid
                                key={listOfPosts?.posts?.data?.length + '_' + loading}
                                columns={columns}
                                data={listOfPosts?.posts?.data ?? []}
                            />
                        </div>

                        <h2 className="text-2xl">Stories published in period</h2>
                        <TilesAndGraphStats
                            title="Stories"
                            data={{
                                ...storiesPublishStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['stories'],
                                    storiesPublished,
                                ),
                            }}
                            loading={loading}
                        />

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">List of stories</span>
                            </div>
                            <DataGrid
                                key={
                                    storiesPublished?.listOfStories?.data?.length + '_' + loading
                                }
                                columns={storiesColumns}
                                data={storiesPublished?.listOfStories?.data ?? []}
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

export default FacebookAnalytics;
