
import cardPc from '../../assets/images/explore/card-pc.svg'
import graphicHub from '../../assets/images/explore/graphic-hub.png'
import udemyImg from '../../assets/images/explore/udemy.png'

function CardSectionMiddle() {
    return (
        <div className='flex flex-col lg:flex-row gap-5 w-full'>
            {/* card1 */}

            <div className='middleCard1 flex-1 p-3 min-h-[350px] flex items-center rounded-3xl'>
                <div className='md:w-1/2 flex flex-col gap-4 ps-3'>
                    <div>
                        <img src={udemyImg} alt='udemyImg' />
                    </div>
                    <h2 className="text-xl md:text-4xl lg:text-3xl font-bold uppercase text-white">
                        All in one design course
                    </h2>
                    <span className='text-white'>This is your Product Subtitle Text...</span>
                    <div className='text-left'>
                        <button className='p-3 px-5 text-white bg-[#5721B9] w-auto rounded-3xl'>
                            Read More
                        </button>
                    </div>
                </div>

            </div>

            {/* card 2 */}

            <div className='middleCard2 flex-1 p-3 min-h-[350px] flex items-center rounded-3xl relative'>
                <div className='md:w-1/2 flex flex-col gap-4 ps-4 items-start'>
                    <div>
                        <img src={graphicHub} alt='udemyImg' />
                    </div>
                    <h2 className="text-xl md:text-4xl lg:text-3xl  uppercase text-white text-left">
                        Total solutions for
                        all problems
                    </h2>
                    <span className='text-white'>This is your Product Subtitle Text...</span>
                    <div>
                        <button className='p-3 px-5 text-white bg-[#1A6BCB] w-auto rounded-3xl'>
                            Read More
                        </button>
                    </div>
                    <div className='absolute right-2 bottom-0'>
                        <img src={cardPc} alt='img' className='w-[280px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSectionMiddle