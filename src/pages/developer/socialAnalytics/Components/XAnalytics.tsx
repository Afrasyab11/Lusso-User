import { useState } from 'react';
import TextPopup from '../../../../components/common/CopyToClipboardPopup';
import Tabs from '../../../../components/common/Tabs';
import DataGrid from '../../../../components/dataGrid/DataGrid';
import { apiEndpoints } from '../../../../constants/api-endpoints';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import { useAppSelector } from '../../../../redux/hooks';
import {
    checkNullOrEmpty,
    daysAgoDate,
    fomatedDateMonthDY,
    roundToOneDecimal,
    typeDetector,
} from '../../../../utils/utils';
import {
    balanceOfFollowersStats,
    growthStats,
    postPublishedInteractionsStats,
    postPublishedSummaryStats,
} from '../constants/twitter.constants';
import useAnalyticsStatsHook from '../hooks/useAnalyticsStatsHook';
import '../SocialAnalytics.scss';
import { graphConfigGeneratorInsta, tilesConfiguration } from '../utils';
import AnalyticCompTop from './AnalyticsCompTop';
import AnalyticsConnectScreen from './AnalyticsConnect';
import DonutChart from './DonutChart';
import TilesAndGraphStats from './TilesAndGraphStats';

const XAnalytics = () => {
    const { connectedPlatforms } = useAppSelector(
        state => state?.socialAnalytics,
    );

    const [acqActiveTab, setAcqActiveTab] = useState('acquired');
    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(30),
        endDate: daysAgoDate(1),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [list, setList] = useState<string>('');
    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.twitter.getTwitterStatistics,
        dates,
        [dates],
        connectedPlatforms['twitter']
    );
    const {
        growth,
        balanceOfFollowers,
        acquisition,
        postPublishedSummary,
        postPublishedInteractions,
        typeOfPosts,
        impressions,
        listOfPosts,
        competitors,
    } = socialAnalytics;

    const { posts, headerCalculations } = growth ?? {};
    const postCard = checkNullOrEmpty(headerCalculations)
        ? {}
        : headerCalculations?.find(
            (card: any) => card?.name?.toLowerCase() === 'posts',
        ) ?? {};

    const PopupClipBoard = (data: any) => {
        console.log("data", data)
        setIsDialogOpen(!isDialogOpen)
        setList(data?.text)
    }
    const columns = [
        {
            header: '',
            target: 'text',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start w-80">
                    <div className="space-y-3">
                        <p className="text-start w-60 truncate">{value ?? ''}</p>
                        <div className="flex flex-col lg:flex-row justify-between">
                            {rowData?.text && (
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
                            {/* {rowData?.hasUrls && (
                                <button className="flex items-center gap-2">
                                    <img
                                        src={ICON_ENUM?.VIEW_CIRCLE?.icon ?? ''}
                                        alt={'VIEW_CIRCLE_' + rowId}
                                    />{' '}
                                    <p>View</p>
                                </button>
                            )

                            } */}

                        </div>
                    </div>
                </div>
            ),
        },
        {
            header: 'Date',
            target: 'createdAt',
            cellRender: (value: string) => {
                if (checkNullOrEmpty(value)) return;
                const splitDate = new Date(value).toLocaleString().split(',');

                return (
                    <div className="flex flex-col">
                        <span>{splitDate[0] ? fomatedDateMonthDY(splitDate[0]) : ''}</span>{' '}
                        <span>{splitDate?.length > 0 ? splitDate[1] : ''}</span>
                    </div>
                );
            },
        },
        {
            header: 'Impressions',
            target: 'metricsV2',
            cellRender: (value: any) => value?.total_impressions ?? 0,
        },
        {
            header: 'Likes',
            target: 'metricsV2',
            cellRender: (value: any) => value?.total_likes ?? 0,
        },
        {
            header: 'Reposts',
            target: 'metricsV2',
            cellRender: (value: any) => value?.total_retweets ?? 0,
        },
        {
            header: 'Replies',
            target: 'metricsV2',
            cellRender: (value: any) => value?.total_replies ?? 0,
        },
        {
            header: 'Quotes',
            target: 'interaction',
        },
        {
            header: 'Link clicks',
            target: 'linkClicks',
        },
        {
            header: 'Profile clicks',
            target: 'interaction',
        },
        {
            header: 'Engagements',
            target: 'metricsV2',
            cellRender: (value: any) =>
                roundToOneDecimal(value?.total_engagement ?? 0),
        },
        {
            header: 'Video views',
            target: 'interaction',
        },
    ];

    const acquiColumns = [
        {
            header: 'Name',
            target: 'fullName',
            cellRender: (value: any, rowId: number, rowData: any) => (
                checkNullOrEmpty(value) && checkNullOrEmpty(rowData?.screenName) ? 'Deleted account' :
                    <div className="flex flex-col lg:flex-row gap-5 justify-start w-80">
                        {!checkNullOrEmpty(rowData?.picture) &&
                            <img
                                src={rowData?.picture ?? 'https://via.placeholder.com/60?text=No+Image'}
                                className="h-8 w-8 rounded"
                                alt={'img_placeholder_' + rowId}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60?text=No+Image';
                                }}
                            />
                            //  <img
                            //     src={rowData?.picture ?? ''}
                            //     alt={'img_placeholder_' + rowId}
                            //     className="w-16 h-16"
                            // />
                        }
                        <div className="space-y-3">
                            <p className="w-60 truncate">{value ?? ''}</p>
                            <p>{!checkNullOrEmpty(rowData?.screenName) ? `@${rowData?.screenName}` : ''}</p>
                        </div>
                    </div>
            ),
        },
        {
            header: 'Followers',
            target: 'followers',
        },
        {
            header: 'Follows You',
            target: 'followingMe',
            cellRender: (value: string, rowNo: number) => (
                !value ? '' :
                    <div className="flex justify-center gap-3">
                        <img
                            src={ICON_ENUM?.BLUE_TICK?.icon ?? ''}
                            width={15}
                            alt='following'
                        /> {' '} Following you
                    </div>
            ),
        },
    ];

    return (
        <>
            <AnalyticsConnectScreen platform='twitter'>
                <div className="dashboard-container text-white p-6">
                    {/* Header Section */}
                    <AnalyticCompTop
                        title="X App Analytics"
                        onChangeCalender={onChange}
                        calenderValue={dates}
                    />

                    <div className="space-y-5">
                        <h2 className="text-2xl">Page Overview</h2>
                        <TilesAndGraphStats
                            title="Growth"
                            topTiles={tilesConfiguration(
                                growthStats.topTiles,
                                growth?.headerCalculations ?? [],
                            )}
                            bottomTiles={tilesConfiguration(
                                growthStats.bottomTiles,
                                growth?.footerCalculations ?? [],
                            )}
                            data={{
                                ...growthStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['followers', 'following', 'posts'],
                                    growth,
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Balance of followers"
                            topTiles={tilesConfiguration(balanceOfFollowersStats.topTiles, [
                                ...(balanceOfFollowers?.headerCalculations ?? []),
                                { ...postCard },
                            ])}
                            data={{
                                ...balanceOfFollowersStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(['acquired', 'lost', 'posts'], {
                                    ...balanceOfFollowers,
                                    posts,
                                }),
                            }}
                            loading={loading}
                        />

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex flex-col mb-2 space-y-3">
                                <span className="text-lg font-bold">Acquisition</span>
                                <div className='w-full md:w-60'><Tabs
                                    active={acqActiveTab}
                                    onChange={setAcqActiveTab}
                                    tabs={[
                                        { label: 'Acquired', value: 'acquired' },
                                        { label: 'Lost', value: 'lost' },
                                    ]}
                                />
                                </div>
                            </div>
                            <DataGrid
                                key={acquisition?.[acqActiveTab]?.length + '_' + loading + '_' + acqActiveTab}
                                columns={acquiColumns}
                                data={acquisition?.[acqActiveTab] ?? []}
                            />
                        </div>

                        <h2 className="text-2xl">Posts published in period</h2>
                        <TilesAndGraphStats
                            title="Summary"
                            topTiles={tilesConfiguration(postPublishedSummaryStats.topTiles, [
                                ...(postPublishedSummary?.headerCalculations ?? []),
                                { ...postCard },
                            ])}
                            data={{
                                ...postPublishedSummaryStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['engagement', 'impressions', 'interactions', 'posts'],
                                    { ...postPublishedSummary, posts },
                                ),
                            }}
                            loading={loading}
                        />
                        <TilesAndGraphStats
                            title="Interactions"
                            topTiles={tilesConfiguration(
                                postPublishedInteractionsStats.topTiles,
                                [
                                    ...(postPublishedInteractions?.headerCalculations ?? []),
                                    { ...postCard },
                                ],
                            )}
                            bottomTiles={tilesConfiguration(
                                postPublishedInteractionsStats.bottomTiles,
                                postPublishedInteractions?.footerCalculations ?? [],
                            )}
                            data={{
                                ...postPublishedInteractionsStats.graphConfiguration,
                                dataSet: graphConfigGeneratorInsta(
                                    ['engagement', 'impressions', 'interactions', 'posts'],
                                    { ...postPublishedInteractions, posts },
                                ),
                            }}
                            loading={loading}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                            <DonutChart
                                title="Type of posts"
                                loading={loading}
                                data={
                                    !checkNullOrEmpty(typeOfPosts)
                                        ? typeDetector(typeOfPosts) === 'object'
                                            ? Object.keys(typeOfPosts).map((postKey: string) => ({
                                                key: postKey,
                                                value: typeOfPosts[postKey] ?? 0,
                                            }))
                                            : typeOfPosts ?? []
                                        : []
                                }
                            />
                            <DonutChart
                                title="Impressions"
                                loading={loading}
                                data={impressions ?? []}
                            />
                        </div>

                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">List of posts</span>
                            </div>
                            <DataGrid
                                key={listOfPosts?.length + '_' + loading}
                                columns={columns}
                                data={listOfPosts ?? []}
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

export default XAnalytics;
