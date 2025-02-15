import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/home/Lusso-logo.png';
import { useCookieCheck } from '../../hooks/authHooks';
import { ExploreButton } from '../../pages/landingPage/AIMarketplace';
import { getCookies } from '../../utils/utils';
import FooterBottom from './FooterBottom';

function FooterLatest() {
    const token = getCookies('authToken');
    const location = useLocation();
    const pathname = location.pathname;
    const isLogged: any = useCookieCheck()
    const navigate = useNavigate()

    // Footer Header
    const renderFooterHeader = () => {
        const handleExplore = () => {
            if (isLogged) {
                navigate('/explore')
            } else {
                navigate('/login')
            }
        };

        // render
        return (
            <div className='bg-[#2E246C] md:py-10 py-2'>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="inline-flex flex-col justify-center items-center">
                        <div className="max-w-full md:py-10 py-1 h-full w-full flex flex-col flex-shrink-0 justify-center items-center gap-8">
                            {/* logo */}
                            <div className='max-w-[300px] lg:max-w-[500px]'>
                                <img src={Logo} alt="Lusso Labs Logo" />
                            </div>
                            <div className="text-white text-center font-['Inter'] lg:text-6xl text-3xl font-bold leading-[normal] uppercase">Try now?</div>
                            <div className="px-4 max-w-full text-white text-center font-['Inter'] text-lg lg:text-2xl leading-8">
                                Enhance Your Product Listings and Marketing Efforts Seamlessly.
                            </div>

                            {/* explore */}
                            {/* <button className="flex flex-shrink-0 justify-center items-center gap-2.5 py-3 lg:py-5 px-7 lg:px-10 h-[3.9375rem] rounded-lg bg-[#002be7]">
                                <div className="Sans work text-lg font-bold leading-[1rem] lg:eading-[1.4375rem] uppercase">explore now</div>
                                <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 8.5H15.5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.5 1.5L15.5 8.5L8.5 15.5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button> */}
                            <ExploreButton onClick={handleExplore} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }


    // Footer Bottom
    const renderFooterBottom = () => {
        return (
            <div>
                <FooterBottom />
            </div>
        )
    }

    return (
        <>
            {(!token || pathname === '/') && pathname !== '/pricing' && renderFooterHeader()}
            {renderFooterBottom()}
        </>
    )
}

export default FooterLatest