import { COLOR_ENUM } from "../../../../constants/colors.constant";
import { ICON_ENUM } from "../../../../constants/icons.constant";
import { roundToOneDecimal } from "../../../../utils/utils";

export const hashtag_Columns = [
    {
        header: 'Impressions',
        target: 'impressions',
    },
    {
        header: 'Likes',
        target: 'likes',
    },
    {
        header: 'Number of posts',
        target: 'count',
    },
    {
        header: 'Comments',
        target: 'commentsCount',
    },
];

export const storiesColumns: { [key: string]: any }[] = [
    {
        header: 'Impressions',
        target: 'impressions',
    },
    {
        header: 'Organic Reach',
        target: 'reach',
    },
    {
        header: 'Paid Reach',
        target: 'reachPaid',
    },
    {
        header: 'Organic Likes',
        target: 'likes',
    },
    {
        header: 'Organic Saved',
        target: 'saved',
    },
    {
        header: 'Organic Comments',
        target: 'comments',
    },
    {
        header: 'Organic Interactions',
        target: 'interactions',
    },
    {
        header: 'Paid Interactions',
        target: 'postInteractionsPaid',
    },
    {
        header: 'Organic Engagement',
        target: 'engagement',
        cellRender: (value: any, rowNo: number) => roundToOneDecimal(value),
    },
    {
        header: 'Video views',
        target: 'videoViewsTotal',
    },
    {
        header: 'Paid Post Clicks',
        target: 'postClicksPaid',
    },
    {
        header: 'Spent',
        target: 'spend',
    },
];

export const pageOverviewStats = {
    topTiles: [
        {
            title: 'Followers',
            targetKey: 'followers',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Following',
            targetKey: 'following',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Total Content',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    bottomTiles: [
        {
            title: 'Followers',
            targetKey: 'followers',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily followers',
            targetKey: 'dailyfollowers',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Followers per post',
            targetKey: 'followersperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Following',
            targetKey: 'following',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily posts',
            targetKey: 'dailyposts',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 1,
        },
        {
            title: 'Posts per week',
            targetKey: 'postsPerWeek',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                followers: { label: 'Followers', color: COLOR_ENUM.FACEBOOK },
                following: { label: 'Following', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [
                {
                    dataKey: 'followers',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'following',
                    stroke: 'url(#youtube)',
                },
            ],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};

export const balanceOfFollowersStats = {
    topTiles: [
        {
            title: 'Followers',
            targetKey: 'followers',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                followers: { label: 'Followers', color: COLOR_ENUM.FACEBOOK },
            },
            bars: [
                {
                    dataKey: 'followers',
                    stroke: 'url(#facebook)',
                },
            ],
        },
    },
};

export const ageReachStats = {
    graphConfiguration: {
        configuration: {
            tooltip: {
                age: { label: 'Age', color: COLOR_ENUM.FACEBOOK },
            },
            bars: [
                {
                    dataKey: 'age',
                    stroke: 'url(#facebook)',
                },
            ],
        },
    },
};

export const profileStats = {
    topTiles: [
        {
            title: 'Impressions',
            targetKey: 'impressions',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Avg. reach per day',
            targetKey: 'AvgReachPerDay',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Profile Views',
            targetKey: 'ProfileViews',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Website Clicks',
            targetKey: 'WebsiteClicks',
            borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        },
        {
            title: 'Total Content',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                impressions: { label: 'Impressions', color: COLOR_ENUM.FACEBOOK },
                reachPerDay: {
                    label: 'Avg. reach per day',
                    color: COLOR_ENUM.YOUTUBE,
                },
                profileViews: { label: 'Profile Views', color: COLOR_ENUM.INSTAGRAM },
                websiteClicks: { label: 'Website Clicks', color: COLOR_ENUM.TIKTOK },
            },
            lines: [
                {
                    dataKey: 'impressions',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'reachPerDay',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'profileViews',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'websiteClicks',
                    stroke: 'url(#tiktok)',
                },
            ],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};

export const clicksStats = {
    topTiles: [
        {
            title: 'Emails',
            targetKey: 'emails',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Directions',
            targetKey: 'directions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Calls',
            targetKey: 'calls',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Messages',
            targetKey: 'messages',
            borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        },
        {
            title: 'Total',
            targetKey: 'total',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                emails: { label: 'Emails', color: COLOR_ENUM.FACEBOOK },
                directions: { label: 'Directions', color: COLOR_ENUM.YOUTUBE },
                calls: { label: 'Calls', color: COLOR_ENUM.INSTAGRAM },
                messages: { label: 'Messages', color: COLOR_ENUM.TIKTOK },
                total: { label: 'Total', color: COLOR_ENUM.X },
            },
            lines: [
                {
                    dataKey: 'emails',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'directions',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'calls',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'messages',
                    stroke: 'url(#tiktok)',
                },
            ],
            bars: [
                {
                    dataKey: 'total',
                },
            ],
        },
    },
};

export const organicSummaryStats = {
    topTiles: [
        {
            title: 'Engagement',
            targetKey: 'Engagement',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Interactions',
            targetKey: 'interactions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Avg. reach per post',
            targetKey: 'avgreachperpost',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Impressions',
            targetKey: 'impressions',
            borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        },
        {
            title: 'Posts',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                engagements: { label: 'Engagement', color: COLOR_ENUM.FACEBOOK },
                interactions: { label: 'Interactions', color: COLOR_ENUM.YOUTUBE },
                avgReachPerPost: {
                    label: 'Avg. reach per post',
                    color: COLOR_ENUM.INSTAGRAM,
                },
                impressions: { label: 'Impressions', color: COLOR_ENUM.TIKTOK },
            },
            lines: [
                {
                    dataKey: 'engagements',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'interactions',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'avgReachPerPost',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'impressions',
                    stroke: 'url(#tiktok)',
                },
            ],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};

export const organicInteractionsStats = {
    topTiles: [
        {
            title: 'Likes',
            targetKey: 'Likes',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Comments',
            targetKey: 'Comments',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Saved',
            targetKey: 'Saved',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Posts',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    bottomTiles: [
        {
            title: 'Daily likes',
            targetKey: 'DailyLikes',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Likes per post',
            targetKey: 'likesPerPost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily comments',
            targetKey: 'dailyComments',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Comments per post',
            targetKey: 'commentsPerPost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Likes per comment',
            targetKey: 'likesPerComment',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                likes: { label: 'Likes', color: COLOR_ENUM.FACEBOOK },
                comments: { label: 'Comments', color: COLOR_ENUM.YOUTUBE },
                saved: { label: 'Saved', color: COLOR_ENUM.INSTAGRAM },
            },
            lines: [
                {
                    dataKey: 'likes',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'comments',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'saved',
                    stroke: 'url(#instagram)',
                },
            ],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};