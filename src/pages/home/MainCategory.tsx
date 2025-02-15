import React, { useState } from 'react';
import './MainCategory.css';

// import AppsCategory from "../../assets/images/AppsCategory.svg";
// import CoursesCategory from "../../assets/images/CoursesCategory.svg";
// import GamesCategory from "../../assets/images/GamesCategory.svg";
// import MoviesCategory from "../../assets/images/MoviesCategory.svg";
// import ServicesCategory from "../../assets/images/ServicesCategory.svg";

import { useNavigate } from 'react-router-dom';
import AppsCategory from "../../assets/images/explore/Apps.svg";
import GamesIcon from "../../assets/images/explore/cat2.svg";
import MoviesIcon from "../../assets/images/explore/cat3.svg";
import CoursesIcon from "../../assets/images/explore/cat4.svg";
import ServicesCategory from "../../assets/images/explore/cat5.svg";
import AICategory from "../../assets/images/explore/cat6.svg";

const MainCategoryCard: React.FC = () => {
    const [hoveredCategory, setHoveredCategory]: any = useState();
    const navigate = useNavigate();
    const categories = [
        {
            name: 'Apps',
            path: '#apps',
            image: AppsCategory,
            video: '/videos/animation.mp4',
            bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #2C56EB',
        },
        {
            name: 'Games',
            path: '#games',
            image: GamesIcon,
            video: '/videos/adventure.mp4',
            bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #6714FF',
        },
        {
            name: 'Movies & TV',
            path: '#movies-tvs',
            image: MoviesIcon,
            video: '/videos/scifi.mp4',
            bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #B03FE0',
        },
        {
            name: 'Courses',
            path: '#courses',
            image: CoursesIcon,
            video: '/videos/fantasy.mp4',
            bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #3E68D2',
        },
        {
            name: 'Services',
            path: '#services',
            image: ServicesCategory,
            video: '/videos/fantasy.mp4',
            bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #22A2BE',
        },
        {
            name: 'AI Products',
            path: '#aiRef',
            image: AICategory,
            video: '/videos/fantasy.mp4',
            bg: 'linear-gradient(26deg, #F400F6 0.02%, #F103F6 1.08%, #AB40F5 25.72%, #7471F4 47.91%, #4C94F3 66.89%, #34A9F3 81.93%, #2BB1F3 91.14%)',
        },
    ];

    return (
        <div className="similar-category-container">
            {/* New Code */}
            {categories.map((category, index) => (
                // <Link to={category.path}
                //     className={`similar-cat-item`}
                // >
                <div
                    onClick={() => navigate(category.path)}
                    className="cursor-pointer similar-cat-item"
                    style={{ background: category.bg }}
                    key={index}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    <span
                        className="category-name"
                        style={{ textTransform: 'uppercase', fontWeight: 700 }}
                    >
                        {category.name}
                    </span>
                    <img
                        style={{ borderRadius: 12 }}
                        src={category.image}
                        alt={category.name}
                    />
                </div>
                // </Link>
            ))}
        </div>
    );
};

export default MainCategoryCard;
