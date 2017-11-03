export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-sale-widget',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-sale-widget-header',
			children: [{
				name: 'left',
				component: '::span',
				children: '总销售额'
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
			className: 'mk-app-sale-widget-text',
			children: "{{'¥  ' + $numberFormat(data.total)}}"
		}, {
			name: 'rate',
			component: 'Layout',
			className: 'mk-app-sale-widget-rate',

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

		}, {
			name: 'footer',
			component: 'Layout',
			className: 'mk-app-sale-widget-footer',
			children: [{
				name: 'label',
				component: '::span',
				children: '日均销售额'
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