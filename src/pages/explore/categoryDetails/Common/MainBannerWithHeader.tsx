import CourseHeader from '../../courses/CourseHeader'
import Header from './Header'

interface MainBannerWithHeaderProps {
    bannerImg: string
    headerData: any
    isCourse?: boolean
    isService?: boolean
    handleContactAction?: any
    handleUserAction?: any
    product: any
    onAppointmentBook?: any
    isCreator?: boolean
}

export default function MainBannerWithHeader({ isCreator = false, bannerImg, headerData, product, isCourse = false, isService = false, handleContactAction = null, handleUserAction, onAppointmentBook }: MainBannerWithHeaderProps) {
    return (
        <div className="relative w-full md:h-[50rem] overflow-hidden rounded-lg">
            {/* Blurred background image */}
            <div
                className="block md:block absolute inset-0 bg-contain object-contain bg-center backdrop-blur-xl md:backdrop-blur-none"
                style={{
                    backgroundImage: `url(${bannerImg})`,
                    filter: 'blur(1px)',
                    transform: 'scale(1.1)'
                }}
            />
            <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-[#18142D]/90 via-[#18142D]/70 to-transparent"></div>

            {/* Gradient overlay */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex justify-center items-end">
                <div className='content-new'>
                    <div className={`${isCreator ? 'lg:max-w-[100%]' : 'lg:max-w-[80%]'} mx-auto px-4 py-8`}>
                        {isCourse ? <CourseHeader isCreator={isCreator} headerData={headerData} handleUserAction={handleUserAction} product={product} /> :
                            // isService ? <ServiceHeader headerData={headerData} product={product} handleContactAction={handleContactAction} handleUserAction={handleUserAction} onAppointmentBook={onAppointmentBook} />
                            <Header isCreator={isCreator} headerData={headerData} handleUserAction={handleUserAction} product={product} />}
                    </div>
                </div>
            </div>
        </div>
    )
}