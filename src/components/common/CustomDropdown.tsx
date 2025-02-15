import React, { useEffect, useRef, useState } from "react";

interface Option {
    label: string;
    value: string | number;
}

interface CustomDropdownProps {
    options: Option[];
    value: string | number;
    onChange: (value: string | number) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (optionValue: string | number) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative inline-block w-full" ref={dropdownRef}>
            {/* Trigger */}
            <div
                className="bg-transparent border border-[#DADADA] placeholder:text-[#49465A] text-white px-2 py-1 rounded-lg cursor-pointer"
                onClick={toggleDropdown}
            >
                {options.find((option) => option.value === value)?.label || "Select"}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute mt-1 bg-gray-800 rounded-lg shadow-lg z-40 w-full">
                    {options?.map((option) => (
                        <div
                            key={option.value}
                            className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
