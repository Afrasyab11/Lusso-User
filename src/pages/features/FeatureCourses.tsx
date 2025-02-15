import bannerImage from "../../assets/images/features/banner-course.jpeg"
import secondaryBannerImg from "../../assets/images/features/bg-sec-6.jpeg"
import FeatureCommon from "../../components/featureCommon/FeatureCommon"
import { cardDataCourses, cardDataCourses2, cardDataCourses3 } from "../../data/featureData"
const textData = {
    title: "Master New Skills",
    subTitle: "Share Your Expertise Globallys",
    heading1: "Learn New Skills from the Best",
    heading2: "Browse and download a wide range of apps, from productivity tools to lifestyle apps. Our platform curates the best apps for your needs and provides recommendations based on your usage patterns.",
    heading3: "Grow Your Teaching Brand",
    heading4: "Use our platform to reach learners across the globe. Get detailed insights into student engagement, track course completion rates, and promote your educational offerings on social media for increased visibility",
    secondaryBannerDesc: "We’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break."
}
const otherCardData = {
    card2: cardDataCourses2,
    card3: cardDataCourses3
}
const FeatureCourses = () => {
    return (
        <div>
            <FeatureCommon topBgImage={bannerImage} cardData={cardDataCourses} secondaryBannerImg={secondaryBannerImg} textData={textData} cardDataSecondary={otherCardData} />
        </div>
    )
}

export default FeatureCourses