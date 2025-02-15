import { useState } from 'react';
import filterIcon from '../../assets/images/filterIcon.svg';
import CustomDropdown from '../../components/common/CustomDropdown';
import { ICON_ENUM } from '../../constants/icons.constant';

const FilterBar = ({ sortBy, setSortBy, getExploreData, uniqueCategories, categoryType }: any) => {
    const [category, setCategory] = useState('Courses');
    const [contentType, setContentType] = useState('Free');
    const [isOpen, setIsOpen] = useState(false);
    console.log('categoryType===>', categoryType)
    const handleCategoryChange = (e: any) => {
        setCategory(e.target.value);
    };

    const handleContentTypeChange = (e: any) => {
        setContentType(e.target.value);
    };

    const CustomRadio = ({ checked, onChange, label, value }: any) => {
        return (
            <div className="flex items-center mr-3">
                <div className={`w-4 h-4 border-2 rounded-full mr-2 ${checked ? 'bg-indigo-500 border-indigo-500' : 'border-gray-500'}`}>
                    {checked && <div className="w-3 h-3 bg-[#18142E] rounded-full mx-auto"></div>}
                </div>
                <label htmlFor={value} className="text-white">{label}</label>
                <input
                    type="radio"
                    id={value}
                    name="contentType"
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="opacity-0 absolute"
                />
            </div>
        );
    };

    const resetFilter = () => {
        setCategory('Courses')
        setSortBy('rating')
        setContentType('Free')
        // getExploreData()
    }
    const options = [
        { value: 'rating', label: 'Rating' },
        { value: 'latest', label: 'Latest' },
        { value: 'topVisited', label: 'Top Visited' },
    ]

    const handleSortByChange = (selectedOption: string | number | any) => {
        setSortBy(selectedOption);
    };
    console.log("sorted by", sortBy)
    return (
        <>
            <div className='flex justify-between items-center mt-5 mb-2 md:my-2 shadow-xl md:shadow-none'>
                <div className='flex gap-2 items-center justify-start w-1/2'>
                    <div className={`${isOpen ? 'block' : 'hidden'} w-6 h-6 md:block`}>
                        <img src={filterIcon} alt='filterIcon' />
                    </div>
                    <span className='w-fit text-lg'>FILTER BY</span>
                </div>
                <button type='button' onClick={resetFilter} className='underline text-white hidden md:block hover:font-bold '>Clear All</button>
                {!isOpen ? <div onClick={() => setIsOpen(prev => !prev)} className='md:hidden w-10 h-10  bg-[#28223B] p-3 rounded-lg'>
                    <img src={filterIcon} alt='filterIcon' />
                </div> :
                    <button
                        onClick={() => setIsOpen(prev => !prev)}
                        className="md:hidden btn btn-sm btn-circle btn-ghost"
                    >
                        <img src={ICON_ENUM.CROSS.icon} className="h-4" alt="filters" />
                    </button>}
            </div>
            <div className={`${!isOpen ? 'hidden md:flex' : 'flex'} text-white md:flex-row flex-col items-center justify-between md:gap-0 gap-6 ${isOpen ? 'h-full' : 'h-0'} transition-all md:h-full ease-in-out`}>
                {/* <div className="md:hidden space-y-4 flex flex-col justify-start w-full">
                    <h2 className="text-white font-medium text-lg">Active filters</h2>
                    <div className="flex flex-wrap gap-4">
                        {["Courses", "Movie & TV"].map((filter, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-[#322781] text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-md"
                            >
                                <span>{filter}</span>
                                <button
                                    type="button"
                                    className="ml-2 w-4 h-4 flex justify-center text-xs items-center rounded-full bg-white text-[#272B63] hover:bg-gray-300"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <hr className="border-t border-gray-400 mt-4" />
                </div> */}
                <div className="flex md:flex-row flex-col md:space-x-4 md:gap-0 gap-4 w-full">
                    {/* <div className='flex flex-col gap-2 md:min-w-[200px]'>
                        <label htmlFor="category" className="mr-2">Category:</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="bg-transparent border border-[#DADADA] rounded-lg p-2 text-white px-2 py-1 placeholder:text-[#F2F2F23B]"
                        >
                            <option value="Courses">Courses</option>
                            <option value="Books">Books</option>
                            <option value="Videos">Videos</option>
                        </select>
                    </div> */}

                    <div className='flex items-start  gap-2 md:min-w-[400px]'>
                        <div className='flex flex-col gap-y-2 w-full'>
                            <label htmlFor="sortBy" className="mr-2 whitespace-nowrap">Sort By:</label>

                            <CustomDropdown
                                options={options}
                                value={sortBy}
                                onChange={handleSortByChange}
                            />
                        </div>
                        {(categoryType === "trending" || categoryType === "recommendations") && (
                            <div className='flex flex-col gap-y-2 w-full'>
                                <label htmlFor="Category" className="mr-2 whitespace-nowrap">Sorted by category:</label>

                                <CustomDropdown
                                    options={uniqueCategories}
                                    value={sortBy}
                                    onChange={handleSortByChange}
                                />
                            </div>
                        )}

                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="sortBy" className="mr-2">Content type:</label>
                        <div className="flex items-center gap-5">

                            <CustomRadio
                                checked={contentType === 'Free'}
                                onChange={handleContentTypeChange}
                                label="Free"
                                value="Free"
                            />
                            <CustomRadio
                                checked={contentType === 'Paid'}
                                onChange={handleContentTypeChange}
                                label="Paid"
                                value="Paid"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 md:justify-end '>
                    <button
                        onClick={getExploreData}
                        className="text-white px-4 py-1.5 rounded-full min-w-[150px] md:hover:font-bold font-medium"
                        style={{ background: 'linear-gradient(178deg, #4300BD -37.45%, #792FFF 29.89%, #FF77B0 115.59%)' }}>
                        APPLY
                    </button>
                    <button onClick={resetFilter} type='button'
                        className='md:hidden relative w-[150px] py-1.5 px-4 font-medium min-w-[150px] text-white'
                        style={{
                            borderRadius: 50,
                            border: '1px solid transparent',
                            backgroundImage: `linear-gradient(to right, rgb(24 20 46), rgb(24 20 46)), linear-gradient(to left, rgb(112 49 80), rgb(67, 0, 189))`,
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            backgroundPosition: 'left,right',
                            backgroundSize: '100% 100%, 100% 100%',
                            backgroundRepeat: 'no-repeat',
                            padding: '1.5px', // Adjust the padding as needed
                        }}
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterBar;