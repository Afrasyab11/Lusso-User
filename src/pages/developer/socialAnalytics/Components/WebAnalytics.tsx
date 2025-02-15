import { useState } from 'react';
import DataGrid from '../../../../components/dataGrid/DataGrid';
import { apiEndpoints } from '../../../../constants/api-endpoints';
import useGetCountry from '../../../../hooks/getCountryName';
import { useAppSelector } from '../../../../redux/hooks';
import {
    daysAgoDate
} from '../../../../utils/utils';
import MapStats from '../../MapStats';
import { webAnalyticsStats } from '../constants/web.constants';
import useAnalyticsStatsHook from '../hooks/useAnalyticsStatsHook';
import '../SocialAnalytics.scss';
import { graphConfigGeneratorInsta, tilesConfiguration } from '../utils';
import AnalyticCompTop from './AnalyticsCompTop';
import AnalyticsConnectScreen from './AnalyticsConnect';
import TilesAndGraphStats from './TilesAndGraphStats';

const pageViewsColumns = [
    {
        header: <div className="text-start">URL</div>,
        target: 'key',
        cellRender: (value: any) => <div className='text-start'>{value?.replaceAll('%2F', '/')}</div>,
    },
    { header: 'Page Views', target: 'value' },
];

const trafficSourceColumns = [
    {
        header: <div className="text-start">Source</div>, target: 'key',
        cellRender: (value: any) => <div className='text-start'>{value}</div>
    },
    { header: 'Access', target: 'value' },
];
const WebAnalytics = () => {
    const { connectedPlatforms } = useAppSelector(
        state => state?.socialAnalytics,
    );

    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(30),
        endDate: daysAgoDate(1),
    });

    const { getCountryAndFlag } = useGetCountry();
    const { loading, socialAnalytics } = useAnalyticsStatsHook(
        apiEndpoints.web.getWebStatistics,
        dates,
        [dates],
        connectedPlatforms['web']
    );
    const {
        webAnalytics,
        location,
        traffic,
    } = socialAnalytics;
    console.log('useGetCountry', location?.visitorCountries?.map((item: any) => {
        // const { country, flag } = getCountryAndFlag(item?.key)
        return {
            country: item?.key,
            flag: '',
            followerCount: item?.value ?? "",
            // lat: item?.lat ?? '',
            // lon: item?.lon ?? ""
        }
    }));

    const formatCountryVisitorsStats = (data: any) => {
        return data?.map((item: any) => {
            const { country, flag } = getCountryAndFlag(item?.key)
            return {
                country,
                flag,
                followerCount: item?.value ?? "",
                // lat: item?.lat ?? '',
                // lon: item?.lon ?? ""
            }
        })
    };

    return (
        <AnalyticsConnectScreen platform='web'>
            <div className="dashboard-container text-white p-6">
                {/* Header Section */}
                <AnalyticCompTop
                    title="Website Analytics"
                    onChangeCalender={onChange}
                    calenderValue={dates}
                />

                <div className="space-y-5">
                    <TilesAndGraphStats
                        title="Web Analytics"
                        topTiles={tilesConfiguration(
                            webAnalyticsStats.topTiles,
                            webAnalytics?.headerCalculations ?? [],
                        )}
                        bottomTiles={tilesConfiguration(
                            webAnalyticsStats.bottomTiles,
                            webAnalytics?.footerCalculations ?? [],
                        )}
                        data={{
                            ...webAnalyticsStats.graphConfiguration,
                            dataSet: graphConfigGeneratorInsta(
                                ['pageViews', 'visits', 'visitors', 'comments', 'posts'],
                                webAnalytics,
                            ),
                        }}
                        loading={loading}
                    />

                    <h2 className="text-2xl">Location</h2>
                    <MapStats
                        title="Visitors by country"
                        showCircularStat={false}
                        mapPointer={false}
                        loading={loading}
                        data={formatCountryVisitorsStats(location?.visitorCountries ?? [])}
                    />

                    <h2 className="text-2xl">Traffic</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <span className="text-lg font-bold"> Page Views</span>
                            <DataGrid
                                key={traffic?.pageViews?.length + '_' + loading}
                                columns={pageViewsColumns}
                                data={traffic?.pageViews ?? []}
                            />
                        </div>
                        <div className="followers-section p-4 card-bg-dev rounded-2xl">
                            <span className="text-lg font-bold">Traffic source</span>
                            <DataGrid
                                key={traffic?.trafficSource?.length + '_' + loading}
                                columns={trafficSourceColumns}
                                data={traffic?.trafficSource ?? []}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AnalyticsConnectScreen>
    );
};

export default WebAnalytics;
