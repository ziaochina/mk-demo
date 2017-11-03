export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-dashboard-analysis',
		_visible: '{{!!data.visit}}',
		children: [{
			name: 'gridLayout',
			component: 'GridLayout.WidthProviderGridLayout',
			className: 'mk-app-dashboard-analysis-grid',
			autoSize: true,
			cols: 12,
			rowHeight: 50,
			isResizable: false,
			isDraggable: false,
			useCSSTransforms: false,
			//margin:[20,20],
			containerPadding: [10, 10],
			layout: [
				{ i: 'sale', x: 0, y: 0, w: 3, h: 4 },
				{ i: 'visit', x: 3, y: 0, w: 3, h: 4 },
				{ i: 'trade', x: 6, y: 0, w: 3, h: 4 },
				{ i: 'market', x: 9, y: 0, w: 3, h: 4 },
				{ i: 'trend', x: 0, y: 4, w: 12, h: 7 },
				{ i: 'hotSearch', x: 0, y: 11, w: 6, h: 8 },
				{ i: 'saleProportion', x: 7, y: 11, w: 6, h: 8 },
				{ i: 'bottom', x:0, y: 19, w:12, h:0.01}

			],
			children: [{
				name: 'sale',
				component: '::div',
				key: 'sale',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'mk-app-sale-widget',
						data: "{{data.sale}}"
					}]
				}
			}, {
				name: 'visit',
				component: '::div',
				key: 'visit',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'mk-app-visit-widget',
						data: "{{data.visit}}"
					}]
				}
			}, {
				name: 'trade',
				component: '::div',
				key: 'trade',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'mk-app-trade-widget',
						data: "{{data.trade}}"
					}]
				}
			}, {
				name: 'market',
				component: '::div',
				key: 'market',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'mk-app-market-widget',
						data: "{{data.market}}"
					}]
				}
			}, {
				name: 'trend',
				component: '::div',
				key: 'trend',
				children: [{
					name: 'card',
					component: 'Card',
					children: [{
						name: 'trend',
						component: 'Layout',
						className: 'mk-app-dashboard-analysis-trend',
						children: [{
							name: 'tabs',
							component: 'Tabs',
							children: [{
								name: 'saleTrend',
								component: 'Tabs.TabPane',
								tab: '销售额',
								key: 'saleTrend',
							}, {
								name: 'visitTrend',
								component: 'Tabs.TabPane',
								tab: '访问量',
								key: 'visitTrend',
							}]
						}, {
							name: 'saleTrend',
							component: 'AppLoader',
							appName: 'mk-app-sale-trend-widget',
							data: '{{({saleTrend:data.saleTrend,topForStore:data.topForStore})}}'
						}]
					}]
				}]
			}, {
				name: 'hotSearch',
				component: '::div',
				key: 'hotSearch',
				children: [{
					name: 'card',
					component: 'Card',
					title: '线上热门搜索',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'mk-app-hot-search-widget',
						data: '{{data.hotSearch}}'
					}]
				}]
			}, {
				name: 'saleProportion',
				component: '::div',
				key: 'saleProportion',
				children: [{
					name: 'card',
					component: 'Card',
					title: '销售额类别占比',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'mk-app-sale-proportion-widget',
						data: '{{data.saleProportion}}'
					}]
				}]
			},{
				name: 'bottom',
				component: '::div',
				key: 'bottom'
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
		}
	}
}