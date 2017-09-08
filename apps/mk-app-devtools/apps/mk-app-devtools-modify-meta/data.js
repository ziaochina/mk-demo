export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-devtools-modify-meta',
		children: [{
			name: 'left',
			component: 'Layout',
			className: 'mk-app-devtools-modify-meta-left',
			children: [{
				name: 'menu',
				component: 'Menu',
				theme: 'dark',
				onSelect: '{{$menuSelected}}',
				selectedKeys: '{{[data.selectApp.name]}}',
				children: [{
					name: 'app',
					component: 'Menu.Item',
					key: '{{data.apps[_rowIndex].name}}',
					children: '{{data.apps[_rowIndex].name}}',
					_power: 'for in data.apps'
				}]
			}]
		}, {
			name: 'content',
			component: 'Layout',
			className: 'mk-app-devtools-modify-meta-content',
			children: [{
				name: 'metaCard',
				component: 'Card',
				title: '元数据',
				className: 'mk-app-devtools-modify-meta-content-meta',
				extra: {
					name: 'extra',
					component: '::div',
					children: [{
						name: 'format',
						component: 'Button',
						style:{marginRight: 6},
						type:'softly',
						children: '格式化',
						onClick: '{{$formatMeta}}'
					},{
						name: 'reset',
						component: 'Button',
						type:'softly',
						children: '重置',
						onClick: '{{$reset}}'
					}]
				},
				children: {
					name: 'meta',
					component: 'CodeMirror',

					value: '{{data.selectApp.meta}}',
					onChange: '{{$metaChange}}',
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true
					}
				}
			},/* {
				name: 'previewCard',
				component: 'Card',
				title: '预览',
				className: 'mk-app-devtools-modify-meta-content-preview',
				_isVisible:false,
				children: {
					name: 'preview',
					component: 'AppLoader',
					_isVisible: '{{!!$getPreviewAppName()}}',
					appName: `{{$getPreviewAppName()}}`
				}
			}*/]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			apps: [],
			selectApp: {}
		}
	}
}