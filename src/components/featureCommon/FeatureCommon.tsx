import { useNavigate } from 'react-router-dom';
import one from '../../assets/images/features/1.png';
import two from '../../assets/images/features/2.png';
import three from '../../assets/images/features/3.png';
import bgCommon from '../../assets/images/features/bg-common.png';
import down from '../../assets/images/features/down.png';
import img1 from '../../assets/images/features/img1.png';
import img2 from '../../assets/images/features/img2.png';
import img3 from '../../assets/images/features/img3.png';
import img4 from '../../assets/images/features/img4.png';
import img5 from '../../assets/images/features/img5.png';
import img6 from '../../assets/images/features/img6.png';
import img7 from '../../assets/images/features/img7.png';
import thought from '../../assets/images/features/thought.png';
import FooterFeature from '../footer/FooterFeature';
import '../navbar/topnavbar.scss';
import ToPNavBarFeature from '../navbar/ToPNavBarFeature';
const FeatureCommon = ({ topBgImage, cardData, secondaryBannerImg, textData, cardDataSecondary }: { topBgImage?: any, cardData: any, secondaryBannerImg: any, textData: any, cardDataSecondary: any }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="product-details-wrapper bg-black ">
        <ToPNavBarFeature />
        <div className=" bg-blurred-new"
          style={{
            lineHeight: 1,
            margin: 0,
            padding: 0
          }}>
          <div className="relative h-screen bg-cover w-full" style={{ backgroundImage: `url(${topBgImage})` }}>
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#1e1541]"
              style={{
                zIndex: 1,
              }}
            ></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
              <p className="lg:text-[90px] font-normal text-white capitalize md-lt:text-[30px]">{textData?.title}</p>
              <p className="lg:text-[60px] lg:font-bold md-lt:font-normal text-[#00FFFF] capitalize md-lt:text-[18px]">{textData?.subTitle}</p>
              <button onClick={() => {
                document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
              }} className="mt-8 flex items-center gap-2 rounded-full py-4 px-8 bg-gradient-to-b from-[#641de5] to-[#d35fc9] justify-between hover:bg-gradient-to-r hover:from-[#006ef8] hover:to-[#00F0FB]">
                <span className="lg:flex font-semibold">EXPLORE NOW</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path d="M22.9437 13.6828C22.8824 13.6523 22.8211 13.6218 22.7598 13.5913C22.1165 13.3474 21.4732 13.1035 20.8605 12.8901C20.3703 12.7072 19.8802 12.5547 19.39 12.3108C18.471 11.8535 17.9502 11.0913 17.6132 10.1461C17.2763 9.17052 16.878 8.19489 16.5104 7.21926C16.4798 7.1278 16.3572 7.00584 16.2347 7.00584C16.1121 6.97535 15.9896 7.06682 15.9283 7.21926C15.5607 8.1644 15.2237 9.07905 14.8561 10.0242C14.6723 10.451 14.5191 10.8779 14.2741 11.2742C13.9984 11.701 13.5695 12.0669 13.11 12.2498C12.2216 12.6157 11.3332 12.9511 10.4447 13.2864C10.1078 13.4084 9.77079 13.5304 9.43381 13.7133C9.3419 13.7438 9.25 13.8962 9.25 13.9877C9.25 14.0791 9.37254 14.1706 9.43381 14.2621C9.46444 14.2926 9.52571 14.323 9.58698 14.323C10.5367 14.6889 11.4863 15.0243 12.436 15.3597C13.4776 15.7255 14.2741 16.3658 14.703 17.4024C14.9787 18.0731 15.2237 18.7439 15.4688 19.3841C15.622 19.811 15.8058 20.2378 15.959 20.6951C16.0202 20.8476 16.1121 20.9695 16.3266 21C16.4185 20.878 16.541 20.7866 16.5717 20.6646C16.9393 19.75 17.2763 18.8048 17.6132 17.8902C17.9502 16.945 18.471 16.1523 19.3594 15.695C19.8189 15.4511 20.3091 15.2987 20.7992 15.1157C21.5038 14.8414 22.2391 14.5974 22.9437 14.2926C23.0662 14.2316 23.1887 14.1096 23.25 13.9877C23.2194 13.8962 23.0356 13.7438 22.9437 13.6828Z" fill="white" />
                  <path d="M1.46472 7.16616C2.17025 7.43807 2.87577 7.70997 3.58129 7.95166C4.28681 8.22356 4.83896 8.64652 5.11503 9.3716C5.20706 9.58308 5.29908 9.79456 5.3911 10.0363C5.60583 10.5801 5.78988 11.1239 6.0046 11.6677C6.03528 11.7583 6.15798 11.8489 6.25 12C6.34203 11.8792 6.43405 11.8187 6.46472 11.7281C6.7408 11.0634 6.9862 10.3686 7.2316 9.70393C7.50767 8.91843 7.99847 8.34441 8.79601 8.0423C9.50153 7.77039 10.2071 7.5287 10.9126 7.22659C11.0353 7.16616 11.1273 7.04532 11.25 6.95468C11.158 6.86405 11.0353 6.77341 10.9433 6.71299C10.2991 6.4713 9.65491 6.22961 9.01074 5.98792C8.12117 5.6858 7.53834 5.11178 7.2316 4.20544C7.01687 3.54079 6.7408 2.87613 6.46472 2.24169C6.43405 2.15106 6.31135 2.09063 6.25 2C6.15798 2.09063 6.03528 2.15106 6.0046 2.2719C5.7592 2.87613 5.5138 3.48036 5.29908 4.1148C5.02301 4.83988 4.62423 5.44411 3.88804 5.77643C3.64264 5.89728 3.36656 5.98792 3.12117 6.07855C2.56902 6.29003 2.04755 6.4713 1.4954 6.68278C1.40337 6.71299 1.34202 6.86405 1.25 6.92447C1.31135 7.01511 1.3727 7.10574 1.46472 7.16616Z" fill="white" />
                  <path d="M7.38878 18.2263C6.70306 17.9959 6.21327 17.535 5.98469 16.8107C5.78878 16.284 5.59286 15.7572 5.39694 15.2305C5.36429 15.1317 5.26633 15.0658 5.20102 15C5.13571 15.0658 5.03776 15.1317 5.0051 15.2305C4.84184 15.6584 4.67857 16.1193 4.51531 16.5473C4.28673 17.2387 3.92755 17.8313 3.20918 18.0947C2.94796 18.1934 2.68673 18.2922 2.39286 18.4239C2.06633 18.5556 1.70714 18.6872 1.38061 18.8189C1.31531 18.8848 1.25 18.9506 1.25 19.0165C1.25 19.0823 1.34796 19.1481 1.38061 19.1811C1.47857 19.2469 1.60918 19.2798 1.7398 19.3457C2.19694 19.5103 2.65408 19.6749 3.11122 19.8395C3.66633 20.037 4.05816 20.3992 4.28673 20.9588C4.54796 21.5844 4.74388 22.177 5.0051 22.8025C5.03776 22.9012 5.13571 22.9342 5.20102 23C5.26633 22.9342 5.36429 22.8683 5.39694 22.8025C5.5602 22.4403 5.69082 22.0782 5.82143 21.7161C5.95204 21.3868 6.08265 21.0247 6.24592 20.6955C6.5398 20.1029 7.12755 19.9054 7.71531 19.6749C8.10714 19.5103 8.49898 19.3786 8.89082 19.214C8.98878 19.1811 9.08673 19.0823 9.25 18.9835C9.11939 18.8848 9.05408 18.8189 8.95612 18.786C8.43367 18.6214 7.91122 18.4239 7.38878 18.2263Z" fill="white" />
                </svg>
              </button>
              <img src={down} className="h-10 object-contain mt-5" alt="" />
            </div>
          </div>
          <div id="explore-section" className="max-w-[1550px] mx-auto">
            <div className="lg:py-24 md-lt:py-10 flex lg:flex-row md:flex-col md:gap-y-4 md:text-center lg:text-start md-lt:flex-col items-center justify-between lg:gap-16 md-lt:gap-8 lg:px-10 md-lt:px-4 bg-gradient-to-t from-black/30 to-[#1e1541] ">
              <div className="flex flex-col items-start md:gap-y-4 lg:gap-14 md-lt:gap-5 lg:w-1/2">
                <p className="lg:text-[60px] md-lt:text-[20px] font-semibold w-full text-[#00F0FB]">{textData?.heading1}
                </p>
                <p className="lg:text-[22px] md-lt:text-[14px] font-normal text-white">{textData?.heading2}</p>
              </div>
              <div className="lg:w-1/2">
                <div className="grid grid-cols-3 gap-2">
                  {cardData.map((card: any) => (
                    <div key={card.id} className="max-w-52 lg:max-h-72 md-lt:h-36 rounded-lg overflow-hidden shadow-lg bg-white relative hover:border-[3px] hover:border-l-[#00F0FB] hover:border-t-[#00F0FB] hover:border-r-[#006ef8] hover:border-b-[#006ef8]">
                      <img className="w-full h-full object-cover" src={card.imgSrc} alt={card.title} />
                      <div className="absolute bottom-0 left-0 right-0  bg-black bg-opacity-40 lg:p-4 md-lt:py-3 md-lt:px-2">
                        <div className="flex justify-between items-center md:p-3 lg:p-0">
                          <div>
                            <h2 className="text-white lg:text-lg lg:font-semibold lg:text-[18px] md-lt:text-[8px]">{card.title}</h2>
                            <p className="text-white lg:text-[10px] md-lt:text-[8px]">{card.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:p-3 lg:p-0">
                          <div className="flex items-center">
                            <span className="text-[#00F0FB] text-[10px] font-semibold">{card.rating}</span>
                            <svg
                              className="w-3 h-3 text-yellow-400 ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.149c.969 0 1.371 1.24.588 1.81l-3.362 2.44a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.362-2.44a1 1 0 00-1.175 0l-3.362 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.946a1 1 0 00-.364-1.118L2.175 9.373c-.783-.57-.381-1.81.588-1.81h4.149a1 1 0 00.95-.69L9.049 2.927z" />
                            </svg>
                          </div>
                          <div className="">
                            <span className="bg-purple-600 text-white text-[8px] font-semibold px-2 py-1 rounded-full">
                              {card.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:px-10 md:mt-4 lg:mt-0 md-lt:px-4 lg:pb-28 md-lt:pb-10 flex lg:flex-row md-lt:flex-col items-start justify-between gap-5">
              {cardDataSecondary?.card2.map((card: any) => (
                <div
                  className="relative bg-black bg-opacity-20 border-[1px] border-[#006ef8] rounded-xl gap-5 px-8 pt-14 pb-24 flex flex-col space-y-4 items-start lg:w-[calc(33.333%-1.25rem)] md-lt:w-full lg:h-80 h-[40vh]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent 30%), linear-gradient(to top left, rgba(255, 255, 255, 0.1), transparent 30%) "
                  }}
                >
                  <div className="flex justify-start">
                    <img className="h-10 object-contain self-start m-0 p-0" src={card?.icon} alt="" />
                  </div>
                  <p className="md:text-[25px] lg:text-[28px] xl-[32px] text-white font-light uppercase">{card?.text}</p>
                </div>


              ))}
            </div>
            <div className="lg:px-10 md-lt:px-4 lg:py-28 md-lt:py-10 md:mt-4 lg:mt-0">
              <div
                className="lg:px-10 md-lt:px-4 lg:py-20 md-lt:py-6 w-full h-auto bg-cover bg-center flex flex-col justify-between relative bg-black bg-opacity-10 rounded-xl border-2 border-[#00F0FB] overflow-hidden"
                style={{
                  backgroundImage: `url(${secondaryBannerImg})`,
                  objectFit: "contain"
                }}
              >
                <div className=" text-white md:p-2 lg:p-0 ">
                  <div className="font-bold lg:text-[45px] md-lt:text-[20px] italic">
                    <p>Product Listed</p>
                    <div className="flex items-center gap-2">
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#006ef8] to-[#00F0FB]">
                        Top 10
                      </p>
                      <p> By LUSSO AI</p>
                    </div>

                  </div>
                </div>
                <div className="flex justify-end md:p-2 lg:p-0">
                  <div className="flex flex-col items-end gap-5">
                    <p className="lg:text-lg font-semibold w-72 text-right md-lt:text-sm">{textData?.secondaryBannerDesc}</p>
                    <button onClick={() => navigate('/login')} className="flex items-center gap-4 py-2 px-8 bg-clip-border border-[#006ef8] text-white border-[1px] rounded-full"
                    // style={{
                    //     borderRadius: "",
                    //     borderImage: 'linear-gradient(to right, #006ef8, #00F0FB)',
                    //     borderImageSlice: 1,
                    //     borderStyle: 'solid',
                    // }}
                    >
                      <span className=" lg:flex font-semibold text-[14px]">Login to explore more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M22.9437 13.6828C22.8824 13.6523 22.8211 13.6218 22.7598 13.5913C22.1165 13.3474 21.4732 13.1035 20.8605 12.8901C20.3703 12.7072 19.8802 12.5547 19.39 12.3108C18.471 11.8535 17.9502 11.0913 17.6132 10.1461C17.2763 9.17052 16.878 8.19489 16.5104 7.21926C16.4798 7.1278 16.3572 7.00584 16.2347 7.00584C16.1121 6.97535 15.9896 7.06682 15.9283 7.21926C15.5607 8.1644 15.2237 9.07905 14.8561 10.0242C14.6723 10.451 14.5191 10.8779 14.2741 11.2742C13.9984 11.701 13.5695 12.0669 13.11 12.2498C12.2216 12.6157 11.3332 12.9511 10.4447 13.2864C10.1078 13.4084 9.77079 13.5304 9.43381 13.7133C9.3419 13.7438 9.25 13.8962 9.25 13.9877C9.25 14.0791 9.37254 14.1706 9.43381 14.2621C9.46444 14.2926 9.52571 14.323 9.58698 14.323C10.5367 14.6889 11.4863 15.0243 12.436 15.3597C13.4776 15.7255 14.2741 16.3658 14.703 17.4024C14.9787 18.0731 15.2237 18.7439 15.4688 19.3841C15.622 19.811 15.8058 20.2378 15.959 20.6951C16.0202 20.8476 16.1121 20.9695 16.3266 21C16.4185 20.878 16.541 20.7866 16.5717 20.6646C16.9393 19.75 17.2763 18.8048 17.6132 17.8902C17.9502 16.945 18.471 16.1523 19.3594 15.695C19.8189 15.4511 20.3091 15.2987 20.7992 15.1157C21.5038 14.8414 22.2391 14.5974 22.9437 14.2926C23.0662 14.2316 23.1887 14.1096 23.25 13.9877C23.2194 13.8962 23.0356 13.7438 22.9437 13.6828Z" fill="white" />
                        <path d="M1.46472 7.16616C2.17025 7.43807 2.87577 7.70997 3.58129 7.95166C4.28681 8.22356 4.83896 8.64652 5.11503 9.3716C5.20706 9.58308 5.29908 9.79456 5.3911 10.0363C5.60583 10.5801 5.78988 11.1239 6.0046 11.6677C6.03528 11.7583 6.15798 11.8489 6.25 12C6.34203 11.8792 6.43405 11.8187 6.46472 11.7281C6.7408 11.0634 6.9862 10.3686 7.2316 9.70393C7.50767 8.91843 7.99847 8.34441 8.79601 8.0423C9.50153 7.77039 10.2071 7.5287 10.9126 7.22659C11.0353 7.16616 11.1273 7.04532 11.25 6.95468C11.158 6.86405 11.0353 6.77341 10.9433 6.71299C10.2991 6.4713 9.65491 6.22961 9.01074 5.98792C8.12117 5.6858 7.53834 5.11178 7.2316 4.20544C7.01687 3.54079 6.7408 2.87613 6.46472 2.24169C6.43405 2.15106 6.31135 2.09063 6.25 2C6.15798 2.09063 6.03528 2.15106 6.0046 2.2719C5.7592 2.87613 5.5138 3.48036 5.29908 4.1148C5.02301 4.83988 4.62423 5.44411 3.88804 5.77643C3.64264 5.89728 3.36656 5.98792 3.12117 6.07855C2.56902 6.29003 2.04755 6.4713 1.4954 6.68278C1.40337 6.71299 1.34202 6.86405 1.25 6.92447C1.31135 7.01511 1.3727 7.10574 1.46472 7.16616Z" fill="white" />
                        <path d="M7.38878 18.2263C6.70306 17.9959 6.21327 17.535 5.98469 16.8107C5.78878 16.284 5.59286 15.7572 5.39694 15.2305C5.36429 15.1317 5.26633 15.0658 5.20102 15C5.13571 15.0658 5.03776 15.1317 5.0051 15.2305C4.84184 15.6584 4.67857 16.1193 4.51531 16.5473C4.28673 17.2387 3.92755 17.8313 3.20918 18.0947C2.94796 18.1934 2.68673 18.2922 2.39286 18.4239C2.06633 18.5556 1.70714 18.6872 1.38061 18.8189C1.31531 18.8848 1.25 18.9506 1.25 19.0165C1.25 19.0823 1.34796 19.1481 1.38061 19.1811C1.47857 19.2469 1.60918 19.2798 1.7398 19.3457C2.19694 19.5103 2.65408 19.6749 3.11122 19.8395C3.66633 20.037 4.05816 20.3992 4.28673 20.9588C4.54796 21.5844 4.74388 22.177 5.0051 22.8025C5.03776 22.9012 5.13571 22.9342 5.20102 23C5.26633 22.9342 5.36429 22.8683 5.39694 22.8025C5.5602 22.4403 5.69082 22.0782 5.82143 21.7161C5.95204 21.3868 6.08265 21.0247 6.24592 20.6955C6.5398 20.1029 7.12755 19.9054 7.71531 19.6749C8.10714 19.5103 8.49898 19.3786 8.89082 19.214C8.98878 19.1811 9.08673 19.0823 9.25 18.9835C9.11939 18.8848 9.05408 18.8189 8.95612 18.786C8.43367 18.6214 7.91122 18.4239 7.38878 18.2263Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:py-24 md:mt-4 md:px-5 lg:pt-0 md-lt:py-10 flex lg:flex-row md-lt:flex-col items-center justify-between gap-16 lg:px-10 md-lt:px-4 ">
              <div className="flex flex-1 flex-col items-start gap-4 lg:w-1/2">
                <p className="lg:text-[60px] md-lt:text-[20px] font-semibold text-[#00F0FB] m-0 p-0">{textData?.heading3}
                </p>
                <p className="lg:text-[22px] md-lt:text-[14px] font-normal text-white">{textData?.heading4}
                </p>
              </div>
              <div className="flex-1 lg:p-0">
                <img src={bgCommon} alt="" />
              </div>
            </div>
            <div className="lg:px-10 md:mt-4 lg:mt-0 md-lt:px-4 lg:pb-28 md-lt:pb-10 flex lg:flex-row md-lt:flex-col items-start justify-between gap-5">
              {cardDataSecondary?.card3.map((card: any) => (
                <div
                  className="relative bg-black bg-opacity-20 border-[1px] border-[#006ef8] rounded-xl gap-5 px-8 pt-14 pb-24 flex flex-col space-y-4 items-start lg:w-[calc(33.333%-1.25rem)] md-lt:w-full lg:h-80 h-[40vh]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent 30%), linear-gradient(to top left, rgba(255, 255, 255, 0.1), transparent 30%)"
                  }}
                >
                  <div className="flex justify-start">
                    <img className="h-10 object-contain self-start m-0 p-0" src={card?.icon} alt="" />
                  </div>
                  <p className="md:text-[25px] lg:text-[28px]  xl:text-[32px] text-white font-light uppercase">{card?.text}</p>
                </div>


              ))}
            </div>
            <div className="px-4 lg:py-28 md-lt:py-8 md:mt-4 lg:mt-0">
              <div className="rounded-3xl h-screen  border-[1px] border-[#00F0FB] relative">

                {/* <div className="absolute top-[20%] left-[5%]">
                                    <div className="relative">
                                        <div className="absolute top-[5%] left-[80%] flex items-center justify-center w-56">
                                            <img src={thought} alt="Thought" className=" object-cover" />
                                            <span className="absolute text-white font-light text-[10px] text-center">I got so much recognition
                                                <br />out of this platform</span>
                                        </div>

                                        <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-36 h-36 rounded-full p-2 flex items-center justify-center">
                                            <img src={img1} alt="User" className="rounded-full" />
                                        </div>
                                    </div>
                                </div> */}
                {/* ================3=============== */}
                <div className="absolute top-[20%] left-[5%] md-lt:left-1/2 md-lt:top-[160px] md-lt:transform md-lt:-translate-x-1/2 pr-4">
                  <div className="relative">
                    <div className="absolute top-[5%] left-[80%] md-lt:-top-[25%] md-lt:left-[80%] flex items-center justify-center w-56 md-lt:w-[112px] md-lt:w-[112px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover"
                      />
                      <span className="absolute text-white font-light text-[10px] md-lt:text-[8px] text-center">
                        I got so much recognition
                        <br />
                        out of this platform
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2 flex items-center justify-center md-lt:w-10 md-lt:h-10 md-lt:p-1">
                      <img src={img1} alt="User" className="rounded-full" />
                    </div>
                  </div>
                </div>

                {/* <div className="absolute  top-[15%] left-[35%]">
                                    <div className="relative">
                                        <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 ">
                                            <img src={thought} alt="Thought" className=" object-cover transform scale-x-[-1]" />
                                            <span className="absolute text-white font-light text-[10px] text-center">I got so much recognition
                                                <br />out of this platform</span>
                                        </div>
                                        <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2">
                                            <img className="" src={img2} alt="" />
                                        </div>
                                    </div>
                                </div> */}
                {/* =====================2================== */}
                <div className="absolute top-[15%] left-[35%] md-lt:left-[8%] md-lt:top-[100px] md-lt:right-auto">
                  <div className="relative">
                    <div className="absolute -top-[25%] right-[80%] md-lt:left-[90%] flex items-center justify-center w-56 md-lt:w-[112px] md-lt:w-[112px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover transform scale-x-[-1] md-lt:scale-x-[1]"
                      />
                      <span className="absolute text-white font-light text-[10px] md-lt:text-[8px] text-center">
                        I got so much recognition
                        <br />
                        out of this platform
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2 md-lt:w-16 md-lt:h-16 md-lt:p-1">
                      <img className="" src={img2} alt="" />
                    </div>
                  </div>
                </div>
                {/* <div className="absolute  top-[12%] left-[70%]">
                                    <div className="relative">
                                        <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 ">
                                            <img src={thought} alt="Thought" className=" object-cover transform scale-x-[-1]" />
                                            <span className="absolute text-white font-light text-[10px] text-center">It took me less than hour to find <br />
                                                a Tool i was looking for</span>
                                        </div>
                                        <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2">
                                            <img className="" src={img3} alt="" />
                                        </div>
                                    </div>
                                </div> */}
                {/* ================1=================== */}
                <div className="absolute top-[12%] md-lt:top-[50px] left-[80%] md-lt:left-1/6 md-lt:transform md-lt:-translate-x-1/2">
                  <div className="relative">
                    <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 md-lt:w-[112px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover transform scale-x-[-1]"
                      />
                      <span className="absolute text-white font-light text-[10px] md-lt:text-[8px] text-center">
                        It took me less than hour to find <br />a Tool I was
                        looking for
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2 md-lt:w-16 md-lt:h-16 md-lt:p-1">
                      <img className="" src={img3} alt="" />
                    </div>
                  </div>
                </div>
                {/* ---------------------------------------------------- */}
                <div className="absolute top-[50%] left-[55%] md-lt:left-1/2 md-lt:top-[auto] md-lt:bottom-[100px] md-lt:transform md-lt:-translate-x-1/2">
                  <div className="relative">
                    <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 md-lt:w-[105px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover transform scale-x-[-1]"
                      />
                      <span className="absolute text-white font-light text-[10px] md-lt:text-[7px] text-center">
                        My business kicked off by 10%
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-32 h-32 rounded-full p-2 md-lt:w-20 md-lt:h-20 md-lt:p-1 flex items-center justify-center">
                      <img className="" src={img5} alt="" />
                    </div>
                  </div>
                </div>

                {/* <div className="absolute top-[55%] left-[85%]">
                                    <div className="relative">
                                        <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 ">
                                            <img src={thought} alt="Thought" className=" object-cover transform scale-x-[-1]" />
                                            <span className="absolute text-white font-light text-[10px] text-center">It took me less than hour to find <br />
                                                a Tool i was looking for</span>
                                        </div>
                                        <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-32 h-32 rounded-full p-2">
                                            <img className="" src={img6} alt="" />
                                        </div>
                                    </div>
                                </div> */}
                <div className="absolute top-[55%] md:top-[47%] md:left-[80%] left-[85%]  md-lt:left-auto md-lt:right-[50%] md-lt:top-[auto] md-lt:bottom-[215px]">
                  <div className="relative">
                    <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 md-lt:w-[105px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover transform scale-x-[-1]"
                      />

                      <span className="absolute text-white font-light text-[10px] md-lt:text-[7px] text-center">
                        It took me less than an hour to find
                        <br />a Tool I was looking for
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2 md-lt:w-16 md-lt:h-16 md-lt:p-1 flex items-center justify-center">
                      <img className="" src={img6} alt="" />
                    </div>
                  </div>
                </div>

                {/* =============------------------+++++++++++ */}
                <div className="absolute top-[47%] left-[25%] md-lt:right-[5%] md-lt:left-auto md-lt:top-[auto] md-lt:bottom-[150px]">
                  <div className="relative">
                    <div className="absolute -top-[25%] right-[80%] flex items-center justify-center w-56 md-lt:w-[105px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover transform scale-x-[-1]"
                      />
                      <span className="absolute text-white font-light text-[10px] md-lt:text-[7px] text-center">
                        It took me less than an hour to find
                        <br />a Tool I was looking for
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] w-40 h-40 rounded-full p-2 md-lt:w-16 md-lt:h-16 md-lt:p-1 flex items-center justify-center">
                      <img className="" src={img7} alt="" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-[75%] left-[5%] md-lt:left-[30%] md-lt:top-[auto] md-lt:bottom-[30px]">
                  <div className="relative flex items-center md:flex-row">
                    <div className="absolute -top-[5%] md:top-[20%] right-[80%] md:left-[98%] flex items-center justify-center w-56 md-lt:w-[112px]">
                      <img
                        src={thought}
                        alt="Thought"
                        className="object-cover transform md:scale-x-100 scale-x-[-1]"
                      />
                      <span className="absolute text-white font-light text-[10px] md-lt:text-[7px] text-center mt-1">
                        It took me less than an hour to find <br />a Tool I was
                        looking for

                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-[#641de5] to-[#d35fc9] flex items-center justify-center mr-15 w-40 h-40 rounded-full p-2 md-lt:w-16 md-lt:h-16 mt-4 md:mt-0 md:ml-4">
                      <img
                        className="object-cover w-full h-full"
                        src={img4}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute md:right-8 top-[75%] left-[70%] md-lt:left-auto md-lt:right-[5%] md-lt:top-[auto] md-lt:bottom-[30px] flex flex-col items-end  mt-8">
                  <span className="text-white font-semibold text-[60px] md-lt:text-[16px]">
                    1000+
                  </span>
                  <span className="text-[#00F0FB] font-bold md:text-[25px] lg:text-[30] xl:text-[50px] md-lt:text-[16px]">
                    Active Users
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:p-10 md-lt:p-4 space-y-10 md:mt-8 lg:mt-0">
              <div className="flex items-center justify-center">
                <p className="text-white font-bold lg:text-[80px] md-lt:text-[20px]">
                  Why Choose Our Platform?
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ">
                  <img
                    className="h-40 md:h-48 lg:h-64 object-contain"
                    src={one}
                    alt="One-Stop Solution"
                  />
                  <div className=" flex flex-col justify-center ">
                    <p className="text-lg md:text-xl lg:text-2xl text-[#00F0FB] font-bold mb-4">
                      One-Stop Solution:
                    </p>
                    <p className="text-sm md:text-base text-gray-300">
                      A comprehensive platform that connects users with the
                      products they need while offering developers a powerful
                      marketing and analytics tool to grow their audience.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ">
                  <img
                    className="h-40 md:h-48 lg:h-64 object-contain"
                    src={two}
                    alt="AI-Powered Insights"
                  />
                  <div className=" flex flex-col justify-center ">
                    <p className="text-lg md:text-xl lg:text-2xl text-[#00F0FB] font-bold mb-4">
                      AI-Powered Insights:
                    </p>
                    <p className="text-sm md:text-base text-gray-300">
                      Leverage AI to optimize promotions, analyze performance,
                      and reach a broader audience on social media.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ">
                  <img
                    className="h-40 md:h-48 lg:h-64 object-contain"
                    src={three}
                    alt="User and Developer-Friendly"
                  />
                  <div className=" flex flex-col justify-center ">
                    <p className="text-lg md:text-xl lg:text-2xl text-[#00F0FB] font-bold mb-4">
                      User and Developer-Friendly:
                    </p>
                    <p className="text-sm md:text-base text-gray-300">
                      Both users and developers benefit from our easy-to-use
                      interface, making it simple to discover, promote, and
                      enhance products.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="flex lg:flex-row md:flex-col md-lt:flex-col lg:items-center md-lt:items-start justify-between">
                <div className="flex lg:items-center md-lt:items-start lg:flex-1 lg:mx-2">
                  <img
                    className="lg:h-64 md:h-44 md-lt:h-44 object-contain"
                    src={one}
                    alt=""
                  />
                  <div className="ml-2 mt-14 space-y-4 ">
                    <p className="lg:text-[20px] md-lt:text-[14px] text-[#00F0FB] font-bold">
                      One-Stop Solution:
                    </p>
                    <p className="md-lt:text-[12px]">
                      A comprehensive platform that connects users with the
                      products they need while offering developers a powerful
                      marketing and analytics tool to grow their audience.
                    </p>
                  </div>
                </div>
                <div className="flex lg:items-center md-lt:items-start lg:flex-1 lg:mx-2">
                  <img
                    className="lg:h-64 md:max-w-[365px] lg:max-w-full md:h-44 md-lt:h-44 object-contain"
                    src={two}
                    alt=""
                  />
                  <div className="ml-2 mt-14 space-y-4 ">
                    <p className="lg:text-[20px] md-lt:text-[14px] text-[#00F0FB] font-bold">
                      AI-Powered Insights:
                    </p>
                    <p className="md-lt:text-[12px]">
                      Leverage AI to optimize promotions, analyze performance,
                      and reach a broader audience on social media.
                    </p>
                  </div>
                </div>
                <div className="flex lg:items-center md-lt:items-start lg:flex-1 lg:mx-2">
                  <img
                    className="lg:h-64 md:h-44 md-lt:h-44 object-contain"
                    src={three}
                    alt=""
                  />
                  <div className="ml-2 mt-14 space-y-4 ">
                    <p className="lg:text-[20px] md-lt:text-[14px] text-[#00F0FB] font-bold">
                      User and Developer-Friendly:
                    </p>
                    <p className="md-lt:text-[12px]">
                      Both users and developers benefit from our easy-to-use
                      interface, making it simple to discover, promote, and
                      enhance products.
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="flex items-center">
                <p className="text-[#00F0FB] lg:text-[22px] md-lt:text-[14px] font-normal text-center lg:px-48 md-lt:px-4 capitalize">
                  This detailed structure helps users and developers immediately
                  understand the value each feature brings, and why your
                  platform is the best choice for them.
                </p>
              </div>
            </div>
          </div>
        </div>
        <FooterFeature />
      </div>
    </>
  );
};

export default FeatureCommon;
