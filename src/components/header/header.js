import { DivComponent } from '../../common/divComponent.js';
import './header.css'

export class Header extends DivComponent {
	constructor(appState) {
		super();
		this.appState = appState;
	}

	render() {
		this.element.classList.add('header');
		this.element.innerHTML = `
			<a href='#'>
				<img src='/static/logo.svg' alt='logo'/>
			</a>
			<nav class='header__nav'>
				<ul class='header__list'>
					<li class='header__item header__search'>
						<a href='#' class='header__link'>Book Search</a>
					</li>
					<li class='header__item header__favorites'>
						<a href='#favorites' class='header__link'>Favorites</a>
						<span class='header__counter'>${this.appState.favorites.length}</span>
					</li>
				</ul>
			</nav>
		`;
		return this.element;
	}
}