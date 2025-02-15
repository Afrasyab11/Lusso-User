import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect } from 'react';
import FullStar from '../../assets/images/full-start.svg';
import HalfStar from '../../assets/images/half-star.svg';
import { getCookies } from '../../utils/utils';
import './styles.scss';

interface Review {
  review: string,
  rating: number,
  addedOn: string,
  addedBy: string
}
interface CarouselProps {
  productId: string | undefined;
  images: string[];
  tags: string[];
  name: string;
  website: string;
  reviews: Review[];
  isWishlisted: boolean;
  rating: number;
  ratingCount: number;
  setWishListed: (wishlisted: boolean) => void;
}

const CarouselComponent: React.FC<CarouselProps> = ({ productId, images, tags, name, website, reviews, isWishlisted, setWishListed, rating, ratingCount }) => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   arrows: false
  // };

  // const tags = ['Innovative', "Games"];
  useEffect(() => {
    console.log('Carousel component rendered');
  }, []);

  const AddToWishList = () => {
    const token = getCookies('authToken');
    axios
      .post(`https://api.lusso.dev/api/v1/wishlist?productId=${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log('reviews-------------------', response.data?.message);
        setWishListed(true);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  const isImage = (image: string) => {
    const extension = image.split('.').pop()?.toLowerCase();

    const validImageExtensions: any = [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "bmp",
      "tiff",
      "svg"
    ];

    return validImageExtensions.includes(extension);
  }

  return (
    <div className="carousel-container">
      <Carousel pauseOnHover>
        {images.map((image, index) => (
          <div className="carousel-img-container">
            {
              isImage(image) ?
                <img src={image} alt={`Slide ${index + 1}`} />
                :
                <video loop muted src={'https://file-examples.com/storage/fed5266c9966708dcaeaea6/2017/04/file_example_MP4_640_3MG.mp4'} autoPlay />
            }
          </div>
        ))
        }
      </Carousel>
      <div className="carousel-info-container">
        <div className="carousel-text">
          <div className='flex flex-row justify-between w-[100] carousel-data-container'>
            <div className='flex flex-col items-start product-meta-data-container'>
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
              <div>
                <span className='text-[#FFF]' style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                  {name}
                </span>
              </div>
            </div>
            <div className='flex flex-row gap-x-3 items-end carousel-action-btn-container'>
              {
                isWishlisted ?
                  <div className='banner-btn' style={{ backgroundColor: '#7D3CF3' }}>
                    <button className='flex flex-row gap-1 justify-center items-center'>
                      <div className='red-heart'></div>
                      <div className='wish-list-text'>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>WishListed</span>
                      </div>
                    </button>
                  </div>
                  :
                  <div className='banner-btn'
                    onClick={AddToWishList}
                  >
                    <button className='flex flex-row gap-1 justify-center items-center'>
                      <div className='heart'></div>
                      <div className='wish-list-text'>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>WishList</span>
                      </div>
                    </button>
                  </div>
              }
              {/* <div className='banner-btn'>
                        <button className='flex flex-row gap-x-2 items-center'>
                          <img style={{width:20, height:20}} src={Save} alt='' />
                          <div>
                            Save
                          </div>
                        </button>
                    </div> */}
              {
                website &&
                <div onClick={() => { window.open(website) }} className='banner-btn bg-[#7D3CF3]'>
                  <button>
                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>
                      Visit Website
                    </span>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default CarouselComponent;