import React, { useState } from 'react';
import { default as IconEye } from "../../assets/icons/eye";
import { cn } from '../../lib/utils';

interface InputProps {
    label?: string;
    labelKey?: string;
    name?: string;
    value?: any;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    error?: boolean;
    className?: string;
    errorMessage?: string;
    borderColor?: string;
    type?: 'text' | 'email' | 'number' | 'phone' | 'password' | 'radio' | 'textarea';
    rows?: number;
    onChange?: any;
    maxLength?: any;
    onTextareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({
    label = '',
    labelKey = "",
    name = '',
    value = '',
    placeholder = 'Enter here...',
    checked = false,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    type = 'text',
    onChange = () => console.log('...clicked'),
    error = false,
    errorMessage = '',
    borderColor,
    rows = 3,
    maxLength
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputClasses = cn(
        'ac-frm-input rounded-pill badge h-[50px] mt-2',
        className
    );

    const borderStyle = `1px solid ${error ? '#F04438' : borderColor ?? '#A768FD'}`;
    const sharedStyles = {
        borderRadius: type === 'textarea' ? 16 : 90,
        border: borderStyle,
        background: 'rgba(4, 4, 4, 0.20)',
    };

    return (
        <div>
            {label && (
                <label className="block text-white font-normal text-[14px]">
                    {label}
                    {required && <span className="text-[#F04438] ms-1">*</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    rows={rows}
                    name={name}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={cn('custom-desc-scrollbar mt-2', inputClasses)}
                    value={value}
                    style={sharedStyles}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLength}
                />
            ) : type === 'password' ? (
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        // autoComplete="off"
                        autoComplete="new-password"
                        placeholder={placeholder}
                        className={inputClasses}
                        value={value}
                        style={sharedStyles}
                        onChange={onChange}
                        disabled={disabled}
                        readOnly={readOnly}
                        maxLength={maxLength}
                    />
                    <span
                        className="absolute right-4 top-[56%] transform -translate-y-1/2 cursor-pointer"
                        // style={{ zIndex: 10 }}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {/* {showPassword ? <IconEyeOff color="#888" /> : <IconEye color="#888" />} */}
                        <IconEye color={showPassword ? "#A768FD" : "#888"} />
                    </span>
                </div>
            ) : type === 'radio' ? (
                <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        className="sr-only peer"
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                    <div className="w-[25px] h-[25px] rounded-full bg-white border-4 border-transparent peer-checked:border-[#985FFF]"></div>
                    <span className="text-white text-[26px] font-medium">{label || labelKey}</span>
                </label>
            ) : (
                <input
                    type={type}
                    name={name}
                    autoComplete={type === 'text' ? "off" : 'new-password'}
                    placeholder={placeholder}
                    className={inputClasses}
                    value={value}
                    style={sharedStyles}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLength}
                />
            )}

            {error && <span className="errorField">{errorMessage}</span>}
        </div>
    );
};

export default Input;
