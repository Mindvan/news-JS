import type { NewsSource } from '../../../types/news-api';
import './sources.css';

class Sources {
    draw(data: ReadonlyArray<NewsSource>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null =
            document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) throw new Error('Missing template: sourceItemTemp');

        data.forEach((item: NewsSource): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            sourceClone.querySelector<HTMLElement>('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector<HTMLElement>('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const container: HTMLElement = document.querySelector<HTMLElement>('.sources')!;
        container.replaceChildren(fragment);
        const search: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#source-search');
        const emptyMessage: HTMLElement | null = document.querySelector<HTMLElement>('.sources__no-results');
        if (search) {
            search.oninput = (): void => {
                const query: string = search.value.trim().toLocaleLowerCase();
                let visibleCount: number = 0;
                container
                    .querySelectorAll<HTMLButtonElement>('.source__item')
                    .forEach((button: HTMLButtonElement): void => {
                        button.hidden = !(button.textContent ?? '').toLocaleLowerCase().includes(query);
                        if (!button.hidden) visibleCount += 1;
                    });
                if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
            };
        }
    }
}

export default Sources;
