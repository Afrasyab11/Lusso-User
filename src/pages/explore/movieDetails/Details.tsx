import steamIcon from '../../../assets/images/explore/category/games/available-at-1.png';
import activisionIcon from '../../../assets/images/explore/category/games/available-at-2.png';
import { LineDraw } from './MovieDetailsScreen';



function Details({ selectedOption, setSelectedOption }: any) {

    const availabilityOptions = ['Epic', 'Historical Epic', 'Period Drama', 'Psychlogical Drama', 'Biography', 'Drama'];


    const platformInfo = [
        {
            logo: steamIcon,
            description: 'Violence, Bad Language',
            purchaseTxt: 'In-Game Purchases',
            price: '10.99/ month',
            subtext: 'Offers In-App Purchases'
        },
        {
            logo: activisionIcon,
            description: 'Violence, Bad Language',
            purchaseTxt: 'In-Game Purchases',
            price: '10.99/ month',
            subtext: 'Offers In-App Purchases'
        }
    ];
    return (

        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <div className="relative mb-3 bg-[#161328] rounded-2xl p-5">
                <div className="flex items-center space-x-2 overflow-x-auto pr-10">
                    {availabilityOptions?.map((option) => (
                        <button
                            key={option}
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedOption === option
                                ? 'bg-[#5721B9] text-white'
                                : 'border-[#7D3CF3] border-2 text-[#F2F0FF]'
                                }`}
                            onClick={() => setSelectedOption(option)}
                            style={{ flex: '1 0 auto' }} // Allows buttons to grow and shrink
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {availabilityOptions.length > 5 && (
                        <span className="text-white cursor-pointer">
                            {/* White Arrow SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </span>
                    )}
                </div>
            </div>

            <p>The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.</p>
            <LineDraw />
            <h1 className="text-white">
                Director <span className="text-[#6DDCFF] cursor-pointer pl-3" >Christopher Nolan</span>
            </h1>
            <LineDraw />
            <h1 className="text-white">
                Writer <span className="text-[#6DDCFF] cursor-pointer pl-3" >Christopher Nolan</span>, <span className="text-[#6DDCFF] cursor-pointer" >Kai Bird</span>
            </h1>
            <LineDraw />
            <h1 className="text-white">
                Stars <span className="text-[#6DDCFF] cursor-pointer pl-3" >Cillian Murphy</span>, <span className="text-[#6DDCFF] cursor-pointer" >Emiley</span>, <span className="text-[#6DDCFF] cursor-pointer">Matt Damon</span>
            </h1>
            <LineDraw />
        </div>
    )
}

export default Details