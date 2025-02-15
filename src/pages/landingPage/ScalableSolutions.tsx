import React from 'react';
import scalableRight from '../../assets/images/home/scalableRight.svg';
import scalableBg from '../../assets/images/home/scalablebg.svg';

const ScalableSolutions: React.FC = () => {
    return (
        <div className="bg-[#151529] w-full justify-center py-8 lg:py-24">
            <div className="mx-auto lg:w-10/12 text-white p-0 lg:p-8 flex flex-col lg:flex-row justify-center items-center gap-10">
                <div id="left" className="flex-1 order-1 lg:order-1 px-8"> {/* Change order to 1 for mobile */}
                    <div className="relative">
                        <h1 className="text-3xl lg:text-6xl font-bold leading-tight">
                            <span className="text-[#00F0FB]">100% Scalable</span>
                            <br />
                            Solutions for <span
                                style={{ backgroundImage: `url(${scalableBg})` }}
                                className={`relative inline-block z-20 bg-no-repeat bg-contain overflow-visible bg-bottom`}>
                                Growth
                            </span>
                        </h1>
                    </div>
                    <p className="text-white mb-6">Our platform grows with you, offering scalable features and resources to support your expanding business needs.</p>
                </div>
                <div id="right" className="flex-1 order-2 lg:order-2"> {/* Change order to 2 for mobile */}
                    <div className="relative">
                        <img src={scalableRight} className="w-full lg:w-[80%] float-right" alt="scalableRight" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScalableSolutions;