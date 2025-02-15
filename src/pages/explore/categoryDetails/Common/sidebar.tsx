import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductListCard from '../../../../components/cards/ProductListCard';
import { getCategoryPathName } from '../../../../hooks/common.utils';
import { LineDraw } from '../GameDetailsScreen';

type RecommendedDataItem = {
    title: string;
    subtitle: string;
    image: string;
    rating: number;
};


type TrendingSidebarItem = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    rating: number;
    category: string;
    productId: string
};

type SidebarProps = {
    sidebarTitle?: string;
    trendingData: TrendingSidebarItem[];
    recommendedData: RecommendedDataItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarTitle, trendingData, recommendedData }) => {
    const navigate = useNavigate();

    const handleCardClick = (game: TrendingSidebarItem) => {
        const category = game.category

        console.log(category)

        // let categoryPath = getCategoryPathName(category)
        // console.log(categoryPath, 'categoryPath')
        // category?.toLowerCase() === 'ai' ? 'movies' :
        //     category?.toLowerCase() === 'movie' ? 'movies' :
        //         category?.toLowerCase() === 'course' ? 'courses' :
        //             category?.toLowerCase() === 'game' ? 'games' :
        //                 category?.toLowerCase() === 'service' ? 'services' :
        //                     category?.toLowerCase() === 'app' ? 'apps' : "apps"
        navigate(`/explore/${getCategoryPathName(game.category)}/details/${game.productId}`);
    };

    return (
        <div className="hidden w-full md:w-1/3 mt-8 md:mt-0 md:flex flex-col gap-10">
            <div className="bg-[#161328] py-10 px-8">
                <h2 className="text-2xl font-bold mb-4 flex gap-2 items-center">
                    {sidebarTitle ? sidebarTitle : 'PEOPLE ALSO VIEW'}
                    <ChevronRight size={25} />
                </h2>
                <LineDraw />
                <div className="mt-5 grid gap-6 md:grid-cols-1">
                    {trendingData.map((game, index) => {
                        let cat = getCategoryPathName(game.category)
                        console.log(cat, 'cat')
                        return (
                            <div
                                key={index}
                                onClick={() => navigate(`/explore/${getCategoryPathName(cat)}/details/${game.productId}`)}
                                className="cursor-pointer"
                            >
                                <ProductListCard game={game} bg="rgba(38,34,66,255)" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
