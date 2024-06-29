export function debounce(callback, time) {
	let timerId = null;

	return function(...args) {
		if (timerId) {
			clearTimeout(timerId);
		}

		timerId = setTimeout(() => {
			callback(...args);
			timerId = null;
		}, time);
	};
}