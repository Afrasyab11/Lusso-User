export interface EndpointParam {
    [key: string]: { [key: string]: any }
}

export interface Endpoint {
    endpoint: string;
    method: string;
    params?: EndpointParam;
    payload?: any;
}