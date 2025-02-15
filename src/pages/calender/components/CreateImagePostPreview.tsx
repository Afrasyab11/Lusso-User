import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { PostUseData } from '../../../redux/createAI/generatePostSlice';
import { useAiPost } from '../../../context/CreateAIContext';
import GeneratedImage from '../../../assets/images/calender/AiGeneratedImage.jpg';
import regenerate from '../../../assets/icons/regenerate.svg';
import sparkle from '../../../assets/images/calender/Sparkle2.png';
import CreateAIPost from './CreateAIPost';
import CreateAIImage from './CreateAIImage';

const CreateImagePostPreview = () => {
  const { ImagePostPreview, setImagePostPreview,setOpenImage,  openImage, setCreateOpenPost, createOpenPost } = useAiPost();
  const dispatch = useDispatch();
   const imgData = useSelector((state: any) => state?.aiPost.createAIImage)
   const postData = useSelector((state: any) => state?.aiPost.regeneAIPost)
  const getData = useSelector(
    (state: any) => ({
      post: state.aiPost.aiPost.post,
      image_url: state.aiPost.aiPost.image_url,
    }),
    shallowEqual
  );

  const handleUsePost = useCallback(() => {
    const imageUrl = imgData?.image_url || getData?.image_url;
    const aiPostdata = postData?.post || getData?.post;
  
    if (!imageUrl || !getData?.post) {
      console.error("Missing post or image_url to use");
      return;
    }
  
    const updateData = {
      post: aiPostdata,
      image_url: imageUrl,
    };
  
    dispatch(PostUseData(updateData));
  
    closePostImgPreview();
  }, [dispatch, imgData, postData,  getData]);
  
  

  const closePostImgPreview = useCallback(() => {
    setImagePostPreview(false);
  }, [setImagePostPreview]);

  
  return (
    <div>
      {createOpenPost && <CreateAIPost />}
      {openImage && <CreateAIImage />}
      {ImagePostPreview && (
        <div className="fixed inset-0 bg-[#00000085] flex items-center justify-center z-[999]">
          <div className="w-[90%] max-w-5xl bg-[#241a57] rounded-lg p-8">
            <header className="flex items-center gap-4 mb-8">
              <img src={sparkle} alt="sparkle" className="w-8 h-8" />
              <h2 className="text-white font-bold text-2xl">Generated with AI</h2>
            </header>
            <div className="grid grid-cols-2 gap-8">
              <div className="relative h-[400px]">
                <textarea
                  rows={8}
                  className="absolute inset-0 w-full h-full resize-none bg-[#48269A57] 
                          border-2 border-[#6C8CFF80] rounded-xl p-4 text-[#FFFFFF99]"
                  value={getData?.post}
                  readOnly
                  maxLength={150}
                />
                <button
                  className="absolute bottom-4 right-4 text-[#FFFFFF99] flex items-center gap-2 z-[999]"
                  // onClick={openPostAIModal}
                  onClick={(e) => {
                    setCreateOpenPost(true)
                    setImagePostPreview(false)
                  }}
                >
                  <span>Regenerate text</span>
                  <img src={regenerate} className="w-5 h-5" alt="regenerate" />
                </button>
              </div>
              <div className="relative h-[400px]">
              <img
                src={imgData?.image_url || getData?.image_url || GeneratedImage}
                alt={imgData?.image_url || getData?.image_url ? "Generated content" : "Placeholder content"}
                className="w-full h-full object-cover rounded-xl"
              />

                <button className="absolute bottom-4 right-4 text-[#FFFFFF99] flex items-center gap-2"   onClick={(e) => {
                    setOpenImage(true)
                    setImagePostPreview(false)
                  }}>
                  <span>Regenerate image</span>
                  <img src={regenerate} className="w-5 h-5" alt="regenerate" />
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleUsePost}
                className="w-40 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-[#8423F4] to-[#FF99EF]"
              >
                Use Post
              </button>
              <button onClick={handleUsePost} className="w-40 py-2 rounded-md text-white font-semibold border border-[#d47add]">
                Save
              </button>
              <button
                onClick={closePostImgPreview}
                className="w-40 py-2 rounded-md text-white font-semibold bg-[#792FFF80]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateImagePostPreview;
