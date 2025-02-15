import { useEffect, useState } from 'react';

const usePreviousRoute = () => {
    const [previousRoute, setPreviousRoute] = useState<string | null>(null);

    useEffect(() => {
        const referrer = document.referrer;
        if (referrer) {
            setPreviousRoute(referrer);
            console.log((referrer));

        } else {
            setPreviousRoute(null);
        }
    }, []);

    return previousRoute
}

export default usePreviousRoute;
