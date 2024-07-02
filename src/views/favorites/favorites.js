import { View } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import { CardList } from '../../components/cardList/cardList.js';
import { Title } from '../../components/title/title.js';
import onChange from 'on-change';

export class FavoritesView extends View {
	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.#appStateHook.bind(this));
		this.setTitle('Favorites');
	}

	#appStateHook(path) {
		if (path === 'favorites') {
			this.render();
		}
	}

	destroy() {
		onChange.unsubscribe(this.appState);
	}

	render() {
		this.appRoot.innerHTML = '';

		this.appRoot.append(new Header(this.appState).render());
		this.appRoot.append(new Title('Favorite books').render());
		this.appRoot.append(new CardList(this.appState,
			{ data: { docs: this.appState.favorites } },
		).render());
	}
}