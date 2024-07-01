import './card.css';
import { DivComponent } from '../../common/divComponent.js';

export class Card extends DivComponent {
	constructor(appState, cardState) {
		super();
		this.appState = appState;
		this.cardState = cardState;
	}

	render() {
		const shortString = (string, length) => {
			if (string.length < length) {
				return string;
			}

			return string.slice(0, length) + '...';
		}
		const isFavorite = this.appState.favorites.find(x => x.key === this.cardState.key);
		this.element.classList.add('card');
		this.element.innerHTML = `
			<div class='card__img-box'>
				<img src='https://covers.openlibrary.org/b/olid/${this.cardState.edition_key?.[0]}-M.jpg' alt=''>
			</div>
			<div class='card__content'>
				<div class='card__content-info'>
					<span class='card__info-tag'>${shortString(this.cardState.subject?.slice(0, 2).join(', ') ?? 'Unknown genre', 28)}</span>
					<h2 class='card__info-title'>${shortString(this.cardState.title, 28)}</h2>
					<span class='card__info-author'>${shortString(this.cardState.author_name?.slice(0, 2).join(', ') ?? 'Unknown author', 24)}</span>
				</div>
				<button class='card__btn ${isFavorite ? 'card__btn_favorite' : ''}'>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 5.00001C5 4.07954 5.74619 3.33334 6.66667 3.33334H13.3333C14.2538 3.33334 15 4.07954 15 5.00001V17.5L10 12.5L5 17.5V5.00001Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		`;
		this.element.querySelector('button').addEventListener('click', () => {
			if (isFavorite) {
				this.appState.favorites = this.appState.favorites.filter(x => x.key !== this.cardState.key);
			} else {
				this.appState.favorites.push(this.cardState);
			}

			this.render();
		});
		return this.element;
	}
}