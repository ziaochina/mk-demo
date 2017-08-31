export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-portal-about',
		children: 'about'
	}
}

export function getInitState() {
	return { data: {} }
}