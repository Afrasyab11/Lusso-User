import CircularProgressBar from '../../components/common/CircularProgressBar';
import Loading from '../../components/common/Loading';
import WorldMap from '../../components/common/WorldMap';
import NoRecordFound from '../../components/dataGrid/NoRecordFound';
import { checkNullOrEmpty } from '../../utils/utils';

interface LocationType {
    name: string;
    lat: number;
    lng: number;
    value: string;
    percentage?: string;
    flag?: any;
}
interface StatisticsData {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    activeUsersPercentage: number;
    newUsersPercentage: number;
    locations?: LocationType[];
}
interface MapStatsProps {
    title?: string;
    data?: StatisticsData;
    showCircularStat?: boolean;
    mapPointer?: boolean;
}

function MapStats({
    title = '',
    data,
    showCircularStat = true,
    mapPointer = true,
    loading = false
}: any) {
    const GeneralStats = () => {
        return (
            <div className="text-white">

                {!checkNullOrEmpty(data?.totalUsers) && <><p className="text-md font-semibold mb-1">Total users</p>
                    <p className="text-4xl font-bold mb-4">
                        {data?.totalUsers?.toLocaleString()}
                    </p></>}

                {data && data?.length !== 0 && (
                    <div className='h-96 overflow-y-auto'>
                        <table className="table mb-4 my-5">
                            <tbody className=''>
                                {data?.map((location: any, index: number) => (
                                    <tr key={location?.name + '_' + index}>
                                        <td className="flex justify-start items-center gap-3">
                                            {location?.flag && location?.flag}
                                            <p>{location?.country ?? ''}</p>
                                        </td>
                                        <td>
                                            <p>{location?.followerCount ?? ''}</p>
                                        </td>
                                        <td>
                                            <p>{location?.percentage ?? ''}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {data?.length > 0 && showCircularStat && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
                        {data?.map((location: any, index: number) => (
                            <div key={location?.name + '_' + index} className="flex flex-col items-center  p-4 rounded-lg shadow-md">
                                <div className="flex flex-col items-center gap-5">
                                    <div className="w-[60px]">
                                        <CircularProgressBar percentage={location?.percentage ?? 0} />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-semibold">{location?.country}</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // render
    return (
        <div className="card-bg-dev rounded-2xl flex flex-col p-6">
            <h2 className="text-xl font-bold mb-5">{title ?? ''}</h2>
            {loading ? (
                <Loading className="h-48" />
            ) : checkNullOrEmpty(data) ? (
                <div className="flex items-center justify-center h-48 text-white">
                    <NoRecordFound message="No data available" />
                </div>
            ) : (<div className='flex flex-col lg:flex-row gap-5 p-6'>
                <div className="lg:w-1/4">
                    {/* General stats */}
                    <GeneralStats />
                </div>

                <div className="lg:w-3/4 flex itemx-center">
                    {/* Maps */}
                    <WorldMap locations={data ?? []} pointer={mapPointer} />
                </div>
            </div>)}
        </div>
    );
}

export default MapStats;
