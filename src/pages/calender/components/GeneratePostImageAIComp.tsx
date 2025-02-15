// import GeneratedImage from "../../assets/images/calender/AiGeneratedImage.jpg";

import {useState} from 'react';
import ImageSelect from '../../../assets/images/calender/imageSelect.png';
import sparkle from '../../../assets/images/calender/Sparkle2.png';
import TextSelect from '../../../assets/images/calender/TextSelect.png';
import CreateAIPost from './CreateAIPost';
import {useAiPost} from '../../../context/CreateAIContext';

const GeneratePostImageAIComp = ({ImageAiButton, TextAiButton}: any) => {
  const {generateAiFlow, setGenerateAiFlow, handlePostImageGeneration} =
    useAiPost();

  const closeAIFlow = () => {
    setGenerateAiFlow(false);
  };

  return (
    <>
      <CreateAIPost />
      {generateAiFlow && (
        <div className="z-[999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center">
          <div className="w-[52%] lg:w-[62%] md:w-[70%]  bg-[#241a57] rounded-[15px] p-[2rem] flex flex-col justify-center ">
            <div className="flex gap-4 items-center">
              <div>
                <img src={sparkle} alt="" className="" />
              </div>
              <div>
                <p className="text-white font-[700] text-[1.6rem]">
                  Generate Your Post with AI{' '}
                </p>
                <p className="text-[#FFFFFF99] font-[400] text-[0.8rem]">
                  choose what you want{' '}
                </p>
              </div>
            </div>
            <div className="flex justify-between my-[1.8rem]">
              <div
                className=" p-[2px] rounded-2xl w-[46%]"
                style={{
                  background: TextAiButton
                    ? 'linear-gradient(134deg, #3C80F6 -66%, #262242 66%, #3d356c 80%)'
                    : undefined,
                }}
              >
                <button
                  // onClick={handleTextAiScreen}
                  className={`flex justify-center items-center flex-col ${
                    TextAiButton ? '' : 'border'
                  }  border-[#3d356c] p-[1rem] bg-[#291a59] rounded-2xl w-full h-full shadow-lg`}
                >
                  <img src={TextSelect} alt="" />
                  <p
                    className={` ${
                      TextAiButton ? 'text-[white]' : 'text-[#FFFFFF99]'
                    } font-semibold text-[1rem] `}
                  >
                    Post Text Generation
                  </p>
                </button>
              </div>

              <div
                className=" p-[2px] rounded-2xl w-[46%]"
                style={{
                  // background: ImageAiButton
                  background:  'linear-gradient(134deg, #3C80F6 -66%, #262242 66%, #3d356c 80%)'
                }}
              >
                <button
                  // onClick={handleImageAiScreen}
                  className={`flex justify-center items-center flex-col   border-[#3d356c] p-[1rem] bg-[#291a59] rounded-2xl w-full h-full shadow-lg `}
                  // className={`flex justify-center items-center flex-col ${
                  //   ImageAiButton ? '' : 'border'
                  // }  border-[#3d356c] p-[1rem] bg-[#291a59] rounded-2xl w-full h-full shadow-lg `}
                >
                  <img src={ImageSelect} alt="" />
                  <p
                    className={`${ 'text-[#FFFFFF99]'
                    } first-line: font-[600] text-[1rem]`}
                    // className={`${
                    //   ImageAiButton ? 'text-[white]' : 'text-[#FFFFFF99]'
                    // } first-line: font-[600] text-[1rem]`}
                  >
                    Image Generation
                  </p>
                </button>
              </div>
            </div>
            <div>
              <p className="capitalize text-[#FFFFFF99] mb-[0.4rem] ">
                how many days content
              </p>
              <input
                type="text"
                className="w-full bg-[#3a118d] p-[1rem] text-[#FFFFFF99] pb-[3rem] rounded-[12px] "
              />
            </div>

            <div className="flex justify-center items-center mt-[1.8rem]">
              <button
                onClick={handlePostImageGeneration}
                className=" py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem]"
                style={{
                  background:
                    'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                }}
              >
                Generate
              </button>
              <button
                className="bg-[#792FFF80]  py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem] ml-[0.8rem]"
                onClick={closeAIFlow}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneratePostImageAIComp;
