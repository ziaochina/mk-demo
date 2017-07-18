import { fetch } from 'mk-utils'
import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-list',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-list-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-list-header-left',
				children: ['姓名:', {
					name: 'name',
					component: 'Input',
					placeholder: '请输入姓名查询',
					value: '{{data.filter.name}}',
					onChange: '{{$nameChange}}'
				}, '性别:', {
						name: 'sex',
						component: 'Select',
						allowClear: true,
						value: '{{data.filter.sex}}',
						onChange: '{{$sexChange}}',
						children: [{
							name: 'option1',
							component: 'Select.Option',
							value: '0',
							children: '男'
						}, {
							name: 'option2',
							component: 'Select.Option',
							value: '1',
							children: '女'
						}]
					}, '生日:', {
						name: 'birthdayRange',
						component: 'DatePicker.RangePicker',
						format: 'YYYY-MM-DD',
						value: '{{$getBirthdayRange()}}',
						onChange: '{{$birthdayRangeChange}}'
					}, {
						name: 'clear',
						component: 'Button',
						type: 'softly',
						children: '清空',
						onClick: '{{$clearFilter}}'
					}]
			}]
		}, {
			name: 'content',
			className: 'mk-app-list-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.pagination.current-1)*data.pagination.pageSize + 1}}',
				rowsCount: "{{$getListRowsCount()}}",
				columns: [{
					name: 'select',
					component: 'DataGrid.Column',
					columnKey: 'select',
					width: 40,
					fixed: true,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: {
							name: 'cb',
							component: 'Checkbox',
							checked: '{{$isSelectAll()}}',
							onChange: '{{$selectAll}}'
						}
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'checkbox',
							component: 'Checkbox',
							checked: '{{data.list[_rowIndex].selected}}',
							onChange: "{{ (e, option) => $setField('data.list.' + _rowIndex + '.selected', e.target.checked ) }}",
						}
					}
				}, {
					name: 'oprate',
					component: 'DataGrid.Column',
					columnKey: 'oprate',
					fixed: true,
					width: 30,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: ''
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: [{
							name: 'edit',
							component: 'Icon',
							showStyle: 'showy',
							type: 'edit',
							style: {
								fontSize: 18
							},
							title: 'edit'
						}]
					}
				}, {
					name: 'name',
					component: 'DataGrid.Column',
					columnKey: 'name',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '姓名'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].name}}',
					},
				}, {
					name: 'sex',
					component: 'DataGrid.Column',
					columnKey: 'sex',
					width: 50,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '性别'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: "{{data.list[_rowIndex].sex == 0? '男': '女'}}",
					}
				}, {
					name: 'birthday',
					component: 'DataGrid.Column',
					columnKey: 'birthday',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '生日'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].birthday}}',
					},
				}, {
					name: 'city',
					component: 'DataGrid.Column',
					columnKey: 'city',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '城市'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].city}}',
					},
				}]
			}]
		}, {
			name: 'footer',
			className: 'mk-app-list-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				showSizeChanger: true,
				pageSize: '{{data.pagination.pageSize}}',
				current: '{{data.pagination.current}}',
				total: '{{data.pagination.total}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
	}
}


export function fetchList(pagination, filter) {
	return fetch.test('', '', getAllData(pagination, filter))
}

function getAllData(pagination, filter) {
	var allData = []
	for (let i = 0; i < 200; i++) {
		allData.push({
			selected: false,
			name: '诸葛' + (i + 1),
			sex: i % 2,
			birthday: `1980-${i % 11 + 1}-${i % 28 + 1}`,
			city: '北京海淀'
		})
	}

	var data = allData
	if (filter) {
		if (filter.name)
			data = allData.filter(o => o.name.indexOf(filter.name) != -1)
		if (filter.sex)
			data = data.filter(o => o.sex == filter.sex)
		if (filter.birthdayRange) {
			data = data.filter(o => moment(o.birthday).isAfter(filter.birthdayRange[0]) && moment(o.birthday).isBefore(filter.birthdayRange[1]))
		}
	}


	var current = pagination.current
	var pageSize = pagination.pageSize
	var start = (current - 1) * pageSize
	var end = current * pageSize

	start = start > data.length - 1 ? 0 : start
	end = start > data.length - 1 ? pageSize : end
	current = start > data.length - 1 ? 1 : current

	var ret = { result: true, pagination: { current, pageSize, total: data.length }, list: [] }
	for (let j = start; j < end; j++) {
		if (data[j])
			ret.list.push(data[j])
	}

	return ret
}
