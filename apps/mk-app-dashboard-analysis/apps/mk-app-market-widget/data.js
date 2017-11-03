export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-market-widget',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-market-widget-header',
			children: [{
				name: 'left',
				component: '::span',
				children: '运营活动效果'
			}, {
				name: 'right',
				component: 'Icon',
				showStyle: 'softly',
				type: 'info-circle',
				title: '指标说明'
			}]
		}, {
			name: 'chart',
			component: '::div',
			className: 'mk-app-market-widget-chart',
			children: {
				name: 'chart',
				component: 'Echarts',
				option: {
					tooltip: {
						formatter: "{a} <br/>{b} : {c}%"
					},
					grid: {
						left: 0,
						right: 0,
						bottom: 0,
						top: 0
					},
					series: [{
						type: 'gauge',
						detail: { formatter: '{value}%' },
						radius: '100%',
						startAngle: 180,
						endAngle: 0,
						animation: false,
						itemStyle: {
							normal: {
								color: 'rgb(255, 70, 131)',
								shadowColor: 'rgba(0, 0, 0, 0.5)',
								shadowBlur: 10
							},
						},
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							show: false,
						},
						title: {
							show: false,
						},
						pointer: {
							width: 4,
						},
						data: [{
							value: '{{ data.rate * 100}}',
							name: '效果'
						}]
					}]
				},
				style: { height: '100%', width: '100%' }
			}
		}, {
			name: 'footer',
			component: 'Layout',
			className: 'mk-app-market-widget-footer',
			children: [{
				name: 'label1',
				component: '::span',
				children: '周同比'
			}, {
				name: 'value1',
				component: '::h2',
				children: "{{data.WoW * 100 + '%'}}"
			}, {
				name: 'icon1',
				component: 'Icon',
				type: "{{data.WoW> 0 ? 'caret-up' : 'caret-down'}}",
				style: "{{({color: data.WoW> 0 ? 'red': 'green'})}}"
			}, {
				name: 'label2',
				component: '::span',
				children: '日环比'
			}, {
				name: 'value2',
				component: '::h2',
				children: "{{data.DoD * 100 + '%'}}"
			}, {
				name: 'icon2',
				component: 'Icon',
				type: "{{data.DoD> 0 ? 'caret-up' : 'caret-down'}}",
				style: "{{({color: data.DoD> 0 ? 'red': 'green'})}}"
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