import TrendingProduct1 from "../../assets/images/home/trending-products/trending-product-1.png";
import TrendingProduct10 from "../../assets/images/home/trending-products/trending-product-10.png";
import TrendingProduct2 from "../../assets/images/home/trending-products/trending-product-2.png";
import TrendingProduct3 from "../../assets/images/home/trending-products/trending-product-3.png";
import TrendingProduct4 from "../../assets/images/home/trending-products/trending-product-4.png";
import TrendingProduct5 from "../../assets/images/home/trending-products/trending-product-5.png";
import TrendingProduct6 from "../../assets/images/home/trending-products/trending-product-6.png";
import TrendingProduct7 from "../../assets/images/home/trending-products/trending-product-7.png";
import TrendingProduct8 from "../../assets/images/home/trending-products/trending-product-8.png";
import TrendingProduct9 from "../../assets/images/home/trending-products/trending-product-9.png";
import WishList1 from "../../assets/images/home/wishlist/wishlist-1.png";
import WishList10 from "../../assets/images/home/wishlist/wishlist-10.jpg";
import WishList11 from "../../assets/images/home/wishlist/wishlist-11.jpg";
import WishList12 from "../../assets/images/home/wishlist/wishlist-12.jpg";
import WishList13 from "../../assets/images/home/wishlist/wishlist-13.jpg";
import WishList14 from "../../assets/images/home/wishlist/wishlist-14.jpg";
import WishList15 from "../../assets/images/home/wishlist/wishlist-15.jpg";
import WishList16 from "../../assets/images/home/wishlist/wishlist-16.png";
import WishList17 from "../../assets/images/home/wishlist/wishlist-17.jpg";
import WishList18 from "../../assets/images/home/wishlist/wishlist-18.jpg";
import WishList19 from "../../assets/images/home/wishlist/wishlist-19.png";
import WishList2 from "../../assets/images/home/wishlist/wishlist-2.jpg";
import WishList20 from "../../assets/images/home/wishlist/wishlist-20.png";
import WishList21 from "../../assets/images/home/wishlist/wishlist-21.png";
import WishList22 from "../../assets/images/home/wishlist/wishlist-22.png";
import WishList23 from "../../assets/images/home/wishlist/wishlist-23.png";
import WishList24 from "../../assets/images/home/wishlist/wishlist-24.jpg";
import WishList25 from "../../assets/images/home/wishlist/wishlist-25.png";
import WishList26 from "../../assets/images/home/wishlist/wishlist-26.jpg";
import WishList27 from "../../assets/images/home/wishlist/wishlist-27.jpg";
import WishList28 from "../../assets/images/home/wishlist/wishlist-28.jpg";
import WishList29 from "../../assets/images/home/wishlist/wishlist-29.jpg";
import WishList3 from "../../assets/images/home/wishlist/wishlist-3.jpg";
import WishList30 from "../../assets/images/home/wishlist/wishlist-30.jpg";
import WishList4 from "../../assets/images/home/wishlist/wishlist-4.jpg";
import WishList5 from "../../assets/images/home/wishlist/wishlist-5.jpg";
import WishList6 from "../../assets/images/home/wishlist/wishlist-6.jpg";
import WishList7 from "../../assets/images/home/wishlist/wishlist-7.jpg";
import WishList8 from "../../assets/images/home/wishlist/wishlist-8.jpg";
import WishList9 from "../../assets/images/home/wishlist/wishlist-9.jpg";
import AppsIcon1 from "../../assets/images/icons/app-1.png";
import AppsIcon2 from "../../assets/images/icons/app-2.png";
import AppsIcon3 from "../../assets/images/icons/app-3.png";
import AiToolImg1 from "../../assets/images/icons/new1.png";
import AiToolImg2 from "../../assets/images/icons/new2.png";
import AiToolImg3 from "../../assets/images/icons/new3.png";
import AiToolImg4 from "../../assets/images/icons/new4.png";
import AiToolImg5 from "../../assets/images/icons/new5.png";
import AiToolImg6 from "../../assets/images/icons/new6.png";
import AiToolImg7 from "../../assets/images/icons/new7.png";
import AiToolImg8 from "../../assets/images/icons/new8.png";
import SubscriptionIcon1 from "../../assets/images/icons/subscriptions-1.png";
import SubscriptionIcon2 from "../../assets/images/icons/subscriptions-2.png";
import SubscriptionIcon3 from "../../assets/images/icons/subscriptions-3.png";

