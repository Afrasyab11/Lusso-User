import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import feature2 from '../../assets/images/header/_01_align_center_1_.svg';
import feature3 from '../../assets/images/header/Courses.svg';
import feature1 from '../../assets/images/header/feature1.svg';
import feature4 from '../../assets/images/header/GameController.svg';
import feature5 from '../../assets/images/header/Movie.svg';
import feature6 from '../../assets/images/header/Services.svg';
import kidsNav from '../../assets/images/icons/kids.svg';
import { useCookieCheck } from '../../hooks/authHooks';

function HeaderMenu({
  className,
  isMobile = false,
}: {
  className?: string;
  isMobile?: boolean;
}) {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate()

  const menuList = [
    { name: "App", path: "/explore#apps" },
    { name: "Games", path: "/explore#games" },
    { name: "Movies & Tv", path: "/explore#movies-tvs" },
    { name: "Courses", path: "/explore#courses" },
    { name: "Services", path: "/explore#services" },
    { name: "AI Products", path: "/explore#aiRef" },
  ]

  const isLogged: any = useCookieCheck()

  const handleItemClick = (item: string) => {
    // if (!isLogged) {
    //   navigate('/login')
    // } else {
    //   setActiveItem(item);
    //   if (item !== 'Features') {
    //     setShowFeatures(false);
    //   }
    // }

  };

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
  };

  useEffect(() => {
    function handleMouseLeave(event: MouseEvent) {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.relatedTarget as Node)
      ) {
        setShowFeatures(false);
      }
    }

    const currentRef = featuresRef.current;
    if (currentRef) {
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [setShowFeatures]);

  // render features
  const FeatureItem = ({
    icon,
    title,
    description,
    path,
  }: {
    icon: any;
    title: string;
    description: string;
    path: string;
  }) => (
    <Link
      to={path}
      onClick={toggleFeatures}
      className="fItem flex flex-col items-center text-left transition-all duration-300 
      hover:bg-white p-4 md:p-6 rounded-xl cursor-pointer w-32 h-20 md:w-40 md:h-24"
    >
      <div className="text-purple-600 lg:mb-2">{icon}</div>
      <h3 className="text-sm lg:text-lg font-semibold text-[#514A81] lg:mb-1">
        {title}
      </h3>
    </Link>
  );

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setShowFeatures(false);
      }
    };

    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderFeatures = () => (
    <div
      ref={featuresRef}
      onMouseLeave={() => setShowFeatures(false)}
      className="absolute z-10 rounded-xl featureBorder top-full lg:left-1/3 transform lg:-translate-x-1/2 bg-white text-black -mt-2 p-2 lg:p-4 shadow-lg flex flex-col gap-2 lg:gap-4 w-full md:w-[350px]"
    >
      <div className="flex gap-2">
        <FeatureItem
          icon={<img src={feature1} />}
          path={'/explore/ai-products'}
          title="AI Products"
          description="Lorem ipsum dolor sit ame consectetur adipiscing elit."
        />
        <FeatureItem
          icon={<img src={feature2} />}
          path={'/explore/apps'}
          title="Apps"
          description="Lorem ipsum dolor sit ame consectetur adipiscing elit."
        />
      </div>
      <div className="flex gap-2">
        <FeatureItem
          icon={<img src={feature3} />}
          path={'/explore/courses'}
          title="Courses"
          description="Lorem ipsum dolor sit ame consectetur adipiscing elit."
        />
        <FeatureItem
          icon={<img src={feature4} />}
          path={'/explore/games'}
          title="Games"
          description="Lorem ipsum dolor sit ame consectetur adipiscing elit."
        />
      </div>
      <div className="flex gap-2">
        <FeatureItem
          icon={<img src={feature5} />}
          path={'/explore/movies-tvs'}
          title="Movies & TV"
          description="Lorem ipsum dolor sit ame consectetur adipiscing elit."
        />
        <FeatureItem
          icon={<img src={feature6} />}
          path={'/explore/services'}
          title="Services"
          description="Lorem ipsum dolor sit ame consectetur adipiscing elit."
        />
      </div>
    </div>
  );


  return (
    <ul className={className ?? 'w-full flex justify-between items-center'}>
      <li>
        <Link
          to={`${isLogged ? "/explore" : "/"}`}
          className={`text-2xl nav-item${activeItem === 'Home' ? '-active' : ''
            }`}
          onClick={() => handleItemClick('Home')}
        >
          Home
        </Link>
      </li>
      {!isLogged ?
        <>
          <li className="group">
            <button
              className={`text-2xl nav-item${activeItem === 'Features' ? '-active' : ''
                } flex items-center ${isMobile ? 'justify-between' : ''}`}
              onClick={() => {
                handleItemClick('Features');
                toggleFeatures();
              }}
              onMouseEnter={() => setShowFeatures(true)}
            >
              Features{' '}
              {isMobile ? (
                <ChevronRight className="ml-1 mt-1" size={20} />
              ) : showFeatures ? (
                <ChevronUp className="ml-1 mt-1" size={20} />
              ) : (
                <ChevronDown className="ml-1 mt-1" size={20} />
              )}
            </button>
            {showFeatures && renderFeatures()}
          </li>
          <li>
            <Link
              to="/pricing"
              className={`text-2xl nav-item${activeItem === 'Pricing' ? '-active' : ''
                }`}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`text-2xl nav-item${activeItem === 'About Us' ? '-active' : ''
                } `}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-2xl nav-item${activeItem === 'Contact Us' ? '-active' : ''
                }`}
            >
              Contact Us
            </Link>
          </li>
        </>
        :
        menuList.map((item: any) => (
          <li key={item.name}>
            <Link
              to={isLogged ? item.path : '/login'}
              className={`text-2xl nav-item${activeItem === item.name ? '-active' : ''}`}
              onClick={() => handleItemClick(item.name)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      <li>
        <Link
          to="/kids"
          className={`nav-item${activeItem === 'Kids' ? '-active' : ''} min-w-[70px]`}
          onClick={() => handleItemClick('Kids')}
        >
          <img src={kidsNav} alt="Kids" />
        </Link>
      </li>
    </ul>
  );
}

export default HeaderMenu;
