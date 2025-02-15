import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts';
import '../SocialAnalytics.scss';

import Loading from '../../../../components/common/Loading';
import SocialTile from '../../../../components/common/SocialTile';
import NoRecordFound from '../../../../components/dataGrid/NoRecordFound';

import { ProgressBarWithColors } from '../../../../components/common/ProgressBar';

import {
    checkNullOrEmpty,
    roundToOneDecimal,
    roundUpToNearest,
} from '../../../../utils/utils';
import '../SocialAnalytics.scss';
import { gradientStrokes } from '../utils';
interface TilesAndGraphStatsProps {
    title?: string;
    xAxisKey?: string;
    progressBar?: any[];
    topTiles?: any[];
    bottomTiles?: any[];
    data?: any;
    gridConfig?: any;
    loading?: boolean;
    titledata?: any;
    showPercentage?: any;
}

const BarTilesAndGraph = ({
    title = '',
    xAxisKey = 'dateTime',
    progressBar = [],
    topTiles = [],
    bottomTiles = [],
    data = {},
    loading = false,
    showPercentage = {},
}: TilesAndGraphStatsProps) => {
    const { tooltip } = data?.configuration ?? {};
    const getOverallMaxValue = (
        data: {
            [key: string]: number | string;
        }[],
    ) => {
        return Math.max(
            ...data.flatMap(item =>
                Object.values(item).filter(
                    (value): value is number => typeof value === 'number',
                ),
            ),
        );
    };

    const overallMaxValue = getOverallMaxValue(data.dataSet ?? []);
    const yAxisMaxValue = roundUpToNearest(overallMaxValue, 5);

    const yAxisTicks = Array.from({ length: 6 }, (_, i) => i * (yAxisMaxValue / 5));

    const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
        if (active && payload && payload?.length) {
            const dataPayload = payload[0]?.payload;
            return (
                <div
                    className="card-bg-dev flex flex-col gap-2 rounded p-3"
                    style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <span className="text-lg font-bold">{dataPayload[xAxisKey]}</span>
                    {payload?.map((entry: any, index: number) => {
                        const { name, value, fill } = entry;
                        return (
                            <div key={index + '_' + name} className="flex items-center gap-2">
                                <span
                                    className="w-5 h-5 rounded-sm"
                                    style={{ background: tooltip?.[name]?.color ?? fill }}
                                />
                                <p>{`${tooltip?.[name]?.label ?? name}: ${roundToOneDecimal(
                                    value,
                                )}`}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="p-4 card-bg-dev rounded-xl space-y-5 text-white">
            {!checkNullOrEmpty(title) && (
                <span className="text-lg font-bold">{title ?? ''}</span>
            )}

            {!checkNullOrEmpty(progressBar) &&
                progressBar?.map((bar: any) => (
                    <div className="p-4 card-bg-dev rounded-2xl space-y-3 w-full lg:w-1/2">
                        {loading ? (
                            <Loading className="h-20" />
                        ) : <><div className="flex flex-col md:flex-row justify-between md:items-center space-y-2">
                            <span className="text-lg font-bold">{bar?.title ?? ''}</span>

                            <div className="flex items-center gap-2">
                                <div className="social-count text-3xl font-bold">
                                    {bar?.count ?? '0'}
                                </div>
                                <span className="increase text-blue-500 text-sm">
                                    {bar?.text ?? ''}
                                </span>
                            </div>
                        </div>
                            <div className="flex flex-col md:flex-row justify-between md:items-center space-x-3">
                                <div className="flex items-center w-full md:w-1/2">
                                    <ProgressBarWithColors
                                        progressList={bar?.progressConfig ?? []}
                                    />
                                </div>

                                <div className="followers-count mt-4 text-4xl font-bold flex flex-col">
                                    <div className="flex justify-between gap-3">
                                        {!checkNullOrEmpty(bar?.bodyIcon) && (
                                            <img src={bar?.bodyIcon} />
                                        )}
                                    </div>
                                </div>
                            </div></>}
                    </div>
                ))}

            <div
                className={`grid grid-cols-1 md:grid-cols-2
                     lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5`}
            >
                {topTiles &&
                    topTiles?.map((tile: any) => (
                        <SocialTile data={tile} loading={loading} />
                    ))}
            </div>
            {data?.dataSet && (
                <div className="followers-graph mt-6">
                    {loading ? (
                        <Loading className="h-48" />
                    ) : checkNullOrEmpty(data?.dataSet) ? (
                        <div className="flex items-center justify-center h-48">
                            <NoRecordFound message="No data available" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={data?.dataSet ?? []}>
                                <defs>
                                    {Object.keys(gradientStrokes)?.map(
                                        (key: string, id: number) => (
                                            <linearGradient
                                                key={id + '_' + key}
                                                id={key}
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="1"
                                            >
                                                {gradientStrokes[
                                                    key as keyof typeof gradientStrokes
                                                ]?.map((config: any, idx: number) => (
                                                    <stop
                                                        key={idx}
                                                        offset={config?.offset ?? '0%'}
                                                        stopColor={config?.stopColor ?? '#ffff'}
                                                    />
                                                ))}
                                            </linearGradient>
                                        ),
                                    )}
                                </defs>
                                <CartesianGrid
                                    horizontal={true}
                                    vertical={false}
                                    stroke="#ccc"
                                    strokeDasharray="none"
                                />
                                <XAxis dataKey={xAxisKey} />

                                <YAxis axisLine={false} tickLine={false} />
                                {/* <YAxis axisLine={false} tickLine={false} domain={[0, yAxisMaxValue]}
                                    ticks={yAxisTicks} /> */}
                                <Tooltip content={<CustomTooltip />} />
                                {data?.configuration?.bars &&
                                    data?.configuration?.bars?.length !== 0 &&
                                    data?.configuration?.bars.map((bar: any, index: number) => (
                                        <Bar
                                            key={index + '_' + bar?.dataKey}
                                            dataKey={bar?.dataKey ?? ''}
                                            barSize={10}
                                            fill={bar?.stroke ?? '#ffff'}
                                            minPointSize={
                                                bar?.dataKey === 'posts'
                                                    ? (overallMaxValue / overallMaxValue) * 100
                                                    : 0
                                            }
                                        />
                                    ))}
                                {data?.configuration?.lines &&
                                    data?.configuration?.lines?.map(
                                        (line: any, index: number) => (
                                            <Line
                                                key={index + '_' + line?.dataKey}
                                                type="monotone"
                                                dataKey={line?.dataKey ?? ''}
                                                stroke={line?.stroke ?? '#ffff'}
                                                strokeWidth={4}
                                            // dot={false}
                                            />
                                        ),
                                    )}
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </div>
            )}
        </div>
    );
};

export default BarTilesAndGraph;
