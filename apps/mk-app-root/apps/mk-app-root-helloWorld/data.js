export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name: 'about',
			component: '::a',
			children: 'about',
			style: { fontSize: 16, margin: 30 },
			onClick: '{{$handleAboutClick}}'
		}, {
			name: 'hello',
			component: '::a',
			children: 'hello world',
			style: { fontSize: 16, margin: 30 },
			onClick: '{{$handleHelloClick}}'
		}, {
			name: 'content',
			component: '::div',
			style: { fontSize: 16, margin: 30 },
			children: 'hello world'
		}]
	}
}

export function getInitState() {
	return { data: {} }
}