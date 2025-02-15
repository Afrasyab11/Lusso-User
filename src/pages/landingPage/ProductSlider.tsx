import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCardNew from '../home/ProductCardNew';

interface Item {
    id: number;
    icon: string;
    title: string;
    genre: string;
}

interface ProductSliderProps {
    items: Item[];
    navigateDetails: (id: number) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
    items,
    navigateDetails,
}) => {
    const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

    function getSlidesToShow() {
        const width = window.innerWidth;
        if (width < 1024) {
            return 2; // Show 2 cards for mobile
        }
        // else if (width < 1024) {
        //     return 3.5; // Show 3 cards for tablets
        // }
        else {
            return 4; // Show 4 cards for web
        }
    }

    useEffect(() => {
        function handleResize() {
            setSlidesToShow(getSlidesToShow());
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <Slider {...settings}>
            {items.map(item => (
                <ProductCardNew
                    key={item.id}
                    item={item}
                    navigateDetails={navigateDetails}
                />
            ))}
        </Slider>
    );
};

export default ProductSlider;
