import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FullStar from '../../assets/images/full-start.svg';
import HalfStar from '../../assets/images/half-star.svg';
import LeftArrowIcon from '../../assets/images/leftArrowIcon.svg';
import PlusIcon from '../../assets/images/plus-icon-white.svg';
import RightArrowIcon from '../../assets/images/rightArrowIcon.svg';
import ExploreCard from '../../components/common/ExploreCard';
import StarRating from '../../components/common/StarRating';
import Carousel from '../../components/slider/Carousel';
import { getCookies } from '../../utils/utils';
import './styles.scss';

interface Review {
  review: string,
  rating: number,
  addedOn: string,
  addedBy: string
}

interface JwtPayload {
  role: string;
}

const ViewProductDetails = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { productId }: { productId?: string } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productType, setProductType] = useState('');
  const [tags, setTags] = useState([]);
  const [website, setWebsite] = useState('');
  const [creator, setCreator] = useState('');
  const [images, setImages]: any = useState([]);
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0.0);
  const [ratingCount, setRatingCount] = useState(0);
  const [similarProducts, setSimilarProducts]: any[] = useState([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [addReviewFlag, setAddReviewFlag]: any = useState(false);
  const [newReview, setNewReview] = useState<Review>({
    review: '',
    rating: 0,
    addedOn: '',
    addedBy: ''
  });
  const [isWishlisted, setWishlisted]: any = useState(false);
  const scrollToContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onCancel = () => {
    setAddReviewFlag(false);
    setNewReview({
      review: '',
      rating: 0,
      addedOn: '',
      addedBy: ''
    });
  }

  const onSave = () => {
    const token = getCookies('authToken');
    if (!token) {
      console.error('No auth token found');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const request = {
      rating: newReview.rating,
      review: newReview.review,
      productId: productId
    };

    // console.log('request$$$$$$$$$$', request)

    axios.post('https://api.lusso.dev/api/v1/reviews', request, { headers })
      .then(response => {
        // console.log('Review saved successfully:', response.data);
        setAddReviewFlag(false);
        GetReviews();
      })
      .catch(error => {
        console.error('Error saving review:', error);
      });
  };

  const GetExploreData = () => {
    setLoading(true);
    const token = getCookies('authToken');

    axios
      .get(`https://api.lusso.dev/api/v1/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const product = response.data;

        console.log("product", product)

        let currentProductType = '';

        // Find the current product and set its type

        if (product.productId === productId) {
          currentProductType = product.productType;
          setProduct(product);
          setProductDesc(product?.description);
          setName(product?.name);
          setCreatedOn(product?.createdOn);
          setRating(product?.rating);
          setRatingCount(product?.ratingCount);
          if (product?.images?.length === 1) {
            let tempImages = [];
            tempImages.push(product?.images[0]);
            tempImages.push(product?.images[0]);
            setImages(tempImages);
          } else {
            setImages(product?.images);
          }
          setTags(product?.tags);
          setWebsite(product?.websiteLink);
          setCreator(product?.createdBy);
          setProductType(currentProductType);
          // setWishlisted(true);
        }


        // console.log('currentProductType', currentProductType);

        // Filter similar products
        // const similarProducts = products.filter((product: any) => product.productType === currentProductType);
        axios
          .get(`https://api.lusso.dev/api/v1/similarProducts?productId=${productId}&productType=${currentProductType}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            setSimilarProducts(response.data.products);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
    // let tempReviews = [
    //     {
    //         userName : 'Jeff Bezos',
    //         review : "Red Dead Redemption 2, the magnum opus from Rockstar Games, isn't just a video game; it's a sprawling, living canvas that transports players to the dying days of the American frontier.",
    //         rating: 4
    //     },
    //     {
    //         userName : 'Sundar',
    //         review : "Red Dead Redemption 2, the magnum opus from Rockstar Games, isn't just a video game; it's a sprawling, living canvas that transports players to the dying days of the American frontier.",
    //         rating: 3
    //     },
    // ];
    // setReviews(tempReviews);
  };

  const GetReviews = () => {
    setLoading(true);
    const token = getCookies('authToken');

    axios
      .get(`https://api.lusso.dev/api/v1/reviews?productId=${productId}&size=10000&page=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const reviews = response.data?.reviews;
        // console.log('reviews', reviews);
        setReviews(reviews);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  const GoToProductDetails = (productId: any) => {
    scrollToContainer();
    navigate(`/newproductdetails/${productId}`);
  }

  useEffect(() => {
    GetExploreData();
    GetReviews();
  }, [productId])


  return (

    <div className='flex flex-col gap-y-6' ref={containerRef}>
      <div>
        <Carousel
          productId={productId}
          images={images} name={name} tags={tags} website={website} reviews={reviews}
          isWishlisted={isWishlisted}
          setWishListed={setWishlisted}
          rating={rating}
          ratingCount={ratingCount}
        />
      </div>
      <div className='details-container'>
        <div className='review-container gap-y-2'>
          <div className="product-details-carousel-content">
            {/* banner-data-container */}
            <div className='flex flex-col items-start mobile-product-meta-data-container'>
              {
                reviews.length === 0 ?
                  <div className='ml-2'>
                    <span className='text-[#FFF]' style={{ fontSize: '12px' }}>0 Ratings</span>
                  </div>
                  :
                  <div className='flex flex-row items-center'>
                    {
                      [1, 2, 3, 4].map((star) => {
                        return (
                          <img style={{ width: 16, height: 16 }} src={FullStar} alt="" />
                        )
                      })
                    }
                    <div>
                      <img style={{ width: 16, height: 16 }} src={HalfStar} alt='' />
                    </div>
                    <div className='ml-2'>
                      <span className='text-[#FFF]' style={{ fontSize: '12px' }}> {rating} ({ratingCount} Rating)</span>
                    </div>
                  </div>
              }
              <div className='flex flex-row gap-x-2'>
                {
                  tags.map((tag: any) => {
                    return (
                      <div className='bg-[#7D3CF380] px-3 py-1' style={{ borderRadius: 8, fontSize: 'small', fontWeight: 500 }}>
                        <span>#{tag}</span>
                      </div>
                    )
                  })
                }
              </div>
              <div className='prod-name-container'>
                <span className='text-[#FFF]' style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                  {name}
                </span>
              </div>
            </div>
            {/* banner-data-container */}
          </div>
          <div className='flex flex-row items-center justify-between published-details-container'>
            <div className='flex flex-col gap-y-2 items-start'>
              <div>
                <span className='subheader'>
                  Published By
                </span>
              </div>
              <div>
                <span className='subheadervalue'>
                  {creator}
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-y-2 items-start'>
              <div>
                <span className='subheader'>
                  Published Date
                </span>
              </div>
              <div>
                <span className='subheadervalue'>
                  {createdOn.substring(0, 10)}
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-y-2 items-start'>
              <div>
                <span className='subheader'>
                  Download Size
                </span>
              </div>
              <div>
                <span className='subheadervalue'>
                  500 MB
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-y-2 items-start'>
              <div>
                <span className='subheader'>
                  No. Likes
                </span>
              </div>
              <div>
                <span className='subheadervalue'>
                  20K+
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-2 items-start prod-details-desc-container'>
            <div>
              <span className='subheader text-[#999999]'>Product Description</span>
            </div>
            <div>
              <span className='text-[#FFF]' style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                {
                  productDesc
                }
              </span>
            </div>
          </div>
        </div>
        <div className='review-container gap-y-3 mt-6'>
          <div className='flex flex-row items-center justify-between prod-details-rating-container'>
            <div>
              <div className='text-[#999999]'>
                <span>Reviews</span>
              </div>
              {
                reviews.length === 0 ?
                  <span className='text-[#FFF]' style={{ fontSize: '12px' }}> No Ratings</span>
                  :
                  <div className='flex flex-row items-center'>
                    {
                      [1, 2, 3, 4].map((star) => {
                        return (
                          <img style={{ width: 16, height: 16 }} src={FullStar} alt="" />
                        )
                      })
                    }
                    <div>
                      <img style={{ width: 16, height: 16 }} src={HalfStar} alt='' />
                    </div>
                    <div className='ml-2'>
                      <span className='text-[#FFF]' style={{ fontSize: '12px' }}> {rating} ({ratingCount} Rating)</span>
                    </div>
                  </div>
              }
            </div>
            <div>
              <button
                onClick={() => { setAddReviewFlag(true) }}
                className='flex flex-row items-center justify-around bg-[#342F58] text-[#FFFFFF] p-2 add-review-btn' style={{ borderRadius: 8 }}>
                <img style={{ width: 16, height: 16 }} src={PlusIcon} alt='' />
                <span style={{ fontSize: '14px' }}>Add Your Review</span>
              </button>
            </div>
          </div>
          {
            addReviewFlag ?
              <div>
                <div>
                  <label>
                    <span className="text-white font-normal text-[14px]">
                      Review:
                    </span>
                    <textarea
                      autoComplete="off"
                      placeholder="Enter your review"
                      className="ac-frm-input rounded-pill badge h-[50px]"
                      value={newReview.review || ''}
                      style={{
                        borderRadius: 16,
                        background: 'rgba(4, 4, 4, 0.20)',
                        marginTop: 10,
                        height: 100,
                        padding: 10, // Adding padding for better text area styling
                        resize: 'none', // Preventing the text area from being resized
                      }}
                      onChange={e => {
                        setNewReview({ ...newReview, review: e.target.value });
                      }}
                    />
                  </label>
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <span className="text-white font-normal text-[14px]">
                    Rating:
                  </span>
                  <StarRating
                    size={20}
                    edit={false}
                    value={newReview.rating}
                    onChange={(newValue: number) => {
                      // console.log('newValue$$$$$$$$$$', newValue)
                      setNewReview({ ...newReview, rating: newValue });
                    }}
                  />
                </div>
                <div className="flex flex-row justify-center items-center gap-12">
                  <button
                    onClick={() => {
                      onCancel()
                    }}
                    className="saveContinue mt-10"
                    style={{
                      borderRadius: 50,
                      border: '1px solid #FFF',
                      textTransform: 'capitalize',
                      paddingLeft: 36,
                      paddingRight: 36,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSave}
                    className="saveContinue mt-10"
                    style={{
                      borderRadius: 50,
                      border: '1px solid #A768FD',
                      background:
                        'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                      textTransform: 'capitalize',
                      paddingLeft: 36,
                      paddingRight: 36,
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              :
              ''
          }
          {
            reviews.length === 0 ?
              <div className='text-[#999999] flex flex-row justify-center items-center p-6'>
                <span>No Reviews yet</span>
              </div>
              :
              reviews.map((item: Review) => {
                return (
                  <div className='flex flex-col justify-center w-[100] bg-[#342F58] p-3 gap-y-2' style={{ borderRadius: 8 }}>
                    <div className='flex flex-row items-center justify-between'>
                      <div>
                        <span className='text-[#B48EFB]' style={{ fontSize: '1rem' }}>{item?.addedBy}</span>
                      </div>
                      <div className='flex flex-row items-center bg-[#252141] px-3' style={{ border: '1px solid #262626', borderRadius: '32px' }}>
                        {
                          Array.from({ length: item?.rating }, (_, index) => index).map((star) => {
                            return (
                              <img style={{ width: 16, height: 16 }} src={FullStar} alt="" />
                            )
                          })
                        }
                        {
                          Array.from({ length: 5 - item?.rating }, (_, index) => index).map((star) => {
                            return (
                              <img style={{ width: 16, height: 16 }} src={HalfStar} alt="" />
                            )
                          })
                        }
                        <div className='ml-2'>
                          <span className='text-[#FFF]' style={{ fontSize: '12px' }}> {item?.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className='text-[#FFF]' style={{ fontSize: '0.9rem' }}>
                        {
                          item?.review
                        }
                      </span>
                    </div>
                  </div>
                )
              })
          }

        </div>
        {
          similarProducts.length > 0 &&
          <div className='flex flex-col gap-y-3 mt-4'>
            <div className='flex flex-row items-center justify-between'>
              <div>
                <span className='text-[#F881BC]'>
                  Similar {productType}
                </span>
              </div>
              <div className='flex flex-row items-center gap-x-2'>
                <img src={LeftArrowIcon} alt='' />
                <img src={RightArrowIcon} alt='' />
                <span className='text-[#EFF0F4]' style={{ textDecoration: 'underline' }}>View all</span>
              </div>
            </div>
            <div className='flex flex-row flex-wrap justify-start gap-3 similar-products-container'>
              {
                similarProducts.map((card: any) => {
                  return (
                    <div
                      onClick={() => { GoToProductDetails(card?.productId) }}
                    >
                      <ExploreCard
                        product={card} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ViewProductDetails;