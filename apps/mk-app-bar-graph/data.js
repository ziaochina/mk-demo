export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-bar-graph',
		children: [{
			name: 'chart',
			component: 'Echarts',
			option: '{{$getOption()}}'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			xAxisData: [],
			seriesData: [[], []]
		}
	}
}