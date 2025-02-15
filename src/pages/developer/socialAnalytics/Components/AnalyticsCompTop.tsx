// import DatePicker from "../../../../components/common/DatePicker";
import { DateRangePicker } from "../../../../components/common/Calender/date-range-picker";
interface AnalyticCompTopProps {
    title: string;
    calenderValue: { [key: string]: null | Date };
    onChangeCalender: (value: { [key: string]: null | Date }) => void;
}

const AnalyticCompTop = ({
    title = '',
    calenderValue,
    onChangeCalender,
}: AnalyticCompTopProps) => {
    return (
        <div className="header flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white" style={{ color: "white" }}>{title}</h2>
            <DateRangePicker
                onUpdate={({ range }) => onChangeCalender({ startDate: range?.from || new Date(), endDate: range?.to || new Date() })}
                initialDateFrom={calenderValue?.startDate || new Date()}
                initialDateTo={calenderValue?.endDate || new Date()}
            />
        </div>

    );
};

export default AnalyticCompTop;
