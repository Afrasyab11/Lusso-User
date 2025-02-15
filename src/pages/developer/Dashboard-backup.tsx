import { useState } from "react";
import GraphChart from "../../components/charts/GraphChart";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import { DoughNutChartData, PieChartData, VisitorData } from "./DashboardData";
import "./dev.scss";

import arrow_up_green from "../../assets/images/icons/arrow_up_green.svg";
import behance from "../../assets/images/icons/Behance.svg";
import dribble from "../../assets/images/icons/Dribbble.svg";
import facebook from "../../assets/images/icons/Facebook.svg";
import instagram from "../../assets/images/icons/Instagram.svg";
import linkedin from "../../assets/images/icons/Linkedin.svg";
import pinterest from "../../assets/images/icons/Pinterest.svg";
import product_apk from "../../assets/images/icons/product_apk.png";
import twitter from "../../assets/images/icons/Twitter_blue.svg";
import DoughnutChart from "../../components/charts/DoughnutChart ";

const DashBoard = () => {
    const featureCard = (name: string, value: string) => {
        return (
            <div className="featureCard">
                <span className="featureCard-text text-[#C1C1C1]">{name}</span>
                <span className="featureCard-value text-white">{value}</span>
            </div>
        )
    }

    const [redirectData, setRedirectData] = useState([
        {
            icon: facebook,
            title: "Facebook",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
        {
            icon: twitter,
            title: "Twitter",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
        {
            icon: linkedin,
            title: "Linkedin",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
        {
            icon: instagram,
            title: "Instagram",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
        {
            icon: dribble,
            title: "Dribble",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
        {
            icon: behance,
            title: "Behance",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
        {
            icon: pinterest,
            title: "Pinterest",
            visitor: 999,
            subscribers: 282,
            downloads: 234
        },
    ])

    const [boostData, setBoostData] = useState([
        {
            productName: "Product 1",
            daysCount: 9
        },
        {
            productName: "Product 2",
            daysCount: 9
        },
        {
            productName: "Product 3",
            daysCount: 9
        },
        {
            productName: "Product 4",
            daysCount: 9
        },
        {
            productName: "Product 5",
            daysCount: 9
        },
        {
            productName: "Product 6",
            daysCount: 9
        },
    ])

    return (
        <div className="flex flex-col justify-start items-center gap-y-6"
            style={{ height: '100%', background: 'linear-gradient(125deg, #2D246C 6.52%, #16132B 30.66%, #18142E 63.49%, #25204A 78.95%)' }}>
            <div className="flex flex-row justify-between items-center gap-x-6" style={{ width: '100%', overflow: "auto", scrollbarWidth: "none" }}>
                {
                    featureCard('Total Visitors', '4.5')
                }
                {
                    featureCard("Total Likes", '23')
                }
                {
                    featureCard('Total Dislikes', '350')
                }
                {
                    featureCard('Total Comments', '25')
                }
                {
                    featureCard('Total Shares', '25')
                }
            </div>
            <div className='flex flex-col gap-4' style={{ width: '100%', overflow: "auto", flex: "1", scrollbarWidth: "none" }}>
                <div className="chart-container-row">
                    <div className="line-chart-container chart-container">
                        <div className="chart-title">Visitors</div>
                        <div className="chart-content">
                            <LineChart data={VisitorData} />
                        </div>
                    </div>
                    <div className="graph-chart-container chart-container">
                        <div className="chart-title">Last 7 Days  Visits</div>
                        <div className="chart-content">
                            <GraphChart data={VisitorData} />
                        </div>
                    </div>
                    <div className="pie-chart-container chart-container">
                        <div className="chart-title">By Gender</div>
                        <div className="chart-content">
                            <PieChart data={PieChartData} />
                        </div>
                    </div>
                </div>
                <div className="chart-container-row">
                    <div className="chart-container row-2-container data-container">
                        <div className="chart-title">
                            <span>Total Redirects</span>
                            <div className="data-filter-btn">
                                <select>
                                    <option selected value="This Month">This Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="data-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>NETWORK</th>
                                        <th>VISITORS</th>
                                        <th>SUBSCRIBERS</th>
                                        <th>DOWNLOADS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {redirectData.map(data => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div className="network-td">
                                                        <img src={data.icon} alt="" />
                                                        <span>{data.title}</span>
                                                    </div>
                                                </td>
                                                <td>{data.visitor}</td>
                                                <td>{data.subscribers}</td>
                                                <td>{data.downloads}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="chart-container row-2-container data-container">
                        <div className="chart-title">
                            <span>Product Boost Overview</span>
                            <div className="data-filter-btn">
                                <select>
                                    <option selected value="This Month">This Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="product-boost-overview data-content">
                            {
                                boostData.map(data => {
                                    return (
                                        <div className="product-boost-item">
                                            <img className="product-apk-img" src={product_apk} alt="" />
                                            <div className="product-name">{data.productName}</div>
                                            <div className="boost-info">
                                                <div className="boosted">
                                                    <img src={arrow_up_green} alt="" />
                                                    <span>Boosted</span>
                                                </div>
                                                <div className="days-count">
                                                    {data.daysCount} DAYS LEFT
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="chart-container row-2-container">
                        <div className="chart-title">Users by device</div>
                        <div className="chart-content">
                            <DoughnutChart data={DoughNutChartData} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashBoard;