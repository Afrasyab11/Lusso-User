import React, {useCallback, useEffect, useState} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {AiOutlineClose} from 'react-icons/ai';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import instructionIcon from '../../assets/images/product-inst-img.png';
import {useStateContext} from '../../context/ContextProvider';
import {useEditMode} from '../../context/EditModeContext';
import {getCroppedImg} from '../../utils/getCroppedImage';
import Button from '../ui/Button';

interface NameLogoTabProps {
  setCurrentStep: (step: number) => void;
  currentStep: number;
  getAllProducts?: any;
}

const NameLogoTab: React.FC<NameLogoTabProps> = ({
  setCurrentStep,
  currentStep,
  getAllProducts,
}) => {
  const context = useStateContext();
  const {isEditPage, toActiveProduct, setToActiveProduct} = useEditMode();

  const [productName, setProductName] = useState<any>("");
  const [productTagline, setProductTagline] = useState<any>("");
  const [productLogo, setProductLogo] = useState<any>();
  const [logoConversion, setLogoConversion] = useState<File | undefined>(
    undefined,
  );

  // --------------------- Error Handling --------------------
  const [productNameError, setProductNameError] = useState(false);
  const [productTaglineError, setProductTaglineError] = useState(false);
  const [productlogoError, setProductlogoError] = useState(false);

  const handleSaveContinue = () => {
    let hasError = false;
    if (productName === '') {
      setProductNameError(true);
      hasError = true;
    } else {
      setProductNameError(false);
    }
    if (!productLogo) {  
      setProductlogoError(true);
      hasError = true;
    } else {
      setProductlogoError(false);
    }
    if (productTagline === '') {
      setProductTaglineError(true);
      hasError = true;
    } else {
      setProductTaglineError(false);
    }

    if (!hasError) {
      context?.setProductName(productName);
      context?.setMediaLinks([
        ...context?.mediaLinks,
        {
          mediaType: 'exploreImage',
          mediaSrc: logoConversion,
        },
      ]);
    //   context?.setBannerImage(productLogo)
      context?.setProductTagline(productTagline);

      if (currentStep <= 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  // ----------------------------- ----------------------------------------------------------------
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropper, setCropper] = useState<any>(null);

  // const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
  //     setCroppedAreaPixels(croppedAreaPixels);
  // }, []);

  const handleCrop = useCallback(async () => {
    try {
      if (!imageSrc) {
        console.error('Image source is missing');
        return;
      }
      if (!cropper) {
        console.error('Cropper instance is missing');
        return;
      }
      const file = await getCroppedImg(imageSrc, cropper);
      setProductLogo(URL.createObjectURL(file));
      setLogoConversion(file);
      setImageSrc(null);
    } catch (e) {
      console.error('Error Uploading Image', e);
    }
  }, [imageSrc, cropper]);

  const handleRemoveImage = () => {
    setProductLogo('');
    setLogoConversion(undefined);
    setImageSrc(null);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        console.error('Invalid file type');
        return;
      }

      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsDataURL(file); // Converts the file to Data URL
    });
  };

  const handleCancelCrop = () => {
    setImageSrc(null); 
  };

  useEffect(() => {
    if (getAllProducts) {
      setProductName(getAllProducts?.name || '');
      setProductTagline(getAllProducts?.tagLine || '');
      setProductLogo(getAllProducts?.exploreImage || '');
    }
  }, [getAllProducts]);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]">
                Product Name & Logo
              </p>
            </div>
            {isEditPage && (
              <div className="">
                <Button
                  label={'Edit'}
                  className={'bg-[#5721B9]'}
                  onClick={() => setToActiveProduct(false)}
                  // style={button.style}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <p className="text-white">Product Name</p>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input
                className={`outline-none bg-[#04040433] px-5 py-3 border-2 ${
                  productNameError ? 'border-red-500' : 'border-[#5721B9]'
                } ${toActiveProduct
                  && 'bg-gray-600 cursor-not-allowed text-gray-300 border-gray-400'} rounded-full text-[white]`}
                type="text"
                placeholder="Enter here..."
                required
                value={productName}
                onChange={e => {
                  setProductName(e.target.value);
                }}
                disabled={toActiveProduct}
                maxLength={100}
              />
            </div>
            {productNameError && (
              <p className="text-[#FF0000] md-lt:text-[10px] lg:text-[12px]">
                Product name is required
              </p>
            )}
            <p className="text-[#DED7D7] md-lt:text-[10px] lg:text-[12px] mt-2">
              This is how your product name will look like in the marketplace
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center">
              <p className="text-white ">Product Tagline</p>
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="w-full">
              <input
                className={`w-full outline-none bg-[#04040433] px-5 py-3 border-2  ${
                  productTaglineError ? 'border-red-500' : 'border-[#5721B9]'
                } ${toActiveProduct
                  && 'bg-gray-600 cursor-not-allowed text-gray-300 border-gray-400'} rounded-full text-[white]`}
                type="text"
                placeholder="Enter here..."
                required
                value={productTagline}
                onChange={e => {
                  setProductTagline(e.target.value);
                }}
                disabled={toActiveProduct}
                maxLength={150}
              />
              {productTaglineError && (
                <p className="text-[#FF0000] md-lt:text-[10px] lg:text-[12px]">
                  product tagline is required
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <p className="font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]">
              Product Logo
            </p>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center relative justify-start">
                {productLogo && !toActiveProduct && (
                  <button
                    className="absolute -top-[8%] left-[18%] text-white bg-gradient-to-r from-[rgb(248,82,46)] to-[#8330FF] p-1 rounded-full"
                    onClick={handleRemoveImage}
                  >
                    <AiOutlineClose size={18} />
                  </button>
                )}
                <div className="bg-gradient-to-r from-[rgb(248,82,46)] to-[#8330FF] p-[2px]">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col cursor-pointer bg-[#232323]"
                  >
                    {productLogo ? (
                      <img
                        src={productLogo}
                        alt="Cropped"
                        onError={(e: any) => (e.target.src = productLogo)}
                        className={`w-[150px] h-[150px] object-cover ${toActiveProduct ? 'opacity-50' : ''}`} 
                      />
                    ) : (
                      <div>
                        <div className="flex justify-between items-center">
                          <IoIosArrowBack className="rotate-45 text-white text-[25px]" />
                          <IoIosArrowForward className="-rotate-45 text-white text-[25px]" />
                        </div>
                        <div className="flex flex-col items-center justify-center px-10 py-4">
                          <svg
                            width="30"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25.4282 29.0565H4.22626C2.55348 29.0565 1.19742 27.7004 1.19742 26.0276V4.82572C1.19742 3.15294 2.55348 1.79688 4.22626 1.79688H25.4282C27.101 1.79688 28.457 3.15294 28.457 4.82572V26.0276C28.457 27.7004 27.101 29.0565 25.4282 29.0565ZM25.4282 29.0565L8.76953 12.3978L1.19742 19.9699M17.8561 10.1262C17.8561 11.3808 18.8731 12.3978 20.1277 12.3978C21.3823 12.3978 22.3993 11.3808 22.3993 10.1262C22.3993 8.87161 21.3823 7.85457 20.1277 7.85457C18.8731 7.85457 17.8561 8.87161 17.8561 10.1262Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between items-center">
                          <IoIosArrowBack className="-rotate-45 text-white text-[25px]" />
                          <IoIosArrowForward className="rotate-45 text-white text-[25px]" />
                        </div>
                      </div>
                    )}
                    <input
                      disabled={toActiveProduct}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={onFileChange}
                      required
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              {productlogoError && (
                <p className="text-[#FF0000] md-lt:text-[10px] lg:text-[12px]">
                  product logo is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 text-white">
              <div className="flex items-center gap-3">
                <img src={instructionIcon} className="w-8" alt="" />
                <p>Upload Size: 150px * 150 px</p>
              </div>
              <div className="flex items-center gap-3">
                <img src={instructionIcon} className="w-8" alt="" />
                <p>Adjust your Logo for the Best Fit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4">
            <div className="relative w-[300px] h-[300px]">
              <Cropper
                style={{height: 290, width: '100%'}}
                src={imageSrc}
                aspectRatio={1}
                viewMode={1}
                guides={true}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={instance => setCropper(instance)}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCrop}
                className="py-2 px-6 bg-blue-500 text-white rounded-full"
              >
                OK
              </button>
              <button
                onClick={handleCancelCrop}
                className="py-2 px-6 bg-gray-500 text-white rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-[1px] border-white border-opacity-20 w-full rounded-full" />
      <div className="flex items-center gap-10 justify-start">
        <button
          onClick={handleSaveContinue}
          style={{
            background: 'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)',
          }}
          className={`py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full ${toActiveProduct && "cursor-not-allowed"}`}
          disabled={toActiveProduct}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default NameLogoTab;
