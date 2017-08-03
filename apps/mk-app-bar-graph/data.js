export function getMeta() {
	return {
		name: 'root',
		component: '::div',
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
			seriesData: [[],[]]
		}
	}
}