import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TitleBar from '../../components/common/TitleBar';
import ProductCardNew from '../home/ProductCardNew';
import "../home/home.scss";


const TrendingProducts = (props: any) => {
  const navigate = useNavigate();
  const { data, hideHeading, allRowDataPopulation } = props;
  const isMobile = window?.innerWidth < 768; // Example mobile breakpoint

  // Split data into rows only if it's not a mobile view
  const rows = !allRowDataPopulation
    ? isMobile
      ? [data]
      : [data.slice(0, 4), data.slice(4, 8)]
    : [data];

  const getCategoryPath = (category: string, title: string) => {
    const categoryPath =
      category?.toLowerCase() === "ai" || category?.toLowerCase() === "ai products"
        ? "ai"
        : category?.toLowerCase() === "movie" || category?.toLowerCase() === "movies"
          ? "movies"
          : category?.toLowerCase() === "course" || category?.toLowerCase() === "courses"
            ? "courses"
            : category?.toLowerCase() === "game" || category?.toLowerCase() === "games"
              ? "games"
              : category?.toLowerCase() === "service" || category?.toLowerCase() === "services"
                ? "services"
                : category?.toLowerCase() === "app" || category?.toLowerCase() === "apps"
                  ? "apps"
                  : title === "RECOMMENDATIONS"
                    ? "apps"
                    : category?.toLowerCase();

    return categoryPath
  };

  const isLoggedIn = () => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken='));
    return token !== 'authToken=';
  }

  console.log({ rows })

  return (
    <>
      {!hideHeading && <TitleBar title={'Trending Now'} isPopup={props?.isPopup || false} />}
      <div
        //  {/* Flex on mobile, wraped using flex-wrap class, before used flex-nowrap */}
        className={`overflow-x-auto ${props?.isLandingPage ? 'min-h-[300px]' : 'md:min-h-[600px]'} overflow-y-hidden flex md:mb-0 mb-[10px] md:gap-[1.4rem] gap-2 ${isMobile ? 'flex-wrap' : 'flex-wrap'
          }`}
      >
        {/* Flex on mobile, wrap on larger screens */}
        {rows.map((row, rowIndex) =>
          row.map((item: any) => {
            const categoryPath = getCategoryPath(item.category, item.title);
            console.log({ categoryPath })
            return (
              <div
                key={item.id}
                className={`trending-product-item ${isMobile ? 'trending-product-mobile' : 'trending-product-web'
                  }`}
              >
                <ProductCardNew
                  item={item}
                  navigateDetails={(id: number) => isLoggedIn() ? navigate(`/explore/${categoryPath}/details/${id}`) : toast.warning("Please log in to add items to your wishlist.", {
                    onClose: () => navigate(`/login`), // Navigate after showing the message
                  })}
                  width={isMobile ? '150px' : '250px'}
                  height={isMobile ? '200px' : '280px'}
                  homeTrending={true}
                />
              </div>
            );
          }),
        )}
      </div>
    </>
  );
};

export default TrendingProducts;
