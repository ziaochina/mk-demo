export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-editable-table',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-editable-table-header',
			children: [{
				name: 'save',
				component: 'Button',
				type: 'softly',
				onClick: '{{$save}}',
				children: '保存'
			}]
		}, {
			name: 'table',
			component: 'DataGrid',
			headerHeight: 50,
			rowsCount: '{{data.list.length}}',
			rowHeight: 50,
			readonly: false,
			enableSequence: true,
			enableAddDelrow: true,
			startSequence: 1,
			onAddrow: '{{$addrow}}',
			onDelrow: '{{$delrow}}',
			columns: [{
				name: 'name',
				component: 'DataGrid.Column',
				columnKey: 'name',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '姓名'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{data.list[_rowIndex].name}}",
					onChange: "{{(e)=>$sf('data.list.' + _rowIndex + '.name', e.target.value)}}",
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
					value: "{{data.list[_rowIndex].mobile}}",
					onChange: "{{(v)=>$sf('data.list.' + _rowIndex + '.mobile', v)}}",
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
					children: '生日'
				},
				cell: "{{$cellGetter('birthday')}}",
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'DatePicker' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: `{{{
						return $isFocus(_ctrlPath)
							? $stringToMoment(data.list[_rowIndex].birthday)
							: data.list[_rowIndex].birthday
					}}}`,
					onChange: "{{(v)=>$sf('data.list.' + _rowIndex + '.birthday', $momentToString(v,'YYYY-MM-DD'))}}",
					onOpenChange: "{{$gridBirthdayOpenChange}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'sex',
				component: 'DataGrid.Column',
				columnKey: 'sex',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '性别'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					showSearch: false,
					value: `{{{
						if(!data.list[_rowIndex].sex) return undefined
						return $isFocus(_ctrlPath)
							? data.list[_rowIndex].sex
							: (data.list[_rowIndex].sex == 0 ? '男' : '女')
					}}}`,
					onChange: `{{(v)=>$sf('data.list.'+ _rowIndex + '.sex', v)}}`,
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
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
					}],
				}
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			list: [],
			other: {}
		}
	}
}