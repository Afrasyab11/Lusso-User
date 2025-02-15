import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BonusBanner from '../../assets/images/bonus_banner.svg';
import CourseBannerTwo from '../../assets/images/course-banner-two.svg';
import CourseBanner from '../../assets/images/course-banner.svg';
import SearchIcon from '../../assets/images/icons/search.svg';
import LeftArrowIcon from '../../assets/images/leftArrowIcon.svg';
import PostBanner from '../../assets/images/post_banner.svg';
import RightArrowIcon from '../../assets/images/rightArrowIcon.svg';
import ExploreCard from '../../components/common/ExploreCard';
import { useScroll } from '../../components/common/ScrollContext';
import CardLoader from '../../components/loaders/card-loader';
import { getCookies } from '../../utils/utils';

const Explore = () => {
  const navigate = useNavigate();
  const [apps, setApps]: any = useState([]);
  const [games, setGames]: any = useState([]);
  const [movies, setMovies]: any = useState([]);
  const [courses, setCourses]: any = useState([]);
  const [services, setServices]: any = useState([]);
  const [loading, setLoading]: any = useState(true);

  const { refs } = useScroll();

  const GoToProductDetails = (productId: string) => {
    navigate(`/newproductdetails/${productId}`);
  };

  const navigateToSpecificType = (type: string) => {
    navigate(`/dev/explore/${type}`)
  }

  const getExploreData = () => {
    setLoading(true);
    const token = getCookies('authToken');
    axios
      .get('https://api.lusso.dev/api/v1/products?size=1000', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        let products: any[] = response.data.products;
        let tempApps: any[] = [];
        let tempGames: any[] = [];
        let tempMovies: any[] = [];
        let tempCourses: any[] = [];
        let tempServices: any[] = [];
        products.forEach(product => {
          if (product.productType === 'Apps') {
            tempApps.push(product);
          } else if (product.productType === 'Games') {
            tempGames.push(product);
          } else if (product.productType === 'Movies') {
            tempMovies.push(product);
          } else if (product.productType === 'Content Courses') {
            tempCourses.push(product);
          } else if (product.productType === 'Services') {
            tempServices.push(product);
          }
        });

        setApps(tempApps);
        setGames(tempGames);
        setMovies(tempMovies);
        setCourses(tempCourses);
        setServices(tempServices);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getExploreData();

  }, []);

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex flex-row w-full explore-banner-container'>
        <div className='w-[60%]'>
          <img className='w-[100%]' src={BonusBanner} alt='Bonus Banner' />
        </div>
        <div className='w-[40%]'>
          <img className='w-[100%]' src={PostBanner} alt='Post Banner' />
        </div>
      </div>
      <div className="browse-marketplace-container">
        <div className="title">
          Browse Marketplace
        </div>
        <div className="desc">
          Browse through more than 10k Products on the LussoLabs Marketplace.
        </div>
        <div className="search-field">
          <input placeholder='Search your favorite Products' type="text" />
          <img src={SearchIcon} alt="" />
        </div>
      </div>
      {apps.length > 0 &&
        <div ref={refs.apps} className='flex flex-col gap-y-3'>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <span className='text-[#F881BC]'>Top Rated Apps</span>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <img src={LeftArrowIcon} alt='Left Arrow Icon' />
              <img src={RightArrowIcon} alt='Right Arrow Icon' />
              <span className='text-[#EFF0F4]' onClick={() => navigateToSpecificType("apps")} style={{ textDecoration: 'underline', cursor: "pointer" }}>View all</span>
            </div>
          </div>
          {loading ?
            <div className='flex flex-row flex-wrap justify-start gap-3'>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            :
            <div className='flex flex-row flex-wrap justify-start gap-3 category-container'>
              {apps.length > 5 ? apps.slice(0, 5).map((card: any) => (
                <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                  <ExploreCard product={card} />
                </div>
              )) : apps.map((card: any) => (
                <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                  <ExploreCard product={card} />
                </div>
              ))}
            </div>
          }
        </div>
      }
      {games.length > 0 &&
        <div ref={refs.games} className='flex flex-col gap-y-3'>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <span className='text-[#F881BC]'>Top Rated Games</span>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <img src={LeftArrowIcon} alt='Left Arrow Icon' />
              <img src={RightArrowIcon} alt='Right Arrow Icon' />
              <span className='text-[#EFF0F4]' onClick={() => navigateToSpecificType("games")} style={{ textDecoration: 'underline', cursor: "pointer" }}>View all</span>
            </div>
          </div>
          {loading ?
            <div className='flex flex-row flex-wrap justify-start gap-3'>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            :
            <div className='flex flex-row flex-wrap justify-start gap-3 category-container'>
              {games.map((card: any) => (
                <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                  <ExploreCard product={card} />
                </div>
              ))}
            </div>
          }
        </div>
      }
      <div className='flex flex-row items-center explore-banner-container'>
        <div className='flex flex-1'>
          <img src={CourseBanner} alt='Course Banner' />
        </div>
        <div className='flex flex-1'>
          <img src={CourseBannerTwo} alt='Course Banner Two' />
        </div>
      </div>
      {movies.length > 0 &&
        <div ref={refs.movies} className='flex flex-col gap-y-3'>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <span className='text-[#F881BC]'>Top Rated Movies</span>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <img src={LeftArrowIcon} alt='Left Arrow Icon' />
              <img src={RightArrowIcon} alt='Right Arrow Icon' />
              <span className='text-[#EFF0F4]' onClick={() => navigateToSpecificType("movies")} style={{ textDecoration: 'underline', cursor: "pointer" }}>View all</span>
            </div>
          </div>
          {loading ?
            <div className='flex flex-row flex-wrap justify-start gap-3'>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            :
            <div className='flex flex-row flex-wrap justify-start gap-3 category-container'>
              {movies.map((card: any) => (
                <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                  <ExploreCard product={card} />
                </div>
              ))}
            </div>
          }
        </div>
      }
      {courses.length > 0 &&
        <div ref={refs.courses} className='flex flex-col gap-y-3'>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <span className='text-[#F881BC]'>Top Rated Courses</span>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <img src={LeftArrowIcon} alt='Left Arrow Icon' />
              <img src={RightArrowIcon} alt='Right Arrow Icon' />
              <span className='text-[#EFF0F4]' onClick={() => navigateToSpecificType("Content Courses")} style={{ textDecoration: 'underline', cursor: "pointer" }}>View all</span>
            </div>
          </div>
          {loading ?
            <div className='flex flex-row flex-wrap justify-start gap-3'>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            :
            <div className='flex flex-row flex-wrap justify-start gap-3 category-container'>
              {courses.map((card: any) => (
                <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                  <ExploreCard product={card} />
                </div>
              ))}
            </div>
          }
        </div>
      }
      {services.length > 0 &&
        <div ref={refs.services} className='flex flex-col gap-y-3'>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <span className='text-[#F881BC]'>Top Rated Services</span>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <img src={LeftArrowIcon} alt='Left Arrow Icon' />
              <img src={RightArrowIcon} alt='Right Arrow Icon' />
              <span className='text-[#EFF0F4]' onClick={() => navigateToSpecificType("services")} style={{ textDecoration: 'underline', cursor: "pointer" }}>View all</span>
            </div>
          </div>
          {loading ?
            <div className='flex flex-row flex-wrap justify-start gap-3'>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
            :
            <div className='flex flex-row flex-wrap justify-start gap-3 category-container'>
              {services.map((card: any) => (
                <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                  <ExploreCard product={card} />
                </div>
              ))}
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Explore;
