import './search.css';
import { DivComponent } from '../../common/divComponent';

export class Search extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	}

	render() {
		this.element.classList.add('search');
		this.element.innerHTML = `
			<input 
				type='text' 
				placeholder='Find a book or author....' 
				value='${this.state.searchQuery ?? ""}'
			/>
		`;
		return this.element;
	}
}