import axios from 'axios';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import Dropdown from '../../components/ui/Dropdown';
import { ICON_ENUM } from '../../constants/icons.constant';
import { getCookies } from '../../utils/utils';

interface SortOption {
    value: string;
    label: string;
}

type OptionType = {
    value: string;
    label: string;
};

type SingleValue<T> = T | null;
interface FilterExploreProps {
    onApplyFilter?: (data: any[]) => void; // Replace `any[]` with the specific type of your data array, if available.
}

function FilterExplore({ onApplyFilter }: FilterExploreProps) {
    // Existing code remains the same.


    const [filterModal, setFilterModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [exploreData, setExploreData] = useState([]);
    const [sortOptions, setSortOptions] = useState<SortOption[]>([
        { value: 'rating', label: 'Top Rating' },
        { value: 'latest', label: 'Latest' },
        { value: 'topVisited', label: 'Top Visited' },
    ]);
    const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([
        { value: 'Course', label: 'Courses' },
        { value: 'Game', label: 'Games' },
        { value: 'Movie', label: 'Movie & TV' },
        { value: 'Service', label: 'Services' },
    ]);
    const [selectedCategory, setSelectedCategory] = useState<SingleValue<OptionType>>(null);


    const [error, setError] = useState(null);

    const getExploreData = (categoryValue: string) => {
        setLoading(true);
        // &category=${categoryValue}
        const token = getCookies('authToken');
        axios
            .get(`https://api.lusso.dev/api/v1/products?page=0&size=10&sortBy=${categoryValue}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setExploreData(response.data);
                if (onApplyFilter) {
                    onApplyFilter(response.data.products);
                }
                setSortOptions([
                    { value: 'rating', label: 'Top Rating' },
                    { value: 'latest', label: 'Latest' },
                    { value: 'topVisited', label: 'Top Visited' },
                ]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    };

    const handleApply = () => {
        if (selectedCategory) {
            getExploreData(selectedCategory.value);
        }
        setFilterModal(false);
    };



    const handleCategoryChange = (newValue: SingleValue<OptionType>) => {
        if (newValue) {
            setSelectedCategory(newValue);
        }
    };



    return (
        <>
            <div className="flex items-center justify-end pr-4">
                {
                }
                <button
                    className="flex items-center border-[1px] rounded py-2 pl-2 pr-2 md:py-2  md:pl-1.5 md:pr-10 bg-[#FFFFFF0F] space-x-2 justify-center"
                    onClick={() => setFilterModal(!filterModal)}
                >
                    <img src={ICON_ENUM.FILTER.icon} className="h-4" alt="filters" /> { }
                    <div className="hidden md:flex text-white items-center"> { }
                        Filter
                    </div>
                </button>




                <dialog className="modal" open={filterModal}>
                    <div className="modal-box bg-blurred-new rounded-none text-white py-12 max-h-[calc(90vh-5em)] h-full">
                        <form method="dialog">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={ICON_ENUM.FILTER.icon}
                                        className="h-5"
                                        alt="filters"
                                    />
                                    <h1 className="text-2xl" style={{ textWrap: 'nowrap' }}>FILTER BY</h1>
                                </div>
                                <button
                                    className="btn btn-sm btn-circle btn-ghost"
                                    onClick={() => setFilterModal(false)}
                                >
                                    <img src={ICON_ENUM.CROSS.icon} className="h-5" alt="close" />
                                </button>
                            </div>
                        </form>
                        <div className="space-y-5 my-5">
                            <div className="flex flex-col gap-5 pb-5 border-b-[1px]">
                                <h3 className="text-lg">Active filters</h3>
                                {/* <div className="flex items-center gap-2 flex-wrap">
                                    <Badge rounded="full" bgColorEnumKey="FILTER_BADGE">
                                        <div className="flex items-center gap-2">
                                            <span style={{ whiteSpace: 'nowrap' }}>
                                                {selectedCategory ? selectedCategory.label : 'No category selected'}
                                            </span>
                                            <img
                                                src={ICON_ENUM.FILL_CIRCLE_X.icon}
                                                className="h-3"
                                                alt="cancel"
                                            />
                                        </div>

                                    </Badge>
                                    { }
                                </div> */}
                            </div>
                            {/* <Dropdown
                                label="Sort By"
                                borderColor="#ffff"
                                borderRadius={10}
                                options={sortOptions}
                                
                            /> */}
                            <Dropdown
                                label="Sort By"
                                borderColor="#ffff"
                                borderRadius={10}
                                options={sortOptions}
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                            />
                            {/* <Radio
                                label="Content Type"
                                options={[
                                    { label: 'Free', value: 'free' },
                                    { label: 'Paid', value: 'paid' },
                                ]}
                            />  */}
                        </div>
                        <div className="flex justify-between gap-5 mt-10">
                            <Button
                                label="Apply"
                                className="bg-gradient-vertical font-bold w-full"
                                onClick={handleApply}
                            />
                            <Button
                                type='custom'
                                className="bg-gradient-vertical p-[1px] w-full"
                                onClick={() => setExploreData([])}
                            >
                                <div className="py-2 font-bold rounded-full text-white planCard-price-bg">Clear All</div>
                            </Button>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default FilterExplore;
