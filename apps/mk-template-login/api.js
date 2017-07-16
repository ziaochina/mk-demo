export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-template-login',
		children: [{
			name: 'header',
			className: 'header',
			component: 'Layout',
			children: [{
				name: 'logo',
				component: '::img',
				className: 'header-logo',
				src: '{{$getLogo()}}'
			},'Monkey King']
		}, {
			name: 'content',
			className: 'content',
			component: 'Layout',
			children: [{
				name: 'contentLeft',
				className: 'content-left',
				component: 'Layout',
			}, {
				name: 'form',
				component: 'Form',
				className:'content-form',
				children: [{
					name: 'item1',
					component: 'Form.Item',
					className: 'content-form-title',
					children: 'Login'
				}, {
					name: 'item2',
					component: 'Form.Item',
					children:[{
						name: 'user',
						component:'Input',
						placeholder:'user name',
						onChange:"{{(e)=>$setField('data.form.user', e.target.value)}}",
						value: '{{data.form.user}}',
						prefix:{
							name:'userIcon',
							component:'Icon',
							type:'user',
						}
					}]
				},{
					name: 'item3',
					component: 'Form.Item',
					children:[{
						name: 'password',
						component:'Input',
						placeholder:'password',
						type: 'password',
						onChange:"{{(e)=>$setField('data.form.password', e.target.value)}}",
						value: '{{data.form.password}}',
						prefix:{
							name:'passwordIcon',
							component:'Icon',
							type:'lock',
						}
					}]
				},{
					name: 'item4',
					component: 'Form.Item',
					children:[{
						name:'remember',
						component:'Checkbox',
						children: 'Remember me'
					},{
						name:'forgot',
						component:'::a',
						style:{float:'right'},
						children:'Forgot password'
					}]
				},{
					name:'item5',
					component:'Form.Item',
					children:[{
						name: 'loginBtn',
						component: 'Button',
						type:'primary',
						children: 'Log in',
						onClick:'{{$login}}'
					}]
				},{
					name: 'item6',
					component: 'Form.Item',
					children:[{
						name:'register',
						component:'::a',
						children:'Register now!'
					}]
				}]
			}, {
				name: 'contentRight',
				className: 'content-right',
				component: 'Layout',
			}, ]
		}, {
			name: 'footer',
			className: 'footer',
			component: 'Layout',
			children: 'copyright © 2015-2017 monkey king'
		}]
	}
}