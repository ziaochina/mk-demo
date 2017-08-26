export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-home-list',
		children: [{
			name: 'content',
			className: 'mk-app-home-list-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: 1,
				rowsCount: "{{$getListRowsCount()}}",
				columns: [{
					name: 'message',
					component: 'DataGrid.Column',
					columnKey: 'message',
					width: 200,
					flexGrow: 1,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '消息'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].message}}',
					},
				}]
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
