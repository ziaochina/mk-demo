import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-modify-password',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'mk-app-modify-password-form',
			children: [{
				name: 'oldPasswordItem',
				component: 'Form.Item',
				className: 'mk-app-modify-password-form-oldPassword',
				validateStatus: "{{data.other.error.oldPassword?'error':'success'}}",
				help: '{{data.other.error.oldPassword}}',
				children: [{
					name: 'password',
					component: 'Input',
					value: '{{data.form.oldPassword}}',
					placeholder: "请输入旧的密码",
					type: 'password',
					onChange: `{{(e)=>$fieldChange('data.form.oldPassword',e.target.value)}}`,
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					}
				}]
			},{
				name: 'passwordItem',
				component: 'Form.Item',
				className: 'mk-app-modify-password-form-password',
				validateStatus: "{{data.other.error.password?'error':'success'}}",
				help: '{{data.other.error.password}}',
				children: [{
					name: 'password',
					component: 'Input',
					value: '{{data.form.password}}',
					placeholder: "请输入新的密码",
					type: 'password',
					onChange: `{{(e)=>$fieldChange('data.form.password',e.target.value)}}`,
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					}
				},{
					name: 'level',
					component: '::span',
					style:{color:'green'},
					children: '{{$getSecurityLevelText(data.form.password)}}'
				}]
			}, {
				name: 'confirmPasswordItem',
				component: 'Form.Item',
				className: 'mk-app-modify-password-form-confirmPassword',
				validateStatus: "{{data.other.error.confirmPassword?'error':'success'}}",
				help: '{{data.other.error.confirmPassword}}',
				children: [{
					name: 'confirmPassword',
					component: 'Input',
					value: '{{data.form.confirmPassword}}',
					placeholder: "请再次录入新密码",
					type: 'password',
					onChange: `{{(e)=>$fieldChange('data.form.confirmPassword',e.target.value)}}`,
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					}
				}]
			}]
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
				oldPassword: '',
				password: '',
				confirmPassword: '',
			},
			other: {
				error: {}
			}
		}
	}
	return state
}