import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon1 from '../../assets/images/home/happen-with-lusso/1.svg';
import icon2 from '../../assets/images/home/happen-with-lusso/2.svg';
import icon3 from '../../assets/images/home/happen-with-lusso/3.svg';
import icon4 from '../../assets/images/home/happen-with-lusso/4.svg';
import { ExploreButton } from './AIMarketplace';

interface FeatureCardType {
  icon: any;
  title: string;
  description: string;
  index: number;
  isActive: boolean;
  toggleActive: (index: number) => void;
}

const features = [
  {
    icon: icon1,
    title: 'Expanding reach to audiences',
    description:
      'Connect with a wider audience and grow your influence across various platforms.',
  },
  {
    icon: icon2,
    title: 'Gaining insights in to product performance and social impact',
    description: `Analyze your product's performance and understand its social impact with comprehensive data.`,
  },
  {
    icon: icon3,
    title: 'Simplifying user engagement with automated tools',
    description:
      'Streamline your user interactions with powerful automation tools for enhanced engagement.',
  },
  {
    icon: icon4,
    title: 'Detailed social media analytics',
    description:
      'Get in-depth insights into your social media performance with comprehensive analytics tools.',
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
  index,
  isActive,
  toggleActive,
}: FeatureCardType) => {
  return (
    <div
      className={`md:h-[250px] cursor-pointer relative group md:p-6 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isActive ? '' : 'bg-transparent'
      }`}
      onClick={() => toggleActive(index)}
    >
      <div className="flex flex-col items-center text-center h-full">
        {/* Icon */}
        <div className="w-[65px] h-[70px] flex items-center justify-center text-white mb-4 transition-all duration-300 ease-in-out group-hover:scale-110">
          <img src={icon} alt={title} />
        </div>
        <h3
          className={`text-white text-md font-semibold mb-4 md:mb-5 transition-opacity duration-300 ${
            isActive ? 'hidden' : 'block group-hover:hidden'
          }`}
        >
          {title}
        </h3>
        <div
          className={`${
            isActive ? 'block' : 'hidden group-hover:block'
          } transition-all duration-300 ease-in-out text-gray-300 text-sm md:mt-0  p-4`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

const LussoSection = ({ isLogged = false }: any) => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleActive = (index: number) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  return (
    <div className="pt-[30px] pd-0 md:py-10 sm:px-6 lg:px-8">
      <h2 className="text-[18px] md:text-5xl font-bold text-center text-white md:mb-[80px] mb-5">
        MAKE IT HAPPEN WITH LUSSO
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            index={index}
            isActive={activeCard === index}
            toggleActive={toggleActive}
          />
        ))}
      </div>
      {isLogged === false && (
        <div className="flex justify-center md:mt-0 mt-4">
          <ExploreButton
            onClick={() => navigate('/signup')}
            title={'Join Now'}
          />
        </div>
      )}
    </div>
  );
};

export default LussoSection;
