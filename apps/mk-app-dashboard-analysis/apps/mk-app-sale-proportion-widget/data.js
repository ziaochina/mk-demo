export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-sale-proportion-widget',
		children: [{
			name: 'chart',
			component: 'Layout',
			children: [{
				name: 'chart',
				component: 'Echarts',
				option: {
					title: {
						text: '销售额',
						subtext: "{{'总额：' + data.total}}",
					},
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'right',
						y: 'center',
						data: "{{data.details.map(o => o.name)}}"
					},
					series: [
						{
							type: 'pie',
							radius: ['50%', '70%'],
							animation: false,
							label: {
								normal: {
									show: true,
									formatter: "{b}: {c} ({d}%)"
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '16',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: true
								}
							},
							itemStyle: {
								normal: {
									shadowColor: 'rgba(0, 0, 0, 0.5)',
									shadowBlur: 10
								},
							},
							data: '{{data.details}}'
						}
					]
				},
				style: { height: '100%', width: '100%' }
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