export class View {
	constructor() {
		this.appRoot = document.getElementById('root');
	}

	setTitle(title) {
		document.title = title;
	}

	render() {
		return;
	}

	destroy() {
		return;
	}
}