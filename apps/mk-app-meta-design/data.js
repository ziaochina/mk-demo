export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-meta-design',
		children: [{
			name: 'top',
			component: 'Layout',
			className: 'mk-app-meta-design-top',
			children: [{
				name: 'meta',
				component: 'Layout',
				className: 'mk-app-meta-design-top-meta',
				children: [{
					name: 'metaTitle',
					component: '::div',
					className: 'mk-app-meta-design-title',
					children: [{
						name: 'text',
						component: '::div',
						children: '元数据(Meta)'
					}, {
						name: 'formatMeta',
						component: 'Button',
						onClick: '{{$formatMeta}}',
						type: 'softly',
						children: '格式化'
					}]
				}, {
					name: 'meta',
					component: 'CodeMirror',
					value: '{{data.uiMeta}}',
					onChange: '{{$metaChange}}',
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true
					}
				}]
			}, {
				name: 'state',
				component: 'Layout',
				className: 'mk-app-meta-design-top-state',
				children: [{
					name: 'stateTitle',
					component: '::div',
					className: 'mk-app-meta-design-title',
					children: [{
						name: 'text',
						component: '::div',
						children: '初始化状态(State)'
					}, {
						name: 'formatState',
						component: 'Button',
						onClick: '{{$formatState}}',
						type: 'softly',
						children: '格式化'

					}]
				}, {
					name: 'state',
					component: 'CodeMirror',
					value: '{{data.uiData}}',
					onChange: '{{$dataChange}}',
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true
					}
				}]
			}, {
				name: 'style',
				component: 'Layout',
				className: 'mk-app-meta-design-top-style',
				children: [{
					name: 'styleTitle',
					component: '::div',
					className: 'mk-app-meta-design-title',
					children: [{
						name: 'text',
						component: '::div',
						children: '样式(Less)'
					}, {
						name: 'formatState',
						component: 'Button',
						onClick: '{{$formatStyle}}',
						type: 'softly',
						children: '格式化'

					}]
				}, {
					name: 'state',
					component: 'CodeMirror',
					value: '{{data.uiStyle}}',
					onChange: '{{$styleChange}}',
					options: {
						mode: 'text/x-less',
						theme: 'material',
						lineNumbers: true
					}
				}]
			}]
		}, {
			name: 'bottom',
			component: 'Layout',
			className: 'mk-app-meta-design-bottom',
			children: [{
				name: 'title',
				component: '::div',
				className: 'mk-app-meta-design-title',
				children: [{
					name: 'text',
					component: '::div',
					children: '预览'
				}]
			}, {
				name: 'container',
				component: 'Layout',
				className: 'mk-app-meta-design-app',
				children: {
					name: 'preview',
					component: 'AppLoader',
					appName: 'mk-app-meta-design-preview',
					'...': '{{$getAppProps()}}'
				}
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			uiMeta: `{
				name: "root",
				component: "::div",
				className: "meta-design-app-test",
				children: [{
					className: "meta-design-app-test-hello",
					name: "hello",
					component: "::div",
					children: "{{data.content}}"
				},{
					name: "btn",
					component: "Button",
					type: "primary",
					children: "我是按钮"
				}]
			}`,
			uiData: `{
				"content": "hello world"
			}`,
			uiStyle: `.meta-design-app-test{
				width: 100%;
				height:100%;
				&-hello{
					color:red
				}
				
			}`,
			other: {
				error: {}
			}

		}
	}
}