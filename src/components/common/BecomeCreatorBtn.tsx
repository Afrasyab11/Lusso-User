import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BecomeCreatorButton = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const navigate = useNavigate();

    return (
        <button
            className={`relative mt-10 lg:mt-0 flex items-center justify-center px-2 py-2 overflow-hidden font-bold text-white group transition-all duration-300 ease-in-out ${isHovered ? 'w-64' : 'w-60'
                }`}
            onClick={() => { navigate('/devonboard'); }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderRadius: 50,
                border: '1px solid transparent',
                backgroundImage: `
            linear-gradient(to right, #F873B4, #4300BD),
            linear-gradient(to left, #F873B4, #4300BD)
          `,
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                backgroundPosition: 'left,right',
                backgroundSize: '100% 100%, 100% 100%',
                backgroundRepeat: 'no-repeat',
                padding: '1.5px',
            }}
        >
            <span className="relative bg-[#17153A] rounded-full py-3 w-full pe-4">
                Become A Creator
            </span>
            <svg
                className="absolute right-6 mt-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                ></path>
            </svg>
        </button>

    );
};

export default BecomeCreatorButton;