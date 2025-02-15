import React, { useEffect } from 'react';

interface CarouselProps {
  // productId: string | undefined;
  images: string[];
  titles: string[];
  subtitles: string[];
}

const ProductCard: React.FC<CarouselProps> = ({ images, titles, subtitles }) => {

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
      {images.map((image, index) => (
        <div className="relative rounded-2xl" style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: 600
        }}>
          <div className='absolute top-[15%] right-5 flex gap-2' style={{
            alignItems: 'center', height: "37px", paddingLeft: '32px', paddingRight: '32px',
            paddingTop: '16px', paddingBottom: '16px', borderRadius: '52px', display: 'inline-flex'
          }}>
            <div className="relative inline-flex items-center">
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" style={{ padding: '2px' }}>
                <div className="h-full w-full bg-black rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative px-6 py-2 text-white flex items-center">
                <span className="text-lg font-semibold">Product Of The Day</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className='ml-2'>
                  <path d="M22.6937 13.6828C22.6324 13.6523 22.5711 13.6218 22.5098 13.5913C21.8665 13.3474 21.2232 13.1035 20.6105 12.8901C20.1203 12.7072 19.6302 12.5547 19.14 12.3108C18.221 11.8535 17.7002 11.0913 17.3632 10.1461C17.0263 9.17052 16.628 8.19489 16.2604 7.21926C16.2298 7.1278 16.1072 7.00584 15.9847 7.00584C15.8621 6.97535 15.7396 7.06682 15.6783 7.21926C15.3107 8.1644 14.9737 9.07905 14.6061 10.0242C14.4223 10.451 14.2691 10.8779 14.0241 11.2742C13.7484 11.701 13.3195 12.0669 12.86 12.2498C11.9716 12.6157 11.0832 12.9511 10.1947 13.2864C9.85777 13.4084 9.52079 13.5304 9.18381 13.7133C9.0919 13.7438 9 13.8962 9 13.9877C9 14.0791 9.12254 14.1706 9.18381 14.2621C9.21444 14.2926 9.27571 14.323 9.33698 14.323C10.2867 14.6889 11.2363 15.0243 12.186 15.3597C13.2276 15.7255 14.0241 16.3658 14.453 17.4024C14.7287 18.0731 14.9737 18.7439 15.2188 19.3841C15.372 19.811 15.5558 20.2378 15.709 20.6951C15.7702 20.8476 15.8621 20.9695 16.0766 21C16.1685 20.878 16.291 20.7866 16.3217 20.6646C16.6893 19.75 17.0263 18.8048 17.3632 17.8902C17.7002 16.945 18.221 16.1523 19.1094 15.695C19.5689 15.4511 20.0591 15.2987 20.5492 15.1157C21.2538 14.8414 21.9891 14.5974 22.6937 14.2926C22.8162 14.2316 22.9387 14.1096 23 13.9877C22.9694 13.8962 22.7856 13.7438 22.6937 13.6828Z" fill="white" />
                  <path d="M1.21472 7.16616C1.92025 7.43807 2.62577 7.70997 3.33129 7.95166C4.03681 8.22356 4.58896 8.64652 4.86503 9.3716C4.95706 9.58308 5.04908 9.79456 5.1411 10.0363C5.35583 10.5801 5.53988 11.1239 5.7546 11.6677C5.78528 11.7583 5.90798 11.8489 6 12C6.09203 11.8792 6.18405 11.8187 6.21472 11.7281C6.4908 11.0634 6.7362 10.3686 6.9816 9.70393C7.25767 8.91843 7.74847 8.34441 8.54601 8.0423C9.25153 7.77039 9.95706 7.5287 10.6626 7.22659C10.7853 7.16616 10.8773 7.04532 11 6.95468C10.908 6.86405 10.7853 6.77341 10.6933 6.71299C10.0491 6.4713 9.40491 6.22961 8.76074 5.98792C7.87117 5.6858 7.28834 5.11178 6.9816 4.20544C6.76687 3.54079 6.4908 2.87613 6.21472 2.24169C6.18405 2.15106 6.06135 2.09063 6 2C5.90798 2.09063 5.78528 2.15106 5.7546 2.2719C5.5092 2.87613 5.2638 3.48036 5.04908 4.1148C4.77301 4.83988 4.37423 5.44411 3.63804 5.77643C3.39264 5.89728 3.11656 5.98792 2.87117 6.07855C2.31902 6.29003 1.79755 6.4713 1.2454 6.68278C1.15337 6.71299 1.09202 6.86405 1 6.92447C1.06135 7.01511 1.1227 7.10574 1.21472 7.16616Z" fill="white" />
                  <path d="M7.13878 18.2263C6.45306 17.9959 5.96327 17.535 5.73469 16.8107C5.53878 16.284 5.34286 15.7572 5.14694 15.2305C5.11429 15.1317 5.01633 15.0658 4.95102 15C4.88571 15.0658 4.78776 15.1317 4.7551 15.2305C4.59184 15.6584 4.42857 16.1193 4.26531 16.5473C4.03673 17.2387 3.67755 17.8313 2.95918 18.0947C2.69796 18.1934 2.43673 18.2922 2.14286 18.4239C1.81633 18.5556 1.45714 18.6872 1.13061 18.8189C1.06531 18.8848 1 18.9506 1 19.0165C1 19.0823 1.09796 19.1481 1.13061 19.1811C1.22857 19.2469 1.35918 19.2798 1.4898 19.3457C1.94694 19.5103 2.40408 19.6749 2.86122 19.8395C3.41633 20.037 3.80816 20.3992 4.03673 20.9588C4.29796 21.5844 4.49388 22.177 4.7551 22.8025C4.78776 22.9012 4.88571 22.9342 4.95102 23C5.01633 22.9342 5.11429 22.8683 5.14694 22.8025C5.3102 22.4403 5.44082 22.0782 5.57143 21.7161C5.70204 21.3868 5.83265 21.0247 5.99592 20.6955C6.2898 20.1029 6.87755 19.9054 7.46531 19.6749C7.85714 19.5103 8.24898 19.3786 8.64082 19.214C8.73878 19.1811 8.83673 19.0823 9 18.9835C8.86939 18.8848 8.80408 18.8189 8.70612 18.786C8.18367 18.6214 7.66122 18.4239 7.13878 18.2263Z" fill="white" />
                </svg>
              </div>
            </div>

          </div>
          <div className='text-end items-center h-full flex justify-end' style={{ paddingRight: 56 }}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              ONE GLOBAL <br /><span className="text-[#00F0FB]">MARKETPLACE</span>
            </h2>
          </div>

          <div className="w-full flex justify-between bottom-2 items-center p-6 rounded-b-3xl absolute bg-[rgba(0, 0, 0, 0.15)]" style={{ backdropFilter: 'blur(7px)' }}>
            <div className="w-full flex flex-col gap-y-2 p-6">
              <h3 className="text-white font-semibold text-lg uppercase">
                {titles[index]}
              </h3>
              <p className="text-white text-xs font-normal text-16">
                {subtitles[index]}
              </p>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  );

};

export default ProductCard;