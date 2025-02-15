import { useRef } from 'react';
import { LineDraw } from './MovieDetailsScreen';

interface TeamMember {
    name: string;
    role: string;
    url: string; // Assuming this is the image URL
}

interface CastProps {
    teamInfo: TeamMember[]; // Array of team members
}

function Cast({ teamInfo }: CastProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

    // Function to scroll the slider left or right
    const scrollSlider = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-3 bg-[#111924] rounded-2xl p-5 relative">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <LineDraw />

            {/* Left Button */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10"
                onClick={() => scrollSlider('left')}
            >
                ←
            </button>

            {/* Slider Container */}
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide" ref={sliderRef}>
                {/* Loop through the teamInfo array to display name, role, and image */}
                {teamInfo && teamInfo.length > 0 ? (
                    teamInfo.map((member: any, index: number) => (
                        <div key={index} className="w-48 flex-shrink-0">
                            <img
                                src={member.url}
                                alt={member.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <h3 className="text-white text-center mt-2 font-bold">{member.name}</h3>
                            <p className="text-gray-400 text-center">{member.role}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No cast information available.</p>
                )}
            </div>

            {/* Right Button */}
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10"
                onClick={() => scrollSlider('right')}
            >
                →
            </button>
        </div>
    );
}

export default Cast;


// import { useRef } from 'react';
// import { LineDraw } from './MovieDetailsScreen';
// interface TeamMember {
//     name: string;
//     role: string;
//     url: string; // Assuming this is the image URL
// }
// interface CastProps {
//     teamInfo: TeamMember[]; // Array of team members
// }

// function Cast({ teamInfo }: CastProps) {
//     const sliderRef = useRef<HTMLDivElement>(null);

//     // Function to scroll the slider left or right
//     const scrollSlider = (direction: 'left' | 'right') => {
//         if (sliderRef.current) {
//             const scrollAmount = direction === 'left' ? -300 : 300;
//             sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//         }
//     };

//     return (
//         <div className="mb-3 bg-[#111924] rounded-2xl p-5 relative">
//             <h2 className="text-xl font-bold mb-4">Cast</h2>
//             <LineDraw />

//             {/* Left Button */}
//             <button
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10"
//                 onClick={() => scrollSlider('left')}
//             >
//                 ←
//             </button>

//             {/* Slider Container */}
//             <div className="flex overflow-x-auto space-x-4" ref={sliderRef}>
//                 {/* Loop through the teamInfo array to display name, role, and image */}
//                 {teamInfo && teamInfo.length > 0 ? (
//                     teamInfo.map((member: any, index: number) => (
//                         <div key={index} className="w-48 flex-shrink-0">
//                             <img
//                                 src={member.url}
//                                 alt={member.name}
//                                 className="w-full h-64 object-cover rounded-lg"
//                             />
//                             <h3 className="text-white text-center mt-2 font-bold">{member.name}</h3>
//                             <p className="text-gray-400 text-center">{member.role}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-white">No cast information available.</p>
//                 )}
//             </div>

//             {/* Right Button */}
//             <button
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10"
//                 onClick={() => scrollSlider('right')}
//             >
//                 →
//             </button>
//         </div>
//     );
// }

// export default Cast;

// import demo1 from '../../../assets/images/explore/category/movies/Frame1321315193.png';
// import { LineDraw } from './MovieDetailsScreen';

// function Cast() {
//     return (
//         <div className="mb-3 bg-[#161328] rounded-2xl p-5">
//             <h2 className="text-xl font-bold mb-4">Cast</h2>
//             <LineDraw />
//             <div className="flex overflow-x-auto space-x-4">
//                 <img src={demo1} alt="Screenshot 1" className="w-72 h-48 rounded-lg" />
//                 {/* <img src={demo2} alt="Screenshot 2" className="w-72 h-48 rounded-lg" />
//                 <img src={demo3} alt="Screenshot 3" className="w-72 h-48 rounded-lg" />
//                 <img src={demo1} alt="Screenshot 1" className="w-72 h-48 rounded-lg" />
//                 <img src={demo2} alt="Screenshot 2" className="w-72 h-48 rounded-lg" />
//                 <img src={demo3} alt="Screenshot 3" className="w-72 h-48 rounded-lg" />
//                 <img src={demo1} alt="Screenshot 1" className="w-72 h-48 rounded-lg" />
//                 <img src={demo2} alt="Screenshot 2" className="w-72 h-48 rounded-lg" />
//                 <img src={demo3} alt="Screenshot 3" className="w-72 h-48 rounded-lg" /> */}
//             </div>
//         </div>
//     );
// }
// export default Cast