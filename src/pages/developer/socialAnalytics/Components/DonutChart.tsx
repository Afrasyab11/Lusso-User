import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
} from 'recharts';
import Loading from '../../../../components/common/Loading';
import NoRecordFound from '../../../../components/dataGrid/NoRecordFound';
import '../SocialAnalytics.scss';

interface DonutChartProps {
    title?: string;
    data?: any[];
    loading?: boolean;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const { key, value, fill } = payload[0].payload;
        return (
            <div
                className="card-bg-dev flex items-center gap-2 rounded p-3"
                style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <span className="w-5 h-5 rounded-sm" style={{ backgroundColor: fill }} />
                <p>{value}</p>
                {/* <p>{`${value}%`}</p> */}
                <p>{key}</p>
            </div>
        );
    }

    return null;
};

const DonutChart = ({
    title = '',
    data = [],
    loading = false,
}: DonutChartProps) => {
    let sortedDataSet = [...data]
        ?.sort((a: any, b: any) => a.key.localeCompare(b.key))
        .map(entry => ({ ...entry, value: Number(entry?.value) }));

    const allValuesAreZero = sortedDataSet.every(entry => entry.value === 0);

    const getColor = (index: number) => {
        const colors = [
            '#0088FE',
            '#00C49F',
            '#FFBB28',
            '#FF8042',
            '#FF6384',
            '#36A2EB',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
        ];
        return colors[index % colors.length] || `hsl(${index * 30}, 70%, 50%, 0.8)`;
    };

    return (
        <div className="stats-section-bg p-4 card-bg-dev rounded-2xl space-y-3 text-white">
            <span className="text-lg font-bold">{title ?? ''}</span>

            <div className="followers-graph mt-3">
                {loading ? (
                    <Loading className="h-48" />
                ) : data.length === 0 ? (
                    <div className="flex items-center justify-center h-48">
                        <NoRecordFound message="No Data" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Legend
                                verticalAlign="top"
                                align="right"
                                layout="vertical"
                                formatter={(value, entry, index) => (
                                    <span
                                        style={{
                                            color: '#fff',
                                            maxWidth: '130px',
                                            overflow: 'hidden',
                                            whiteSpace: 'wrap',
                                        }}
                                    >
                                        {sortedDataSet[index].key}
                                    </span>
                                )}
                                wrapperStyle={{
                                    maxHeight: '100%',
                                    overflowY: 'auto',
                                    maxWidth: '150px',
                                }}
                            />
                            {!allValuesAreZero && <Tooltip content={<CustomTooltip />} />}
                            <Pie
                                data={allValuesAreZero ? sortedDataSet.map(key => ({ key, value: 100 })) : sortedDataSet}
                                cx="50%"
                                cy="50%"
                                startAngle={90}
                                endAngle={450}
                                innerRadius={70}
                                outerRadius={120}
                                fill="#ffff"
                                dataKey="value"
                            >
                                {sortedDataSet?.map((entry: any, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={allValuesAreZero ? '#D3D3D3' : getColor(index)}
                                        stroke="none"
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default DonutChart;
