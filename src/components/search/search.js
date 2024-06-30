import './search.css';
import { DivComponent } from '../../common/divComponent.js';
import { debounce } from '../../utils/debounce.js';

export class Search extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	}

	search() {
		const searchValue = this.element.querySelector('input').value;
		this.state.recommended = !searchValue;
		this.state.searchQuery = this.state.recommended ? this.#randomSearch() : searchValue;
	}

	recommend() {
		if (!this.state.searchQuery && !this.state.recommended) {
			this.search();
		}
	}

	#randomSearch() {
		const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const getRandomIndex = () => {
			return Math.floor(Math.random() * symbols.length);
		};
		return Array(2).fill('').map(() => symbols[getRandomIndex()]).join('');
	}

	render() {
		this.element.classList.add('search');
		this.element.innerHTML = `
			<input 
				type='text' 
				placeholder='Find a book or author....' 
			/>
		`;
		const searchDebounce = debounce(this.search.bind(this), 500);
		this.element.querySelector('input')
			.addEventListener('input', searchDebounce);
		this.recommend();
		this.element.querySelector('input').value = this.state.recommended ? '' : this.state.searchQuery;
		return this.element;
	}
}