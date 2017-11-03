export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-hot-search-widget',
		children: [{
			name: 'top',
			component: 'Layout',
			className: 'mk-app-hot-search-widget-top',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-hot-search-widget-top-left',
				children: [{
					name: 'title',
					component: '::span',
					children: '搜索用户数'
				}, {
					name: 'total',
					component: '::h2',
					children: '{{data.userCount.total}}'
				}, {
					name: 'chart',
					component: 'Echarts',
					option: '{{$getChartOption(data.userCount)}}',
					style: { height: '100%', width: '100%' }
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-hot-search-widget-top-right',
				children: [{
					name: 'title',
					component: '::span',
					children: '搜索次数'
				}, {
					name: 'total',
					component: '::h2',
					children: '{{data.searchCount.total}}'
				}, {
					name: 'chart',
					component: 'Echarts',
					option: '{{$getChartOption(data.searchCount)}}',
					style: { height: '100%', width: '100%' }
				}]
			}]
		}, {
			name: 'bottom',
			component: 'Layout',
			className: 'mk-app-hot-search-widget-bottom',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				rowsCount: '{{data.keys.length}}',
				columns: [{
					name: 'ranking',
					component: 'DataGrid.Column',
					columnKey: 'ranking',
					flexGrow: 1,
					width: 50,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '排名'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.keys[_rowIndex].ranking}}',
					},
				}, {
					name: 'key',
					component: 'DataGrid.Column',
					columnKey: 'key',
					flexGrow: 1,
					width: 50,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '关键字'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.keys[_rowIndex].key}}',
					},
				}, {
					name: 'searchCount',
					component: 'DataGrid.Column',
					columnKey: 'searchCount',
					flexGrow: 1,
					width: 50,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '搜索次数'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.keys[_rowIndex].searchCount}}',
					},
				}, {
					name: 'weeklyGains',
					component: 'DataGrid.Column',
					columnKey: 'weeklyGains',
					flexGrow: 1,
					width: 50,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '周涨幅'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.keys[_rowIndex].weeklyGains}}',
					},
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			keys: []
		}
	}
}