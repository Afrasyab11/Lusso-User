
type PostMetric = {
    icon: string;
    content: string;
    impressions: number;
};

type PostListCardProps = {
    metrics: PostMetric[];
};

const ListOfPostsCard: any = ({ metrics }: PostListCardProps) => {
    return (
        <div className="w-full p-6 rounded-2xl card-bg-dev text-white">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-indigo-400">
                <span className="text-2xl font-bold">List of posts</span>
                <span className="text-sm font-semibold">Impressions</span>
            </div>
            {/* Data Rows */}
            <div className="space-y-4">
                {metrics.slice(0, 6).map((metric, index) => (
                    <div key={index} className="flex justify-between gap-5 md:gap-3 items-center">
                        <div className="flex items-center gap-4">
                            <img src={metric.icon} alt="" className="w-12 h-12 rounded-xl" />
                            <span className="text-sm">{metric.content}</span>
                        </div>
                        <span>{metric.impressions}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOfPostsCard;