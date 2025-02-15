import { useState } from 'react';
import sparkle from '../../../assets/images/calender/Sparkle2.png';
import { FaCheck } from 'react-icons/fa6';
import { apiEndpoints } from '../../../constants/api-endpoints';
import { useAiPost } from '../../../context/CreateAIContext';
import makeApiCall from '../../../lib/apiCall';
import { regeneratingPostWithAI } from '../../../redux/createAI/generatePostSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreateAIPost = () => {
  const { setCreateOpenPost, createOpenPost,  ErrorModalDisplayFtn, AIPostImgPreview } = useAiPost();
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch()
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState({
    postDescription: '',
    selectedTone: '',
    includeHashtags: false,
    errors: {
      postDescription: '',
      tone: '',
    },
  });
  const getData = useSelector(
    (state: any) => ({
      post: state.aiPost.aiPost.post,
      image_url: state.aiPost.aiPost.image_url,
    }),
  );
  const closePostGenerating = () => {
    setCreateOpenPost(false);
  };

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

  const handleHashtagChange = (e: any) => {
    setFormState((prev) => ({
      ...prev,
      includeHashtags: e.target.checked,
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
    } else if (formState.postDescription.trim()?.length < 10) {
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

      const { includeHashtags, selectedTone, postDescription } = formState;

      let newContent = { ...apiEndpoints.regeneratePost };
      newContent.params.query.post = getData?.post;
      newContent.params.query.suggestions = postDescription;
      newContent.params.query.count = count;
      // newContent.params.query.hashtags = includeHashtags;

      setCount(prevCount => prevCount + 1);
      setisLoading(true)
      const regeneratedPost= await makeApiCall(newContent);
      console.log('re Generated post ai Data:', regeneratedPost);

      if (!regeneratedPost) {
        ErrorModalDisplayFtn();
        return;
      }
      setisLoading(false)
      dispatch(regeneratingPostWithAI(regeneratedPost));
      setCreateOpenPost(false)
      await AIPostImgPreview();
      setFormState({
        postDescription: '',
        selectedTone: '',
        includeHashtags: false,
        errors: {
          postDescription: '',
          tone: '',
        },
      });
    } catch (error) {
      console.error('An error occurred during post generation:', error);
      ErrorModalDisplayFtn();
    } finally {
      setisLoading(false)
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
      {createOpenPost && (
        <div className="z-[999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center">
          <div className="xl:w-[52%] lg:w-[52%] md:w-[70%] bg-[#241a57] rounded-[15px] p-[2rem] flex flex-col justify-center ">
            <div className="flex gap-4 items-center">
              <div>
                <img src={sparkle} alt="" className="" />
              </div>
              <div>
                <p className="text-white font-[700] text-[1.6rem]">Generate Your Post with AI</p>
                <p className="text-[#FFFFFF99] font-[400] text-[0.8rem]">
                  Tell us about your post idea and its goal, and we’ll create something amazing for you!ere
                </p>
              </div>
            </div>

            {/* Post Description Textarea */}
            <div className="mt-[1.2rem]">
              <textarea
                value={formState.postDescription}
                onChange={handleTextAreaChange}
                rows={5}
                maxLength={150}
                className="resize-none w-full bg-[#3a118d] p-[1rem] text-white pb-[3rem] rounded-[12px]"
              />
              {formState.errors.postDescription && (
                <p className="text-red-500 text-sm">{formState.errors.postDescription}</p>
              )}
            </div>

            {/* Tone Selection */}
            <div>
              <p className="text-white font-[700] text-[1rem] mt-[0.9rem] mb-[1.1rem]">Select a tone</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleToneSelection('Professional')}
                  className={`py-2 px-[1.4rem] rounded-md ${formState.selectedTone === 'Professional' ? 'text-white border-2  border-[#2D246C] bg-[#4f25ab]' : 'bg-[#792FFF80]'
                    } text-[#FFFFFF99] font-semibold text-xs xl:text-lg`}
                >
                  Professional
                </button>
                <button
                  onClick={() => handleToneSelection('Friendly')}
                  className={`py-2 px-[1.4rem] rounded-md ${formState.selectedTone === 'Friendly' ? 'text-white border-2  border-[#2D246C] bg-[#4f25ab]' : 'bg-[#792FFF80]'
                    } text-[#FFFFFF99] font-semibold text-xs xl:text-lg`}
                >
                  Friendly
                </button>
                <button
                  onClick={() => handleToneSelection('Promotional')}
                  className={`py-2 px-[1.4rem] rounded-md ${formState.selectedTone === 'Promotional' ? 'text-white border-2  border-[#2D246C] bg-[#4f25ab]' : 'bg-[#792FFF80]'
                    } text-[#FFFFFF99] font-semibold text-xs xl:text-lg`}
                >
                  Promotional
                </button>
              </div>
              {formState.errors.tone && <p className="text-red-500 text-sm">{formState.errors.tone}</p>}
            </div>

            {/* Include Hashtags */}
            <div className="flex mt-[1rem] items-center">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-[1.8rem] h-[1.8rem] appearance-none rounded cursor-pointer"
                          style={{
                            background:
                              'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          checked={formState.includeHashtags}
                          onChange={handleHashtagChange}
                        />
                        <span
                          className="absolute w-4 h-4 rounded-sm pointer-events-none"
                          style={{
                            display: formState.includeHashtags ? 'block' : 'none',
                            // display: 'block',
                          }}
                        >
                          <FaCheck color="white" size="20" />
                        </span>
                      </div>
                      <p className="text-[#FFFFFF99] font-[400] text-[1rem] ml-[0.6rem]">
                        Include AI-suggested Hashtags
                      </p>
                    </div>

            <div className="flex justify-center items-center mt-[1.8rem]">
              <button
                className="py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem]"
                style={{
                  background: 'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                }}
                onClick={handleGenerate}
              >
                Regenerate
              </button>
              <button
                className="bg-[#792FFF80] py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem] ml-[0.8rem]"
                onClick={closePostGenerating}
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

export default CreateAIPost;
