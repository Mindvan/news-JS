import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { ArticlesResponse, SourcesResponse } from '../../types/news-api';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document.querySelector('.sources')?.addEventListener('click', (e: Event): void => {
            this.controller.getNews(e, (data: ArticlesResponse): void => this.view.drawNews(data));
        });
        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
