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
				name: 'state',
				component: 'Tabs.TabPane',
				key: 'state',
				tab: '当前状态(state)'
			}, {
				name: 'mockData',
				component: 'Tabs.TabPane',
				key: 'mockData',
				tab: 'mock数据'
			}, {
				name: 'apis',
				component: 'Tabs.TabPane',
				key: 'apis',
				tab: '所有API'
			}, {
				name: 'modifyMeta',
				component: 'Tabs.TabPane',
				key: 'modifyMeta',
				tab: '修改app元数据'
			},{
				name: 'traceAction',
				component: 'Tabs.TabPane',
				key: 'traceAction',
				tab: 'action监控'
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
				name: 'modifyMeta',
				component: 'AppLoader',
				notRender: "{{data.tabKey!='modifyMeta'}}",
				appName: 'mk-app-devtools-modify-meta'
			}, {
				name: 'traceAction',
				component: `{{$isExistsApp('mk-app-trace-action')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='traceAction'}}",
				_visible: "{{data.tabKey=='traceAction'}}",
				appName: 'mk-app-trace-action',
				children: '运行网站需要mk-app-trace-action应用，可以使用[mk clone mk-app-trace-action apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('mk-app-trace-action')?['_visible','children']:['notRender','appName']}}"
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