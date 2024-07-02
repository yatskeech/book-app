import './title.css';
import { DivComponent } from '../../common/divComponent.js';

export class Title extends DivComponent {
	constructor(textTitle) {
		super();
		this.textTitle = textTitle;
	}

	render() {
		this.element.classList.add('title-box');
		this.element.innerHTML = `
			<h1>${this.textTitle}</h1>
		`;
		return this.element;
	}
}