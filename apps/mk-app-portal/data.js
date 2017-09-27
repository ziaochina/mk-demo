export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-portal',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-portal-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-portal-header-left',
				children: [{
					name: 'logo',
					component: '::img',
					className: 'mk-app-portal-header-left-logo',
					src: '{{$getLogo()}}'
				}, {
					name: 'siteName',
					component: '::h1',
					children: 'Monkey King'
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-portal-header-right',
				children: [{
					name: 'topMenu',
					component: 'Menu',
					mode: 'horizontal',
					theme: 'dark',
					style: { backgroundColor: '#333' },
					onClick: '{{$topMenuClick}}',
					selectedKeys: [],
					children: [{
						name: 'toggleTabs',
						component: 'Menu.Item',
						key: 'toggleTabs',
						children: [{
							name: 'icon',
							component: 'Icon',
							type: 'appstore-o'
						},
						"{{data.isTabsStyle ? '正常风格' : '多页签显示风格'}}"]
					},{
						name: 'gitter',
						component: 'Menu.Item',
						key: 'gitter',
						children: [{
							name: 'icon',
							component: 'Icon',
							type: 'smile-o'
						}, '聊天']
					}, {
						name: 'github',
						component: 'Menu.Item',
						key: 'github',
						children: [{
							name: 'icon',
							component: 'Icon',
							type: 'github'
						}, '源代码']
					}, {
						name: 'my',
						component: 'Menu.SubMenu',
						key: 'my',
						title: {
							name: 'myTitle',
							component: '::span',
							className: 'mk-app-portal-header-right-my-title',
							children: [{
								name: 'photo',
								component: '::img',
								className: 'mk-app-portal-header-right-photo',
								src: '{{$getPhoto()}}'
							}, "{{data.other.currentUser?data.other.currentUser.nickname:''}}"]
						},
						children: [{
							name: 'mySetting',
							component: 'Menu.Item',
							key: 'mySetting',
							children: '个人设置'
						}, {
							name: 'logout',
							component: 'Menu.Item',
							key: 'logout',
							children: '注销'
						}]
					}]
				}]
			}]
		}, {
			name: 'content',
			component: 'Layout',
			className: 'mk-app-portal-content',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-portal-content-left',
				children: [{
					name: 'menu',
					component: 'Menu',
					mode: 'inline',
					theme: 'dark',
					selectedKeys: "{{$getMenuSelectKeys()}}",
					defaultOpenKeys: "{{data.menuDefaultOpenKeys}}",
					onClick: '{{$menuClick}}',
					children: '{{$getMenuChildren()}}'
				}]
			}, {
				name: 'container',
				component: 'Layout',
				children: [{
					name: 'tabs',
					component: 'Tabs',
					className: 'mk-app-portal-content-tabs',
					type: 'card',
					type: "editable-card",
					hideAdd: true,
					activeKey: '{{data.content && data.content.name}}',
					onChange: '{{$tabChange}}',
					onEdit: '{{$tabEdit}}',
					_visible:'{{ data.isTabsStyle && data.openTabs && data.openTabs.length > 0}}',
					children: [{
						name: 'tab1',
						component: 'Tabs.TabPane',
						key: '{{data.openTabs[_rowIndex].name}}',
						tab: '{{data.openTabs[_rowIndex].name}}',
						_power: 'for in data.openTabs'
					}]
				}, {
					name: 'main',
					component: 'Layout',
					className: 'mk-app-portal-content-main',
					_visible: '{{!!(data.content && data.content.appName)}}',
					children: {
						name: 'app',
						component: 'AppLoader',
						appName: '{{ data.openTabs && data.openTabs.length > 0 && data.openTabs[_rowIndex].appName }}',
						onPortalReload: '{{$load}}',
						setPortalContent: '{{$setContent}}',
						'...': '{{data.openTabs && data.openTabs.length > 0 && data.openTabs[_rowIndex].appProps}}',
						isTabStyle: '{{data.isTabsStyle}}',
						_notRender: '{{ !(data.content && data.content.name == data.openTabs[_rowIndex].name) }}',
						_power: 'for in data.openTabs',
						
					}
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			menu: [],
			menuSelectedKeys: [],
			menuDefaultOpenKeys: [],
			content: {},
			openTabs: [],
			isTabsStyle: false,
			other: {}
		}
	}
}