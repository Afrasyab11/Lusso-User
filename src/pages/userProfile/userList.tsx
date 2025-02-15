import React from 'react';

interface UserListProps {
    icon: string;
    text: string;
    iconSize?: string;
    textStyle?: string;
    isActive?: boolean;
    onClick?: () => void;
}

const UserList: React.FC<UserListProps> = ({ icon, text, iconSize = "w-6 h-6", textStyle = "text-[#FFFFFF] lg:text-lg", isActive = false,
    onClick = () => { }, }) => {
    return (
        <div className={`flex items-center gap-4 cursor-pointer ${isActive ? 'category-card-active' : ''}`} onClick={onClick} >
            <div>
                <img src={icon} alt="" className={iconSize ?? "w-6 h-6"} />
            </div>
            <div>
                <span className={`font-medium ${isActive ? "text-[#00F0FB]" : textStyle}`}>{text}</span>
            </div>
        </div >
    );
};

export default UserList;
