export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-sale-trend-widget',
		children: [{
			name: 'left',
			component: 'Layout',
			className: 'mk-app-sale-trend-widget-left',
			children: [{
				name: 'title',
				component: '::span',
				children: '总销售额趋势'
			}, {
				name: 'chart',
				component: 'Echarts',
				option: {
					tooltip: {
						trigger: 'axis',
					},
					xAxis: [{
						type: 'category',
						data: '{{data.saleTrend.x}}'
					}],
					yAxis: [{
						type: 'value'
					}],
					grid: {
						left: 60,
						right: 100,
						bottom: 20,
						top: 20
					},
					series: [{
						type: 'bar',
						smooth: true,
						sampling: 'average',
						animation: false,
						itemStyle: {
							normal: {
								color: 'rgb(70, 130, 180)',
								shadowColor: 'rgba(0, 0, 0, 0.5)',
								shadowBlur: 10
							},
						},
						areaStyle: {
							normal: {
								color: 'rgb(70, 130, 180)',
							}
						},
						data: '{{data.saleTrend.y}}'
					}]
				}
			}]
		}, {
			name: 'right',
			component: 'Layout',
			className: 'mk-app-sale-trend-widget-right',
			children: [{
				name: 'title',
				component: '::span',
				className: 'mk-app-sale-trend-widget-right-title',
				children: '门店销售额排行'
			}, {
				name: 'list',
				component: 'Layout',
				className: 'mk-app-sale-trend-widget-right-list',
				children: {
					name: 'detail',
					component: 'Layout',
					className: 'mk-app-sale-trend-widget-right-list-detail',
					children: [{
						name: 'index',
						component: 'Badge',
						count: '{{data.topForStore[_rowIndex].index}}'
					}, {
						name: 'name',
						component: '::div',
						className: 'mk-app-sale-trend-widget-right-list-detail-name',
						children: '{{data.topForStore[_rowIndex].storeName}}'
					}, {
						name: 'total',
						component: '::div',
						children: '{{data.topForStore[_rowIndex].total}}'
					}],
					_power: 'for in data.topForStore'

				}
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world'
		}
	}
}