import { LineDraw } from '../GameDetailsScreen';

const SpecialPriceSection: any = ({ pricingData }: any) => {
    return (
        <div className="mb-3 bg-[#18142D] text-white p-6 rounded-lg w-full">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Special Pricing</h2>
                <span className="border-2 border-[#7D3CF3] text-white text-md font-bold px-4 py-1.5 rounded-full">
                    SAVE ${pricingData.savings}
                </span>
            </div>
            <LineDraw />

            <div className="mb-2 md:w-[40%]">
                <p className="text-lg text-white mb-1 font-semibold">EVERY DAY</p>
                <h3 className="text-3xl text-whtie font-bold border-b-[2px] 
                    border-b-[#121933]">{pricingData.title}</h3>
                <p className="text-md text-[#985FFF] font-semibold">{pricingData.subtitle}</p>
            </div>

            <ul className="mb-6 space-y-2">
                {pricingData.features.map((feature: any, index: number) => (
                    <li key={index} className="flex items-center text-md ps-7">
                        <span className="font-bold">{feature.title}</span> <span className="font-normal ml-1">{feature.desc}</span>
                    </li>
                ))}

            </ul>
            <LineDraw />

            <div className='flex flex-col md:flex-row gap-2 justify-start md:justify-between md:items-center pt-3'>
                <div className="flex items-center md:justify-between mb-4 space-x-2">
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold">
                            <sup className='font-normal mt-2'>$</sup>
                            {pricingData.price}
                        </span>
                        <span className="text-sm ml-1" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>/hour</span>
                    </div>
                    <span className="bg-[#CC00F2] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        -{pricingData.discount}%
                    </span>
                </div>
                {/* <div className='flex items-center md:justify-end'>
                    <button className="bg-[#5721B9] w-fit md:w-full text-white font-bold py-1.5 px-4 rounded-full transition duration-300 flex items-center justify-center">
                        Select Plan
                        <ChevronRightCircle className="ml-2 w-4 h-4" />
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default SpecialPriceSection