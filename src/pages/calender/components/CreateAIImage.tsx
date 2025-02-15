import React, { useState } from 'react';
import sparkle from "../../../assets/images/calender/Sparkle2.png";
import { apiEndpoints } from '../../../constants/api-endpoints';
import makeApiCall from '../../../lib/apiCall';
import { useAiPost } from '../../../context/CreateAIContext';
import { creatingImageWithAI } from '../../../redux/createAI/generatePostSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreateAIImage = () => {
  const {ImagePostPreview, openImage, setOpenImage,  setAILoader, ErrorModalDisplayFtn ,  AIPostImgPreview} = useAiPost();
  const dispatch = useDispatch()
  const getData =  useSelector((state: any) => state.aiPost.aiPost)
  const prevPostData =  useSelector((state: any) => state.aiPost.prevPostData)
  console.log({getData, prevPostData})
  const [count, setCount] = useState(0);
  const [isLoading, setisLoading] = useState(false)
  const [formState, setFormState] = useState({
    postDescription: '',
    selectedTone: '',
    errors: {
      postDescription: '',
      tone: '',
    },
  });

  const handleTextAreaChange = (e: any) => {
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      postDescription: value,
      errors: {
        ...prev.errors,
        postDescription: '',
      },
    }));
  };

  const handleToneSelection = (tone: any) => {
    setFormState((prev) => ({
      ...prev,
      selectedTone: tone,
      errors: {
        ...prev.errors,
        tone: '',
      },
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      postDescription: '',
      tone: '',
    };

    if (!formState.postDescription.trim()) {
      newErrors.postDescription = 'Please describe your post idea';
      isValid = false;
    } else if (formState.postDescription.trim().length < 10) {
      newErrors.postDescription = 'Description should be at least 10 characters';
      isValid = false;
    }

    if (!formState.selectedTone) {
      newErrors.tone = 'Please select a tone for your post';
      isValid = false;
    }

    setFormState((prev) => ({
      ...prev,
      errors: newErrors,
    }));

    return isValid;
  };

  const handleGenerate = async () => {
    try {
      if (!validateForm()) {
        return;
      }
  
      const { selectedTone, postDescription } = formState;
  
      let newContent = { ...apiEndpoints.regenerateImage };
      newContent.params.query.purpose = postDescription;
      newContent.params.query.prefTone = prevPostData?.params?.query?.prefTone ?? "";
      newContent.params.query.post = getData?.post;
      newContent.params.query.imageUrl = getData?.image_url;
      newContent.params.query.count = count
      newContent.params.query.hashtags =  prevPostData?.params?.query?.hashtags;
      newContent.params.query.style =  selectedTone;
  
      setisLoading(true);
      setCount((prev) => prev + 1)  
      const generatingImage = await makeApiCall(newContent);
      if (!generatingImage) {
        ErrorModalDisplayFtn();
        return
      }
  
      await dispatch(creatingImageWithAI(generatingImage));
  
      await AIPostImgPreview();
      setOpenImage(false)
      setFormState({
        postDescription: '',
        selectedTone: '',
        errors: {
          postDescription: '',
          tone: '',
        },
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      ErrorModalDisplayFtn();
      setisLoading(false);
    } finally {
      setisLoading(false);
      setOpenImage(false)
    }
  };
  

  return (
    <>
    {isLoading && (
       <div>
       <div className="z-[9999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center">
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
    {openImage && (
        <div className='z-[999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center'>
        <div className='xl:w-[60%] lg:w-[58%] md:w-[70%] bg-[#241a57] rounded-[15px] p-[2rem] flex flex-col justify-center'>
          <div className='flex gap-4 items-center'>
            <div><img src={sparkle} alt="" className='' /></div>
            <div>
              <p className='text-white font-[700] text-[1.6rem]'>Generate Your Image with AI</p>
              <p className='text-[#FFFFFF99] font-[400] text-[0.8rem]'>Tell us about your post idea and its goal, and we’ll create something amazing for you!</p>
            </div>
          </div>
          <div className='mt-[1.2rem]'>
            <textarea
              value={formState.postDescription}
              onChange={handleTextAreaChange}
              rows={5}
              maxLength={150}
              className='resize-none w-full bg-[#3a118d] p-[1rem] text-white pb-[3rem] rounded-[12px]'
            />
            {formState.errors.postDescription && <p className="text-red-500">{formState.errors.postDescription}</p>}
          </div>
          <div>
            <p className='text-white font-[700] text-[1rem] mt-[0.9rem] mb-[1.1rem]'>Select a tone</p>
            <div className='flex justify-between'>
              <button 
                onClick={() => handleToneSelection('ART')}
                className={`bg-[#4f25ab] border-2 border-[#792FFF] py-2 px-[1.4rem] rounded-md ${formState.selectedTone === 'ART' ? 'bg-[#792FFF]' : ''} text-[#FFFFFF99] text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0`}>
                ART
              </button>
              <button 
                onClick={() => handleToneSelection('Digital')}
                className={`bg-[#4f25ab] border-2 border-[#792FFF] py-2 px-[1.4rem] rounded-md ${formState.selectedTone === 'Digital' ? 'bg-[#792FFF]' : ''} text-[#FFFFFF99] text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0`}>
                Digital
              </button>
              <button 
                onClick={() => handleToneSelection('Illustration')}
                className={`bg-[#4f25ab] border-2 border-[#792FFF] py-2 px-[1.4rem] rounded-md ${formState.selectedTone === 'Illustration' ? 'bg-[#792FFF]' : ''} text-[#FFFFFF99] text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0`}>
                Illustration
              </button>
              <button 
                onClick={() => handleToneSelection('3S Style')}
                className={`bg-[#4f25ab] border-2 border-[#792FFF] py-2 px-[1.4rem] rounded-md ${formState.selectedTone === '3S Style' ? 'bg-[#792FFF]' : ''} text-[#FFFFFF99] text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0`}>
                3S Style
              </button>
            </div>
            {formState.errors.tone && <p className="text-red-500">{formState.errors.tone}</p>}
          </div>
  
          <div className='flex justify-center items-center mt-[1.8rem]'>
            <button
              onClick={handleGenerate}
              className='py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem]'
              style={{
                background: 'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
              }}>
              Regenerate
            </button>
            <button
              className='bg-[#792FFF80] py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem] ml-[0.8rem]'
              onClick={() => setOpenImage(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default CreateAIImage;
