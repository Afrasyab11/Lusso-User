import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashBoardActiveIcon from '../../assets/images/dashboard-icon-active.svg';
import ManageProfileActiveIcon from '../../assets/images/manage-profile-active.svg';
import { getCookies } from '../../utils/utils';
import "./SideBarNew.scss";

interface CategoryType {
    id: number;
    title: string;
    icon: string;
    activeIcon?: string;
}

interface JwtPayload {
    role: string;
}

const SidebarExplore = ({ shouldRefresh, scrollToTop }: { shouldRefresh: string, scrollToTop: any }) => {
    const navigate = useNavigate();
    // const { scrollToSection } = useScroll();
    const [activeTab, setActiveTab]: any = useState(1);
    const [activeSubTab, setActiveSubTab]: any = useState('');
    const [userType, setUserType]: any = useState('');
    const [categories, setCategories]: any = useState([]);

    useEffect(() => {
        if (shouldRefresh) {
            // Refresh logic for sidebar here
            //   console.log("SidebarExplore refreshed");
            if (shouldRefresh === 'addproduct') {
                setActiveTab(2);
            }
            else if (shouldRefresh === 'manageprofile') {
                setActiveTab(5);
            }
        }
    }, [shouldRefresh]);

    useEffect(() => {
        let token = getCookies('authToken');
        if (token) {
            let payload = jwtDecode<JwtPayload>(token);
            const currentPath = window.location.pathname;
            if (payload.role === 'user' || payload.role === 'developer') {
                setUserType(payload.role);
                setCategories(
                    [
                        {
                            id: 1,
                            title: 'Explore',
                            icon: <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.35938 3.55225V2.99254C3.05026 2.99254 2.79967 3.24313 2.79967 3.55225H3.35938ZM11.1953 3.55225H11.755C11.755 3.24313 11.5044 2.99254 11.1953 2.99254V3.55225ZM11.1953 11.3882V11.9479C11.5044 11.9479 11.755 11.6973 11.755 11.3882H11.1953ZM3.35938 11.3882H2.79967C2.79967 11.6973 3.05026 11.9479 3.35938 11.9479V11.3882ZM15.6729 3.55225V2.99254C15.3638 2.99254 15.1132 3.24313 15.1132 3.55225H15.6729ZM23.5089 3.55225H24.0686C24.0686 3.24313 23.818 2.99254 23.5089 2.99254V3.55225ZM23.5089 11.3882V11.9479C23.818 11.9479 24.0686 11.6973 24.0686 11.3882H23.5089ZM15.6729 11.3882H15.1132C15.1132 11.6973 15.3638 11.9479 15.6729 11.9479V11.3882ZM15.6729 15.8658V15.3061C15.3638 15.3061 15.1132 15.5567 15.1132 15.8658H15.6729ZM23.5089 15.8658H24.0686C24.0686 15.5567 23.818 15.3061 23.5089 15.3061V15.8658ZM23.5089 23.7017V24.2614C23.818 24.2614 24.0686 24.0108 24.0686 23.7017H23.5089ZM15.6729 23.7017H15.1132C15.1132 24.0108 15.3638 24.2614 15.6729 24.2614V23.7017ZM3.35938 15.8658V15.3061C3.05026 15.3061 2.79967 15.5567 2.79967 15.8658H3.35938ZM11.1953 15.8658H11.755C11.755 15.5567 11.5044 15.3061 11.1953 15.3061V15.8658ZM11.1953 23.7017V24.2614C11.5044 24.2614 11.755 24.0108 11.755 23.7017H11.1953ZM3.35938 23.7017H2.79967C2.79967 24.0108 3.05026 24.2614 3.35938 24.2614V23.7017ZM3.35938 4.11195H11.1953V2.99254H3.35938V4.11195ZM10.6356 3.55225V11.3882H11.755V3.55225H10.6356ZM11.1953 10.8284H3.35938V11.9479H11.1953V10.8284ZM3.91908 11.3882V3.55225H2.79967V11.3882H3.91908ZM15.6729 4.11195H23.5089V2.99254H15.6729V4.11195ZM22.9492 3.55225V11.3882H24.0686V3.55225H22.9492ZM23.5089 10.8284H15.6729V11.9479H23.5089V10.8284ZM16.2327 11.3882V3.55225H15.1132V11.3882H16.2327ZM15.6729 16.4255H23.5089V15.3061H15.6729V16.4255ZM22.9492 15.8658V23.7017H24.0686V15.8658H22.9492ZM23.5089 23.142H15.6729V24.2614H23.5089V23.142ZM16.2327 23.7017V15.8658H15.1132V23.7017H16.2327ZM3.35938 16.4255H11.1953V15.3061H3.35938V16.4255ZM10.6356 15.8658V23.7017H11.755V15.8658H10.6356ZM11.1953 23.142H3.35938V24.2614H11.1953V23.142ZM3.91908 23.7017V15.8658H2.79967V23.7017H3.91908Z" fill="white" />
                            </svg>,
                            activeIcon: DashBoardActiveIcon,
                            subCategories: [
                                {
                                    id: 102,
                                    title: 'Apps',
                                    path: 'explore/apps',
                                    icon:
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                            <path d="M15.4892 6.55423L18.5752 9.64019M18.5752 9.64019L21.6611 12.7261M18.5752 9.64019L21.6611 6.55423M18.5752 9.64019L15.4892 12.7261M12.1007 9.64019C12.1007 11.7455 10.394 13.4523 8.28862 13.4523C6.18328 13.4523 4.47656 11.7455 4.47656 9.64019C4.47656 7.53484 6.18328 5.82812 8.28862 5.82812C10.394 5.82812 12.1007 7.53484 12.1007 9.64019ZM12.1007 19.9267C12.1007 22.0321 10.394 23.7388 8.28862 23.7388C6.18328 23.7388 4.47656 22.0321 4.47656 19.9267C4.47656 17.8214 6.18328 16.1146 8.28862 16.1146C10.394 16.1146 12.1007 17.8214 12.1007 19.9267ZM22.3872 19.9267C22.3872 22.0321 20.6805 23.7388 18.5752 23.7388C16.4698 23.7388 14.7631 22.0321 14.7631 19.9267C14.7631 17.8214 16.4698 16.1146 18.5752 16.1146C20.6805 16.1146 22.3872 17.8214 22.3872 19.9267Z" stroke="white" stroke-width="1.11942" stroke-linecap="round" />
                                        </svg>
                                },
                                {
                                    id: 101,
                                    title: 'Games',
                                    path: 'explore/games',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17" fill="none">
                                        <path d="M8.6 2.49063C8.5 2.29062 8.1 1.59062 8 1.39062C7.8 1.09062 7.4 0.890625 7 0.890625H4.8C3.1 1.19063 0.2 4.69062 0 14.2906C0 14.9906 0.4 15.5906 0.9 15.9906C1.4 16.4906 2 16.6906 2.7 16.5906C3.2 16.5906 3.7 16.3906 4.1 15.9906L6.8 12.9906C7 12.7906 7.3 12.5906 7.7 12.5906H14.8C15.1 12.5906 15.5 12.6906 15.7 12.9906L18.4 15.9906C18.8 16.3906 19.4 16.6906 20 16.5906C20.7 16.5906 21.3 16.0906 21.8 15.6906C22.3 15.2906 22.5 14.7906 22.5 14.1906C22.4 11.3906 21.8 4.49063 18.4 1.29063C18.1 0.990625 17.8 0.890625 17.5 0.890625H15.5C15.1 0.890625 14.8 1.09062 14.6 1.39062C14.3 1.79062 14.1 2.09063 13.8 2.49063H8.6ZM13.6 3.29063C13.5 3.59063 13.7 4.19062 13.2 4.19062H9.1C8.6 4.19062 8.8 3.59063 8.7 3.29063H13.6ZM21.2 14.9906L20.6 15.4906C20.3 15.6906 20 15.7906 19.7 15.6906C19.4 15.6906 19.1 15.5906 18.9 15.3906L16.2 12.3906C15.8 11.9906 15.3 11.7906 14.7 11.7906H7.6C7 11.7906 6.5 11.9906 6.1 12.4906L3.4 15.4906C3.2 15.6906 2.9 15.7906 2.6 15.7906C2.2 15.8906 1.7 15.6906 1.4 15.3906C1.1 15.0906 0.7 14.7906 0.7 14.2906C0.9 4.69062 3.7 2.19062 4.7 1.69063H6.9C7 1.69063 7.1 1.79062 7.2 1.89062L7.7 2.69062C8 2.99062 8.1 3.39062 8 3.79063C8 4.39062 8.5 4.89062 9.1 4.89062H13.2C13.8 4.89062 14.3 4.39062 14.3 3.79063C14.3 3.29063 14.4 2.89062 14.6 2.49063L15.1 1.79062C15.2 1.69062 15.3 1.69063 15.4 1.69063H17.4C17.5 1.69063 17.6 1.69062 17.6 1.79062C21 4.89062 21.5 12.0906 21.6 14.1906C21.6 14.4906 21.5 14.7906 21.2 14.9906Z" fill="white" />
                                        <path d="M6.99688 6.19375H6.69688V5.79375C6.69688 5.09375 6.09688 4.59375 5.39688 4.59375C4.69688 4.59375 4.19688 5.19375 4.19688 5.79375V6.19375C1.99688 5.89375 1.99688 8.89375 4.19688 8.69375V9.09375C4.19688 9.79375 4.79688 10.2937 5.49688 10.2937C6.19688 10.2937 6.69688 9.69375 6.69688 9.09375V8.69375H6.99688C7.69688 8.69375 8.19688 8.09375 8.19688 7.39375C8.29688 6.69375 7.69688 6.19375 6.99688 6.19375ZM7.39688 7.69375C7.19688 7.99375 6.49688 7.79375 6.29688 7.89375C6.09688 7.89375 5.89688 7.99375 5.89688 8.29375V9.09375C5.89688 9.29375 5.69688 9.49375 5.39688 9.49375C5.19688 9.49375 4.99688 9.29375 4.99688 8.99375V8.29375C4.99688 7.99375 4.79688 7.89375 4.59688 7.89375H3.79688C3.59688 7.89375 3.39688 7.69375 3.39688 7.39375C3.39688 7.19375 3.59688 6.99375 3.79688 6.99375H4.59688C4.79688 6.99375 4.99688 6.79375 4.99688 6.59375V5.79375C4.99688 5.59375 5.19688 5.29375 5.49688 5.29375C5.69688 5.29375 5.89688 5.49375 5.89688 5.79375V6.59375C5.89688 6.79375 6.09688 6.99375 6.29688 6.99375H6.99688C7.29688 6.99375 7.49688 7.19375 7.39688 7.49375C7.49688 7.49375 7.49688 7.59375 7.39688 7.69375Z" fill="white" />
                                        <path d="M15.5 5.5875C15.5 6.3875 16.1 6.9875 16.9 6.9875C17.6 6.9875 18.3 6.3875 18.3 5.5875C18.3 4.7875 17.7 4.1875 16.9 4.1875C16.1 4.2875 15.5 4.8875 15.5 5.5875ZM17.5 5.5875C17.5 5.8875 17.2 6.1875 16.9 6.1875C16.6 6.1875 16.3 5.8875 16.3 5.5875C16.3 5.2875 16.6 4.9875 16.9 4.9875C17.2 5.0875 17.5 5.2875 17.5 5.5875Z" fill="white" />
                                        <path d="M14.6031 6.59375C13.8031 6.59375 13.2031 7.19375 13.2031 7.99375C13.2031 8.79375 13.8031 9.39375 14.6031 9.39375C15.4031 9.39375 16.0031 8.79375 16.0031 7.99375C15.9031 7.19375 15.3031 6.59375 14.6031 6.59375ZM14.6031 8.49375C14.2031 8.49375 14.0031 8.19375 14.0031 7.89375C14.0031 7.59375 14.3031 7.29375 14.6031 7.29375C14.9031 7.29375 15.2031 7.59375 15.2031 7.89375C15.1031 8.29375 14.9031 8.49375 14.6031 8.49375Z" fill="white" />
                                        <path d="M17 8.5875C17 9.3875 17.6 9.9875 18.4 9.9875C19.1 9.9875 19.8 9.3875 19.8 8.5875C19.8 7.7875 19.2 7.1875 18.4 7.1875C17.6 7.2875 17 7.8875 17 8.5875ZM18.4 8.0875C18.7 8.0875 19 8.3875 19 8.6875C19 8.9875 18.7 9.2875 18.4 9.2875C18.1 9.2875 17.8 8.9875 17.8 8.6875C17.8 8.2875 18.1 8.0875 18.4 8.0875Z" fill="white" />
                                        <path d="M9.90156 10.3906H9.00156C8.80156 10.3906 8.60156 10.5906 8.60156 10.7906C8.60156 10.9906 8.80156 11.1906 9.00156 11.1906H9.90156C10.1016 11.1906 10.3016 10.9906 10.3016 10.7906C10.3016 10.5906 10.2016 10.3906 9.90156 10.3906Z" fill="white" />
                                        <path d="M13.4016 10.3906H12.5016C12.3016 10.3906 12.1016 10.5906 12.1016 10.7906C12.1016 10.9906 12.3016 11.1906 12.5016 11.1906H13.4016C13.6016 11.1906 13.8016 10.9906 13.8016 10.7906C13.8016 10.5906 13.6016 10.3906 13.4016 10.3906Z" fill="white" />
                                    </svg>,
                                },
                                {
                                    id: 103,
                                    title: 'Movies',
                                    path: 'explore/movies-tvs',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                                        <path d="M20.8911 0.140625H2.47525C1.08911 0.140625 0 1.22973 0 2.61587V17.6654C0 19.0515 1.08911 20.1406 2.47525 20.1406H20.8911C22.2772 20.1406 23.3663 19.0515 23.3663 17.6654V2.61587C23.4653 1.22973 22.2772 0.140625 20.8911 0.140625ZM22.4752 2.61587V6.37825H17.8218L19.604 1.13072H20.9901C21.7822 1.13072 22.4752 1.82379 22.4752 2.61587ZM5.14851 6.37825L6.93069 1.13072H12.1782L10.396 6.37825H5.14851ZM13.2673 1.13072H18.5149L16.7327 6.37825H11.4851L13.2673 1.13072ZM2.47525 1.13072H5.84158L4.05941 6.37825H0.990099V2.61587C0.990099 1.82379 1.68317 1.13072 2.47525 1.13072ZM20.8911 19.1505H2.47525C1.68317 19.1505 0.990099 18.4575 0.990099 17.6654V7.36835H22.4752V17.6654C22.4752 18.4575 21.7822 19.1505 20.8911 19.1505Z" fill="#FFFDFA" />
                                        <path d="M14.6509 12.1209L11.3836 10.1407C11.0866 9.94268 10.6905 9.94268 10.3935 10.1407C9.99745 10.3387 9.89844 10.7348 9.89844 11.0318V14.9922C9.89844 15.3882 10.0965 15.6853 10.3935 15.8833C10.4925 15.9823 10.6905 15.9823 10.8885 15.9823C11.0866 15.9823 11.2846 15.9823 11.3836 15.8833L14.6509 13.9031C14.9479 13.7051 15.146 13.408 15.146 13.012C15.146 12.6159 14.9479 12.3189 14.6509 12.1209ZM10.8885 14.9922V11.0318H10.9875L14.2549 13.012L10.8885 14.9922Z" fill="#FFFDFA" />
                                    </svg>
                                },
                                {
                                    id: 104,
                                    title: 'Courses',
                                    path: 'explore/courses',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path d="M22.3894 4.1875H4.47879C3.86055 4.1875 3.35938 4.73044 3.35938 5.4002V17.5272C3.35938 18.197 3.86055 18.7399 4.47879 18.7399H22.3894C23.0077 18.7399 23.5089 18.197 23.5089 17.5272V5.4002C23.5089 4.73044 23.0077 4.1875 22.3894 4.1875Z" stroke="white" stroke-width="1.11942" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.24219 22.1016H24.6305" stroke="white" stroke-width="1.11942" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                },
                                {
                                    id: 105,
                                    title: 'Services',
                                    path: 'explore/services',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                        <g clip-path="url(#clip0_2711_4223)">
                                            <path d="M13.4308 17.4374C15.2855 17.4374 16.789 15.9339 16.789 14.0792C16.789 12.2245 15.2855 10.721 13.4308 10.721C11.5761 10.721 10.0725 12.2245 10.0725 14.0792C10.0725 15.9339 11.5761 17.4374 13.4308 17.4374Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M21.7144 17.4374C21.5654 17.7751 21.521 18.1496 21.5868 18.5127C21.6527 18.8759 21.8258 19.211 22.0838 19.4748L22.151 19.5419C22.3592 19.7499 22.5243 19.9968 22.637 20.2686C22.7496 20.5404 22.8076 20.8317 22.8076 21.1259C22.8076 21.4201 22.7496 21.7115 22.637 21.9833C22.5243 22.255 22.3592 22.502 22.151 22.7099C21.9431 22.9181 21.6962 23.0832 21.4244 23.1959C21.1526 23.3085 20.8613 23.3665 20.567 23.3665C20.2728 23.3665 19.9815 23.3085 19.7097 23.1959C19.4379 23.0832 19.191 22.9181 18.9831 22.7099L18.9159 22.6427C18.6521 22.3847 18.317 22.2115 17.9539 22.1457C17.5907 22.0799 17.2162 22.1243 16.8786 22.2733C16.5475 22.4152 16.2651 22.6508 16.0662 22.9512C15.8673 23.2515 15.7606 23.6034 15.7591 23.9636V24.1539C15.7591 24.7477 15.5233 25.3172 15.1034 25.737C14.6835 26.1569 14.1141 26.3928 13.5203 26.3928C12.9265 26.3928 12.3571 26.1569 11.9372 25.737C11.5174 25.3172 11.2815 24.7477 11.2815 24.1539V24.0532C11.2728 23.6827 11.1529 23.3233 10.9373 23.0219C10.7217 22.7204 10.4204 22.4908 10.0725 22.3629C9.73488 22.2139 9.36035 22.1694 8.99722 22.2353C8.63408 22.3011 8.299 22.4742 8.03518 22.7323L7.96801 22.7994C7.76008 23.0076 7.51317 23.1727 7.24138 23.2854C6.96959 23.3981 6.67826 23.4561 6.38404 23.4561C6.08982 23.4561 5.79849 23.3981 5.5267 23.2854C5.25491 23.1727 5.00799 23.0076 4.80007 22.7994C4.59191 22.5915 4.42677 22.3446 4.31411 22.0728C4.20144 21.801 4.14345 21.5097 4.14345 21.2155C4.14345 20.9213 4.20144 20.6299 4.31411 20.3581C4.42677 20.0863 4.59191 19.8394 4.80007 19.6315L4.86723 19.5643C5.1253 19.3005 5.29841 18.9654 5.36426 18.6023C5.4301 18.2392 5.38565 17.8646 5.23664 17.527C5.09474 17.1959 4.85912 16.9135 4.55879 16.7146C4.25846 16.5158 3.90653 16.409 3.54632 16.4076H3.35602C2.76224 16.4076 2.19279 16.1717 1.77293 15.7518C1.35306 15.332 1.11719 14.7625 1.11719 14.1688C1.11719 13.575 1.35306 13.0055 1.77293 12.5857C2.19279 12.1658 2.76224 11.9299 3.35602 11.9299H3.45677C3.82729 11.9213 4.18663 11.8013 4.48808 11.5857C4.78954 11.3701 5.01915 11.0688 5.14708 10.721C5.2961 10.3833 5.34055 10.0088 5.2747 9.64565C5.20886 9.28252 5.03574 8.94744 4.77768 8.68361L4.71051 8.61645C4.50235 8.40852 4.33722 8.1616 4.22455 7.88981C4.11188 7.61803 4.05389 7.32669 4.05389 7.03248C4.05389 6.73826 4.11188 6.44693 4.22455 6.17514C4.33722 5.90335 4.50235 5.65643 4.71051 5.4485C4.91844 5.24034 5.16536 5.07521 5.43715 4.96254C5.70894 4.84988 6.00027 4.79188 6.29449 4.79188C6.5887 4.79188 6.88003 4.84988 7.15182 4.96254C7.42361 5.07521 7.67053 5.24034 7.87846 5.4485L7.94562 5.51567C8.20945 5.77373 8.54453 5.94685 8.90766 6.01269C9.2708 6.07854 9.64533 6.03409 9.98296 5.88507H10.0725C10.4036 5.74317 10.686 5.50756 10.8849 5.20723C11.0838 4.9069 11.1905 4.55497 11.1919 4.19476V4.00446C11.1919 3.41068 11.4278 2.84123 11.8477 2.42136C12.2675 2.0015 12.837 1.76563 13.4308 1.76562C14.0245 1.76563 14.594 2.0015 15.0139 2.42136C15.4337 2.84123 15.6696 3.41068 15.6696 4.00446V4.1052C15.671 4.46542 15.7778 4.81735 15.9767 5.11768C16.1755 5.41801 16.4579 5.65362 16.789 5.79552C17.1266 5.94453 17.5012 5.98898 17.8643 5.92314C18.2274 5.8573 18.5625 5.68418 18.8263 5.42611L18.8935 5.35895C19.1014 5.15079 19.3484 4.98566 19.6201 4.87299C19.8919 4.76032 20.1833 4.70233 20.4775 4.70233C20.7717 4.70233 21.063 4.76032 21.3348 4.87299C21.6066 4.98566 21.8535 5.15079 22.0615 5.35895C22.2696 5.56688 22.4347 5.81379 22.5474 6.08558C22.6601 6.35737 22.7181 6.64871 22.7181 6.94292C22.7181 7.23714 22.6601 7.52847 22.5474 7.80026C22.4347 8.07205 22.2696 8.31897 22.0615 8.5269L21.9943 8.59406C21.7362 8.85788 21.5631 9.19297 21.4973 9.5561C21.4314 9.91923 21.4759 10.2938 21.6249 10.6314V10.721C21.7668 11.052 22.0024 11.3344 22.3027 11.5333C22.6031 11.7322 22.955 11.8389 23.3152 11.8404H23.5055C24.0993 11.8404 24.6687 12.0762 25.0886 12.4961C25.5085 12.916 25.7443 13.4854 25.7443 14.0792C25.7443 14.673 25.5085 15.2424 25.0886 15.6623C24.6687 16.0822 24.0993 16.318 23.5055 16.318H23.4048C23.0445 16.3195 22.6926 16.4262 22.3923 16.6251C22.092 16.824 21.8563 17.1064 21.7144 17.4374Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2711_4223">
                                                <rect width="26.866" height="26.866" fill="white" transform="translate(0 0.648438)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                            ]
                        },
                        // {
                        //     id: 2,
                        //     title: 'Wish List',
                        //     icon: WishlistIcon,
                        //     // activeIcon: ProductsActiveIcon,
                        // },
                        {
                            id: 3,
                            title: 'Manage Profile',
                            icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                <path d="M22.3872 23.7823V21.5435C22.3872 20.3559 21.9155 19.217 21.0757 18.3773C20.236 17.5376 19.0971 17.0658 17.9096 17.0658H8.95423C7.76668 17.0658 6.62776 17.5376 5.78804 18.3773C4.94831 19.217 4.47656 20.3559 4.47656 21.5435V23.7823M17.9096 8.11048C17.9096 10.5834 15.9048 12.5881 13.4319 12.5881C10.9589 12.5881 8.95423 10.5834 8.95423 8.11048C8.95423 5.63753 10.9589 3.63281 13.4319 3.63281C15.9048 3.63281 17.9096 5.63753 17.9096 8.11048Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>,
                            activeIcon: ManageProfileActiveIcon,
                        },
                        {
                            id: 5, title: 'Subscription', icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                <g clip-path="url(#clip0_2711_4234)">
                                    <path d="M1.11719 1.39062H5.59485L8.59488 16.3796C8.69725 16.895 8.97762 17.3579 9.38692 17.6874C9.79622 18.0169 10.3084 18.1919 10.8337 18.1819H21.7144C22.2398 18.1919 22.7519 18.0169 23.1612 17.6874C23.5705 17.3579 23.8509 16.895 23.9533 16.3796L25.7443 6.9877H6.71427M11.1919 23.7789C11.1919 24.3972 10.6907 24.8984 10.0725 24.8984C9.45428 24.8984 8.9531 24.3972 8.9531 23.7789C8.9531 23.1607 9.45428 22.6595 10.0725 22.6595C10.6907 22.6595 11.1919 23.1607 11.1919 23.7789ZM23.5055 23.7789C23.5055 24.3972 23.0043 24.8984 22.3861 24.8984C21.7679 24.8984 21.2667 24.3972 21.2667 23.7789C21.2667 23.1607 21.7679 22.6595 22.3861 22.6595C23.0043 22.6595 23.5055 23.1607 23.5055 23.7789Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2711_4234">
                                        <rect width="26.866" height="26.866" fill="white" transform="translate(0 0.273438)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        },
                        {
                            id: 4, title: 'Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                <path d="M5 23.2734V16.2734M5 12.2734V5.27344M13 23.2734V14.2734M13 10.2734V5.27344M21 23.2734V18.2734M21 14.2734V5.27344M2 16.2734H8M10 10.2734H16M18 18.2734H24" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        },
                        {
                            id: 6, title: 'Logout', icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                <path d="M16.7042 5.04688H20.0624C21.299 5.04688 22.3013 6.04923 22.3013 7.28571V20.7187C22.3013 21.9552 21.299 22.9575 20.0624 22.9575H16.7042M8.86829 9.52454L4.39062 14.0022M4.39062 14.0022L8.86829 18.4799M4.39062 14.0022H17.8236" stroke="#E4E4E4" stroke-width="1.11942" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        },
                    ]
                )
                if (currentPath === '/explore/explore') setActiveTab(1);
                else if (currentPath === '/explore/wishlist') setActiveTab(2);
                else if (currentPath === '/explore/settings') setActiveTab(4);
                else if (currentPath === '/explore/manageprofile') setActiveTab(3);
            }
            // else if (payload.role === 'developer') {
            //     setUserType(payload.role);
            //     setCategories(
            //         [
            //             {
            //                 id: 1,
            //                 title: 'Dashboard',
            //                 icon: DashBoardIcon,
            //                 activeIcon: DashBoardActiveIcon,
            //             },
            //             {
            //                 id: 2,
            //                 title: 'My Products',
            //                 icon: ProductsIcon,
            //                 activeIcon: ProductsActiveIcon,
            //             },
            //             { id: 3, title: 'Members', icon: TeamsIcon },
            //             { id: 4, title: 'Subscription', icon: SubscriptionIcon },

            //             {
            //                 id: 5,
            //                 title: 'Manage Profile',
            //                 icon: ManageProfileIcon,
            //                 activeIcon: ManageProfileActiveIcon,
            //             },
            //             //   {id: 6, title: 'Analytics', icon: AnalyticsIcon},
            //             { id: 6, title: 'Settings', icon: DashBoardIcon },
            //         ]
            //     )
            //     console.log('currentPath', currentPath)
            //     if (currentPath === '/explore/dashboard') setActiveTab(1);
            //     else if (currentPath === '/explore/addproduct' || currentPath === '/explore/allproducts' || currentPath.startsWith('/explore/editproduct/')) setActiveTab(2);
            //     else if (currentPath === '/explore/members') setActiveTab(3);
            //     else if (currentPath === '/explore/purchased') setActiveTab(4);
            //     else if (currentPath === '/explore/settings') setActiveTab(6);
            //     else if (currentPath === '/explore/manageprofile') setActiveTab(5);
            // }
        }
    }, [])

    const ToggleSubTab = (id: number) => {
        setActiveSubTab(id);
    }

    const handleSubCategoryAction = (id: number, path: string) => {
        ToggleSubTab(id);
        // navigate("/explore/courses/all")
        if (id === 101) {
            navigate("/explore/games/all")
        } else if (id === 102) {
            navigate("/explore/apps/all")
        } else if (id === 103) {
            navigate("/explore/movies/all")
        } else if (id === 104) {
            navigate("/explore/courses/all")
        } else if (id === 105) {
            navigate("/explore/services/all")
        }
        scrollToTop()
        // const currentPath = window.location.pathname;
        // if (currentPath.startsWith('/explore/productdetails/')) {
        //     navigate('/explore/explore');
        // }
    }

    const ToggleTab = (id: number) => {
        setActiveTab(id);
        if (id === 1) {
            navigate('/explore/courses');
        } else if (id === 2) {
            navigate('/explore/wishlist')
        } else if (id === 3) {
            navigate('/explore/manageprofile');
        } else if (id === 4) {
            navigate('/explore/settings');
        } else if (id === 5) {
            navigate('/explore/subscriptions');
        } else if (id === 6) {
            handleLogout()
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    // logout 
    const handleLogout = () => {
        document.cookie = "authToken=; path=/;";
        navigate('/login')
    }

    return (
        <div
            className="side-nav-container float-left flex flex-col gap-y-9 sidebarExplore"
            style={{ maxWidth: 'fit-content', height: '100vh' }}
        >
            <div className="px-5 py-5">
                <div className="flex flex-col gap-3">
                    {categories.map((category: any) => (
                        <>
                            <div
                                onClick={() => {
                                    ToggleTab(category.id);
                                }}
                                className={`flex flex-row gap-x-2 justify-start items-center ${activeTab === category.id
                                    ? 'category-card-active'
                                    : 'category-card'
                                    }`}
                            >
                                <div>
                                    {/* <img
                                        src={
                                            activeTab === category.id && category.activeIcon
                                                ? category.activeIcon
                                                : category.icon
                                        }
                                        alt=""
                                    /> */}
                                    {activeTab === category.id && category.activeIcon ?
                                        <img src={activeTab === category.id && category.activeIcon
                                            ?
                                            category.activeIcon
                                            : category.icon}
                                            alt=""
                                        />
                                        : category.icon}
                                </div>
                                <div>
                                    <span
                                        className="category-title capitalize"
                                        style={{
                                            color: activeTab === category.id ? 'var(--4, #00F0FB) rounded-lg' : '',
                                        }}
                                    >
                                        {category.title}
                                    </span>
                                </div>
                            </div>
                            {
                                activeTab === category.id
                                    && category?.subCategories?.length > 0
                                    ?
                                    <div className='ps-4'>
                                        {

                                            category?.subCategories.map((subCategory: any) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            handleSubCategoryAction(subCategory.id, subCategory.path);
                                                        }}
                                                        className={`flex flex-row gap-x-2 justify-start items-center ${activeSubTab === subCategory.id
                                                            ? 'subCategory-card-active'
                                                            : 'category-card'
                                                            }`}
                                                    >
                                                        <div>
                                                            {activeSubTab === subCategory.id && subCategory.activeIcon ?
                                                                <img src={activeSubTab === subCategory.id && subCategory.activeIcon
                                                                    ?
                                                                    subCategory.activeIcon
                                                                    : subCategory.icon}
                                                                    alt=""
                                                                />
                                                                : subCategory.icon}
                                                        </div>
                                                        <div>
                                                            <span
                                                                className="category-title capitalize"
                                                                style={{
                                                                    color: activeSubTab === subCategory.id ? 'var(--4, #00F0FB)' : '',
                                                                }}
                                                            >
                                                                {subCategory.title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : ''
                            }
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SidebarExplore;
