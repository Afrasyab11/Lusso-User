import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps {
    label?: string;
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
    type?:
    | 'text'
    | 'email'
    | 'number'
    | 'phone'
    | 'password'
    | 'radio'
    | 'textarea';
    rows?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTextareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({
    label = '',
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
    onTextareaChange = () => console.log('...clicked'),
    error = false,
    errorMessage = '',
    rows = 3
}) => {
    return (
        <div>
            {type === 'radio' ? (
                <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                        type={type}
                        name={name ?? ''}
                        className="sr-only peer"
                        // className={cn("rounded-pill badge h-[44px]", className)}
                        value={value || ''}
                        checked={checked || false}
                        onChange={onChange}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                    <div className="w-[25px] h-[25px] rounded-full bg-white border-4 border-transparent peer-checked:border-[#985FFF] peer-checked:bg-white"></div>
                    <span className="text-white text-[26px] font-medium">
                        {label ?? ''}
                        {required && <span className="text-[#F04438] ms-1">*</span>}
                    </span>
                </label>
            ) : (
                <label>
                    <span className="text-white font-normal text-[14px]">
                        {label ?? ''}
                        {required && <span className="text-[#F04438] ms-1">*</span>}
                    </span>
                    {type === 'textarea' ? (
                        <textarea
                            rows={rows}
                            name={name ?? ''}
                            autoComplete="off"
                            placeholder={placeholder ?? ''}
                            className={cn(
                                'custom-desc-scrollbar mt-2 ac-frm-input',
                                className,
                            )}
                            value={value || ''}
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                background: 'rgba(4, 4, 4, 0.20)',
                            }}
                            onChange={onTextareaChange}
                            disabled={disabled}
                            readOnly={readOnly}
                        />
                    ) : (
                        <input
                            type={type}
                            name={name ?? ''}
                            autoComplete="off"
                            placeholder={placeholder ?? ''}
                            className={cn(
                                'ac-frm-input rounded-pill badge h-[50px] mt-2',
                                className,
                            )}
                            value={value || ''}
                            style={{
                                borderRadius: 90,
                                border: "1px solid var(--outline, #6C8CFF80)",
                                background: 'rgba(4, 4, 4, 0.20)',
                            }}
                            onChange={onChange}
                            disabled={disabled}
                            readOnly={readOnly}
                        />
                    )}
                </label>
            )}
            {error && <span className="errorField">{errorMessage ?? ''}</span>}
        </div>
    );
};

export default Input;
