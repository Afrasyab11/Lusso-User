import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Rectangle,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';
import NoRecordFound from '../../components/dataGrid/NoRecordFound';

const BarChartStat = ({ title = '', data = [] }: { title: string, data: any[] }) => {
    return (
        <div className="stats-section-bg p-4 card-bg-dev rounded-2xl text-white h-full">
            {data?.length === 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <div className="flex justify-center items-center w-full h-full text-center  text-white">
                    <NoRecordFound message="No data available" />
                    </div>
                </ResponsiveContainer>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        layout="vertical"
                        width={500}
                        data={data}
                        barCategoryGap={20}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="femaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0.45%" stopColor="#B00D98" />
                                <stop offset="98.74%" stopColor="#FF5EE5" />
                            </linearGradient>
                            <linearGradient id="maleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="14.16%" stopColor="#006EF8" />
                                <stop offset="69.49%" stopColor="#212CB1" />
                                <stop offset="85.41%" stopColor="#2B189C" />
                            </linearGradient>
                        </defs>
                        <text x={20} y={20} fontSize={20} fill="#ffff">
                            {title ?? ''}
                        </text>
                        <CartesianGrid
                            vertical={true}
                            horizontal={false}
                            stroke="#FFFFFF33"
                        />
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#fff' }} />
                        <YAxis
                            dataKey="age"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            tick={{ fill: '#fff' }}
                        />
                        <Legend verticalAlign="top" align="right" layout="horizontal" style={{ marginBottom: '20px' }} />
                        <Bar
                            dataKey="follower"
                            fill="url(#femaleGrad)"
                            activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )
            }
        </div >
    );
};

export default BarChartStat;
