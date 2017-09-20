export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-devtools',
		children: [{
			name: 'tabs',
			component: 'Tabs',
			className: 'mk-app-devtools-tabs',
			activeKey: '{{data.tabKey}}',
			onChange: '{{$tabChange}}',
			children: [{
				name: 'apps',
				component: 'Tabs.TabPane',
				key: 'apps',
				tab: '当前网站所有app'
			}, {
				name: 'modifyApp',
				component: 'Tabs.TabPane',
				key: 'modifyApp',
				tab: '元数据、状态修改'
			}, {
				name: 'traceAction',
				component: 'Tabs.TabPane',
				key: 'traceAction',
				tab: 'action监控'
			}, {
				name: 'state',
				component: 'Tabs.TabPane',
				_visible: false,
				key: 'state',
				tab: '当前状态(state)'
			}, {
				name: 'apis',
				component: 'Tabs.TabPane',
				key: 'apis',
				tab: '所有API'
			}, {
				name: 'mockData',
				component: 'Tabs.TabPane',
				key: 'mockData',
				tab: 'mock数据'
			},{
				name: 'metaDesign',
				component: 'Tabs.TabPane',
				key: 'metaDesign',
				tab: '元数据设计'
			}]
		}, {
			name: 'content',
			component: '::div',
			className: 'mk-app-devtools-content',
			children: [{
				name: 'state',
				component: 'JSONTree',
				_visible: "{{data.tabKey=='state'}}",
				data: '{{$getState()}}'
			}, {
				name: 'apps',
				component: 'JSONTree',
				_visible: "{{data.tabKey=='apps'}}",
				data: '{{$getApps()}}'
			}, {
				name: 'mockData',
				component: 'JSONTree',
				_visible: "{{data.tabKey=='mockData'}}",
				data: '{{$getMockData()}}'
			}, {
				name: 'apis',
				component: `{{$isExistsApp('mk-app-apidoc')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='apis'}}",
				_visible: "{{data.tabKey=='apis'}}",
				appName: 'mk-app-apidoc',
				children: '运行网站需要mk-app-apidoc应用，可以使用[mk clone mk-app-apidoc apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('mk-app-apidoc')?['_visible','children']:['notRender','appName']}}"
			}, {
				name: 'modifyApp',
				_visible: "{{data.tabKey=='modifyApp'}}",
				component: `{{$isExistsApp('mk-app-hot-modify-app')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='modifyApp'}}",
				appName: 'mk-app-hot-modify-app',
				children: '运行网站需要mk-app-hot-modify-app应用，可以使用[mk clone mk-app-hot-modify-app apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('mk-app-hot-modify-app')?['_visible','children']:['notRender','appName']}}"

			}, {
				name: 'traceAction',
				component: `{{$isExistsApp('mk-app-trace-action')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='traceAction'}}",
				_visible: "{{data.tabKey=='traceAction'}}",
				appName: 'mk-app-trace-action',
				children: '运行网站需要mk-app-trace-action应用，可以使用[mk clone mk-app-trace-action apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('mk-app-trace-action')?['_visible','children']:['notRender','appName']}}"
			},{
				name: 'metaDesign',
				component: `{{$isExistsApp('mk-app-meta-design')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='metaDesign'}}",
				_visible: "{{data.tabKey=='metaDesign'}}",
				appName: 'mk-app-meta-design',
				children: '运行网站需要mk-app-meta-design应用，可以使用[mk clone mk-app-meta-design apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('mk-app-meta-design')?['_visible','children']:['notRender','appName']}}"
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			tabKey: 'apps'
		}
	}
}