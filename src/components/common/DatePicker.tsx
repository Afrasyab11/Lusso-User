// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
// import 'react-calendar/dist/Calendar.css';

import { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
    value: { [key: string]: null | Date };
    maxDate?: Date;
    minDate?: Date;
    format?: string;
    className?: string;
    onChange: (value: { [key: string]: null | Date }) => void;
}

const DatePicker = ({
    value,
    onChange,
    maxDate,
    minDate,
    format = 'y-MM-dd',
    className = 'bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded'
}: DatePickerProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState<Boolean>(false);
    const dateState = [
        {
            key: 'selection',
            startDate: value.startDate ? value.startDate : undefined,
            endDate: value.endDate ? value.endDate : undefined,
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    const fomatedDate = (date: Date | null) => {

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date?.toLocaleDateString('en-US', options);
    };

    return (
        <div>
            <span
                className={`cursor-pointer ${className}`}
                onClick={() => setShowCalendar(!showCalendar)}
            >
                {fomatedDate(value.startDate)} - {fomatedDate(value.endDate)}
            </span>

            {showCalendar && <dialog className="modal modal-open">
                <div className="modal-box w-11/12 max-w-5xl rounded-none p-0 bg-transparent" ref={modalRef}>
                    <DateRangePicker
                        onChange={(item: any) => onChange(item.selection)}
                        moveRangeOnFirstSelection={false}
                        maxDate={maxDate}
                        minDate={minDate}
                        months={2}
                        ranges={dateState}
                        direction="horizontal"
                    />
                </div>
            </dialog>}
        </div>
    );
};

export default DatePicker;
