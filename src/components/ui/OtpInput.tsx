import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookies } from '../../utils/utils';
// import '../../pages/auth/';

interface JwtPayload {
    role: string;
    // Add other properties if needed
}

interface OtpInputProps {
    length?: number;
    timeInSeconds?: number;
    sendTo?: string;
    error?: boolean;
    errorMessage?: string;
    onChange?: (value: string) => void;
    onResendCode?: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
    length = 6,
    timeInSeconds = 60,
    sendTo = '',
    error = false,
    errorMessage = '',
    onChange = () => console.log('...enter'),
    onResendCode = () => console.log('...Clicked'),
}) => {
    const navigate = useNavigate();

    const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
    const [timeLeft, setTimeLeft] = useState<number>(timeInSeconds);

    const [invalidField, setInvalidField]: any = useState('');
    const [isLoading, setIsLoading]: any = useState('');
    const [verified, setVerified]: any = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!timeLeft) return;
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleOTPChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const { value, selectionStart } = e.target;
        const newOTP = [...otp];

        newOTP[index] = value;
        onChange(newOTP.join(''))
        setOTP(newOTP);

        if (value && index < otp.length - 1) {
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

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                const prevInput = document.getElementById(`otp-input-${index - 1}`);
                if (prevInput) {
                    prevInput.focus();
                }
            }
        }
    };

    const validateFields = () => {
        if (!otp.every(char => /^[A-Za-z0-9]{1}$/.test(char))) {
            // Updated regex
            setInvalidField('otperror');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
        handleVerify();
    };

    const handleVerify = () => {
        if (!validateFields()) return;
        setIsLoading(true);
        let token = getCookies('authToken');
        if (!token) {
            navigate('/login');
        }
        let headers = {
            Authorization: `Bearer ${token}`,
        };

        const otpString = otp.join('');

        axios
            .post(
                'https://api.lusso.dev/api/v1/verifyEmail',
                { token: otpString },
                { headers: headers },
            )
            .then(response => {
                console.log('response', response);
                setIsLoading(false);
                Cookies.remove('email');
                setVerified(true);
            })
            .catch(error => {
                console.log('error', error);
                setIsLoading(false);
                setInvalidField('otperror');
            });
    };

    const clickContinue = () => {
        let token = getCookies('authToken');
        console.log('$$$$$$$$$$$$$$$$$tokenin', token);
        if (token) {
            const payload = jwtDecode<JwtPayload>(token);
            if (payload.role === 'user') {
                navigate('/explore');
            } else if (payload.role === 'developer') {
                let isSubscribed = Cookies.get('subscription');
                if (isSubscribed === 'yes') {
                    navigate('/dev/dashboard');
                } else {
                    navigate('/subscribe');
                }
            }
        }
    };

    const Resend = () => {
        let token = getCookies('authToken');
        if (!token) {
            navigate('/');
        }
        let headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .post(
                'https://api.lusso.dev/api/v1/sendEmailVerification',
                {},
                { headers: headers },
            )
            .then(response => {
                console.log('response', response);
                setTimeLeft(60);
                setOTP(Array(6).fill(''));
                setInvalidField('');
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="font-inter font-black text-center mb-2 text-[16px] md:text-[12px]">
                Enter Confirmation code
            </h3>
            <p className="text-white/90 font-normal mb-4 text-[8px] md:text-[10px] flex flex-col text-center">
                A {length}-digit code was sent to
                <span>{sendTo}</span>
            </p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-6">
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {otp.map((digit, index) => (
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
                <div className="flex flex-row items-center justify-center mt-5">
                    {error && <span className="errorField">{errorMessage ?? ''}</span>}
                </div>
                <div className="flex flex-col items-center text-center justify-center text-base font-normal mt-5">
                    <span className="text-white/50">Resend link in 00:{timeLeft}</span>
                    {timeLeft === 0 ? (
                        <a
                            onClick={onResendCode}
                            className="text-[#5E91FF] font-bold hover:underline"
                            style={{ cursor: 'pointer' }}
                        >
                            Resend Link
                        </a>
                    ) : (
                        <a className="text-[#5E91FF] font-bold">Resend Link</a>
                    )}
                </div>
            </form>
        </div>
    );
};
export default OtpInput;
