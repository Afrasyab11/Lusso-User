import { Switch } from '@mantine/core';
import { useState } from 'react';

type SwitchItem = {
    text: string;
};

interface SwitchComponentProps {
    title: string;
    switchItems: SwitchItem[];
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ title, switchItems }) => {
    const [checkedState, setCheckedState] = useState<boolean[]>(
        switchItems?.map(() => false)
    );

    const handleSwitchChange = (index: number) => {
        const newCheckedState = [...checkedState];
        newCheckedState[index] = !newCheckedState[index];
        setCheckedState(newCheckedState);
    };

    return (
        <div className="card-bg-dev rounded-2xl px-4 py-3 md:py-6 opacity-70 text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <div className='text-nowrap'>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            {/* Switch Items */}
            {
                switchItems?.map((item, index) => (
                    <div key={index} className="flex gap-4 lg:col-span-2">
                        <Switch
                            checked={checkedState[index]}
                            onChange={() => handleSwitchChange(index)}
                            styles={(theme) => ({
                                track: {
                                    background: checkedState[index]
                                        ? "#5899FF"
                                        : theme.colors.gray[4],
                                    borderRadius: '20px',
                                    border: 'none',
                                },
                                thumb: {
                                    background: checkedState[index]
                                        ? "#0368FF"
                                        : theme.colors.gray[6],
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '20px',
                                    transition: 'background 0.3s ease',
                                },
                            })}
                        />
                        <span className="text-sm" style={{ color: 'white !important' }}>{item?.text}</span>
                    </div>
                ))
            }
        </div >
    );
};

export default SwitchComponent;
