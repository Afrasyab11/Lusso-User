import React, { useState } from 'react';

const ExploreSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="p-3 relative w-full max-w-2xl exploreSearch">
            <input
                type="text"
                placeholder="Search games, apps, movies and more.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: '#302B48' }}
                className="h-[60px] w-full py-2 pl-4 pr-12 text-white rounded-full focus:outline-none 
                focus:ring-2 focus:ring-purple-600 placeholder:text-white"
            />
            <button
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-[#5721B9] hover:bg-[#7D3CF3] rounded-full 
                focus:outline-none focus:ring-2"
            >
                <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default ExploreSearch