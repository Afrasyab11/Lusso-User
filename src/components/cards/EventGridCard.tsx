// src/components/eventDataCard.tsx
import React from "react";
import nextIcon from "../../assets/images/icons/next-icon.svg";

interface Event {
    title: string;
    subtitle: string;
    image?: string;
    imageSrc?: string;
    rating?: number;
    para?: string;
    label?: string;
}

interface EventCardProps {
    eventData: Event;
    hprop?: string
    bg?: string;
}

const EventGridCard: React.FC<EventCardProps> = ({ eventData, bg, hprop }) => {
    return (
        <div className="hover:border-2 hover:border-white hover:p-1.5 rounded-md lg:rounded-2xl">
            <div
                className={` cursor-pointer rounded-md lg:rounded-2xl p-4 flex flex-col justify-between  gap-6 text-start text-white`}
                style={{
                    background: bg ? bg : "#2E246C",
                }}
            >
                <div className=" text-start">
                    <div className="flex-0">
                        <img
                            src={eventData?.image ? eventData.image : eventData?.imageSrc}
                            alt={eventData.title}
                            className={` ${hprop ? hprop : "h-32"} rounded-lg object-cover mb-4`}
                        />
                    </div>
                    <div className="flex-1 ">
                        <h3 className="text-lg font-bold text-left mb-4">
                            {eventData?.title}
                        </h3>
                        <div className="mb-4 text-[#5B97FF]">{eventData?.subtitle}</div>
                        <p className="text-sm text-[#B1ADCD] mb-4">{eventData?.para}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-[#00FFFF] uppercase">
                            {eventData?.label}
                        </span>
                        <div className="text-center">
                            <img src={nextIcon} className="h-2 w-3.5" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EventGridCard;
