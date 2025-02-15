import { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PlayIcon from '../../assets/images/icons/playIcon.svg';

const SlickSlider = ({ imageList, videoUrl, height, isExplore = false }: any) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayClick = () => {
        setVideoPlaying(true);
    };

    // const handleVideoClick = () => {
    //     if (videoPlaying) {
    //         setVideoPlaying(false);
    //         videoRef.current.pause();
    //     }
    // };

    const handleVideoEnd = () => {
        setVideoPlaying(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        // slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Hide the arrows
        // dotsClass: "slick-dots custom-dots" // Custom class for dots
    };

    return (
        <Slider {...settings}>
            {imageList.map((image: any, index: number) => (
                <div key={index} className={`${isExplore ? 'h-[680px]' : height ?? 'h-[299px]'} rounded-2xl overflow-hidden w-full"`}>
                    {index === 0 && videoUrl ? (
                        videoPlaying ? (
                            <video
                                ref={videoRef}
                                src={videoUrl}
                                autoPlay
                                // onClick={handleVideoClick}
                                onEnded={handleVideoEnd}
                            />
                        ) : (
                            <div onClick={handlePlayClick}>
                                <img className="lg:h-[650px]" src={image.url} alt={`Slide ${index + 1}`} />
                                {videoUrl && (
                                    <div className="play-icon">
                                        <img style={{ width: 70, height: 70 }} src={PlayIcon} alt='' />
                                    </div>
                                )}
                            </div>
                        )
                    ) : (
                        <img src={image.url} alt={`Slide ${index + 1}`} className="w-full h-full md:mt-0 mt-5" />
                    )}
                </div>
            ))}
        </Slider>
    );
};

export default SlickSlider;
