
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import demo1 from '../../../assets/images/explore/category/movies/Frame1321315182.png';
import { scrollLeft, scrollRight } from '../../../hooks/common.utils';
import { enableHorizontalScroll } from '../../../lib/ScrollHelper';
import { Dialog, DialogContent, DialogTrigger } from "../../explore/categoryDetails/Common/UiDialouge";
import { LineDraw } from './MovieDetailsScreen';

function Trailer({ trailerData }: { trailerData: string[] | any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string | null>(null);
    const [isTrailer, setIsTrailer] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null | any>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    useEffect(() => {
        const cleanup = enableHorizontalScroll(scrollRef.current);
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeft(scrollLeft > 0);
            setShowRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        const handleScroll = () => checkScrollPosition();
        const currentScrollRef = scrollRef.current;
        currentScrollRef.addEventListener('scroll', handleScroll);

        return () => {
            if (currentScrollRef) {
                currentScrollRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const openModal = (content: string, trailer: boolean = false) => {
        setModalContent(content);
        setIsTrailer(trailer);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null); // Clear content when closing
        setIsTrailer(false);
    };

    return (
        <div className="mb-3 bg-[#111924] rounded-2xl p-5 relative">
            <h2 className="text-xl md:text-3xl font-bold mb-4">Trailers</h2>
            <LineDraw />

            {/* Left scroll control */}
            {showLeft && (
                <button
                    onClick={() => scrollLeft(scrollRef)}
                    className="z-20 absolute -left-3 md:-left-5 top-1/2 transform -translate-y-1/2 bg-[#5721B9] h-9 w-9 rounded-full ps-1"
                    style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}>
                    <ChevronLeft color='#00F0FB' />
                </button>
            )}

            {/* Right scroll control */}
            {showRight && (
                <button
                    onClick={() => scrollRight(scrollRef)}
                    className="z-20 absolute -right-3 md:-right-5 top-1/2 transform -translate-y-1/2 bg-[#5721B9] h-9 w-9 rounded-full ps-1.5"
                    style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}>
                    <ChevronRight color='#00F0FB' />
                </button>
            )}

            <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-none" ref={scrollRef}>
                {trailerData?.map((trailer: any, index: number) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <img
                                key={index}
                                src={demo1}
                                // src={trailer.thumbnail} // Assuming thumbnail image for trailer
                                alt={`Trailer ${index + 1}`}
                                className="w-[30rem] h-[15rem] object-cover cursor-pointer"
                            // onClick={() => openModal(trailer.url, true)} // Open modal with trailer URL
                            />
                        </DialogTrigger>
                        <DialogContent className="max-w-7xl">
                            <video width="100%" controls>
                                <source src={trailer.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>

            {/* Modal for trailer */}
            {isModalOpen && modalContent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white rounded-lg p-4 relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold">X</button>
                        {isTrailer ? (
                            <video width="100%" controls>
                                <source src={modalContent} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Trailer;

// import { useState } from 'react';
// import demo1 from '../../../assets/images/explore/category/movies/Frame1321315182.png';
// import demo2 from '../../../assets/images/explore/category/movies/image31.png';
// import demo3 from '../../../assets/images/explore/category/movies/image33.png';
// import { LineDraw } from './MovieDetailsScreen';

// function Trailor({ trailerData }: any) {

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalContent, setModalContent] = useState<string | undefined>(undefined);
//     const [isTrailer, setIsTrailer] = useState(false);

//     // Function to open the modal with specific content
//     const openModal = (content: string, trailer: boolean = false) => {
//         setModalContent(content);
//         setIsTrailer(trailer);
//         setIsModalOpen(true);
//     };

//     // Function to close the modal
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setModalContent(undefined); // Clear content when closing
//         setIsTrailer(false);
//     };

//     return (
//         <div className="mb-3 bg-[#111924] rounded-2xl p-5">
//             <h2 className="text-xl font-bold mb-4">Trailers</h2>
//             <LineDraw />
//             <div className="flex overflow-x-auto space-x-4">
//                 {/* Display dynamic trailerData if available, else fallback to demo images */}
//                 {trailerData && trailerData.length > 0 ? (
//                     trailerData.map((trailer: any, index: number) => (
//                         <img
//                             key={index}
//                             src={demo1} // Assuming you have placeholder images for trailers
//                             alt={`Trailer ${index + 1}`}
//                             className="w-36 h-48 rounded-lg cursor-pointer"
//                             onClick={() => openModal(trailer.url, true)} // Using the trailer URL dynamically
//                         />
//                     ))
//                 ) : (
//                     // Fallback to demo images if no trailerData is available
//                     <>
//                         <img
//                             src={demo1}
//                             alt="Screenshot 1"
//                             className="w-72 h-48 rounded-lg cursor-pointer"
//                             onClick={() => openModal(demo1)}
//                         />
//                         <img
//                             src={demo2}
//                             alt="Screenshot 2"
//                             className="w-72 h-48 rounded-lg cursor-pointer"
//                             onClick={() => openModal(demo2)}
//                         />
//                         <img
//                             src={demo3}
//                             alt="Screenshot 3"
//                             className="w-72 h-48 rounded-lg cursor-pointer"
//                             onClick={() => openModal(demo3)}
//                         />
//                     </>
//                 )}
//             </div>

//             {/* Modal for trailer or images */}
//             {isModalOpen && modalContent && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
//                     <div className="bg-white rounded-lg p-4 relative">
//                         <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold">X</button>
//                         {isTrailer ? (
//                             <video width="560" height="315" controls>
//                                 <source src={modalContent} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         ) : (
//                             <img src={modalContent} alt="Modal Content" className="max-w-half max-h-full" />
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Trailor;

// import { useState } from 'react';
// import demo1 from '../../../assets/images/explore/category/movies/Frame1321315182.png';
// import demo2 from '../../../assets/images/explore/category/movies/image31.png';
// import demo3 from '../../../assets/images/explore/category/movies/image33.png';
// import { LineDraw } from './MovieDetailsScreen';

// // YouTube trailer URL for "Oppenheimer"
// const trailerUrl = 'https://www.youtube.com/embed/uYPbbksJxIg';

// function Trailor() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalContent, setModalContent] = useState<string | undefined>(undefined);
//     const [isTrailer, setIsTrailer] = useState(false);

//     // Function to open the modal with specific content
//     const openModal = (content: string, trailer: boolean = false) => {
//         setModalContent(content);
//         setIsTrailer(trailer);
//         setIsModalOpen(true);
//     };

//     // Function to close the modal
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setModalContent(undefined); // Clear content when closing
//         setIsTrailer(false);
//     };

//     return (
//         <div className="mb-3 bg-[#161328] rounded-2xl p-5">
//             <h2 className="text-xl font-bold mb-4">Trailer & Snapshot</h2>
//             <LineDraw />
//             <div className="flex overflow-x-auto space-x-4 scrollbar-none">
//                 <img
//                     src={demo1}
//                     alt="Screenshot 1"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(trailerUrl, true)}
//                 />
//                 <img
//                     src={demo2}
//                     alt="Screenshot 2"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(demo2)}
//                 />
//                 <img
//                     src={demo3}
//                     alt="Screenshot 3"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(demo3)}
//                 />
//                 <img
//                     src={demo1}
//                     alt="Screenshot 1"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(trailerUrl, true)}
//                 />
//                 <img
//                     src={demo2}
//                     alt="Screenshot 2"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(demo2)}
//                 />
//                 <img
//                     src={demo3}
//                     alt="Screenshot 3"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(demo3)}
//                 />
//                 <img
//                     src={demo1}
//                     alt="Screenshot 1"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(trailerUrl, true)}
//                 />
//                 <img
//                     src={demo2}
//                     alt="Screenshot 2"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(demo2)}
//                 />
//                 <img
//                     src={demo3}
//                     alt="Screenshot 3"
//                     className="w-72 h-48 rounded-lg cursor-pointer"
//                     onClick={() => openModal(demo3)}
//                 />
//             </div>

//             {/* Modal for trailer or images */}
//             {isModalOpen && modalContent && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
//                     <div className="bg-white rounded-lg p-4 relative">
//                         <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold">X</button>
//                         {isTrailer ? (
//                             <iframe
//                                 width="560"
//                                 height="315"
//                                 src={modalContent}
//                                 title="Oppenheimer Trailer"
//                                 frameBorder="0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                             ></iframe>
//                         ) : (
//                             <img src={modalContent} alt="Modal Content" className="max-w-full max-h-full" />
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Trailor;
