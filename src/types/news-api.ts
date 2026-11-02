export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export interface ApiResponseMap {
    sources: SourcesResponse;
    everything: ArticlesResponse;
}

export interface RequestOptions<K extends keyof ApiResponseMap> {
    endpoint: K;
    options?: Record<string, string>;
}
