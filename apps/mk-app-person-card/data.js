export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-person-card',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-person-card-header',
			_visible: '{{!data.other.isPop}}',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-person-card-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-person-card-header-right',
				children: [{
					name: 'add',
					component: 'Button',
					children: '新增',
					type: 'primary',
					style: { marginRight: 10 },
					onClick: '{{$add}}'
				}, {
					name: 'save',
					component: 'Button',
					children: '保存',
					type: 'primary',
					style: { marginRight: 10 },
					onClick: '{{$save}}'
				}]
			}]
		}, {
			name: 'form',
			component: 'Form',
			className: 'mk-app-person-card-form',
			children: [{
				name: 'nameItem',
				component: 'Form.Item',
				label: '姓名',
				required: true,
				validateStatus: "{{data.other.error.name?'error':'success'}}",
				help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: `{{(e)=>$fieldChange('data.form.name',e.target.value)}}`,
				}]
			}, {
				name: 'sexItem',
				component: 'Form.Item',
				label: '性别',
				required: true,
				children: [{
					name: 'sex',
					component: 'Select',
					showSearch: false,
					value: '{{data.form.sex}}',
					onChange: "{{(v)=>$setField('data.form.sex', v)}}",
					children: [{
						name: 'man',
						component: 'Select.Option',
						value: '0',
						children: '男'
					}, {
						name: 'woman',
						component: 'Select.Option',
						value: '1',
						children: '女'
					}]
				}]
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				label: '手机',
				required: true,
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				help: '{{data.other.error.mobile}}',
				children: [{
					name: 'mobile',
					component: 'Input.Number',
					value: '{{data.form.mobile}}',
					onChange: `{{(v)=>$fieldChange('data.form.mobile',v)}}`,
				}]
			}, {
				name: 'birthdayItem',
				component: 'Form.Item',
				label: '生日',
				required: true,
				children: [{
					name: 'birthday',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.birthday)}}',
					onChange: "{{(v)=>$sf('data.form.birthday', $momentToString(v,'YYYY-MM-DD'))}}",
				}]
			}, {
				name: 'departmentItem',
				component: 'Form.Item',
				label: '部门',
				children: [{
					name: 'department',
					component: 'Select',
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addDepartment}}'
					},
					value: '{{data.form.department}}',
					onFocus: '{{$departmentFocus}}',
					onChange: "{{(v)=>$setField('data.form.department', v)}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.departments[_rowIndex].code}}',
						children: '{{data.other.departments[_rowIndex].name}}',
						_power: 'for in data.other.departments'
					}
				}]
			}, {
				name: 'addressItem',
				component: 'Form.Item',
				label: '地址',
				children: [{
					name: 'address',
					component: 'Input',
					value: '{{data.form.address}}',
					onChange: "{{(e)=>$setField('data.form.address',e.target.value)}}"
				}]
			}]
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
				name: '',
				sex: '0',
				birthday: '1981-1-1',
				mobile: '',
				department: '',
				address: '北京海淀'
			},
			other: {
				departments: [],
				error: {}
			}
		}
	}

	state.data.other.isPop = !!option.isPop //是否弹出卡片使用

	return state
}