import { useEffect, useRef, useState } from 'react';
import { GoHome } from "react-icons/go";
import { Link } from 'react-router-dom';
import feature2 from '../../assets/images/header/_01_align_center_1_.svg';
import feature3 from '../../assets/images/header/Courses.svg';
import feature1 from '../../assets/images/header/feature1.svg';
import feature4 from '../../assets/images/header/GameController.svg';
import feature5 from '../../assets/images/header/Movie.svg';
import feature6 from '../../assets/images/header/Services.svg';
import { checkNullOrEmpty } from '../../utils/utils';

function HeaderKidsMenu({ userData = {} }: { userData: { [key: string]: any } }) {
    const featuresRef = useRef<HTMLDivElement>(null);
    const [showFeatures, setShowFeatures] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');

    const handleItemClick = (item: string) => {
        setActiveItem(item);
        if (item !== 'Features') {
            setShowFeatures(false);
        }
    };

    const toggleFeatures = () => {
        setShowFeatures(!showFeatures);
    };


    useEffect(() => {
        function handleMouseLeave(event: MouseEvent) {
            if (featuresRef.current && !featuresRef.current.contains(event.relatedTarget as Node)) {
                setShowFeatures(false);
            }
        }

        const currentRef = featuresRef.current;
        if (currentRef) {
            currentRef.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [setShowFeatures]);

    // render features
    const FeatureItem = ({ icon, title, description, path }: { icon: any, title: string, description: string, path: string }) => (
        <Link to={path} onClick={toggleFeatures} className="fItem flex flex-col items-center text-left transition-all duration-300 
        hover:bg-white p-5 rounded-xl cursor-pointer">
            <div className="text-purple-600 mb-2">{icon}</div>
            <h3 className="text-lg font-semibold text-[#514A81] mb-1">{title}</h3>
            <p className="text-sm text-[#A39FBA]">{description}</p>
        </Link>
    );

    const renderFeatures = () => (
        <div ref={featuresRef}
            onMouseLeave={() => setShowFeatures(false)}
            className="absolute rounded-xl featureBorder top-full left-1/3 transform -translate-x-1/2 bg-white text-black -mt-2 p-4 shadow-lg grid grid-cols-2 gap-4 w-[500px]">
            <FeatureItem icon={<img src={feature1} />} path={'/explore/ai-products'} title="AI Products" description="Lorem ipsum dolor sit ame consectetur adipiscing elit." />
            <FeatureItem icon={<img src={feature2} />} path={'/explore/apps'} title="Apps" description="Lorem ipsum dolor sit ame consectetur adipiscing elit." />
            <FeatureItem icon={<img src={feature3} />} path={'/explore/courses'} title="Courses" description="Lorem ipsum dolor sit ame consectetur adipiscing elit." />
            <FeatureItem icon={<img src={feature4} />} path={'/explore/games'} title="Games" description="Lorem ipsum dolor sit ame consectetur adipiscing elit." />
            <FeatureItem icon={<img src={feature5} />} path={'/explore/movies-tvs'} title="Movies & TV" description="Lorem ipsum dolor sit ame consectetur adipiscing elit." />
            <FeatureItem icon={<img src={feature6} />} path={'/explore/services'} title="Services" description="Lorem ipsum dolor sit ame consectetur adipiscing elit." />
        </div>
    )
    return (

        <ul className="w-full flex justify-between items-center">
            <li>
                <Link
                    to={checkNullOrEmpty(userData?.username) ? '/' : "/explore"}
                    className={`text-2xl nav-item${activeItem === 'Home' ? '-active' : ''}`}
                    onClick={() => handleItemClick('Home')}
                >
                    <span className="bg-[rgb(141,32,244)] p-3 rounded-[50%] transition-all duration-300 hover:bg-purple-500 hover:scale-110 hover:shadow-lg">
                        <GoHome size={35} />
                    </span>
                </Link>
            </li>

            <li className="rounded-full">
                <Link
                    to="/kids"
                    className={`text-2xl rounded-[20%] nav-item ${activeItem === 'Home' ? '-active' : ''
                        } transition-all duration-300 hover:bg-[rgb(141,32,244)] hover:text-white hover:scale-105 hover:shadow-lg`}
                // onClick={() => handleItemClick('Home')}
                >
                    Family
                </Link>
            </li>


            <li>
                <Link
                    to="/kids"
                    className={`text-2xl rounded-[20%] nav-item ${activeItem === 'Pricing' ? '-active' : ''
                        } transition-all duration-300 hover:bg-[rgb(141,32,244)] hover:text-white hover:scale-105 hover:shadow-lg`}
                >
                    Learning
                </Link>
            </li>

            <li>
                <Link
                    to="/kids"
                    className={`text-2xl rounded-[20%] nav-item ${activeItem === 'About Us' ? '-active' : ''
                        } transition-all duration-300 hover:bg-[rgb(141,32,244)] hover:text-white hover:scale-105 hover:shadow-lg`}
                // onClick={(e) => {
                //     e.preventDefault();
                // }}
                >
                    Fun & Hobbies
                </Link>
            </li>
            <li>
                <Link
                    to="/kids"
                    className={`text-2xl rounded-[20%] nav-item ${activeItem === 'Contact Us' ? '-active' : ''
                        } transition-all duration-300 hover:bg-[rgb(141,32,244)] hover:text-white hover:scale-105 hover:shadow-lg`}
                >
                    Education
                </Link>
            </li>
            <li>
                <Link
                    to="/kids"
                    className={`text-2xl rounded-[20%] nav-item ${activeItem === 'Contact Us' ? '-active' : ''
                        } transition-all duration-300 hover:bg-[rgb(141,32,244)] hover:text-white hover:scale-105 hover:shadow-lg`}
                >
                    Enriching
                </Link>
            </li>
            <li>
                <Link
                    to="/kids"
                    className={`text-2xl rounded-[20%] nav-item ${activeItem === 'Contact Us' ? '-active' : ''
                        } transition-all duration-300 hover:bg-[rgb(141,32,244)] hover:text-white hover:scale-105 hover:shadow-lg`}
                >
                    Casual
                </Link>
            </li>

            {/* <li>
                <Link
                    to="/get-started"
                    className={`text-2xl nav-item${activeItem === 'Get Started' ? '-active' : ''}`}
                    onClick={() => handleItemClick('Get Started')}
                >
                    Get Started
                </Link>
            </li> */}

        </ul>
    )
}

export default HeaderKidsMenu