import React, { useState } from 'react';
import './MainCategory.css';

// import AppsCategory from "../../assets/images/AppsCategory.svg";
// import CoursesCategory from "../../assets/images/CoursesCategory.svg";
// import GamesCategory from "../../assets/images/GamesCategory.svg";
// import MoviesCategory from "../../assets/images/MoviesCategory.svg";
// import ServicesCategory from "../../assets/images/ServicesCategory.svg";

import { Link } from 'react-router-dom';
import AppsCategory from "../../assets/images/explore/cat1.svg";
import CoursesCategory from "../../assets/images/explore/cat2.svg";
import GamesCategory from "../../assets/images/explore/cat3.svg";
import MoviesCategory from "../../assets/images/explore/cat4.svg";
import ServicesCategory from "../../assets/images/explore/cat5.svg";

const MainCategoryCard: React.FC = () => {
    const [hoveredCategory, setHoveredCategory]: any = useState();

    const categories = [
        { name: 'Apps', path: '/explore/apps', image: AppsCategory, video: '/videos/animation.mp4', bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #2C56EB' },
        { name: 'Games', path: '/explore/games', image: GamesCategory, video: '/videos/adventure.mp4', bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #6714FF' },
        { name: 'Movies & TV', path: '/explore/movies-tvs', image: MoviesCategory, video: '/videos/scifi.mp4', bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #B03FE0' },
        { name: 'Courses', path: '/explore/courses', image: CoursesCategory, video: '/videos/fantasy.mp4', bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #3E68D2' },
        { name: 'Services', path: '/explore/services', image: ServicesCategory, video: '/videos/fantasy.mp4', bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), #22A2BE' },
    ];

    return (

        <div className="similar-category-container">
            {/* OLD CODE */}
            {/* {categories.map((category, index) => (
                <div
                    style={{ width: 350 }}
                    className={`similar-cat-item ${hoveredCategory === category.name ? "hovered" : ""}`}
                    key={index}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    {hoveredCategory === category.name ? (
                        <video autoPlay muted className="fit-parent">
                            <source src={category.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <>
                            <span className="category-name" style={{ textTransform: 'uppercase', fontWeight: 700 }}>{category.name}</span>
                            <img style={{ borderRadius: 12 }} src={category.image} alt={category.name} />
                        </>
                    )}
                </div>
            ))} */}
            {/* New Code */}
            {categories.map((category, index) => (
                <Link to={category.path}>
                    <div
                        style={{ width: 350, background: category.bg }}
                        className={`w-full lg:w-auto similar-cat-item ${hoveredCategory === category.name ? "hovered" : ""}`}
                        key={index}
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        {hoveredCategory === category.name ? (
                            <video autoPlay muted className="fit-parent">
                                <source src={category.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <>
                                <span className="category-name" style={{ textTransform: 'uppercase', fontWeight: 700 }}>{category.name}</span>
                                <img style={{ borderRadius: 12 }} src={category.image} alt={category.name} />
                            </>
                        )}
                    </div>
                </Link>
            ))}

        </div>
    );
}

export default MainCategoryCard;
