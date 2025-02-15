import React, { useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import primaryImageIcon from '../../assets/images/products/imageUpload.png';
import uploadIcon from '../../assets/images/products/uploadIcon.png';
import videoUploadIcon from '../../assets/images/products/videUpload.png';
import { useStateContext } from '../../context/ContextProvider';

interface MediaLinks {
    mediaType: string;
    mediaSrc: File | string;
}

interface ProductData {
    mediaLinks: { url: string }[];
    trailerVideos: { url: string }[];
    bannerImage: string;
}

const MediaUpload: React.FC<{ productData?: ProductData }> = ({ productData }) => {
    const context = useStateContext();
    const [primaryImage, setPrimaryImage] = useState<File | any>(null);
    const [trailerVideo, setTrailerVideo] = useState<File | any>(null);
    const [otherImages, setOtherImages] = useState<File[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (productData) {
            setPrimaryImage(productData?.bannerImage || null);
            setTrailerVideo(productData?.trailerVideos?.[0]?.url || null);
            setOtherImages(
                (productData?.mediaLinks?.map(media => media?.url) as any) ?? [],
            );
        }
    }, [productData]);

    useEffect(() => {
        return () => {
            if (
                primaryImage &&
                typeof primaryImage === 'string' &&
                primaryImage.startsWith('blob:')
            ) {
                URL.revokeObjectURL(primaryImage);
            }
            if (
                trailerVideo &&
                typeof trailerVideo === 'string' &&
                trailerVideo.startsWith('blob:')
            ) {
                URL.revokeObjectURL(trailerVideo);
            }
            otherImages?.forEach((image: any) => {
                if (typeof image === 'string' && image?.startsWith('blob:')) {
                    URL.revokeObjectURL(image);
                }
            });
        };
    }, [primaryImage, trailerVideo, otherImages]);

    const handleSingleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<File | string | null>>,
        mediaType: string,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setImage(objectURL);
            context?.setMediaLinks(prevFields => {
                // Prevent duplicate mediaType
                return [
                    ...prevFields?.filter(item => item.mediaType !== mediaType),
                    { mediaType, mediaSrc: file },
                ];
            });
        }
    };

    const handleMultipleFilesChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImages: React.Dispatch<React.SetStateAction<File[]>>,
        mediaType: string,
    ) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setImages(prevImages => {
                const updatedImages = [...(prevImages || []), ...newFiles];
                context?.setMediaLinks(prevFields => {
                    const existingMedia = prevFields?.filter(
                        item => item.mediaType === mediaType,
                    );
                    const newMedia = updatedImages
                        ?.filter(img => typeof img !== 'string')
                        ?.map(file => ({ mediaType, mediaSrc: file }));
                    return [
                        ...prevFields?.filter(item => item.mediaType !== mediaType),
                        ...newMedia,
                    ];
                });
                return updatedImages;
            });
        }
    };

    const handleRemoveImage = (
        index: number | null,
        setImage: any,
        mediaType: string,
    ) => {
        if (index === null) {
            if (setImage instanceof Function) {
                setImage(null);
            }
            context?.setMediaLinks(
                prevFields => prevFields?.filter(item => item?.mediaType !== mediaType),
            );
        } else {
            if (setImage instanceof Function) {
                setOtherImages(prevImages => {
                    const updatedImages = prevImages?.filter((_, i) => i !== index);
                    context?.setMediaLinks(prevFields => [
                        ...prevFields?.filter(item => item?.mediaType !== mediaType),
                        ...updatedImages?.map(file => ({
                            mediaType,
                            mediaSrc: file,
                        })),
                    ]);
                    return updatedImages;
                });
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files?.length > 0) {
        }
    };

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="space-y-4">
            {/* Primary Image */}
            <div className="flex flex-col justify-start items-start w-auto gap-4">
                <p className="text-white text-[18px] font-semibold">Primary Image</p>
                <label
                    htmlFor="primary-image-upload"
                    className="relative flex items-center justify-center cursor-pointer p-5 bg-gradient-to-r from-[#380c95] to-[#341a5d] rounded-lg"
                >
                    {primaryImage ? (
                        <div className="">
                            <img
                                src={
                                    typeof primaryImage === 'string'
                                        ? primaryImage
                                        : URL.createObjectURL(primaryImage)
                                }
                                alt="Primary"
                                className="w-14 rounded"
                            />
                            <ImCross
                                className="absolute top-0 right-0 bg-white rounded-full p-1 text-red-700 cursor-pointer"
                                onClick={() =>
                                    handleRemoveImage(null, setPrimaryImage, 'banner')
                                }
                            />
                        </div>
                    ) : (
                        <img src={primaryImageIcon} alt="" className="w-14" />
                    )}
                    <input
                        id="primary-image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={e => handleSingleFileChange(e, setPrimaryImage, 'banner')}
                    />
                </label>
            </div>

            {/* Trailer */}
            <div className="flex flex-col justify-start items-start w-auto gap-4">
                <p className="text-white text-[18px] font-semibold">Trailer</p>
                <div className="flex gap-6 items-end">
                    <label
                        htmlFor="trailer-video-upload"
                        className="relative flex items-center justify-center cursor-pointer px-5 py-[30px] bg-gradient-to-r from-[#380c95] to-[#341a5d] rounded-lg"
                    >
                        {trailerVideo ? (
                            <div>
                                <video
                                    src={
                                        typeof trailerVideo === 'string'
                                            ? trailerVideo
                                            : URL.createObjectURL(trailerVideo)
                                    }
                                    className="w-14 rounded"
                                />
                                <ImCross
                                    className="absolute top-0 right-0 bg-white rounded-full p-1 text-red-700 cursor-pointer"
                                    onClick={() =>
                                        handleRemoveImage(null, setTrailerVideo, 'trailerVideo')
                                    }
                                />
                            </div>
                        ) : (
                            <img src={videoUploadIcon} alt="" className="w-14" />
                        )}
                        <input
                            id="trailer-video-upload"
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={e =>
                                handleSingleFileChange(e, setTrailerVideo, 'trailerVideo')
                            }
                        />
                    </label>
                    <div
                        className="flex items-center justify-center p-4 bg-gradient-to-r from-[#380c95] to-[#341a5d] rounded-lg"
                        onClick={handleIconClick}
                    >
                        <img
                            src={uploadIcon}
                            alt="Upload"
                            className="w-5 cursor-pointer"
                        // onClick={handleIconClick}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="video/*"
                            className="hidden"
                            onChange={e =>
                                handleSingleFileChange(e, setTrailerVideo, 'trailerVideo')
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Other Product Images */}
            <div className="flex flex-col justify-start items-start w-auto gap-4">
                <p className="text-white text-[18px] font-semibold">
                    Other Product Images
                </p>
                <div className="flex gap-6 items-end">
                    <label
                        htmlFor="other-image-upload"
                        className="relative flex items-center justify-center cursor-pointer p-5 bg-gradient-to-r from-[#380c95] to-[#341a5d] rounded-lg"
                    >
                        <img src={primaryImageIcon} alt="" className="w-14" />
                        <input
                            id="other-image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={e =>
                                handleMultipleFilesChange(e, setOtherImages, 'media')
                            }
                        />
                    </label>
                    <div
                        onClick={handleIconClick}
                        className="flex items-center justify-center p-4 bg-gradient-to-r from-[#380c95] to-[#341a5d] rounded-lg"
                    >
                        <img
                            src={uploadIcon}
                            alt="Upload"
                            className="w-5 cursor-pointer"
                        // onClick={handleIconClick}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden" // Hide the input
                            // onChange={handleFileChange}
                            onChange={e =>
                                handleMultipleFilesChange(e, setOtherImages, 'media')
                            }
                        />
                    </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {otherImages?.map((image, index) => (
                        <div className="relative w-20 h-20" key={index}>
                            <img
                                src={
                                    typeof image === 'string' ? image : URL.createObjectURL(image)
                                }
                                className="w-full h-full object-cover rounded"
                            />
                            <ImCross
                                className="absolute top-0 right-0 bg-white rounded-full p-1 text-red-700 cursor-pointer"
                                onClick={() =>
                                    handleRemoveImage(index, setOtherImages, 'media')
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MediaUpload;
