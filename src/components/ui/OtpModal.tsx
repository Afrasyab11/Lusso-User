import { Modal } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import arrow from '../../assets/icons/arrow.png';
import emailVector from '../../assets/icons/emailVector.png';

const OtpModal = ({
    opened,
    close,
    onOtpVerify,
    onChange,
    data,
    timeInSeconds,
    error,
    errorMessage,
    onResendCode,
    emailOtpErr,
    setEmailOtpErr,
    verifyEmail,
}: any) => {
    // const [opened, { open, close }] = useDisclosure(false);
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | any)[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(timeInSeconds);

    const handleChange = (e: any, index: number) => {
        const { value } = e;

        // Handle forward typing
        if (/^[A-Za-z0-9]$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOtp(newOTP);
            onChange(newOTP.join(''));

            if (value && index < otp?.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }

        // Handle backspace
        if (value === '') {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOtp(newOTP);
            onChange(newOTP.join(''));

            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleBackspace = (element: any, index: any) => {
        if (element.value === '') {
            if (element.previousSibling) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleClose = async () => {
        if (data?.emailVerify) {
            await close();
        }
        setOtp(new Array(6).fill(''));
        await onChange('emailVerify', false);

        setEmailOtpErr('');
    };

    useEffect(() => {
        if (opened) {
            setOtp(new Array(6).fill(''));
            onChange('');
            setEmailOtpErr('');
        }
    }, [opened]);

    useEffect(() => {
        if (!timeLeft) return;
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <>
            <Modal
                opened={opened}
                onClose={handleClose}
                overlayProps={{
                    backgroundOpacity: 0.59,
                    blur: 4,
                }}
                size={'sm'}
                closeOnClickOutside={false}
                lockScroll={true}
                styles={{
                    header: {
                        backgroundColor: '#1B0130',
                        color: '#FFFFFF',
                        display: 'none',
                    },
                    body: {
                        backgroundColor: '#1B0130',
                    },
                }}
                data-centered
            >
                <div className="flex items-center justify-center bg-[#1B0130] p-4">
                    <div className="bg-[#1B0130] p-6">
                        <div className="flex justify-start mb-4">
                            <div className="w-6 h-6">
                                <img src={emailVector} alt="email" />
                            </div>
                        </div>
                        <h3 className="text-[#00FFFF] font-inter text-balance text-2xl font-semibold mb-4">
                            Enter verification code from email
                        </h3>
                        <p className="font-inter font-medium text-[#FFFFFF] text-sm mb-4">
                            Please enter the code we emailed you on{' '}
                            <span className="font-inter font-medium text-[#FFFFFF] text-sm">
                                {data?.email}
                            </span>
                        </p>
                        <div className="flex justify-between mt-6 space-x-2 mb-4">
                            {otp?.map((data, index) => (
                                <input
                                    key={index}
                                    className="w-1/6 h-16 bg-transparent border border-[#00A8E8] text-center text-white text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                                    type="text"
                                    maxLength={1}
                                    value={data}
                                    ref={el => (inputRefs.current[index] = el)}
                                    onChange={e => handleChange(e.target, index)}
                                    onKeyDown={e =>
                                        e.key === 'Backspace' && handleBackspace(e.target, index)
                                    }
                                    inputMode="text"
                                    pattern="[A-Za-z0-9]*"
                                />
                            ))}
                        </div>
                        {emailOtpErr && (
                            <p className="text-red-500 text-sm mb-4">{emailOtpErr}</p>
                        )}
                        <button
                            className="w-full mt-8 bg-[#290468] text-white py-3 px-3 rounded-lg flex items-center justify-between space-x-2 transition duration-200 hover:bg-[#411685]"
                            onClick={onOtpVerify}
                        >
                            <span>Continue</span>
                            <img src={arrow} alt="arrow" />
                        </button>
                        <p className="text-center text-white text-sm mt-4">
                            Resend code in 00 :{' '}
                            <span className="text-[#00A8E8]">
                                {timeLeft < 10 ? '0' + timeLeft : timeLeft}{' '}
                                {
                                    timeLeft === 0 && (
                                        <a
                                            onClick={async () => {
                                                await onResendCode();
                                                // if (!timeLeft) return;
                                                setTimeout(() => {
                                                    setTimeLeft(60 - 1);
                                                }, 1000);
                                            }}
                                            className="text-[#5E91FF] font-bold hover:underline"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Resend Link
                                        </a>
                                    )
                                    // : (
                                    //     <a className="text-[#5E91FF] font-bold">Resend Link</a>
                                    // )
                                }
                            </span>
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default OtpModal;
