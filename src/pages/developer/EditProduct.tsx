import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import SuccessIcon from '../../assets/images/added-success-hooray.svg';
import SelectChip from '../../components/select-chip/MultipleSelectChip';
import { getCookies } from '../../utils/utils';
import './dev.scss';



const EditProductsPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('Apps');
  const [priceTab, setPriceTab] = useState('free');
  const [productName, setProductName] = useState('');
  const [productSubtitle, setProductSubtitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory]: any = useState('');
  // const [tags, setTags]: any = useState([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [productImages, setProductImages] = useState([]);
  const [productDemo, setProductDemo] = useState('');
  const [pricing, setPricing] = useState('Free');
  const [appStoreLink, setAppStoreLink] = useState('');
  const [playStoreLink, setPlayStoreLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [errorInputField, setErrorInputField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages]: any = useState([]);
  const [imagesFD, setImagesFD]: any = useState([]);
  const [savedImagesLink, setSavedImagesLink]: any = useState([]);
  const [demoVideos, setDemoVideos] = useState([1, 2, 3, 4, 5]);
  const [categoryOptions, setCategoryOptions]: any = useState([
    {
      "label": "Books",
      "value": "Books"
    },
    {
      "label": "Camera",
      "value": "Camera"
    },
    {
      "label": "Education",
      "value": "Education"
    },
    {
      "label": "Entertainment",
      "value": "Entertainment"
    },
    {
      "label": "Food & Dining",
      "value": "Food & Dining"
    },
    {
      "label": "Hotels",
      "value": "Hotels"
    },
    {
      "label": "Health & Fitness",
      "value": "Health & Fitness"
    },
    {
      "label": "Kids",
      "value": "Kids"
    },
    {
      "label": "Lifestyle",
      "value": "Lifestyle"
    },
    {
      "label": "Media",
      "value": "Media"
    },
    {
      "label": "Music",
      "value": "Music"
    },
    {
      "label": "Navigation",
      "value": "Navigation"
    },
    {
      "label": "News",
      "value": "News"
    },
    {
      "label": "Photos",
      "value": "Photos"
    },
    {
      "label": "Videos",
      "value": "Videos"
    },
    {
      "label": "Weather",
      "value": "Weather"
    },
    {
      "label": "Security",
      "value": "Security"
    },
    {
      "label": "Shopping",
      "value": "Shopping"
    },
    {
      "label": "Social",
      "value": "Social"
    },
    {
      "label": "Sports",
      "value": "Sports"
    },
    {
      "label": "Travel",
      "value": "Travel"
    },
    {
      "label": "Others",
      "value": "Others"
    }
  ]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(true);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Apps') {
      setCategoryOptions(
        [
          {
            "label": "Books",
            "value": "Books"
          },
          {
            "label": "Camera",
            "value": "Camera"
          },
          {
            "label": "Education",
            "value": "Education"
          },
          {
            "label": "Entertainment",
            "value": "Entertainment"
          },
          {
            "label": "Food & Dining",
            "value": "Food & Dining"
          },
          {
            "label": "Hotels",
            "value": "Hotels"
          },
          {
            "label": "Health & Fitness",
            "value": "Health & Fitness"
          },
          {
            "label": "Kids",
            "value": "Kids"
          },
          {
            "label": "Lifestyle",
            "value": "Lifestyle"
          },
          {
            "label": "Media",
            "value": "Media"
          },
          {
            "label": "Music",
            "value": "Music"
          },
          {
            "label": "Navigation",
            "value": "Navigation"
          },
          {
            "label": "News",
            "value": "News"
          },
          {
            "label": "Photos",
            "value": "Photos"
          },
          {
            "label": "Videos",
            "value": "Videos"
          },
          {
            "label": "Weather",
            "value": "Weather"
          },
          {
            "label": "Security",
            "value": "Security"
          },
          {
            "label": "Shopping",
            "value": "Shopping"
          },
          {
            "label": "Social",
            "value": "Social"
          },
          {
            "label": "Sports",
            "value": "Sports"
          },
          {
            "label": "Travel",
            "value": "Travel"
          },
          {
            "label": "Others",
            "value": "Others"
          }
        ]

      )
    } else if (tab === 'Games') {
      setCategoryOptions(
        [
          {
            "label": "Action",
            "value": "Action"
          },
          {
            "label": "Adventures",
            "value": "Adventures"
          },
          {
            "label": "Kids",
            "value": "Kids"
          },
          {
            "label": "Educational",
            "value": "Educational"
          },
          {
            "label": "Classics",
            "value": "Classics"
          },
          {
            "label": "Card",
            "value": "Card"
          },
          {
            "label": "Board",
            "value": "Board"
          },
          {
            "label": "Puzzle",
            "value": "Puzzle"
          },
          {
            "label": "Racing",
            "value": "Racing"
          },
          {
            "label": "Shooting",
            "value": "Shooting"
          },
          {
            "label": "Sports",
            "value": "Sports"
          },
          {
            "label": "Casino",
            "value": "Casino"
          },
          {
            "label": "Multi player",
            "value": "Multi player"
          }
        ]

      )
    } else if (tab === 'Movies') {
      setCategoryOptions(
        [
          {
            "label": "Action",
            "value": "Action"
          },
          {
            "label": "Adventure",
            "value": "Adventure"
          },
          {
            "label": "Animation",
            "value": "Animation"
          },
          {
            "label": "Anime",
            "value": "Anime"
          },
          {
            "label": "Comedy",
            "value": "Comedy"
          },
          {
            "label": "Drama",
            "value": "Drama"
          },
          {
            "label": "Kids & Family",
            "value": "Kids & Family"
          },
          {
            "label": "Documentary",
            "value": "Documentary"
          },
          {
            "label": "Horror",
            "value": "Horror"
          },
          {
            "label": "Romance",
            "value": "Romance"
          },
          {
            "label": "Romantic Comedy",
            "value": "Romantic Comedy"
          },
          {
            "label": "Sci-Fi/Fantasy",
            "value": "Sci-Fi/Fantasy"
          },
          {
            "label": "Sports",
            "value": "Sports"
          },
          {
            "label": "Thriller",
            "value": "Thriller"
          },
          {
            "label": "Mystery",
            "value": "Mystery"
          },
          {
            "label": "Stand-Up",
            "value": "Stand-Up"
          },
          {
            "label": "Independent",
            "value": "Independent"
          },
          {
            "label": "Reality",
            "value": "Reality"
          },
          {
            "label": "Suspense",
            "value": "Suspense"
          },
          {
            "label": "Crime",
            "value": "Crime"
          },
          {
            "label": "Fantasy",
            "value": "Fantasy"
          },
          {
            "label": "International",
            "value": "International"
          },
          {
            "label": "LGBTQ",
            "value": "LGBTQ"
          }
        ]
      )
    } else if (tab === 'Content Courses') {
      setCategoryOptions(
        [
          {
            "label": "Development",
            "value": "Development"
          },
          {
            "label": "Business",
            "value": "Business"
          },
          {
            "label": "Finance & Accounting",
            "value": "Finance & Accounting"
          },
          {
            "label": "IT & Software",
            "value": "IT & Software"
          },
          {
            "label": "Office Productivity",
            "value": "Office Productivity"
          },
          {
            "label": "Personal Development",
            "value": "Personal Development"
          },
          {
            "label": "Design",
            "value": "Design"
          },
          {
            "label": "Marketing",
            "value": "Marketing"
          },
          {
            "label": "Lifestyle",
            "value": "Lifestyle"
          },
          {
            "label": "Photography & Video",
            "value": "Photography & Video"
          },
          {
            "label": "Health & Fitness",
            "value": "Health & Fitness"
          },
          {
            "label": "Music",
            "value": "Music"
          },
          {
            "label": "Teaching & Academics",
            "value": "Teaching & Academics"
          }
        ]

      )
    } else if (tab === 'Services') {
      setCategoryOptions(
        [
          {
            "label": "Strategy Consulting",
            "value": "Strategy Consulting"
          },
          {
            "label": "Management Consulting",
            "value": "Management Consulting"
          },
          {
            "label": "Legal Services",
            "value": "Legal Services"
          },
          {
            "label": "Health Care",
            "value": "Health Care"
          },
          {
            "label": "Financial Consulting",
            "value": "Financial Consulting"
          },
          {
            "label": "Accounting",
            "value": "Accounting"
          },
          {
            "label": "Operations Consulting",
            "value": "Operations Consulting"
          },
          {
            "label": "IT & Computer Support",
            "value": "IT & Computer Support"
          },
          {
            "label": "Project Management",
            "value": "Project Management"
          },
          {
            "label": "Tax Services",
            "value": "Tax Services"
          },
          {
            "label": "Insurance Services",
            "value": "Insurance Services"
          }
        ]

      )
    }
  };
  const handlePriceTabClick = (tab: string) => {
    setPriceTab(tab);
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   erase();
  //   const file = e.target.files?.[0];
  //   console.log('file###################', file);
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     console.log('url###################', url);
  //     setImages((prevImages:any) => [...prevImages, url]);
  //     e.target.value = ''; // Clear the input value to allow the same file to be uploaded again if needed
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)?.map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages: any[]) => [...prevImages, ...newImages]);
      const newImagesFD = Array.from(e.target.files);
      setImagesFD((prevImages: any[]) => [...prevImages, ...newImagesFD]);
    }
  };

  const handleRemoveImage = (index: number) => {

    setImages((prevImages: any[]) => prevImages?.filter((_, i) => i !== index));
    const savedImagesCount = savedImagesLink?.length
    if (index < savedImagesCount) {
      setSavedImagesLink((prevImages: any[]) => prevImages?.filter((_, i) => i !== index));
    } else {
      const indexToRemoved = index - savedImagesCount
      setImagesFD((prevImages: any[]) => prevImages?.filter((_, i) => i !== indexToRemoved));
    }

    console.log(images);
    console.log(imagesFD);
    console.log(savedImagesLink);

  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files: File[] = Array.from(e.target.files || []);
    // setProductImages(files);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 50,
      border: `1px solid #A768FD`,
      backgroundColor: 'none',
      color: '#FFFFFF99',
      minHeight: 48,
      padddingLeft: 8,
      marginTop: 10,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
      padddingLeft: 8,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
      padddingLeft: 8,
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'rgba(4, 4, 4)',
      borderRadius: 10,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused
        ? 'rgba(167, 104, 253, 0.8)'
        : 'rgba(4, 4, 4)',
      color: '#FFFFFF99',
    }),
  };

  const useStyles = (theme: any) => ({
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 50,
      border: `1px solid #A768FD`,
      backgroundColor: 'none',
      color: '#FFFFFF99',
      minHeight: 48,
      padddingLeft: 8,
      marginTop: 10,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
      padddingLeft: 8,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
      padddingLeft: 8,
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'rgba(4, 4, 4)',
      borderRadius: 10,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused
        ? 'rgba(167, 104, 253, 0.8)'
        : 'rgba(4, 4, 4)',
      color: '#FFFFFF99',
    }),
  });

  function getStyles(name: any, personName: any, theme: any) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const styles = useStyles(theme);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const { productId } = useParams();


  const handleSave = () => {
    // Add validations
    if (!validateFields()) return;
    setLoading(true);
    const formData = new FormData();

    let productData = {
      name: productName,
      description: productDescription,
      category: category,
      subTitle: productSubtitle,
      tags: tags,
      productType: activeTab,
      appStoreLink: appStoreLink,
      playStoreLink: playStoreLink,
      websiteLink: websiteLink,
      productId,
      imageUrls: savedImagesLink
    };
    console.log('$$$$$$$$$$$$$$$productData', productData);
    console.log('$$$$$$$$$$$$$$$images', images);

    formData.append('request', JSON.stringify(productData));
    for (let i = 0; i < imagesFD?.length; i++) {
      formData.append('file', imagesFD[i]);
    }
    // console.log(formData.get('request'));
    // console.log(formData.getAll('file'));

    let token = getCookies('authToken');
    axios
      .put('https://api.lusso.dev/api/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setLoading(false);
        console.log('response', response);
        setSuccess(true);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });

    // Add your save logic here
    // console.log('Product saved:', {
    //   productName,
    //   productDescription,
    //   category,
    //   tags,
    //   productImages,
    //   productDemo,
    //   pricing,
    //   appStoreLink,
    //   websiteLink
    // });
  };

  const erase = () => {
    setErrorInputField('');
    setErrorMessage('');
  };

  const triggerFileInputClick = () => {
    console.log('triggerFileInputClick called$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    console.log('Closed called$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  };

  const validateFields = () => {
    if (!productName?.trim()) {
      setErrorInputField('productName');
      setErrorMessage('Product name is required');
      return false;
    }
    // if (!productSubtitle.trim()) {
    //   setErrorInputField('productSubtitle');
    //   setErrorMessage('Product subtitle is required');
    //   return false;
    // }
    if (images?.length === 0) {
      setErrorInputField('productImages');
      setErrorMessage('At least one product image is required');
      return false;
    }
    if (!productDescription?.trim()) {
      setErrorInputField('productDescription');
      setErrorMessage('Product description is required');
      return false;
    }
    if (!category?.trim()) {
      setErrorInputField('category');
      setErrorMessage('Category is required');
      return false;
    }
    if (tags?.length === 0) {
      setErrorInputField('tags');
      setErrorMessage('At least one tag is required');
      return false;
    }
    // if (!appStoreLink.trim()) {
    //   setErrorInputField('appStoreLink');
    //   setErrorMessage('App Store link is required');
    //   return false;
    // }
    // if (!playStoreLink.trim()) {
    //   setErrorInputField('playStoreLink');
    //   setErrorMessage('Play Store link is required');
    //   return false;
    // }
    // if (!websiteLink.trim()) {
    //   setErrorInputField('websiteLink');
    //   setErrorMessage('Website link is required');
    //   return false;
    // }
    return true;
  };


  const getProductDetails = React.useCallback(() => {
    const token = getCookies('authToken');
    console.log('callled');

    axios
      .get(`https://api.lusso.dev/api/v1/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data === "") {
          navigate("/dev/dashboard")
        }


        const { data } = response
        console.log(data);

        handleTabClick(data.productType)
        setProductName(data.name)
        setSavedImagesLink(data.images)
        setImages(data.images)
        setProductSubtitle(data.subTitle)
        setProductDescription(data.description)
        setCategory(data.category)
        setTags(data.tags)
        setAppStoreLink(data.appStoreLink)
        setPlayStoreLink(data.playStoreLink)
        setWebsiteLink(data.websiteLink)

      })
      .catch(error => {
        console.log('error', error);
      })
      .finally(() => {
        setDetailsLoading(false)
      })
  }, [productId, navigate])

  React.useEffect(() => {
    getProductDetails()
  }, [getProductDetails])

  return (
    <div className="container product-background-banner">
      <div className="left"></div>
      {
        success ?
          <div className="right">
            <div className='flex flex-col justify-between items-center'>
              <div className='flex flex-col gap-y-2 items-center'>
                <div>
                  <img style={{ width: 200, height: 200 }} src={SuccessIcon} alt='' />
                </div>
                <div className='flex flex-col items-center'>
                  <div>
                    <span className='text-[#FFF]' style={{ fontWeight: 500, fontSize: '1.2rem' }}>Hooray!</span>
                  </div>
                  <div>
                    <span className='text-[#FFF]' style={{ fontWeight: 500, fontSize: '1rem' }}>Your product has been successfully updated </span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => { navigate('/dev/dashboard') }}
                  className="saveContinue mt-10"
                  style={{
                    borderRadius: 50,
                    border: '1px solid #A768FD',
                    background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                    textTransform: 'uppercase',
                    paddingLeft: 36,
                    paddingRight: 36,
                  }}
                >
                  Go To DashBoard
                </button>
              </div>
            </div>
          </div>
          :
          <div className="right">
            {detailsLoading ?
              <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div>
              :
              <>
                <div className="text-white font-bold text-[20px]">
                  <span>Edit Product Details</span>
                </div>
                <div>
                  <div className="horizontal-divider-light mt-4 mb-4"></div>
                </div>
                <div className="flex flex-row justify-start items-center gap-4 mb-8 flex-wrap">
                  <div>
                    <button
                      onClick={() => {
                        handleTabClick('Apps');
                      }}
                      className="productTypeButton "
                      style={{
                        borderRadius: 35,
                        border: '1px solid rgba(0, 240, 251, 0.40)',
                        background:
                          activeTab === 'Apps' ? 'rgba(0, 240, 251, 0.10)' : '',
                        textTransform: 'capitalize',
                      }}
                    >
                      Apps
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleTabClick('Games');
                      }}
                      className="productTypeButton "
                      style={{
                        borderRadius: 35,
                        border: '1px solid rgba(0, 240, 251, 0.40)',
                        background:
                          activeTab === 'Games' ? 'rgba(0, 240, 251, 0.10)' : '',
                        textTransform: 'capitalize',
                      }}
                    >
                      Games
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleTabClick('Movies');
                      }}
                      className="productTypeButton "
                      style={{
                        borderRadius: 35,
                        border: '1px solid rgba(0, 240, 251, 0.40)',
                        background:
                          activeTab === 'Movies' ? 'rgba(0, 240, 251, 0.10)' : '',
                        textTransform: 'capitalize',
                      }}
                    >
                      Movies
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleTabClick('Content Courses');
                      }}
                      className="productTypeButton "
                      style={{
                        borderRadius: 35,
                        border: '1px solid rgba(0, 240, 251, 0.40)',
                        background:
                          activeTab === 'Content Courses'
                            ? 'rgba(0, 240, 251, 0.10)'
                            : '',
                        textTransform: 'capitalize',
                      }}
                    >
                      Content Courses
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleTabClick('Services');
                      }}
                      className="productTypeButton"
                      style={{
                        borderRadius: 35,
                        border: '1px solid rgba(0, 240, 251, 0.40)',
                        background:
                          activeTab === 'Services' ? 'rgba(0, 240, 251, 0.10)' : '',
                        textTransform: 'capitalize',
                      }}
                    >
                      Services
                    </button>
                  </div>
                </div>
                <div className="flex flex-row gap-24 field-row-container">
                  <div className="flex flex-1 flex-col gap-y-6">
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Product Name <span style={{ color: 'red' }}>*</span>
                        </span>
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Enter product name"
                          className="ac-frm-input rounded-pill badge h-[50px]"
                          value={productName || ''}
                          style={{
                            borderRadius: 50,
                            border: `1px solid ${errorInputField === 'productName' ? '#F04438' : '#A768FD'
                              }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                            marginTop: 10,
                          }}
                          onChange={e => {
                            setProductName(e.target.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'productName' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Product Subtitle
                        </span>
                        <textarea
                          autoComplete="off"
                          placeholder="Enter your subtitle"
                          className="ac-frm-input rounded-pill badge h-[50px]"
                          value={productSubtitle || ''}
                          style={{
                            borderRadius: 16,
                            border: `1px solid ${errorInputField === 'productSubtitle'
                              ? '#F04438'
                              : '#A768FD'
                              }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                            marginTop: 10,
                            height: 100,
                            padding: 10, // Adding padding for better text area styling
                            resize: 'none', // Preventing the text area from being resized
                          }}
                          onChange={e => {
                            setProductSubtitle(e.target.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'productSubtitle' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Category<span style={{ color: 'red' }}>*</span>
                        </span>
                        {/* <select
                                      className="ac-frm-select-input rounded-pill badge h-[50px]"
                                      value={category || ""}
                                      style={{
                                          borderRadius: 50,
                                          border: `1px solid ${errorInputField === 'category' ? '#F04438' : '#A768FD'}`,
                                          background: 'rgba(4, 4, 4, 0.20)',
                                          marginTop: 10
                                      }}
                                      onChange={(e) => {setCategory(e.target.value); erase();}}
                                  >
                                      <option value="">Select category</option>
                                      <option value="USA">USA</option>
                                      <option value="Canada">Canada</option>
                                      <option value="UK">UK</option>
                                  </select> */}
                        <Select
                          // className="ac-frm-select-input rounded-pill badge h-[50px]"
                          placeholder="Select Category"
                          value={categoryOptions.find(
                            (option: { value: any; }) => option.value === category,
                          )}
                          styles={customStyles}
                          options={categoryOptions}
                          onChange={selectedOption => {
                            setCategory(selectedOption?.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'category' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-6 justify-between">
                    <div>
                      <div>
                        <span className="text-white font-normal text-[14px]">
                          Upload Images<span style={{ color: 'red' }}>*</span>
                        </span>
                        <div className="flex flex-row gap-2 pt-4">
                          <>
                            {images?.map((image: any, index: number) => (
                              <div
                                key={index}
                                style={{
                                  position: 'relative',
                                  width: 50,
                                  height: 50,
                                  borderRadius: 5,
                                  border: '0.625px solid rgba(255, 255, 255, 0.34)',
                                }}
                              >
                                <img
                                  style={{ width: 50, height: 50, borderRadius: 5 }}
                                  src={image}
                                  alt=""
                                />
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(index);
                                  }}
                                  style={{
                                    position: 'absolute',
                                    top: -5,
                                    right: -5,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#00F0FB',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: 'white',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  x
                                </div>
                              </div>
                            ))}
                            {images?.length < 5 && (
                              <div
                                onClick={triggerFileInputClick}
                                style={{
                                  padding: 8,
                                  borderRadius: 5,
                                  width: 50,
                                  height: 50,
                                  border: '0.625px solid rgba(255, 255, 255, 0.34)',
                                  background: 'rgba(255, 255, 255, 0.06)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <span className="text-[20px] text-white">+</span>
                              </div>
                            )}
                          </>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) => {
                              handleFileChange(e);
                              erase()
                            }}
                          />
                        </div>
                      </div>
                      {errorInputField === 'productImages' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                    {/* <div>
                              <label>
                                  <span className='text-white font-normal text-[14px]'>Product Demo<span style={{ color: 'red' }}>*</span></span>
                                  <div className='flex flex-row gap-2 pt-4'>
                                      {
                                          demoVideos.map( (video) => {
                                              return (
                                                  <div style={{padding:8, borderRadius: 5,
                                                      border: '0.625px solid rgba(255, 255, 255, 0.34)',
                                                      background: 'rgba(255, 255, 255, 0.06)'}}>
                                                      <img src={VideoIcon} alt="" />
                                                  </div>
                                              )
                                          })
                                      }
                                  </div>
                              </label>
                          </div> */}
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Product Description<span style={{ color: 'red' }}>*</span>
                        </span>
                        <textarea
                          autoComplete="off"
                          placeholder="Enter Product Description"
                          className="ac-frm-input rounded-pill badge h-[50px]"
                          value={productDescription || ''}
                          style={{
                            borderRadius: 16,
                            border: `1px solid ${errorInputField === 'productDescription'
                              ? '#F04438'
                              : '#A768FD'
                              }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                            marginTop: 10,
                            height: 100,
                            padding: 10, // Adding padding for better text area styling
                            resize: 'none', // Preventing the text area from being resized
                          }}
                          onChange={e => {
                            setProductDescription(e.target.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'productDescription' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Tags<span style={{ color: 'red' }}>*</span>
                        </span>
                        <SelectChip setTags={setTags} tags={tags} />
                        {/* <Select
                    // className="ac-frm-select-input rounded-pill badge h-[50px]"
                    placeholder="Select Tags"
                    value={tagOptions.find(option => option.value === tags)}
                    styles={customStyles}
                    options={tagOptions}
                    onChange={selectedOption => {
                      setTags([selectedOption?.value]);
                      erase();
                    }}
                  /> */}
                        {/* <SelectTwo
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                              <Chip key={value} label={value} />
                          ))}
                          </Box>
                      )}
                      MenuProps={MenuProps}
                      sx={customStyles}
                  >
                      {names.map((name) => (
                          <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                          >
                          {name}
                          </MenuItem>
                      ))}
                  </SelectTwo> */}
                      </label>
                      {errorInputField === 'tags' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>

                  </div>
                </div>
                <div className="pt-8 pb-3">
                  <span className="text-white font-semibold text-[18px]">
                    Contact Information
                  </span>
                </div>
                <div>
                  <div className="horizontal-divider-light mb-4"></div>
                </div>
                <div className="flex flex-row gap-24 field-row-container" >
                  <div className="flex flex-1 flex-col gap-y-6">
                    {/* <div className='flex flex-row justify-between items-center pt-10'>
                              <div>
                                  <span className='text-white font-normal text-[14px]'>Choose Pricing</span>
                              </div>
                              <div className="sliding-tab">
                                  <div className="tab-background" style={{ left: priceTab === 'free' ? '0' : '50%' }}></div>
                                  <div className="tab-container">
                                      <button
                                          className={priceTab === 'free' ? 'active' : ''}
                                          onClick={() => handlePriceTabClick('free')}
                                      >
                                          Free
                                      </button>
                                      <button
                                          className={priceTab === 'paid' ? 'active' : ''}
                                          onClick={() => handlePriceTabClick('paid')}
                                      >
                                          Paid
                                      </button>
                                  </div>
                              </div>
                              <label>
                                  <span className='text-white font-normal text-[14px]'>Product Name <span style={{ color: 'red' }}>*</span></span>
                                  <input
                                      type="text"
                                      autoComplete="off"
                                      placeholder="Enter product name"
                                      className="ac-frm-input rounded-pill badge h-[50px]"
                                      value={productName || ""}
                                      style={{
                                          borderRadius: 50,
                                          border: `1px solid ${errorInputField === 'productName' ? '#F04438' : '#A768FD'}`,
                                          background: 'rgba(4, 4, 4, 0.20)',
                                          marginTop: 10
                                      }}
                                      onChange={(e) => {
                                          setProductName(e.target.value);
                                          erase();
                                      }}
                                  />
                              </label>
                              {errorInputField === 'productName' &&
                                  <span className='errorField'>{errorMessage}</span>
                              }
                          </div> */}
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          App Store Link
                        </span>
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Enter App Store link"
                          className="ac-frm-input rounded-pill badge h-[50px]"
                          value={appStoreLink || ''}
                          style={{
                            borderRadius: 50,
                            border: `1px solid ${errorInputField === 'appStoreLink' ? '#F04438' : '#A768FD'
                              }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                            marginTop: 10,
                          }}
                          onChange={e => {
                            setAppStoreLink(e.target.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'appStoreLink' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-y-6">
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Play Store Link
                        </span>
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Enter play store link"
                          className="ac-frm-input rounded-pill badge h-[50px]"
                          value={playStoreLink || ''}
                          style={{
                            borderRadius: 50,
                            border: `1px solid ${errorInputField === 'playStoreLink'
                              ? '#F04438'
                              : '#A768FD'
                              }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                            marginTop: 10,
                          }}
                          onChange={e => {
                            setPlayStoreLink(e.target.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'playStoreLink' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                    <div>
                      <label>
                        <span className="text-white font-normal text-[14px]">
                          Website Link
                        </span>
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Enter website link"
                          className="ac-frm-input rounded-pill badge h-[50px]"
                          value={websiteLink || ''}
                          style={{
                            borderRadius: 50,
                            border: `1px solid ${errorInputField === 'websiteLink' ? '#F04438' : '#A768FD'
                              }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                            marginTop: 10,
                          }}
                          onChange={e => {
                            setWebsiteLink(e.target.value);
                            erase();
                          }}
                        />
                      </label>
                      {errorInputField === 'websiteLink' && (
                        <span className="errorField">{errorMessage}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="horizontal-divider-light-full mt-8"></div>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div className="add-product-btn-container flex flex-row justify-center items-center gap-12">
                    <button
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="ac-login-btn mt-10"
                      style={{
                        borderRadius: 50,
                        border: '1px solid #FFF',
                        textTransform: 'capitalize',
                        paddingLeft: 50,
                        paddingRight: 50,
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSave}
                      className="ac-login-btn mt-10"
                      style={{
                        borderRadius: 50,
                        border: '1px solid #A768FD',
                        background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                        textTransform: 'capitalize',
                        paddingLeft: 50,
                        paddingRight: 50,
                        position: 'relative'
                      }}
                      disabled={loading}
                    >
                      {loading && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1
                          }}
                        >
                          {/* Add your loader component here */}
                          <div className="loader"></div>
                        </div>
                      )}
                      {
                        !loading ? 'Save' : ''
                      }
                    </button>
                  </div>
                </div>
              </>
            }
          </div>
      }
    </div>
  );
};

export default EditProductsPage;
