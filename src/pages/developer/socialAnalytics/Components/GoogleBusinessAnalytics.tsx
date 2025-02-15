import { useState } from 'react';
import TextPopup from '../../../../components/common/CopyToClipboardPopup';
import DataGrid from '../../../../components/dataGrid/DataGrid';
import { apiEndpoints } from '../../../../constants/api-endpoints';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import { useAppSelector } from '../../../../redux/hooks';
import { checkNullOrEmpty, daysAgoDate, fomatedDateMonthDY } from '../../../../utils/utils';
import {
    KEYS_ENUM_GB,
    locationClicksStats,
    photosAndVideosStats,
    postListolumns,
    postsStats,
    reachStats,
    reviewsStats,
} from '../constants/GoogleBusiness.constants';
import useAnalyticsStatsHook from '../hooks/useAnalyticsStatsHook';
import '../SocialAnalytics.scss';
import { graphConfigGeneratorInsta, tilesConfiguration } from '../utils';
import AnalyticCompTop from './AnalyticsCompTop';
import AnalyticsConnectScreen from './AnalyticsConnect';
import DonutChart from './DonutChart';
import TilesAndGraphStats from './TilesAndGraphStats';

const keywordsColumns = [
    { header: <div className='text-start'>Keyword</div>, target: 'keyword', cellRender: (value: any) => <div className='text-start'>{value}</div> },

    { header: 'Impressions', target: 'value' },
];
const GoogleBusinessAnalytics = () => {
    const { connectedPlatforms } = useAppSelector(
        state => state?.socialAnalytics,
    );

    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(180),
        endDate: daysAgoDate(1),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [list, setList] = useState<string>('');
    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.gmb.getGoogleStatistics,
        dates,
        [dates],
        connectedPlatforms['gmb'],
    );
    const { location, reviews, photosAndVideos, posts } = socialAnalytics;

    const { reachDistribution, reach, clicks } = location ?? {};

    const PopupClipBoard = (data: any) => {
        setIsDialogOpen(!isDialogOpen)
        setList(data?.text)
    }
    const reviewsColumns = [
        {
            header: 'User',
            target: 'reviewerName',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex gap-5 justify-start items-center">
                    <img
                        src={rowData?.reviewerPhoto || 'https://via.placeholder.com/60?text=No+Image'}
                        alt={`img_placeholder_${rowId}`}
                        width={45}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60?text=No+Image';
                        }}
                    />

                    <p className="">{value ?? ''}</p>
                </div>
            ),
        },
        {
            header: 'Message',
            target: 'text',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col gap-5 justify-start flex-wrap">
                    <p className="text-start">{value ?? ''}</p>
                    {rowData?.text && (
                        <button onClick={() => PopupClipBoard(rowData)} className="flex justify-start items-center gap-2">
                            <img
                                src={ICON_ENUM?.FILE_MORE_LINE?.icon ?? ''}
                                alt={'FILE_MORE_LINE_' + rowId}
                            />{' '}
                            <p>More</p>
                        </button>
                    )}
                </div>
            ),
        },
        {
            header: 'Date',
            target: 'created',
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
        { header: 'Star Rating', target: 'starRating' },
        { header: 'Replied', target: 'replied' },
    ];

    const postAndVideosColumns = [
        {
            header: '',
            target: 'text',
            cellRender: (value: any, rowId: number, rowData: any) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start w-80">
                    <img
                        src={rowData?.photoUrl || 'https://via.placeholder.com/60?text=No+Image'}
                        alt={'img_placeholder_' + rowId}
                        width={45}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60?text=No+Image';
                        }}
                    />

                    <p className="w-60 truncate"> {value ?? ''}</p>
                </div>
            ),
        },
        ,
        ...postListolumns,
    ];

    return (
        <AnalyticsConnectScreen
            platform="gmb"
        >
            <div className="dashboard-container text-white p-6">
                {/* Header Section */}
                <AnalyticCompTop
                    title="Google Business Analytics"
                    onChangeCalender={onChange}
                    calenderValue={dates}
                />

                <div className="space-y-5">
                    <h2 className="text-2xl">Location</h2>
                    <TilesAndGraphStats
                        title="Reach"
                        topTiles={tilesConfiguration(
                            reachStats.topTiles,
                            reach?.headerCalculations ?? [],
                        )}
                        data={{
                            ...reachStats.graphConfiguration,
                            dataSet: graphConfigGeneratorInsta(
                                ['googleMaps', 'googleSearch', 'total'],
                                reach,
                            ),
                        }}
                        loading={loading}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                        <DonutChart
                            title=" Reach distribution by source"
                            loading={loading}
                            data={
                                !checkNullOrEmpty(reachDistribution?.distributionBySource?.data)
                                    ? reachDistribution?.distributionBySource?.data?.map(
                                        (content: any) => ({
                                            ...content,
                                            key:
                                                KEYS_ENUM_GB[
                                                content.key as keyof typeof KEYS_ENUM_GB
                                                ] ?? content?.key,
                                        }),
                                    )
                                    : []
                            }
                        />
                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <span className="text-lg font-bold"> Keywords</span>
                            <DataGrid
                                key={reachDistribution?.keywords?.data?.length + '_' + loading}
                                columns={keywordsColumns}
                                data={reachDistribution?.keywords?.data ?? []}

                            />
                        </div>
                    </div>
                    <TilesAndGraphStats
                        title="Clicks"
                        topTiles={tilesConfiguration(
                            locationClicksStats.topTiles,
                            clicks?.headerCalculations ?? [],
                        )}
                        data={{
                            ...locationClicksStats.graphConfiguration,
                            dataSet: graphConfigGeneratorInsta(
                                ['website', 'phone', 'directions', 'total'],
                                clicks,
                            ),
                        }}
                        loading={loading}
                    />

                    <h2 className="text-2xl">Reviews</h2>
                    <TilesAndGraphStats
                        title="Reviews"
                        topTiles={tilesConfiguration(
                            reviewsStats.topTiles,
                            reviews?.headerCalculations ?? [],
                        )}
                        data={{
                            ...reviewsStats.graphConfiguration,
                            dataSet: graphConfigGeneratorInsta(
                                ['starRating', 'total'],
                                reviews,
                            ),
                        }}
                        loading={loading}
                    />
                    <div className="followers-section p-4 card-bg-dev rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold">List of reviews</span>
                        </div>
                        <DataGrid
                            key={reviews?.reviews?.length + '_' + loading}
                            columns={reviewsColumns}
                            data={reviews?.reviews ?? []}
                        />
                    </div>

                    <h2 className="text-2xl">Photos and videos</h2>
                    <TilesAndGraphStats
                        title="Photos and videos"
                        topTiles={tilesConfiguration(
                            photosAndVideosStats.topTiles,
                            photosAndVideos?.headerCalculations ?? [],
                        )}
                        data={{
                            ...photosAndVideosStats.graphConfiguration,
                            dataSet: graphConfigGeneratorInsta(['photos'], photosAndVideos),
                        }}
                        loading={loading}
                    />
                    <div className="followers-section p-4 card-bg-dev rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold">
                                {' '}
                                List of photos and videos
                            </span>
                        </div>
                        <DataGrid
                            key={photosAndVideos?.googlePhotoVideos?.length + '_' + loading}
                            columns={postAndVideosColumns}
                            data={photosAndVideos?.googlePhotoVideos ?? []}
                        />
                    </div>

                    <h2 className="text-2xl">Posts</h2>
                    <TilesAndGraphStats
                        title="Posts"
                        topTiles={tilesConfiguration(
                            postsStats.topTiles,
                            posts?.headerCalculations ?? [],
                        )}
                        data={{
                            ...postsStats.graphConfiguration,
                            dataSet: graphConfigGeneratorInsta(['photos'], posts),
                        }}
                        loading={loading}
                    />
                    <div className="followers-section p-4 card-bg-dev rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold"> List of posts</span>
                        </div>
                        <DataGrid
                            key={posts?.posts?.length + '_' + loading}
                            columns={postAndVideosColumns}
                            data={posts?.posts ?? []}
                        />
                    </div>
                </div>
            </div>
            <TextPopup
                content={list}
                isOpen={isDialogOpen}
                onOpenChange={PopupClipBoard}
                showReuseBtn={false}
            />
        </AnalyticsConnectScreen>
    );
};

export default GoogleBusinessAnalytics;
