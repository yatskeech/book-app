import './cardList.css';
import { DivComponent } from '../../common/divComponent.js';
import { Card } from '../card/card.js';

export class CardList extends DivComponent {
	constructor(appState, state) {
		super();
		this.appState = appState;
		this.state = state;
	}

	renderLoad() {
		this.element.innerHTML = `
				<div class='card-list__loading'>Loading...</div>	
			`;
		return this.element;
	}

	renderBooks(parentElement) {
		this.state.data.docs.forEach((book) => {
			parentElement.append(new Card(this.appState, book).render());
		});
	}

	render() {
		this.element.classList.add('card-list');
		if (this.state.loading) {
			return this.renderLoad();
		}

		if (this.state.recommended) {
			this.element.innerHTML = `
				<h1>Recommended books</h1>
				<div class='card-list__grid'></div>
			`;
			this.renderBooks(this.element.querySelector('.card-list__grid'));
			return this.element;
		}

		this.element.innerHTML = `
			<h1>Books found - ${this.state.data.numFound}</h1>	
			<div class='card-list__grid'></div>
		`;
		this.renderBooks(this.element.querySelector('.card-list__grid'));
		return this.element;
	}
}