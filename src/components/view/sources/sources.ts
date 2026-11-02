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

        document.querySelector<HTMLElement>('.sources')!.append(fragment);
    }
}

export default Sources;
