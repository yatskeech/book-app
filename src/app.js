import { MainView } from './views/main/main.js';
import { FavoritesView } from './views/favorites/favorites.js';

class App {
	#currentView;
	#routes = [
		{ hash: '', view: MainView },
		{ hash: '#favorites', view: FavoritesView },
	];

	appState = {
		favorites: [],
	};

	constructor() {
		window.addEventListener('hashchange', this.route.bind(this));
		this.route();
	}

	route() {
		if (this.#currentView) {
			this.#currentView.destroy();
		}

		const route = this.#routes.find(route => route.hash === location.hash);
		const view = new route.view(this.appState);
		this.#currentView = view;
		view.render();
	}
}

new App();