import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import img1 from '../../../assets/images/explore/category/services/img1.png';
import img2 from '../../../assets/images/explore/category/services/img2.png';
import UserImage from '../../../assets/images/explore/category/services/rightImg.png';
import teamMember1 from '../../../assets/images/explore/category/team/1.png';
import teamMember2 from '../../../assets/images/explore/category/team/2.png';
import teamMember3 from '../../../assets/images/explore/category/team/3.png';
import GameCard from '../../../components/cards/GameCard';
import ContactForm from '../../../components/common/ContactForm';
import CategorySection from '../CategorySection';
import { servicesData } from '../ExploreAll';
import AdditionalInfo from './Common/AdditionalInfo';
import DescriptionSection from './Common/DescriptionSection';
import InfoSection from './Common/InfoSection';
import LetsConnectSection from './Common/LetsConnectSection';
import RatingSection from './Common/RatingSection';
import Screenshots from './Common/Screenshots';
import TeamMembersGrid from './Common/TeamMembersGrid';
import { screenshotData } from './GameDetailsScreen';
import HeaderSection from "./Services/HeaderSection";
import SpecialPriceSection from './Services/SpecialPriceSection';
import { additionalInfoData, contactInfoData, experienceData, infoSectionData } from './staticData';

export interface StatItem {
    value: string;
    label: string;
}

export interface PricingDataType {
    title: string;
    subtitle: string;
    price: number;
    discount: number;
    features: any;
    savings: number;
}


function ServiceDetailsScreen() {
    const [showPopup, setShowPopup] = useState(false);

    const stats: StatItem[] = [
        { value: '14', label: 'Years of Experience' },
        { value: '50+', label: 'Projects Completed' },
        { value: '1.5k', label: 'Happy Clients' },
    ];

    const headerData = {
        name: "Gerold",
        title: "Web Developer, UX Designer",
        description: "I break down complex user experience problem to create integirty foxussed solutions",
        image: UserImage,
        desc: `Looking for the most talked about TV shows and movies from around the world? They’re all on Netflix. We’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break.\nNetflix membership is a month-to-month subscription that begins at sign up. You can easily cancel anytime, online, 24 hours a day.`
    }

    const [pricingData] = useState<PricingDataType>({
        title: "Counselling session",
        subtitle: "Exclusively for Lusso Redirects",
        price: 224.99,
        discount: 20,
        features: [
            { title: "Free", desc: "Initial Consultation" },
            { title: "Dedicated slot", desc: "for your preferred time" }
        ],
        savings: 25
    });

    const [starDistribution, setStarDistribution] = useState([
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 },
    ]);

    const ratingData = {
        starDistribution: starDistribution,
        rating: 4.5,
        reviewTitle: "App is one of the best",
        reviewText: "I have been using Netflix since it came out pretty much, I've always enjoyed it and I have loved everything they have done with the App , it is one of the best streaming platform, provides great quality but the subscription is very expensive, we get only one screen in UE this need to be addressed by Netflix",
        reviewerName: "Ben Cutting",
        reviewDate: "8/27/2024"
    };

    const teamMembersData = [
        {
            name: 'Cillian',
            surname: 'Murphy',
            role: 'Manager',
            imageUrl: teamMember1,
        },
        {
            name: 'Emiley',
            surname: 'Blunt',
            role: 'Relevant field',
            imageUrl: teamMember2,
        },
        {
            name: 'Matt',
            surname: 'Murphy',
            role: 'Relevant field',
            imageUrl: teamMember3,
        },
    ];

    const handleContactAction = () => {
        setShowPopup(!showPopup)
    };

    const handleCloseAction = () => {
        setShowPopup(false)
    }

    // handle submit contact
    const handleSubmitContactAction = () => {
        // Close the contact form
        handleCloseAction();

        // alert
        toast.success('Message successfully sent!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
                background: '#2E246C',
                color: 'white',
                fontWeight: 700,
                borderRadius: '8px',
                padding: '16px',
                marginTop: 50
            }
        });
    };

    // init
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    // Left Side Content
    const MainContent = () => {
        return (
            <div className="w-full md:w-2/3">
                {/* Special Price */}
                <SpecialPriceSection pricingData={pricingData} />

                {/* Screenshots */}
                <Screenshots
                    screenshotData={[...[img1, img2], ...screenshotData]}
                    title={'My recent works'}
                />

                {/* Description */}
                <DescriptionSection desc={headerData?.desc} />

                {/* What you'll get */}
                <InfoSection
                    data={infoSectionData?.data}
                    title={infoSectionData?.title}
                    linkPath={infoSectionData?.linkPath}
                    isVertical={true}
                />

                {/* Experience & Qualification */}
                <InfoSection
                    data={experienceData?.data}
                    title={experienceData?.title}
                    linkPath={experienceData?.linkPath}
                />

                {/* Team Members */}
                <TeamMembersGrid
                    members={teamMembersData}
                />

                {/* Rating */}
                <RatingSection ratingData={ratingData} />

                {/* Additional Info */}
                <AdditionalInfo infoData={additionalInfoData} />

                {/* Contact & Connect */}
                <div className='flex flex-col md:flex-row space-x-5'>
                    {/* Contact Form */}
                    <ContactForm onClose={handleCloseAction} onSubmit={handleSubmitContactAction} />

                    {/* Let's Connect */}
                    <LetsConnectSection contactInfo={contactInfoData} />
                </div>

                {/* Recommendation */}
                <div className='mb-5 px-3'>
                    <CategorySection title="Recomendation" cards={servicesData} category={'Service'} />
                </div>

                {/* Popup */}
                {showPopup && <ContactForm isPopup={showPopup} onClose={handleCloseAction} onSubmit={handleSubmitContactAction} />}

            </div>
        )
    }

    // Right Side Content
    const Sidebar = () => (
        <div className="w-full md:w-1/3 mt-8 md:mt-0 px-3 md:px-0">
            <h2 className="text-3xl font-bold mb-4">PEOPLE ALSO VIEW</h2>
            <div className={`mt-5 grid gap-6 md:grid-cols-1'} `}>
                {servicesData.map((game, index) => (
                    <GameCard key={index} game={game} bg={'rgba(121, 47, 255, 0.15)'} />
                ))}
            </div>
        </div>
    );


    // render
    return (
        <>
            <div className="explore-herosection">
                {/* <div className="md:max-w-[90%] lg:max-w-[80%] xxl:max-w-[70%] mx-auto"> */}
                <div className="mx-auto max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]">
                    <div className='px-4 py-8 flex flex-col gap-3'>
                        {/* Header Section */}
                        <HeaderSection
                            name={headerData?.name}
                            title={headerData?.title}
                            description={headerData?.description}
                            image={headerData?.image}
                        />

                        {/* Stats */}
                        {/* <StatsSection stats={stats} /> */}
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-12">
                        <MainContent />
                        <Sidebar />
                    </div>
                </div>

            </div>

        </>
    )
}

export default ServiceDetailsScreen