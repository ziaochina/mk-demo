export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-trace-action',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-trace-action-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-trace-action-header-left',
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-trace-action-header-right',
				children: [{
					name: 'tracing',
					component: 'Button',
					children: "{{data.tracing ? '停止跟踪':'开始跟踪'}}",
					type: 'softly',
					style: { marginRight: 10 },
					onClick: '{{$tracing}}'
				}, {
					name: 'refresh',
					component: 'Button',
					children: "刷新",
					type: 'softly',
					style: { marginRight: 10 },
					onClick: '{{$refresh}}'
				}, /*{
					name: 'diff',
					component: 'Button',
					children: '状态比较',
					type: 'softly',
					style: { marginRight: 10 },
					onClick: '{{$diff}}'
				}, {
					name: 'undo',
					component: 'Button',
					children: '回滚',
					type: 'softly',
					style: { marginRight: 10 },
				}*/]
			}]
		}, {
			name: 'content',
			className: 'mk-app-trace-action-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				rowsCount: "{{$actions() ? $actions().length: 0}}",
				onRowClick: '{{$rowClick}}',
				columns: [/*{
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
							checked: '{{$actions()[_rowIndex].selected}}',
							onChange: "{{$rowSelectedChange}}",
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
							title: 'edit',
						}]
					}
				},*/ {
					name: 'app',
					component: 'DataGrid.Column',
					columnKey: 'app',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '应用名'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$actions()[_rowIndex].appFullName}}',
					},
				}, {
					name: 'reducer',
					component: 'DataGrid.Column',
					columnKey: 'reducer',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: 'reducer方法名'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$actions()[_rowIndex].reduceMethod}}',
					},
				}, {
					name: 'startTime',
					component: 'DataGrid.Column',
					columnKey: 'startTime',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '开始时间'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$actions()[_rowIndex].startTime}}',
					},
				}, {
					name: 'endTime',
					component: 'DataGrid.Column',
					columnKey: 'endTime',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '截止时间'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$actions()[_rowIndex].endTime}}',
					},
				}, {
					name: 'elapsedTime',
					component: 'DataGrid.Column',
					columnKey: 'elapsedTime',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '耗时(ms)'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$actions()[_rowIndex].elapsedTime}}',
					},
				}]
			}]
		}, {
			name: 'footer',
			component: 'Layout',
			className: 'mk-app-trace-action-footer',
			children: [{
				name: 'oldState',
				component: 'Layout',
				className: 'mk-app-trace-action-footer-part',
				children: ['old state:', {
					name: 'oldState',
					component: 'JSONTree',
					data: '{{$getOldState()}}'
				}]
			}, {
				name: 'newState',
				component: 'Layout',
				className: 'mk-app-trace-action-footer-part',
				children: ['new state:', {
					name: 'newState',
					component: 'JSONTree',
					data: '{{$getNewState()}}'
				}]
			}, {
				name: 'diff',
				component: 'Layout',
				className: 'mk-app-trace-action-footer-part',
				children: ['diff:', {
					name: 'diff',
					component: 'Layout',
					dangerouslySetInnerHTML: '{{$getDiff()}}'
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			tracing: false
		}
	}
}