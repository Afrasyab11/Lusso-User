import { COLOR_ENUM } from "../../../../constants/colors.constant";
import { ICON_ENUM } from "../../../../constants/icons.constant";

export const growthStats = {
    topTiles: [
        {
            title: 'Likes',
            targetKey: 'Likes',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Followers',
            targetKey: 'followers',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Impressions',
            targetKey: 'Impressions',
            borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        },
        {
            title: 'Page Visits',
            targetKey: 'PageVisits',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Total Content',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    bottomTiles: [
        {
            title: 'Likes',
            targetKey: 'likes',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily likes',
            targetKey: 'dailyLikes',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Likes per post',
            targetKey: 'likesperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily page views',
            targetKey: 'DailyPageVies',
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
                likes: { label: 'Likes', color: COLOR_ENUM.FACEBOOK },
                followers: { label: 'Followers', color: COLOR_ENUM.YOUTUBE },
                impressions: { label: 'Impressions', color: COLOR_ENUM.TIKTOK },
                pageVisits: { label: 'Page Visits', color: COLOR_ENUM.INSTAGRAM },
            },
            lines: [
                {
                    dataKey: 'likes',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'followers',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'impressions',
                    stroke: 'url(#tiktok)',
                },
                {
                    dataKey: 'pageVisits',
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

export const balanceOfLikesStats = {
    topTiles: [
        {
            title: 'Acquire',
            targetKey: 'Acquired',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Lost',
            targetKey: 'Lost',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
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
                acquired: { label: 'Acquire', color: COLOR_ENUM.FACEBOOK },
                lost: { label: 'Lost', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [{
                dataKey: 'acquired',
                stroke: 'url(#facebook)',
            }, {
                dataKey: 'lost',
                stroke: 'url(#youtube)',
            },],
            bars: [
                {
                    dataKey: 'posts',
                },
            ],
        },
    },
};

export const postViewedInPeriodStats = {
    topTiles: [
        {
            title: 'Impressions',
            targetKey: 'impressions',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Reactions',
            targetKey: 'reactions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                impressions: { label: 'Impressions', color: COLOR_ENUM.FACEBOOK },
                reactions: { label: 'Reactions', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [
                { dataKey: 'impressions', stroke: 'url(#facebook)' },
                {
                    dataKey: 'reactions',
                    stroke: 'url(#youtube)',
                }
            ]
        },
    },
};

export const pageClicksStats = {
    topTiles: [
        {
            title: 'Total clicks',
            targetKey: 'total clicks',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
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
                totalClicks: { label: 'Total Clicks', color: COLOR_ENUM.FACEBOOK },
            },
            lines: [
                {
                    dataKey: 'totalClicks',
                    stroke: 'url(#facebook)',
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

export const postPublishOverviewStats = {
    topTiles: [
        {
            title: 'Engagement',
            targetKey: 'engagements',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Interactions',
            targetKey: 'interactions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Avg. reach per post',
            targetKey: 'avgReachPerPost',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Impressions',
            targetKey: 'impressions',
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
                engagement: { label: 'Engagement', color: COLOR_ENUM.FACEBOOK },
                interactions: { label: 'Interactions', color: COLOR_ENUM.YOUTUBE },
                avgReachPerPost: { label: 'Avg. reach per post', color: COLOR_ENUM.INSTAGRAM },
                impressions: { label: 'Impressions', color: COLOR_ENUM.TIKTOK },
            },
            lines: [
                {
                    dataKey: 'engagement',
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

export const postPublishInteractionStats = {
    topTiles: [
        {
            title: 'Reactions',
            targetKey: 'Reactions',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Comments',
            targetKey: 'Comments',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Shared',
            targetKey: 'Shares',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Clicks',
            targetKey: 'Clicks',
            borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        },
        {
            title: 'Posts',
            targetKey: 'posts',
            borderColor: ICON_ENUM?.X?.borderColor,
        },
    ],
    bottomTiles: [
        {
            title: 'Daily reactions',
            targetKey: 'dailyReactions',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Reactions per post',
            targetKey: 'reactionsperpost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Daily comments',
            targetKey: 'DailyComments',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Comments per post',
            targetKey: 'commentsPerPost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 1,
        },
        {
            title: 'Shares per day',
            targetKey: 'sharesPerDay',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
        {
            title: 'Shares per post',
            targetKey: 'sharesPerPost',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            valueDecimal: 2,
        },
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                reactions: { label: 'Reactions', color: COLOR_ENUM.FACEBOOK },
                comments: {
                    label: 'Comments',
                    color: COLOR_ENUM.YOUTUBE,
                },
                shares: { label: 'Shared', color: COLOR_ENUM.INSTAGRAM },
                clicks: { label: 'Clicks', color: COLOR_ENUM.TIKTOK },
            },
            lines: [
                {
                    dataKey: 'reactions',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'comments',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'shares',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'clicks',
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

export const storiesPublishStats = {
    graphConfiguration: {
        configuration: {
            tooltip: {
                stories: { label: 'Stories', color: COLOR_ENUM.FACEBOOK },
            },
            lines: [
                {
                    dataKey: 'stories',
                    stroke: 'url(#facebook)'
                }
            ]
        },
    },
};