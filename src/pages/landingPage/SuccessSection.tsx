/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
import image1 from '../../assets/images/home/success-section/1.png';
import image2 from '../../assets/images/home/success-section/2.png';
import image3 from '../../assets/images/home/success-section/3.png';
import image4 from '../../assets/images/home/success-section/4.png';
import arrow from '../../assets/images/home/success-section/arrow.png';
interface SuccessCardType {
  index: number
  image: any
  hasVideo: boolean
  link: string,
  text: any,
  path: any
}
const SuccessCard = ({ index, image, hasVideo, link, text, path }: SuccessCardType) => {
  const openInNewWindow = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.open(link, '_blank', 'width=800,height=600,noopener,noreferrer');
  };

  return (
    <div
      className={`relative group overflow-hidden 
                        ${index === 0 && 'md:w-7/12 md:pe-5'} 
                        ${index === 1 && 'md:w-5/12'} 
                        ${index === 2 && 'md:w-5/12 md:pe-5'} 
                        ${index === 3 && 'md:w-7/12'} 
                        md:pt-10 pt-2 border-[5px] border-transparent rounded-[5px`}
    >
      <a href={link} onClick={openInNewWindow}>
        <img src={image} alt={'image'}
          className={`md:rounded-none rounded-[10px] w-full md:h-full md:object-cover object-contain
                            ${index === 0 && 'md:rounded-tl-2xl'} 
                            ${index === 1 && 'md:rounded-tr-2xl'}
                            ${index === 2 && 'md:rounded-br-2xl'}
                            ${index === 3 && 'md:rounded-bl-2xl'}
                            h-42`} />
        <div className={`absolute inset-0 flex items-start ${index === 0 ? "top-[20%] left-[10%]" : index === 1 ? "top-[45%] left-[10%]" : index === 2 ? "top-[45%] left-[10%]" : "top-[20%] left-[10%]"} cursor-pointer flex-col gap-4`} style={{
          lineHeight: 1,
          margin: 0,
          padding: 0
        }}>
          <p className='text-[38px] font-bold w-96 text font-bigShoulders'>{text}</p>
          <div className='flex items-end gap-2 '>
            <p>{path}</p>
            <img className='h-3' src={arrow} alt="" />
          </div>
        </div>

        {/* <div className="absolute bottom-0 h-[100px] w-full bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <p className="max-w-[70%] text-white text-center px-4 text-sm md:text-base transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            Short description about the success story. This will appear on hover.
          </p>
        </div> */}
      </a>
    </div>
  );
};

const SuccessSection = () => {

  const successStories = [
    { image: image1, hasVideo: true, link: "https://coincheckup.com/blog/lusso-labs-a-catalyst-for-your-business-success/", text: "A Catalyst for Your Business Success", path: "coincheckup.com" },
    { image: image2, hasVideo: false, link: "https://www.thecryptoupdates.com/lusso-labs-helping-your-business-reach-its-potential/", text: "A Reliable Partner for Your Business Success", path: "thecryptoupdates.com" },
    { image: image3, hasVideo: false, link: "https://techbullion.com/lusso-labs-a-reliable-partner-for-your-business-success/", text: "Helping Your Business Reach its Potential", path: "techbullion.com" },
    { image: image4, hasVideo: true, link: "https://cryptomode.com/news/finance/lusso-labs-empowering-your-business-for-growth/", text: "Empowering Your Business for Growth", path: "cryptomode.com" },
  ];

  return (
    <div className="md:py-10 py-5 md:px-4 px-0 sm:px-6 lg:px-8">
      <h2 className="text-[18px] md:text-5xl font-bold text-center text-white">
        WHAT SUCCESS ON LUSSO <br /> LOOKS LIKE
      </h2>
      <div className="flex flex-wrap md:mt-[50px]">
        {successStories.map((story, index = 0) => (
          <SuccessCard link={story.link} key={index} index={index} image={story.image} hasVideo={story.hasVideo} text={story.text} path={story.path} />
        ))}
      </div>
    </div>
  );
};

export default SuccessSection;
