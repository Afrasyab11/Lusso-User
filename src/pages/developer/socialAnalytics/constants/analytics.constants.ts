
// import { COLOR_ENUM } from "../../../../constants/colors.constant";
// import { ICON_ENUM } from "../../../../constants/icons.constant";
import { COLOR_ENUM } from "../../../../constants/colors.constant";
import { ICON_ENUM } from "../../../../constants/icons.constant";

export const growthStats = {
    progressBarTile: [
        {
            title: 'Followers',
            targetKey: 'Followers',
            progressList: [
                { label: 'Facebook', targetKey: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                { label: 'Instagram', targetKey: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                { label: 'Twitter', targetKey: 'Twitter', color: COLOR_ENUM.X },
                { label: 'LinkedIn', targetKey: 'LinkedIn', color: COLOR_ENUM.LINKEDIN },
            ]
        },
    ],
    topTiles: [
        {
            title: 'Facebook',
            targetKey: 'Facebook',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            headerIcon: ICON_ENUM?.FACEBOOK?.icon,
        },
        // {
        //     title: 'Youtube',
        //     targetKey: 'Youtube',
        //     borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        //     headerIcon: ICON_ENUM?.YOUTUBE?.icon,
        // },
        {
            title: 'Instagram',
            targetKey: 'Instagram',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            headerIcon: ICON_ENUM?.INSTAGRAM?.icon,
        },
        {
            title: 'Twitter',
            targetKey: 'Twitter',
            borderColor: ICON_ENUM?.X?.borderColor,
            headerIcon: ICON_ENUM?.X?.icon,
        },
        {
            title: 'LinkedIn',
            targetKey: 'LinkedIn',
            borderColor: ICON_ENUM?.LINKEDIN?.borderColor,
            headerIcon: ICON_ENUM?.LINKEDIN?.icon,
        },
        // {
        //     title: 'Tiktok',
        //     targetKey: 'Tiktok',
        //     borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        //     headerIcon: ICON_ENUM?.TIKTOK?.icon,
        // },
        // {
        //     title: 'Twitch',
        //     targetKey: 'Twitch',
        //     borderColor: ICON_ENUM?.TWITCH?.borderColor,
        //     headerIcon: ICON_ENUM?.TWITCH?.icon,
        // },
        // {
        //     title: 'Google Business Profile',
        //     targetKey: 'Google Business Profile',
        //     borderColor: ICON_ENUM?.GOOGLEBUSINESS?.borderColor,
        //     headerIcon: ICON_ENUM?.GOOGLEBUSINESS?.icon,
        // },

    ],

    graphConfiguration: {
        configuration: {
            tooltip: {
                facebook: { label: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                // youtube: { label: 'Youtube', color: COLOR_ENUM.YOUTUBE },
                instagram: { label: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                twitter: { label: 'Twitter', color: COLOR_ENUM.X },
                linkdIn: { label: 'LinkedIn', color: COLOR_ENUM.FACEBOOK },
                // tiktok: { label: 'Tiktok', color: COLOR_ENUM.TIKTOK },
                // twich: { label: 'Twich', color: COLOR_ENUM.TWITCH },
                // googlebusiness: { label: 'Google Business', color: COLOR_ENUM.TWITCH },
            },
            lines: [
                {
                    dataKey: 'facebook',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'youtube',
                //     stroke: 'url(#youtube)',
                // },

                {
                    dataKey: 'instagram',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'twitter',
                    stroke: 'url(#twitter)',
                },
                {
                    dataKey: 'linkedIn',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'tiktok',
                //     stroke: 'url(#tiktok)',
                // },
                // {
                //     dataKey: 'twitch',
                //     stroke: 'url(#twich)',
                // },
                // {
                //     dataKey: 'googlebusiness',
                //     stroke: 'url(#twich)',
                // },


            ],

        },
    },
};

export const noOfPostsState = {
    progressBarTile: [
        {
            title: 'Number of Posts',
            targetKey: 'Number of Posts',
            progressList: [
                { targetKey: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                { targetKey: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                { targetKey: 'Twitter', color: COLOR_ENUM.X },
                { targetKey: 'LinkedIn', color: COLOR_ENUM.LINKEDIN },
            ]
        },
    ],
    topTiles: [
        {
            title: 'Facebook',
            targetKey: 'Facebook',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            headerIcon: ICON_ENUM?.FACEBOOK?.icon,
        },
        // {
        //     title: 'Youtube',
        //     targetKey: 'Youtube',
        //     borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        //     headerIcon: ICON_ENUM?.YOUTUBE?.icon,
        // },
        {
            title: 'Instagram',
            targetKey: 'Instagram',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            headerIcon: ICON_ENUM?.INSTAGRAM?.icon,
        },
        {
            title: 'Twitter',
            targetKey: 'Twitter',
            borderColor: ICON_ENUM?.X?.borderColor,
            headerIcon: ICON_ENUM?.X?.icon,
        },
        {
            title: 'LinkedIn',
            targetKey: 'LinkedIn',
            borderColor: ICON_ENUM?.LINKEDIN?.borderColor,
            headerIcon: ICON_ENUM?.LINKEDIN?.icon,
        },
        // {
        //     title: 'Tiktok',
        //     targetKey: 'Tiktok',
        //     borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        //     headerIcon: ICON_ENUM?.TIKTOK?.icon,
        // },
        // {
        //     title: 'Twitch',
        //     targetKey: 'Twitch',
        //     borderColor: ICON_ENUM?.TWITCH?.borderColor,
        //     headerIcon: ICON_ENUM?.TWITCH?.icon,
        // },
        // {
        //     title: 'Google Business Profile',
        //     targetKey: 'Google Business Profile',
        //     borderColor: ICON_ENUM?.GOOGLEBUSINESS?.borderColor,
        //     headerIcon: ICON_ENUM?.GOOGLEBUSINESS?.icon,
        // },

    ],

    graphConfiguration: {
        configuration: {
            tooltip: {
                facebook: { label: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                // youtube: { label: 'Youtube', color: COLOR_ENUM.YOUTUBE },
                instagram: { label: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                twitter: { label: 'Twitter', color: COLOR_ENUM.X },
                linkdIn: { label: 'LinkedIn', color: COLOR_ENUM.FACEBOOK },
                // tiktok: { label: 'Tiktok', color: COLOR_ENUM.TIKTOK },
                // twich: { label: 'Twich', color: COLOR_ENUM.TWITCH },
                // googlebusiness: { label: 'Google Business', color: COLOR_ENUM.TWITCH },
            },
            lines: [
                {
                    dataKey: 'facebook',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'youtube',
                //     stroke: 'url(#youtube)',
                // },

                {
                    dataKey: 'instagram',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'twitter',
                    stroke: 'url(#twitter)',
                },
                {
                    dataKey: 'linkedIn',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'tiktok',
                //     stroke: 'url(#tiktok)',
                // },
                // {
                //     dataKey: 'twitch',
                //     stroke: 'url(#twich)',
                // },
                // {
                //     dataKey: 'googlebusiness',
                //     stroke: 'url(#twich)',
                // },


            ],

        },
    },
};

export const Impressions = {
    progressBarTile: [
        {
            title: 'Impressions',
            targetKey: 'Impressions',
            progressList: [
                { targetKey: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                { targetKey: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                { targetKey: 'Twitter', color: COLOR_ENUM.X },
                { targetKey: 'LinkedIn', color: COLOR_ENUM.LINKEDIN },
            ]
        },
    ],
    topTiles: [
        {
            title: 'Facebook',
            targetKey: 'Facebook',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            headerIcon: ICON_ENUM?.FACEBOOK?.icon,
        },
        // {
        //     title: 'Youtube',
        //     targetKey: 'Youtube',
        //     borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        //     headerIcon: ICON_ENUM?.YOUTUBE?.icon,
        // },
        {
            title: 'Instagram',
            targetKey: 'Instagram',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            headerIcon: ICON_ENUM?.INSTAGRAM?.icon,
        },
        {
            title: 'Twitter',
            targetKey: 'Twitter',
            borderColor: ICON_ENUM?.X?.borderColor,
            headerIcon: ICON_ENUM?.X?.icon,
        },
        {
            title: 'LinkedIn',
            targetKey: 'LinkedIn',
            borderColor: ICON_ENUM?.LINKEDIN?.borderColor,
            headerIcon: ICON_ENUM?.LINKEDIN?.icon,
        },
        // {
        //     title: 'Tiktok',
        //     targetKey: 'Tiktok',
        //     borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        //     headerIcon: ICON_ENUM?.TIKTOK?.icon,
        // },
        // {
        //     title: 'Twitch',
        //     targetKey: 'Twitch',
        //     borderColor: ICON_ENUM?.TWITCH?.borderColor,
        //     headerIcon: ICON_ENUM?.TWITCH?.icon,
        // },
        // {
        //     title: 'Google Business Profile',
        //     targetKey: 'Google Business Profile',
        //     borderColor: ICON_ENUM?.GOOGLEBUSINESS?.borderColor,
        //     headerIcon: ICON_ENUM?.GOOGLEBUSINESS?.icon,
        // },

    ],

    graphConfiguration: {
        configuration: {
            tooltip: {
                facebook: { label: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                // youtube: { label: 'Youtube', color: COLOR_ENUM.YOUTUBE },
                instagram: { label: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                twitter: { label: 'Twitter', color: COLOR_ENUM.X },
                linkedIn: { label: 'LinkedIn', color: COLOR_ENUM.FACEBOOK },
                // tiktok: { label: 'Tiktok', color: COLOR_ENUM.TIKTOK },
                // twich: { label: 'Twich', color: COLOR_ENUM.TWITCH },
                // googlebusiness: { label: 'Google Business', color: COLOR_ENUM.TWITCH },
            },
            lines: [
                {
                    dataKey: 'facebook',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'youtube',
                //     stroke: 'url(#youtube)',
                // },

                {
                    dataKey: 'instagram',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'twitter',
                    stroke: 'url(#twitter)',
                },
                {
                    dataKey: 'linkedIn',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'tiktok',
                //     stroke: 'url(#tiktok)',
                // },
                // {
                //     dataKey: 'twitch',
                //     stroke: 'url(#twich)',
                // },
                // {
                //     dataKey: 'googlebusiness',
                //     stroke: 'url(#twich)',
                // },


            ],

        },
    },
};

export const InteractionsState = {
    progressBarTile: [
        {
            title: 'Interactions',
            targetKey: 'Interactions',
            progressList: [
                { targetKey: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                { targetKey: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                { targetKey: 'Twitter', color: COLOR_ENUM.X },
                { targetKey: 'LinkedIn', color: COLOR_ENUM.LINKEDIN },
            ]
        },
    ],
    topTiles: [
        {
            title: 'Facebook',
            targetKey: 'Facebook',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            headerIcon: ICON_ENUM?.FACEBOOK?.icon,
        },
        // {
        //     title: 'Youtube',
        //     targetKey: 'Youtube',
        //     borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        //     headerIcon: ICON_ENUM?.YOUTUBE?.icon,
        // },
        {
            title: 'Instagram',
            targetKey: 'Instagram',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            headerIcon: ICON_ENUM?.INSTAGRAM?.icon,
        },
        {
            title: 'Twitter',
            targetKey: 'Twitter',
            borderColor: ICON_ENUM?.X?.borderColor,
            headerIcon: ICON_ENUM?.X?.icon,
        },
        {
            title: 'LinkedIn',
            targetKey: 'LinkedIn',
            borderColor: ICON_ENUM?.LINKEDIN?.borderColor,
            headerIcon: ICON_ENUM?.LINKEDIN?.icon,
        },
        // {
        //     title: 'Tiktok',
        //     targetKey: 'Tiktok',
        //     borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        //     headerIcon: ICON_ENUM?.TIKTOK?.icon,
        // },
        // {
        //     title: 'Twitch',
        //     targetKey: 'Twitch',
        //     borderColor: ICON_ENUM?.TWITCH?.borderColor,
        //     headerIcon: ICON_ENUM?.TWITCH?.icon,
        // },
        // {
        //     title: 'Google Business Profile',
        //     targetKey: 'Google Business Profile',
        //     borderColor: ICON_ENUM?.GOOGLEBUSINESS?.borderColor,
        //     headerIcon: ICON_ENUM?.GOOGLEBUSINESS?.icon,
        // },

    ],

    graphConfiguration: {
        configuration: {
            tooltip: {
                facebook: { label: 'Facebook', color: COLOR_ENUM.FACEBOOK },
                // youtube: { label: 'Youtube', color: COLOR_ENUM.YOUTUBE },
                instagram: { label: 'Instagram', color: COLOR_ENUM.INSTAGRAM },
                twitter: { label: 'Twitter', color: COLOR_ENUM.X },
                linkedIn: { label: 'LinkedIn', color: COLOR_ENUM.FACEBOOK },
                // tiktok: { label: 'Tiktok', color: COLOR_ENUM.TIKTOK },
                // twich: { label: 'Twich', color: COLOR_ENUM.TWITCH },
                // googlebusiness: { label: 'Google Business', color: COLOR_ENUM.TWITCH },
            },
            lines: [
                {
                    dataKey: 'facebook',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'youtube',
                //     stroke: 'url(#youtube)',
                // },

                {
                    dataKey: 'instagram',
                    stroke: 'url(#instagram)',
                },
                {
                    dataKey: 'twitter',
                    stroke: 'url(#twitter)',
                },
                {
                    dataKey: 'linkedIn',
                    stroke: 'url(#facebook)',
                },
                // {
                //     dataKey: 'tiktok',
                //     stroke: 'url(#tiktok)',
                // },
                // {
                //     dataKey: 'twitch',
                //     stroke: 'url(#twich)',
                // },
                // {
                //     dataKey: 'googlebusiness',
                //     stroke: 'url(#twich)',
                // },


            ],

        },
    },
};







export const GENDER_TYPE_ENUM = {
    F: 'Female', M: 'Male', U: 'Unknown'
}

export const SPLASH_ENUM = {
    INSTAGRAM: {
        header: 'Instagram',
        icon: ICON_ENUM.INSTAGRAM.icon,
        title: 'Analyze your Instagram metrics',
        desc: 'Finally you can know about your Instagram community and how it evolves, also keep unlimited storage of all of your publications and related metrics.',
        connectBtn: 'Connect an Instagram professional account',
        btnBG: COLOR_ENUM.YOUTUBE,
        btnTextColor: '[#FFFFF]'
    },
    FACEBOOK: {
        header: 'Facebook',
        icon: ICON_ENUM.FACEBOOK.icon,
        title: 'All your Facebook page analytics',
        desc: 'Track the daily evolution of your Facebook page and the effect of your posts on its growth. Get your audience’s demographic data and review the stats related to the impact of each post.',
        connectBtn: 'Connect a Facebook page',
        btnBG: COLOR_ENUM.FACEBOOK,
        btnTextColor: '[#FFFFF]'
    },
    LINKEDIN: {
        header: 'Linkedin',
        icon: ICON_ENUM.LINKEDIN.icon,
        title: 'Access your LinkedIn page data',
        desc: 'Attract talent towards your brand or customers if you have a B2B business, keeping an active and optimized presence on LinkedIn.',
        connectBtn: 'Connect a Linkedin account',
        btnBG: COLOR_ENUM.LINKEDIN,
        btnTextColor: '[#FFFFF]'
    },
    TWITTER: {
        header: 'Twitter',
        icon: ICON_ENUM.X.icon,
        title: 'Keep up with the important data from your community.',
        desc: 'Enhance your presence on X and make informed decisions. Understand the performance of your posts to refine your social strategy and achieve better outcomes. ',
        connectBtn: 'Connect a Twitter / X account',
        btnBG: COLOR_ENUM.X,
        btnTextColor: 'black'
    },
    WEB: {
        header: 'Website',
        icon: ICON_ENUM.WEB.icon,
        title: 'Connect your web or blog and extract all the analytics',
        desc: 'Extract the analytics related to your web or blog and improve your strategy based on the data.',
        connectBtn: 'Connect a Web page',
        btnBG: COLOR_ENUM.TIKTOK,
        btnTextColor: '[#FFFFF]'
    },
    GMB: {
        header: 'Google Business Profile',
        icon: ICON_ENUM.GOOGLEBUSINESS.icon,
        title: 'Conquer the map with analytics for Google Business Profile',
        desc: 'Monitor how your customer value your local business and how photos or videos generate more views of your brand.',
        connectBtn: 'Connect a Google Business Profile account',
        btnBG: COLOR_ENUM.BEHANCE,
        btnTextColor: '[#FFFFF]'
    },
    TIKTOK: {
        header: 'Tiktok',
        icon: ICON_ENUM.TIKTOK.icon,
        title: 'Conquer the marketing with Tiktok',
        desc: 'Monitor how your customer value your local business and how photos or videos generate more views of your brand.',
        connectBtn: 'Connect a Google Business Profile account',
        btnBG: COLOR_ENUM.BEHANCE,
        btnTextColor: '[#FFFFF]'
    },
    TWITCH: {
        header: 'Twitch',
        icon: ICON_ENUM.TWITCH.icon,
        title: 'Conquer the map with analytics for Twitch Profile',
        desc: 'Monitor how your customer value your local business and how photos or videos generate more views of your brand.',
        connectBtn: 'Connect a Google Twitch account',
        btnBG: COLOR_ENUM.BEHANCE,
        btnTextColor: '[#FFFFF]'
    },
    YOUTUBE: {
        header: 'Youtube',
        icon: ICON_ENUM.YOUTUBE.icon,
        title: 'Conquer the map with analytics for Youtube',
        desc: 'Monitor how your customer value your local business and how photos or videos generate more views of your brand.',
        connectBtn: 'Connect a Google Business Profile account',
        btnBG: COLOR_ENUM.BEHANCE,
        btnTextColor: '[#FFFFF]'
    },
}