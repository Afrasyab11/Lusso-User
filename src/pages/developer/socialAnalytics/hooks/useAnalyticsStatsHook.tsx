import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useTimeZone } from "../../../../redux/hooks";
import { fetchsocialAnalyticsData, resetAnalyticsState } from "../../../../redux/socialAnalytics/socialAnalyticSlice";
import { formatDate } from "../../../../utils/utils";

interface endpointInterface {
    [key: string]: any
}

const useAnalyticsStatsHook = (endpoint: endpointInterface | any, data: any, dependencyArr: any[] = [], connected: boolean = false) => {
    const dispatch = useAppDispatch();
    const timeZone = useTimeZone();

    const { loading, error, socialAnalytics } = useAppSelector(
        state => state?.socialAnalytics,
    );

    useEffect(() => {
        statsCall(endpoint, data)
    }, [...dependencyArr, timeZone, connected]);

    const statsCall = (apiEndpoint: endpointInterface | any, data: any) => {
        dispatch(resetAnalyticsState())
        if (data.startDate && data.endDate && timeZone && connected) {
            let statsPayload = { ...apiEndpoint };
            statsPayload.params.query.timezone = timeZone;
            statsPayload.params.query.fromDate =
                formatDate(data.startDate as Date) + 'T00:00:00';
            statsPayload.params.query.toDate =
                formatDate(data.endDate as Date) + 'T23:59:59';

            dispatch(fetchsocialAnalyticsData(statsPayload));
        }
    }

    return { loading, error, socialAnalytics, getStats: statsCall, timeZone }
}

export default useAnalyticsStatsHook;