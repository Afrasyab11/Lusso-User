import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';
import prflImg from '../../assets/images/dev/profile.png';
const ProfileCard = () => {
    // Initialize state with profile data
    const [profile, setProfile] = useState({
        name: 'Alan Watson',
        title: 'UI + UX Designer',
        followers: '25M+',
        profileImage: prflImg, // Replace with actual image URL
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event: any) => {
        if (!event.target.closest('.dropdown-container')) {
            setDropdownOpen(false);
        }
    };

    // Listen for clicks outside the dropdown to close it
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="card-bg-dev p-6 rounded-2xl text-center text-white shadow-lg">
            <div className="flex justify-end dropdown-container">
                <button onClick={toggleDropdown}>
                    <Ellipsis className="h-6 w-6 text-white cursor-pointer" />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-5 mt-8 w-40 card-bg-dev rounded-md shadow-lg py-1 z-20">
                        <ul className="text-white">
                            <li className="px-4 py-2 cursor-pointer">
                                Edit Profile
                            </li>
                            <li className="px-4 py-2 cursor-pointer">
                                Settings
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="relative mx-auto w-32 h-32">
                <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="rounded-full object-cover w-full h-full"
                    style={{ boxShadow: '0px -1px 13px -1px #985FFF' }}
                />
            </div>
            <h3 className="mt-4 text-2xl font-bold">{profile.name}</h3>
            <p className="text-md text-white opacity-[50%]">{profile.title}</p>
            <div className="mt-4 flex gap-2 items-end justify-center">
                <p className="text-3xl font-bold">{profile.followers}</p>
                <p className="text-md">Followers</p>
            </div>
        </div>
    );
};

export default ProfileCard;
