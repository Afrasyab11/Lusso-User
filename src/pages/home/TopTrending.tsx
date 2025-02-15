import React from 'react';
import GameCard from '../../components/cards/GameCard';
import TitleBar from '../../components/common/TitleBar';

const games = [
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

const TopTrending: React.FC = () => {
    return (
        <div className="">
            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 8 }}>
                <h2 className="category-title mb-5">{'TOP TRENDING'}</h2>
                <div>
                    <img src={ArrowIcon} alt='' style={{ width: 20, height: 20, marginTop: 7 }} />
                </div>
            </div> */}
            <TitleBar title={'Top Trending'} isLeft={true} />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {games.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>
        </div>
    );
};

export default TopTrending