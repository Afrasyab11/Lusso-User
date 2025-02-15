import React from 'react';
import Select, { SingleValue } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface InputProps {
  label?: string;
  name?: string;
  value?: SingleValue<OptionType>;
  options: OptionType[];
  placeholder?: string;
  borderRadius?: number;
  borderSize?: string;
  borderColor?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  className?: string;
  errorMessage?: string;
  onChange?: (newValue: SingleValue<OptionType>, actionMeta: any) => void;
}

const Dropdown: React.FC<InputProps> = ({
  label = '',
  value = null,
  options = [],
  placeholder = 'Select...',
  borderRadius = 50,
  borderSize = '1px',
  borderColor = '#A768FD',
  required = false,
  disabled = false,
  className = '',
  onChange = () => console.log('...clicked'),
  error = false,
  errorMessage = '',
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: borderRadius,
      border: `${borderSize} solid ${error ? '#F04438' : borderColor}`,
      backgroundColor: 'rgba(4, 4, 4, 0.20)',
      minHeight: 50,
      paddingLeft: 8,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#FFFFFF', // Change to light color for visibility
      fontWeight: '500',
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 1050,
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'rgba(4, 4, 4)',
      borderRadius: 10,
      zIndex: 1050,
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused
        ? 'rgba(167, 104, 253, 0.8)'
        : 'rgba(4, 4, 4)',
      color: '#FFFFFF99',
      padding: '8px 12px',
    }),
  };

  return (
    <div>
      <label>
        <span className="text-white font-normal text-[14px]">
          {label ?? ''}
          {required && <span className="text-[#F04438] ms-1">*</span>}
        </span>
        <Select
          placeholder={placeholder}
          className={`mt-2 z-50 ${className}`}
          value={value}
          styles={customStyles}
          options={options}
          onChange={onChange}
          isDisabled={disabled}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
      </label>
      {error && <span className="errorField">{errorMessage ?? ''}</span>}
    </div>
  );
};

export default Dropdown;
