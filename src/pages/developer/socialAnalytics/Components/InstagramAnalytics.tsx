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
import { GENDER_TYPE_ENUM } from '../constants/analytics.constants';
import {
    ageReachStats,
    balanceOfFollowersStats,
    clicksStats,
    hashtag_Columns,
    organicInteractionsStats,
    organicSummaryStats,
    pageOverviewStats,
    profileStats,
    storiesColumns,
} from '../constants/instagram.constants';
import useAnalyticsStatsHook from '../hooks/useAnalyticsStatsHook';
import '../SocialAnalytics.scss';
import { graphConfigGeneratorInsta, tilesConfiguration } from '../utils';
import AnalyticCompTop from './AnalyticsCompTop';
import AnalyticsConnectScreen from './AnalyticsConnect';
import DonutChart from './DonutChart';
import TilesAndGraphStats from './TilesAndGraphStats';

const InstagramAnalytics = () => {
    const { getCountry } = useGetCountry();
    const { connectedPlatforms } = useAppSelector(state => state?.socialAnalytics);

    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(30),
        endDate: daysAgoDate(1),
    });
    const [list, setList] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.getInstagramStatistics,
        dates,
        [dates],
        connectedPlatforms['instagram'],
    );
    const {
        growth,
        balanceOfFollowers,
        demographics,
        account,
        instagramPosts,
        clicks,
        postPublishedSummary,
        types,
        impressions,
        organicInteractions,
        hashtags,
    } = socialAnalytics;

    const content = growth?.headerCalulations?.totalContent ?? {};
    const contentList =
        content?.content?.data?.find((post: any) => post?.metric === 'postsCount')
            ?.values ?? [];
    const postCard = {
        name: 'Posts',
        value: content?.totalContent ?? 0,
        trend: 'SAME',
    };

    const PopupClipBoard = (data: any) => {
        console.log('data', data);
        setIsDialogOpen(!isDialogOpen);
        setList(data?.content);
    };
    const columns = [
        {
            header: '',
            target: 'content',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start w-80">
                    <img
                        src={
                            rowData?.imageUrl ??
                            'https://via.placeholder.com/60?text=No+Image'
                        }
                        alt={`img_placeholder_${rowId}`}
                        width={45}
                        onError={e => {
                            (e.target as HTMLImageElement).src =
                                'https://via.placeholder.com/60?text=No+Image';
                        }}
                    />
                    {/* <img
                        src={rowData?.imageUrl ?? ''}
                        alt={'img_placeholder_' + rowId}
                        className="w-16 h-16"
                    /> */}
                    <div className="space-y-3">
                        <p className="w-60 truncate">{value ?? ''}</p>
                        <div className="flex flex-col lg:flex-row justify-between gap-3">
                            {rowData?.content && (
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
            cellRender: (value: string, rowNo: number, rowData: any) => {
                const splitDate = value?.split(' ');
                return (
                    <div className="flex flex-col">
                        <span>{splitDate[0] ? fomatedDateMonthDY(splitDate[0]) : ''}</span>{' '}
                        <span>{splitDate?.length > 0 ? splitDate[1] : ''}</span>
                    </div>
                );
            },
        },
        ...storiesColumns,
    ];

    const hashtagColumns = [
        {
            header: '',
            target: 'hashtag',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col gap-3 items-start">
                    {value}
                    {!checkNullOrEmpty(rowData?.posts) &&
                        rowData?.posts?.length !== 0 && (
                            <div className="flex gap-2">
                                {rowData?.posts?.map((post: any, idx: number) => (
                                    <img
                                        key={rowId + '_' + idx}
                                        src={
                                            post?.imageUrl ??
                                            'https://via.placeholder.com/60?text=No+Image'
                                        }
                                        className="h-8 w-8 rounded"
                                        alt={value + rowId}
                                        onError={e => {
                                            (e.target as HTMLImageElement).src =
                                                'https://via.placeholder.com/60?text=No+Image';
                                        }}
                                    />
                                    // <img
                                    //     key={rowId + '_' + idx}
                                    //     src={post?.imageUrl ?? ''}
                                    //     className="h-8 w-8 rounded"
                                    //     alt={value + rowId}
                                    // />
                                ))}
                            </div>
                        )}
                </div>
            ),
        },
        ...hashtag_Columns,
    ];

    return (
        <>
            <AnalyticsConnectScreen platform="instagram">
                <div className="dashboard-container text-white p-6">
                    {/* Header Section */}
                    <AnalyticCompTop
                        title="Instagram App Analytics"
                        onChangeCalender={onChange}
                        calenderValue={dates}
                    />

                    <div className="space-y-5">
                        <h2 className="text-2xl">Page Overview</h2>
                        <TilesAndGraphStats
                            title="Growth"
                            topTiles={tilesConfiguration(pageOverviewStats.topTiles, [
                                ...(growth?.headerCalulations?.headerItems ?? []),
                                { ...postCard },
                            ])}
                            bottomTiles={tilesConfiguration(
                                pageOverviewStats.bottomTiles,
                                growth?.footerCalculations ?? [],
                            )}
                            data={{
                                ...pageOverviewStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['followers', 'following', 'posts'],
                                    { ...growth, posts: contentList },
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Balance of Followers"
                            topTiles={tilesConfiguration(balanceOfFollowersStats.topTiles, [
                                { ...balanceOfFollowers?.headerItem },
                            ])}
                            data={{
                                ...balanceOfFollowersStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['followers'],
                                    balanceOfFollowers,
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
                                    !checkNullOrEmpty(demographics?.gender)
                                        ? demographics?.gender?.map((gender: any) => ({
                                            ...gender,
                                            key:
                                                GENDER_TYPE_ENUM[
                                                gender?.key?.toUpperCase() as keyof typeof GENDER_TYPE_ENUM
                                                ] ?? gender?.key,
                                        }))
                                        : []
                                }
                            />
                            <TilesAndGraphStats
                                title="Reach by age"
                                xAxisKey="key"
                                data={{
                                    ...ageReachStats.graphConfiguration,
                                    dataSet: graphConfigGeneratorInsta(
                                        ['age'],
                                        demographics,
                                        'key',
                                    ),
                                }}
                                loading={loading}
                            />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart
                                title="Followers by country"
                                loading={loading}
                                // data={demographics?.followersByCountry ?? []}
                                data={!checkNullOrEmpty(demographics?.followersByCountry)
                                    ? demographics?.followersByCountry?.map((country: any) => ({
                                        ...country,
                                        key: getCountry(country?.key),

                                    }))
                                    : []}

                            />
                            <DonutChart
                                title="Followers by city"
                                loading={loading}
                                data={demographics?.followersByCity ?? []}
                            />
                        </div>
                        {/* <MapStats
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

                        <h2 className="text-2xl">Accounts</h2>
                        <TilesAndGraphStats
                            title="Profile"
                            topTiles={tilesConfiguration(profileStats.topTiles, [
                                ...(account?.headerCalculations ?? []),
                                { ...postCard },
                            ])}
                            data={{
                                ...profileStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    [
                                        'impressions',
                                        'reachPerDay',
                                        'profileViews',
                                        'websiteClicks',
                                        'posts',
                                    ],
                                    { ...account, posts: contentList },
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Clicks"
                            topTiles={tilesConfiguration(
                                clicksStats.topTiles,
                                clicks?.headerCalculations ?? [],
                            )}
                            data={{
                                ...clicksStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['emails', 'directions', 'calls', 'messages', 'total'],
                                    clicks,
                                ),
                            }}
                            loading={loading}
                        />

                        <h2 className="text-2xl">Posts published in periods</h2>
                        <TilesAndGraphStats
                            title="Organic Summary"
                            topTiles={tilesConfiguration(
                                organicSummaryStats.topTiles,
                                postPublishedSummary?.headerCalculations ?? [],
                            )}
                            data={{
                                ...organicSummaryStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    [
                                        'engagements',
                                        'interactions',
                                        'avgReachPerPost',
                                        'impressions',
                                        'posts',
                                    ],
                                    postPublishedSummary,
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Organic Interactions"
                            topTiles={tilesConfiguration(organicInteractionsStats.topTiles, [
                                ...(organicInteractions?.headerCalculations ?? []),
                                { ...postCard },
                            ])}
                            data={{
                                ...organicInteractionsStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['likes', 'comments', 'saved', 'posts'],
                                    { ...organicInteractions, posts: contentList },
                                ),
                            }}
                            bottomTiles={tilesConfiguration(
                                organicInteractionsStats.bottomTiles,
                                organicInteractions?.footerCalculations ?? [],
                            )}
                            loading={loading}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart title="Types" loading={loading} data={types ?? []} />
                            <DonutChart
                                title="Impressions"
                                loading={loading}
                                data={impressions ?? []}
                            />
                            {/* <DonutStats
                        title="Types"
                        data={{
                            gradient: {
                                id: 'customGradient',
                                list: [
                                    { offset: '0.45%', stopColor: '#B00D98' },
                                    { offset: '98.74%', stopColor: '#FF5EE5' },
                                ],
                            },
                            dataSet: types,
                        }}
                    />
                    <DonutStats
                        title="Impressions"
                        data={{
                            gradient: {
                                id: 'customGradient_2',
                                list: [
                                    { offset: '0%', stopColor: '#460F88' },
                                    { offset: '99.49%', stopColor: '#9B56FE' },
                                ],
                            },
                            dataSet: impressions ?? [],
                        }}
                    /> */}
                        </div>

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">List of posts</span>
                            </div>
                            <DataGrid
                                key={instagramPosts?.length + '_' + loading}
                                columns={columns}
                                data={instagramPosts ?? []}
                            />
                        </div>

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">List of hashtags</span>
                            </div>
                            <DataGrid
                                key={hashtags?.length + '_' + loading}
                                columns={hashtagColumns}
                                data={hashtags ?? []}
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

export default InstagramAnalytics;
