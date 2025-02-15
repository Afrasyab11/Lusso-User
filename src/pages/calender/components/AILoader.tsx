import sparkle from '../../../assets/images/calender/Sparkle2.png';
import { useAiPost } from '../../../context/CreateAIContext';
import CreateImagePostPreview from './CreateImagePostPreview';
import ImagePostPreview from './CreateImagePostPreview';

const AILoader = () => {
  const { AILoader } =
    useAiPost();


  return (
    <>
      <CreateImagePostPreview />
      {AILoader && (
        <div>
          <div className="z-[999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center">
            <div className="lg:w-[52%] h-[80%] md:w-[52%] bg-[#241a57] rounded-[15px]  flex flex-col justify-center">
              <div className="flex flex-col gap-4 items-center">
                <div className="pb-5">
                  <img
                    src={sparkle}
                    alt="w-1/2 h-1/2"
                    className="animate-zigzag"
                  />
                </div>
                <div>
                  <h2 className="text-[#FFFFFF] text-center font-semibold text-sm md:text-lg">
                    Crafting your perfect post...
                  </h2>
                  <p className="text-[#FFFFFF] text-xs md:text-base font-normal">
                    Just a moment while we bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AILoader;
