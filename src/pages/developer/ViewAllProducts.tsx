import { useState } from 'react';
import BonusBanner from '../../assets/images/bonus_banner.svg';
import LeftArrowIcon from '../../assets/images/leftArrowIcon.svg';
import PostBanner from '../../assets/images/post_banner.svg';
import RightArrowIcon from '../../assets/images/rightArrowIcon.svg';
import ExploreCard from '../../components/common/ExploreCard';

const Explore = () => {
    const [cards, setCards] = useState([1, 1, 1, 1]);
    const [trendingCards, setTrendingCards] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);
    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex flex-row w-full'>
                <div className='w-[60%]'>
                    <img className='w-[100%]' src={BonusBanner} alt='' />
                </div>
                <div className='w-[40%]'>
                    <img className='w-[100%]' src={PostBanner} alt='' />
                </div>
            </div>
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <span className='text-[#F881BC]'>
                            Top Rated Games
                        </span>
                    </div>
                    <div className='flex flex-row items-center gap-x-2'>
                        <img src={LeftArrowIcon} alt='' />
                        <img src={RightArrowIcon} alt='' />
                        <span className='text-[#EFF0F4]' style={{ textDecoration: 'underline' }}>View all</span>
                    </div>
                </div>
                <div className='flex flex-row justify-around gap-3'>
                    {
                        cards.map((card) => {
                            return (
                                <ExploreCard />
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <span className='text-[#F881BC]'>
                            Top Rated Games
                        </span>
                    </div>
                    <div className='flex flex-row items-center gap-x-2'>
                        <img src={LeftArrowIcon} alt='' />
                        <img src={RightArrowIcon} alt='' />
                        <span className='text-[#EFF0F4]' style={{ textDecoration: 'underline' }}>View all</span>
                    </div>
                </div>
                <div className='flex flex-row justify-around gap-3'>
                    {
                        cards.map((card) => {
                            return (
                                <ExploreCard />
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <span className='text-[#F881BC]'>
                            Top Rated Games
                        </span>
                    </div>
                    <div className='flex flex-row items-center gap-x-2'>
                        <img src={LeftArrowIcon} alt='' />
                        <img src={RightArrowIcon} alt='' />
                        <span className='text-[#EFF0F4]' style={{ textDecoration: 'underline' }}>View all</span>
                    </div>
                </div>
                <div className='flex flex-row justify-around gap-3'>
                    {
                        cards.map((card) => {
                            return (
                                <ExploreCard />
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <span className='text-[#F881BC]'>
                            Top Rated Games
                        </span>
                    </div>
                    <div className='flex flex-row items-center gap-x-2'>
                        <img src={LeftArrowIcon} alt='' />
                        <img src={RightArrowIcon} alt='' />
                        <span className='text-[#EFF0F4]' style={{ textDecoration: 'underline' }}>View all</span>
                    </div>
                </div>
                <div className='flex flex-row justify-around gap-3'>
                    {
                        cards.map((card) => {
                            return (
                                <ExploreCard />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default Explore;