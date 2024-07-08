import onChange from 'on-change';
import { View } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/cardList/cardList.js';
import { Title } from '../../components/title/title.js';
import { Pagination } from '../../components/pagination/pagination';

export class MainView extends View {
	state = {
		data: {},
		loading: false,
		searchQuery: '',
		limit: 32,
		page: 1,
	};

	constructor(appState) {
		super();
		this.appState = onChange(appState, this.#appStateHook.bind(this));
		this.state = onChange(this.state, this.#stateHook.bind(this));
		this.setTitle('Book Search');
	}

	#appStateHook(path) {
		if (path === 'favorites') {
			this.rerender();
		}
	}

	async #stateHook(path) {
		if (path === 'searchQuery' || path === 'page') {
			if (this.state.loading) {
				this.controller.abort();
			}

			if (path === 'searchQuery') {
				this.state.page = 1;
			}

			this.state.loading = true;

			try {
				this.state.data = await this.#loadList(
					this.state.searchQuery || this.#randomSearch(),
					this.state.limit,
					this.state.page,
				);

				this.state.loading = false;
			} catch (e) {
				console.error(e);
			}
		}

		if (path === 'loading') {
			this.rerender();
		}
	}

	async #loadList(query, limit, page) {
		const params = new URLSearchParams({
			q: query,
			limit: limit,
			page: page,
		});

		this.controller = new AbortController();
		try {
			const request = await fetch(
				'https://openlibrary.org/search.json?' + params,
				{ signal: this.controller.signal },
			);
			return request.json();
		} catch (e) {
			console.error(e);
			return {};
		}
	}

	#randomSearch() {
		const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const getRandomIndex = () => {
			return Math.floor(Math.random() * symbols.length);
		};
		return Array(2)
			.fill('')
			.map(() => symbols[getRandomIndex()])
			.join('');
	}

	#getTitle() {
		let textTitle = `Error`;

		const numFound = this.state.data.numFound;

		if (numFound) {
			textTitle = `Books found – ${numFound}`;
		}

		if (!this.state.searchQuery) {
			textTitle = 'Recommended books';
		}

		if (numFound === 0) {
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
		this.pagination?.remove();

		this.header = new Header(this.appState).render();
		this.title = new Title(this.#getTitle()).render();
		this.cardList = new CardList(this.appState, this.state).render();

		this.appRoot.prepend(this.header);
		this.appRoot.append(this.title);
		this.appRoot.append(this.cardList);

		if (this.state.searchQuery && !this.state.loading) {
			this.pagination = new Pagination(this.state).render();
			this.appRoot.append(this.pagination);
		}
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

		this.#stateHook('searchQuery');
	}
}