import bannerImage from "../../assets/images/features/banner-games.jpeg"
import secondaryBannerImg from "../../assets/images/features/bg-sec-2.jpeg"
import FeatureCommon from "../../components/featureCommon/FeatureCommon"
import { cardDataGames, cardDataGames2, cardDataGames3 } from "../../data/featureData"

const textData = {
    title: "Explore and Elevate",
    subTitle: "A Gaming Hub for Users and Developers",
    heading1: "Immerse Yourself in the World of Gaming",
    heading2: "Whether you're into casual mobile games or full-blown multiplayer experiences, our platform gives you access to the latest and most popular titles. Easily find new releases, top-rated games, and community favorites.",
    heading3: "Get Your Game in the Spotlight",
    heading4: "Reach millions of potential players by showcasing your game on our platform. Utilize our analytics to track gameplay metrics, user behavior, and feedback to optimize your game for success.",
    secondaryBannerDesc: "FIFA is a discontinued football video game franchise that was developed by EA Vancouver and EA Romania and published by EA Sports."
}
const otherCardData = {
    card2: cardDataGames2,
    card3: cardDataGames3
}
const FeatureGames = () => {
    return (
        <div className="">
            <FeatureCommon topBgImage={bannerImage} cardData={cardDataGames} secondaryBannerImg={secondaryBannerImg} textData={textData} cardDataSecondary={otherCardData} />
        </div>
    )
}

export default FeatureGames