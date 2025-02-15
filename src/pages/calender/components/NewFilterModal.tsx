import {Box} from '@mantine/core';
import {useState} from 'react';
import cross from '../../../assets/icons/cross.svg';
import filter_icon from '../../../assets/images/icons/filter.svg';
import {CheckboxGroup} from './CheckboxGroup';
import {RangeSlider} from './RangeSlider';

interface NewFilterModalProps {
  opened: boolean;
  toggle: () => void;
  filters: any;
  onApplyFilters: (filters: any) => void;
}

const NewFilterModal: React.FC<NewFilterModalProps> = ({
  opened,
  toggle,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (key: string, value: any) => {
    setLocalFilters((prev: any) => ({...prev, [key]: value}));
  };

  const handleApply = () => {
    console.log('Applying Filters:', localFilters);
    onApplyFilters(localFilters);
    toggle();
  };

  const handleReset = () => {
    setLocalFilters({...filters});
    onApplyFilters(filters);
  };

  return (
    <Box
      className={`
        absolute mt-2  w-96 bg-[#2d246b] rounded-[20px] shadow-lg transition-transform duration-300 ${
        opened
          ? 'scale-100 opacity-100'
          : 'scale-95 opacity-0 pointer-events-none'
      }`}
      style={{zIndex: 10}}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img src={filter_icon} width={18} alt="Filter Icon" />
          <span className="text-md font-light uppercase">Filter By</span>
        </div>
        <div onClick={toggle} className="cursor-pointer">
          <img src={cross} alt="Close" />
        </div>
      </div>

      <div className="px-4">
        <label htmlFor="app-name" className="block capitalize text-[1rem]">
          App Name
        </label>
        <input
          type="text"
          placeholder="Top Rated"
          value={localFilters.appName || ''}
          onChange={e => handleInputChange('appName', e.target.value)}
          className="bg-transparent p-2 border border-gray-500 w-full rounded-[8px] mt-[0.5rem] text-[1rem]"
        />
      </div>

      <div className="px-4 mt-4">
        <CheckboxGroup
          options={['Active', 'Inactive']}
          selected={localFilters.status}
          onChange={(selected: any) => handleInputChange('status', selected)}
        />
      </div>

      <div className="px-4 mt-4">
        <label className="block capitalize text-[1rem]">Visitors</label>
        <RangeSlider
          min={0}
          max={3000}
          step={100}
          minValue={localFilters.visitors?.min || 0}
          maxValue={localFilters.visitors?.max || 3000}
          onChange={(min: any, max: any) =>
            handleInputChange('visitors', {min, max})
          }
        />
      </div>

      <div className="px-4 mt-12">
        <label className="block capitalize text-[1rem]">Likes</label>
        <RangeSlider
          min={0}
          max={3000}
          step={100}
          minValue={localFilters.likes?.min || 0}
          maxValue={localFilters.likes?.max || 3000}
          onChange={(min: any, max: any) =>
            handleInputChange('likes', {min, max})
          }
        />
      </div>

      <div className="w-full flex items-center gap-6 justify-center mt-[4.5rem] mb-[1rem]">
        <button
          type="button"
          className="flex items-center hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-400 hover:shadow-lg hover:text-white
 justify-center text-[1rem] py-1 px-6 gap-2.5 rounded-3xl text-white bg-gradient-vertical lg:font-bold"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="relative text-[1rem] hover:text-purple-500 hover:border-gradient-to-br hover:border-t-pink-500 hover:border-b-purple-500 hover:border-l-pink-500 hover:border-r-purple-500
 py-1 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]"
          onClick={handleReset}
        >
          Clear All
        </button>
      </div>
    </Box>
  );
};

export default NewFilterModal;
