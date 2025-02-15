import kidsNav from '../../assets/images/icons/kids.svg';
import Instagram from '../../assets/images/instagram.svg';
import Logo from '../../assets/images/logo.svg';
import Telegram from '../../assets/images/telegram.svg';
import YouTube from '../../assets/images/youtubeNew.svg';
import './NewFooter.css';

import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

const NewFooter = () => {
    return (
        <div className="footer-container">
            <div className="footer-left">
                <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="top-nav-item-container">
                    <button>All</button>
                    <button>Apps</button>
                    <button>Games</button>
                    <button>Movies/TVs</button>
                    <button>Courses</button>
                    <button>Services</button>
                    <button className="nav-item">
                        <img src={kidsNav} alt="Kids" />
                    </button>
                </div>
                <div className="connect-container">
                    <span>Let's Connect</span>
                    <div className="social-icons">
                        <img src={Telegram} alt="Telegram" />
                        <img src={Instagram} alt="Instagram" />
                        <img src={YouTube} alt="YouTube" />
                    </div>
                </div>
                <div className="logo-container">
                    <img src={Logo} alt="Lusso Labs Logo" />
                </div>
            </div>
            <div className="footer-right">
                <div className='flex flex-col items-start gap-6'>
                    <span style={{ color: '#FFFFFF', textTransform: 'uppercase' }}>BY THE WAY</span>
                    <span className="subscribe-text">Subscribe for<br></br> our newsletters</span>
                    <div >
                        <div className="mb-2 block">
                            {/* <Label htmlFor="email4" value="Your email" /> */}
                        </div>
                        <TextInput style={{ backgroundColor: '#111924', color: '#FFF', width: 500 }} id="email4" type="email" rightIcon={HiMail} placeholder="name@flowbite.com" required />
                    </div>
                    <div className="footer-privacy">
                        <span>Privacy © 2024 — Copyright</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewFooter;
