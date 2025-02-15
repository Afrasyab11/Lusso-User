import React from 'react';
import customers from '../../assets/images/home/trusted-customers.svg';

type LogoSliderProps = {
    logos: string[];
};

const LogoSlider: React.FC<LogoSliderProps> = ({ logos }) => {
    return (
        <div className="md:py-8 md:py-4">
            <div className="text-center text-white text-lg pb-2 md:pb-6 px-3">
                TRUSTED BY THE WORLD'S MOST INNOVATIVE CLIENTS
            </div>

            <div className="hidden md:flex flex-wrap justify-center items-center mt-5 md:space-y-5">
                {logos.map((logo, index) => (
                    <div key={index} className="px-4 w-1/4 md:w-auto">
                        <img
                            src={logo}
                            alt={`Logo ${index + 1}`}
                            className="h-12 w-auto object-contain mx-3"
                        />
                    </div>
                ))}
            </div>
            <div className="md:hidden">
                <img
                    src={customers}
                    alt="customers"
                    className="w-[80%!important] m-auto"
                />
            </div>
        </div>
    );
};

export default LogoSlider;