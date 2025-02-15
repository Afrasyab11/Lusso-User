import React from 'react';

type Post = {
    platformIcon: string;
    title: string;
    time: string;
    reach: string;
    engagement: string;
    impressions: string;
};

type PostCardProps = {
    title: string;
    posts: Post[];
};

const PostCard: React.FC<PostCardProps> = ({ title, posts }) => {
    return (
        <div className="w-full p-6 rounded-2xl card-bg-dev text-white">
            {/* Header Row */}
            <div className="grid grid-cols-5 md:grid-cols-5 items-center mb-4 h-[50px] border-b border-indigo-400">
                <div className="col-span-2 text-xl font-semibold">
                    {title}
                </div>
                <div className="hidden md:block col-span-1 text-center">
                    <span>Reach</span>
                </div>
                <div className="hidden md:block col-span-1 text-right">
                    <span>Engagement</span>
                </div>
                <div className="hidden md:block col-span-1 text-right">
                    <span>Impressions</span>
                </div>
            </div>
            {/* Data Rows */}
            <div>
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-5 items-center mb-4 h-auto md:h-[50px]"
                    >
                        <div className="flex items-center gap-4 col-span-2">
                            <img src={post.platformIcon} alt={post.title} className="w-12 h-12" />
                            <div>
                                <h3 className="font-semibold">{post.title}</h3>
                                <p className="text-xs">{post.time}</p>
                            </div>
                        </div>
                        <div className="md:text-center col-span-1">
                            <div className="block md:hidden font-semibold">Reach:</div>
                            <span>{post.reach}</span>
                        </div>
                        <div className="md:text-right col-span-1">
                            <div className="block md:hidden font-semibold">Engagement:</div>
                            <span>{post.engagement}</span>
                        </div>
                        <div className="md:text-right col-span-1">
                            <div className="block md:hidden font-semibold">Impressions:</div>
                            <span>{post.impressions}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostCard;
