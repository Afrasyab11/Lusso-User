import React from 'react';
import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from 'react-select';

// Define types for component props
export type OptionType = { value: string; label: string };

export type CustomSelectProps = {
    value: SingleValue<OptionType> | MultiValue<OptionType>;
    onChange: (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
    invalidField?: string; // Optional prop for handling validation
};

// Define custom styles function
export const getCustomStyles = (invalidField?: string, isSettings = false): StylesConfig<OptionType> => ({
    control: (provided, state) => ({
        ...provided,
        borderRadius: '50px',
        border: `1px solid ${invalidField === 'credserror' ? '#F04438' : state.isFocused ? isSettings ? '#424D9A' : 'rgb(137 108 255 / 80%)' : 'rgb(137 108 255 / 80%)'}`,
        backgroundColor: 'rgba(46, 36, 108, 0.1)',
        color: '#FFFFFF99',
        minHeight: 48,
        paddingLeft: 8,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#FFFFFF99',
        paddingLeft: 8,
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#FFFFFF99',
        paddingLeft: 8,
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
        padding: 0,
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(167, 104, 253, 1)' : '#1d1447', // Background color for each option
        borderRadius: '50px',
        color: '#FFFFFF99',
        padding: '8px 12px',
        border: '1px solid rgb(182 138 255 / 99%)',
        marginBottom: '1px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
});

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, invalidField }) => {
    const styles = getCustomStyles(invalidField);

    return (
        <Select
            value={value}
            onChange={onChange}
            styles={styles}
            options={[
                { value: '', label: 'Select your age' },
                { value: '18-24', label: '18-24' },
                { value: '24-60', label: '24-60' },
                { value: '60+', label: '60+' },
            ]}
            placeholder="Select your age group"
        />
    );
};

export default CustomSelect;
