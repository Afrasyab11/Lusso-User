import {
    CartesianGrid,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

import { format } from 'date-fns';
import { useState } from 'react';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import '../SocialAnalytics.scss';
import SocialAccountsGraph from './SocialAccountsGraph';

interface TilesAndGraphStatsProps {
    title?: string;
    data?: any;
    gridConfig?: any;
    dateData?: { startDate: string; endDate?: string };
}

const DashboardBarTileGraph = ({
    title = '',
    data = {},
    gridConfig = {},
    dateData,
}: TilesAndGraphStatsProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const follower = data?.tiles?.find((i: any) => i?.title === 'Followers');
    const iconSrc =
        follower?.text === 'UPWARDS'
            ? ICON_ENUM?.UP_TREND?.icon
            : follower?.text === 'DOWNWARDS'
                ? ICON_ENUM?.DOWN_TREND?.icon
                : '';

    const trendLabel =
        follower?.text === 'UPWARDS'
            ? 'increase / day'
            : follower?.text === 'DOWNWARDS'
                ? 'decrease / day'
                : '';
    const formattedStartDate = dateData?.startDate
        ? format(new Date(dateData.startDate), 'dd/MM/yyyy')
        : 'No date available';
    const formattedEndDate = dateData?.endDate
        ? format(new Date(dateData.endDate), 'dd/MM/yyyy')
        : 'No date available';

    const count = 45;
    const width = `${Math.min(count, 100)}%`;

    return (
        <div className="p-4 card-bg-dev rounded-xl space-y-5 text-white">
            <div className="p-4 card-bg-dev rounded-2xl space-y-3 w-full lg:w-1/2">
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2">
                    <span className="text-lg font-bold">{title ?? ''}</span>
                    <div className="time-options flex space-x-4">
                        <span className="cursor-pointer text-sm font-bold">
                            {' '}
                            {formattedStartDate}
                        </span>
                        {/* <span className="cursor-pointer text-sm">Weekly</span> */}
                        <span className="cursor-pointer text-sm font-bold">
                            {formattedEndDate}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center space-x-3">
                    {/* <div className="flex items-center w-full md:w-1/2 bg-[#FFFFFF33] h-5">
                        <div
                            className="custom-insta-gradient-bg h-5"
                            style={{
                                width,
                                transition: "width 0.3s ease-in-out",
                            }}
                        />
                    </div> */}
                    <div className="relative w-full md:w-1/2 bg-[#FFFFFF33] h-5 flex items-center">
                        <div
                            className="tooltip capitalize font-bold text-white"
                            data-tip={'Followers count: ' + (count ?? 0)}
                            style={{
                                width,
                            }}
                        >
                            <div
                                className="bg-primary h-5 w-full"
                                style={{
                                    transition: 'width 0.3s ease-in-out',
                                }}
                            // onMouseEnter={() => setIsHovered(true)}
                            // onMouseLeave={() => setIsHovered(false)}
                            />
                        </div>

                        {/* {isHovered && (
                            <div
                                className="absolute -top-8 left-0 bg-black text-white text-xs rounded px-2 py-1"
                                style={{
                                    left: `calc(${width} - 50%)`,
                                }}
                            >
                                Followers count: {count}
                            </div>
                        )} */}
                    </div>
                    {/* <div className="graph-line mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div> */}
                    <div className="followers-count mt-4 text-4xl font-bold flex flex-col">
                        <div className="flex justify-between gap-3">
                            <span>{follower?.count ?? 0}</span>
                            {iconSrc && <img src={iconSrc} alt="Trend Icon" width={35} />}
                        </div>
                        <span className="ml-2 text-sm text-gray-400">
                            {follower?.changedValue &&
                                `${follower?.text === 'UPWARDS' ? '+' : ''
                                }${follower?.changedValue} ${trendLabel}`}
                        </span>
                    </div>
                </div>
            </div>

            <div
                className={`grid grid-cols-${gridConfig?.sm ?? '1'} md:grid-cols-${gridConfig?.md ?? '2'
                    } lg:grid-cols-${gridConfig?.lg ?? '4'} gap-4`}
            >
                {data?.tiles &&
                    data?.tiles?.map((tile: any) => <SocialAccountsGraph data={tile} />)}
            </div>
            {data?.lineChartDataSet && (
                <div className="followers-graph mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data?.lineChartDataSet?.dataSet ?? []}>
                            {data?.lineChartDataSet?.configuration?.gradientStroke &&
                                Object.keys(
                                    data?.lineChartDataSet?.configuration?.gradientStroke,
                                )?.length !== 0 && (
                                    <defs>
                                        {Object.keys(
                                            data?.lineChartDataSet?.configuration?.gradientStroke,
                                        )?.map((key: string, id: number) => (
                                            <linearGradient
                                                key={id + '_' + key}
                                                id={key}
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="1"
                                            >
                                                {data?.lineChartDataSet?.configuration?.gradientStroke[
                                                    key
                                                ]?.map((config: any, idx: number) => (
                                                    <stop
                                                        key={idx}
                                                        offset={config?.offset ?? '0%'}
                                                        stopColor={config?.stopColor ?? '#ffff'}
                                                    />
                                                ))}
                                            </linearGradient>
                                        ))}
                                    </defs>
                                )}
                            <CartesianGrid
                                horizontal={true}
                                vertical={false}
                                stroke="#ccc"
                                strokeDasharray="none"
                            />
                            <XAxis dataKey="date" />

                            <YAxis
                                domain={[0, 5000]}
                                ticks={[1000, 2000, 3000, 4000, 5000]}
                                axisLine={false}
                                tickLine={false}
                            />
                            {/* {data?.lineChartDataSet?.configuration?.lines &&
                                data?.lineChartDataSet?.configuration?.lines?.map(
                                    (line: any, index: number) => (
                                        <Line
                                            key={index + '_' + line?.dataKey}
                                            type="monotone"
                                            dataKey={line?.dataKey ?? ''}
                                            stroke={line?.stroke ?? '#ffff'}
                                            strokeWidth={4}
                                            dot={false}
                                        />
                                    ),
                                )} */}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default DashboardBarTileGraph;
