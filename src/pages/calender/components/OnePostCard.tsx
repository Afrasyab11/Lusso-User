import { TrendingUp } from "lucide-react";

interface OnePostCardProps {
    heading: string;
    value: string;
    increase: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const OnePostCard = ({ heading, value, increase, onClick }: OnePostCardProps) => {
    return (
        <div className="flex-shrink-1 card-bg-dev rounded-2xl p-4 text-white w-full cursor-pointer" onClick={onClick}>
            <div className="text-lg font-semibold">{heading}</div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-3xl font-bold">{value}</p>
                <TrendingUp />
            </div>
            <div className="text-sm mt-2">+{increase}</div>
        </div>
    );
};

export default OnePostCard;
