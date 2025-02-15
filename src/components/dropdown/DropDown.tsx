import { MutableRefObject, useEffect, useRef, useState } from "react";

interface DropDownProps {
    label?: string;
    options: string[];
    onSelect?: (option: string) => void;
    width?: string;
    height?: string;
    padding?: string;
    customStyles?: string;
    dropdownStyles?: string;
    optionStyles?: string;
    isSubcategory?: boolean;
    dropdownId?: any;
    value?: any,
    notAbsolute?: boolean
    required?: boolean
    noCustom?: any
}

const DropDownx: React.FC<DropDownProps> = ({
    label,
    options,
    onSelect,
    width = "w-64",
    height = "",
    padding = "py-3 px-5",
    customStyles = "",
    dropdownStyles = "",
    optionStyles = "",
    isSubcategory = false,
    dropdownId,
    value,
    notAbsolute,
    required,
    noCustom
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0] || "Select");
    const [isAddingCustomField, setIsAddingCustomField] = useState(false);
    const [customFieldValue, setCustomFieldValue] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const targetDropdownRef = useRef<number | null>(null) as MutableRefObject<number | null>;

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };
    
    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };
    
    

const handleClickOutside = (event: MouseEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
        setIsAddingCustomField(false);
    }
};

    

    // Handle custom field selection logic
    const handleCustomField = () => {
        setIsAddingCustomField(true);
    };

    const handleAddCustomField = () => {
        if (customFieldValue) {
            setSelected(customFieldValue);
            if (onSelect) onSelect(customFieldValue);
            setIsAddingCustomField(false);
            setIsOpen(false);
            setCustomFieldValue(""); // Reset custom field input
        }
    };

    // Reset the selected option whenever the options change (or the key prop changes)
    useEffect(() => {
        if (isSubcategory) {
            setSelected(options[0] || "Select");
        }
    }, [options]);
    useEffect(() => {
        if (value) {
            setSelected(value);
        } else {
            setSelected(options[0] || "Select");
        }
    }, [value, options]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative inline-block ${width} ${customStyles} dropdown-${dropdownId}`} ref={dropdownRef}>
            {label && <label className="block mb-3 text-white">{label} {required &&   <span className="text-red-500 ml-1">*</span>}</label>}
            <div
                onClick={toggleDropdown}
                className={`flex justify-between items-center border-2 border-[#5721B9] text-white bg-[#04040433] px-5 py-3 rounded-full cursor-pointer`}
            >
                <span>{selected}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div
                    className={`${notAbsolute ? "" : "absolue"} w-full mt-3 text-white rounded-lg border-2 border-[#5721B9] shadow-lg ${dropdownStyles} flex flex-col overflow-y-auto ${height}`}
                    style={{
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none", // For IE and Edge
                        maxHeight: '9rem', // Approximate height for 3 options
                        overflowY: 'auto', // Scroll when more than 3 items
                        zIndex: 1
                    }}
                >
                    {options?.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className={`py-3 px-5 border-b border-[#5721B9] bg-[#290172] last:border-none  cursor-pointer ${optionStyles}`}
                        >
                            {option}
                        </div>
                    ))}

                    {/* Add Custom Field with the same styles */}
                    {!noCustom && (
                        (!isAddingCustomField ? (
                            <div
                                onClick={handleCustomField}
                                className={`py-3 px-5 border-b border-[#5721B9] bg-[#290172] last:border-none cursor-pointer ${optionStyles}`}
                            >
                                + Add Custom Field
                            </div>
                        ) : (
                            <div className="flex items-center py-3 px-5 border-b border-[#5721B9] bg-[#290172] rounded-lg">
                                <input
                                    type="text"
                                    value={customFieldValue}
                                    onChange={(e) => setCustomFieldValue(e.target.value)}
                                    className="bg-transparent text-white w-full focus:outline-none border-none"
                                    placeholder="Enter custom field"
                                />
                                <button
                                    onClick={handleAddCustomField}
                                    className="ml-3 px-3 py-1 bg-[#5721B9] text-white"
                                >
                                    Add
                                </button>
                            </div>
                        ))
                    )}

                </div>
            )}
        </div>
    );
};

export default DropDownx;
