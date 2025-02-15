import GameCard from '../../components/cards/GameCard';

export const games = [
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

const TopTrending: any = ({ isVertical = true }: { isVertical?: boolean }) => {
    return (
        <div className="p-3 rounded-2xl" style={{ background: 'var(--gradient7, linear-gradient(125deg, rgba(45, 36, 108, 0.90) 6.52%, rgba(22, 19, 43, 0.50) 30.66%, rgba(24, 20, 46, 0.50) 63.49%, rgba(37, 32, 74, 0.90) 78.95%))' }}>
            <div className='mx-5 mt-5 flex justify-between items-center'>
                <h2 className="text-2xl mb-5 text-[#00F0FB] flex items-center font-semibold">
                    <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path d="M22.9862 19.4173C22.7269 20.8657 22.0301 22.1998 20.9896 23.2402C19.949 24.2805 18.6147 24.9771 17.1663 25.236C17.1113 25.2449 17.0557 25.2495 17 25.2498C16.7492 25.2497 16.5075 25.1554 16.323 24.9855C16.1384 24.8156 16.0245 24.5826 16.0037 24.3326C15.9829 24.0826 16.0569 23.834 16.2108 23.6359C16.3648 23.4379 16.5876 23.305 16.835 23.2635C18.9062 22.9148 20.6637 21.1573 21.015 19.0823C21.0594 18.8207 21.2059 18.5875 21.4223 18.434C21.6387 18.2804 21.9072 18.2191 22.1688 18.2635C22.4303 18.308 22.6635 18.4545 22.8171 18.6709C22.9706 18.8872 23.0319 19.1557 22.9875 19.4173H22.9862ZM27 18.2498C27 21.1672 25.8411 23.9651 23.7782 26.028C21.7153 28.0909 18.9174 29.2498 16 29.2498C13.0826 29.2498 10.2847 28.0909 8.22183 26.028C6.15893 23.9651 5 21.1672 5 18.2498C5 14.7598 6.375 11.191 9.0825 7.64355C9.1682 7.53122 9.27674 7.43833 9.40095 7.37099C9.52516 7.30365 9.66223 7.26341 9.80313 7.25289C9.94403 7.24238 10.0856 7.26185 10.2184 7.31001C10.3512 7.35817 10.4723 7.43393 10.5737 7.5323L13.5887 10.4585L16.3388 2.9073C16.3937 2.75669 16.484 2.6215 16.6022 2.51312C16.7203 2.40474 16.8628 2.32636 17.0175 2.28457C17.1723 2.24278 17.3349 2.23882 17.4915 2.27301C17.6481 2.30721 17.7942 2.37856 17.9175 2.48105C20.6512 4.7498 27 10.8185 27 18.2498ZM25 18.2498C25 12.4885 20.5262 7.5098 17.7237 4.95855L14.94 12.5923C14.8829 12.7491 14.7874 12.8891 14.6623 12.9995C14.5372 13.11 14.3865 13.1874 14.2238 13.2247C14.0612 13.2619 13.8918 13.2579 13.7311 13.213C13.5704 13.168 13.4235 13.0836 13.3038 12.9673L10.0075 9.7698C8.01125 12.651 7 15.4998 7 18.2498C7 20.6367 7.94821 22.9259 9.63604 24.6138C11.3239 26.3016 13.6131 27.2498 16 27.2498C18.3869 27.2498 20.6761 26.3016 22.364 24.6138C24.0518 22.9259 25 20.6367 25 18.2498Z" fill="#00FFFF" />
                    </svg>
                    {'TOP TRENDING'}
                </h2>
                <button className='text-[#0FF] text-lg font-medium underline'>View All</button>
            </div>
            <div className={`mx-4 mt-5 grid gap-6 ${isVertical ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-1'} `}>
                {games.map((game, index) => (
                    <GameCard key={index} game={game} bg={'rgba(121, 47, 255, 0.15)'} />
                ))}
            </div>
        </div>
    );
};

export default TopTrending