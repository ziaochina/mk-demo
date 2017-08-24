export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-modify-password-test',
		children: [{
			name:'showModifyPassword',
			component:'Button',
			type: 'primary',
			children:'修改密码',
			onClick:'{{$btnClick}}' 
		},{
			name: 'help',
			component: '::div',
			children:'测试程序的旧密码是:1 '
		}]
	}
}

export function getInitState() {
	return {
		data: {
		
		}
	}
}