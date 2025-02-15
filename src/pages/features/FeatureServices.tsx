import bannerImage from "../../assets/images/features/banner-services.jpeg"
import secondaryBannerImg from "../../assets/images/features/bg-sec-3.jpeg"
import FeatureCommon from "../../components/featureCommon/FeatureCommon"
import { cardDataServices, cardDataServices2, cardDataServices3 } from "../../data/featureData"

const textData = {
    title: "The all-in-one services",
    subTitle: "Now with AI",
    heading1: "Find the Services You Need, Fast",
    heading2: "Browse through a wide variety of services, from freelance jobs to business consultations. Find the best-rated professionals for your specific needs and connect instantly.",
    heading3: "Expand Your Client Base Effortlessly",
    heading4: "Whether you're a freelancer or a business consultant, our platform offers a simple and efficient way to reach new clients. Promote your services with ease across social platforms, and use detailed analytics to improve your offerings.",
    secondaryBannerDesc: "FIFA is a discontinued football video game franchise that was developed by EA Vancouver and EA Romania and published by EA Sports."
}
const otherCardData = {
    card2: cardDataServices2,
    card3: cardDataServices3
}
const FeatureServices = () => {
    return (
        <div className="">
            <FeatureCommon topBgImage={bannerImage} cardData={cardDataServices} secondaryBannerImg={secondaryBannerImg} textData={textData} cardDataSecondary={otherCardData} />
        </div>
    )
}

export default FeatureServices