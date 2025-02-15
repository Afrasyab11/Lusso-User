import { Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import Button from '../../../../components/ui/SettingButton';
import "./settingDrawer.scss";

interface OtpDrawerProps {
    opened: boolean;
    close: () => void;
    title: string;
    fields?: Array<{
        label: string;
        name: string;
        type?: string;
        placeholder: string;
        className?: string;
    }>;
    buttons?: Array<{
        label: string;
        className: string;
        onClick?: () => void;
    }>;
}

const OtpDrawer: React.FC<OtpDrawerProps> = ({ opened, close, title }) => {
    const length = 4;
    const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
    const [timeLeft, setTimeLeft] = useState<number>(60);

    useEffect(() => {
        if (!timeLeft) return;
        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value, selectionStart } = e.target;
        const newOTP = [...otp];

        newOTP[index] = value;
        setOTP(newOTP);

        if (value && index < otp?.length - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }

        if (value === '' && selectionStart === 0 && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                const prevInput = document.getElementById(`otp-input-${index - 1}`);
                if (prevInput) {
                    prevInput.focus();
                }
            }
        }
    };

    useEffect(() => {
        if (otp.every((digit) => digit !== '')) {
            close();
        }
    }, [otp, close]);

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position='right'
            zIndex="9999"
            radius="12"
            size="lg"
            withCloseButton={false}
            closeOnClickOutside={false}
            classNames={{ content: 'custom-drawer-content', header: 'remove-header' }}
        >
            <div className=" lg:px-4 lg:py-6 opacity-70 text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
                <span className="text-lg font-bold text-white">{title}</span>
                <div className='lg:col-span-2'>
                    <span className='text-sm font-normal font-[Inter] text-[#E1E1E1]'>We have send a pin your phone number, please enter 4 digit pin below </span>
                </div>
                <form autoComplete="off">
                    <div className="flex flex-col gap-y-6">
                        <div style={{ display: 'flex', gap: '30px' }}>
                            {otp?.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    id={`otp-input-${index}`}
                                    className="ac-frm-input"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '8px',
                                        border: '1px solid #FFFFFF',
                                        background: 'rgba(4, 4, 4, 0.20)',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        color: '#FFFFFF',
                                        padding: '0',
                                        boxSizing: 'border-box',
                                    }}
                                    value={digit}
                                    onChange={e => handleOTPChange(e, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    maxLength={1}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-2  text-base font-normal mt-5">
                        <div>

                            <span className="text-white/50">Resend link in 00:{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>
                        </div>
                        {timeLeft === 0 ? (
                            <a
                                // onClick={onResendCode}
                                className="text-[#5E91FF] font-bold hover:underline"
                                style={{ cursor: 'pointer' }}
                            >
                                Resend Link
                            </a>
                        ) : (<div>

                            <span className="text-[#5E91FF] font-bold">Resend Link</span>
                        </div>
                        )}
                    </div>
                    <div className='flex gap-6 lg:col-span-2 mt-5'>
                        <Button
                            label="Back"
                            className='px-4 py-2 rounded border-2 bg-transparent'
                            style={{
                                // border: '2px solid var(--accent1, #7D3CF3)',
                                backgroundColor: 'transparent',
                            }}
                            onClick={() => close()}
                        />
                        <Button
                            label="Verify"
                            className='bg-gradient-vertical rounded px-12 w-full text-white border-white'
                            style={{
                                background: "linear-gradient(90deg, #4B03CE 0 %, #F572B6 100 %)",
                                border: "1px solid #A768FD",
                            }}
                        />
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

export default OtpDrawer;
