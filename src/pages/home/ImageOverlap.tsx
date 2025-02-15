import React from 'react';
import Card from './Card';
import './ImageOverlap.css'; // Adjust the import path

const ImageOverlap: React.FC<{ image1Src: string, image2Src: string, title: string, subtitle: string, }> = ({ image1Src, image2Src, title, subtitle }) => {
    return (
        <div className="image-container">
            <img src={image1Src} alt="" className="image1" />
            <div className="image2">
                <Card imageSrc={image2Src} title={title} subtitle={subtitle} />
            </div>
        </div>
    );
};

export default ImageOverlap;
