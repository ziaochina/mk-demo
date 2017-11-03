export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-visit-widget',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-visit-widget-header',
			children: [{
				name: 'left',
				component: '::span',
				children: '总访问量'
			}, {
				name: 'right',
				component: 'Icon',
				showStyle: 'softly',
				type: 'info-circle',
				title: '指标说明'
			}]
		}, {
			name: 'text',
			component: '::p',
			className: 'mk-app-visit-widget-text',
			children: '{{$numberFormat(data.total)}}'
		}, {
			name: 'chart',
			component: '::div',
			className: 'mk-app-visit-widget-chart',
			children: {
				name: 'chart',
				component: 'Echarts',
				option: {
					tooltip: {
						trigger: 'axis',
					},
					xAxis: {
						show: false,
						data: '{{data.x}}'
					},
					yAxis: {
						show: false,
					},
					grid: {
						left: 0,
						right: 0,
						bottom: 15,
						top: 15
					},
					series: [{
						type: 'line',
						smooth: true,
						sampling: 'average',
						animation: false,
						itemStyle: {
							normal: {
								color: 'rgb(255, 70, 131)',
								shadowColor: 'rgba(0, 0, 0, 0.5)',
								shadowBlur: 10
							}
						},
						areaStyle: {
							normal: {
								color: 'rgb(255, 70, 131)',
							}
						},
						data: '{{data.y}}'
					}]
				},
				style: { height: '100%', width: '100%' }
			}
		}, {
			name: 'footer',
			component: 'Layout',
			className: 'mk-app-visit-widget-footer',
			children: [{
				name: 'label',
				component: '::span',
				children: '日均访问量'
			}, {
				name: 'value',
				component: '::h2',
				children: '{{$numberFormat(data.average)}}'
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			x: [],
			y: [],
			total: 0,
			average: 0
		}
	}
}