import { useEffect, useState } from "react";
import app_performance_icon from "../../assets/images/app_performance.png";
import product_preview from "../../assets/images/product_preview.png";
import star_icon from "../../assets/images/star.svg";
import GraphChart from "../../components/charts/GraphChart";
import PieChart from "../../components/charts/PieChart";
import { DoughNutChartData, PieChartData, userAgeData, VisitorData } from "./DashboardData";
import "./dev.scss";
import "./ProductDetails.scss";

import behance from "../../assets/images/icons/Behance.svg";
import dribble from "../../assets/images/icons/Dribbble.svg";
import facebook from "../../assets/images/icons/Facebook.svg";
import instagram from "../../assets/images/icons/Instagram.svg";
import linkedin from "../../assets/images/icons/Linkedin.svg";
import pinterest from "../../assets/images/icons/Pinterest.svg";
import twitter from "../../assets/images/icons/Twitter_blue.svg";
import DoughnutChart from "../../components/charts/DoughnutChart ";


const featureCard = (name: string, value: string) => {
    return (
        <div className="featureCard">
            <span className="featureCard-text text-[#C1C1C1]">{name}</span>
            <span className="featureCard-value text-white">{value}</span>
        </div>
    )
}

const ProductDetails = () => {
    const [isThirdChildWrapped, setIsThirdChildWrapped] = useState(false);
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
    useEffect(() => {
        const checkAppPerformanceIsWrapped = () => {
            const thirdChild = document.querySelector('.product-analytics-wrapper .analytics-main-right');
            if (thirdChild) {
                const rect = thirdChild.getBoundingClientRect();
                setIsThirdChildWrapped(rect.top > 350);

            }
        }
        window.addEventListener('resize', checkAppPerformanceIsWrapped);
        checkAppPerformanceIsWrapped();

        return () => {
            window.removeEventListener('resize', checkAppPerformanceIsWrapped);
        };
    }, [])

    return (
        <div className="product-analytics-wrapper">
            <div className="product-analytics-header">
                Product Analytics
            </div>
            <div className="analytics-top-data" style={{ width: '100%', overflowX: "auto", scrollbarWidth: "none" }}>
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
            <div className="chart-container-row analytics-row">
                <div className="analytics-main-content-wrapper chart-container">
                    <div className="analytics-main-col-1">
                        <img src={product_preview} alt="" />
                    </div>
                    <div className="analytics-main-col-2">
                        <div className="product-title-bar">
                            <div className="title">Cloud Crafty</div>
                            <button
                                style={{ color: '#FFF', fontWeight: 500, paddingLeft: 16, paddingRight: 16 }}
                                className='AddProductButton'
                            >
                                Edit Product
                            </button>
                        </div>
                        <div className="analytics-main-content">
                            <div className="analytics-main-common analytics-main-left">
                                <div className="label">
                                    Mobile App
                                </div>
                                <div className="rating-container">
                                    <span>1,000K</span>
                                    <span>
                                        <img src={star_icon} alt="" />
                                        <img src={star_icon} alt="" />
                                        <img src={star_icon} alt="" />
                                        <img src={star_icon} alt="" />
                                    </span>
                                </div>
                                <table className="analytics-data-table">
                                    <tr>
                                        <td className="data-label">App Link:</td>
                                        <td>pixelpalooza.com</td>
                                    </tr>
                                    <tr>
                                        <td className="data-label">Category:</td>
                                        <td>pixelpalooza.com</td>
                                    </tr>
                                    <tr>
                                        <td className="data-label">Prize:</td>
                                        <td>pixelpalooza.com</td>
                                    </tr>
                                    <tr>
                                        <td className="data-label">Size:</td>
                                        <td>pixelpalooza.com</td>
                                    </tr>
                                </table>
                            </div>
                            {
                                !isThirdChildWrapped &&
                                <div className="analytics-separator"></div>
                            }
                            <div className="analytics-main-common analytics-main-right">

                                <div>
                                    App Performance
                                </div>
                                <div className="analytics-performance-wrapper">
                                    <div className="performance-left">
                                        <img src={app_performance_icon} alt="" />
                                    </div>
                                    <div className="performance-right">
                                        <table className="analytics-data-table">
                                            <tr>
                                                <td className="data-label">App Link:</td>
                                                <td>pixelpalooza.com</td>
                                            </tr>
                                            <tr>
                                                <td className="data-label">Category:</td>
                                                <td>pixelpalooza.com</td>
                                            </tr>
                                            <tr>
                                                <td className="data-label">Prize:</td>
                                                <td>pixelpalooza.com</td>
                                            </tr>
                                            <tr>
                                                <td className="data-label">Size:</td>
                                                <td>pixelpalooza.com</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                <div className="graph-chart-container chart-container">
                    <div className="chart-title">Last 7 Days  Visits</div>
                    <div className="chart-content">
                        <GraphChart data={VisitorData} />
                    </div>
                </div>

                <div className="graph-chart-container chart-container">
                    <div className="chart-title">User age group</div>
                    <div className="chart-content">
                        <GraphChart data={userAgeData} />
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
    )
}

export default ProductDetails;