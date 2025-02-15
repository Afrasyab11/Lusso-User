import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface VisitorDataType {
    dateTime: string;
    value: string;
}

interface PostViewChartProps {
    heading?: string;
    data: VisitorDataType[];
}

const PostViewChart: React.FC<PostViewChartProps> = ({ heading, data }) => {
    return (
        <div className="card-bg-dev p-6 shadow-lg w-full rounded-2xl space-y-3 text-white">
            {heading && <h2>{heading}</h2>}
            <ResponsiveContainer width="100%" height={300}>
                {data?.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-full text-center text-xl text-gray-500">
                        No data available
                    </div>
                ) : (


                    <LineChart data={data}>
                        <CartesianGrid
                            vertical={false}
                            horizontal={true}
                            stroke="#FFFFFF33"
                            strokeDasharray="none"
                        />
                        <XAxis
                            dataKey="dateTime"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#fff' }}
                        />
                        <YAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#fff' }}
                        />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            layout="horizontal"
                            style={{ marginBottom: '20px' }}
                        />
                        <Tooltip
                            wrapperStyle={{ color: '#fff' }}
                            contentStyle={{ backgroundColor: '#333' }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Line
                            name="Visitors"
                            strokeWidth={4}
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            dot={true}
                        />

                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default PostViewChart;
