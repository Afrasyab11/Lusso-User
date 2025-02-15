import { useEffect } from 'react';
import SampleExploreCard from '../../assets/images/sample_explore_card.svg';
import StarIcon from '../../assets/images/star.svg';
import './styles.scss';

export type ProductType = {
    images: string[];
    name: string;
    subTitle: string;
    tags: string[];
    productId: string;
}

export type ExploreCardProps = {
    product?: ProductType;
};


const ExploreCard: React.FC<ExploreCardProps> = ({ product }) => {
    useEffect(() => {
        console.log('product checking$$$$$$$$$$$$$$$$$$$$', product?.images?.[0]);
    }, [])
    return (
        <div className='exploreCard card-container'>
            {
                product?.images?.[0] ?
                    <div className='flex flex-row justify-center items-center product-img-container'>
                        <img style={{ width: '212px', height: '212px', borderRadius: 8 }} src={product?.images?.[0]} alt="" />
                    </div>
                    :
                    <div className='flex flex-row justify-center items-center product-img-container'>
                        <img style={{ width: '212px', height: '212px' }} src={SampleExploreCard} alt="" />
                    </div>
            }
            <div className="explore-card-details-container">
                <div className='flex flex-row gap-x-2'>
                    {
                        product?.tags.reduce((accumulator: { tag: string; width: number; }[], tag) => {
                            // Calculate width of current tag
                            const span = document.createElement('span');
                            span.classList.add('chip');
                            span.textContent = tag;
                            document.body.appendChild(span);
                            const tagWidth = span.offsetWidth;
                            document.body.removeChild(span);

                            // Calculate remaining space
                            const currentWidth = accumulator.reduce((totalWidth, { width }) => totalWidth + width, 0);
                            const remainingWidth = 240 - currentWidth; // Adjust 300 based on outerDiv width

                            // Add tag if it fits within remaining space
                            if (tagWidth <= remainingWidth) {
                                accumulator.push({ tag, width: tagWidth });
                            } else {
                                // If tag doesn't fit, stop adding more tags
                                // accumulator.push({ tag: '+', width: 0 });
                            }

                            return accumulator;
                        }, []).map(({ tag }, index) => (
                            <span key={index} className='chip'>
                                {tag}
                            </span>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <span className='cardName'>{product?.name}</span>
                    </div>
                    <div className='flex flex-row items-center'>
                        <div>
                            <img style={{ width: 20, height: 20 }} src={StarIcon} alt='' />
                        </div>
                        <div>
                            <span className='rating'>4.8</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span className='card-desc'>
                        {
                            product?.subTitle
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ExploreCard;