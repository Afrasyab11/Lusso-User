import { Globe, Video } from 'lucide-react';
import React from 'react';

interface ProfileProps {
    name: string;
    title: string;
    description: string;
    image: string
}

const HeaderSection: React.FC<ProfileProps> = ({ name, title, description, image }) => {
    return (
        <div className="text-white flex flex-col md:flex-row items-center justify-between my-10">
            <div className="md:w-1/2 mb-5 md:mb-0 flex flex-col gap-2 text-center md:text-left">
                <h2 className="text-3xl text-white font-semibold">I am {name}</h2>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold pb-4 header-text">
                    {title.split(",")[0].trim()}
                    <span className="block lg:inline"> + </span>
                    <br className='hidden md:block' />
                    {title.split(",")[1].trim()}
                </h1>

                <p className="mb-8 header-desc text-xl">{description}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button className="flex items-center border-2 border-whitebg-transparent text-white font-bold py-2 px-4 rounded-full">
                        Book Appointment
                        <Video className="ms-2" size={20} />
                    </button>
                    <button className="flex items-center border-2 border-white bg-transparent text-white font-bold py-2 px-4 rounded-full">
                        Visit Website
                        <Globe className="ms-2" size={20} />
                    </button>
                </div>
            </div>
            {/* <div className="md:w-1/2 flex justify-center md:justify-end mt-5 md:mt-0">
                <div className="md:h-90 lg:h-100 rounded-2xl right-image">
                    <img src={image} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                </div>
            </div> */}
            <div className="md:w-1/2 flex justify-center md:justify-end mt-5 md:mt-0">
                <div className="md:h-90 lg:h-100 rounded-2xl hover:rounded-3xl hover:border-3 right-image transform transition-all duration-300 hover:rotate-[0deg]">
                    <img src={image} alt="Profile" className="w-full h-full object-cover rounded-2xl hover:rounded-3xl" />
                </div>
            </div>

        </div>
    );
};

export default HeaderSection