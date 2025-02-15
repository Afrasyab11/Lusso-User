import axios from 'axios';
import { Info } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { getCookies } from '../../utils/utils';
import TrendingProducts from '../landingPage/TrendingProducts';

interface Product {
    productId: string;
    category: string;
    name: string;
    createdBy: string;
    createdOn: string;
    subCategory: string;
    exploreImage?: string;
    rating?: string;
}

const WishList = () => {
    const [wishlistProductsData, setWishlistProductsData] = useState([]);
    const [wishlistType, setWishlistType] = useState('App'); // State to store the current type
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchWishlistProducts = async (type = 'Wishlist') => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get(`https://api.lusso.dev/api/v1/userAction?page=0&size=100&type=Wishlist&category=${wishlistType}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const products = response.data.products.map((product: Product) => ({
                id: product.productId,
                icon: product.exploreImage || '',
                title: product.name,
                genre: `${product.category} | ${product.subCategory}`,
                rating: product.rating,
                category: product.category
            }));

            if (products.length === 0) {
                // Handle empty wishlist case
                setWishlistProductsData([]);
                // alert("Your wishlist is empty. Add some products to see them here!");
            } else {
                setWishlistProductsData(products);
                // alert(null); // Clear any previous empty message
            }
        } catch (error) {
            console.error("Error fetching wishlist products:", error);
            alert("Failed to fetch wishlist products. Please try again later.");
        }
    };

    useEffect(() => {
        if (navigator.onLine) {
            fetchWishlistProducts(wishlistType);

        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, [wishlistType]);


    const handleTypeChange = useCallback((type: string) => {

        if (wishlistType !== type) {
            setWishlistType(type);
        }
    }, [wishlistType]);


    return (
        <div className="alignCenter bg-blurred-new overflow-x-hidden">
            <div className="min-h-screen flex flex-col justify-center items-center gap-3 px-3 sm:px-4 lg:px-10 py-8 md:py-24">

                {/* Title */}
                <h1 className="text-3xl lg:text-5xl font-bold text-white">
                    Wishlist
                </h1>

                {/* Desktop View - Navigation Buttons */}
                <div className="hidden md:flex justify-center space-x-4 py-8">
                    {['App', 'Game', 'Movie', 'Course', 'Service', 'AI Products'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeChange(type)}
                            className={`px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full ${wishlistType === type
                                ? 'bg-cyan-400 text-white'
                                : 'text-cyan-400 hover:bg-cyan-400 hover:text-white'
                                } transition`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Mobile View - Navigation Buttons */}
                <div className="flex flex-wrap md:hidden justify-center gap-2 py-6">
                    {['App', 'Game', 'Movie', 'Course', 'Service', 'AI Products'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeChange(type)}
                            className={`px-4 py-2 text-xs border border-cyan-400 rounded-full ${wishlistType === type
                                ? 'bg-cyan-400 text-white'
                                : 'text-cyan-400 hover:bg-cyan-400 hover:text-white'
                                } transition`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                {wishlistProductsData?.length === 0 &&
                    <p className='text-info p-3 rounded-lg font-medium flex items-center gap-2 text-lg'>
                        <Info />
                        Your wishlist is empty. Add some products to see them here!
                    </p>
                }
                {/* Desktop View - Product Container */}
                <div className="hidden md:block max-w-[1370px] mx-auto md:px-10 px-4 md:space-y-5">
                    <div className="w-full">
                        <TrendingProducts
                            data={wishlistProductsData}
                            hideHeading={true}
                            allRowDataPopulation={true}

                        />
                    </div>
                </div>

                {/* Mobile View - Product Container */}
                <div className="block md:hidden w-full px-4 space-y-3 overflow-hidden">
                    <TrendingProducts
                        data={wishlistProductsData}
                        hideHeading={true}
                        allRowDataPopulation={true}
                        containerClass="flex flex-col gap-3 w-full"
                        itemClass="bg-white p-4 rounded-lg shadow-md"
                    />
                </div>

            </div>
        </div>
    );

};

export default WishList;

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { getCookies } from '../../utils/utils';
// import TrendingProducts from '../landingPage/TrendingProducts';
// interface Product {
//     productId: string;
//     category: string;
//     name: string;
//     createdBy: string;
//     createdOn: string;
//     subCategory: string;
//     exploreImage?: string;
//     rating?: string;
// }
// const WishList = () => {

//     useEffect(() => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     }, []);
//     const [wishlistProductsData, setWishlistProductsData] = useState([]);

//     const fetchWishlistProducts = async () => {
//         const token = getCookies('authToken');

//         try {
//             const response = await axios.get('https://api.lusso.dev/api/v1/userAction?page=0&size=100&type=Wishlist', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             // Assuming the API response contains a products array
//             const products = response.data.products.map((product: Product) => ({
//                 id: product.productId, // Using productId for id
//                 icon: product.exploreImage || '', // Using exploreImage for icon
//                 title: product.name,
//                 genre: `${product.category} | ${product.subCategory}`,
//                 rating: product.rating,
//                 category: product.category
//             }));

//             setWishlistProductsData(products);
//         } catch (error) {
//             console.error("Error fetching wishlist products:", error);
//         }
//     };

//     useEffect(() => {
//         fetchWishlistProducts();
//     }, []);

//     return (
//         <>
//             <div className="alignCenter bg-blurred-new">
//                 <div className="min-h-screen flex flex-col justify-center items-center gap-5 px-5 lg:px-10 py-24">
//                     <h1 className="text-3xl lg:text-5xl font-bold text-white">Wishlist</h1>
//                     <div className="flex justify-center space-x-4 py-8">
//                         <button className="px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white transition">
//                             Apps
//                         </button>
//                         <button className="px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white transition">
//                             Games
//                         </button>
//                         <button className="px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white transition">
//                             Movies & TV
//                         </button>
//                         <button className="px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white transition">
//                             Courses
//                         </button>
//                         <button className="px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white transition">
//                             Services
//                         </button>
//                         <button className="px-6 text-sm pb-1 pt-[1px] border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-white transition">
//                             AI Products
//                         </button>
//                     </div>
//                     <div className="max-w-[1370px] mx-auto clearfix md:px-10 px-4 md:space-y-5">
//                         <div className="w-full float-left last-of-type:mb-0">
//                             <div className="w-full float-left">
//                                 <TrendingProducts
//                                     data={wishlistProductsData}
//                                     hideHeading={true}
//                                     allRowDataPopulation={true}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default WishList;
