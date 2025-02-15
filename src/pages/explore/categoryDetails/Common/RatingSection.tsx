import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { toast } from "react-toastify";
import AddReview from '../../../../assets/images/AddReview.png';
import { getCookies } from '../../../../utils/utils';
import { LineDraw } from '../GameDetailsScreen';
import RatingDisplay from './RatingDisplay';

export interface RatingSectionProps {
    starDistribution: any;
    rating: number;
    ratingTotal: number;
    ratingDataAverage: any,
    reviews: Array<{
        review: string;
        reviewDescription: string;
        addedBy: string;
        addedOn: string;
    }>;
}

const capitalize = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

function RatingSection({ ratingData, productId, product, ratingDataAverage, isCreator = false }: RatingSectionProps | any) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    const [review, setReview] = useState('');
    const [reviewDescription, setReviewDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const ratingChanged = (newRating: any) => {
        setRating(newRating);
        setError('');
    };
    const [reviews, setReviews]: any = useState([]);

    const getReviews = () => {
        const token = getCookies('authToken');
        axios
            .get(
                `https://api.lusso.dev/api/v1/reviews?productId=${productId}&page=0&size=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(response => {
                let reviews: any = response.data?.reviews;
                setReviews(reviews);
            })
            .catch(error => {
                console.log('error', error);
                setLoading(false);
            });
    };
    useEffect(() => {
        getReviews()
    }, [productId]);
    const handleUserAction = (actionType: any) => {
        const token = getCookies('authToken');
        if (rating === 0) {
            setError('Rating is required');
            return
        } else {
            setError('');
        }
        setLoading(true);

        axios
            .post(
                'https://api.lusso.dev/api/v1/reviews',
                {
                    review,
                    reviewDescription,
                    rating,
                    productId: productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setRating(0);
                setReview('');
                setReviewDescription('');
                setUserName('');
                setIsOpen(false);
                toast.success('Review added successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {
                        background: '#2E246C',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: '8px',
                        padding: '16px',
                        marginTop: 50
                    }
                });
                getReviews()
            })
            .finally(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
                setLoading(false);
            });
    };

    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-3xl font-bold">Ratings and Reviews</h2>
                {!isCreator && <button
                    className="flex items-center justify-center ml-2"
                    style={{ height: 'auto' }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src={AddReview}
                        alt="Add Review"
                        className="flex items-center justify-center ml-2 bg-transparent"
                        style={{ maxWidth: '200px', maxHeight: '58px' }}
                    />
                </button>}
            </div>
            <LineDraw />
            {isOpen && (
                <form className="border-2 border-[#415093] rounded-xl px-8 py-4 mb-6" onSubmit={(e: any) => { handleUserAction('submit'); e.preventDefault() }}>
                    <div className="flex flex-col gap-2">
                        <p className="text-[26px] font-semibold">Write a review</p>
                        <p className="text-[12px] font-normal">Select your rating here</p>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={45}
                            color1={'#dcdcdc'}
                            color2={'#ffd700'}
                            value={rating}
                            half={false}

                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <div className="w-full">
                        <p className="text-[12px] font-normal mb-2">Enter your review here</p>
                        <textarea
                            rows={3}
                            className="bg-transparent border border-[#43519a] w-full rounded-lg resize-none"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w- mb-6">
                        <p className="text-[12px] font-normal mb-2">Enter review description</p>
                        <input
                            className="bg-transparent border border-[#43519a] w-full rounded-full resize- py-2 px-4"
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                            placeholder="Enter review description here"
                            required
                        />
                    </div>
                    <div className="w- mb-6">
                        <p className="text-[12px] font-normal mb-2">Enter your name</p>
                        <input
                            className="bg-transparent border border-[#43519a] w-full rounded-full resize- py-2 px-4"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your name here"
                            required
                        />
                    </div>
                    <div className="flex justify-center w-full">
                        <button
                            className="py-1 px-5 w-full text-white rounded-full bg-gradient-to-b from-[#641de6] to-[#d963c6]"
                            disabled={loading}
                            type='submit'
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            )}
            {reviews?.length === 0 ? <h2>No Review Found</h2> : <>
                <div className="md:flex items-center mb-2">
                    <div className="flex mb-1">
                        <RatingDisplay starDistribution={ratingDataAverage} />
                    </div>
                </div>
                {reviews?.map((data: any, index: any) => {
                    const { rating, review, reviewDescription, addedBy, addedOn } = data;

                    return (
                        <div key={index} className="mb-5">
                            <div className="rounded-lg bg-[#111924] p-5">
                                <p className="font-bold text-md flex items-center">
                                    <span>{rating?.toFixed(1)}</span>
                                    <svg
                                        className="mx-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="17"
                                        viewBox="0 0 18 17"
                                        fill="none"
                                    >
                                        <path
                                            d="M9 0L12.1158 4.7114L17.5595 6.21885L14.0416 10.6381L14.2901 16.2812L9 14.301L3.70993 16.2812L3.95845 10.6381L0.440492 6.21885L5.88415 4.7114L9 0Z"
                                            fill="#FD8E1F"
                                        />
                                    </svg>
                                </p>
                                <p>
                                    <span className="text-grey-300 font-normal ms-1 me-1"> | </span>
                                    <span className="text-[#6DDCFF]">{review}</span>
                                </p>
                                <p className="text-lg my-2 text-white">{reviewDescription}</p>
                                <p className="text-lg text-white mt-2">
                                    {capitalize(addedBy)}, {formatDate(addedOn)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </>}
        </div>
    );
}

export default RatingSection;
