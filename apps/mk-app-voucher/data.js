export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-voucher',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-voucher-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-voucher-header-left',
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
				className: 'mk-app-voucher-header-right',
				children: [{
					name: 'save',
					component: 'Button',
					type: 'showy',
					onClick: '{{$save}}',
					children: '保存'
				}, {
					name: 'add',
					component: 'Button',
					type: 'softly',
					onClick: '{{$add}}',
					children: '新增'
				}, {
					name: 'del',
					component: 'Button',
					type: 'softly',
					disabled: '{{!(!!data.form.id || data.form.id == 0)}}',
					onClick: '{{$del}}',
					children: '删除'
				}]
			}]

		}, {
			name: 'formHeader',
			component: 'Form',
			className: 'mk-app-voucher-form-header',
			children: [{
				name: 'nameItem',
				component: 'Form.Item',
				label: '姓名',
				required: true,
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: "{{(e)=>$sf('data.form.name',e.target.value)}}",
				}]
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				label: '手机',
				required: true,
				children: [{
					name: 'mobile',
					component: 'Input.Number',
					value: '{{data.form.mobile}}',
					onChange: "{{(v)=>$sf('data.form.mobile',v)}}",
				}]
			}, {
				name: 'sexItem',
				component: 'Form.Item',
				label: '性别',

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
				name: 'marriedItem',
				component: 'Form.Item',
				label: '已婚',
				children: [{
					name: 'married',
					component: 'Checkbox',
					checked: '{{data.form.married}}',
					onChange: "{{(e)=>$sf('data.form.married',e.target.checked)}}",
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
				name: 'educationItem',
				component: 'Form.Item',
				label: '最高学历',
				children: [{
					name: 'education',
					component: 'Select',
					showSearch: false,
					value: '{{data.form.education ? data.form.education.id: undefined }}',
					onChange: "{{$educationChange}}",
					onFocus: "{{$educationFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.educationDataSource ? data.other.educationDataSource[_rowIndex].id : undefined}}",
						children: '{{data.other.educationDataSource ? data.other.educationDataSource[_rowIndex].name : undefined}}',
						_power: 'for in data.other.educationDataSource'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addEducation}}'
					},
				}]
			}, {
				name: 'signatureItem',
				component: 'Form.Item',
				label: '签名',
				className: 'mk-app-voucher-form-header-signature',
				children: [{
					name: 'signature',
					component: 'Input',
					value: '{{data.form.signature}}',
					onChange: "{{(e)=>$sf('data.form.signature',e.target.value)}}",
				}]
			}]
		}, {
			name: 'detailTitle',
			component: 'Tabs',
			className: 'mk-app-voucher-form-detailtitle',
			type: 'card',
			size: 'small',
			children: [{
				name: 'tab1',
				component: 'Tabs.TabPane',
				key: '1',
				tab: '家庭情况'
			}]
		}, {
			name: 'details',
			component: 'DataGrid',
			className: 'mk-app-voucher-form-details',
			headerHeight: 40,
			rowsCount: '{{data.form.details.length}}',
			rowHeight: 40,
			readonly: false,
			enableSequence: true,
			enableAddDelrow: true,
			startSequence: 1,
			onAddrow: "{{$addRow('details')}}",
			onDelrow: "{{$delRow('details')}}",
			onKeyDown: '{{$gridKeydown}}',
			scrollToColumn: '{{data.other.detailsScrollToColumn}}',
			scrollToRow: '{{data.other.detailsScrollToRow}}',
			columns: [{
				name: 'name',
				component: 'DataGrid.Column',
				columnKey: 'name',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: [{
						name: 'label',
						component: '::label',
						className: 'ant-form-item-required',
						children: '家庭成员姓名'
					}]
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{data.form.details[_rowIndex].name}}",
					onChange: "{{(e)=>$sf('data.form.details.' + _rowIndex + '.name', e.target.value)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'rela',
				component: 'DataGrid.Column',
				columnKey: 'rela',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: [{
						name: 'label',
						component: '::label',
						className: 'ant-form-item-required',
						children: '关系'
					}]
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					showSearch: false,
					value: `{{{
						if(!data.form.details[_rowIndex].rela) return undefined
						return $isFocus(_ctrlPath)
							? data.form.details[_rowIndex].rela.id
							: data.form.details[_rowIndex].rela.name
					}}}`,
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.relaDataSource[_lastIndex].id}}',
						children: '{{data.other.relaDataSource[_lastIndex].name}}',
						_power: 'for in data.other.relaDataSource'
					},
					onChange: `{{(v)=>{
						const rela = data.other.relaDataSource.find(o=>o.id==v)
						$sf('data.form.details.'+ _rowIndex + '.rela', $fromJS(rela,undefined))
					}}}`,
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'mobile',
				component: 'DataGrid.Column',
				columnKey: 'mobile',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '手机'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{data.form.details[_rowIndex].mobile}}",
					onChange: "{{(v)=>$sf('data.form.details.' + _rowIndex + '.mobile', v)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'birthday',
				component: 'DataGrid.Column',
				columnKey: 'birthday',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '出生日期'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'DatePicker' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: `{{{
						return $isFocus(_ctrlPath)
							? $stringToMoment(data.form.details[_rowIndex].birthday)
							: data.form.details[_rowIndex].birthday
					}}}`,
					onChange: "{{(v)=>$sf('data.form.details.' + _rowIndex + '.birthday', $momentToString(v,'YYYY-MM-DD'))}}",
					onOpenChange: "{{$dateOpenChange}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'isWork',
				component: 'DataGrid.Column',
				columnKey: 'isWork',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '参加工作'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{ data.form.details[_rowIndex].isWork ? '是': '否' }}",
					checked: "{{ data.form.details[_rowIndex].isWork }}",
					onChange: "{{(e)=>$sf('data.form.details.' + _rowIndex + '.isWork', e.target.checked)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				sex: '0',
				education: { id: '0', name: '本科' },
				mobile: '',
				details: [{}]
			},
			other: {
			}
		}
	}
}