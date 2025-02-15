
import img_placeholder from '../../../../assets/images/placeholder-img.svg';
import DataGrid from '../../../../components/dataGrid/DataGrid';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import MapStats from '../../MapStats';
import '../SocialAnalytics.scss';
import DonutStats from './DonutStats';
import TilesAndGraphStats from './TilesAndGraphStats';

function isIconEnumKey(key: string): key is keyof typeof ICON_ENUM {
    return key in ICON_ENUM;
}

const lineChartDataSet = {
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

const pageOverviewStats = {
    topTiles: [
        {
            title: 'Likes',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Followers',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Impressions',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Page Visits',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    bottomTiles: [
        {
            title: 'Likes',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            // borderColor: ICON_ENUM?.LINKEDIN?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Daily Likes',
            // borderColor: ICON_ENUM?.TIKTOK?.borderColor,
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '142',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Likes per posts',
            // borderColor: ICON_ENUM?.TWITCH?.borderColor,
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '715',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Daily page views',
            // borderColor: ICON_ENUM?.BEHANCE?.borderColor,
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '98',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const balanceOfLikesStats = {
    topTiles: [
        {
            title: 'Acquired',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Lost',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Total content',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const postViewedInPeriodStats = {
    topTiles: [
        {
            title: 'Impressions',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Reactions',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Total content',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Page Visits',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const genderReachStats = {
    topTiles: [
        {
            title: 'Male',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Female',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Unknown',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Total content',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const ageReachStats = {
    topTiles: [
        {
            title: '13 to 17 years',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: '18 to 24 years',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: '34 to 35 years',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: '35 to 44 years',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: '45 to 54 years',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: '55 to 64 years',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: '65+ years',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Total content',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const clicksStats = {
    topTiles: [
        {
            title: 'Click to action',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Website button',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Page visits',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Total content',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const postsPublishOverviewStats = {
    topTiles: [
        {
            title: 'Engagement',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Interaction',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Avg reach per post',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Impressions',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const postsPublishInteractionsStats = {
    topTiles: [
        {
            title: 'Reactions',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Comments',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Shared',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Clicks',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    bottomTiles: [
        {
            title: 'Daily reactions',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Reactions per post',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '142',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Daily comments',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '715',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Comments per post',
            borderColor: '#6C8CFF80',
            borderWidth: '1px',
            count: '98',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet,
};

const storiesPublishClicksStats = {
    topTiles: [
        {
            title: 'Stories',
            borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
            count: '1852',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Website button',
            borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
            count: '198',
            bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Page visits',
            borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
            count: '214',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
        {
            title: 'Total content',
            borderColor: ICON_ENUM?.X?.borderColor,
            count: '167',
            bodyIcon: ICON_ENUM?.UP_TREND?.icon,
            text: '+8.2k increase/day',
        },
    ],
    lineChartDataSet: {
        configuration: {
            gradientStroke: {
                websiteButton: [
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
                    dataKey: 'websiteButton',
                    stroke: 'url(#websiteButton)',
                },
            ],
        },
        dataSet: [
            {
                date: 'Aug 8',
                websiteButton: 1852,
            },
            {
                date: 'Aug 18',
                websiteButton: 1852,
            },
            {
                date: 'Aug 28',
                websiteButton: 198,
            },
            {
                date: 'Sep 8',
                websiteButton: 100,
            },
            {
                date: 'Sep 18',
                websiteButton: 100,
            },
            {
                date: 'Sep 28',
                websiteButton: 205,
            },
        ],
    },
};

const dataSet = [
    {
        name: 'Transform your digital dreams into...',
        network: 'FACEBOOK',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
    {
        name: 'Transform your digital dreams into...',
        network: 'INSTAGRAM',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
    {
        name: 'Transform your digital dreams into...',
        network: 'LINKEDIN',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
    {
        name: 'Transform your digital dreams into...',
        network: 'TIKTOK',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
    {
        name: 'Transform your digital dreams into...',
        network: 'X',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
    {
        name: 'Transform your digital dreams into...',
        network: 'YOUTUBE',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
    {
        name: 'Transform your digital dreams into...',
        network: 'THREAD',
        date: 'Aug-25-2024',
        timestamp: '07:01 AM',
        impressions: '20.37K',
        interaction: '130',
    },
];

const BehanceAnalytics = () => {

    const columns = [
        {
            header: '',
            target: 'name',
            cellRender: (value: any, rowId: number) => (
                <div className="flex flex-col lg:flex-row gap-5 justify-start">
                    <img
                        src={img_placeholder ?? ''}
                        alt={'img_placeholder_' + rowId}
                        width={35}
                    />
                    <div className="space-y-3">
                        <p>{value ?? ''}</p>
                        <div className="flex flex-col lg:flex-row justify-between">
                            <button className="flex items-center gap-2">
                                <img
                                    src={ICON_ENUM?.FILE_MORE_LINE?.icon ?? ''}
                                    alt={'FILE_MORE_LINE_' + rowId}
                                />{' '}
                                <p>More</p>
                            </button>
                            <button className="flex items-center gap-2">
                                <img
                                    src={ICON_ENUM?.BX_BOOK?.icon ?? ''}
                                    alt={'BX_BOOK_' + rowId}
                                />{' '}
                                <p>Reuse content</p>
                            </button>
                            <button className="flex items-center gap-2">
                                <img
                                    src={ICON_ENUM?.VIEW_CIRCLE?.icon ?? ''}
                                    alt={'VIEW_CIRCLE_' + rowId}
                                />{' '}
                                <p>View</p>
                            </button>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            header: 'Network',
            target: 'network',
            cellRender: (value: string, rowNo: number) => (
                <div className="flex justify-center">
                    <img
                        src={isIconEnumKey(value) ? ICON_ENUM[value].icon : ''}
                        width={25}
                        alt={value ?? 'network_Img_' + rowNo}
                    />
                </div>
            ),
        },
        {
            header: 'Date',
            target: 'date',
            cellRender: (value: string, rowNo: number, rowData: any) => (
                <div className="flex flex-col">
                    <span>{value ?? ''}</span> <span>{rowData?.timestamp ?? ''}</span>
                </div>
            ),
        },
        {
            header: 'Impressions',
            target: 'impressions',
        },
        {
            header: 'Interaction',
            target: 'interaction',
        },
    ];

    const storiesColumns = [
        {
            header: '',
            target: 'name',
            cellRender: (value: any, rowId: number) => (
                <div className="flex flex-col space-y-1 items-start">
                    <p>{value ?? ''}</p>
                    <p>Link clicks</p>
                    <button className="flex items-center gap-2">
                        <img src={ICON_ENUM?.STATS?.icon ?? ''} alt={'STATS_' + rowId} />{' '}
                        <p>More stats</p>
                    </button>
                </div>
            ),
        },
        {
            header: 'Network',
            target: 'network',
            cellRender: (value: string, rowNo: number) => (
                <div className="flex justify-center">
                    <img
                        src={ICON_ENUM?.META_LOGO?.icon ?? ''}
                        width={25}
                        alt={value ?? 'network_Img_' + rowNo}
                    />
                </div>
            ),
        },
        {
            header: 'Updated',
            target: 'date',
            cellRender: (value: string, rowNo: number, rowData: any) => (
                <div className="flex flex-col">
                    <span>{value ?? ''}</span> <span>{rowData?.timestamp ?? ''}</span>
                </div>
            ),
        },
        {
            header: 'Impressions',
            target: 'impressions',
        },
    ];

    return (
        <div className="dashboard-container text-white p-6">
            {/* Header Section */}
            <div className="header flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Behance App Analytics</h2>
                <div className="flex items-center space-x-4">
                    <span className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded">
                        11-20 Jan
                    </span>
                    <button className="btn-download bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded">
                        Download Report
                    </button>
                </div>
            </div>

            <div className="space-y-5">
                <h2 className="text-2xl">Page Overview</h2>
                <TilesAndGraphStats title="Growth" data={pageOverviewStats} />
                <TilesAndGraphStats
                    title="Balance of Likes"
                    data={balanceOfLikesStats}
                    gridConfig={{ lg: '3' }}
                />
                <TilesAndGraphStats
                    title="Posts viewed in period"
                    data={postViewedInPeriodStats}
                />

                <h2 className="text-2xl">Demographics</h2>
                <TilesAndGraphStats title="Reach by gender" data={genderReachStats} />
                <TilesAndGraphStats title="Reach by age" data={ageReachStats} />
                <MapStats
                    title="Followers by country"
                    data={{
                        totalUsers: 2431340,
                        activeUsers: 92980,
                        newUsers: 92980,
                        activeUsersPercentage: 27,
                        newUsersPercentage: 63,
                        locations: [
                            {
                                flag: ICON_ENUM?.USA?.icon,
                                name: 'United States',
                                lat: 41.8781,
                                lng: -87.6298,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.ROMANIA?.icon,
                                name: 'Romania',
                                lat: 52.52,
                                lng: 13.405,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.CANADA?.icon,
                                name: 'Canada',
                                lat: 31.2304,
                                lng: 121.4737,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.INDIA?.icon,
                                name: 'India',
                                lat: -3.119,
                                lng: -60.0217,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.UK?.icon,
                                name: 'United Kingdom',
                                lat: -20.9176,
                                lng: 142.7028,
                                value: '55,750',
                                percentage: '27.3',
                            },
                            {
                                flag: ICON_ENUM?.ITALY?.icon,
                                name: 'Italy',
                                lat: -17.9176,
                                lng: 102.7028,
                                value: '55,750',
                                percentage: '27.3',
                            },
                        ],
                    }}
                />

                <h2 className="text-2xl">Clicks on page</h2>
                <TilesAndGraphStats title="Clicks" data={clicksStats} />

                <h2 className="text-2xl">Posts published in periods</h2>
                <TilesAndGraphStats title="Overview" data={postsPublishOverviewStats} />
                <TilesAndGraphStats
                    title="Interactions"
                    data={postsPublishInteractionsStats}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 p-0">
                    <DonutStats
                        title="Types"
                        data={{
                            gradient: {
                                id: 'customGradient',
                                list: [
                                    { offset: '0.45%', stopColor: '#B00D98' },
                                    { offset: '98.74%', stopColor: '#FF5EE5' },
                                ],
                            },
                            dataSet: [
                                { name: 'Link', value: 40, color: '#007DFE' },
                                {
                                    name: 'Merge',
                                    value: 60,
                                    color: 'url(#customGradient)',
                                },
                            ],
                        }}
                    />
                    <DonutStats
                        title="Impressions"
                        data={{
                            gradient: {
                                id: 'customGradient_2',
                                list: [
                                    { offset: '0%', stopColor: '#460F88' },
                                    { offset: '99.49%', stopColor: '#9B56FE' },
                                ],
                            },
                            dataSet: [
                                { name: 'Organic', value: 40, color: '#007DFE' },
                                {
                                    name: 'Promoted',
                                    value: 60,
                                    color: 'url(#customGradient_2)',
                                },
                            ],
                        }}
                    />
                </div>

                <div className="followers-section p-4 card-bg-dev rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">List of posts</span>
                        <button>
                            <img src={ICON_ENUM?.THREE_DOTS?.icon ?? ''} alt="more options" />
                        </button>
                    </div>
                    <DataGrid columns={columns} data={dataSet} />
                </div>

                <h2 className="text-2xl">Stories published in period</h2>
                <TilesAndGraphStats title="Clicks" data={storiesPublishClicksStats} />

                <div className="followers-section p-4 card-bg-dev rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">List of stories</span>
                        <button>
                            <img src={ICON_ENUM?.THREE_DOTS?.icon ?? ''} alt="more options" />
                        </button>
                    </div>
                    <DataGrid columns={storiesColumns} data={dataSet} />
                </div>
            </div>
        </div>
    );
};

export default BehanceAnalytics;
