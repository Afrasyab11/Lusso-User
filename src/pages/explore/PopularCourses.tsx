import React from 'react';
import GameCard from '../../components/cards/GameCard';

const data = [
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=2&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=3&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=4&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=5&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=6&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=7&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=8&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
    {
        title: 'Game Title',
        subtitle: 'Product Subtitle Text...',
        image: 'https://via.assets.so/game.png?id=9&q=95&w=360&h=360&fit=fill',
        rating: 4.8,
    },
];

const PopularCourses: React.FC = () => {
    return (
        <div className="p-3 rounded-2xl" style={{ background: 'var(--gradient7, linear-gradient(125deg, rgba(45, 36, 108, 0.90) 6.52%, rgba(22, 19, 43, 0.50) 30.66%, rgba(24, 20, 46, 0.50) 63.49%, rgba(37, 32, 74, 0.90) 78.95%))' }}>
            <div className='mx-5 mt-5 flex justify-between items-center'>
                <h2 className="text-2xl mb-5 text-[#00F0FB] flex items-center font-semibold">
                    <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M16.5 1.25H7.5C4.98 1.25 3 3.26724 3 5.83464V20.5055C3 21.6058 3.63 22.6144 4.71 23.0729C5.7 23.4397 6.87 23.2563 7.68 22.3394L12 17.2962L16.32 22.3394C16.86 22.8895 17.58 23.1646 18.3 23.1646C18.66 23.1646 19.02 23.0729 19.29 22.9812C20.28 22.5227 21 21.5141 21 20.4138V5.83464C21 3.26724 19.02 1.25 16.5 1.25ZM19.2 20.5055C19.2 21.0557 18.75 21.3307 18.66 21.3307C18.57 21.4224 18.03 21.5141 17.67 21.1473L12.72 15.279C12.54 15.0956 12.27 15.0039 12 15.0039C11.73 15.0039 11.46 15.0956 11.28 15.279L6.33 21.0557C5.97 21.5141 5.52 21.3307 5.34 21.239C5.25 21.3307 4.8 21.0557 4.8 20.5055V5.83464C4.8 4.27586 5.97 3.08386 7.5 3.08386H16.5C18.03 3.08386 19.2 4.27586 19.2 5.83464V20.5055ZM16.41 8.12696C16.5 8.40204 16.41 8.76881 16.23 8.9522L14.43 10.4193L15.15 12.7116C15.24 12.9867 15.15 13.3535 14.88 13.5368C14.61 13.7202 14.25 13.7202 13.98 13.5368L12 12.2531L9.93 13.6285C9.84 13.7202 9.66 13.7202 9.48 13.7202C9.3 13.7202 9.12 13.6285 9.03 13.5368C8.76 13.3535 8.67 12.9867 8.76 12.7116L9.48 10.4193L7.68 8.9522C7.5 8.76881 7.41 8.49373 7.59 8.12696C7.68 7.85188 7.95 7.6685 8.22 7.6685H10.47L11.28 5.37618C11.37 5.1011 11.73 4.91771 12 4.91771C12.27 4.91771 12.63 5.1011 12.72 5.37618L13.53 7.6685H15.78C16.05 7.6685 16.32 7.85188 16.41 8.12696Z" fill="#00FFFF" />
                    </svg>
                    {'Popular Courses'}
                </h2>
                <button className='text-[#0FF] text-lg font-medium underline'>View All</button>
            </div>
            <div className="mx-4 mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {data.map((data, index) => (
                    <GameCard key={index} game={data} bg={'rgba(121, 47, 255, 0.15)'} />
                ))}
            </div>
        </div>
    );
};

export default PopularCourses