import { allCountries } from 'country-region-data';
import { useEffect, useRef, useState } from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { LuCheckCircle } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import leftBg from '../../assets/images/left-bg-products.png';
import leftBgCourse from '../../assets/images/products/courseimg.png';
import leftBgGame from '../../assets/images/products/gameimg.png';
import leftBgMovies from '../../assets/images/products/movieimg.png';
import leftBgService from '../../assets/images/products/serviceimg.png';
import AddAIProduct from '../../components/productTabs/AddAIProduct';
import AddAppTab from '../../components/productTabs/AddAppTab';
import AddCourse from '../../components/productTabs/AddCourse';
import AddGameTab from '../../components/productTabs/AddGameTab';
import AddMovieTab from '../../components/productTabs/AddMovieTab';
import AddService from '../../components/productTabs/AddService';
import NameLogoTab from '../../components/productTabs/NameLogoTab';
import PlatformGuideLines from '../../components/productTabs/PlatformGuideLines';
import ProductCatSelectTab from '../../components/productTabs/ProductCatSelectTab';
import Success from '../../components/productTabs/Success';
import { useEditMode } from '../../context/EditModeContext';
import { fetchSingleProduct } from '../../utils/utils';
import './dev.scss';
const AddProductsPage = () => {
  const pId = useSelector((state: any) => state.product?.productId);
  const [countries, setCountries] = useState<string[]>([]);
  const [getAllProducts, setGetAllProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isEditPage, toActiveProduct, setToActiveProduct, locId } =
    useEditMode();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [productId, setProductId] = useState(null);

  const fetchData = async () => {
    if (isEditPage) {
      const data = await fetchSingleProduct(locId);
      setGetAllProducts(data);
    }
  };
  useEffect(() => {
    fetchData();
    const countries = [
      { '0': 'All Countries', '1': 'ALL', '2': [] },
      ...allCountries,
    ];
    setCountries(countries.map(country => country[0]));
  }, [1]);
  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      setCurrentStep(index);
    }
  };
  const steps = [
    { label: 'Name & Logo' },
    { label: 'Category' },
    { label: 'Product Info' },
    // { label: 'Promotion' },
    { label: 'Platform T&C' },
  ];
  // Progress Bar FillWidth
  const fillWidth = ((currentStep + 1) / steps?.length) * 100;
  // handle Page on the Base of Category
  const [selectedCategory, setSelectedCategory] = useState('App');

  return (
    <div className=" product-background-banner grid md:grid-cols-1 md-lt:grid-cols-1 lg:grid-cols-[30%_70%] max-w-full min-h-[calc(100vh-150px)]">
      <div className="flex flex-col bg-[#171540]">
        <div>
          <img
            src={
              selectedCategory === 'Game'
                ? leftBgGame
                : selectedCategory === 'Movie'
                  ? leftBgMovies
                  : selectedCategory === 'Course'
                    ? leftBgCourse
                    : selectedCategory === 'Service'
                      ? leftBgService
                      : selectedCategory === 'AI Products'
                        ? leftBgService
                        : leftBg
            }
            alt=""
          />
          <div className="px-8">
            <p
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
              className="text-[#00FFFF] text-[38px] font-medium tracking-[0.2em]"
            >
              ADD
            </p>
            <p
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
              className="text-white text-[38px] font-bold tracking-[0.2em]"
            >
              PRODUCT
            </p>
          </div>
        </div>
        {currentStep === 4 ? (
          ''
        ) : (
          <div className="px-8 text-white">
            <div className="bg-[#0E0B24] bg-opacity-70 p-3 rounded-xl flex flex-col gap-4">
              <p className="font-semibold text-[16px]">Product On Boarding</p>
              <p className="font-light text-[12px]">
                please complete the below steps
              </p>
              {/* Progress Bar */}
              <div className="flex items-center gap-1 pt-4">
                <p className="text-white">{currentStep + 1}/4</p>
                <div className="relative h-2 bg-white bg-opacity-10 w-full rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#00F0FB] rounded-full"
                    style={{ width: `${fillWidth}%` }}
                  />
                </div>
              </div>
              <div className="border-[1px] border-white border-opacity-10 w-full" />
              <div className="flex flex-col gap-4 pt-4">
                {steps?.map((step, index) => {
                  const isCompleted = index < currentStep;
                  const isActive = index === currentStep;
                  return (
                    <div
                      key={index}
                      className={`p-2 w-full border-[1px] border-white border-opacity-25 rounded-xl cursor-pointer bg-[#0E0B24]`}
                      onClick={() => handleStepClick(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <LuCheckCircle
                            className={`text-[20px] ${isCompleted
                              ? 'text-[#00F0FB]'
                              : isActive
                                ? 'text-[#00F0FB]'
                                : 'text-white text-opacity-25'
                              }`}
                          />
                          <p className={`text-[12px] font-light text-white`}>
                            {step.label}
                          </p>
                        </div>
                        <IoArrowForwardCircleOutline
                          className={`text-[25px] ${isActive
                            ? 'text-[#00F0FB]'
                            : 'text-white text-opacity-25'
                            }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="right ">
        {currentStep === 0 ? (
          <NameLogoTab
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            getAllProducts={getAllProducts}
          />
        ) : currentStep === 1 ? (
          <ProductCatSelectTab
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            getAllProducts={getAllProducts}
          />
        ) : currentStep === 2 ? (
          <>
            {selectedCategory === 'App' ? (
              <AddAppTab
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                countries={countries}
                getAllProducts={getAllProducts}
              />
            ) : selectedCategory === 'Game' ? (
              <AddGameTab
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                countries={countries}
                getAllProducts={getAllProducts}
              />
            ) : selectedCategory === 'Movie' ? (
              <AddMovieTab
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                countries={countries}
                getAllProducts={getAllProducts}
              />
            ) : selectedCategory === 'Course' ? (
              <AddCourse
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                countries={countries}
                getAllProducts={getAllProducts}
              />
            ) : selectedCategory === 'Service' ? (
              <AddService
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                countries={countries}
                getAllProducts={getAllProducts}
              />
            ) : selectedCategory === 'AI Products' ? (
              <AddAIProduct
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                countries={countries}
                getAllProducts={getAllProducts}
              />
            ) : (
              ''
            )}
          </>
        ) : // currentStep === 3 ? (
          //   <ProductPromotionTab
          //     setCurrentStep={setCurrentStep}
          //     currentStep={currentStep}
          //   />
          // ) :
          currentStep === 3 ? (
            <PlatformGuideLines
              setProductId={setProductId}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              getAllProducts={getAllProducts}
            />
          ) : currentStep === 4 ? (
            <Success
              title={isEditPage ? 'Product Updated' : 'Product Under Review'}
              description={
                isEditPage
                  ? 'Your product has been successfully Updated'
                  : 'Your product is under review state'
              }
              buttons={[
                {
                  label: isEditPage ? 'Continue to Dashboard' : 'Continue',
                  onClick: () =>
                    isEditPage
                      ? navigate('/dev/dashboard')
                      : navigate('/dev/dashboard'),
                  style: {
                    background:
                      'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)',
                  },
                },
                {
                  label: 'Preview',
                  onClick: () =>
                    isEditPage
                      ? navigate(
                        `/dev/preview/${selectedCategory
                          ?.toLowerCase()
                          ?.replaceAll(' ', '_')}/${locId}`,
                      )
                      : navigate(
                        `/dev/preview/${selectedCategory
                          ?.toLowerCase()
                          ?.replaceAll(' ', '_')}/${productId}`,
                      ),
                  className:
                    'border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]',
                },
                {
                  label: 'Edit',
                  isShow: !isEditPage,
                  onClick: () => navigate(`/dev/editproduct/${isEditPage ? locId : productId}`),
                  // onClick: () =>  navigate(`/dev/editproduct/${pId}`),
                  className:
                    'border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]',
                },
              ]}
            />
          ) : (
            ''
          )}
      </div>
    </div>
  );
};

export default AddProductsPage;
