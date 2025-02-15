import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExploreCard from '../../components/common/ExploreCard';
import CardLoader from '../../components/loaders/card-loader';
import { getCookies } from '../../utils/utils';

const WishListScreen = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading]: any = useState(true);

    const GoToProductDetails = (productId: string) => {
        navigate(`/newproductdetails/${productId}`);
    };

    const getWishListedProducts = () => {
        setLoading(true);
        const token = getCookies('authToken');
        axios
            .get('https://api.lusso.dev/api/v1/wishlist?size=100000', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setProducts(response?.data?.products);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                if (axios.isAxiosError(error)) {
                    console.error('Error fetching products:', error.response?.data || error.message);

                    if (error.response?.status === 401) {
                        console.log("Unauthorized access - redirecting to login.");
                        navigate('/login');

                    } else {
                        throw error; // Re-throw other errors
                    }
                }

            });
    };

    useEffect(() => {
        getWishListedProducts();
    }, []);

    return (
        <div>
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <span className='text-[#F881BC]'>Your wishlisted products</span>
                    </div>
                    {/* <div className='flex flex-row items-center gap-x-2'>
                        <img src={LeftArrowIcon} alt='Left Arrow Icon' />
                        <img src={RightArrowIcon} alt='Right Arrow Icon' />
                        <span className='text-[#EFF0F4]' style={{ textDecoration: 'underline' }}>View all</span>
                    </div> */}
                </div>
                {loading ?
                    <div className='flex flex-row flex-wrap justify-start gap-3'>
                        <CardLoader />
                        <CardLoader />
                        <CardLoader />
                        <CardLoader />
                    </div>
                    :
                    <div className='flex flex-row flex-wrap justify-start gap-3'>
                        {products.map((card: any) => (
                            <div style={{ width: "100%" }} key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                                <ExploreCard product={card} />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default WishListScreen;