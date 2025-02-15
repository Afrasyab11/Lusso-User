import { useEffect, useState } from "react";
import { apiEndpoints } from "../../constants/api-endpoints";
import { COLOR_ENUM } from "../../constants/colors.constant";
import makeApiCall from "../../lib/apiCall";
import { useAppDispatch, useTimeZone } from "../../redux/hooks";
import { daysAgoDate, formatDate } from "../../utils/utils";
import BarChartStat from "./BarChartStats";
import DashboardCreatorMobile from "./DashboardCreatorMobile";
import MapStats from "./MapStats";
import SocialMediaCards from "./SocialMediaCards";
import "./dev.scss";
import AnalyticCompTop from "./socialAnalytics/Components/AnalyticsCompTop";
import DashboardBarTileGraph from "./socialAnalytics/Components/DashboardBarTileGraph";
import TilesAndGraphStats from "./socialAnalytics/Components/TilesAndGraphStats";
import useAnalyticsStatsHook from "./socialAnalytics/hooks/useAnalyticsStatsHook";
import { graphConfigGeneratorInsta } from "./socialAnalytics/utils";

interface FollowerByCountry {
    country: string;
    followerCount: number;
    percentage: number;
    lat?: string;
    lon?: string
}

interface FollowerByAgeGroup {
    ageGroup: string;
    followerCount: number;
}

interface FollowersData {
    followersByCountry: FollowerByCountry[];
    followersByAgeGroup: FollowerByAgeGroup[];
}

interface AnalyticsStats {
    title: string;
    value: number;
    changedValue: number;
    percentage: number;
    trend: string;
}
export interface VisitorDataType {
    day: string;
    Facebook: number;
    Instagram: number;
    Twitter: number;
}

const lineChartDataSets = {
    configuration: {
        gradientStroke: {
            likes: [
                { offset: '8.66%', stopColor: '#1C36B7' },
                { offset: '90.78%', stopColor: '#1C98D3' },
            ],
            followers: [
                { offset: '14.6%', stopColor: '#FF0000' },
                { offset: '85.41%', stopColor: '#9B0000' },
            ],
            impressions: [
                { offset: '13.8%', stopColor: '#5342D6' },
                { offset: '18.4%', stopColor: '#7739C6' },
                { offset: '25.1%', stopColor: '#A52DB0' },
                { offset: '28.46%', stopColor: '#B729A8' },
                { offset: '37.01%', stopColor: '#CE257E' },
                { offset: '47.52%', stopColor: '#E82250' },
                { offset: '52.8%', stopColor: '#F2203E' },
                { offset: '65.79%', stopColor: '#F2203E' },
                { offset: '67.35%', stopColor: '#F32D40' },
                { offset: '75.25%', stopColor: '#F86C48' },
                { offset: '81.93%', stopColor: '#FB994E' },
                { offset: '87.06%', stopColor: '#FDB652' },
                { offset: '90.03%', stopColor: '#FEC053' },
            ],
        },
        lines: [
            {
                dataKey: 'likes',
                stroke: 'url(#likes)',
            },
            {
                dataKey: 'followers',
                stroke: 'url(#followers)',
            },
            {
                dataKey: 'impressions',
                stroke: 'url(#impressions)',
            },
            {
                dataKey: 'pageVisits',
            },
        ],
    },
    dataSet: [
        {
            date: 'Aug 8',
            likes: 1852,
            followers: 198,
            impressions: 214,
            pageVisits: 167,
        },
        {
            date: 'Aug 18',
            likes: 1852,
            followers: 198,
            impressions: 214,
            pageVisits: 167,
        },
        {
            date: 'Aug 28',
            likes: 198,
            followers: 198,
            impressions: 214,
            pageVisits: 167,
        },
        {
            date: 'Sep 8',
            likes: 100,
            followers: 198,
            impressions: 214,
            pageVisits: 167,
        },
        {
            date: 'Sep 18',
            likes: 100,
            followers: 198,
            impressions: 214,
            pageVisits: 167,
        },
        {
            date: 'Sep 28',
            likes: 205,
            followers: 198,
            impressions: 214,
            pageVisits: 167,
        },
    ],
};

