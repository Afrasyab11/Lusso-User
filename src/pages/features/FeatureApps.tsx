import bannerImage from '../../assets/images/features/banner-apps.png';
import secondaryBannerImg from '../../assets/images/features/bg-sec-5.jpeg';
import FeatureCommon from '../../components/featureCommon/FeatureCommon';
import {
  cardDataApps,
  cardDataApps2,
  cardDataApps3,
} from '../../data/featureData';

const textData = {
  title: 'Find the Perfect Apps',
  subTitle: 'Elevate Your Development Success',
  heading1: 'Discover Apps for Every Need',
  heading2:
    'Browse and download a wide range of apps, from productivity tools to lifestyle apps. Our platform curates the best apps for your needs and provides recommendations based on your usage patterns.',
  heading3: 'Increase App Downloads and Engagement',
  heading4:
    'romote your apps to a large audience and get detailed insights into app performance. Track user downloads, retention rates, and feedback to improve app functionality and user satisfaction.',
  secondaryBannerDesc:
    'We’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break.',
};
const otherCardData = {
  card2: cardDataApps2,
  card3: cardDataApps3,
};
const FeatureApps = () => {
  return (
    <div className="">
      <FeatureCommon
        topBgImage={bannerImage}
        cardData={cardDataApps}
        secondaryBannerImg={secondaryBannerImg}
        textData={textData}
        cardDataSecondary={otherCardData}
      />
    </div>
  );
};

export default FeatureApps;
