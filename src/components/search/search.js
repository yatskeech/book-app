import './search.css';
import { DivComponent } from '../../common/divComponent.js';
import { debounce } from '../../utils/debounce.js';

export class Search extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	}

	search() {
		this.state.searchQuery = this.element.querySelector('input').value;
		this.state.recommended = !this.state.searchQuery;
	}

	render() {
		this.element.classList.add('search');
		this.element.innerHTML = `
			<input 
				type='text' 
				placeholder='Find a book or author....' 
				value='${this.state.recommended ? '' : this.state.searchQuery}'
			/>
		`;

		const searchDebounce = debounce(this.search.bind(this), 1000);
		this.element.querySelector('input')
			.addEventListener('input', searchDebounce);
		return this.element;
	}
}