export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name: 'hello',
			component: '::h1',
			children: '{{data.content}}'
		}, {
			name: 'devtools',
			component: 'Button',
			children: 'devtools',
			type: 'primary',
			size: 'large',
			onClick: '{{$btnClick}}'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world!'
		}
	}
}