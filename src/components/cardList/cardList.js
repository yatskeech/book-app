import './cardList.css';
import { DivComponent } from '../../common/divComponent.js';
import { Card } from '../card/card.js';

export class CardList extends DivComponent {
	constructor(appState, state) {
		super();
		this.appState = appState;
		this.state = state;
	}

	render() {
		this.element.classList.add('card-list');
		if (this.state.loading) {
			this.element.innerHTML = `
				<div class='card-list__info'>Loading...</div>	
			`;
			return this.element;
		}

		if (!this.state.data.docs?.length) {
			this.element.innerHTML = `
				<div class='card-list__info'>No matching books</div>	
			`;
			return this.element;
		}

		this.state.data.docs.forEach((book) => {
			this.element.append(new Card(this.appState, book).render());
		});

		return this.element;
	}
}