export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-hot-modify-app',
		children: [{
			name: 'left',
			component: 'Layout',
			className: 'mk-app-hot-modify-app-left',
			children: [{
				name: 'search',
				component: 'Input.Search',
				placeholder: "请输入app name过滤",
				value: '{{data.search}}',
				onChange: '{{$searchChange}}'
			}, {
				name: 'apps',
				component: 'Tree',
				onSelect: '{{$appSelected}}',
				selectedKeys: '{{[data.selectApp.name]}}',
				_visible: '{{data.apps && data.apps.length > 0}}',
				children: [{
					name: 'app',
					component: 'Tree.TreeNode',
					key: '{{data.apps[_rowIndex].name}}',
					title: '{{data.apps[_rowIndex].name}}',
					_power: 'for in data.apps'
				}]
			}]
		}, {
			name: 'content',
			component: 'Layout',
			className: 'mk-app-hot-modify-app-content',
			children: [{
				name: 'card',
				component: 'Card',
				className: 'mk-app-hot-modify-app-content-main',
				title: {
					name: 'type',
					component: 'Radio.Group',
					value: '{{data.selectType}}',
					onChange: '{{$typeChange}}',
					children: [{
						name: 'meta',
						component: 'Radio.Button',
						value: 'meta',
						children: '元数据(meta)'
					}, {
						name: 'state',
						component: 'Radio.Button',
						value: 'state',
						children: '当前状态(state)'
					}]
				},
				extra: {
					name: 'extra',
					component: '::div',
					children: [{
						name: 'format',
						component: 'Button',
						style: { marginRight: 6 },
						type: 'softly',
						children: '格式化',
						onClick: '{{$formatJson}}'
					}, {
						name: 'reset',
						component: 'Button',
						_visible: "{{data.selectType == 'meta'}}",
						type: 'softly',
						children: '重置',
						onClick: '{{$reset}}'
					}]
				},
				children: [{
					name: 'json',
					component: 'CodeMirror',
					value: '{{data.currentJson}}',
					onChange: '{{$jsonChange}}',
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true,
						inputStyle: 'textarea'

					}
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			apps: [],
			selectApp: {},
			search: '',
			other: {}
		}
	}
}