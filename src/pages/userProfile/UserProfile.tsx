import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/userSettings/arrow-left.svg";
import avatar from "../../assets/images/userSettings/avatar.svg";
import lock from "../../assets/images/userSettings/lock.svg";
import notification from "../../assets/images/userSettings/notification.svg";
import { getCookies } from "../../utils/utils";
import AccountSecurityContent from "./components/accountSecurity/AccountSecurityContent";
import NotificationContent from "./components/userNotification/NotificationContent";
import UserProfileContent from "./components/UserProfileContent";
import UserList from "./userList";

const UserProfile = () => {
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [isEdit, setIsEdit] = useState(false)
    const [userProfile, setUserProfile] = useState<any>();

    const navigate = useNavigate()

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedIndex]);

    useEffect(() => {
        if (navigator.onLine) {
            getUserProfile();
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, []);

    const getUserProfile = async () => {
        try {
            let token = getCookies('authToken');
            if (token) {


                let userDataResponse = await axios.get('https://api.lusso.dev/api/v1/userProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (userDataResponse) {
                    setUserProfile(userDataResponse.data);
                }
                console.log("User data profile is here", userDataResponse);
            }
        } catch (err) {
            console.error(err); // Log any errors
        }
    };

    const headerData = [
        {
            title: "User Profile",
            subtitle: "Account",
            buttonLabel: "Edit"
        },
        {
            title: "Account Security",
        },
        {
            title: "Notification",
            subtitle: "Presences",
        }
    ];
    return (

        <>

            <div className="bg-blurred-new text-white flex flex-col lg:flex-row">
                <div className="lg:flex-[0.8] flex-auto lg:mr-4 p-4">
                    <div className="flex items-center md:justify-start justify-center gap-2 mb-12 cursor-pointer" onClick={() => navigate("/explore")}>
                        <div>
                            <img src={arrow} alt="" className="w-4.5 h-4.5" />
                        </div>
                        <div>
                            <span className="font-bold text-[#FFFFFF] text-xl">
                                Back to Home
                            </span>
                        </div>
                    </div>

                    <div className="md:hidden text-center mb-5"
                        style={{
                            background: 'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '2em',
                            fontWeight: 'bold',
                        }}>
                        User Profile
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-6 md:mb-12">
                        <div>
                            <img src={avatar} alt="" className="w-full" />
                        </div>
                        <div>
                            <span className="font-semibold text-xl text-[#FFFFFF] lg:text-2xl capitalize ">
                                {userProfile?.username}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 md:mb-12">
                        <UserList
                            icon={lock}
                            text="User Profile"
                            isActive={selectedIndex === 0}
                            onClick={() => handleSelect(0)}
                        />
                        <UserList
                            icon={lock}
                            text="Account Security"
                            isActive={selectedIndex === 1}
                            onClick={() => handleSelect(1)}
                        />
                        <UserList
                            icon={notification}
                            text="Notification"
                            isActive={selectedIndex === 2}
                            onClick={() => handleSelect(2)}
                        />
                    </div>
                </div>
                <div className="lg:flex-[3] flex-auto p-4">
                    <div className="flex justify-center md:justify-between items-center mb-8">
                        <div className="md:flex flex-col hidden">
                            <span className="font-bold text-2xl text-[#8423F4]">
                                {headerData[selectedIndex].title ?? ""}
                            </span>
                            <span className="font-normal text-[#FFFFFF] text-xl">
                                {headerData[selectedIndex].subtitle ?? ""}
                            </span>
                        </div>
                        {(headerData[selectedIndex].buttonLabel && !isEdit) ? (
                            <button className="bg-gradient-vertical rounded-3xl px-10 py-2"
                                onClick={() => {
                                    setIsEdit(true)
                                }}
                            >
                                {headerData[selectedIndex].buttonLabel}
                            </button>
                        ) : null}

                    </div>
                    <div className="flex flex-col gap-5">
                        {selectedIndex === 0 && <UserProfileContent isEdit={isEdit} setIsEdit={setIsEdit} />}
                        {selectedIndex === 1 && <AccountSecurityContent />}
                        {selectedIndex === 2 && <NotificationContent />}
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserProfile;