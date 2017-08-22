export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name: 'hello',
			component: '::span',
			children: '{{data.content}}'
		}/*,{
			name:'ok',
			component:'::button',
			children:'OK',
			onClick:'{{$btnClick}}' //btnClick在action中声明
		}*/]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world'
		}
	}
}