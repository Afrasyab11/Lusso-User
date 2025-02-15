import { useEffect, useState } from "react";
import { checkNullOrEmpty } from "../../utils/utils";

interface SearchProps {
    value?: string;
    placeholder?: string;
    data: any[];
    onSearch: (data: any, query: string) => void;
}

const Search = ({
    value,
    placeholder,
    onSearch,
    data = [],
}: SearchProps) => {

    const [query, setQuery] = useState<string>(value ?? '')
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const handleSearch = async () => {
            let arr = checkNullOrEmpty(data) ? [] : data;
            let returnArry = [];

            if (checkNullOrEmpty(debouncedQuery)) {
                onSearch(arr, debouncedQuery);
                return;
            }

            for (let item of arr) {
                let obj = JSON.stringify(item);
                if (obj.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
                    returnArry.push(JSON.parse(obj));
                }
            }

            onSearch(returnArry, debouncedQuery);
        };

        handleSearch();
    }, [debouncedQuery, data, onSearch]);

    return (
        <label className="input custom-primary-border flex items-center gap-2 bg-[#FFFFFF1A] rounded-lg px-3 py-1 w-auto lg:w-96">
            <input
                type="text"
                className="grow bg-transparent text-whifocus:outline-none"
                placeholder={placeholder ?? 'Search'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
            >
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                />
            </svg>
        </label>
    );
};

export default Search;
