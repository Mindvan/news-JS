import type { ApiResponseMap, RequestOptions } from '../../types/news-api';

class Loader {
    private baseLink: string;
    private options: Record<string, string>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<K extends keyof ApiResponseMap>(
        { endpoint, options = {} }: RequestOptions<K>,
        callback: (data: ApiResponseMap[K]) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<K extends keyof ApiResponseMap>(
        method: string,
        endpoint: K,
        callback: (data: ApiResponseMap[K]) => void,
        options: Record<string, string> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<ApiResponseMap[K]> => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
