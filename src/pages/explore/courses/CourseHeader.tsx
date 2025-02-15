import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import dislike from "../../../assets/images/products/productDetails/dislike.png";
import disliked from "../../../assets/images/products/productDetails/disliked.png";
import like from "../../../assets/images/products/productDetails/like.png";
import liked from "../../../assets/images/products/productDetails/liked.png";
import wishlist1 from "../../../assets/images/products/productDetails/wishlist-1.png";
import wishlist2 from "../../../assets/images/products/productDetails/wishlist-2.png";


const CourseHeader = ({ headerData, handleUserAction, product, isCreator = false }: any) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (product) {
            setLoading(false);
        }
    }, [product]);

    const handleWishlistClick = () => {
        setLoading(true);
        handleUserAction('wishlist');
    }
    return (
        <div className="flex items-center mb-8 gap-5 flex-col md:flex-row">
            <div>
                <img src={headerData?.logo} alt={`${headerData?.title} logo`} className='w-[300px] h-[300px] rounded-2xl' />
            </div>
            <div className='flex flex-col items-center md:items-start justify-between gap-3'>
                <div className='flex flex-col items-center md:items-start'>
                    <p className='hidden md:block text-md text-[#6DDCFF] font-semibold text-center md:text-start'>{headerData?.titleHeader}</p>
                    <h1 className="text-xl md:text-4xl font-bold text-center md:text-start">{headerData?.title}</h1>
                    <h2 className='text-md text-center md:text-start'>{headerData?.subTitle}</h2>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-white text-md flex flex-wrap md:flex-nowrap items-center">
                        <span>{headerData?.rating}</span>
                        <div className='h-4 w-4 mx-2 mb-[2px]'>
                            {/* <img src={starIcon} alt='star' /> */}
                            <Star fill='#FDB31F' color='#FDB31F' size={16} />
                        </div>
                        <span> | {headerData?.ratingCount} | {headerData?.category}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className='flex flex-col items-center md:items-start'>
                        <p className='text-[#6DDCFF] font-semibold'>Created by</p>
                        <p className='text-white text-xl font-bold'>{headerData.author}</p>
                    </div>
                    {!isCreator && <div className="flex gap-2 mt-5">
                        <div className={`border-[1px] ${product?.isLiked ? "border-[#ec94e0]" : "border-[#6e6c7f]"} p-2 rounded-lg cursor-pointer h-10 w-10`} onClick={() => handleUserAction('like')}>
                            {product?.isLiked ? <img className='' src={liked} alt="" /> : <img className='' src={like} alt="" />}
                        </div>
                        <div className={`border-[1px] ${product?.isDisliked ? "border-[#3bd1f9]" : "border-[#6e6c7f]"} p-2 rounded-lg cursor-pointer h-10 w-10`} onClick={() => handleUserAction('dislike')}>
                            {product?.isDisliked ? <img className='' src={disliked} alt="" /> : <img className='' src={dislike} alt="" />}
                        </div>
                        <div className={` ${product?.isWishlisted ? " bg-gradient-to-b from-[#055ebb] to-[#3bd1f9]" : "bg-gradient-to-r from-[#8626f4] to-[#ec94e0]"} p-2 rounded-lg flex items-center gap-2 cursor-pointer h-10 w-44 overflow-hidden relative ${loading ? 'cursor-not-allowed bg-gray-600' : ''}`} onClick={handleWishlistClick}>
                            {loading && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 1,
                                    }}
                                >
                                    <div className="" style={{
                                        border: "4px solid rgba(0, 0, 0, 0.1)",
                                        borderLeftColor: "#4b03ce",
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        animation: "spin 1s linear infinite",
                                    }}></div>
                                </div>
                            )}
                            <div className='w-6 h-full'>
                                {product?.isWishlisted ? <img className='h-full w-2 object-contain' src={wishlist2} alt="Wishlist Icon" /> : <img className='h-full w-2 object-contain' src={wishlist1} alt="Wishlist Icon" />}
                            </div>
                            {product?.isWishlisted ? <p className='text-white'>Added</p> : <p className='text-white'>Add to Wishlist</p>}
                        </div>
                    </div>}
                    {/* <div>
                    <p className='text-[#6DDCFF] font-semibold'>Age Rating</p>
                    <p className='text-white'>{headerData.ageRating}</p>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default CourseHeader