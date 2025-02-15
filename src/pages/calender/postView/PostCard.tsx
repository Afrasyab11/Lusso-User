export const PostCard = ({ icon, title, subtitle, image, stats, description, isMobile }: any) => (
    <div
        className={`p-6 rounded-xl ${isMobile
            ? 'bg-gradient-to-r from-[#2D246C] via-[#1A1442] to-[#25204A] border border-blue-300'
            : ''
            }`}
    >
        <div className="flex items-center space-x-4 mb-4">
            <img
                src={icon}
                alt={title}
                className="border border-[#665ba6] rounded-lg px-3 py-4"
            />
            <div>
                <h2 className="text-white font-medium text-xl">{title}</h2>
                {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
            </div>
        </div>
        {image && (
            <div className="w-full rounded-md my-4">
                <img src={image} alt={title} className="w-full" />
            </div>
        )}
        {stats && (
            <div className="flex justify-between text-sm text-gray-400 my-2">
                <div className="flex gap-4">
                    {stats.map((stat: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            {stat.icon}
                            <span>{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {description && <p className="text-white text-base">{description}</p>}
    </div>
);