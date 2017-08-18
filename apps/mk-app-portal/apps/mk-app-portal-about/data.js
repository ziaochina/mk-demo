export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-portal-about',
		children: 'about'
	}
}

export function getInitState() {
	return { data: {} }
}