import type { SourcesResponse, ArticlesResponse, Article, NewsSource } from '../../types/news-api';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ArticlesResponse): void {
        const values: Article[] = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values: NewsSource[] = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
