import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import sparkle from '../../../assets/images/calender/Sparkle2.png';
import { apiEndpoints } from '../../../constants/api-endpoints';
import { useAiPost } from '../../../context/CreateAIContext';
import makeApiCall from '../../../lib/apiCall';
import { createAIPostData, createAIPrevPostData } from '../../../redux/createAI/generatePostSlice';
import { checkNullOrEmpty } from '../../../utils/utils';
import AILoader from './AILoader';
import GenerateAIErrorComp from './GenerateAIErrorComp';
import CreateImagePostPreview from './CreateImagePostPreview';
import { getProductListData } from '../../../redux/product/productSlice';
import Dropdown from '../../../components/ui/ProductDropdown';

const PostAndImageGenerated = () => {
  const { openAiLoaderModal, ImagePostPreview, AIPostImgPreview, setGenerateAIPostImage, generateAIPostImage, ErrorModalDisplayFtn } =
    useAiPost();
  const dispatch = useDispatch();
  const getProductList = useSelector((state: any) => state?.product?.productsList)
  const [formState, setFormState] = useState({
    postDescription: '',
    selectedTone: '',
    selectedImageStyle: '',
    selectedProduct: '',
    prefTone: "",
    products: [],
    includeHashtags: false,
    selectStyle: "",
    errors: {
      postDescription: '',
      tone: '',
      imageStyle: '',
      product: '',
      prefTone: "",
      selectStyle: ""
    },
  });


  const handleTextAreaChange = (e: any) => {
    const value = e.target.value;
    setFormState((prev: any) => ({
      ...prev,
      postDescription: value,
      errors: {
        ...prev.errors,
        postDescription: '',
      },
    }));
  };

  const handleInputChange = (e: any) => {
    const {name , value} = e.target
    setFormState((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToneSelection = (tone: any) => {
    setFormState((prev: any) => ({
      ...prev,
      selectedTone: tone,
      errors: {
        ...prev.errors,
        tone: '',
      },
    }));
  };

  const handleImageStyleSelection = (style: any) => {
    setFormState((prev: any) => ({
      ...prev,
      selectedImageStyle: style,
      errors: {
        ...prev.errors,
        imageStyle: '',
      },
    }));
  };

  const handleHashtagChange = (e: any) => {
    setFormState(prev => ({
      ...prev,
      includeHashtags: e.target.checked,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      postDescription: '',
      tone: '',
      imageStyle: '',
      product: '',
      prefTone: '',
      selectStyle: ""
    };

    if (!formState.postDescription.trim()) {
      newErrors.postDescription = 'Please describe your post idea';
      isValid = false;
    } else if (formState.postDescription.trim()?.length < 10) {
      newErrors.postDescription = 'Description should be at least 10 characters';
      isValid = false;
    }

    const predefinedTones = ['Professional', 'Friendly', 'Promotional'];
    if (!predefinedTones.includes(formState.selectedTone)) {
      if (!formState.prefTone?.trim()) {
        newErrors.prefTone = 'Please define a custom tone';
        isValid = false;
      }
    }
    const predefinedImages = ['Photo', 'Anime', 'Minimalist', 'Artistic']
    if(!predefinedImages.includes(formState?.selectedImageStyle)){
     if(!formState?.selectStyle?.trim()){
      newErrors.selectStyle = "Please select an image style"
      isValid = false
     }
    } 
    // if (!formState.selectedImageStyle) {
    //   newErrors.imageStyle = '';
    //   isValid = false;
    // }

    if (!formState.selectedProduct) {
      newErrors.product = 'Please select a product';
      isValid = false;
    }

    setFormState((prev) => ({
      ...prev,
      errors: newErrors,
    }));

    return isValid;
  };

  const resetingAllStateData = () => {
    setFormState({
      postDescription: '',
      selectedTone: '',
      selectedImageStyle: '',
      includeHashtags: false,
      selectedProduct: "",
      prefTone: "",
      products: [],
      selectStyle: "",
      errors: {
        postDescription: '',
        tone: '',
        imageStyle: '',
        product: '',
        prefTone: "",
        selectStyle: "",
      },
    })
  }

  const getAllProducts = async () => {
    try {
      let newContent = { ...apiEndpoints.getProductsList };
      const getProducts = await makeApiCall(newContent);
      const fetchedProducts = getProducts?.products || [];
      dispatch(getProductListData(getProducts?.products))
      setFormState((prevState) => ({
        ...prevState,
        products: fetchedProducts,
      }));
      console.log("getProducts list", { getProducts })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])
  const handleProductSelection = (selectedOption: any) => {
    setFormState((prev) => ({
      ...prev,
      selectedProduct: selectedOption?.value || '',
      errors: {
        ...prev.errors,
        product: '',
      },
    }));
  };

  const handleGenerate = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const { includeHashtags, selectedImageStyle, selectedTone, postDescription, selectedProduct, prefTone, selectStyle
      } = formState;

      let newContent = { ...apiEndpoints.generatePost };
      newContent.params.query.purpose = postDescription;
      newContent.params.query.prefTone = selectedTone || prefTone;
      newContent.params.query.hashtags = includeHashtags;
      newContent.params.query.imageUrl = selectedProduct;
      newContent.params.query.style = selectedImageStyle || selectStyle;

      openAiLoaderModal();

      const generatingPost = await makeApiCall(newContent);
      if (!generatingPost) {
        ErrorModalDisplayFtn();
        resetingAllStateData();
        return;
      }
      dispatch(createAIPostData(generatingPost));
      dispatch(createAIPrevPostData(newContent));
      AIPostImgPreview();

      resetingAllStateData();
    } catch (error) {
      console.error('An error occurred during post generation:', error);
      resetingAllStateData();
      ErrorModalDisplayFtn();
    }
  };

  const handleClose = () => {
    setGenerateAIPostImage(false)
    resetingAllStateData()
  }

  const productOptions = (formState.products?.length > 0
    ? formState.products
    : getProductList
  )?.map((item: any) => ({
    value: item?.exploreImage,
    label: item?.name,
  }));


  return (
    <>
      <AILoader />
      {ImagePostPreview && <CreateImagePostPreview />}
      <GenerateAIErrorComp handleGenerate={handleGenerate} />
      {generateAIPostImage && (
        <div className="z-[999] absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000085] flex justify-center items-center">
          <div className="  bg-[#241a57] rounded-[15px] p-[2rem] flex flex-col justify-center ">
            <div className="flex gap-4 items-center">
              <div>
                <img src={sparkle} alt="" className="" />
              </div>
              <div>
                <p className="text-white font-[700] text-[1.6rem]">
                  Generate Your Post with AI{' '}
                </p>
                <p className="text-[#FFFFFF99] font-[400] text-[0.8rem]">
                  Tell us about your post idea and its goal, and we’ll create
                  something amazing for you!
                </p>
              </div>
            </div>
            <div className="mt-[1.2rem]">
              <Dropdown
                label=""
                name="product"
                options={productOptions}
                placeholder="Select a Product"
                value={productOptions?.find((option: any) => option?.value === formState?.selectedProduct)}
                onChange={handleProductSelection}
                borderColor="var(--outline, #6C8CFF80)"
                borderRadius={5}
              />
              {formState.errors.product && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.product}</p>
              )}
            </div>

            <div className="mt-[1.2rem]">
              <textarea
                name=""
                value={formState.postDescription}
                onChange={handleTextAreaChange}
                rows={6}
                className={`resize-none w-full bg-[#48269A57] p-[1rem] text-white pb-[3rem] rounded-[12px] ${formState.errors.postDescription
                  ? 'border-2 border-red-500'
                  : ''
                  }`}
              ></textarea>
              {formState.errors.postDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.postDescription}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <div className="w-[48%]">
                  <p className="text-white font-[700] text-[1rem] mt-[0.9rem] mb-[1.1rem]">
                    Select a tone for text
                  </p>
                  <div className="flex justify-between flex-col ">
                    <div className="flex gap-2.5">
                      <div className=" p-[2px] rounded-md">
                        <button
                          onClick={() => handleToneSelection('Professional')}
                          className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedTone === 'Professional'
                            ? 'border-[#792fff]'
                            : 'border-[#5f2eca]'
                            } py-4 px-[1rem] rounded-md ${formState.selectedTone === 'Professional'
                              ? 'text-white'
                              : 'text-[#FFFFFF99]'
                            } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                        >
                          Professional
                        </button>
                      </div>
                      <div className=" p-[2px] rounded-md mx-[0.6rem]">
                        <button
                          onClick={() => handleToneSelection('Friendly')}
                          className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedTone === 'Friendly'
                            ? 'border-[#792fff]'
                            : 'border-[#5f2eca]'
                            } py-4 px-[1rem] rounded-md ${formState.selectedTone === 'Friendly'
                              ? 'text-white'
                              : 'text-[#FFFFFF99]'
                            } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                        >
                          Friendly
                        </button>
                      </div>
                      <div className=" p-[2px] rounded-md">
                        <button
                          onClick={() => handleToneSelection('Promotional')}
                          className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedTone === 'Promotional'
                            ? 'border-[#792fff]'
                            : 'border-[#5f2eca]'
                            } py-4 px-[1rem] rounded-md ${formState.selectedTone === 'Promotional'
                              ? 'text-white'
                              : 'text-[#FFFFFF99]'
                            } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                        >
                          Promotional
                        </button>
                      </div>
                    </div>
                    {formState.errors.tone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formState.errors.tone}
                      </p>
                    )}


                  </div>
                </div>
                <div className="w-[48%]">
                  <p className="text-white font-[700] text-[1rem] mt-[0.9rem] mb-[1.1rem]">
                    Select a style for image
                  </p>
                  <div className="flex gap-2.5">
                    <div className="">
                      <button
                        onClick={() => handleImageStyleSelection('Photo')}
                        className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedImageStyle === 'Photo'
                          ? 'border-[#792fff]'
                          : 'border-[#5f2eca]'
                          } py-4 px-[1rem] rounded-md ${formState.selectedImageStyle === 'Photo'
                            ? 'text-white'
                            : 'text-[#FFFFFF99]'
                          } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                      >
                        Photo
                      </button>
                    </div>
                    <div className=" p-[2px] rounded-md mx-[0.6rem]">
                      <button
                        onClick={() => handleImageStyleSelection('Anime')}
                        className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedImageStyle === 'Anime'
                          ? 'border-[#792fff]'
                          : 'border-[#5f2eca]'
                          } py-4 px-[1rem] rounded-md ${formState.selectedImageStyle === 'Anime'
                            ? 'text-white'
                            : 'text-[#FFFFFF99]'
                          } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                      >
                        Anime
                      </button>
                    </div>
                    <div className=" p-[2px] rounded-md">
                      <button
                        onClick={() =>
                          handleImageStyleSelection('Minimalist')
                        }
                        className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedImageStyle === 'Minimalist'
                          ? 'border-[#792fff]'
                          : 'border-[#5f2eca]'
                          } py-4 px-[1rem] rounded-md ${formState.selectedImageStyle === 'Minimalist'
                            ? 'text-white'
                            : 'text-[#FFFFFF99]'
                          } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                      >
                        Minimalist
                      </button>
                    </div>
                    <div className=" p-[2px] rounded-md ml-[0.6rem]">
                      <button
                        onClick={() => handleImageStyleSelection('Artistic')}
                        className={`bg-[#4f25ab] border-2 border-[#792FFF] ${formState.selectedImageStyle === 'Artistic'
                          ? 'border-[#792fff]'
                          : 'border-[#5f2eca]'
                          } py-2 px-[1rem] rounded-md ${formState.selectedImageStyle === 'Artistic'
                            ? 'text-white'
                            : 'text-[#FFFFFF99]'
                          } text-center font-semibold text-xs xl:text-[1.1rem] md:mb-0`}
                      >
                       Art
                      </button>
                    </div>
                  </div>
                  {formState.errors.imageStyle && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.imageStyle}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <input
                    type="text"
                    className="w-full p-4 font-normal rounded-xl text-[#FFFFFF]"
                    style={{
                      background:
                        'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                      border: '1px solid rgba(108, 140, 255, 0.5)',
                      boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
                    }}
                    value={formState?.prefTone}
                    onChange={handleInputChange}
                    name="prefTone"
                    placeholder="Define Tone"
                  />
                  {formState.errors.prefTone && (
                    <p className="text-red-500 text-sm mt-1">{formState.errors.prefTone}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    className="w-full p-4 font-normal rounded-xl text-[#FFFFFF]"
                    style={{
                      background:
                        'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                      border: '1px solid rgba(108, 140, 255, 0.5)',
                      boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
                    }}
                    name="selectStyle"
                    value={formState?.selectStyle}
                    placeholder="Describe style"
                    onChange={handleInputChange}
                  />
                  {formState.errors.selectStyle && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.selectStyle}</p>
                )}
                </div>
              </div>

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
                    checked={formState?.includeHashtags}
                    onChange={(e) => handleHashtagChange(e)}
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
                  onClick={handleGenerate}
                  className="py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem]"
                  style={{
                    background:
                      'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                  }}
                >
                  Generate
                </button>
                <button
                  className="bg-[#792FFF80]  py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0 w-[10rem] ml-[0.8rem]"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostAndImageGenerated;
