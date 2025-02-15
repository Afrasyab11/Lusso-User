import { API_METHOD } from "../constants/api-endpoints";
import { Endpoint } from "../type/api";
import { axiosInstance } from "./axiosInstance";

const makeApiCall = async (content: Endpoint) => {
    if (!content.endpoint) throw new Error('Invalid api call');

    let newUrl = content.endpoint;

    if (content.params) {
        if (content.params.path) {
            const pathParams = Object.entries(content.params.path).map(([key, value]) => value).join('/')
            newUrl += `/${pathParams}`;
        }
        if (content.params.query) {
            const queryParams = new URLSearchParams(content.params.query).toString();
            if (queryParams) {
                newUrl += (newUrl.includes('?') ? '&' : '?') + queryParams;
            }
        }
    }

    const instanceObj = {
        url: newUrl,
        method: content.method,
        ...(content.method !== API_METHOD.GET && { data: content.payload ?? '' })
    }
    const response = await axiosInstance(instanceObj);
    return response?.data
}

export default makeApiCall;