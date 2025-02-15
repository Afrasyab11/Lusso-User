import React from 'react';

type PostMetric = {
    icon: string;
    label: string;
    day: string;
    month: string;
};

type PostListCardProps = {
    title: string;
    metrics: PostMetric[];
};

const PostListCard: React.FC<PostListCardProps> = ({ title, metrics }) => {
    return (
        <div className="w-full p-6 rounded-2xl card-bg-dev text-white">
            {/* Header Row */}
            <div className="grid grid-cols-4 items-center mb-4 h-[50px] border-b border-indigo-400">
                <div className="col-span-2">
                    <span className="text-xl font-semibold">{title}</span>
                </div>
                <div className="col-span-1 text-center">
                    <span>Day</span>
                </div>
                <div className="col-span-1 text-right">
                    <span>Month</span>
                </div>
            </div>
            {/* Data Rows */}
            <div>
                {metrics.map((metric, index) => (
                    <div key={index} className="grid grid-cols-4 items-center mb-4 h-[50px]">
                        <div className="flex items-center gap-4 col-span-2">
                            <img src={metric.icon} alt={metric.label} className="w-12 h-12" />
                            <span className="text-xl">{metric.label}</span>
                        </div>
                        <div className="text-center col-span-1">
                            <span>{metric.day}</span>
                        </div>
                        <div className="text-right col-span-1">
                            <span>{metric.month}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostListCard;
