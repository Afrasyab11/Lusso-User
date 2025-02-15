import {Modal} from '@mantine/core';
import axios from 'axios';
import {Dropdown} from 'flowbite-react';
import React, {useEffect, useRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';
import LussoLab from '../../assets/images/AppsCategory.svg';
import add from '../../assets/images/calender/add.svg';
import bookmark from '../../assets/images/calender/bookmark.svg';
import calender from '../../assets/images/calender/calender.svg';
import comment from '../../assets/images/calender/comment.svg';
import heart from '../../assets/images/calender/heart.svg';
import insta from '../../assets/images/calender/instagram.svg';
import location from '../../assets/images/calender/location.svg';
import Lusso from '../../assets/images/calender/lusso.svg';
import person from '../../assets/images/calender/person.svg';
import profile from '../../assets/images/calender/profile.svg';
import vector from '../../assets/images/calender/Sparkle.png';
import upload from '../../assets/images/calender/upload.svg';
import SocialPageModal from '../../components/sidebar/SocialPageModal';
import {apiEndpoints} from '../../constants/api-endpoints';
import {ROUTES_ENUM} from '../../constants/routes.constant';
import makeApiCall from '../../lib/apiCall';
import {useAppSelector, useCurrentOrigin} from '../../redux/hooks';
import {checkNullOrEmpty, getCookies} from '../../utils/utils';
import {SPLASH_ENUM} from '../developer/socialAnalytics/constants/analytics.constants';
import './calenderStyle.scss';
import {useAiPost} from '../../context/CreateAIContext';
import PostAndImageGenerated from './components/PostAndImageGenerated';
import { useSelector } from 'react-redux';
import CreateAIImage from './components/CreateAIImage';
import CreateAIPost from './components/CreateAIPost';

const CalenderPostModal = ({
  close,
  opened,
  formattedDateTime,
  setSelectedTime,
  setPreSelectedDate,
  canSaveDraft,
  selectedFromTableDate,
}: any) => {
  const getPostDetails = useSelector((state: any) => state.aiPost.aiUsePost);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [publishOption, setPublishOption] = useState<string>('Auto Publish');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imagePreview, setImagePreview] = useState<any>(
    getPostDetails?.image_url ? [getPostDetails.image_url] : []
  );
  const baseOrigin = useCurrentOrigin();
  const [formData, setFormData] = useState<{
    firstCommentText: string;
    postText: string;
    selectedFiles?: any;
  }>({
    firstCommentText: '',
    postText: getPostDetails?.post || "",
    selectedFiles: getPostDetails?.image_url || null,
  });
  const [errors, setErrors] = useState({
    firstCommentText: '',
    postText: '',
    selectedFiles: '',
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      postText: getPostDetails?.post || '',
      selectedFiles: getPostDetails?.image_url ? getPostDetails?.image_url : null
    }));
    setImagePreview(getPostDetails?.image_url ? [getPostDetails?.image_url] : [])
  }, [getPostDetails]);
  const validateField = (name: any, value: any) => {
    let error = '';

    if ((name === 'firstCommentText' || name === 'postText') && !value) {
      error = 'This field is required';
    } else if (name === 'selectedFiles' && (!value || value?.length === 0)) {
      error = 'Please upload a file';
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));

    return !error;
  };

  const {connectedPlatforms} = useAppSelector(state => state?.socialAnalytics);
  const { generatePostImgCombine,createOpenPost, setCreateOpenPost} = useAiPost();

  const [addSocialModal, setAddSocialModal] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [socialPages, setSocialPages] = useState([]);
  const [paramsData, setParamsData] = useState<{
    userId: number | string;
    blogId: number | string;
    platform: string;
  }>({userId: '', blogId: '', platform: ''});

  const [isLoading, setIsLoading] = useState(false);
  const selectedDateTime =
    formattedDateTime && formattedDateTime.toLocaleString();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = event.target.files;
    setFormData((prevData: any) => ({
      ...prevData,
      selectedFiles: files,
    }));
    validateField('selectedFiles', files);
    const filePreviews: string[] = Array.from(files)?.map((file: any) =>
      URL.createObjectURL(file),
    );
    setImagePreview(filePreviews);
  };

  const uploadImages = async (files: any) => {
    setIsLoading(true);
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        let token = getCookies('authToken');
        const response = await axios.post(
          'https://api.lusso.dev/api/v1/analytics/upload-to-metricool',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        uploadedUrls.push(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsLoading(false);
      }
    }
    return uploadedUrls;
  };

  const socialPageHandle = async (id: string) => {
    setInProgress(true);
    const key: keyof typeof paramsData = 'blogId';
    const addPageContent = {
      ...apiEndpoints[paramsData.platform as keyof typeof apiEndpoints]
        .addPages,
    };
    const addLikPage = {
      ...addPageContent,
      endpoint:
        addPageContent.endpoint + paramsData[key] + '?linkedInPageId=' + id,
    };
    await makeApiCall(addLikPage);
    setInProgress(false);
    setAddSocialModal(false);
  };

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatforms(prevSelected => {
      const updatedPlatforms = prevSelected.includes(platform)
        ? prevSelected.filter(item => item !== platform)
        : [...prevSelected, platform];
  
      if (updatedPlatforms.length > 0) {
        setPlatformError(null);
      } else {
        setPlatformError('Please select at least one platform.');
      }
  
      return updatedPlatforms;
    });
  };
  
  const handleRemoveImage = (index: number) => {
    setImagePreview((prevPreviews: string[]) =>
      prevPreviews?.filter((_, i) => i !== index),
    );

    setFormData((prevData: any) => {
      const updatedFiles = Array.from(prevData.selectedFiles || [])?.filter(
        (_: any, i: number) => i !== index,
      );
      return {
        ...prevData,
        selectedFiles: updatedFiles?.length > 0 ? updatedFiles : null,
      };
    });

    if (formData.selectedFiles?.length > 1) {
      validateField('selectedFiles', formData?.selectedFiles);
    }
  };
  const [platformError, setPlatformError] = useState<string | null>(null);

  const validateForm = () => {
    const isFirstCommentTextValid: any = validateField(
      'firstCommentText',
      formData.firstCommentText,
    );
    const isPostTextValid: any = validateField('postText', formData?.postText);
    const isSelectedFilesValid: any = validateField(
      'selectedFiles',
      formData?.selectedFiles,
    );
    if (selectedPlatforms?.length === 0) {
      setPlatformError('Please select at least one platform.');
      return false;
    } else {
      setPlatformError(null);
    }
  
    return (
      isFirstCommentTextValid &&
      isPostTextValid &&
      isSelectedFilesValid &&
      selectedPlatforms?.length > 0
    );
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const todayDate = new Date().toISOString().slice(0, 19);
    const selectformattedDate =
      selectedDate &&
      new Date(
        selectedDate?.getTime() - selectedDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 19);
    const formattedDate = new Date(formattedDateTime);
    const offset = formattedDate.getTimezoneOffset() * 60 * 1000;
    const publishDate = formattedDate
      ? new Date(formattedDate.getTime() + offset).toISOString().slice(0, 19)
      : null;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let mediaContent;
    if (getPostDetails?.image_url) {
      mediaContent = [getPostDetails.image_url];
    } else {
      mediaContent = await uploadImages(formData.selectedFiles);
    }
    // const mediaUrls = await uploadImages(formData.selectedFiles);
    const payload = {
      publishDate:
        publishOption === 'Publish Now' && selectedDate
          ? selectformattedDate
          : publishOption === 'Publish Now' && !formattedDateTime
            ? todayDate
            : publishOption === 'Auto Publish' && selectedDate
              ? selectformattedDate
              : publishOption === 'Auto Publish' && !formattedDateTime
                ? todayDate
                : formattedDateTime
                  ? publishDate
                  : selectformattedDate || selectedFromTableDate,
      timezone,
      text: formData.postText ?? '',
      media: mediaContent ?? '',
      firstCommentText: formData.firstCommentText ?? '',
      networks: selectedPlatforms?.map(platform => `${platform}`),

      draft: publishOption === 'Save as Draft' ? true : false,
    };
    try {
      let token = getCookies('authToken');
      const response = await axios.post(
        'https://api.lusso.dev/api/v1/analytics/schedule-post',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Post scheduled successfully:', response?.data);
      await closeModal();
      toast.success('Post scheduled successfully');
    } catch (error: any) {
      console.error('Error scheduling post:', error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const addSocialPlatform = async (platform: string) => {
    const creator = getCookies('authUser');
    const platformName = platform?.toLowerCase();
    if (creator) {
      let newContent = {...apiEndpoints.socialSignin};
      newContent.params.query.platformName = platformName;

      const signinLink = await makeApiCall(newContent);
      if (!signinLink) return;
      const newWindow = window.open(
        signinLink +
          '&returnPage=' +
          baseOrigin +
          ROUTES_ENUM.CREATOR_SOCIAL_CALLBACK,
        'myWindow',
        'width=1000,height=700',
      );

      const handleMessage = (event: MessageEvent) => {
        if (event.origin === baseOrigin) {
          const {userId, blogId} = event.data;
          if (!checkNullOrEmpty(blogId)) {
            setParamsData({userId, blogId, platform: platformName});
            console.log({userId, blogId, platform: platformName});

            const targetPlatform =
              apiEndpoints?.[platformName as keyof typeof apiEndpoints] ?? {};
            if (targetPlatform?.addPage) {
              if (!checkNullOrEmpty(targetPlatform?.getPages)) {
                makeApiCall(targetPlatform.getPages)
                  .then(resp => {
                    setSocialPages(resp ?? []);
                    console.log(resp);
                    if (!checkNullOrEmpty(resp)) setAddSocialModal(true);
                  })
                  .catch(error => console.error(error));
              }
            }
          }
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeModal = () => {
    setFormData({
      firstCommentText: '',
      postText: '',
      selectedFiles: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImagePreview(null);
    setSelectedDate(null);
    setPlatformError(null)
    setSelectedPlatforms([])
    setErrors({
      firstCommentText: '',
      postText: '',
      selectedFiles: '',
    });
    setSelectedTime('');
    setPreSelectedDate('');
    setPublishOption('Auto Publish');
    close();
  };
  const handleInputChange = (e: any) => {
    const {name, value} = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };
  const handleOptionSelect = (option: string) => {
    setPublishOption(option);
    if (option === publishOption) {
      handleSubmit();
    }
  };
  const getModalSize = () => {
    if (windowWidth < 640) {
      return 'md';
    } else if (windowWidth < 1024) {
      return '90%';
    } else if (windowWidth < 1440) {
      return '90%';
    }
    return '70%';
  };
  const CustomInput = React.forwardRef(({value, onClick}: any, ref: any) => (
    <button
      className="bg-[#792FFF80] cursor-pointer font-semibold gap-2 text-xs xl:text-lg rounded-md border-0 py-2 text-white text-center flex items-center pl-3 pr-3 custom-datepicker"
      onClick={onClick}
      ref={ref}
    >
      <img src={calender} className="w-4" alt="Calendar Icon" />
      {value || selectedDateTime}
    </button>
  ));

  return (
    <>
    {/* {createOpenPost && (

    <CreateAIPost />
    )} */}
      <PostAndImageGenerated />
      <SocialPageModal
        platform={paramsData.platform}
        open={addSocialModal}
        loading={inProgress}
        options={socialPages}
        onClose={() => setAddSocialModal(false)}
        onConfirm={socialPageHandle}
      />
      <Modal
        opened={opened}
        onClose={close}
        size={getModalSize()}
        title={
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center">
              <img src={profile} alt="Logo" className="w-6 h-6 mr-2" />
            </div>

            <div className="flex items-center text-white">Post Review</div>
          </div>
        }
        closeOnClickOutside={false}
        lockScroll={true}
        withCloseButton={false}
        styles={{
          header: {
            backgroundImage:
              'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
            color: '#FFFFFF',

            display: 'none',
          },
          body: {
            backgroundImage:
              'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
            overflow: 'hidden',
            maxHeight: '90vh',
          },
        }}
        data-centered
      >
        <div
          className={`p-4 rounded-lg relative flex flex-col md:flex-row space-x-4 scrollbar-hide ${
            windowWidth < 640 ? 'text-sm' : 'text-base'
          } custom-scroll overflow-auto`}
          style={{
            backgroundImage:
              'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
            maxHeight: '90vh',
            maxWidth: '100%',
          }}
        >
          {/* Modal Body */}
          <div className="flex flex-col gap-10">
            {isLoading && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex justify-start items-center gap-5">
              <img
                src={add}
                alt="add"
                className="w-10 mt-2"
                onClick={() => addSocialPlatform('linkedin')}
              />
              {/* {Object?.keys(connectedPlatforms)?.filter((platform) => connectedPlatforms[platform])?.map((platform) => (
                                <img className="w-5" src={SPLASH_ENUM[platform?.toUpperCase() as keyof typeof SPLASH_ENUM]?.icon} alt="platforms" />
                            ))} */}

              {Object?.keys(connectedPlatforms)
                ?.filter(platform => connectedPlatforms[platform])
                ?.map(platform => (
                  <div
                    key={platform}
                    className={`cursor-pointer ${
                      selectedPlatforms?.includes(platform)
                        ? 'border-2 border-blue-500'
                        : ''
                    }`}
                    onClick={() => handlePlatformClick(platform)}
                  >
                    <img
                      className="w-5"
                      src={
                        SPLASH_ENUM[
                          platform?.toUpperCase() as keyof typeof SPLASH_ENUM
                        ]?.icon
                      }
                      alt={platform}
                    />
                  </div>
                ))}
            </div>
            {platformError && (
              <p className="text-xs text-red-500 mt-2">{platformError}</p>
            )}
            <div className="">
              <hr
                className="border-t border-gray-500 w-full"
                style={{
                  background:
                    'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                  borderWidth: '1px solid',
                  boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
                }}
              />
            </div>

            <div
              className="rounded-md"
              style={{
                background:
                  'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                border: '1px solid rgba(108, 140, 255, 0.5)',
                boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
              }}
            >
              <textarea
                className="w-full h-64 p-4 text-[#FFFFFF] rounded-t-md resize-none"
                style={{
                  background:
                    'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                  border: 'none',
                }}
                name="postText"
                value={formData.postText}
                onChange={handleInputChange}
                placeholder="Write your content here..."
                maxLength={400}
              />
              {errors.postText && (
                <p className="text-xs text-red-500">{errors.postText}</p>
              )}
              <div className="image-preview-grid grid grid-cols-4 gap-4">
                {imagePreview?.map((previewUrl: string, index: number) => (
                  <div key={index} className="relative w-24 h-16">
                    <img
                      src={getPostDetails?.image_url ?? previewUrl}
                      alt={`preview-${index}`}
                      className="w-full h-full object-fill rounded-md"
                    />
                    <button
                      className="absolute -top-5 right-0 bg-gray-500  px-1 text-white rounded-full"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <hr
                className="border-gray-500"
                style={{
                  background:
                    'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                  border: '1px solid rgba(108, 140, 255, 0.5)',
                  boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
                }}
              />

              <div
                className="flex justify-between items-center p-2"
                style={{
                  background:
                    'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                  borderTop: 'none',
                }}
              >
                <div className="flex space-x-4">
                  {/* Icons */}

                  <div>
                    <button
                      className="p-2 rounded-md"
                      onClick={handleButtonClick}
                    >
                      <img src={upload} alt="upload" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      name="selectedFiles"
                      onChange={handleFileChange}
                      style={{display: 'none'}}
                      // multiple
                      accept="image/*"
                    />
                  </div>
                  <button className=" p-2 rounded-md">
                    <img src={profile} alt="profile" />
                  </button>
                  <button className="p-2 rounded-md">
                    <img src={person} alt="person" />
                  </button>
                  <button className=" p-2 rounded-md">
                    <img src={location} alt="location" />
                  </button>
                </div>
                <div>
                  <button
                    className="flex gap-2"
                    onClick={generatePostImgCombine}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   console.log("hello")
                    //   setCreateOpenPost(true)
                    //   console.log("hello  ded")
                    // }}
                  >
                    <img src={vector} className=" object-cover" alt="" />
                    <span
                      className="font-normal"
                      style={{
                        color: '#FFFFFF99',
                      }}
                    >
                      Create with AI
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {errors.selectedFiles && (
              <p className="text-xs text-red-500">{errors.selectedFiles}</p>
            )}

            <input
              type="text"
              className="w-full p-4 font-normal rounded-xl text-[#FFFFFF]"
              style={{
                background:
                  'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                border: '1px solid rgba(108, 140, 255, 0.5)',
                boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
              }}
              name="firstCommentText"
              value={formData.firstCommentText}
              onChange={handleInputChange}
              placeholder="First Comment"
            />
            {errors.firstCommentText && (
              <p className="text-xs text-red-500">{errors.firstCommentText}</p>
            )}
            <div className="mt-4">
              <hr
                className="border-t border-gray-500 w-full"
                style={{
                  background:
                    'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                  borderWidth: '1px solid',
                  boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between lg:items-center ">
              <button
                className="bg-[#792FFF80] py-2 px-4 rounded-md text-white text-center mb-4 font-semibold text-xs xl:text-lg md:mb-0"
                onClick={() => closeModal()}
              >
                Discard Post
              </button>
              <div className="flex justify-between ml-2 items-center space-x-4">
                {publishOption === 'Auto Publish' && (
                  <>
                    {selectedDateTime ? (
                      <>
                        <div className="text-white">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date: any) => setSelectedDate(date)}
                            showTimeSelect
                            // placeholderText="Schedule"
                            dateFormat="Pp"
                            popperPlacement="top"
                            customInput={<CustomInput />}
                            className="bg-[#792FFF80] cursor-pointer font-semibold  text-xs xl:text-lg rounded-md border-0 py-2 text-white text-center custom-datepicker"
                            wrapperClassName="custom-datepicker"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-white">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: any) => setSelectedDate(date)}
                          showTimeSelect
                          // placeholderText="Schedule"
                          dateFormat="Pp"
                          popperPlacement="top"
                          customInput={<CustomInput />}
                          className="bg-[#792FFF80] cursor-pointer font-semibold  text-xs xl:text-lg rounded-md border-0 py-2 text-white text-center custom-datepicker"
                          wrapperClassName="custom-datepicker"
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="relative inline-block bg-[#792FFF80] font-semibold text-xs xl:text-lg text-center rounded-md text-white cursor-pointer">
                  <Dropdown
                    dismissOnClick={true}
                    label={
                      <span className="text-xs xl:text-lg text-white">
                        {isLoading ? 'Submitting...' : publishOption}
                      </span>
                    }
                    className="bg-[#AE90E4] text-white uppercase"
                  >
                    <Dropdown.Item
                      onClick={() => handleOptionSelect('Auto Publish')}
                      className="text-white"
                    >
                      Auto Publish
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleOptionSelect('Publish Now')}
                      className="text-white"
                    >
                      Publish Now
                    </Dropdown.Item>
                    {(canSaveDraft ||
                      (selectedDate && selectedDate > new Date())) && (
                      <Dropdown.Item
                        onClick={() => handleOptionSelect('Save as Draft')}
                        className="text-white"
                      >
                        Save as Draft
                      </Dropdown.Item>
                    )}
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden md:flex items-stretch">
            <hr className="w-[1px] h-full border-none bg-gray-500" />
          </div>
          {/* <PostPreview title="Post Preview"
            platformName={"Instagram"}
            platformIcon={insta}
            profileImage={Lusso}
            postImage={Lusso}
            profileName={"Lusso.ai"}
            profileDescription={" marketing agency"}
            description={formData.postText}
            
            /> */}
          <div className=" md:w-1/3 flex flex-col  p-4 rounded-lg">
            <div className="relative mb-4">
              <span className="cursor-pointer text-[#FFFFFF] relative group text-xl font-medium">
                Post Preview
                <span className="absolute  left-0 right-0 bottom-[-4px] h-[2px] bg-[#5B97FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </div>
            <div className="w-full p-2 bg-[#1A1442] text-white rounded-md mb-4">
              <div className="flex justify-center gap-2 items-center">
                <div>
                  <img src={insta} alt="insta" className="w-5 h-5" />
                </div>
                <div>
                  <span>Instragram</span>
                </div>
              </div>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                background:
                  'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                border: '1px solid rgba(108, 140, 255, 0.5)',
                boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={Lusso}
                  alt="lusso"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[#FFFFFF] font-medium text-xl">
                    Lusso.ai
                  </span>
                  <small className="text-xs font-medium text-gray-400">
                    marketing agency
                  </small>
                </div>
              </div>
              <div className="w-full h-48 rounded-md">
                {imagePreview?.length > 0 ? (
                  <img
                    src={getPostDetails?.image_url ?? imagePreview[0]}
                    className="h-full w-full object-fill"
                    alt="upload img preview"
                  />
                ) : (
                  <img
                    src={LussoLab}
                    className="h-full w-full object-fill"
                    alt="default img"
                  />
                )}
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2 items-center">
                    <img src={heart} alt="heart" />
                    <span className="text-xs font-medium text-gray-400">
                      6.2k
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img src={comment} alt="comment" />
                    <span className="text-xs font-medium text-gray-400">
                      245
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-end">
                  <img src={bookmark} alt="bookmark" />
                  <span className="text-xs font-medium text-gray-400">285</span>
                </div>
              </div>
              <p
                className="h-auto mt-2  text-white rounded text-sm"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 4,
                  textOverflow: 'ellipsis',
                }}
              >
                {formData.postText}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalenderPostModal;
