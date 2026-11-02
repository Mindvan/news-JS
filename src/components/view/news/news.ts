import type { Article } from '../../../types/news-api';
import './news.css';

class News {
    draw(data: ReadonlyArray<Article>): void {
        const news: Article[] = data.slice(0, 10);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) throw new Error('Missing template: newsItemTemp');

        news.forEach((item: Article, idx: number): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector<HTMLElement>('.news__item')!.classList.add('alt');

            newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = item.urlToImage
                ? `url(${JSON.stringify(item.urlToImage)})`
                : 'none';
            newsClone.querySelector<HTMLElement>('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector<HTMLElement>('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector<HTMLElement>('.news__description-title')!.textContent = item.title;
            newsClone.querySelector<HTMLElement>('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector<HTMLElement>('.news__description-content')!.textContent = item.description;
            newsClone.querySelector<HTMLElement>('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector<HTMLElement>('.news')!.innerHTML = '';
        document.querySelector<HTMLElement>('.news')!.appendChild(fragment);
    }
}

export default News;
