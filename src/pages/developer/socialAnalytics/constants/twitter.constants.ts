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

export const growthStats = {
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
            title: 'Posts',
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
            targetKey: 'FollowersPerPost',
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
            targetKey: 'DailyPosts',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 1,
        },
        {
            title: 'Weekly posts',
            targetKey: 'WeeklyPosts',
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
            title: 'Acquired',
            targetKey: 'Acquired',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Lost',
            targetKey: 'Lost',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Posts',
            targetKey: 'Posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                acquired: { label: 'Acquired', color: COLOR_ENUM.FACEBOOK },
                lost: { label: 'Lost', color: COLOR_ENUM.YOUTUBE },
                posts: { label: 'Post', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [
                {
                    dataKey: 'acquired',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'lost',
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

export const postPublishedSummaryStats = {
    topTiles: [
        {
            title: 'Engagement',
            targetKey: 'Engagement',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Impressions',
            targetKey: 'impressions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Interactions',
            targetKey: 'interactions',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
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
                impressions: { label: 'Impressions', color: COLOR_ENUM.YOUTUBE },
                interactions: { label: 'Interactions', color: COLOR_ENUM.INSTAGRAM },
            },
            lines: [
                {
                    dataKey: 'engagements',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'impressions',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'interactions',
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

export const postPublishedInteractionsStats = {
    topTiles: [
        {
            title: 'Likes',
            targetKey: 'Likes',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Reposts',
            targetKey: 'Reposts',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Replies',
            targetKey: 'Replies',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Qoutes',
            targetKey: 'Qoutes',
            borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        },
        {
            title: 'Profile clicks',
            targetKey: 'clicks',
            borderColor: ICON_ENUM?.TWITCH?.borderColor,
        },
        {
            title: 'Link clicks',
            targetKey: 'Link clicks',
            borderColor: ICON_ENUM?.BEHANCE?.borderColor,
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
            targetKey: 'LikesPerPost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily reposts',
            targetKey: 'DailyReposts',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Reposts per post',
            targetKey: 'RepostsPerPost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                likes: { label: 'Likes', color: COLOR_ENUM.FACEBOOK },
                reposts: { label: 'Reposts', color: COLOR_ENUM.YOUTUBE },
                replies: { label: 'Replies', color: COLOR_ENUM.INSTAGRAM },
                quotes: { label: 'Qoutes', color: COLOR_ENUM.TIKTOK },
                profileClicks: { label: 'Profile clicks', color: COLOR_ENUM.TWITCH },
                linkClicks: { label: 'Link clicks', color: COLOR_ENUM.BEHANCE },
            },
            lines: [
                {
                    dataKey: 'likes',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'Reposts',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'Replies',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'Qoutes',
                    stroke: 'url(#tiktok)',
                },
                {
                    dataKey: 'Profile clicks',
                    stroke: 'url(#twitch)',
                },
                {
                    dataKey: 'Link clicks',
                    stroke: 'url(#behance)',
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