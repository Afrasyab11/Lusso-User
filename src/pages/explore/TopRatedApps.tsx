import { useRef } from "react";
import ProductCard from "./ProductCard";

function TopRatedApps() {
    const scrollRef = useRef<any>(null);

    // static data
    const data = [
        {
            title: "Fortnite",
            subtitle: "This is your Product Subtitle Text...",
            rating: 4.8,
            image: "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
            tags: ["Unity", "Cloud Gaming", "AI"],
        },
        {
            title: "Cyberpunk",
            subtitle: "This is your Product Subtitle Text...",
            rating: 4.7,
            image: "https://via.assets.so/game.png?id=2&q=95&w=360&h=360&fit=fill",
            tags: ["Unity", "Cloud Gaming", "AI"],
        },
        {
            title: "Fortnite",
            subtitle: "This is your Product Subtitle Text...",
            rating: 4.8,
            image: "https://via.assets.so/game.png?id=3&q=95&w=360&h=360&fit=fill",
            tags: ["Unity", "Cloud Gaming", "AI"],
        },
        {
            title: "Cyberpunk",
            subtitle: "This is your Product Subtitle Text...",
            rating: 4.7,
            image: "https://via.assets.so/game.png?id=4&q=95&w=360&h=360&fit=fill",
            tags: ["Unity", "Cloud Gaming", "AI"],
        },
        {
            title: "Fortnite",
            subtitle: "This is your Product Subtitle Text...",
            rating: 4.8,
            image: "https://via.assets.so/game.png?id=5&q=95&w=360&h=360&fit=fill",
            tags: ["Unity", "Cloud Gaming", "AI"],
        },
        {
            title: "Cyberpunk",
            subtitle: "This is your Product Subtitle Text...",
            rating: 4.7,
            image: "https://via.assets.so/game.png?id=6&q=95&w=360&h=360&fit=fill",
            tags: ["Unity", "Cloud Gaming", "AI"],
        },
    ];

    // Scroll left function
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -300, // Adjust scroll amount as needed
            behavior: 'smooth'
        });
    };

    // Scroll right function
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 300, // Adjust scroll amount as needed
            behavior: 'smooth'
        });
    };

    return (
        <div className="p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#00F0FB] text-2xl font-semibold">Top Rated Apps</h2>
                <div className="flex gap-5 items-center">
                    {/* left scroll control */}
                    <button
                        onClick={scrollLeft} // Add click event for left scroll
                        className="bg-[#2E246C] rounded-full flex items-center justify-center ps-1 pt-1"
                        style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                            <path d="M16.25 11.725L3.25 11.725M3.25 11.725L9.1 17.575M3.25 11.725L9.1 5.875" stroke="#5B97FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    {/* right scroll control */}
                    <button
                        onClick={scrollRight} // Add click event for right scroll
                        className="bg-[#2E246C] rounded-full flex items-center justify-center ps-1 pt-1"
                        style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                            <path d="M4 10.6031L17 10.6031M17 10.6031L11.15 4.75312M17 10.6031L11.15 16.4531" stroke="#5B97FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    {/* View all */}
                    <a href="#" className="text-[#00F0FB] text-lg underline">
                        View All
                    </a>
                </div>

            </div>
            <div className="relative flex items-center space-x-4 overflow-x-auto" ref={scrollRef}>
                {data.map((course, index) => (
                    <ProductCard key={index} course={course} />
                ))}
            </div>
        </div>
    )
}

export default TopRatedApps;
