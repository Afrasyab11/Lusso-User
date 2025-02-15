import { useDisclosure } from '@mantine/hooks';
import filter_icon from "../../../assets/images/icons/filter.svg";
import NewFilterModal from './NewFilterModal';

interface NewFilterCompsProps {
    filters: any;
    onApplyFilters: (filters: any) => void;
}

const NewFilterComps: React.FC<NewFilterCompsProps> = ({ filters, onApplyFilters }) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <div className="">
            <button
                className="flex items-center gap-2 custom-primary-border rounded-lg py-3 px-3 bg-[#FFFFFF1A]"
                onClick={toggle}
            >
                <img src={filter_icon} width={15} alt="Filter Icon" />
                <span className="text-sm font-medium">Filter</span>
            </button>

            <NewFilterModal
                opened={opened}
                toggle={toggle}
                filters={filters}
                onApplyFilters={onApplyFilters}
            />
        </div>
    );
};

export default NewFilterComps;
