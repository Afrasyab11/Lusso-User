import { COLOR_ENUM } from '../../../../constants/colors.constant';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import { checkNullOrEmpty, fomatedDateMonthDY } from '../../../../utils/utils';

export const KEYS_ENUM_GB = {
    BUSINESS_IMPRESSIONS_SEARCH: 'Google Search',
    BUSINESS_IMPRESSIONS_MAPS: 'Google Maps',
}



export const postListolumns = [
    {
        header: 'Date', target: 'created', cellRender: (value: any) => {
            if (checkNullOrEmpty(value)) return;
            const splitDate = new Date(value).toLocaleString();
            return fomatedDateMonthDY(splitDate)
        }
    },
    { header: 'Type', target: 'type' },
];

export const reachStats = {
    topTiles: [
        {
            title: 'Google Maps',
            targetKey: 'Google Maps',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Google Search',
            targetKey: 'Google search',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Total',
            targetKey: 'total',
            borderColor: ICON_ENUM?.X?.borderColor,
        }
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                googleMaps: { label: 'Google Maps', color: COLOR_ENUM.FACEBOOK },
                googleSearch: { label: 'Google Search', color: COLOR_ENUM.YOUTUBE },
                total: { label: 'Total', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [
                {
                    dataKey: 'googleMaps',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'googleSearch',
                    stroke: 'url(#youtube)',
                }
            ],
            bars: [
                {
                    dataKey: 'total',
                },
            ],
        },
    },
};

export const locationClicksStats = {
    topTiles: [
        {
            title: 'Website',
            targetKey: 'Website',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Phone',
            targetKey: 'Phone',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        },
        {
            title: 'Directions',
            targetKey: 'Directions',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        },
        {
            title: 'Total',
            targetKey: 'total',
            borderColor: ICON_ENUM?.X?.borderColor,
        }
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                website: { label: 'Website', color: COLOR_ENUM.FACEBOOK },
                phone: { label: 'Phone', color: COLOR_ENUM.YOUTUBE },
                directions: { label: 'Directions', color: COLOR_ENUM.INSTAGRAM },
                total: { label: 'Total', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [
                {
                    dataKey: 'website',
                    stroke: 'url(#facebook)',
                },
                {
                    dataKey: 'phone',
                    stroke: 'url(#youtube)',
                },
                {
                    dataKey: 'directions',
                    stroke: 'url(#instagram)',
                }
            ],
            bars: [
                {
                    dataKey: 'total',
                },
            ],
        },
    },
};

export const reviewsStats = {
    topTiles: [
        {
            title: 'Star rating',
            targetKey: 'star rating',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        },
        {
            title: 'Total',
            targetKey: 'total',
            borderColor: ICON_ENUM?.X?.borderColor,
        }
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                starRating: { label: 'Star rating', color: COLOR_ENUM.FACEBOOK },
                total: { label: 'Total', color: COLOR_ENUM.YOUTUBE },
            },
            lines: [
                {
                    dataKey: 'starRating',
                    stroke: 'url(#facebook)',
                }
            ],
            bars: [
                {
                    dataKey: 'total',
                },
            ],
        },
    },
};

export const photosAndVideosStats = {
    topTiles: [
        {
            title: 'Total',
            targetKey: 'total',
            borderColor: ICON_ENUM?.X?.borderColor,
        }
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                photos: { label: 'Total', color: COLOR_ENUM.YOUTUBE },
            },
            bars: [
                {
                    dataKey: 'photos',
                },
            ],
        },
    },
};
export const postsStats = {
    topTiles: [
        {
            title: 'Total',
            targetKey: 'total',
            borderColor: ICON_ENUM?.X?.borderColor,
        }
    ],
    graphConfiguration: {
        configuration: {
            tooltip: {
                photos: { label: 'Total', color: COLOR_ENUM.YOUTUBE },
            },
            bars: [
                {
                    dataKey: 'photos',
                },
            ],
        },
    },
};