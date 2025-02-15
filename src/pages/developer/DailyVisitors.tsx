import { ChevronLeft, ChevronRight } from 'lucide-react';
import BarChart from './Charts/BarChart';
import { VisitorDataType } from './DashBoard';
import VisitorStatistics from './VisitorStats';

interface DailyVisitorsType {
  data: VisitorDataType
}

const DailyVisitors: any = ({ data }: DailyVisitorsType) => {
  return (
    <div className="card-bg-dev text-white p-6 shadow-lg w-full rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daily visitors</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-[#792FFF80] rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="bg-[#792FFF80] py-1.5 px-4 rounded-lg">11-20 Jan</span>
          <button className="p-2 bg-[#792FFF80] rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className='md:flex gap-5 items-center'>
        <div className='md:w-2/3'>
          <BarChart />
        </div>

        <div className='md:w-1/3'>
          <VisitorStatistics visitorData={data} />
        </div>
      </div>

    </div>
  );
};

export default DailyVisitors;