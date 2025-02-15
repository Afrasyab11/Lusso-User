import ServiceImg from "../../assets/images/aboutServiceImage.svg";

const ServiceSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            <div className="flex justify-center items-center">
                <img src={ServiceImg} className="w-full h-auto max-w-4xl object-contain" alt="Service" />
            </div>
            <div
                className="flex flex-col justify-center gap-7 md:gap-4">
                <span className="font-bold text-3xl md:text-6xl" style={{ color: "#FFFFFF" }}>What We do</span>
                <p className="text-base md:text-xl font-normal text-balance" style={{ color: "#FFFFFF" }}>Lusso.ai is a cutting-edge AI-driven digital marketplace that revolutionizes how businesses and users interact with products and services. We provide personalized AI-powered automation tools for content creation, marketing, SEO optimization, and analytics, streamlining digital commerce. Our platform functions as a 'Digital CEO,' enabling businesses to scale efficiently while delivering tailored solutions to enhance growth and engagement.</p>
            </div>
        </div>
    )
}

export default ServiceSection;