const DashBoard = () => {
    const timeZone = useTimeZone();
    const dispatch = useAppDispatch()
    const [productsList, setProductsList] = useState<AnalyticsStats[]>([])
    const [postsList, setPostsList] = useState<any[]>([]);

    const [followersData, setFollowersData] = useState<FollowersData>({
        followersByCountry: [],
        followersByAgeGroup: [],
    });
    const [dates, onChange] = useState<{ [key: string]: null | Date }>({
        startDate: daysAgoDate(30),
        endDate: daysAgoDate(1),
    });
    const { loading, socialAnalytics } = useAnalyticsStatsHook(apiEndpoints?.getDashboardSocialStatistics, dates, [dates], true)
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (dates?.startDate && dates?.endDate) {
            fetchAnalyticsData();
        }
    }, [dates]);

    const fetchAnalyticsData = async () => {
        const formattedDates = {
            fromDate: `${formatDate(dates.startDate as Date)}T00:00:00`,
            toDate: `${formatDate(dates.endDate as Date)}T23:59:59`,
        };

        const productStats = {
            ...apiEndpoints.getProductAnalyticsList,
            params: { query: formattedDates },
        };

        const followersStats = {
            ...apiEndpoints.geFollowersStatistics,
            params: { query: formattedDates },
        };

        const [products, followers] = await Promise.all([
            makeApiCall(productStats),
            makeApiCall(followersStats),
        ]);
        setPostsList(formatPostsData(products));
        setProductsList(formatProductStats(products));
        setFollowersData(formatFollowersStats(followers))
    };
    const formatPostsData = (data: any): any[] => {
        return data?.payload?.posts?.map((post: any) => ({
            dateTime: post?.dateTime ?? "",
            value: post?.value ?? 0,
        })) || [];
    };

    const formatProductStats = (data: any): AnalyticsStats[] => {
        return data?.payload?.headerCalculations?.headerItems?.map((item: any) => ({
            title: item?.name ?? "",
            value: item?.value ?? "",
            changedValue: item?.changedValue ?? "",
            percentage: item?.percentage ?? "",
            trend: item?.trend ?? "",
        })) || [];
    };

    const formatFollowersStats = (data: any): FollowersData => {
        return {
            followersByCountry: data?.followersByCountry?.map((item: FollowerByCountry) => ({
                country: item?.country ?? "",
                followerCount: item?.followerCount ?? "",
                percentage: item?.percentage ?? "",
                lat: item?.lat ?? '',
                lon: item?.lon ?? ""
            })) || [],
            followersByAgeGroup: data?.followersByAgeGroup?.map((item: FollowerByAgeGroup) => ({
                ageGroup: item?.ageGroup,
                followerCount: item?.followerCount,
            })) || [],
        };
    };


    // if (!socialAnalytics || !socialAnalytics?.followers) {
    //     return <div>No data available</div>;
    // }

    const tilesStats = socialAnalytics?.followers?.headerCalculations?.headerItems?.map((item: any) => ({
        title: item?.name,
        count: item?.value,
        changedValue: item?.changedValue,
        percentage: item?.percentage,
        text: item?.trend
    }));
    const socialStatsData = productsList?.map((item: any) => ({
        title: item?.title,
        value: item?.value,
        changedValue: item?.changedValue,
        percentage: item?.percentage,
        trend: item?.trend
    }));

    const postViewData = postsList?.map((i: any) => ({
        dateTime: i?.dateTime ?? "",
        value: i?.value ?? ""
    }))

    const ageBarChart = followersData?.followersByAgeGroup?.map((age) => ({
        age: age?.ageGroup,
        follower: age?.followerCount,
    }))

    return (

        isMobile ? <DashboardCreatorMobile /> :
            <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full gap-5 text-white">
                        <AnalyticCompTop
                            title=""
                            onChangeCalender={onChange}
                            calenderValue={dates}
                        />
                        {/* Social Cards */}
                        {loading && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                            </div>
                        )}
                        <SocialMediaCards socialStatsData={socialStatsData} />

                        {/* <PostViewChart heading="Post Views in Period" data={postViewData} />
                         */}
                        <TilesAndGraphStats
                            title="Post Views in Period"
                            data={{
                                configuration: {
                                    tooltip: {
                                        posts: { label: 'Visitors', color: COLOR_ENUM.FACEBOOK },
                                    },
                                    lines: [
                                        {
                                            dataKey: 'posts',
                                            stroke: 'url(#facebook)',
                                        },
                                    ],
                                },
                                dataSet: graphConfigGeneratorInsta(
                                    ['posts'],
                                    { posts: postViewData },
                                ),
                            }}
                        />

                        <h2 className="text-2xl">Social analytics</h2>
                        <DashboardBarTileGraph title='Followers' data={{ tiles: tilesStats, lineChartDataSets }} dateData={{
                            startDate: dates.startDate ? dates.startDate.toISOString() : "",
                            endDate: dates.endDate ? dates.endDate.toISOString() : undefined,
                        }} />
                        <MapStats
                            title="Followers by country"
                            data={followersData?.followersByCountry}
                        />

                        <div className="flex">
                            <div className="w-full">
                                <BarChartStat title='Followers by age'
                                    data={
                                        ageBarChart
                                    }
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default DashBoard;