export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-tree-table',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'mk-app-tree-table-left',
			title: '分类',
			extra: {
				name: 'header',
				component: '::div',
				children: [{
					name: 'add',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'plus',
					onClick: '{{$addType}}'
				}, {
					name: 'modify',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'edit',
					onClick: '{{$modifyType}}'
				}, {
					name: 'del',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'close',
					onClick: '{{$delType}}'
				}]

			},
			
			children: [{
				name: 'tree',
				component: 'Tree',
				selectedKeys: `{{[data.filter.type+'']}}`,
				onSelect: '{{$selectType}}',
				children: '{{$loopTreeChildren(data.other.goodsTypes)}}'
			}]
		}, {
			name: 'content',
			component: 'Card',
			className: 'mk-app-tree-table-content',
			title: '商品列表',
			extra: {
				name: 'header',
				component: '::div',
				className: 'mk-app-tree-table-content-header',
				children: [{
					name: 'add',
					component: 'Button',
					type: 'softly',
					children: '新增',
					onClick: '{{$addDetail}}'
				}, {
					name: 'del',
					component: 'Button',
					type: 'softly',
					children: '删除',
					onClick: '{{$batchDelDetail}}'
				}]
			},
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
						children: {
							name: 'link',
							component: '::a',
							children: '{{data.list[_rowIndex].code}}',
							onClick: '{{$modifyDetail(data.list[_rowIndex].id)}}'
						},
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
