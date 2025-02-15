import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { scrollLeft, scrollRight } from '../../../../hooks/common.utils';
import { enableHorizontalScroll } from '../../../../lib/ScrollHelper';
import { LineDraw } from '../GameDetailsScreen';
import { Dialog, DialogContent, DialogTrigger } from "./UiDialouge";
import { VideoThumbnailExtractor } from './VideoThumbnailExtractor';

function Screenshots({ screenshotData, title }: { screenshotData: string[] | any, title: string }) {
    const [selectedFile, setSelectedFile] = useState<number | null>(null); // Track selected index
    const scrollRef = useRef<HTMLDivElement | null | any>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(screenshotData?.length > 0 ? true : false);

    // Add keyboard navigation for left and right arrow keys
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (selectedFile !== null) {
                if (event.key === 'ArrowLeft' && selectedFile > 0) {
                    handlePrev();
                } else if (event.key === 'ArrowRight' && selectedFile < screenshotData.length - 1) {
                    handleNext();
                }
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [selectedFile, screenshotData.length]);

    const handleNext = () => {
        if (selectedFile !== null && selectedFile < screenshotData.length - 1) {
            setSelectedFile(selectedFile + 1);
        }
    };

    const handlePrev = () => {
        if (selectedFile !== null && selectedFile > 0) {
            setSelectedFile(selectedFile - 1);
        }
    };

    useEffect(() => {
        const cleanup = enableHorizontalScroll(scrollRef.current);
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    const checkScrollPosition = () => {
        const scrollEl = scrollRef.current;
        if (scrollEl) {
            const atLeft = scrollEl.scrollLeft === 0; // At the very left
            const atRight = scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth; // At the very right
            setShowLeft(!atLeft); // Show left button only if scrolled
            setShowRight(!atRight && screenshotData.length > 0); // Show right button if not at end and data exists
        }
    };

    useEffect(() => {
        const handleScroll = () => checkScrollPosition();
        const currentScrollRef = scrollRef.current;

        if (currentScrollRef) {
            currentScrollRef.addEventListener('scroll', handleScroll);
            checkScrollPosition(); // Set button visibility on initial load
        }

        // Cleanup listener on component unmount
        return () => currentScrollRef?.removeEventListener('scroll', handleScroll);
    }, [screenshotData]);

    // const VideoThumbnailExtractor = ({ videoUrl }: { videoUrl: string }) => {
    //     console.log(videoUrl)
    //     const videoRef = useRef<HTMLVideoElement | null>(null);
    //     const [thumbnail, setThumbnail] = useState<string | null>(null);

    //     useEffect(() => {
    //         const extractThumbnail = () => {
    //             if (videoRef.current) {
    //                 const video = videoRef.current;
    //                 const canvas = document.createElement('canvas');
    //                 canvas.width = video.videoWidth;
    //                 canvas.height = video.videoHeight;

    //                 const ctx = canvas.getContext('2d');
    //                 if (ctx) {
    //                     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //                     const thumbnailUrl = canvas.toDataURL('image/png');
    //                     setThumbnail(thumbnailUrl);
    //                 }
    //             }
    //         };

    //         const video = videoRef.current;
    //         if (video) {
    //             video.addEventListener('loadeddata', extractThumbnail);
    //             console.log(extractThumbnail)
    //             return () => {
    //                 video.removeEventListener('loadeddata', extractThumbnail);
    //             };
    //         }
    //     }, [videoUrl]);
    //     return (
    //         <>
    //             <video ref={videoRef} src={videoUrl} style={{ display: 'none' }} />
    //             {thumbnail ? (
    //                 <img src={thumbnail} alt="Video thumbnail" className="w-[30rem] h-[15rem] object-cover" />
    //             ) : (
    //                 <p>Loading thumbnail...</p>
    //             )}
    //         </>
    //     );
    // };

    // console.log({ screenshotData })

    if (screenshotData.length === 0) {
        return <></>
    }

    // render
    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5 relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-3xl font-bold mb-4 capitalize">{title}</h2>
                {screenshotData.length > 0 && (
                    <span className="md:hidden flex gap-2 bg-clip-text text-transparent bg-gradient-to-r from-[#985FFF] to-[#FF99EF]">
                        See all
                        <ChevronRight color='#985FFF' />
                    </span>
                )}
            </div>

            <LineDraw />

            <div className="relative">
                {showLeft && (
                    <button
                        onClick={() => scrollLeft(scrollRef)}
                        className="z-20 absolute -left-3 md:-left-5 top-1/2 transform -translate-y-1/2 bg-[#5721B9] h-9 w-9 rounded-full ps-1"
                        style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}
                    >
                        <ChevronLeft color="#00F0FB" />
                    </button>
                )}

                {showRight && (
                    <button
                        onClick={() => scrollRight(scrollRef)}
                        className="z-20 absolute -right-3 md:-right-5 top-1/2 transform -translate-y-1/2 bg-[#5721B9] h-9 w-9 rounded-full ps-1.5"
                        style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}
                    >
                        <ChevronRight color="#00F0FB" />
                    </button>
                )}

                {(screenshotData.length > 0) ? (
                    <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-none" ref={scrollRef}>
                        {screenshotData.map((file: any, i: any) => (
                            <Dialog key={i} onOpenChange={(isOpen) => isOpen && setSelectedFile(i)}>
                                <DialogTrigger asChild>
                                    {file.video ? (
                                        <div>
                                            <div className="relative w-[15rem] md:w-[30rem] h-[7.5rem] md:h-[15rem] cursor-pointer group">
                                                {/* Replace static image with dynamic video thumbnail */}
                                                <VideoThumbnailExtractor videoUrl={file.video} />
                                                <div className="absolute inset-0 flex items-center justify-center z-99 bg-black bg-opacity-20 opacity-100 transition-opacity duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                                                        <path opacity="0.8" d="M26.4177 4.63672C22.089 4.63672 17.8574 5.92034 14.2582 8.32525C10.659 10.7302 7.8538 14.1483 6.19726 18.1476C4.54073 22.1468 4.10731 26.5474 4.9518 30.793C5.79629 35.0385 7.88077 38.9383 10.9416 41.9992C14.0025 45.0601 17.9023 47.1445 22.1479 47.989C26.3934 48.8335 30.794 48.4001 34.7933 46.7436C38.7925 45.087 42.2107 42.2818 44.6156 38.6826C47.0205 35.0834 48.3041 30.8519 48.3041 26.5231C48.3041 23.649 47.738 20.803 46.6381 18.1476C45.5382 15.4922 43.9261 13.0794 41.8937 11.0471C39.8614 9.01476 37.4486 7.40262 34.7933 6.30272C32.1379 5.20283 29.2918 4.63672 26.4177 4.63672ZM22.0404 36.372V16.6743L35.1722 26.5231L22.0404 36.372Z" fill="#F2F2F2" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={file}
                                            alt={`Screenshot ${i + 1}`}
                                            className="w-[15rem] md:w-[30rem] h-[7.5rem] md:h-[15rem] object-cover cursor-pointer"
                                        />
                                    )}
                                </DialogTrigger>
                            </Dialog>
                        ))}
                    </div>
                )
                    : <h2>N/A</h2>
                }

            </div>

            {selectedFile !== null && (
                <Dialog open={selectedFile !== null} onOpenChange={() => setSelectedFile(null)}>
                    <DialogContent className="border-none p-4 sm:p-6">
                        {selectedFile > 0 && (
                            <button
                                onClick={handlePrev}
                                className="-left-5 absolute  top-1/2 transform -translate-y-1/2 bg-[#FFFFFF] h-6 w-6 rounded-full flex items-center justify-center sm:h-8 sm:w-8 sm:-left-20"
                            >
                                <ChevronLeft color='#000000' size={30} />
                            </button>
                        )}

                        {screenshotData[selectedFile]?.video ? (
                            <video
                                src={screenshotData[selectedFile].video}
                                controls
                                className="w-full max-h-[80vh] object-contain"
                            />
                        ) : (
                            <img
                                src={screenshotData[selectedFile]}
                                alt={`Screenshot ${selectedFile + 1}`}
                                className="w-full max-h-[80vh] object-contain"
                            />
                        )}

                        {selectedFile < screenshotData.length - 1 && (
                            <button
                                onClick={handleNext}
                                className="-right-5 absolute  top-1/2 transform -translate-y-1/2 bg-[#FFFFFF] h-6 w-6 rounded-full flex items-center justify-center sm:h-8 sm:w-8 sm:-right-20"
                            >
                                <ChevronRight color='#000000' size={30} />
                            </button>
                        )}
                    </DialogContent>
                </Dialog>
            )}

        </div>
    );
}

export default Screenshots;