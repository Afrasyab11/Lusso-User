import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import cross from "../../assets/images/calender/cross.svg";
import deleteIcon from "../../assets/images/calender/del.png";
import eye from "../../assets/images/calender/eye.svg";
import facebook from "../../assets/images/calender/facebook.svg";
import insta from "../../assets/images/calender/insta.svg";
import linkedin from "../../assets/images/calender/linkdin.png";
import tiktok from "../../assets/images/calender/tiktok.svg";
import x from "../../assets/images/calender/x.svg";
import AlertPopup from "../../components/common/AlertPopup";
import { apiEndpoints } from "../../constants/api-endpoints";
import makeApiCall from "../../lib/apiCall";

interface AppData {
    date: string;
    time: string;
    desc: string;
    image: any;
    providers: Array<{ id: string; network: string }>;
    id: string;
}

interface PostsTableProps {
    openCalendar: () => void;
    close: () => void;
    selectedPost: string;
    filteredPostsData: AppData[];
    setSelectedDate: (date: string) => void;
    fetchAllPostsData: () => void;
    calendarOpened?: any
    closeCalendar?: any
}

const PostsTable: React.FC<PostsTableProps> = ({
    openCalendar,
    close,
    selectedPost,
    filteredPostsData,
    setSelectedDate,
    fetchAllPostsData,
    calendarOpened,
    closeCalendar
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [devAuthentication, setDevAuthentication] = useState({
        popup: false,
        message: "",
        redirect: "",
        title: "",
    });
    const navigate = useNavigate();

    const networkImages: Record<string, string> = {
        facebook,
        instagram: insta,
        linkedin,
        tiktok,
        x,
    };

    const filteredData = useMemo(() => {
        return filteredPostsData?.filter(
            (item: any) =>
                item?.dateTime?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                item?.text?.toLowerCase()?.includes(searchQuery.toLowerCase())
        );
    }, [filteredPostsData, searchQuery]);

    const deletePostCall = async (id: string) => {
        const postsData = {
            ...apiEndpoints.deletePost,
            params: { query: { postId: id } },
        };

        try {
            await makeApiCall(postsData);
            setDevAuthentication({
                popup: true,
                message: "Post deleted successfully",
                redirect: "/dev/calender",
                title: "Delete Post",
            });
            fetchAllPostsData();
        } catch (error: any) {
            setDevAuthentication({
                popup: true,
                message: error,
                redirect: "/dev/calender",
                title: "Failed !",
            });
        }
    };


    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-white">{selectedPost}</h2>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            style={{
                                backgroundImage:
                                    'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                                padding: '1px',
                                borderRadius: '9999px',
                            }}
                        >
                            <label
                                className="input input-bordered rounded-full flex items-center gap-2"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
                                    backgroundClip: 'padding-box',
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70 text-[#C1C1C166]"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="grow font-medium text-[#FFFFFF] bg-transparent"
                                    placeholder="Search Post"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        className="w-full md:w-auto md:px-4 py-2 text-sm lg:text-lg font-medium text-[#FFFFFF] bg-[#792FFF80] rounded-lg hover:bg-purple-500 transition"
                        onClick={() => {
                            const currentDate = new Date();
                            const formattedDate = `${currentDate.getFullYear()}-${String(
                                currentDate.getMonth() + 1,
                            ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
                                2,
                                '0',
                            )}T${String(currentDate.getHours()).padStart(2, '0')}:${String(
                                currentDate.getMinutes(),
                            ).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(
                                2,
                                '0',
                            )}`;

                            openCalendar();
                            close();
                            setSelectedDate(formattedDate);
                        }}
                    >
                        + Create Post
                    </button>

                    <button onClick={close} className="ml-2 text-gray-400 hover:text-white transition">
                        <img src={cross} alt="close" className="" />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full text-sm text-left text-gray-400">
                    <thead className="bg-gradient-to-r from-[#2d246c] via-[#171232] to-[#271f57] text-white uppercase text-sm">
                        <tr>
                            <th className="px-4 py-3 text-center font-semibold">Schedule Date</th>
                            <th className="px-4 py-3 text-center font-semibold">Schedule Time</th>
                            <th className="px-4 py-3 text-center font-semibold">Description</th>
                            <th className="px-4 py-3 text-center font-semibold">Platform</th>
                            <th className="px-4 py-3 text-center font-semibold">Image</th>
                            <th className="px-4 py-3 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gradient-to-r from-[#2e246c] to-[#271f57] text-white">
                        {filteredData?.length > 0 ? (
                            filteredData?.map((app: any, index) => {
                                const dateTime = new Date(app?.publicationDate?.dateTime);
                                const formattedDate = dateTime.toLocaleDateString("en-GB");
                                const formattedTime = dateTime.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return (
                                    <tr key={index} className="border-b border-[#8423F4] hover:bg-[#271f57]">
                                        <td className="px-4 py-3 text-center">{formattedDate}</td>
                                        <td className="px-4 py-3 text-center">{formattedTime}</td>
                                        <td className="px-4 py-3 text-center truncate max-w-xs">{app?.text}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {app?.providers?.map((provider: any) => (
                                                    <img
                                                        key={provider?.id}
                                                        src={networkImages[provider?.network]}
                                                        alt={provider?.network}
                                                        className="network-icon h-5 w-5"
                                                        onError={(e: any) => e.target.src = networkImages[provider?.network]}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {app?.media && app.media?.length > 0 && app.media[0] ? (
                                                <img
                                                    src={app?.media[0]}
                                                    alt="Post"
                                                    className="w-10 h-10 rounded-full object-cover mx-auto"
                                                />
                                            ) : (
                                                <span>No Image available</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center align-middle">
                                        <div className="flex justify-center items-center gap-3">
                                            <img
                                            src={eye}
                                            alt="view"
                                            className="w-5 h-5 cursor-pointer hover:opacity-75"
                                            />
                                            <img
                                            src={deleteIcon}
                                            alt="delete"
                                            className="w-5 h-5 cursor-pointer hover:opacity-75"
                                            onClick={() => deletePostCall(app.id)}
                                            />
                                        </div>
                                        </td>

                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center">
                                    No posts available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AlertPopup
                open={devAuthentication.popup}
                message={devAuthentication.message}
                title={devAuthentication.title}
                onClose={() => {
                    setDevAuthentication({ popup: false, message: "", redirect: "", title: "" });
                    close();
                    navigate(devAuthentication.redirect);
                }}
            />
        </div>
    );
};

export default PostsTable;
