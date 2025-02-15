import MetricCard from '../../components/cards/MetricCard';

const DevDashboardStats: any = ({ metrics }: any) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                title="Impressions"
                value={metrics.impressions}
                increase="+8.2k increase/day"
            />
            <MetricCard
                title="Clicks"
                value={metrics.clicks}
                increase="+8.2k increase/day"
            />
            <MetricCard
                title="CTR"
                value={`${metrics.ctr}%`}
                increase="+8.2k increase/day"
            />
            <MetricCard
                title="CPC"
                value={`$${metrics.cpc.toFixed(2)}`}
                increase="Cost/Click"
            />
        </div>
    );
};

export default DevDashboardStats