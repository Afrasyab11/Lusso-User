import React from 'react';
import Select, { SingleValue } from 'react-select';
import { cn } from '../../lib/utils';
import { checkNullOrEmpty } from '../../utils/utils';

interface OptionType {
    value: string;
    label: string;
}

interface InputProps {
    label?: string;
    value?: SingleValue<OptionType>;
    options: OptionType[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    className?: string;
    append?: any;
    errorMessage?: string;
    dropdownSubTitle?: string;
    onChange?: (newValue: SingleValue<OptionType>, actionMeta: any) => void;
}

const SelectDropdown: React.FC<InputProps> = ({
    label = '',
    value = null,
    options = [],
    placeholder = 'Select...',
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    append = {},
    onChange = () => console.log('...clicked'),
    error = false,
    dropdownSubTitle = "",
    errorMessage = '',
}) => {
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: append?.append?.toLowerCase() === 'end' ? '16px 0px 0px 16px' : append?.append?.toLowerCase() === 'start' ? '0px 16px 16px 0px' : 16,
            border: `1px solid ${error ? '#F04438' : '#A768FD'}`, // Conditional border color
            backgroundColor: 'rgba(4, 4, 4, 0.20)', // Updated background color
            // color: '#FFFFFF99',
            minHeight: 50, // Ensure the height matches the input field
            // paddingLeft: 8, // Ensure padding matches the input field
            // display: 'flex',
            // justifyContent: "start",
            // alignItems: 'start', // Ensure the text is aligned similarly
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#FFFF',
            paddingLeft: 15, // Fixed typo from padddingLeft to paddingLeft
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#FFFFFF99',
            paddingLeft: 15, // Fixed typo from padddingLeft to paddingLeft
        }),
        menu: (provided: any) => ({
            ...provided,
            background: 'rgba(4, 4, 4)',
            borderRadius: 10,
            padding: 0, // Remove any extra padding if needed
        }),
        menuList: (provided: any) => ({
            ...provided,
            padding: 0, // Remove any extra padding if needed
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            background: state.isFocused
                ? 'rgba(167, 104, 253, 0.8)'
                : 'rgba(4, 4, 4)',
            color: '#FFFFFF99',
            // padding: '8px 12px', // Adjust padding if needed
        }),
        indicatorSeparator: () => ({
            display: 'none', // Hide the indicator separator
        }),
    };

    return (
        <div >
            <label className={`grid grid-cols-1 md:grid-cols-${label ? '2' : '1'} mb-4`}>

                <span className='hidden md:flex flex-col justify-center text-white font-normal text-[14px]'>
                    <span
                    >
                        {label ?? ''}
                        {label && required && <span className="text-[#F04438] ms-1">*</span>}
                    </span>
                    {!checkNullOrEmpty(dropdownSubTitle) && (
                        <span className="text-sm" style={{ color: '#FFFFFF99' }}> {dropdownSubTitle ?? ''}</span>
                    )}

                </span>
                {append && Object.keys(append)?.length !== 0 ? (
                    <label className="flex items-center h-[50px] mt-2 ">
                        {append?.append?.toLowerCase() !== 'end' && (
                            <span
                                className={cn(
                                    'flex justify-center items-center rounded-l-2xl px-4 text-[#FFFFFF99] h-full',
                                    append?.className,
                                )}
                                style={{
                                    border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                }}
                            >
                                {append?.type?.toLowerCase() === 'text' ? append?.text ?? '' : <img src={append?.icon ?? ''} alt={'dropdown-icon'} className='h-6 w-8' />}
                            </span>
                        )}
                        <Select
                            placeholder={placeholder}
                            className={`flex-1  ${className}`}
                            value={value}
                            styles={customStyles}
                            options={options}
                            onChange={onChange}
                            isDisabled={disabled}

                        // readOnly={readOnly}
                        />
                        {append?.append?.toLowerCase() === 'end' && (
                            <span
                                className={cn(
                                    'flex justify-center items-center rounded-r-2xl px-4 text-[#FFFFFF99] h-full',
                                    append?.className,
                                )}
                                style={{
                                    border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                }}
                            >
                                {append?.type?.toLowerCase() === 'text' ? append?.text ?? '' : <img src={append?.icon ?? ''} alt={'dropdown-icon'} className='h-4 w-6' />}
                            </span>
                        )}
                    </label>) : <Select
                    placeholder={placeholder}
                    className={`mt-2 flex-1  ${className}`}
                    value={value}
                    styles={customStyles}
                    options={options}
                    onChange={onChange}
                    isDisabled={disabled}

                // readOnly={readOnly}
                />}
            </label>
            {error && <div className="errorField text-right">{errorMessage ?? ''}</div>}
        </div>
    );
};

export default SelectDropdown;
