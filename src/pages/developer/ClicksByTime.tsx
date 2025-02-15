import React from 'react';

const ClicksByTime = ({ data }: any) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const hours = [24, 21, 17, 13, 10, 5, 1];


    return (
        <div className="card-bg-dev text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">Clicks by time</h2>
            <p className="mb-6">Total clicks <span className="text-md font-bold">2500</span></p>

            <div className="grid grid-cols-8 gap-1">
                {hours.map((hour, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="text-right pr-2 text-sm font-semibold">{hour}</div>
                        {data[rowIndex].map((value: any, colIndex: number) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`aspect-square rounded font-semibold px-1 
                                ${value > 0
                                        ? value >= 250
                                            ? 'bg-[#B9A7FF]'
                                            : value >= 100
                                                ? 'bg-[#B9A7FF]'
                                                : 'bg-[#5A5089]'
                                        : 'bg-[#D9D9D933]'
                                    } flex items-center justify-center`}
                            >
                                {value >= 250 && <span className="text-xs text-black">{value}</span>}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
                <div className="col-span-1"></div>
                {days.map((day, index) => (
                    <div key={index} className="text-center text-xs font-semibold">{day}</div>
                ))}
            </div>
        </div>
    );
};

export default ClicksByTime;