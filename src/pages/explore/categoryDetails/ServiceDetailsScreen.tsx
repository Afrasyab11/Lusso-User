import { Client } from "@stomp/stompjs";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import bannerImg from '../../../assets/images/explore/category/services/bg.svg';
import img1 from '../../../assets/images/explore/category/services/img1.png';
import logo from '../../../assets/images/explore/category/services/logo.svg';
import teamMember1 from '../../../assets/images/explore/category/team/1.png';
import teamMember2 from '../../../assets/images/explore/category/team/2.png';
import teamMember3 from '../../../assets/images/explore/category/team/3.png';
import ContactForm from '../../../components/common/ContactForm';
import { getCookies } from '../../../utils/utils';
import CategorySection from '../CategorySection';
import AdditionalInfo from "./Common/AdditionalInfo";
import DescriptionSection from './Common/DescriptionSection';
import FeatureSection from './Common/FeatureSection';
import InfoSection from './Common/InfoSection';
import MainBannerWithHeader from './Common/MainBannerWithHeader';
import RatingSection from './Common/RatingSection';
import Screenshots from './Common/Screenshots';
import Sidebar from "./Common/sidebar";
import { getCategoryName } from "./GameDetailsScreen";
import SpecialPriceSection from "./Services/SpecialPriceSection";
import StatsSection from "./Services/StatSection";
import { infoSectionData } from './staticData';

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
// Define the interface for header data
interface HeaderDataType {
    logo: string;           // URL for the logo image
    name: string;           // Name of the service provider
    author: string;         // Author of the service
    title: string;          // Title of the service
    subTitle: string;       // Subtitle of the service
    description: string;    // Description of the service
    image: string;          // User image URL
    rating: number;         // Rating value
    ratingCount: string;    // Count of ratings (formatted as a string)
    category: string;       // Category of the service
    bookingLink: string;    // Link for booking (if applicable)
    contactImg: string;     // Contact image URL
    desc: string;           // Detailed description or any additional info
}

interface additionalInfoDataType {
    publisher: string,
    genres: string,
    category: string,
    productSize: string,
    productInfo: {
        Feature?: string;
    };
    ageRating: string,
    support: {
        phoneNumber?: string,
        website?: string,
        email: string
    },
    compatibility: {
        devices: string[],
        requirements: string[]
    }
}
interface Product {
    productId: string;
    category: string;
    name: string;
    createdBy: string;
    createdOn: string;
    subCategory: string;
    exploreImage?: string;
    rating?: string;
}


