import React from 'react';

interface FloatingButtonProps {
    name: string;
    title: string;
    avgResponseTime: string;
    imageUrl: string;
    onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ name, title, avgResponseTime, imageUrl, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="hidden float-contact-btn md:fixed md:min-w-[300px] bottom-4 right-4 md:flex 
            items-center text-white rounded-full px-3 py-1"
            style={{
                background: 'linear-gradient(180deg, #9B56FE 0%, #460F88 100.32%)'
            }}
        >
            <div className='w-10 md:w-20 h-10 md:h-20 md:pt-2 rounded-full'>
                <img src={imageUrl} alt={name} className='rounded-full chatbotimg' />
            </div>
            <div className="text-left flex flex-col justify-center">
                <p className="font-bold text-md md:text-lg">{name}</p>
                <p className="text-xs">Avg response time: {avgResponseTime}</p>
            </div>
        </button>
    );
};

export default FloatingButton;