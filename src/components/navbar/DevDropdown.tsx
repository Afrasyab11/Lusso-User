import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AccountIcon from '../../assets/images/icons/account-icon.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';
import { checkNullOrEmpty, getCookies } from '../../utils/utils';
import UserAvator from '../common/UserAvator';

interface DevDropdownType {
    image: string;
}
function DevDropdown({ image }: DevDropdownType) {
    const navigate = useNavigate();

    const [authUser, setAuthUser] = useState<{ [key: string]: any }>({})

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const interval = setInterval(() => {
            const authCreator = getCookies('authUser');
            setAuthUser(authCreator ?? {});
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('/dev/manageprofile');
    };

    const handleLogout = () => {
        Cookies.remove('authToken');
        Cookies.remove('authUser');
        navigate('/');
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="cursor-pointer flex flex-row items-center py-2 pl-2 pr-5 gap-3 bg-black bg-opacity-20 rounded-full"
            >
                <div
                    style={{
                        background: 'linear-gradient(180deg, #370C8C 0%, #3D1673 100%)',
                    }}
                    className="w-[40px] h-[40px] flex justify-center items-center rounded-full"
                >
                    <UserAvator className="object-contain rounded-full" />
                </div>
                <div className="flex flex-col ">
                    <div className="flex justify-between items-center gap-10">
                        <p className="text-white lg:text-[12px] md:text-[8px]">
                            {checkNullOrEmpty(authUser?.fullName)
                                ? authUser?.channelName ?? authUser?.username ?? ''
                                : authUser?.fullName}
                        </p>
                        <MdKeyboardArrowDown className="text-white text-[25px]" />
                    </div>
                    {/* <div className='flex justify-between items-center gap-2'>
                        <p className='text-white text-[10px]'>72%</p>
                        <div className='relative h-2 bg-white bg-opacity-10 w-full rounded-full'>
                            <div
                                className='absolute top-0 left-0 h-full bg-[#00F0FB] rounded-full'
                                style={{ width: `72%` }} />
                        </div>
                    </div> */}
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: '150px',
                        overflow: 'visible',
                        backgroundColor: '#00000099',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 50,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: '#00000099',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleProfile} className="flex gap-x-2">
                    <>
                        <img src={AccountIcon} alt="" />
                    </>
                    <span className="text-white text-normal text-[14px]">Profile</span>
                </MenuItem>
                <MenuItem onClick={handleLogout} className="flex gap-x-2">
                    <>
                        <img src={LogoutIcon} alt="" />
                    </>
                    <span className="text-white text-normal text-[14px]">Logout</span>
                </MenuItem>
            </Menu>
        </>
    );
}

export default DevDropdown;
