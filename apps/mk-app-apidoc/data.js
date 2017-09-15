export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-apidoc',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'mk-app-apidoc-left',
			title: '分组',
			children: [{
				name: 'tree',
				component: 'Tree',
				selectedKeys: '{{[data.filter.group]}}',
				onSelect: '{{$selectGroup}}',
				children: '{{$loopTreeChildren(data.groups)}}'
			}]
		}, {
			name: 'content',
			className: 'mk-app-apidoc-content',
			component: 'Card',
			extra: {
				name: 'header',
				component: 'Layout',
				className: 'mk-app-apidoc-content-header',
				children: [{
					name: 'search',
					placeholder: "请输入部分url、标题搜索api",
					component: 'Input.Search',
					value: '{{data.filter.search}}',
					onChange: '{{$searchChange}}'
				}]
			},
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				className: 'mk-app-apidoc-content-grid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				rowsCount: '{{data.apis.length}}',
				onRowClick: '{{$rowClick}}',
				columns: [{
					name: 'url',
					component: 'DataGrid.Column',
					columnKey: 'url',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'url',
						component: 'DataGrid.Cell',
						children: 'URL'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.apis[_rowIndex].url}}',
					}
				}, {
					name: 'title',
					component: 'DataGrid.Column',
					columnKey: 'title',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '标题'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.apis[_rowIndex].title}}',
					}
				}, {
					name: 'group',
					component: 'DataGrid.Column',
					columnKey: 'group',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '分组'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: '{{$getCellClassName(_rowIndex)}}',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.apis[_rowIndex].group}}',
					}
				}]
			}, {
				name: 'detail',
				component: 'Layout',
				className: 'mk-app-apidoc-content-detail',
				_visible: '{{!!data.currentApi.url}}',
				children: [{
					name: 'tabs',
					component: 'Tabs',
					type: 'card',
					size: 'small',
					tabBarExtraContent: {
						name: 'extra',
						component: '::h3',
						children: '{{data.currentApi.url}}',
					},
					activeKey: '{{data.currentTabKey}}',
					onChange: '{{$tabChange}}',
					children: [{
						name: 'base',
						component: 'Tabs.TabPane',
						key: 'base',
						tab: '基本情况'
					}, {
						name: 'paramExample',
						component: 'Tabs.TabPane',
						_visible: '{{ data.currentApi.parameter }}',
						key: "{{'requestExample' + _rowIndex}}",
						tab: "{{data.currentApi.parameter.examples[_rowIndex].title}}",
						_power: 'for in data.currentApi.parameter.examples'
					}, {
						name: 'successExample',
						component: 'Tabs.TabPane',
						_visible: '{{ data.currentApi.success }}',
						key: "{{'successExample' + _rowIndex}}",
						tab: "{{data.currentApi.success.examples[_rowIndex].title}}",
						_power: 'for in data.currentApi.success.examples'
					}, {
						name: 'run',
						component: 'Tabs.TabPane',
						key: 'run',
						tab: '运行测试',
					}]
				}, {
					name: 'base',
					component: '::div',
					className: 'mk-app-apidoc-content-detail-main',
					_visible: "{{data.currentTabKey == 'base'}}",
					children: [{
						name: 'url',
						component: '::p',
						children: "{{'URL：'+ data.currentApi.url}}"
					}, {
						name: 'title',
						component: '::p',
						children: "{{'标题：'+ data.currentApi.title}}"
					}, {
						name: 'group',
						component: '::p',
						children: "{{'分组：'+ data.currentApi.group}}"
					}, {
						name: 'description',
						component: '::p',
						children: "{{'描述：'+ data.currentApi.description}}"
					}]
				}, {
					name: 'requestExample0',
					component: 'CodeMirror',
					className: 'mk-app-apidoc-content-detail-main',
					_visible: "{{data.currentTabKey == 'requestExample0'}}",
					value: `{{{
						return data.currentApi
							&& data.currentApi.parameter
							&& data.currentApi.parameter.examples
							&& data.currentApi.parameter.examples[0]
							&& data.currentApi.parameter.examples[0].content
					}}}`,
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true,
						readOnly: true,
					},
				}, {
					name: 'requestExample1',
					component: 'CodeMirror',
					className: 'mk-app-apidoc-content-detail-main',
					_visible: "{{data.currentTabKey == 'requestExample1'}}",
					value: `{{{
						return data.currentApi
							&& data.currentApi.parameter
							&& data.currentApi.parameter.examples
							&& data.currentApi.parameter.examples[1]
							&& data.currentApi.parameter.examples[1].content
					}}}`,
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true,
						readOnly: true,
					}
				}, {
					name: 'successExample0',
					component: 'CodeMirror',
					className: 'mk-app-apidoc-content-detail-main',
					_visible: "{{data.currentTabKey == 'successExample0'}}",
					value: `{{{
						return data.currentApi
							&& data.currentApi.success
							&& data.currentApi.success.examples
							&& data.currentApi.success.examples[0]
							&& data.currentApi.success.examples[0].content
					}}}`,
					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true,
						readOnly: true,
					}
				}, {
					name: 'successExample1',
					component: 'CodeMirror',
					className: 'mk-app-apidoc-content-detail-main',
					_visible: "{{data.currentTabKey == 'successExample1'}}",
					value: `{{{
						return data.currentApi
							&& data.currentApi.success
							&& data.currentApi.success.examples
							&& data.currentApi.success.examples[1]
							&& data.currentApi.success.examples[1].content
					}}}`,

					options: {
						mode: 'javascript',
						theme: 'material',
						lineNumbers: true,
						readOnly: true,
					}
				}, {
					name: 'run',
					component: 'Layout',
					className: 'mk-app-apidoc-content-detail-main mk-app-apidoc-content-detail-run',
					_visible: "{{data.currentTabKey == 'run'}}",
					children: [{
						name: 'url',
						component: 'Layout',
						className: ' mk-app-apidoc-content-detail-run-url',
						children: ['URL：',{
							name: 'url',
							component: 'Input',
							value: '{{data.runUrl}}',
							onChange: "{{(e)=>$sf('data.runUrl', e.target.value)}}"
						}]
					},{
						name: 'params',
						component: 'Layout',
						className: ' mk-app-apidoc-content-detail-run-params',
						children: [{
							name: 'title',
							component: '::div',
							children: '参数：'
						}, {
							name: 'code',
							component: 'CodeMirror',
							onChange: '{{$runParamsChange}}',
							value: '{{data.runParams}}',
							options: {
								mode: 'javascript',
								theme: 'material',
								lineNumbers: true
							}
						}]

					}, {
						name: 'oprate',
						component: 'Layout',
						className: ' mk-app-apidoc-content-detail-run-oprate',
						children: [{
							name: 'runBtn',
							component: 'Button',
							type: 'softly',
							children: '运行',
							onClick: '{{$run}}'
						}]

					}, {
						name: 'result',
						component: 'Layout',
						className: ' mk-app-apidoc-content-detail-run-return',
						children: [{
							name: 'title',
							component: '::div',
							children: '返回：'
						}, {
							name: 'code',
							component: 'CodeMirror',
							value: '{{data.runResult}}',
							options: {
								mode: 'javascript',
								theme: 'material',
								lineNumbers: true,
								readOnly: true,
							}
						}]

					},]
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			apis: [],
			groups: [],
			currentApi: {},
			filter: {
				group: undefined,
				search: undefined
			}
		}
	}
}