import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICON_ENUM } from '../../constants/icons.constant';
import { decodeToken, getTokenFromCookies } from '../../hooks/common.utils';
import FilterBar from '../../pages/explore/FilterBar';

const ExploreAllModalHeader: React.FC<any> = ({ onClose, children, category, sortBy, setSortBy, loading = false, getExploreData, uniqueCategories }: any) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const topRef = useRef<HTMLDivElement | any>(null);

    // Initialize user data
    useEffect(() => {
        const token = getTokenFromCookies();
        if (token) {
            const decoded = decodeToken(token);
            setUserData(decoded);
        } else {
            navigate('/auth');
        }
    }, [navigate]);

    const location = useLocation();
    let refreshTab = '';
    if (location.pathname.includes("/addproduct")) {
        refreshTab = 'addproducts';
    }
    if (location.pathname.includes("/manageprofile")) {
        refreshTab = 'manageprofile';
    }

    function getCategoryName(category: string): string {
        switch (category.toLowerCase()) {
            case "trending":
                return "Top Trending";
            case "new":
                return "Newly Added";
            case "games":
                return "Games";
            case "game":
                return "Games";
            case "movies":
                return "Movie";
            case "courses":
                return "Courses";
            case "course":
                return "Courses";
            case "apps":
                return "Apps";
            case "ai":
                return "AI Products";
            case "ai-products":
                return "AI Products";
            case "services":
                return "Services";
            case "service":
                return "Services";
            case "movie":
                return "Movies & Tv";
            default:
                return category;
        }
    }

    return (
        <div className="flex flex-col overflow-hidden
        ">
            <main ref={topRef} className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className='flex justify-end items-center md:h-[5rem]'>
                    <button
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={onClose}
                    >
                        <img src={ICON_ENUM.CROSS.icon} className="h-5" alt="filters" />
                    </button>
                </div>
                <div className='flex justify-center relative text-3xl md:text-5xl font-semibold uppercase'>
                    <span>{getCategoryName(category)}</span>
                </div>
                {/* Filter */}
                <FilterBar sortBy={sortBy} setSortBy={setSortBy} getExploreData={getExploreData} uniqueCategories={uniqueCategories} categoryType={category} />

                <div className="mx-auto h-[70vh] md:min-h-[60vh] overflow-y-auto scrollbar-none md:pt-10">
                    {loading ? (
                        <div className="flex items-center justify-center absolute inset-0 bg-black/50 z-10">
                            <div className="loader"></div> {/* Replace with your loader component or animation */}
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </main>
        </div>
    );
};

export default ExploreAllModalHeader;