interface GridDataType {
  id: number;
  icon: any;
  title: any;
  genre: any;
}
const aiToolsData: GridDataType[] = [
  { id: 1, icon: AiToolImg1, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 2, icon: AiToolImg2, title: 'Cod: Black ops', genre: 'Action | Adventure | Strategy' },
  { id: 3, icon: AiToolImg3, title: 'Clash of Clans', genre: 'Action | PVP | Comedy' },
  { id: 4, icon: AiToolImg4, title: 'Fortnite', genre: 'Action | Adventure | Comic' },
  { id: 5, icon: AiToolImg5, title: 'Red Dead Redemption II', genre: 'Action | Adventure | AAA' },
  { id: 6, icon: AiToolImg6, title: 'Deadpool & Wolverine', genre: 'Action | Adventure | Comedy' },
  { id: 7, icon: AiToolImg7, title: 'The Penguin', genre: 'Action | Adventure | Racing' },
  { id: 8, icon: AiToolImg8, title: 'Texas Law', genre: 'Law | Legal Services | Immigration' },
];
const trendingProductsData: GridDataType[] = [
  { id: 1, icon: TrendingProduct1, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 2, icon: TrendingProduct2, title: 'Cod: Black ops', genre: 'Action | Adventure | Strategy' },
  { id: 3, icon: TrendingProduct3, title: 'Clash of Clans', genre: 'Action | PVP | Comedy' },
  { id: 4, icon: TrendingProduct4, title: 'Fortnite', genre: 'Action | Adventure | Comic' },
  { id: 5, icon: TrendingProduct5, title: 'Red Dead Redemption II', genre: 'Action | Adventure | AAA' },
  { id: 6, icon: TrendingProduct6, title: 'Deadpool & Wolverine', genre: 'Action | Adventure | Comedy' },
  { id: 7, icon: TrendingProduct7, title: 'The Penguin', genre: 'Action | Adventure | Racing' },
  { id: 8, icon: TrendingProduct8, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 8, icon: TrendingProduct9, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 8, icon: TrendingProduct10, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
];
const appsData: GridDataType[] = [
  { id: 4, icon: AppsIcon1, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 5, icon: AppsIcon2, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 6, icon: AppsIcon3, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
];
const subscriptionsData: GridDataType[] = [
  { id: 7, icon: SubscriptionIcon1, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 8, icon: SubscriptionIcon2, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 9, icon: SubscriptionIcon3, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
];
const wishlistProductsData: GridDataType[] = [
  { id: 1, icon: WishList1, title: 'Forza Horizon 4', genre: 'Action | Adventure | Racing' },
  { id: 2, icon: WishList2, title: 'Cod: Black ops', genre: 'Action | Adventure | Strategy' },
  { id: 3, icon: WishList3, title: 'Clash of Clans', genre: 'Action | PVP | Comedy' },
  { id: 4, icon: WishList4, title: 'Fortnite', genre: 'Action | Adventure | Comic' },
  { id: 5, icon: WishList5, title: 'Red Dead Redemption II', genre: 'Action | Adventure | AAA' },
  { id: 6, icon: WishList6, title: 'Deadpool & Wolverine', genre: 'Action | Adventure | Comedy' },
  { id: 7, icon: WishList7, title: 'The Penguin', genre: 'Action | Adventure | Racing' },
  { id: 8, icon: WishList8, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 9, icon: WishList9, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 10, icon: WishList10, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 11, icon: WishList11, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 12, icon: WishList12, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 13, icon: WishList13, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 14, icon: WishList14, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 15, icon: WishList15, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 16, icon: WishList16, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 17, icon: WishList17, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 18, icon: WishList18, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 19, icon: WishList19, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 20, icon: WishList20, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 21, icon: WishList21, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 22, icon: WishList22, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 23, icon: WishList23, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 24, icon: WishList24, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 25, icon: WishList25, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 26, icon: WishList26, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 27, icon: WishList27, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 28, icon: WishList28, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 29, icon: WishList29, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
  { id: 30, icon: WishList30, title: 'Smart Life', genre: 'Action | Adventure | Comic' },
];

export { aiToolsData, appsData, subscriptionsData, trendingProductsData, wishlistProductsData };

