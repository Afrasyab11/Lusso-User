import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExploreCard from '../../components/common/ExploreCard';
import CardLoader from '../../components/loaders/card-loader';
import { getCookies } from '../../utils/utils';


const Explore = () => {
    const navigate = useNavigate();
    const [categories, setCategories]: any = useState([]);
    const [products, setProducts]: any = useState(null);
    const [loading, setLoading]: any = useState(true);

    const GoToProductDetails = (productId: string) => {
        navigate(`/newproductdetails/${productId}`);
    };

    const { productType } = useParams()
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
                const categoriesOfProductType = products.filter((product) => product.productType?.toLowerCase() === productType?.toLowerCase());

                if (categoriesOfProductType.length === 0) {
                    return navigate("/explore");
                }

                const tempCategories = new Set()
                const tempCategoryMap: any = {}
                categoriesOfProductType.forEach(product => {
                    const temp = product.category
                    tempCategories.add(temp)

                    if (temp in tempCategoryMap) {
                        tempCategoryMap[temp].push(product);
                    } else {
                        tempCategoryMap[temp] = [product]
                    }
                });
                setCategories(Array.from(tempCategories))
                setProducts(tempCategoryMap)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);

                setLoading(false);
            });
    };

    useEffect(() => {
        getExploreData();
    }, []);

    return (
        <div className='flex flex-col gap-y-6'>
            {
                categories.map((category: any, index: number) => (

                    <div className='flex flex-col gap-y-3'>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                <span className='text-[#F881BC]'>{category}</span>
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
                            <div className='flex flex-row flex-wrap justify-start gap-3'>
                                {products[category].length > 5 ? products[category].slice(0, 5).map((card: any) => (
                                    <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                                        <ExploreCard product={card} />
                                    </div>
                                )) : products[category].map((card: any) => (
                                    <div key={card.productId} onClick={() => { GoToProductDetails(card.productId) }}>
                                        <ExploreCard product={card} />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                ))}

        </div>
    );
};

export default Explore;
