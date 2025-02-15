import { useState } from 'react';
import lussoIcon from '../../assets/images/calender/lusso.svg';

import { BiBookmark, BiSolidMessageRounded } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { HiMiniBookmark } from 'react-icons/hi2';
import { LuMessageCircle } from 'react-icons/lu';
import { RiHeartsFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { PostCard } from './postView/PostCard';
import { PostDrawer } from './postView/PostDrawer';

export default function PostView() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeView, setActiveView] = useState('desktop');
    const location: any = useLocation()
    const postData = location.state?.postData;
    console.log({ postData })
    const handleViewChange = (view: string) => {
        setActiveView(view);
        setIsDrawerOpen(view === 'desktop');
    };

    const statsDesktop = [
        { icon: <FaRegHeart color="white" size="1.5rem" />, value: '6.2k' },
        { icon: <LuMessageCircle color="white" size="1.5rem" />, value: '245' },
        { icon: <FiSend color="white" size="1.5rem" />, value: '245' },
        { icon: <BiBookmark color="white" size="1.5rem" />, value: '285' },
    ];

    const drawerContent = (
        <div className="flex flex-col justify-between h-full p-4 text-white">
            <div>
                <div className="flex items-center mb-4">
                    <img
                        src={postData?.media[0]}
                        alt="lusso"
                        className="border border-[#665ba6] rounded-full px-3 py-3 mr-3 w-10 h-10"
                    />
                    <p className="text-lg font-semibold">{postData?.firstCommentText ?? "Fcaebook Post"}</p>
                </div>
                <p className="text-sm ">
                    {postData?.text ?? ""}
                </p>
            </div>
            <div className="flex justify-between items-center border-t border-[#2c245d] pt-4 mt-4">
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <FaRegHeart size="1.2rem" color="white" />
                        <span className="text-sm ml-1">{postData?.providers?.length}</span>
                    </div>
                    <div className="flex items-center">
                        <LuMessageCircle size="1.2rem" color="white" />
                        <span className="text-sm ml-1">456</span>
                    </div>
                    <div className="flex items-center">
                        <FiSend size="1.2rem" color="white" />
                        <span className="text-sm ml-1">345</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <BiBookmark size="1.2rem" color="white" />
                    <span className="text-sm ml-1">900</span>
                </div>
            </div>
        </div>
    );

    const statsMobile = [
        { icon: <RiHeartsFill color="#a3a0af" size="1.5rem" />, value: '6.2k' },
        { icon: <BiSolidMessageRounded color="#a3a0af" size="1.5rem" />, value: '245' },
        { icon: <HiMiniBookmark color="#a3a0af" size="1.5rem" />, value: '285' },
    ];

    return (
        <div className="text-center">
            <div className={`transition-transform duration-500 items-center ease-in-out ${isDrawerOpen ? 'translate-x-[-50%]' : 'translate-x-0'
                } inline-block bg-[#41509b] rounded-full`}>
                {['desktop', 'mobile']?.map((view) => (
                    <button
                        key={view}
                        className={`py-3 px-4 md:w-56 w-40 text-white text-lg rounded-full ${activeView === view ? 'bg-[#2d246b]' : ''
                            }`}
                        onClick={() => handleViewChange(view)}
                    >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                ))}
            </div>

            {/* Desktop View */}
            {activeView === 'desktop' && (
                <div
                    className={`mt-8 mx-auto items-center transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-[-50%]' : ''} md:w-[40%] w-full`}
                >
                    <img src={postData?.media[0]} alt="Desktop View" className="w-full" />
                </div>
            )}
            {activeView === 'desktop' && (
                <PostDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} content={drawerContent} />
            )}

            {/* Mobile View */}
            {activeView === 'mobile' && (
                <div className="md:w-[40%] w-full mx-auto mt-8">
                    <PostCard
                        icon={lussoIcon}
                        title="Lusso.ai"
                        subtitle="Marketing Agency"
                        image={postData?.media[0]}
                        stats={statsMobile}
                        description={postData?.text}
                        isMobile
                    />
                </div>
            )}
        </div>
    );
}
