import { Carousel } from 'flowbite-react';
import React, { useEffect } from 'react';
import ExpressVpn from '../../assets/images/icons/Expressvpn.png';
import './styles.scss';

interface CarouselProps {
    // productId: string | undefined;
    images: string[];
    titles: string[];
    subtitles: string[];
}

const HomeCarouselComponent: React.FC<CarouselProps> = ({ images, titles, subtitles }) => {

    useEffect(() => {

    }, []);

    const isImage = (image: string) => {
        const extension = image.split('.').pop()?.toLowerCase();

        const validImageExtensions: any = [
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

    return (
        <div className="carousel-container-home">
            <Carousel pauseOnHover className="hide-arrows">
                {images.map((image, index) => (
                    <div className="carousel-img-container relative">
                        {
                            isImage(image) ?
                                <img src={image} alt={`Slide ${index + 1}`} className='absolute' />
                                :
                                <video loop muted src={'https://file-examples.com/storage/fed5266c9966708dcaeaea6/2017/04/file_example_MP4_640_3MG.mp4'} autoPlay />
                        }
                        <div className='absolute top-[15%] right-10' style={{ alignItems: 'center', height: "37px", paddingLeft: '32px', paddingRight: '32px', paddingTop: '16px', paddingBottom: '16px', background: 'linear-gradient(90deg, rgba(91, 33, 255, 0.85) 10%, rgba(131, 48, 255, 0.85) 14%, rgba(170, 63, 255, 0.85) 18%, rgba(199, 64, 199, 0.85) 47%, rgba(229, 65, 144, 0.85) 75%, rgba(238, 73, 95, 0.85) 88%, rgba(248, 82, 46, 0.85) 100%)', borderRadius: '52px', display: 'inline-flex' }}>
                            <div className='fontFamily-work-sans' style={{ color: 'white', fontSize: '20px', wordWrap: 'break-word' }}>PRODUCT OF THE MONTH</div>
                        </div>
                        <div className='flex flex-col relative px-[200px] py-[200px] items-center justify-center'>
                            <img src={ExpressVpn} style={{ height: '214px' }} />
                            <div style={{ color: 'white', fontSize: '24.80px', fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Connect with Confidence, Cherish Freedom</div>
                        </div>

                        <div className="w-full flex justify-between  items-center p-6 rounded-b-3xl absolute bg-[rgba(0, 0, 0, 0.15)]" style={{ backdropFilter: 'blur(20px)', top: "80%" }}>
                            <div className="w-full flex flex-col gap-y-2.5 p-6">
                                <h3 className="text-white font-semibold text-20 uppercase">
                                    {titles[index]}
                                </h3>
                                <p className="text-white text-xs font-normal text-16">
                                    {subtitles[index]}
                                </p>
                            </div>
                            <button
                                type="button"
                                className='flex items-center justify-center gap-x-2 w-[150px] h-[50px] text-white text-sm font-bold rounded-lg border-primary transition-all duration-500'
                                style={{ textTransform: "uppercase", background: "#002BE7", color: "white" }}
                            >
                                <span>Visit now</span>
                            </button>
                        </div>
                    </div>
                ))
                }
            </Carousel >
        </div >
    );

};

export default HomeCarouselComponent;