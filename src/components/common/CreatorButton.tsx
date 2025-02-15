import { useState } from 'react';

const CreatorButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const firstSVG = (
        <svg
            className='border-2 border-[#4800CB] rounded-full' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 34 34" fill="none">
            <circle cx="16.8326" cy="16.8326" r="16.817" fill="url(#paint0_linear_2684_13024)" />
            <path d="M12.3556 7.82863C12.449 7.57619 12.806 7.57619 12.8994 7.82863L14.673 12.6216C14.7024 12.701 14.7649 12.7636 14.8443 12.7929L19.6373 14.5665C19.8897 14.6599 19.8897 15.0169 19.6373 15.1104L14.8443 16.8839C14.7649 16.9133 14.7024 16.9759 14.673 17.0552L12.8994 21.8482C12.806 22.1007 12.449 22.1007 12.3556 21.8482L10.582 17.0552C10.5526 16.9759 10.49 16.9133 10.4107 16.8839L5.61769 15.1104C5.36525 15.0169 5.36525 14.6599 5.61769 14.5665L10.4107 12.7929C10.49 12.7636 10.5526 12.701 10.582 12.6216L12.3556 7.82863Z" fill="white" />
            <path d="M22.7552 16.6802C22.8486 16.4278 23.2056 16.4278 23.299 16.6802L24.1761 19.0505C24.2055 19.1299 24.2681 19.1924 24.3474 19.2218L26.7177 20.0989C26.9702 20.1923 26.9702 20.5494 26.7177 20.6428L24.3474 21.5199C24.2681 21.5492 24.2055 21.6118 24.1761 21.6912L23.299 24.0615C23.2056 24.3139 22.8486 24.3139 22.7552 24.0615L21.8781 21.6912C21.8487 21.6118 21.7861 21.5492 21.7068 21.5199L19.3364 20.6428C19.084 20.5494 19.084 20.1923 19.3364 20.0989L21.7068 19.2218C21.7861 19.1924 21.8487 19.1299 21.8781 19.0505L22.7552 16.6802Z" fill="white" />
            <defs>
                <linearGradient id="paint0_linear_2684_13024" x1="16.8326" y1="0.015625" x2="16.8326" y2="33.6496" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF77B0" />
                    <stop offset="1" stopColor="#7D3CF3" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );

    const secondSVG = (
        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20.0753" cy="20.6554" r="19.7628" fill="url(#paint0_linear_9801_57535)" />
            <path d="M14.815 10.0775C14.9247 9.78082 15.3443 9.78082 15.4541 10.0775L17.5383 15.7101C17.5728 15.8033 17.6464 15.8769 17.7396 15.9114L23.3722 17.9956C23.6689 18.1054 23.6689 18.525 23.3722 18.6347L17.7396 20.719C17.6464 20.7535 17.5728 20.827 17.5383 20.9203L15.4541 26.5529C15.3443 26.8495 14.9247 26.8495 14.815 26.5529L12.7307 20.9203C12.6962 20.827 12.6227 20.7535 12.5294 20.719L6.89681 18.6347C6.60015 18.525 6.60015 18.1054 6.89681 17.9956L12.5294 15.9114C12.6227 15.8769 12.6962 15.8033 12.7307 15.7101L14.815 10.0775Z" fill="white" />
            <path d="M27.0374 20.4788C27.1472 20.1822 27.5668 20.1822 27.6766 20.4788L28.7073 23.2644C28.7418 23.3576 28.8153 23.4312 28.9086 23.4657L31.6941 24.4964C31.9908 24.6062 31.9908 25.0258 31.6941 25.1355L28.9086 26.1663C28.8153 26.2008 28.7418 26.2743 28.7073 26.3676L27.6766 29.1531C27.5668 29.4498 27.1472 29.4498 27.0374 29.1531L26.0067 26.3676C25.9722 26.2743 25.8987 26.2008 25.8054 26.1663L23.0199 25.1355C22.7232 25.0258 22.7232 24.6062 23.0199 24.4964L25.8054 23.4657C25.8987 23.4312 25.9722 23.3576 26.0067 23.2644L27.0374 20.4788Z" fill="white" />
            <defs>
                <linearGradient id="paint0_linear_9801_57535" x1="20.0753" y1="0.892578" x2="20.0753" y2="40.4183" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF77B0" />
                    <stop offset="1" stop-color="#7D3CF3" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>

    );

    return (
        <button
            className="lg:creatorBtn creatorBtnBg flex justify-evenly items-center ps-2 pe-4 py-1 transition-colors duration-300 text-white font-semibold  text-xs"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* <span className="mr-2 p-1 rounded-full
            //
            border-4 border-[#4800CB]  "> */}

            <span className="mr-2 p-1 rounded-full">
                {isHovered ? secondSVG : secondSVG}
            </span>
            <span className='hidden lg:flex flex-col items-start'>
                Join The Creator<br />
                <span className="text-left">Community!</span>
            </span>

        </button>
    );
};

export default CreatorButton;
