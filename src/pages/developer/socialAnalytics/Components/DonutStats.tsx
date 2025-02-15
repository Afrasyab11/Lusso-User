import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { ICON_ENUM } from '../../../../constants/icons.constant';
import '../SocialAnalytics.scss';

interface DonutStatsProps {
    title?: string;
    data?: any;
    viewOption?: boolean;
}

const Divider = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="2"
            viewBox="0 0 1077 2"
            fill="none"
        >
            <g transform="rotate(135 0 0)">
                <path
                    opacity="0.2"
                    d="M4.37222e-08 0.999906L1077 1"
                    stroke="white"
                    strokeWidth="1.81"
                    strokeLinecap="round"
                />
                <path
                    d="M4.37222e-08 0.999906L1077 1"
                    stroke="#00000099"
                    strokeWidth="1.81"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

const DonutStats = ({ title = '', data = {}, viewOption = true }: DonutStatsProps) => {
    const sortedDataSet = data?.dataSet.sort(
        (a: any, b: any) => a.value - b.value,
    );

    const renderNamesInCenter = () => {
        return (
            <g>
                <circle cx="50%" cy="50%" r="100" fill="white" />
                <g>
                    <text
                        x="41%"
                        y="48%"
                        textAnchor="middle"
                        fill={sortedDataSet?.[0]?.color ?? '#0000'}
                        fontSize="36"
                        style={{
                            fontSize: 'bold',
                            fontWeight: 700,
                        }}
                    >
                        {sortedDataSet?.[0]?.value ?? 0}
                    </text>
                    <text
                        x="43%"
                        y="52%"
                        textAnchor="middle"
                        fill={sortedDataSet?.[0]?.color ?? '#0000'}
                        fontSize="14"
                        style={{
                            fontSize: 'bold',
                            fontWeight: 700,
                        }}
                    >
                        {sortedDataSet?.[0]?.name ?? ''}
                    </text>
                </g>
                <image
                    href={ICON_ENUM?.DIVIDER_135?.icon}
                    x="47%"
                    y="0%"
                    width="25"
                    height="400"
                />
                <g>
                    <text
                        x="56%"
                        y="53%"
                        textAnchor="middle"
                        fill={sortedDataSet?.[1]?.color ?? '#000'}
                        fontSize="36"
                        style={{
                            fontSize: 'bold',
                            fontWeight: 700,
                        }}
                    >
                        {sortedDataSet?.[1]?.value ?? 0}
                    </text>
                    <text
                        x="58%"
                        y="58%"
                        textAnchor="middle"
                        fill={sortedDataSet?.[1]?.color ?? '#000'}
                        fontSize="14"
                        style={{
                            fontSize: 'bold',
                            fontWeight: 700,
                        }}
                    >
                        {sortedDataSet?.[1]?.name ?? ''}
                    </text>
                </g>
            </g>
        );
    };

    return (
        <div className="stats-section-bg p-4 card-bg-dev rounded-2xl space-y-3 text-white">
            <span className="text-lg font-bold">{title ?? ''}</span>
            {viewOption && <div className="flex justify-end">
                <button className="flex gap-3 items-center">
                    <img src={ICON_ENUM?.TABLE?.icon ?? ''} width={20} alt="view-table" />{' '}
                    <span>View Table</span>
                </button>
            </div>}

            <div className="followers-graph mt-3">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        {data?.gradient && data?.gradient?.list?.length !== 0 && (
                            <defs>
                                <linearGradient
                                    id={data?.gradient?.id ?? 'abc_id'}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    {data?.gradient?.list?.map((grad: any, index: number) => (
                                        <stop
                                            key={'gradient_' + index}
                                            offset={grad?.offset ?? '0%'}
                                            stopColor={grad?.stopColor ?? '#000'}
                                        />
                                    ))}
                                </linearGradient>
                            </defs>
                        )}
                        {renderNamesInCenter()}
                        <Pie
                            data={sortedDataSet}
                            cx="50%"
                            cy="50%"
                            startAngle={90}
                            endAngle={450}
                            innerRadius={90}
                            outerRadius={130}
                            fill="#ffff"
                            dataKey="value"
                        >
                            {sortedDataSet?.map((entry: any, index: number) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry?.color ?? '#fff'}
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DonutStats;
