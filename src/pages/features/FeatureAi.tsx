import axios from 'axios';
import { useEffect, useState } from 'react';
import bannerImage from '../../assets/images/features/banner-ai.png';
import secondaryBannerImg from '../../assets/images/features/bg-sec-1.jpeg';
import FeatureCommon from "../../components/featureCommon/FeatureCommon";
import { cardDataAi, cardDataAi2, cardDataAi3 } from '../../data/featureData';
import { getCookies } from '../../utils/utils';
const textData = {
    title: "AI-Powered Tools",
    subTitle: "Tailored Solutions for Users and Developers",
    heading1: "Smart Solutions for Everyday Needs",
    heading2: "Discover AI tools and products that simplify tasks, enhance decision-making, and offer personalized experiences. From AI-powered assistants to machine learning tools, explore products designed to make your life easier.",
    heading3: "Amplify Your AI Innovations",
    heading4: "Bring your AI product to a global audience. Leverage our platform’s reach to get in front of developers, businesses, and end-users alike. Our advanced analytics help you understand user engagement and optimize your product’s performance.",
    secondaryBannerDesc: "AI system used in healthcare to assist doctors by analyzing medical data, recommending treatments, and helping with diagnostics based on medical records."
}

const otherCardData = {
    card2: cardDataAi2,
    card3: cardDataAi3
}

const FeatureAi = () => {
    const [Loading, setLoading] = useState(false)
    const [data, SetData] = useState([])

    const getExploreData = () => {
        setLoading(true);
        SetData([])
        const token = getCookies('authToken');
        axios
            .get(`https://api.lusso.dev/api/v1/products?page=0&size=100&category=${'Ai Products'}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                // console.log(response.data)
                SetData(response.data.products);

                setLoading(false);
            })
            .catch(err => {
                // console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getExploreData()
    }, [])


    return (
        <div className="">
            <FeatureCommon topBgImage={bannerImage} cardData={cardDataAi} secondaryBannerImg={secondaryBannerImg} textData={textData} cardDataSecondary={otherCardData} />
        </div>
    )
}

export default FeatureAi