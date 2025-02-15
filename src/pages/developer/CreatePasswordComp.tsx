import React, { useEffect, useState } from 'react';
import IconEye from '../../assets/icons/eye';
import IconInfoCircle from '../../assets/icons/info';
import './dev.scss';

interface CreatePasswordProps {
    data?: any;
    validation?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
    data = {},
    validation = {},
    onChange = () => console.log('...clicked'),
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [showPasswordCharacters, setShowPasswordCharacters] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!data?.emailOtp) {
            setErrorMessage('Please verify your email first')
        } else {
            setErrorMessage('');
        }
    }, [data?.emailOtp])

    return (
        <>
            <div className="md:grid grid-cols-1 md:grid-cols-2 mb-6">
                {/* <h2 className="text-primary-custom font-semibold text-[26px] text-center">
                Create Password
            </h2> */}
                {/* <div className=''> */}
                <span className="hidden md:flex justify-start items-center text-white font-normal text-[14px]">
                    <span className="justify-center items-center">
                        Password
                        <span className="text-[#F04438] ms-1">*</span>
                    </span>
                </span>
                {/* <div className="flex flex-col md:justify-center md:items-center gap-y-2"> */}
                <div className="relative justify-end items-center">
                    {/* <label> */}
                    {/* <span className="text-white font-normal text-[14px] mb-2">
                            Password
                            <span className="text-[#F04438] ms-1">*</span>
                        </span> */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                        name="password"
                        placeholder="Enter here..."
                        className="ac-frm-input h-[50px] pl-12 pr-12 mt-4"
                        value={data?.password || ''}
                        style={{
                            borderRadius: 16,
                            border: `1px solid ${(validation?.password?.error || errorMessage) ? '#F04438' : '#A768FD'
                                }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                        }}
                        onChange={onChange}
                        disabled={!data?.emailOtp}
                    />
                    {/* </label> */}
                    <span
                        onClick={() => {
                            if (data?.emailOtp)
                                setShowPasswordCharacters(!showPasswordCharacters)
                        }}
                        className="absolute right-12  transform-translate-y-1/2 cursor-pointer justify-center items-center"
                        style={{
                            zIndex: 10,
                            top: validation?.password?.error ? '43%' : '45%',
                        }}
                    >
                        <IconInfoCircle color="#888" />
                    </span>
                    <span
                        onClick={() => {
                            if (data?.emailOtp)
                                setShowPassword(!showPassword);
                        }}
                        className="absolute right-4  transform-translate-y-1/2 cursor-pointer"
                        style={{
                            zIndex: 10,
                            top: validation?.password?.error ? '43%' : '45%',
                        }}
                    >
                        <IconEye color={showPassword ? '#A768FD' : '#888'} />
                    </span>
                    {/* {showTooltip && (
                        <div className="absolute right-12 top-full mt-2 w-[250px] p-2 bg-white border border-gray-300 shadow-lg rounded text-xs text-gray-700">
                            <ul className="list-disc pl-4">
                                <li className="text-light-blue">
                                    At least one number or special character
                                </li>
                                <li className={password.match(/[A-Z]/) ? 'text-light-blue' : 'text-red-500'}>
                                    At least one upper case letter
                                </li>
                                <li className={password.match(/[a-z]/) ? 'text-light-blue' : 'text-red-500'}>
                                    At least one lower case letter
                                </li>
                                <li className={password.length >= 8 ? 'text-light-blue' : 'text-red-500'}>
                                    At least 8 characters long
                                </li>
                            </ul>
                        </div>
                    )} */}
                    {/* </div> */}
                    {errorMessage ? (
                        <span className="absolute errorField flex justify-end mt-2 w-full">{errorMessage}</span>
                    ) : validation?.password?.error && (
                        <span className="absolute errorField flex justify-end mt-3 w-full">
                            {validation?.password?.errorMessage ?? ''}
                        </span>
                    )}
                </div>

                <hr
                    className="w-full my-4 col-span-2"
                    style={{
                        height: '2px',
                        border: 'none',
                        backgroundImage:
                            'linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)',
                    }}
                />

                <span className="hidden md:flex justify-start items-center text-white font-normal text-[14px]">
                    <span>
                        ReType Password
                        <span className="text-[#F04438] ms-1">*</span>
                    </span>
                </span>
                <div className="relative">
                    {/* <label> */}
                    {/* <span className="text-white font-normal text-[14px]">
                    Re-Type Password
                    <span className="text-[#F04438] ms-1">*</span>
                </span> */}
                    <input
                        type={showConfirmedPassword ? 'text' : 'password'}
                        autoComplete="off"
                        name="confirmedPassword"
                        placeholder="Enter here..."
                        className="ac-frm-input h-[50px] pl-12 pr-12 mt-4"
                        value={data?.confirmedPassword || ''}
                        style={{
                            borderRadius: 16,
                            border: `1px solid ${(validation?.confirmedPassword?.error || errorMessage) ? '#F04438' : '#A768FD'
                                }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                        }}
                        onChange={onChange}
                        disabled={!data?.emailOtp}
                    />
                    {/* </label> */}
                    <span
                        onClick={() => {
                            if (data?.emailOtp)
                                setShowPasswordCharacters(!showPasswordCharacters);
                        }}
                        className="absolute right-12  transform-translate-y-1/2 cursor-pointer"
                        style={{
                            zIndex: 10,
                            top: validation?.confirmedPassword?.error ? '30%' : '45%',
                        }}
                    >
                        <IconInfoCircle color="#888" />
                    </span>
                    <span
                        onClick={() => {
                            if (data?.emailOtp)
                                setShowConfirmedPassword(!showConfirmedPassword);
                        }}
                        className="absolute right-4 transform-translate-y-1/2 cursor-pointer"
                        style={{
                            zIndex: 10,
                            top: validation?.confirmedPassword?.error ? '30%' : '45%',
                        }}
                    >
                        <IconEye color={showConfirmedPassword ? '#A768FD' : '#888'} />
                    </span>
                    {validation?.confirmedPassword?.error && (
                        <span className="errorField flex justify-end mt-3">
                            {validation?.confirmedPassword?.errorMessage}
                        </span>
                    )}
                </div>
                {/* </div> */}
            </div>
            <div className="flex items-center justify-center">
                {showPasswordCharacters && (
                    <div className="p-5 bg-[#360D71] shadow-lg rounded-lg  justify-center md:w-1/2">
                        <ul className="list-disc pl-4">
                            <li className="text-[#5B97FF]">
                                At least one number or special character
                            </li>
                            <li
                                className={
                                    data?.password?.match(/[A-Z]/)
                                        ? 'text-[#5B97FF]'
                                        : 'text-white'
                                }
                            >
                                At least one upper case letter
                            </li>
                            <li
                                className={
                                    data?.password?.match(/[a-z]/)
                                        ? 'text-[#5B97FF]'
                                        : 'text-white'
                                }
                            >
                                At least one lower case letter
                            </li>
                            <li
                                className={
                                    data?.password?.length >= 8 ? 'text-[#5B97FF]' : 'text-white'
                                }
                            >
                                At least 8 characters long
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreatePassword;
