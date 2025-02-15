import { useState } from 'react';
import icon1 from '../../assets/images/home/keyFeature/1.svg';
import icon2 from '../../assets/images/home/keyFeature/2.svg';
import icon3 from '../../assets/images/home/keyFeature/3.svg';
import icon4 from '../../assets/images/home/keyFeature/4.svg';
import icon5 from '../../assets/images/home/keyFeature/5.svg';
import TitleBar from '../../components/common/TitleBar';

const Card = ({ title, icon, description }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="p-4 rounded-2xl border-[1px] border-[#484274] cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/30 flex md:flex-col justify-between md:justify-center items-center"
            style={{ background: 'linear-gradient(52deg, #000 2.82%, #2D246C 100%)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 className="md:min-h-[50px] text-white text-lg md:text-xl md:font-medium text-left md:mb-4">{title}</h3>
            <div className="md:w-full md:min-h-[150px] p-10 md:p-3 rounded-xl border-[1px] border-[#484274] overflow-hidden relative"
                style={{ background: 'linear-gradient(52deg, #000 2.82%, #2D246C 100%)' }}>
                <div className={`w-[60px] md:w-[85px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    <img src={icon} alt={title} />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center p-4 text-white text-sm transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                    {description}
                </div>
            </div>
        </div>
    );
};

const KeyFeatures = () => {
    const features = [
        { title: 'Management & updates', icon: icon1, description: 'Efficiently manage and update your projects with ease.' },
        { title: 'Product Usage Analytics', icon: icon2, description: 'Gain insights into how your products are being used.' },
        { title: 'Product Marketing', icon: icon3, description: 'Effectively market your products to reach your target audience.' },
        { title: 'Social Media Analytics', icon: icon4, description: 'Analyze your social media performance and engagement.' },
        { title: 'Automated Messaging', icon: icon5, description: 'Streamline communication with automated messaging systems.' },
        { title: 'Product Marketing', icon: icon3, description: 'Boost your product visibility and sales through strategic marketing.' },
    ];

    return (
        <>
            <TitleBar title={'Key Features'} isLeft={true} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} title={feature.title} icon={feature.icon} description={feature.description} />
                ))}
            </div>
        </>
    );
};

export default KeyFeatures;