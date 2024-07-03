import onChange from 'on-change';
import { View } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/cardList/cardList.js';
import { Title } from '../../components/title/title.js';

export class MainView extends View {
	state = {
		data: {},
		loading: false,
		recommended: true,
		searchQuery: '',
		limit: 32,
		offset: 0,
	};

	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.#appStateHook.bind(this));
		this.state = onChange(this.state, this.#stateHook.bind(this));
		this.setTitle('Book Search');
	}

	#appStateHook(path) {
		if (path === 'favorites') {
			this.rerender();
		}
	}

	async #stateHook(path) {
		if (path === 'searchQuery') {
			if (this.state.loading) {
				this.controller.abort();
			}

			this.state.loading = true;

			try {
				this.state.data = await this.#loadList(
					this.state.searchQuery,
					this.state.offset,
					this.state.limit,
				);

				this.state.loading = false;
			} catch (err) {
				console.error(err);
			}
		}

		if (path === 'loading') {
			this.rerender();
		}
	}

	async #loadList(query, offset, limit) {
		const params = new URLSearchParams({
			q: query,
			offset: offset,
			limit: limit,
		});

		this.controller = new AbortController();
		const request = await fetch(
			'https://openlibrary.org/search.json?' + params,
			{ signal: this.controller.signal },
		);

		return request.json();
	}

	#randomSearch() {
		const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const getRandomIndex = () => {
			return Math.floor(Math.random() * symbols.length);
		};
		this.state.searchQuery = Array(2)
			.fill('')
			.map(() => symbols[getRandomIndex()])
			.join('');
	}

	#getTitle() {
		let textTitle = `Books found – ${this.state.data.numFound}`;

		if (this.state.recommended) {
			textTitle = 'Recommended books';
		}

		if (this.state.data.numFound === 0) {
			textTitle = 'Nothing found';
		}

		if (this.state.loading) {
			textTitle = '';
		}

		return textTitle;
	}

	destroy() {
		onChange.unsubscribe(this.state);
		onChange.unsubscribe(this.appState);
	}

	rerender() {
		this.header.remove();
		this.title.remove();
		this.cardList.remove();

		this.header = new Header(this.appState).render();
		this.title = new Title(this.#getTitle()).render();
		this.cardList = new CardList(this.appState, this.state).render();

		this.appRoot.prepend(this.header);
		this.appRoot.append(this.title);
		this.appRoot.append(this.cardList);
	}

	render() {
		this.appRoot.innerHTML = '';

		this.header = new Header(this.appState).render();
		this.title = new Title(this.#getTitle()).render();
		this.cardList = new CardList(this.appState, this.state).render();

		this.appRoot.append(this.header);
		this.appRoot.append(new Search(this.state).render());
		this.appRoot.append(this.title);
		this.appRoot.append(this.cardList);

		if (!this.state.searchQuery && this.state.recommended) {
			this.#randomSearch();
		}
	}
}