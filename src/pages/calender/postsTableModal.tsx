import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import "./calenderStyle.scss";
import PostsTable from "./postsTable";

const PostsTableModal = ({
    opened,
    close,
    closeCalendar,
    openCalendar,
    calendarOpened,
    selectedPost,
    filteredPostsData,
    setSelectedDate,
    fetchAllPostsData
}: any) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getModalSize = () => {
        if (windowWidth < 640) {
            return "md";
        } else if (windowWidth < 1024) {
            return "90%";
        } else if (windowWidth < 1440) {
            return "90%";
        }
        return "70%";
    };



    return (
        <Modal
            opened={opened}
            onClose={close}
            size={getModalSize()}
            title={
                <div className="flex justify-between items-center p-2">
                    <div className="flex items-center text-white">Post Review</div>
                </div>
            }
            closeOnClickOutside={false}
            lockScroll={true}
            withCloseButton={false}
            styles={{
                header: {
                    backgroundImage:
                        "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                    color: "#FFFFFF",

                    display: "none",
                },
                body: {
                    backgroundImage:
                        "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                    overflow: "hidden",
                    maxHeight: "90vh",
                    padding: 0,
                },
            }}
            data-centered
        >
            <div
                className={`p-10 ${windowWidth < 640 ? "text-sm" : "text-base"
                    } custom-scroll overflow-auto`}
                style={{
                    maxHeight: "90vh",
                    maxWidth: "100%",
                }}
            >
                <PostsTable
                    calendarOpened={calendarOpened}
                    openCalendar={openCalendar}
                    closeCalendar={closeCalendar}
                    close={close}
                    selectedPost={selectedPost}
                    filteredPostsData={filteredPostsData}
                    setSelectedDate={setSelectedDate}
                    fetchAllPostsData={fetchAllPostsData}
                />
            </div>
        </Modal>
    );
};

export default PostsTableModal;
