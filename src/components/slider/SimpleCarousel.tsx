import { Carousel } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import PlayIcon from '../../assets/images/icons/playIcon.svg';
import './styles.scss';

interface Image {
    url: string;
    type?: 'image' | 'video';
}

interface CarouselProps {
    images: Image[];
}

const CarouselComponent: React.FC<CarouselProps> = ({ images = [] }) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [videoPaused, setVideoPaused] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [imageList, setImageList] = useState<Image[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = images.find(image => !isImage(image));
        const imageList = images.filter(isImage);
        console.log('imageLIst, ', imageList);
        if (video) {
            setVideoUrl(video.url);
        }
        setImageList(imageList);
    }, [images]);

    const isImage = (image: Image) => {
        const imageUrl = image.url;
        const extension: any = imageUrl && imageUrl.split('.').pop()?.toLowerCase();

        const validImageExtensions = [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
            "bmp",
            "tiff",
            "svg"
        ];

        return validImageExtensions.includes(extension);
    }

    const handlePlayClick = () => {
        setVideoPlaying(true);
    }

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoPaused) {
                videoRef.current.play();
                setVideoPaused(false);
            } else {
                videoRef.current.pause();
                setVideoPaused(true);
            }
        }
    }

    const handleVideoEnd = () => {
        setVideoPlaying(false);
        setVideoPaused(false);
    }

    return (
        <div className="carousel-container">
            <Carousel pauseOnHover className="hide-arrows" slideInterval={100000}>
                {imageList.map((image, index) => (
                    <div key={index} className="carousel-img-container">
                        {index === 0 && videoUrl ? (
                            videoPlaying ? (
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    autoPlay
                                    onClick={handleVideoClick}
                                    onEnded={handleVideoEnd}
                                />
                            ) : (
                                <div className="play-icon-container" onClick={handlePlayClick}>
                                    <img src={image.url} alt={`Slide ${index + 1}`} />
                                    {
                                        videoUrl &&
                                        <div className="play-icon">
                                            <img style={{ width: 70, height: 70 }} src={PlayIcon} alt='' />
                                        </div>
                                    }
                                </div>
                            )
                        ) : (
                            <img src={image.url} alt={`Slide ${index + 1}`} />
                        )}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
