import { allCountries } from 'country-region-data';
import React, { useState } from 'react';
import Ninput from '../../components/ui/Ninput';
import OtpModal from '../../components/ui/OtpModal';
import CreatePassword from './CreatePasswordComp';
interface ContactInfoProps {
    data?: any;
    validation?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeProperty?: (name: string, value: any) => void;
    onSendCode?: (email?: boolean) => void;
    onResendCode?: () => void;
    verifyEmail?: boolean;
    onOtpVerify: any;
    close: any;
    open: any;
    opened: any;
    emailOtpErr: any
    setEmailOtpErr: any
}

const ContactInfo: React.FC<ContactInfoProps> = ({
    data = {},
    validation = {},
    onChange = () => console.log('...clicked'),
    onChangeProperty = () => console.log('...clicked'),
    onSendCode = () => console.log('...clicked'),
    onResendCode = () => console.log('...clicked'),
    verifyEmail,
    onOtpVerify,
    close,
    open,
    opened,
    emailOtpErr,
    setEmailOtpErr,
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // const [opened, { open, close }] = useDisclosure(false);
    const countryOptions = allCountries.map(country => ({
        value: country[1],
        label: country[0],
    }));

    return (
        <div className="flex flex-col gap-0">
            {opened && <OtpModal
                opened={true}
                close={close}

                // close={close}
                onOtpVerify={onOtpVerify}
                onChange={(value: any) => onChangeProperty('emailOtpValue', value)}
                data={data}
                timeInSeconds={60}
                error={validation?.emailOtpValue?.error ?? false}
                errorMessage={validation?.emailOtpValue?.errorMessage ?? ''}
                onResendCode={onResendCode}
                emailOtpErr={emailOtpErr}
                setEmailOtpErr={setEmailOtpErr}
                verifyEmail={verifyEmail}
            />}
            {/* {!verifyEmail && (
                <>
                    <h2 className="text-primary-custom font-semibold text-[24px] md:text-[26px] text-center">
                        Legal Name and Country
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={data?.fullName ?? ''}
                            onChange={onChange}
                            error={validation?.fullName?.error ?? false}
                            errorMessage={validation?.fullName?.errorMessage ?? ''}
                            required
                        />
                        <Dropdown
                            label="Country/Region"
                            value={countryOptions?.find(i => i?.label === data?.country)}
                            placeholder="Select your country"
                            options={countryOptions}
                            onChange={option => onChangeProperty('country', option?.label)}
                            error={validation?.country?.error ?? false}
                            errorMessage="Please select country"
                            required
                        />
                    </div>
                </>
            )}
            <h2 className="text-white text-[20px] md:text-[24px]  text-left md:text-center">
                {!verifyEmail ? (
                    `Please Enter ${data?.orgType === 'ORGANIZATION' ? 'Organization' : 'your'} mail and verify`
                ) : (
                    <h3 className="text-primary-custom font-[600] text-center">
                        Please Enter and verify your phone
                    </h3>
                )}
            </h2>
            <div
                className={cn(
                    `flex flex-col md:flex-row justify-center text-center md:text-start gap-2.5 my-1 items-center`,
                    validation?.email?.error || validation?.phoneNumber?.error
                        ? 'md:items-center'
                        : 'md:items-end',
                )}
            >
                {!verifyEmail ? (
                    <Input
                        label="Email Address"
                        name="email"
                        value={data?.email ?? ''}
                        onChange={onChange}
                        error={validation?.email?.error ?? false}
                        errorMessage={validation?.email?.errorMessage ?? ''}
                        required
                    />
                ) : (
                    <Input
                        label="Phone"
                        name="phoneNumber"
                        value={data?.phoneNumber ?? ''}
                        onChange={onChange}
                        error={validation?.phoneNumber?.error ?? false}
                        errorMessage={validation?.phoneNumber?.errorMessage ?? ''}
                        required
                    />
                )}

                <div className="sm:self-auto self-center">
                    <img
                        src={arrow_circle_right}
                        className="rounded-full bg-gradient-horizontal cursor-pointer p-2.5 self-center"
                        width="45px"
                        onClick={() => onSendCode()}
                    />
                </div>
            </div>
            {!data?.emailVerify && data?.emailOtp && (
                <OtpInput
                    length={6}
                    timeInSeconds={60}
                    onChange={value => onChangeProperty('emailOtpValue', value)}
                    onResendCode={onSendCode}
                    sendTo={data?.email ?? ''}
                    error={validation?.emailOtpValue?.error ?? false}
                    errorMessage={validation?.emailOtpValue?.errorMessage ?? ''}
                />
            )} */}
            <div className="text-center md:text-start">
                <h3 className="text-primary-custom font-inter font-semibold text-2xl ">
                    Verify Email
                </h3>
                {/* <span className="font-inter font-medium text-xs text-white">
                    Update your personal details here
                </span> */}
                <span>
                    <hr
                        className="w-full my-4"
                        style={{
                            height: '2px',
                            border: 'none',
                            backgroundImage:
                                'linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)',
                        }}
                    />
                </span>
            </div>
            <div className="gap-x-6 gap-y-2">
                {/* enter email */}
                <Ninput
                    label="Email"
                    name="email"
                    value={data?.email ?? ''}
                    onChange={onChange}
                    error={validation?.email?.error ?? false}
                    errorMessage={validation?.email?.errorMessage ?? ''}
                    required
                    subTitle="Enter your organization email and verify"
                    append={{
                        type: 'text',
                        className:
                            'bg-gradient-to-r from-[#4B03CE] to-[#F572B6] font-semibold cursor-pointer',
                        append: 'start',
                        text: verifyEmail ? "Verified" : 'Verify',
                        onClick: async () => {
                            if (!data?.email || validation?.email?.error) {
                                return;
                            }
                            try {
                                await onSendCode();
                                // if (data?.emailOtp) {
                                //     await open();

                                // }
                            } catch (error) {
                                console.error(error)
                            }
                            // else {

                        },
                        // secondIcon: {
                        //     append: 'end',
                        //     icon: <svg
                        //         xmlns="http://www.w3.org/2000/svg"
                        //         viewBox="0 0 16 16"
                        //         fill="currentColor"
                        //         className="h-4 w-4 opacity-70">
                        //         <path
                        //             d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        //         <path
                        //             d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        //     </svg>
                        // }
                    }}
                />

                <hr
                    className="w-full my-4"
                    style={{
                        height: '2px',
                        border: 'none',
                        backgroundImage:
                            'linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)',
                    }}
                />

                <CreatePassword data={data}
                    validation={validation}
                    onChange={onChange}
                />

                {/* password */}

                {/* <Ninput
                    label="Password"
                    type="password"
                    name="password"
                    value={data?.password ?? ''}
                    onChange={onChange}
                    error={validation?.password?.error ?? false}
                    errorMessage={validation?.password?.errorMessage ?? ''}
                    required
                />

                <hr
                    className="w-full my-4"
                    style={{
                        height: '2px',
                        border: 'none',
                        backgroundImage:
                            'linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)',
                    }}
                /> */}

                {/* retype password */}
                {/* <Ninput
                    label="Retype Password"
                    type="password"
                    name="confirmedPassword"
                    value={data?.confirmedPassword ?? ''}
                    onChange={onChange}
                    error={validation?.confirmedPassword?.error ?? false}
                    errorMessage={validation?.confirmedPassword?.errorMessage ?? ''}
                    required
                /> */}
            </div>
        </div >
    );
};

export default ContactInfo;

// <div className="flex flex-col items-center justify-center">
//     <h3 className="font-inter font-black text-center mb-2 text-[16px] md:text-[12px]">
//         Enter Confirmation code
//     </h3>
//     <p className="text-white/90 font-normal mb-4 text-[8px] md:text-[10px] flex flex-col text-center">
//         A 6-digit code was sent to
//         <span>{data?.email}</span>
//     </p>
//     <form autoComplete="off">
//         <div className="flex flex-col gap-y-6">
//             <div className="flex gap-2.5 justify-center">
//                 <input
//                     type="text"
//                     id={`otp-input`}
//                     className=" w-[40px] h-[40px] md:w-[50px]  md:h-[50px]"
//                     style={{
//                         borderRadius: '8px',
//                         border: '1px solid #FFFFFF',
//                         background: 'rgba(4, 4, 4, 0.20)',
//                         textAlign: 'center',
//                         fontSize: '16px',
//                         color: '#FFFFFF',
//                         padding: '0',
//                         boxSizing: 'border-box',
//                     }}
//                     value={''}
//                     maxLength={1}
//                 />
//                 <input
//                     type="text"
//                     id={`otp-input`}
//                     className=" w-[40px] h-[40px] md:w-[50px]  md:h-[50px]"
//                     style={{
//                         borderRadius: '8px',
//                         border: '1px solid #FFFFFF',
//                         background: 'rgba(4, 4, 4, 0.20)',
//                         textAlign: 'center',
//                         fontSize: '16px',
//                         color: '#FFFFFF',
//                         padding: '0',
//                         boxSizing: 'border-box',
//                     }}
//                     value={''}
//                     maxLength={1}
//                 />
//                 <input
//                     type="text"
//                     id={`otp-input`}
//                     className=" w-[40px] h-[40px] md:w-[50px]  md:h-[50px]"
//                     style={{
//                         borderRadius: '8px',
//                         border: '1px solid #FFFFFF',
//                         background: 'rgba(4, 4, 4, 0.20)',
//                         textAlign: 'center',
//                         fontSize: '16px',
//                         color: '#FFFFFF',
//                         padding: '0',
//                         boxSizing: 'border-box',
//                     }}
//                     value={''}
//                     maxLength={1}
//                 />
//             </div>
//         </div>
//         <div className="flex flex-row items-center justify-center mt-5">
//             {
//                 // invalidField === 'otperror' &&
//                 <span className="errorField">Invalid Code</span>
//             }
//         </div>
//         <div className="flex flex-col items-center text-center justify-center text-base font-normal mt-2">
//             <span className="text-white/50">
//                 Resend link in 00:
//                 {/* {timeLeft} */}
//             </span>
//             {
//                 // timeLeft === 0
//                 //     ?
//                 //     <a className="text-[#5E91FF] font-bold hover:underline" style={{ cursor: 'pointer' }}>
//                 //         Resend Link
//                 //     </a>
//                 //     :
//                 <a className="text-[#5E91FF] font-bold">Resend Link</a>
//             }
//         </div>
//         {!verifyEmail && (
//             <div className="flex md:flex-row mt-20 md:mt-5 w-full h-[44px] top-[948px] left-[35.5px] gap-[10px]">
//                 <button
//                     type="button"
//                     className="md:flex-auto py-[10px] px-[16px] gap-[12px] shadow-[0px_1px_2px_0px_#1018280D] border border-white bg-transparent text-white sm:w-[130px] sm:h-[44px] rounded-full justify-center text-center"
//                 >
//                     Back
//                 </button>
//                 <button
//                     type="button"
//                     className="md:flex-auto border border-[#A768FD] bg-gradient-to-r from-[#4B03CE] to-[#F572B6] text-white py-2 px-4 gap-4 sm:w-full md:w-[221px] h-[44px] rounded-full"
//                     onClick={() => setVerifyEmail(true)}
//                 >
//                     Next
//                 </button>
//             </div>
//         )}
//     </form>
// </div>
