export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name:'add',
			component:'Button',
			children:'新增计量单位',
			onClick:'{{$add}}' 
		},{
			name:'modify',
			component:'Button',
			children:'修改计量单位',
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