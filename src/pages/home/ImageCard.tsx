import React from 'react';
import './ImageCard.css';

interface ImageCardProps {
    rank: number;
    title: string;
    subtitle: string;
    imageUrl: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ rank, title, subtitle, imageUrl }) => {
    return (
        <div className="image-card">
            <div className="rank-container">
                <div className="rank">{rank}</div>
            </div>
            <img src={imageUrl} alt={title} className="image" />
            <div className="info">
                <div className="title">{title}</div>
                <div className="subtitle">{subtitle}</div>
            </div>
            <div className="top-badge">TOP 10</div>
        </div>
    );
};

export default ImageCard;
