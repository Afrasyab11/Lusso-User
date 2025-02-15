import React from 'react';

interface RadioOptions {
    value: string;
    label: string;
}

interface RadioProps {
    label?: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    optionClassName?: string;
    errorMessage?: string;
    options: RadioOptions[];
    onChange?: (select: string) => void;
}

const Radio: React.FC<RadioProps> = ({
    label = '',
    value = '',
    required = false,
    disabled = false,
    optionClassName = 'flex gap-5',
    options = [],
    onChange = () => console.log('...clicked'),
    error = false,
    errorMessage = '',
}) => {
    return (
        <div className='space-y-2'>
            <span className="text-white font-normal text-[14px]">
                {label ?? ''}
                {required && <span className="text-[#F04438] ms-1">*</span>}
            </span>
            <div className={optionClassName}>
                {options?.map((option, index) => (
                    <label
                        key={option.value + '_' + index}
                        className="flex items-center gap-5 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="radio-1"
                            className="radio"
                            checked={value === option.value}
                            onChange={() => { if (!disabled) onChange(option.value) }}
                        />
                        <span className="text-white font-normal text-lg">
                            {option.label ?? ''}
                        </span>
                    </label>
                ))}
            </div>
            {error && <span className="errorField">{errorMessage ?? ''}</span>}
        </div>
    );
};

export default Radio;
