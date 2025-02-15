import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/LussoAiLogo.svg';
import { apiEndpoints } from '../../constants/api-endpoints';
import makeApiCall from '../../lib/apiCall';
import { setCookies } from '../../utils/utils';
import './dev.scss';


const AccountCreationSuccess = () => {
    const navigate = useNavigate();

    const onContinueHandle = async () => {
        const loggedinUser = await makeApiCall(apiEndpoints.userProfile)
        setCookies('authUser', loggedinUser);
        navigate('/subscribe')
    }

    return (
        <div className="container background-banner"
            style={{ display: 'flex' }}>
            <div
                className="left flex flex-col justify-end  gap-5 p-24"
                style={{ flex: 1 }}
            >
                <h3 className="font-extrabold text-[#FFF] tracking-[.3em] text-2xl flex flex-col">
                    CREATOR <span className="text-[#00FFFF]">ONBOARDING</span>
                </h3>

                <p className="text-[#E1E1E1] w-[400px] h-[96px] font-medium text-[20px] leading-[24px]">
                    Welcome to our AI-powered platform! Upload your products to unlock tailored marketing services, including engaging social media posts and insightful analytics that boost your visibility and reach.
                </p>
            </div>
            <div className='right opacity-95 flex flex-col items-center gap-20'
                style={{ flex: 2 }}>
                <div className="md:self-end self-auto">
                    <Link to="/">
                        <img
                            src={Logo}
                            // className="mobileRes"
                            alt="Logo"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center  text-white' style={{ marginTop: "30px" }}>
                    <div
                        className='mb-4'
                        style={{
                            width: "184.91px",
                            height: "184.12px",
                            top: "7.59px",
                            left: "7.84px",
                            gap: "0px",
                            opacity: "0.75px",

                        }}
                    >
                        <img
                            src={require('../../assets/images/completedbadge.png')}
                            alt='Completed badge'
                        />
                    </div>
                    <h3 className='font-inter text-[26px] font-semibold leading-[31.47px] text-center text-primary-custom mb-4'>Account created successfully!</h3>
                    <h4 className='font-inter text-[16px] font-normal leading-[24px] text-center text-[#F5F5F5]'>Welcome aboard! Start your  journey with LUSSO LABS!</h4>
                </div>
                <div className='top-[462.34px] left-[171px] gap-[10px]'>
                    <button
                        type="button"
                        className="w-[221px] h-[44px] md:flex-auto border border-[#A768FD] bg-gradient-to-r from-[#4B03CE] to-[#F572B6] text-white py-2 px-4 gap-4 sm:w-full md:w-[221px] rounded-full mt-9 
                   hover:from-[#F572B6] hover:to-[#4B03CE] hover:border-[#4B03CE] hover:shadow-lg transition duration-300 ease-in-out"
                        onClick={onContinueHandle}
                    >
                        Continue
                    </button>
                </div>

            </div>
        </div >
    )
}

export default AccountCreationSuccess