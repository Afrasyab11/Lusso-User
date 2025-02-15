import "./about.scss";
import EventSection from "./EventSection";
import HeroSection from "./HeroSection";
import ImpactSection from "./ImpactSection";
import ServiceSection from "./ServiceSection";
import StorySection from "./StorySection";

const AboutUs = () => {
    return (
        <div className="bg-blurred-new">
            <div className="w-full">
                <HeroSection />
                <div className="md:px-10 px-[15px] py-2">
                    <ServiceSection />
                    {/* <SuccessSection /> */}
                </div>
            </div>
            <div className="w-full md:p-10 p-[14px]">
                <StorySection />
                <ImpactSection />
                {/* <SuccessSection /> */}
            </div>
            <div className=" flex justify-center items-center">
                <EventSection />
            </div>
        </div>
    );
};

export default AboutUs;
