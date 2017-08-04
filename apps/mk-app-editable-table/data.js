export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-editable-table',
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
				cell: "{{$cellGetter('name')}}",
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
				cell: "{{$cellGetter('mobile')}}",
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
				cell: "{{$cellGetter('sex')}}",
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