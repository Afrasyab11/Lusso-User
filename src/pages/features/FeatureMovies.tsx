import bannerImage from "../../assets/images/features/banner-movies.jpeg"
import secondaryBannerImg from "../../assets/images/features/bg-sec-4.jpeg"
import FeatureCommon from "../../components/featureCommon/FeatureCommon"
import { cardDataMovies, cardDataMovies2, cardDataMovies3 } from "../../data/featureData"

const textData = {
    title: "Find Movies You Love",
    subTitle: "Share Films with the World",
    heading1: "Discover and Stream Movies You’ll Love",
    heading2: "From Hollywood blockbusters to indie films, find and stream the movies that match your taste. Get personalized recommendations based on your viewing history and browse curated lists of top films.",
    heading3: "Boost Your Film’s Reach to a Global Audience",
    heading4: "Showcase your film to a broad audience through our integrated social platform promotions. Track audience engagement and gain insights into viewer demographics, feedback, and interaction with your content.",
    secondaryBannerDesc: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project."
}
const otherCardData = {
    card2: cardDataMovies2,
    card3: cardDataMovies3
}
const FeatureMovies = () => {
    return (
        <div className="">
            <FeatureCommon topBgImage={bannerImage} cardData={cardDataMovies} secondaryBannerImg={secondaryBannerImg} textData={textData} cardDataSecondary={otherCardData} />
        </div>
    )
}

export default FeatureMovies