import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTimeZone = () => {
    const [timeZone, setTimeZone] = useState('');

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimeZone(userTimeZone);
    }, []);

    return timeZone;
};
export const useCurrentOrigin = () => {
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        const { protocol, hostname, port } = window.location;
        setBaseUrl(`${protocol}//${hostname}${port ? ':' + port : ''}`);
    }, []);

    return baseUrl;
};
