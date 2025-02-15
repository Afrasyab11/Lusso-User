import { Modal } from '@mantine/core';
import { useState } from 'react';
import Input from '../../../components/ui/Input';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
    const [appName, setAppName] = useState('');
    const [visitor, setVisitor] = useState<number | undefined>();
    const [likes, setLikes] = useState<number | undefined>();
    const [status, setStatus] = useState('');

    const handleApplyFilters = () => {
        onApplyFilters({ appName, visitor, likes, status });
        onClose();
    };

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title="Filter Options"
            closeOnClickOutside={false}
            lockScroll={true}
            styles={{
                header: {
                    backgroundImage:
                        "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                    color: "#FFFFFF",
                },
                body: {
                    backgroundImage:
                        "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                    overflow: "hidden",
                    maxHeight: "90vh",
                },
            }}
            centered
        >
            <div className="space-y-4 card-bg-dev p-5">
                <h2 className="text-lg font-semibold text-white">Apply Filters</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Input
                            label="App Name"
                            name="appName"
                            borderColor="#6C8CFF80"
                            value={appName || ''}
                            onChange={(e: any) => setAppName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            label="Visitor"
                            name="address"
                            borderColor="#6C8CFF80"
                            value={visitor || ''}
                            onChange={(e: any) => setVisitor(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            label="Likes"
                            name="likes"
                            borderColor="#6C8CFF80"
                            value={likes || ''}
                            onChange={(e: any) => setLikes(Number(e.target.value))}
                            required
                        />
                    </div>
                    {/* <div>
                        <label className="text-sm text-white">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                        >
                            <option value="">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div> */}
                </div>
                <button
                    className="w-full mt-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </button>
            </div>
        </Modal>
    );
};

export default FilterModal;
