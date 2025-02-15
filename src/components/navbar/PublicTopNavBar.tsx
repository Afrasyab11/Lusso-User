import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import kidsNav from "../../assets/images/icons/kids.svg";
import navProfile from "../../assets/images/icons/nav-profile.png";
import searchIcon from "../../assets/images/icons/search.svg";
// import logoImg from "../../assets/images/logo.svg";
import logoImg from "../../assets/images/home/Lusso-logo.png";
import FooterLatest from "../footer/FooterLatest";
import './topnavbar.scss';
const PublicTopNavBar = () => {

    const [activeButton, setActiveButton]: any = useState('Home');
    const [userData, setUserData] = useState(null);

    const getTokenFromCookies = () => {
        const name = 'authToken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null; // Return null if token is not found
    };

    const decodeToken = (token: string) => {
        if (!token) return null;

        // JWT consists of three parts: header, payload, signature
        const payload = token.split('.')[1];

        if (!payload) return null;

        // Decode payload from base64 to a JSON string
        try {
            const decodedPayload = atob(payload);
            return JSON.parse(decodedPayload);
        } catch (e) {
            console.error('Invalid token');
            return null;
        }
    };

    // init
    useEffect(() => {
        // Get token from cookies
        const token = getTokenFromCookies();
        // console.log(token)
        if (token) {
            // Decode token to get user data
            const decoded = decodeToken(token);
            setUserData(decoded);
            console.log(decodeToken(token))

        }
    }, []);

    return (
        <div className="product-details-wrapper">
            <div className="top-nav-bar">
                <div className="logo">
                    <img src={logoImg} alt="" />
                </div>
                <div className="top-nav-item-container">
                    <button
                        onClick={() => { setActiveButton('All') }}
                        className={`nav-item${activeButton === 'All' ? '-active' : ''}`}>Home</button>
                    <button
                        onClick={() => { setActiveButton('Apps') }}
                        className={`nav-item${activeButton === 'Apps' ? '-active' : ''}`}>Apps</button>
                    <button
                        onClick={() => { setActiveButton('Games') }}
                        className={`nav-item${activeButton === 'Games' ? '-active' : ''}`}>Games</button>
                    <button
                        onClick={() => { setActiveButton('Movies/TVs') }}
                        className={`nav-item${activeButton === 'Movies/TVs' ? '-active' : ''}`}>Movies/TVs</button>
                    <button
                        onClick={() => { setActiveButton('Courses') }}
                        className={`nav-item${activeButton === 'Courses' ? '-active' : ''}`}>Courses</button>
                    <button
                        onClick={() => { setActiveButton('Services') }}
                        className={`nav-item${activeButton === 'Services' ? '-active' : ''}`}>Services</button>
                    <button className="nav-item">
                        <img src={kidsNav} alt="" />
                    </button>
                    <button className="nav-item">
                        <img src={searchIcon} alt="" />
                    </button>
                    <Link
                        to="/login"
                        className="py-2 px-8 inline-flex items-center text-center rounded-full text-base font-bold border border-primary transition-all hover:bg-primary"
                    >
                        Login
                    </Link>
                    <Link to="/signup" className="btn-primary-fill">
                        Get Started
                    </Link>
                </div>
                <div className="nav-profile">
                    <img src={navProfile} alt="" />
                </div>
            </div>
            <div className="alignCenter">
                <div className='public-content'>
                    <Outlet ></Outlet>
                </div>
            </div>
            <div className="float-left w-full">
                {/* <NewFooter /> */}
                <FooterLatest />
            </div>
        </div>
    )
}

export default PublicTopNavBar;