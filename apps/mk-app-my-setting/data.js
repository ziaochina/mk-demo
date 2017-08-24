export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-my-setting',
		children: [{
			name: 'left',
			component: 'Menu',
			selectedKeys: '{{[data.other.selectedMenuItem]}}',
			onSelect: '{{$menuSelected}}',
			className: 'mk-app-my-setting-left',
			children: [{
				name: 'baseInfo',
				component: 'Menu.Item',
				key: 'baseInfo',
				children: '个人资料'
			}, {
				name: 'security',
				component: 'Menu.Item',
				key: 'security',
				children: '安全设置'
			}]
		}, {
			name: 'baseInfo',
			component: 'Layout',
			className: 'mk-app-my-setting-baseInfo',
			_visible: "{{data.other.selectedMenuItem == 'baseInfo'}}",
			children: [{
				name: 'title',
				component: '::h1',
				className: 'mk-app-my-setting-baseInfo-title',
				children: '个人资料'
			}, {
				name: 'form',
				component: 'Form',
				className: 'mk-app-my-setting-baseInfo-form',
				children: [{
					name: 'photoItem',
					component: 'Form.Item',
					className: 'mk-app-my-setting-baseInfo-form-photo',
					label: '头像',
					required: true,
					children: [{
						name: 'container',
						component: '::div',
						children: [{
							name: 'photo',
							component: '::img',
							src: '{{$getPhoto()}}'
						}, {
							name: 'upload',
							component: 'Upload',
							beforeUpload: '{{$upload}}',
							children: '上传新照片'
						}]
					}]

				}, {
					name: 'mobileItem',
					component: 'Form.Item',
					label: '手机号',
					required: true,
					children: [{
						name: 'mobile',
						component: 'Input',
						disabled: 'disabled',
						value: '{{data.form.mobile}}',
					}]
				}, {
					name: 'nicknameItem',
					component: 'Form.Item',
					label: '昵称',
					required: true,
					validateStatus: "{{data.other.error.nickname?'error':'success'}}",
					help: '{{data.other.error.nickname}}',
					children: [{
						name: 'nickname',
						component: 'Input',
						onChange: "{{(e)=>$fieldChange('data.form.nickname', e.target.value)}}",
						value: '{{data.form.nickname}}',
					}]
				}, {
					name: 'sexItem',
					component: 'Form.Item',
					label: '性别',
					required: true,
					children: [{
						name: 'sex',
						component: 'Radio.Group',
						value: '{{data.form.sex}}',
						onChange: "{{(e)=>$sf('data.form.sex',e.target.value)}}",
						children: [{
							name: 'man',
							value: '0',
							component: 'Radio',
							children: '男'
						}, {
							name: 'woman',
							value: '1',
							component: 'Radio',
							children: '女'
						}]
					}]
				}, {
					name: 'birthdayItem',
					component: 'Form.Item',
					label: '出生日期',
					children: [{
						name: 'birthday',
						component: 'DatePicker',
						value: '{{$stringToMoment(data.form.birthday)}}',
						onChange: "{{(d)=>$sf('data.form.birthday',$momentToString(d,'YYYY-MM-DD'))}}",
					}]
				}, {
					name: 'saveItem',
					component: 'Form.Item',
					children: [{
						name: 'save',
						component: 'Button',
						type: 'showy',
						children: '保存',
						style: { marginLeft: 115, marginTop: 7 },
						onClick: '{{$saveBaseInfo}}'
					}]

				}]
			}]

		}, {
			name: 'security',
			component: 'Layout',
			className: 'mk-app-my-setting-security',
			_visible: "{{data.other.selectedMenuItem == 'security'}}",
			children: [{
				name: 'title',
				component: '::h1',
				className: 'mk-app-my-setting-baseInfo-title',
				children: '安全设置'
			}, {
				name: 'level',
				component: '::div',
				className: '{{$getSecurityLevelClassName()}}',
				children: [{
					name: 'label',
					component: '::e',
					children: '密码安全级别:'
				}, {
					name: 'text',
					component: '::span',
					children: '{{$getSecurityLevelText()}}'
				}, {
					name: 'bar',
					component: 'Progress',
					percent: '{{data.form.securityLevel*20}}',
					showInfo: false
				}, {
					name: 'modify',
					component: 'Button',
					type: 'softly',
					size: 'small',
					onClick:'{{$modifyPassword}}',
					children: '修改密码',
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: { sex: '1' },
			other: {
				selectedMenuItem: 'baseInfo',
				error: {

				}
			}
		}
	}
}