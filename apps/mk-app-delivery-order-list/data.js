export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-delivery-order-list',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-delivery-order-list-header',
			children: [{
				name: 'right',
				component: 'Layout',
				className: 'mk-app-delivery-order-list-header-right',
				children: [{
					name: 'addSaleOrder',
					component: 'Button',
					type: 'showy',
					children: '新增销货单',
					onClick: '{{$add}}'
				}, {
					name: 'receipt',
					component: 'Button',
					type: 'bluesky',
					children: '收款',
					onClick: '{{$receipt}}'
				}, {
					name: 'batch',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$batchMenuClick}}',
						children: [{
							name: 'modify',
							component: 'Menu.Item',
							key: 'audit',
							children: '审核'
						}, {
							name: 'del',
							component: 'Menu.Item',
							key: 'del',
							children: '删除'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						
						children: ['批量', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}, {
					name: 'print',
					component: 'Button',
					className: 'mk-app-delivery-order-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'print',
					title: '打印',
					onClick: '{{$print}}'
				}, {
					name: 'export',
					component: 'Button',
					className: 'mk-app-delivery-order-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'upload',
					title: '导出',
					onClick: '{{$exp}}'
				}, {
					name: 'setting',
					component: 'Button',
					className: 'mk-app-delivery-order-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'setting',
					title: '设置',
					onClick: '{{$setting}}'
				}]
			}]
		}, {
			name: 'commonFilter',
			component: 'Layout',
			className: 'mk-app-delivery-order-list-baseFilter',
			
			children: [{
				name: 'internal',
				component: 'Radio.Group',
				value: '{{data.filter.common}}',
				onChange: `{{$commonFilterChange}}`,
				children: [{
					name: 'all',
					value: 'all',
					component: 'Radio.Button',
					children: '全部'
				}, {
					name: 'today',
					value: 'today',
					component: 'Radio.Button',
					children: '今天'
				}, {
					name: 'yesterday',
					value: 'yesterday',
					component: 'Radio.Button',
					children: '昨天'
				}, {
					name: 'thisWeek',
					value: 'thisWeek',
					component: 'Radio.Button',
					children: '本周'
				}, {
					name: 'lastWeek',
					value: 'lastWeek',
					component: 'Radio.Button',
					children: '上周'
				}, {
					name: 'thisMonth',
					value: 'thisMonth',
					component: 'Radio.Button',
					children: '本月'
				}, {
					name: 'lastMonth',
					value: 'lastMonth',
					component: 'Radio.Button',
					children: '上月'
				}, {
					name: 'thisYear',
					value: 'thisYear',
					component: 'Radio.Button',
					children: '本年'
				}]
			}, {
				name: 'fold',
				component: 'Icon',
				showStyle: 'softly',
				type: `{{!data.other.isFold ?  'down': 'right'}}`,
				style: {fontSize: 20},
				onClick: '{{$toggleShowAdvanceFilter}}',
			}],
		}, {
			name: 'advanceFilter',
			component: 'Layout',
			className: 'mk-app-delivery-order-list-advanceFilter',
			_visible: '{{!data.other.isFold}}',
			children: [{
				name: 'form',
				component: 'Form',
				className: 'mk-app-delivery-order-list-advanceFilter-form',
				children: [{
					name: 'dateItem',
					component: 'Form.Item',
					label: '日期',
					children: [{
						name: 'beginDate',
						component: 'DatePicker.RangePicker',
						value: '{{data.other.momentDates}}',
						onChange: `{{(moments,strs)=>$sfs({
							'data.filter.dates': strs,
							'data.other.momentDates': moments
						})}}`
					}]

				}, {
					name: 'customerItem',
					component: 'Form.Item',
					label: '客户',
					children: [{
						name: 'customer',
						component: 'Select',
						showSearch: false,
						value: '{{data.filter.customer && data.filter.customer.id }}',
						onChange: "{{$customerChange}}",
						children: {
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.customers && data.other.customers[_rowIndex].id }}",
							children: '{{data.other.customers && data.other.customers[_rowIndex].name }}',
							_power: 'for in data.other.customers'
						}
					}]
				}, {
					name: 'codeItem',
					component: 'Form.Item',
					label: '单据编码',
					children: [{
						name: 'code',
						component: 'Input',
						value: '{{data.filter.code}}',
						onBlur: `{{(e)=>$sf('data.filter.code', e.target.value)}}`,
					}]
				}, {
					name: 'search',
					component: 'Button',
					type: 'bluesky',
					children: '查询',
					onClick: '{{$search}}'
				}]
			}]
		}, {
			name: 'tabs',
			component: 'Tabs',
			className: 'mk-app-delivery-order-list-tabs',
			type: 'card',
			activeKey: '{{data.filter.targetList}}',
			onChange: '{{$tabChange}}',
			children: [{
				name: 'all',
				component: 'Tabs.TabPane',
				key: 'all',
				tab: '全部'
			}, {
				name: 'unaudit',
				component: 'Tabs.TabPane',
				key: 'unaudit',
				tab: `{{'未审核(' + data.total.unauditCount + ')'}}`
			}, {
				name: 'unpaid',
				component: 'Tabs.TabPane',
				key: 'unpaid',
				tab: `{{'未收完款(' + data.total.unpaidCount + ')'}}`
			}, {
				name: 'paid',
				component: 'Tabs.TabPane',
				key: 'paid',
				tab: '已收款'
			}]
		}, {
			name: 'content',
			className: 'mk-app-delivery-order-list-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				footerHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.pagination.current-1)*data.pagination.pageSize + 1}}',
				sequenceFooter: {
					name: 'footer',
					component: 'DataGrid.Cell',
					children: '汇总'
				},
				rowsCount: "{{data.list ? data.list.length : 0}}",

				columns: [{
					name: 'select',
					component: 'DataGrid.Column',
					columnKey: 'select',
					width: 40,
					fixed: true,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: {
							name: 'cb',
							component: 'Checkbox',
							checked: "{{$isSelectAll('dataGrid')}}",
							onChange: "{{$selectAll('dataGrid')}}"
						}
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'checkbox',
							component: 'Checkbox',
							checked: '{{data.list[_rowIndex].selected}}',
							onChange: "{{ (e, option) => $setField('data.list.' + _rowIndex + '.selected', e.target.checked ) }}",
						}
					}
				}, {
					name: 'oprate',
					component: 'DataGrid.Column',
					columnKey: 'oprate',
					fixed: true,
					width: 80,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: ''
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: [{
							name: 'audit',
							component: 'Icon',
							showStyle: 'softly',
							fontFamily: 'mkicon',
							type: 'audit',
							disabled: '{{!!data.list[_rowIndex].isAudit}}',
							style: {
								fontSize: 22
							},
							title: '审核',
							onClick: '{{$audit(data.list[_rowIndex].id)}}'
						}, {
							name: 'reject',
							component: 'Icon',
							showStyle: 'softly',
							fontFamily: 'mkicon',
							type: 'reject',
							disabled: '{{!data.list[_rowIndex].isAudit}}',
							style: {
								fontSize: 22
							},
							title: '反审核',
							onClick: '{{$reject(data.list[_rowIndex].id)}}'
						}, {
							name: 'del',
							component: 'Icon',
							showStyle: 'showy',
							type: 'close',
							style: {
								fontSize: 18
							},
							title: '删除',
							onClick: '{{$del(data.list[_rowIndex].id)}}'
						}]
					}
				}, {
					name: 'code',
					component: 'DataGrid.Column',
					columnKey: 'code',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '单据编码'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'link',
							component: '::a',
							children: '{{data.list[_rowIndex].code}}',
							onClick: '{{$modify(data.list[_rowIndex].id)}}'
						},
					},
				}, {
					name: 'ticketType',
					component: 'DataGrid.Column',
					columnKey: 'ticketType',
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '发票类型'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: "{{data.list[_rowIndex].ticketType && data.list[_rowIndex].ticketType.name }}",
					}
				}, {
					name: 'receiptNumber',
					component: 'DataGrid.Column',
					columnKey: 'receiptNumber',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '收款单号'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].receiptNumber}}',
					},
				}, {
					name: 'voucherNO',
					component: 'DataGrid.Column',
					columnKey: 'voucherNO',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '凭证号'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].voucherNO}}',
					},
				}, {
					name: 'date',
					component: 'DataGrid.Column',
					columnKey: 'date',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '单据日期'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].date}}',
					},
				}, {
					name: 'customer',
					component: 'DataGrid.Column',
					columnKey: 'department',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '客户'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-left',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].customer && data.list[_rowIndex].customer.name}}',
					},
				}, {
					name: 'amount',
					component: 'DataGrid.Column',
					columnKey: 'amount',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '金额汇总'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].amount,2)}}',
					},
					footer: {
						name: 'footer',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						children: '{{$numberFormat(data.total.amount,2)}}'
					}
				}, {
					name: 'priceTaxTotal',
					component: 'DataGrid.Column',
					columnKey: 'priceTaxTotal',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '价税合计汇总'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].priceTaxTotal,2)}}',
					},
					footer: {
						name: 'footer',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						children: '{{$numberFormat(data.total.priceTaxTotal,2)}}'
					}
				}, {
					name: 'paidAmount',
					component: 'DataGrid.Column',
					columnKey: 'paidAmount',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '已收款金额'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].paidAmount,2)}}',
					},
					footer: {
						name: 'footer',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						children: '{{$numberFormat(data.total.paidAmount,2)}}'
					}
				}, {
					name: 'unpaidAmount',
					component: 'DataGrid.Column',
					columnKey: 'unpaidAmount',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '未付款金额'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].unpaidAmount,2)}}',
					},
					footer: {
						name: 'footer',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-right',
						children: '{{$numberFormat(data.total.unpaidAmount,2)}}'
					}
				}, {
					name: 'isAudit',
					component: 'DataGrid.Column',
					columnKey: 'isAudit',
					flexGrow: 1,
					width: 30,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '审核'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: `{{data.list[_rowIndex].isAudit ? '是': '否'}}`,
					},
				}, {
					name: 'memo',
					component: 'DataGrid.Column',
					columnKey: 'memo',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '备注'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'mk-app-delivery-order-list-cell-left',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].memo}}',
					},
				}]
			}]
		}, {
			name: 'footer',
			className: 'mk-app-delivery-order-list-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				showSizeChanger: true,
				pageSize: '{{data.pagination.pageSize}}',
				current: '{{data.pagination.current}}',
				total: '{{data.pagination.total}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
	}
}


export function getInitState() {
	return {
		data: {
			list: [],
			pagination: { current: 1, total: 0, pageSize: 20 },
			filter: {
				common: 'all',
				targetList: 'all'
			},
			total: {
				allCount: 0,
				unauditCount : 0,
				unpaidCount: 0,
				paidCount: 0
			},
			other: { 
				isFold: true
			 }
		}
	}
}
