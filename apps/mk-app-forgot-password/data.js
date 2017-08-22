import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-forgot-password',
		children: [{
			name: 'header',
			className: 'mk-app-forgot-password-header',
			component: 'Layout',
			children: [{
				name: 'logo',
				component: '::img',
				className: 'mk-app-forgot-password-header-logo',
				src: '{{$getLogo()}}'
			}, 'Monkey King']
		}, {
			name: 'form',
			component: 'Form',
			className: 'mk-app-forgot-password-form',
			children: [{
				name: 'titleItem',
				component: 'Form.Item',
				className: 'mk-app-forgot-password-form-title',
				children: "{{data.other.step==1?'安全验证':'重设密码'}}"
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				className: 'mk-app-forgot-password-form-mobile',
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				help: '{{data.other.error.mobile}}',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'mobile',
					component: 'Input',
					value: '{{data.form.mobile}}',
					placeholder: "请输入您的手机号",
					onChange: `{{(e)=>$fieldChange('data.form.mobile',e.target.value)}}`,
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
			}, {
				name: 'captchaItem',
				component: 'Form.Item',
				className: 'mk-app-forgot-password-form-captcha',
				validateStatus: "{{data.other.error.captcha?'error':'success'}}",
				help: '{{data.other.error.captcha}}',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'captcha',
					component: 'Input',
					value: '{{data.form.captcha}}',
					placeholder: "请输入您收到的验证吗",
					type: 'captcha',
					onChange: "{{(e)=>$fieldChange('data.form.captcha',e.target.value)}}",
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					},
					addonAfter: {
						name: 'suffix',
						component: 'Button',
						disabled: '{{!data.form.mobile || !!data.other.error.mobile }}',
						onClick: '{{$getCaptcha}}',
						children: '获取验证码'
					}
				}]
			}, {
				name: 'nextItem',
				className: 'mk-app-forgot-password-form-next',
				component: 'Form.Item',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'next',
					component: 'Button',
					type: 'softly',
					children: '下一步',
					onClick: '{{$next}}'
				}]
			}, {
				name: 'passwordItem',
				component: 'Form.Item',
				className: 'mk-app-forgot-password-form-password',
				validateStatus: "{{data.other.error.password?'error':'success'}}",
				help: '{{data.other.error.password}}',
				_visible: '{{data.other.step==2}}',
				children: [{
					name: 'password',
					component: 'Input',
					value: '{{data.form.password}}',
					placeholder: "请输入您的密码",
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
				}]
			}, {
				name: 'confirmPasswordItem',
				component: 'Form.Item',
				className: 'mk-app-forgot-password-form-confirmPassword',
				validateStatus: "{{data.other.error.confirmPassword?'error':'success'}}",
				help: '{{data.other.error.confirmPassword}}',
				_visible: '{{data.other.step==2}}',
				children: [{
					name: 'confirmPassword',
					component: 'Input',
					value: '{{data.form.confirmPassword}}',
					placeholder: "请再次录入密码",
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
			}, {
				name: 'modifyItem',
				className: 'mk-app-forgot-password-form-modify',
				component: 'Form.Item',
				_visible: '{{data.other.step==2}}',
				children: [{
					name: 'modify',
					component: 'Button',
					type: 'softly',
					children: '确认修改',
					onClick: '{{$modify}}'
				}]
			}, {
				name: 'loginItem',
				component: 'Form.Item',
				children: [{
					name: 'prev',
					component: '::a',
					children: '上一步',
					onClick: '{{$prev}}',
					_visible: '{{data.other.step==2}}'
				},{
					name: 'login',
					component: '::a',
					style: { float: 'right' },
					children: '返回登录',
					onClick: '{{$goLogin}}'
				}]
			}]
		}, {
			name: 'footer',
			className: 'mk-app-forgot-password-footer',
			component: 'Layout',
			children: 'copyright © 2015-2017 Monkey King'
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
				mobile: '',
				password: '',
				confirmPassword: '',
				captcha: ''
			},
			other: {
				step: 1,
				error: {}
			}
		}
	}
	return state
}