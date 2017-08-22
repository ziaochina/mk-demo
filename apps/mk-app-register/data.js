import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-register',
		children: [{
			name: 'header',
			className: 'mk-app-register-header',
			component: 'Layout',
			children: [{
				name: 'logo',
				component: '::img',
				className: 'mk-app-register-header-logo',
				src: '{{$getLogo()}}'
			}, 'Monkey King']
		}, {
			name: 'form',
			component: 'Form',
			className: 'mk-app-register-form',
			children: [{
				name: 'titleItem',
				component: 'Form.Item',
				className: 'mk-app-register-form-title',
				children: '注册'
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				className: 'mk-app-register-form-mobile',
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				help: '{{data.other.error.mobile}}',
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
				name: 'passwordItem',
				component: 'Form.Item',
				className: 'mk-app-register-form-password',
				validateStatus: "{{data.other.error.password?'error':'success'}}",
				help: '{{data.other.error.password}}',
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
				name: 'captchaItem',
				component: 'Form.Item',
				className: 'mk-app-register-form-captcha',
				validateStatus: "{{data.other.error.captcha?'error':'success'}}",
				help: '{{data.other.error.captcha}}',
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
				name: 'registerItem',
				className: 'mk-app-register-form-register',
				component: 'Form.Item',
				children: [{
					name: 'register',
					component: 'Button',
					type: 'softly',
					disabled: '{{data.form.agree != true}}',
					children: '提交',
					onClick: '{{$register}}'
				}]
			}, {
				name: 'loginItem',
				component: 'Form.Item',
				children: [{
					name: 'agree',
					component: 'Checkbox',
					checked: '{{data.form.agree}}',
					onChange: "{{(e)=>$sf('data.form.agree',e.target.checked)}}",
					children: '同意'
				}, {
					name: 'agreement',
					component: '::a',
					onClick: '{{$showAgreement}}',
					children: '<用户协议条款>'
				}, {
					name: 'login',
					component: '::span',
					style: { float: 'right' },
					children: ['已有账户,', {
						name: 'login',
						component: '::a',
						children: '请登录',
						onClick: '{{$goLogin}}'
					}]
				}]
			}]
		}, {
			name: 'footer',
			className: 'mk-app-register-footer',
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
				captcha: ''
			},
			other: {
				error: {}
			}
		}
	}
	return state
}