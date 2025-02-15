
import { useNavigate } from "react-router-dom";
import TitleBar from "../../components/common/TitleBar";
import ProductCardNew from "../home/ProductCardNew";

const WhatsNewSection = (props: any) => {
    const navigate = useNavigate();
    const navigateDetails = (id: number) => navigate(`/dashboard/details/${id}`);
    const { data } = props;


    return (
        <>
            {/* <h3 className="font-[700] text-[50px] text-white text-center uppercase fontFamily-work-sans mb-10 flex justify-center gap-2 items-center">
                SEE WHAT'S NEW

                <button>
                    <img src={nextIcon} alt="see more" className="h-8" />
                </button>
            </h3> */}
            {/* <h3 className="relative font-bold text-5xl text-white text-center uppercase font-work-sans mb-10 flex justify-center items-center gap-2 group"> */}
            <TitleBar title={"See What's New"} />

            <div className="w-full grid grid-cols-4 gap-5 fontFamily-work-sans">
                {data.map((item: any) => (
                    <ProductCardNew item={item} navigateDetails={navigateDetails} />

                ))}
            </div>

        </>
    );
};


export default WhatsNewSection