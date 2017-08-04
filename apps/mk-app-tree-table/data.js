export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-tree-table',
		children: [{
			name: 'left',
			component: 'Layout',
			className: 'mk-app-tree-table-left',
			children: [{
				name: 'tree',
				component: 'Tree',
				onSelect: '{{$selectType}}',
				children: '{{$loopTreeChildren(data.other.goodsTypes)}}'
			}]
		}, {
			name: 'content',
			className: 'mk-app-tree-table-content',
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
					name: 'code',
					component: 'DataGrid.Column',
					columnKey: 'code',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '编号'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].code}}',
					}
				},{
					name: 'name',
					component: 'DataGrid.Column',
					columnKey: 'name',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '商品'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].name}}',
					}
				}]
			}, {
				name: 'footer',
				className: 'mk-app-tree-table-content-footer',
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
		}]
	}
}


export function getInitState() {
	return {
		data: {
			list: [],
			pagination: { current: 1, total: 0, pageSize: 20 },
			filter: {
				type: 1
			},
			other: {}
		}
	}
}
