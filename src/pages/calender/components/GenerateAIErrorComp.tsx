import { useEffect, useRef } from 'react';
import ErrorIcon from '../../../assets/images/calender/ic_baseline-error.png';
import {useAiPost} from '../../../context/CreateAIContext';

const GenerateAIErrorComp = ({handleGenerate}: any) => {
  const {setErrorModalDisplay, errorModalDisplay} = useAiPost();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleRrtry = () => {
    try {
        setErrorModalDisplay(false)
        handleGenerate()
    } catch (error) {
        setErrorModalDisplay(true)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setErrorModalDisplay(false);
    }
  };

  useEffect(() => {
    if (errorModalDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [errorModalDisplay]);
  return (
    <>
      {errorModalDisplay && (
        <div className="z-[999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center">
          <div className="w-[60%] h-[75%] bg-[#241a57] rounded-[15px] flex flex-col justify-center items-center"   ref={modalRef}>
            <img src={ErrorIcon} alt="" className="w-[6rem]" />
            <p className="text-white font-[500] text-[1.6rem] my-[2rem]">
              Sorry, something went wrong.
            </p>
            <button
              onClick={handleRrtry}
              className="py-2 px-4 rounded-md text-white text-center font-semibold text-xs xl:text-lg md:mb-0 w-[10rem]"
              style={{
                background:
                  'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateAIErrorComp;
