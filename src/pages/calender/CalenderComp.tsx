import { ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { apiEndpoints } from '../../constants/api-endpoints';
import { AiPostProvider } from '../../context/CreateAIContext';
import makeApiCall from '../../lib/apiCall';
import { useTimeZone } from '../../redux/hooks';
import { daysAgoDate, formatDate } from '../../utils/utils';
import { countStatuses } from './components/calenderHelperFunctions';
import DateAndTimePicker from './dateAndTimePicker';
import PostsCard from './postsCard';
import PostsTableModal from './postsTableModal';
import RecentPostCard from './RecentPostCard';

const CalenderComp = () => {
    const [tableOpened, { close: closeTable, open: openTable }] =
        useDisclosure(false);
    const [calendarOpened, { close: closeCalendar, open: openCalendar }] =
        useDisclosure(false);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendar, setCalendar] = useState([]);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    const [allPostsData, setAllPostsData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filteredPostsData, setFilterPostsData] = useState<any[]>([]);
    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(90),
        endDate: new Date(),
    });
    const timeZone = useTimeZone();
    const statusesToCount: any = ["PUBLISHED", "PENDING"];

    useEffect(() => {
        if (dates?.startDate && dates?.endDate) {
            fetchAllPostsData();
        }
    }, [dates]);

    const fetchAllPostsData = async () => {
        setIsLoading(true)
        const formattedDates = {
            fromDate: `${formatDate(dates.startDate as Date)}T00:00:00`,
            toDate: `${formatDate(dates.endDate as Date)}T23:59:59`,
            timezone: timeZone,
        };

        const postsData = {
            ...apiEndpoints.getAllPosts,
            params: { query: formattedDates },
        };
        const getPostsData = await makeApiCall(postsData);
        setAllPostsData(getPostsData?.data || []);
        setIsLoading(false)

    };
    const getStatusData = (status: any) =>
        allPostsData?.filter(
            (item: any) =>
                item?.providers?.some((provider: any) => provider.status === status),
        );
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

        return () => clearInterval(timer);
    }, [currentDate]);

    const generateCalendar = (year: any, month: any) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        const days: any = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        setCalendar(days);
    };
    const handlePostType = (postType: string) => {
        setSelectedPost(postType);
        const filteredData = getStatusData(postType);
        setFilterPostsData(filteredData)
        openTable();
    };
    const postCounts = countStatuses(allPostsData, statusesToCount);

    return (
        <>
            <AiPostProvider>
                <div className="flex flex-col lg:flex-row gap-5 769-1300:flex-col">
                    <div className='lg:w-3/5 w-full 769-1300:w-full'>
                        <div className="flex flex-col gap-5 text-white">
                            <PostsCard onClick={handlePostType} postCounts={postCounts} />
                            <PostsTableModal
                                opened={tableOpened}
                                close={closeTable}
                                closeCalendar={closeCalendar}
                                openCalendar={openCalendar}
                                calendarOpened={calendarOpened}
                                selectedPost={selectedPost}
                                filteredPostsData={filteredPostsData}
                                setSelectedDate={setSelectedDate}
                                fetchAllPostsData={fetchAllPostsData}
                            />
                            <div className="mt-8">
                                <DateAndTimePicker
                                    closeCalendar={closeCalendar}
                                    openCalendar={openCalendar}
                                    calendarOpened={calendarOpened}
                                    allPostsData={allPostsData}
                                    selectedFromTableDate={selectedDate}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-l border-gray-500 mx-4 769-1300:hidden"></div>

                    <div className='lg:w-2/5 w-full 769-1300:w-full'>
                        <div className="flex flex-col gay-y-3 w-full">
                            <div>
                                <h4 className="font-medium text-[#FFFFFF] text-sm md:text-2xl mb-4">
                                    Recent Posts
                                </h4>
                            </div>
                            <ScrollArea h={750} type="never">
                                <div className="flex flex-col gap-4">
                                    {isLoading ? <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                                    </div> : allPostsData && allPostsData?.length > 0 ? (
                                        allPostsData?.map((post) => {
                                            const title = post?.text || "";
                                            const postTime = new Date(post?.publicationDate.dateTime).toLocaleString("en-US", {
                                                weekday: "long",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            });
                                            const centerImage = post?.media?.[0];
                                            const impressions = Math.floor(Math.random() * 10000);
                                            const engagement = Math.floor(Math.random() * 1000);
                                            const clicks = Math.floor(Math.random() * 500);
                                            const image = post?.media?.[0];

                                            return (
                                                <RecentPostCard
                                                    key={post.id}
                                                    title={title}
                                                    postTime={postTime}
                                                    centerImage={centerImage}
                                                    impressions={impressions}
                                                    engagement={engagement}
                                                    clicks={clicks}
                                                    image={image}
                                                />
                                            );
                                        })
                                    ) : (
                                        null
                                    )}

                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </AiPostProvider>
        </>
    );
};

export default CalenderComp;
