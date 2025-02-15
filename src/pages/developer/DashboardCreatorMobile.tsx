import img1 from '../../assets/images/creator/img1.png';
import img2 from '../../assets/images/creator/img2.png';
import cardIcon1 from '../../assets/images/home/feature/1.svg';
import cardIcon3 from '../../assets/images/home/feature/3.svg';
import cardIcon4 from '../../assets/images/home/feature/4.svg';
import cardIcon5 from '../../assets/images/home/feature/5.svg';
import FAQ from '../../components/common/FAQ';
import FeatureCard from '../../components/common/FeatureCard';
import { questions } from '../home/constctUs/ContactUs';

function DashboardCreatorMobile() {
    const features = [
        {
            icon: cardIcon1,
            title: 'AI-Powered Chatbots',
            description: 'Implement intelligent chatbots that can handle customer inquiries, provide',
        },
        {
            icon: cardIcon5,
            title: 'Analytics',
            description: 'Forecast trends and customer behavior using AI, optimizing inventory and decision-making with data-driven insights.',
        },
        {
            icon: cardIcon3,
            title: 'Integration Capabilities',
            description: 'Forecast trends and customer behavior using AI, optimizing inventory and decision-making with data-driven insights.',
        },
        {
            icon: cardIcon4,
            title: 'Proactive Engagement',
            description: 'Improve service with AI chatbots handling common queries and escalating complex issues to human agents as needed.',
        },
    ];


    // render
    return (
        <div className="text-white flex flex-col items-center">
            {/* Header Text */}
            <div className="text-center mb-8 px-4">
                <h1 className="text-2xl md:text-5xl font-extrabold mb-4">
                    Access Your Dashboard
                </h1>
                <p className="text-md md:text-xl text-gray-300">
                    Please log in through the web to explore your insights.
                </p>
            </div>

            {/* Screenshots */}
            <div className="relative flex flex-col md:flex-row items-center justify-center z-10">
                {/* Larger Dashboard Image */}
                <div className="relative w-[90%] md:w-2/3 max-w-4xl shadow-lg mb-8 md:mb-0 md:mr-4 scale-105 -ml-[10%]">
                    <img
                        src={img1}
                        alt="Dashboard Screenshot"
                        className="rounded-lg"
                    />
                </div>

                {/* Smaller Dashboard Image */}
                <div className="absolute top-[45%] md:bottom-3 right-[-30px] md:relative w-[60%] md:w-1/3 max-w-lg shadow-md">
                    <img
                        src={img2}
                        alt="Dashboard Screenshot"
                        className="rounded-lg"
                    />
                </div>
            </div>


            {/* Features */}
            {features.length > 0 && (
                <div className="flex flex-wrap lg:flex-nowrap justify-center mt-6 gap-2">
                    {features?.map((feature, index) => (
                        <div className="h-full w-[45%] lg:w-1/4">
                            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                        </div>
                    ))}
                </div>
            )}

            {/* FAQ */}
            <FAQ questions={questions} />
        </div>
    )
}

export default DashboardCreatorMobile