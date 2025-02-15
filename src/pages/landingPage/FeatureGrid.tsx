import React from 'react';
import cardIcon1 from '../../assets/images/home/feature/1.svg';
import cardIcon2 from '../../assets/images/home/feature/2.svg';
import cardIcon3 from '../../assets/images/home/feature/3.svg';
import cardIcon4 from '../../assets/images/home/feature/4.svg';
import cardIcon5 from '../../assets/images/home/feature/5.svg';
import cardIcon6 from '../../assets/images/home/feature/6.svg';
import cardIcon7 from '../../assets/images/home/feature/7.svg';
import scalableBg from '../../assets/images/home/scalablebg.svg';
import FeatureCard from '../../components/common/FeatureCard';

const features = [
    {
        icon: cardIcon1,
        title: 'AI-POWERED PRODUCT RECOMMENDATIONS',
        description: 'Personalize user experience with AI-driven recommendations based on browsing and boosting engagement.',
    },
    {
        icon: cardIcon2,
        title: 'Smart Ad Targeting',
        description: 'Optimize ad campaigns with AI that adjusts targeting based on user behavior and engagement metrics for better ROI.',
    },
    {
        icon: cardIcon3,
        title: 'Intelligent Search Functionality',
        description: 'Enhance search accuracy with AI, understanding natural language queries and delivering relevant results based on user intent.',
    },
    {
        icon: cardIcon4,
        title: 'Predictive Analytics',
        description: 'Forecast trends and customer behavior using AI, optimizing inventory and decision-making with data-driven insights.',
    },
    {
        icon: cardIcon5,
        title: 'Automated Customer Support',
        description: 'Improve service with AI chatbots handling common queries and escalating complex issues to human agents as needed.',
    },
    {
        icon: cardIcon6,
        title: 'Fraud Detection and Prevention',
        description: 'Detect and prevent fraud with AI monitoring transactions for suspicious activities and alerting you to potential threats.',
    },
    {
        icon: cardIcon7,
        title: 'Personalized Marketing Campaigns',
        description: 'AI tailors marketing campaigns to customer segments, customizing content and channels based on individual preferences.',
    },
];

const FeaturesGrid: React.FC = () => {
    return (
        <div className="md:p-8 p-4 max-w-[1370px] mx-auto">
            <div className="flex text-center flex-col order-2 lg:order-1 md:px-8 md:pb-5 md:space-y-5">
                <div className="relative">
                    <h1 className="md:text-3xl lg:text-6xl text-2xl font-extrabold leading-tight uppercase md:pb-5 pb-2 whitespace-nowrap overflow-hidden">
                        <span className="bg-no-repeat bg-bottom bg-contain md:pb-10 pb-1" style={{ backgroundImage: `url(${scalableBg})` }}>
                            Your Success
                        </span>
                        , <span className="text-[#00F0FB]">Simplified</span>
                    </h1>
                </div>
                <div className="md:block hidden lg:text-lg">
                    <p className="text-white">Seamlessly upload, market, and track your products with ease.</p>
                    <p className="text-white">Enjoy powerful tools for customization, promotion, and real-time insights all in one place.</p>
                </div>
                <div className="md:hidden mb-4 mt-0">
                    <p className="text-white">Seamlessly upload, market, and track your products with ease. Enjoy powerful tools for customization, promotion, and real-time insights all in one place.</p>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.slice(0, 4).map((feature, index) => (
                        <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                    ))}
                </div>

                {features.length > 4 && (
                    <div className="flex flex-wrap lg:flex-nowrap justify-center mt-6 gap-6">
                        {features.slice(4, 7).map((feature, index) => (
                            <div className="w-full h-full lg:w-1/4">
                                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>

    );
};

export default FeaturesGrid;
