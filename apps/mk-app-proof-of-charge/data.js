export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-proof-of-charge',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-proof-of-charge-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'bluesky',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'bluesky',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}, {
					name: 'common',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$commonMenuClick}}',
						children: [{
							name: 'useCommon',
							component: 'Menu.Item',
							key: 'useCommon',
							children: '使用常用凭证'
						}, {
							name: 'saveCommon',
							component: 'Menu.Item',
							key: 'saveCommon',
							children: '保存为常用凭证'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						children: ['常用凭证', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-header-right',
				children: [{
					name: 'save',
					component: 'Button',
					type: 'showy',
					onClick: '{{$save}}',
					disabled: '{{!!data.form.isAudit}}',
					children: '保存'
				},{
					name: 'saveAndAdd',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$save}}',
					disabled: '{{!!data.form.isAudit}}',
					children: '保存并新增'
				}, {
					name: 'add',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$add}}',
					children: '新增'
				}, {
					name: 'audit',
					component: 'Button',
					type: 'bluesky',
					disabled: '{{!!data.form.isAudit || !data.form.id}}',
					onClick: '{{$audit}}',
					children: '审核'
				}, {
					name: 'more',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$moreMenuClick}}',
						children: [{
							name: 'del',
							component: 'Menu.Item',
							key: 'del',
							disabled: '{{!!data.form.isAudit || !data.form.id}}',
							children: '删除'
						}, {
							name: 'print',
							component: 'Menu.Item',
							key: 'print',
							children: '打印'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						children: ['更多', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}]
			}]
		}, {
			name: 'title',
			component: 'Layout',
			className: 'mk-app-proof-of-charge-title',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-title-left',
				children: [{
					name: 'audited',
					component: '::div',
					className: 'mk-app-proof-of-charge-title-left-tag',
					children: '已审核',
					_visible: '{{!!data.form.isAudit}}'
				}]
			}, {
				name: 'center',
				component: '::div',
				className: 'mk-app-proof-of-charge-title-center',
				children: {
					name: 'title',
					component: '::h1',
					children: '记账凭证'
				}
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-title-right',
			}]
		}, {
			name: 'formHeader',
			component: 'Layout',
			className: 'mk-app-proof-of-charge-form-header',
			children: [{
				name: 'code',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-form-header-code',
				children: ['计字第',{
					name: 'code',
					component: 'Input',
					value: '{{data.form.code}}',
					onChange: "{{(e)=>$sf('data.form.code',e.target.value)}}"
				},'号']
			},{
				name: 'date',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-form-header-date',
				children: ['日期',{
					name: 'date',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.date)}}',
					onChange: "{{(d)=>$sf('data.form.date',$momentToString(d,'YYYY-MM-DD'))}}",
				}]
			},{
				name: 'attachment',
				component: 'Layout',
				className: 'mk-app-proof-of-charge-form-header-attachment',
				children: ['附件数',{
					name: 'attachment',
					component: 'Input.Number',
					value: '{{data.form.attachment}}',
					onChange: "{{(v)=>$sf('data.form.attachment',v)}}"
				},'张',{
					name: 'link',
					component: 'Attachment',
					data: '{{data.form.attachmentFiles}}'
				}]
			}]
		}, {
			name: 'details',
			component: 'DataGrid',
			className: 'mk-app-proof-of-charge-form-details',
			headerHeight: 45,
			rowHeight: 45,
			footerHeight: 45,
			rowsCount: '{{data.form.details.length}}',
			enableSequence: true,
			enableAddDelrow: true,
			startSequence: 1,
			readonly: false,
			onAddrow: "{{$addRow('details')}}",
			onDelrow: "{{$delRow('details')}}",
			onKeyDown: '{{$gridKeydown}}',
			scrollToColumn: '{{data.other.detailsScrollToColumn}}',
			scrollToRow: '{{data.other.detailsScrollToRow}}',
			columns: [{
				name: 'abstract',
				component: 'DataGrid.Column',
				columnKey: 'abstract',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: [{
						name: 'label',
						component: '::label',
						children: '摘要'
					}]
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) }}",
					mode: 'combobox',
					value: `{{{
								if(!data.form.details[_rowIndex].abstract) return
								var ret = $isFocus(_ctrlPath)
									? (data.form.details[_rowIndex].abstract.name || data.form.details[_rowIndex].abstract)
									: (data.form.details[_rowIndex].abstract.name || data.form.details[_rowIndex].abstract)
								return ret
							}}}`,
					onChange: `{{$abstractChange(_rowIndex, data.form.details[_rowIndex], data.other.abstracts)}}`,
					onFocus: "{{$abstractFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						key: "{{ data.other.abstracts && data.other.abstracts[_lastIndex].id }}",
						children: '{{data.other.abstracts && data.other.abstracts[_lastIndex].name }}',
						_power: 'for in data.other.abstracts'
					},
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: '::span',
					children: "{{ $getTotal(data.form.details)}}"
				}
			}, {
				name: 'captionOfAccount',
				component: 'DataGrid.Column',
				columnKey: 'captionOfAccount',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: [{
						name: 'label',
						component: '::label',
						children: '会计科目'
					}]
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' mk-app-proof-of-charge-form-details-captionOfAccount'}}",
					showArrow:false,
					suffix:{
						name: 'link',
						component: '::a',
						children: '科目',
						onClick: "{{()=>alert('参考其他弹出画面实现')}}"
					},
					value: `{{{
								if(!data.form.details[_rowIndex].captionOfAccount) return
								return $isFocus(_ctrlPath)
									? data.form.details[_rowIndex].captionOfAccount.id
									: data.form.details[_rowIndex].captionOfAccount.name
							}}}`,
					onChange: `{{(v)=>{
								const hit = data.other.captionOfAccounts.find(o=>o.id==v)
								$sf('data.form.details.'+ _rowIndex + '.captionOfAccount', $fromJS(hit,null))
							}}}`,
					onFocus: "{{$captionOfAccountFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.captionOfAccounts && data.other.captionOfAccounts[_lastIndex].id }}",
						children: '{{data.other.captionOfAccounts && data.other.captionOfAccounts[_lastIndex].name }}',
						_power: 'for in data.other.captionOfAccounts'
					},
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
				},
			}, {
				name: 'debit',
				component: 'DataGrid.Column',
				columnKey: 'debit',
				width: 250,
				header: {
					name: 'header',
					component: 'MoneyCellHeader',
					title: '借方金额'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'MoneyCell'}}",
					className: "{{$getCellClassName(_ctrlPath) }}",
					value: "{{data.form.details[_rowIndex].debit}}",
					onChange: "{{(v)=>$sf('data.form.details.'+_rowIndex+'.debit', v)}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'MoneyCell',
					value: "{{$sum(data.form.details, 'debit')}}"
				}
			}, {
				name: 'credit',
				component: 'DataGrid.Column',
				columnKey: 'credit',
				width: 250,
				header: {
					name: 'header',
					component: 'MoneyCellHeader',
					title: '贷方金额'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'MoneyCell'}}",
					className: "{{$getCellClassName(_ctrlPath) }}",
					value: "{{data.form.details[_rowIndex].credit}}",
					onChange: "{{(v)=>$sf('data.form.details.'+_rowIndex+'.credit', v)}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'MoneyCell',
					value: "{{$sum(data.form.details, 'credit')}}"
				}
			}]
		}, {
			name: 'footer',
			component: 'Layout',
			className: 'mk-app-proof-of-charge-footer',
			children: [{
				name: 'creator',
				component: '::h3',
				children: '制单人:张三',
				style: { marginRight: 150 }
			}, {
				name: 'approver',
				component: '::h3',
				children: '审核人:李四'
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				details: [{}]
			},
			total: {
			},
			other: {
			}
		}
	}
}