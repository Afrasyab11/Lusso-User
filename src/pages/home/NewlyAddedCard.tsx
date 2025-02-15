import React, { useEffect, useState } from 'react';
import placeholderImg from '../../assets/images/placeholder-potrait.png';
import './NewlyAddedCard.css';

type CardData = {
    imageSrc: string;
    title: string;
};

type CardProps = {
    card: CardData
}


const NewlyAddedCard: React.FC<CardProps> = ({ card }) => {

    const [imageSrc, setImageSrc] = useState(card.imageSrc);

    useEffect(() => {
        const img = new Image();
        img.src = card.imageSrc;

        img.onload = () => {
            setImageSrc(card.imageSrc);
        };

        img.onerror = () => {
            setImageSrc(placeholderImg);
        };
    }, [card.imageSrc]);

    return (
        <div className="podcast-service-container p-1.5 bg-[#9B56FE] rounded-3xl">
            <div className="h-[220px] md:h-[640px] relative rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${imageSrc})` }}
            >
                {/* <img src={card.imageSrc} alt="Texas Podcast Services" className="podcast-image " /> */}
                <div className="overlay-text">
                    <p className='overlay-text-name uppercase'>{card.title}</p>
                </div>
                <div className="overlay-text-top">
                    <span className="bg-[#7D3CF3] ms-5 px-2 py-1 text-white text-sm font-semibold">NEWLY ADDED</span>
                </div>
            </div>
        </div>
    );
};

export default NewlyAddedCard;
