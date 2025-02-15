import axios from 'axios';
import React, { useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { useEditMode } from '../../context/EditModeContext';
import { listData } from '../../data/productData';
import { getCookies } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { getProductId } from '../../redux/product/productSlice';

interface PlatformGuideLinesProps {
    setProductId: (id: any) => void;
    setCurrentStep: (step: number) => void;
    currentStep: number;
    getAllProducts?: any;
}

const PlatformGuideLines: React.FC<PlatformGuideLinesProps> = ({
    setCurrentStep,
    currentStep,
    getAllProducts,
    setProductId
}) => {
    const context: any = useStateContext();
    const dispatch = useDispatch()
    const category = context?.productCategory;
    const [isLoading, setIsLoading] = useState(false);
    const { isEditPage, toActiveProduct, setToActiveProduct } = useEditMode();
    console.log('put', getAllProducts);
    // Define the apiData structure
    const apiData: any = {
        name: context?.productName,
        description: context?.productDescription,
        category: context?.productCategory,
        subCategory: context?.productSubCategory,
        tagLine: context?.productTagline,
        // sourceLinks: [context?.sourceLinks] || [],
        sourceLinks: context?.sourceLinks ? [context?.sourceLinks] : [],

        // mediaIds: [context?.mediaLinks] || [],
        additionalInfo: {
            supportInfo: context?.additionalInfo?.supportInfo || {},
            socialLinks: context?.additionalInfo?.socialLinks || {},
            isMadeForKids: context?.additionalInfo?.isMadeForKids ?? "",
            productComability: context?.additionalInfo?.productComability || [],
            audience: {
                age: context?.additionalInfo?.audience?.age || [],
                countries: context?.additionalInfo?.audience?.countries || [],
            },
        },
        productInfo: context?.productInfo
            ? {
                Feature: context.productInfo.productInfo,
                fields: context.productInfo.fields || {},
            }
            : {},


        teamInfo: {} as Record<string, any>,
    };

    // Populate teamInfo based on category
    if (category === 'Movie') {
        apiData.additionalInfo.releaseDate = context?.additionalInfo?.releaseDate
        apiData.additionalInfo.duration = context?.additionalInfo?.duration
        apiData.additionalInfo.genres = context?.additionalInfo?.genres
        apiData.additionalInfo.dubbedLanguages = context?.additionalInfo?.dubbedLanguages
        apiData.additionalInfo.primaryLanguage = context?.additionalInfo?.primaryLanguage
        apiData.teamInfo.cast = Array.isArray(context?.castInfo?.castLinks)
            ? context?.castInfo?.castLinks
            : [];
    } else if (category === 'Course') {
        apiData.teamInfo.instructors = Array.isArray(context?.instructor)
            ? context?.instructor
            : []; 
        apiData.additionalInfo.contributors = Array.isArray(context?.additionalInfo?.contributors) ? context?.additionalInfo?.contributors : []
    } else if (category === 'Service') {
        apiData.teamInfo.others = Array.isArray(context?.contact)
            ? context?.contact
            : {};
        apiData.productInfo = context?.service ?? {};
    } else if (category !== 'App' && category !== 'Game') {
        apiData.teamInfo = {
            cast: Array.isArray(context?.castInfo?.castLinks)
                ? context?.castInfo?.castLinks
                : [],
            instructors: Array.isArray(context?.instructor)
                ? context?.instructor
                : [],
            others: Array.isArray(context?.contact) ? context?.contact : {},
        };
    }
    console.log('Media Links:', context?.mediaLinks);
    if (isEditPage) {
        apiData.productId = getAllProducts?.productId;
    }
    const handleSubmit = async () => {
        if (!selectedOption)
            return alert('Please accept Platform Guidelines to Continue...');
        setIsLoading(true);
        try {
            let token = getCookies('authToken');

            const url = 'https://api.lusso.dev/api/v1/products';

            const method = isEditPage ? 'put' : 'post';

            const response = await axios({
                method,
                url,
                data: apiData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const productId = response.data?.message;
            dispatch(getProductId(productId))
            const currentProductId = isEditPage
                ? getAllProducts?.productId
                : productId;
            const totalFiles = context?.mediaLinks?.length;
            let fileIndex = 0;
            setProductId(productId ?? '')
            console.log({ totalFiles })
            const validMediaLinks = context?.mediaLinks?.filter(
                (mediaLink: any) => mediaLink?.mediaSrc !== undefined,
            );
            console.log({ validMediaLinks })
            if (!validMediaLinks?.length) {
                console.log('No valid media links found.');
            }

            if (validMediaLinks?.length) {
                for (const mediaLink of validMediaLinks) {
                    const file = mediaLink?.mediaSrc;
                    const folder = mediaLink?.mediaType;
                    const fileName = file?.name || `file_${fileIndex}`;

                    fileIndex++;

                    let totalChunks = 0;
                    let chunkIndex = 0;
                    let uploadId = null;

                    if (file?.size > 5 * 1024 * 1024) {  // 5MB
                        const chunkSize = 5 * 1024 * 1024;  // 5MB
                        const chunks = [];
                        for (let i = 0; i < file?.size; i += chunkSize) {
                            const chunk = file?.slice(i, i + chunkSize);
                            chunks?.push(chunk);
                            totalChunks++;
                        }

                        for (const chunk of chunks) {
                            chunkIndex++;
                            const adjustedChunkIndex = totalChunks === 1 ? 0 : chunkIndex;
                            const formData = new FormData();
                            formData.append('file', chunk);

                            const url = `https://api.lusso.dev/api/v1/uploadChunk?productId=${currentProductId}&totalFiles=${totalFiles}&fileIndex=${fileIndex}&folder=${folder}&fileName=${fileName}&totalChunks=${totalChunks}&chunkIndex=${adjustedChunkIndex}${context?.productCategory === 'Service' || 'Course'
                                ? `&teamMemberName=${context?.name}` : ''}`;

                            if (chunkIndex === 1) {
                                const uploadResponse = await axios?.post(url, formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                uploadId = uploadResponse?.data?.uploadId;
                            } else {
                                await axios?.post(url, formData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                            }

                            console.log(`Uploaded chunk ${chunkIndex} of ${totalChunks} of file ${fileIndex} of ${totalFiles}`);
                        }
                    }
                    else {
                        const formData = new FormData();
                        formData.append('file', file);
                        totalChunks = 1;
                        const adjustedChunkIndex = 0;
                        const url = `https://api.lusso.dev/api/v1/uploadChunk?productId=${currentProductId}&totalFiles=${totalFiles}&fileIndex=${fileIndex}&folder=${folder}&fileName=${fileName}&totalChunks=${totalChunks}&chunkIndex=${adjustedChunkIndex}${context?.productCategory === 'Service' || 'Course'
                            ? `&teamMemberName=${context?.name}` : ''}`;

                        await axios?.post(url, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                    }
                }
            } else {
                console.log('No media links found');
            }


            if (currentStep <= 5) {
                setCurrentStep(currentStep + 1);
            }
        } catch (error) {
            alert('Error Adding Product');
            console.log(error);
        } finally {
            setIsLoading(false);
            // context.resetContextState();
        }
    };

    const [selectedOption, setSelectedOption] = useState(false);
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10">
                {isLoading && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                )}
                <div className="flex flex-col gap-6">
                    <p className="font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]">
                        Platform Guidelines
                    </p>
                    <ul className="list-disc list-outside space-y-10 text-left text-white md-lt:px-3">
                        {listData.map((content, index) => (
                            <li key={index}>{content?.content}</li>
                        ))}
                    </ul>
                    <label className="flex items-center gap-4 cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedOption}
                            onChange={() => setSelectedOption(!selectedOption)}
                        />
                        <div
                            className={`w-7 h-7 border-[1px] border-white flex items-center justify-center rounded-md ${selectedOption ? 'bg-[#8f36ff]' : 'bg-transparent'
                                }`}
                        >
                            {selectedOption && <div className="w-3 h-3 bg-white" />}
                        </div>
                        <span className="text-white">I Agree to the above T&C</span>
                    </label>
                </div>
            </div>
            <div className="border-[1px] border-white border-opacity-20 w-full rounded-full" />
            <div className="flex items-center gap-10 justify-start">
                <button
                    onClick={() => {
                        setCurrentStep(currentStep - 1);
                    }}
                    className="relative py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        handleSubmit();
                    }}
                    style={{
                        background: 'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)',
                    }}
                    className="py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full"
                >
                    Save & Continue
                </button>
            </div>
        </div>
    );
};

export default PlatformGuideLines;
