import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    increase: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, increase }) => (
    <div className="card-bg-dev rounded-2xl p-4 text-white flex flex-col justify-between h-full">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2">
                <span className="text-5xl font-bold">{value}</span>
                <span className='text-md font-medium'>{increase}</span>
            </div>
            <div className="flex items-center text-xs text-white">
                <TrendingUp size={30} className="mr-1" />
            </div>
        </div>
    </div>
);
export default MetricCard