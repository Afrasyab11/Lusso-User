import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { checkNullOrEmpty } from '../utils/utils';

const useSearchParam = (key?: string) => {
    const location = useLocation();

    const [targetKeyValue, setTargetKeyValue] = useState(null)

    useEffect(() => {
        searchParamsKeyValue(key)
    }, [location, key])

    const searchParamsKeyValue = (key: any) => {
        if (!checkNullOrEmpty(key)) {
            const queryParams = new URLSearchParams(location.search);
            const value: any = queryParams.get(key);
            setTargetKeyValue(value)
        }
    }

    return { value: targetKeyValue, searchParam: searchParamsKeyValue }
}

export default useSearchParam;
