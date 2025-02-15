import React from 'react';

interface FeatureCardProps {
    icon: any
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="card-feature hover:bg-grey-300 text-white py-3 px-2 md:p-6 rounded-lg flex flex-col items-center justify-center text-center min-h-[300px]
            hover:shadow-lg transition-shadow" style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}>
            <div className="w-auto h-14 mb-4 flex items-center justify-center rounded-lg">
                <img src={icon} alt='featureIcon' />
            </div>
            <h3 className="text-sm md:text-md font-semibold mt-3 mb-2">{title}</h3>
            <p className="text-xs md:text-sm opacity-75">{description}</p>
        </div>
    );
};

export default FeatureCard;
