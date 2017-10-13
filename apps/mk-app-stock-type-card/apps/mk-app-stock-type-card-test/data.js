export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name:'add',
			component:'Button',
			children:'新增存货类型',
			onClick:'{{$add}}' 
		},{
			name:'modify',
			component:'Button',
			children:'修改存货类型',
			onClick:'{{$modify}}' 
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world'
		}
	}
}