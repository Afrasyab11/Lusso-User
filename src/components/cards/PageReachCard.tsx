import { useState } from 'react';

const PageReachCard = ({ platform, visitors, newUsers, users }: { platform: string, visitors: string, newUsers: string, users: string[] | any }) => {
    const [selectedPlatform, setSelectedPlatform] = useState(platform || 'Twitter');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const platforms = ['Twitter', 'Facebook', 'Instagram'];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const selectPlatform = (platform: any) => {
        setSelectedPlatform(platform);
        setDropdownOpen(false);
    };

    return (
        <div className="w-full card-bg-dev text-white p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">Page Reach</h2>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center bg-[#49209C] text-white px-4 py-2 rounded-lg"
                    >
                        {selectedPlatform}
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-32 card-bg-dev text-white rounded-lg z-10">
                            {platforms.map((platform) => (
                                <li
                                    key={platform}
                                    onClick={() => selectPlatform(platform)}
                                    className="px-4 py-2 cursor-pointer"
                                >
                                    {platform}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex gap-2 h-[70px] mb-[30px] justify-center items-end">
                <p className="text-3xl font-bold">{visitors}</p>
                <p className="text-lg">visitors per month</p>
            </div>

            <div className="flex items-center justify-center">
                <div className="flex -space-x-3">
                    {users.map((user: any, index: number) => (
                        <img
                            key={index}
                            className="w-18 h-18 rounded-full"
                            src={user.image}
                            alt={`User ${index + 1}`}
                        />
                    ))}
                </div>
                <p className="ml-4 text-gray-400">{newUsers} New users</p>
            </div>
        </div>
    );
};

export default PageReachCard;