function ServiceDetailsScreen({ isCreator = false }: { isCreator?: boolean }) {
    const { id }: { id?: string } = useParams();

    const productId = id
    const [client, setClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("");
    const [trendingData, setTrendingData] = useState([]);
    const [trendingData1, setTrendingData1] = useState([]);
    const [recommendedData1, setRecommendedData1] = useState([]);
    const [recommendedData, setRecommendedData] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState<any[]>([]); // Adjust type as needed
    const [userData, setUserData] = useState<any>(null);
    const location = useLocation()
    const segments = location?.pathname?.split('/');
    const category = segments?.[2];

    const filterRelatedData = (data: any) => {
        console.log(data, 'filter')
        let filterData = data?.filter((e: any) => e.category?.toLowerCase() === getCategoryName(category)?.toLowerCase())
        return filterData
    }

    const topTrendingData = async () => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get('https://api.lusso.dev/api/v1/products/trending', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Transform data into the required format
            const trendingData = response.data.products.map((product: Product) => ({
                imageSrc: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                category: product.category
            }));

            setTrendingData(trendingData);
            const trendingData1 = response.data.products.map((product: Product) => ({
                image: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                rating: 4.7,
                category: product.category

            }));

            setTrendingData1(trendingData1);

        } catch (error) {
            console.error("Error fetching trending products:", error);
            throw error;
        }
    };
    const recommendedDataFn = async () => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get('https://api.lusso.dev/api/v1/products/recommendations', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const recommendedData = response.data.products.map((product: Product) => ({
                image: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                rating: product.rating

            }));
            setRecommendedData(recommendedData)
            const recommendedData1 = response.data.products.map((product: Product) => ({
                imageSrc: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
            }));

            setRecommendedData1(recommendedData1);
        } catch (error) {
            console.error("Error fetching trending products:", error);
            throw error;
        }
    };
    useEffect(() => {
        const authUser = getCookies('authUser');

        setUserData(authUser);

    }, []);

    // useEffect(() => {
    //     try {
    //         // Initialize the STOMP client
    //         const stompClient = new Client({
    //             webSocketFactory: () => new SockJS("https://api.lusso.dev/ws"),
    //             debug: (str) => {
    //                 console.log(`[STOMP Debug] ${str}`);
    //             },
    //             reconnectDelay: 5000,
    //             heartbeatIncoming: 4000,
    //             heartbeatOutgoing: 4000,
    //         });

    //         let subscription: any; // To track the subscription for cleanup

    //         // Handle onConnect
    //         stompClient.onConnect = (frame) => {
    //             console.log("Connected: " + frame);
    //             setConnected(true);

    //             // Subscribe to the topic
    //             subscription = stompClient.subscribe(
    //                 `/topic/progress/${productId}`,
    //                 (message) => {
    //                     const progressUpdate = JSON.parse(message.body);
    //                     setReceivedMessages((prevMessages) => [
    //                         ...prevMessages,
    //                         progressUpdate,
    //                     ]);
    //                 }
    //             );
    //         };

    //         // Handle onDisconnect
    //         stompClient.onDisconnect = () => {
    //             console.log("Disconnected");
    //             setConnected(false);
    //         };

    //         // Activate the client
    //         stompClient.activate();
    //         setClient(stompClient);

    //         // Cleanup function to deactivate the client and unsubscribe
    //         return () => {
    //             if (subscription) {
    //                 subscription.unsubscribe();
    //             }
    //             stompClient.deactivate();
    //         };
    //     } catch (activationError) {
    //         console.error("Error during STOMP client setup: ", activationError);
    //     }
    // }, [productId]); // Dependency array includes productId

    useEffect(() => {
        if (client && connected && userData?.userId) {
            const eventPayload = {
                productId,
                userId: userData?.userId,
                eventType: "Click", // Click | Search | Redirect
                timestamp: new Date().getTime(),
            };

            client.publish({
                destination: "/app/product/events",
                body: JSON.stringify(eventPayload),
            });
        }
    }, [client, connected, productId]);

    // Send message handler
    const sendMessage = () => {
        if (client && connected) {

            const eventPayload = {
                productId,
                userId: userData?.userId,
                eventType: "Click",
                timestamp: new Date().getTime(),
            };


            // Send event to the backend
            client.publish({
                destination: "/app/product/events",
                body: JSON.stringify(eventPayload),
            });

            setMessage("");
        }
    };
    const [product, setProduct] = useState("")

    const [headerData, setHeaderData] = useState<HeaderDataType>({
        logo: '',
        name: "", // Updated field
        author: '',
        title: "",
        subTitle: '',
        description: "", // Updated field
        image: img1, // Ensure you have a UserImage import
        rating: 0,
        ratingCount: '',
        category: '',
        bookingLink: '', // Placeholder for booking link
        contactImg: logo, // You can use the logo or a different image
        desc: ``
    });


    const [additionalInfoData, setadditionalInfoData] = useState<additionalInfoDataType>({
        publisher: "",
        genres: "",
        category: "",
        productSize: "",
        productInfo: {
            Feature: ''

        },
        ageRating: "",
        support: {
            phoneNumber: "",
            website: "",
            email: ""
        },
        compatibility: {
            devices: [],
            requirements: []
        }
    })
    const [mediaData, setMediaData]: any[] = useState([]);

    const [contactInfoData, setContactInfoData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchServiceData = () => {
        const token = getCookies('authToken');
        axios
            .get(`https://api.lusso.dev/api/v1/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const service = response.data;

                setProduct(service)
                setHeaderData({
                    logo: service?.exploreImage || logo, // Fallback
                    name: service?.name || 'N/A', // Fallback
                    author: service?.createdBy || 'N/A', // Fallback
                    title: service?.name || 'N/A', // Fallback
                    subTitle: service?.name || 'N/A', // Fallback
                    description: service?.description || 'N/A', // Fallback
                    image: service?.userImage || logo, // Ensure you have a UserImage import
                    rating: service?.rating || 'N/A',
                    ratingCount: service?.ratingCount || 'N/A', // Fallback
                    category: service?.category || 'N/A', // Fallback
                    bookingLink: service?.bookingLink || 'N/A', // Placeholder
                    contactImg: service?.contactImg || logo, // Fallback
                    desc: service?.description || `Looking for the most talked about TV shows and movies from around the world? They’re all on Netflix...` // Fallback
                });
                setContactInfoData(
                    {
                        phone: service?.additionalInfo?.supportInfo["PHONE"],
                        website: service?.additionalInfo?.supportInfo["WEBSITE"],
                        email: service?.additionalInfo?.supportInfo["EMAIL"]
                    }
                )

                let mediaData: any = [];
                if (service?.mediaLinks) {
                    mediaData = [...service?.mediaLinks?.map((media: any) => media?.url)]; // Just the image URLs
                }

                if (service?.trailerVideos) {
                    mediaData = [
                        ...service?.trailerVideos?.map((trailer: any) => ({
                            video: trailer.url,
                            img: 'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg' // Replace with the actual thumbnail or placeholder
                        })), // Add videos with corresponding images
                        ...mediaData
                    ]
                }

                setMediaData(mediaData);

                setadditionalInfoData({
                    publisher: "",
                    genres: service?.subCategory || "",
                    category: service?.category || "",
                    productSize: "",
                    productInfo: {
                        Feature: service?.productInfo.Feature
                    },
                    ageRating: service?.additionalInfo?.audience?.age[0],
                    support: {
                        phoneNumber: service?.additionalInfo?.supportInfo["PHONE_NUMBER"],
                        website: service?.additionalInfo?.supportInfo["WEBSITE"],
                        email: service?.additionalInfo?.supportInfo["EMAIL"]
                    },
                    compatibility: {
                        devices: service?.additionalInfo?.productComability?.map((dev: string) => dev),
                        requirements: []
                    }
                })
            })
            .catch(error => {
                console.error('Error fetching service data:', error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        sendMessage()
        if (navigator.onLine) {

            fetchServiceData();
            if (!isCreator) {
                topTrendingData()
                recommendedDataFn()
            }
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, [id]);

    const [showPopup, setShowPopup] = useState(false);

    const stats: StatItem[] = [
        { value: '14', label: 'Years of Experience' },
        { value: '50+', label: 'Projects Completed' },
        { value: '1.5k', label: 'Happy Clients' },
    ];

    // const headerData = {
    //     logo: logo,
    //     name: "Gerold",
    //     author: 'Johnathan Miller',
    //     title: "Texas Legal Services",
    //     subTitle: 'Expert legal solutions tailored to you needs',
    //     description: "I break down complex user experience problem to create integirty foxussed solutions",
    //     image: UserImage,
    //     rating: 4.5,
    //     ratingCount: '330k',
    //     category: 'Legal',
    //     bookingLink: '',
    //     contactImg: logo,
    //     desc: `Looking for the most talked about TV shows and movies from around the world? They’re all on Netflix. We’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break.\nNetflix membership is a month-to-month subscription that begins at sign up. You can easily cancel anytime, online, 24 hours a day.`
    // }

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

    // const ratingData = {
    //     starDistribution: starDistribution,
    //     rating: 4.5,
    //     reviewTitle: "App is one of the best",
    //     reviewText: "I have been using Netflix since it came out pretty much, I've always enjoyed it and I have loved everything they have done with the App , it is one of the best streaming platform, provides great quality but the subscription is very expensive, we get only one screen in UE this need to be addressed by Netflix",
    //     reviewerName: "Ben Cutting",
    //     reviewDate: "8/27/2024"
    // };

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

    const handleSubmitContactAction = () => {
        handleCloseAction();

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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [1]);


    const MainContent = (props: any) => {
        return (
            <div className={`w-full md:${isCreator ? 'w-full' : 'w-2/3'}`}>
                <StatsSection />

                <SpecialPriceSection pricingData={pricingData} />

                <Screenshots
                    screenshotData={props?.mediaData}
                    title={'My Recent Works'}
                />

                <DescriptionSection desc={headerData?.desc} />

                <InfoSection
                    data={infoSectionData?.data}
                    title={infoSectionData?.title}
                    linkPath={infoSectionData?.linkPath}
                    isService={true}
                />
                <FeatureSection
                    title={"Experience & qualification"}
                    productInfo={props?.additionalInfoData.productInfo.Feature}
                />

                <AdditionalInfo infoData={props?.additionalInfoData} />

                <RatingSection isCreator={isCreator} ratingDataAverage={{ avaerageRating: props?.product?.rating, memeberToRate: props?.product?.ratingCount }} ratingData={ratingData} productId={id}
                />

                {/* <div className='flex flex-col md:flex-row md:space-x-5'>
                    <ContactForm onClose={handleCloseAction} onSubmit={handleSubmitContactAction} />

                    <LetsConnectSection contactInfo={contactInfoData} />
                </div> */}

                {!isCreator && <div className='mt-14 mb-20 md:mt-24 md:mb-44 px-3'>
                    <CategorySection title="Recommended" cards={props?.recommendedData} category={'Service'}
                        isPopup={true}
                    />
                </div>}

                <div className="md:hidden mb-24 px-3">
                    <CategorySection
                        title="People Also View"
                        cards={filterRelatedData(props?.trendingData)}
                        category={'App'}
                        isPopup={true}
                    />
                </div>

                {/* Floating Contact Button */}
                {/* <FloatingButton
                    name="Message Miller"
                    title="Customer Support"
                    avgResponseTime="1 Hour"
                    imageUrl={headerData?.logo ? headerData?.logo : chatBotImg}
                    onClick={handleContactAction}
                /> */}
                {showPopup && <ContactForm isPopup={showPopup} onClose={handleCloseAction} onSubmit={handleSubmitContactAction} />}
            </div>
        )
    }

    const getReviews = () => {
        setLoading(true);
        const token = getCookies('authToken');
        axios
            .get(
                `https://api.lusso.dev/api/v1/reviews?productId=${id}&page=0&size=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(response => {
                let reviews: any = response.data?.reviews;
                setReviews(reviews);
                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                setLoading(false);
            });
    };
    useEffect(() => {
        if (navigator.onLine) {

            getReviews()
        } else {
            console.warn("No internet connection, API calls skipped.");
        }

    }, [id]);
    const [reviews, setReviews]: any = useState([]);
    const [starDistributions, setStarDistributions] = useState([
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 },
    ]);
    const [reviewStats, setReviewStats] = useState({ rating: 0, ratingCount: '0' });

    const ratingData = {
        starDistribution: starDistributions,
        ratings: reviewStats.rating,
        ratingTotal: reviewStats.ratingCount,
        reviews
    };
    const handleUserAction = (actionType: any) => {
        const token = getCookies('authToken'); // Get the auth token from cookies

        axios.post(
            'https://api.lusso.dev/api/v1/userAction',
            {
                action: actionType,
                productId: id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the auth token
                },
            }
        )
            .then((response) => {
                fetchServiceData()
            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
            });
    };
    return (

        <div className="alignCenter bg-blurred-new text-white min-h-screen">
            { }
            <MainBannerWithHeader
                bannerImg={bannerImg}
                headerData={headerData}
                isService={true}
                handleContactAction={handleContactAction}
                handleUserAction={handleUserAction} product={product}
                onAppointmentBook={handleContactAction}
                isCreator={isCreator}
            />

            <div className="content-new">
                <div className="lg:max-w-[80%] mx-auto py-3 md:px-4 md:py-8 769-1300:max-w-[100%]">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <MainContent product={product} mediaData={mediaData} additionalInfoData={additionalInfoData} trendingData={filterRelatedData(trendingData)}
                            recommendedData={recommendedData1} />
                        {!isCreator && <Sidebar sidebarTitle={"Top Rated"} trendingData={filterRelatedData(trendingData1)} recommendedData={recommendedData} />}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ServiceDetailsScreen;