import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/images/home/Lusso-logo.png';
import kidsNav from '../../assets/images/icons/kids.svg';
import Instagram from '../../assets/images/instagram.svg';
import Telegram from '../../assets/images/telegram.svg';
import YouTube from '../../assets/images/youtubeNew.svg';
import { getCookies } from '../../utils/utils';
import './NewFooter.css';

const FooterBottom = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };
    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    const handleSubscribe = async (e: any) => {
        if (e) e.preventDefault();


        if (!email) {
            setMessage('');
            setError('Please enter an email address.');
            return;
        }

        if (!isValidEmail(email)) {
            setMessage('');
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');
        try {
            const token = getCookies('authToken');

            await axios.post(
                'https://api.lusso.dev/api/v1/newsletter',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEmail('');
            setMessage('Subscription successful!');
        } catch (error) {
            console.error('Error subscribing:', error);
            setMessage('Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const openInNewWindow = (url: string) => {
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer,width=800,height=600');
    };

    const handleNavigation = (navigate: any, route: string) => {
        const token = getCookies('authToken');
        if (!token) {
            // toast.error('Your session has expired. Please log in again.', {
            //     position: 'top-right',
            //     autoClose: 3000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            // });
            // navigate('/login');
        } else {
            navigate(route);
        }
    };

    return (
        <div className="flex flex-col lg:flex-nowrap flex-wrap gap-5 lg:gap-0 bg-[#18142D] p-5 lg:p-10">
            <div className='flex flex-col md:flex-row justify-center md:justify-between gap-10'>
                <div className="flex flex-col gap-5 items-center md:items-start">
                    <div className="flex flex-wrap gap-5 items-center justify-center border-b md:border-none pb-5 md:pb-0 w-full">
                        <button onClick={() => handleNavigation(navigate, '/explore')}>All</button>
                        <button onClick={() => handleNavigation(navigate, '/explore#apps')}>Apps</button>
                        <button onClick={() => handleNavigation(navigate, '/explore#games')}>Games</button>
                        <button onClick={() => handleNavigation(navigate, '/explore#movies-tvs')}>Movies/TVs</button>
                        <button onClick={() => handleNavigation(navigate, '/explore#courses')}>Courses</button>
                        <button onClick={() => handleNavigation(navigate, '/explore#services')}>Services</button>
                        <button onClick={() => handleNavigation(navigate, '/explore#aiRef')}>AI Products</button>
                        <button
                            className="nav-item"
                            onClick={() => handleNavigation(navigate, '/kids')}
                        >
                            <img src={kidsNav} alt="Kids" />
                        </button>
                    </div>
                    <div className="connect-container border-b md:border-none pb-5 md:pb-0 items-center md:items-start w-full">
                        <span>Let's Connect</span>
                        <div className="social-icons">
                            <button onClick={() => openInNewWindow('https://t.me/username')}>
                                <img src={Telegram} alt="Telegram" />
                            </button>
                            <button onClick={() => openInNewWindow('https://instagram.com/username')}>
                                <img src={Instagram} alt="Instagram" />
                            </button>
                            <button onClick={() => openInNewWindow('https://youtube.com/username')}>
                                <img src={YouTube} alt="YouTube" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="footer-right items-center lg:items-end">
                    <div className="flex flex-col justify-center items-center lg:items-start gap-8">
                        <div className="flex flex-col flex-shrink-0 justify-center items-center lg:items-start gap-6 self-stretch">
                            <div className="by_the_way opacity-[0.4] text-white font-['Inter'] text-xl font-medium leading-[140%] uppercase">By the way</div>
                            <div className="subscribe_for_our_newsletters Sans work text-2xl lg:text-4xl leading-[100%] lg:pr-10 gap-2 lg:w-[75%] capitalize items-center lg:items-start text-center lg:text-start font-bold"><span className="text-[#00F0FB]">Subscribe</span> for our newsletters</div>
                        </div>
                        {/* Email subscription form */}
                        <form
                            className="frame_250 flex flex-shrink-0 justify-between items-center self-stretch py-3 px-5 h-12 rounded-xl border border-[#34343c]"
                            onSubmit={handleSubscribe} // Trigger the handler on form submission
                        >
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="bg-[#18142E] text-white opacity-50 font-['Inter'] text-sm leading-[140%] outline-none flex-1 transition-opacity duration-300 focus:opacity-100"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={loading}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        width={17}
                                        height={10}
                                        viewBox="0 0 17 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 5H16M16 5L11.5 0.5M16 5L11.5 9.5"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </form>
                        {message && <div className="md:-mt-2 text-end text-green-400 w-full">{message}</div>}
                        {error && <div className="md:-mt-2 text-end text-red-500 w-full">{error}</div>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 mt-10 lg:mt-0">
                <div className="h-auto w-[250px] mt-3">
                    <img src={Logo} alt="Lusso Labs Logo" />
                </div>
                <div className='text-end flex justify-end items-center'>
                    <div className="opacity-[0.4] text-white text-center font-['Inter'] text-md font-medium leading-[140%]">Privacy</div>
                    <div className="opacity-[0.4] text-white font-['Inter'] text-md font-medium leading-[140%]"> © 2024 — Copyright</div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;
