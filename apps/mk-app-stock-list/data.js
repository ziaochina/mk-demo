export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-stock-list',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'mk-app-stock-list-left',
			title: '存货分类',
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
				selectedKeys: `{{ data.filter.type ? [data.filter.type.id +''] : []}}`,
				onSelect: '{{$selectType}}',
				children: '{{$getTypeChildren(data.other.stockTypes)}}'
			}]
		}, {
			name: 'content',
			component: 'Card',
			className: 'mk-app-stock-list-content',
			title: {
				name: 'headerLeft',
				component: '::div',
				className: 'mk-app-stock-list-content-header-left',
				children: [{
					name: 'search',
					component: 'Input.Search',
					placeholder: '存货编码/存货名称',
					//value: '{{data.filter.search}}',
					onChange: '{{(e)=>$searchChange(e.target.value)}}'
				}, {
					name: 'showDisable',
					component: 'Checkbox',
					children: '显示停用存货',
					checkout: '{{data.filter.showDisable}}',
					onChange: '{{$showDisableChange}}'
				}]
			},
			extra: {
				name: 'headerRight',
				component: '::div',
				className: 'mk-app-stock-list-content-header-right',
				children: [{
					name: 'add',
					component: 'Button',
					type: 'showy',
					children: '新增',
					onClick: '{{$add}}'
				}, {
					name: 'batch',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$batchMenuClick}}',
						children: [{
							name: 'modify',
							component: 'Menu.Item',
							key: 'modify',
							children: '批量修改'
						}, {
							name: 'del',
							component: 'Menu.Item',
							key: 'del',
							children: '删除'
						}, {
							name: 'disable',
							component: 'Menu.Item',
							key: 'disable',
							children: '停用'
						}, {
							name: 'enable',
							component: 'Menu.Item',
							key: 'enable',
							children: '启用'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						children: ['批量', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}, {
					name: 'print',
					component: 'Button',
					className: 'mk-app-stock-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'print',
					title: '打印',
					onClick: '{{$print}}'
				}, {
					name: 'import',
					component: 'Button',
					className: 'mk-app-stock-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'download',
					title: '导入',
					onClick: '{{$imp}}'
				}, {
					name: 'export',
					component: 'Button',
					className: 'mk-app-stock-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'upload',
					title: '导出',
					onClick: '{{$exp}}'
				}, {
					name: 'setting',
					component: 'Button',
					className: 'mk-app-stock-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'setting',
					title: '设置',
					onClick: '{{$setting}}'
				}]
			},
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.pagination.current-1)*data.pagination.pageSize + 1}}',
				rowsCount: "{{data.list ? data.list.length: 0}}",
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
							checked: "{{$isSelectAll('dataGrid')}}",
							onChange: "{{$selectAll('dataGrid')}}"
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
					width: 40,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '操作'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: [{
							name: 'del',
							component: 'Icon',
							showStyle: 'showy',
							type: 'close',
							style: {
								fontSize: 18
							},
							title: '删除',
							onClick: `{{$del(data.list[_rowIndex].id)}}`
						}]
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
						children: '存货编码'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'link',
							component: '::a',
							children: '{{data.list[_rowIndex].code}}',
							onClick: '{{$modify(data.list[_rowIndex].id)}}'
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
						children: '存货名称'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-stock-list-cell-left',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].name}}',
					}
				}, {
					name: 'meaUnit',
					component: 'DataGrid.Column',
					columnKey: 'meaUnit',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '计量单位'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].meaUnit.name}}',
					}
				}, {
					name: 'retailPrice',
					component: 'DataGrid.Column',
					columnKey: 'retailPrice',
					flexGrow: 1,
					width: 150,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '零售价'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-stock-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].retailPrice,2)}}',
					}
				}, {
					name: 'buyingPrice',
					component: 'DataGrid.Column',
					columnKey: 'buyingPrice',
					flexGrow: 1,
					width: 150,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '参考进价'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-stock-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].referPuPrice,2)}}',
					}
				}, {
					name: 'cost',
					component: 'DataGrid.Column',
					columnKey: 'cost',
					flexGrow: 1,
					width: 150,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '成本'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-stock-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].referCost,2)}}',
					}
				}]
			}, {
				name: 'footer',
				className: 'mk-app-stock-list-content-footer',
				component: 'Layout',
				children: [{
					name: 'selectedCount',
					component: '::h3',
					children: `{{'选中' + $getSelectedCount('dataGrid') + '条'}}`
				}, {
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
				type: {
					id: 1,
					code: '001',
					name: '食品'
				},
				showDisable: false
			},
			other: {}
		}
	}
}
