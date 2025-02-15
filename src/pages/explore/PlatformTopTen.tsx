import topTag from '../../assets/images/explore/top-tag.svg';
import TitleBar from "../../components/common/TitleBar";
import { TopCardData } from "./BannerSection";

function PlatformTopTen() {

    return (
        <div className="pt-6">
            <div className="flex justify-between items-center mb-4">
                <TitleBar title={"Platform's Top 10"} isLeft={true} isExplore={true} />
            </div>
            {/* <div className="relative flex items-center space-x-6 overflow-x-auto h-full scrollbar-hide">
                {TopCardData.map((item, index) => (
                    <div
                        className="relative z-10 rounded-lg hover:border overflow-hidden hover:p-1 min-w-[250px]"
                        key={index}
                    >
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={item?.imageSrc}
                                alt={'SampleCategory4'}
                                className="w-full h-[270px] object-cover"
                            />
                            <div className="absolute top-0 right-2 text-white text-xs px-2 rounded">
                                <img src={topTag} alt="topTag" className="w-8" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {item?.title}
                                </h3>
                                <p className="text-xs text-white">{item?.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="horizontal-scroll flex overflow-x-auto scrollbar-hide gap-5">
                {TopCardData.map((item, index) => (
                    <div
                        className="relative z-10 rounded-2xl transition-all duration-300 
                       hover:border-white hover:border-2 hover:p-1 min-w-[250px] overflow-hidden cursor-pointer"
                        key={index}
                    >
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src={item?.imageSrc}
                                alt={'SampleCategory4'}
                                className="w-full h-[280px] object-cover"
                            />
                            <div className="absolute top-0 right-2 text-white text-xs px-2 rounded">
                                <img src={topTag} alt="topTag" className="w-8" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {item?.title}
                                </h3>
                                <p className="text-xs text-white">{item?.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PlatformTopTen;
