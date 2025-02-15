import React from 'react';
import { cn } from '../../lib/utils';
import { checkNullOrEmpty } from '../../utils/utils';

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
    textarea?: boolean;
    subTitle?: string;
    append?: any;
    type?: 'text' | 'email' | 'number' | 'phone' | 'password' | 'radio';
    onChange?: any;
    maxLength?: any
}

const Ninput: React.FC<InputProps> = ({
    label = '',
    name = '',
    value = '',
    placeholder = 'Enter here...',
    textarea = false,
    subTitle = '',
    checked = false,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    type = 'text',
    append = {},
    onChange = () => console.log('...clicked'),
    error = false,
    errorMessage = '',
    maxLength
}) => {
    return (
        <div>
            <label className="grid grid-cols-1 md:grid-cols-2 mb-4">
                <span className="hidden md:flex flex-col justify-center text-white font-normal text-[14px]">
                    <span>
                        {label ?? ''}
                        {required && <span className="text-[#F04438] ms-1">*</span>}
                    </span>
                    {!checkNullOrEmpty(subTitle) && (
                        <span className=" text-sm" style={{ color: '#FFFFFF99' }}>
                            {' '}
                            {subTitle ?? ''}
                        </span>
                    )}
                </span>
                {textarea ? (
                    // <div className="">
                    <div className='flex flex-col'>
                        <textarea
                            // type={type}
                            rows={3}
                            name={name ?? ''}
                            autoComplete="off"
                            placeholder={placeholder ?? ''}
                            className={cn(
                                ' rounded-sm p-6 my-4 ',
                                className,
                            )}
                            // value={value || ''}
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                background: 'rgba(4, 4, 4, 0.20)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // textIndent: '25px',
                                paddingTop: '12px',
                            }}
                            onChange={onChange}
                            disabled={disabled}
                            readOnly={readOnly}
                            maxLength={100}
                        />
                        {!error && value?.length > 0 && (
                            <div className="font-inter font-normal text-sm text-end justify-end" style={{
                                color: "#FFFFFF99"
                            }}>
                                {100 - value?.length + "  " + "characters left"}
                            </div>
                        )}
                    </div>
                ) : // <div className="relative flex items-center">
                    append && Object?.keys(append)?.length !== 0 ? (
                        <label className="flex items-center h-[50px] mt-4">
                            {append?.append?.toLowerCase() !== 'end' && (
                                <span
                                    className={cn(
                                        'flex justify-center items-center rounded-l-2xl px-4 text-[#FFFFFF99] h-full',
                                        append?.className,
                                    )}
                                    style={{
                                        border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                    }}
                                    onClick={() => {
                                        console.log('Verify button clicked');
                                        append?.onClick();
                                    }}
                                >
                                    {append?.type?.toLowerCase() === 'text' ? append?.text ?? '' : <img src={append?.icon ?? ''} alt={name + '-icon'} className='h-6 w-8' />}
                                </span>
                            )}
                            <input
                                type={type}
                                name={name ?? ''}
                                autoComplete="off"
                                placeholder={placeholder ?? ''}
                                className={cn(
                                    `rounded-${append?.append?.toLowerCase() === 'end' ? 'l' : 'r'
                                    }-2xl text-start pl-4 pr-10 flex-1 h-full`,
                                    className,
                                )}
                                value={value || ''}
                                style={{
                                    border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                }}
                                onChange={onChange}
                                disabled={disabled}
                                readOnly={readOnly}
                                maxLength={maxLength}
                            />
                            {append?.append?.toLowerCase() == 'end' && (
                                <span
                                    className={cn(
                                        'flex justify-center items-center rounded-r-2xl px-4 text-[#FFFFFF99] h-full',
                                        append?.className,
                                    )}
                                    style={{
                                        border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                    }}
                                    onClick={() => {
                                        console.log('Verify button clicked');
                                        append?.onClick();
                                    }}
                                >
                                    {append?.type?.toLowerCase() === 'text' ? append?.text ?? '' : <img src={append?.icon ?? ''} alt={name + '-icon'} className='h-4 w-6' />}
                                </span>
                            )}
                        </label>
                    ) : (
                        <input
                            type={type}
                            name={name ?? ''}
                            autoComplete="off"
                            placeholder={placeholder ?? ''}
                            className={cn(
                                'ac-frm-input  rounded-sm badge h-[50px] text-start pl-4 pr-10 flex-1 mt-4',
                                className,
                            )}
                            value={value || ''}
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${error ? '#F04438' : '#A768FD'}`,
                                background: 'rgba(4, 4, 4, 0.20)',
                            }}
                            onChange={onChange}
                            disabled={disabled}
                            readOnly={readOnly}
                            maxLength={maxLength}
                        />
                    )
                    // </div>
                }

            </label >
            {
                error && (
                    <div className="errorField text-right">{errorMessage ?? ''}</div>
                )
            }
        </div >
    );
};

export default Ninput;

<label className="input input-bordered flex items-center gap-2">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
    >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
    </svg>
    <input type="text" className="grow" placeholder="Username" />
</label>;

