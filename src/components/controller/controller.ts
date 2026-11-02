import type { SourcesResponse, ArticlesResponse, ResponseCallback } from '../../types/news-api';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: ResponseCallback<ArticlesResponse>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        if (!(target instanceof Element) || !(newsContainer instanceof Element)) return;

        while (target instanceof Element && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId === null) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    newsContainer
                        .querySelectorAll<HTMLButtonElement>('.source__item')
                        .forEach((button: HTMLButtonElement): void => {
                            button.setAttribute('aria-pressed', String(button.dataset.sourceId === sourceId));
                        });
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
