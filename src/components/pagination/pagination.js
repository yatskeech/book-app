import './pagination.css';
import { DivComponent } from '../../common/divComponent.js';

export class Pagination extends DivComponent {
	constructor(state) {
		super();
		this.PAGE_VISIBLE = 9;
		this.state = state;
	}

	render() {
		this.element.classList.add('pagination');
		const pagesList = document.createElement('ul');
		pagesList.classList.add('pagination__list');
		this.element.append(pagesList);

		let startPage;
		let currentPage = this.state.page;
		const allPages = Math.ceil(this.state.data.numFound / this.state.limit);

		if (allPages > this.PAGE_VISIBLE && currentPage > this.PAGE_VISIBLE / 1.5) {
			pagesList.innerHTML += `
				<li class='pagination__item'>
					<button data-page='1'>1</button>
				</li>
				<li class='pagination__item more'>...</li>
			`;
			startPage = currentPage - Math.floor(this.PAGE_VISIBLE / 2);
		}

		if (allPages < this.PAGE_VISIBLE || (allPages > this.PAGE_VISIBLE &&
			currentPage <= this.PAGE_VISIBLE / 1.5)) {
			startPage = 1;
		}

		if (allPages > this.PAGE_VISIBLE && currentPage > allPages - this.PAGE_VISIBLE / 1.5) {
			startPage = allPages - this.PAGE_VISIBLE + 1;
		}

		for (let i = startPage; i < this.PAGE_VISIBLE + startPage && i <= allPages; i++) {
			pagesList.innerHTML += `
				<li class='pagination__item'>
					<button data-page='${i}' ${i === currentPage ? `class='active'` : ''}>${i}</button>
				</li>
			`;
		}

		if (allPages > this.PAGE_VISIBLE && currentPage <= allPages - this.PAGE_VISIBLE / 1.5) {
			pagesList.innerHTML += `
				<li class='pagination__item more'>...</li>
				<li class='pagination__item'>
					<button data-page='${allPages}'>${allPages}</button>
				</li>
			`;
		}

		this.element.addEventListener('click', (event) => {
			if (event.target.tagName === 'BUTTON') {
				this.state.page = +event.target.dataset.page;
			}
		})

		return this.element;
	}
}