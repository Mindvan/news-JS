import { HttpMethod } from '../../types/news-api';
import type { ApiResponseMap, QueryOptions, RequestOptions, ResponseCallback } from '../../types/news-api';

class Loader {
    private readonly baseLink: string;
    private readonly options: QueryOptions;

    constructor(baseLink: string, options: QueryOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<K extends keyof ApiResponseMap>(
        { endpoint, options = {} }: RequestOptions<K>,
        callback: ResponseCallback<ApiResponseMap[K]> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.Get, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: QueryOptions, endpoint: keyof ApiResponseMap): string {
        const urlOptions: QueryOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<K extends keyof ApiResponseMap>(
        method: HttpMethod,
        endpoint: K,
        callback: ResponseCallback<ApiResponseMap[K]>,
        options: QueryOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<ApiResponseMap[K]> => res.json())
            .then((data: ApiResponseMap[K]): void => callback(data))
            .catch((err: unknown): void => console.error(err));
    }
}

export default Loader;
