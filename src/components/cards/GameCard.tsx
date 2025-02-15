// src/components/GameCard.tsx
import React from 'react';

interface Game {
    title: string;
    subtitle: string;
    image?: string;
    imageSrc?: string;
    rating?: number;
}

interface GameCardProps {
    game: Game;
    bg?: string
}

const GameCard: React.FC<GameCardProps> = ({ game, bg }) => {
    return (
        <div className='hover:border-2 hover:border-white hover:p-1.5 rounded-md lg:rounded-2xl'>
            <div className={` cursor-pointer rounded-md lg:rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between text-white`}
                style={{
                    background: bg ? bg : '#2E246C'
                }}>
                <div className='flex-0'>
                    <img src={game?.image ? game.image : game?.imageSrc} alt={game.title} className="w-20 h-20 rounded-lg object-cover" />
                </div>
                <div className="flex-1 mx-4">
                    <h3 className="text-lg font-bold text-center lg:text-left">{game.title}</h3>
                    <p className="text-sm text-[#B1ADCD]">{game.subtitle}</p>
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 13" fill="none" className='me-2'>
                        <g clip-path="url(#clip0_2466_33880)">
                            <path d="M11.6963 5.11287C11.6536 4.98532 11.5431 4.8924 11.4101 4.87195L7.88081 4.3327L6.29949 0.964111C6.24029 0.838179 6.11364 0.757812 5.97461 0.757812C5.83558 0.757812 5.70911 0.838179 5.64974 0.964111L4.06841 4.3327L0.53909 4.87213C0.406162 4.8924 0.295837 4.9855 0.252963 5.11305C0.210268 5.24041 0.242379 5.38105 0.336379 5.47739L2.90058 8.10671L2.2946 11.8208C2.27236 11.9564 2.32958 12.0929 2.44206 12.1719C2.50377 12.2155 2.57607 12.2375 2.64854 12.2375C2.7081 12.2375 2.76801 12.2225 2.82219 12.1927L5.97443 10.4492L9.12668 12.1927C9.18085 12.2225 9.24077 12.2375 9.30032 12.2375C9.3728 12.2375 9.44527 12.2155 9.5068 12.1719C9.61928 12.0929 9.67651 11.9564 9.65426 11.8208L9.04828 8.10671L11.6125 5.47739C11.7067 5.38088 11.739 5.24023 11.6963 5.11287Z" fill="#EABA12" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2466_33880">
                                <rect width="11.481" height="11.481" fill="white" transform="translate(0.234375 0.757812)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-lg text-[#00F0FB]">{game?.rating ? game.rating.toFixed(1) : 0}</span>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
