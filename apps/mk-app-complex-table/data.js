export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-complex-table',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-complex-table-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-complex-table-header-left',
				children: ['收支类型:', {
					name: 'inoutType',
					component: 'Select',
					allowClear: true,
					value: '{{data.filter.inoutType}}',
					onChange: '{{$inoutTypeChange}}',
					children: [{
						name: 'option1',
						component: 'Select.Option',
						value: '0',
						children: '收入'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '1',
						children: '支出'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '2',
						children: '成本、折旧和摊销'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '3',
						children: '存取现金、内部账户互转'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '4',
						children: '付款、收款'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '5',
						children: '请会计处理'
					}]
				}, 	'日期:', {
						name: 'birthdayRange',
						component: 'DatePicker.RangePicker',
						format: 'YYYY-MM-DD',
						value: '{{$getBirthdayRange()}}',
						onChange: '{{$birthdayRangeChange}}'
					}, {
						name: 'clear',
						component: 'Button',
						type: 'softly',
						children: '清空条件',
						onClick: '{{$clearFilter}}'
					}]
			}]
		}, {
			name: 'content',
			className: 'mk-app-complex-table-content',
			component: 'Layout',
			children: [{
				name: 'table',
				component:'Table',
				pagination:false,
				scroll:{x: true, y: true },
				bordered:true,
				width:true,
				dataSource:'{{data.list}}',
				columns:[{
					title:'收支项',
					// fixed: 'left' ,
					children:[{
						title:'收支A',
						key:'inoutNameA',
						width:100,
						render:'{{$rowSpan}}',

						dataIndex:'inoutName',
					},{
						title:'收支B',
						key:'inoutNameB',
						width:100,
						dataIndex:'inoutName',
					}]
				},{
					title:'编码一级',
					key:'code1',
					width:100,
					// fixed: 'left' ,
					dataIndex:'code1'
				},{
					title:'编码二级',
					key:'code2',
					width:100,
					// fixed: 'left' ,
					dataIndex:'code2'
				},
				{
					title:'编码三级',
					key:'code3',
					width:100,
					// fixed: 'left' ,
					dataIndex:'code3'
				},
				{
					title:'业务类型',
					key:'bizType',
					width:100,
					// fixed: 'left' ,
					dataIndex:'bizType'
				},{
					title:'票据类型',
					key:'invoiceType',
					width:150,
					// fixed: 'left' ,
					dataIndex:'invoiceType'
				},{
					title:'银行账号',
					key:'bankAccount',
					width:200,

					dataIndex:'bankAccount'
				},{
					title:'票据号',
					key:'invoiceNum',
					width:100,

					dataIndex:'invoiceNum'
				},{
					title:'罚款性质',
					key:'fineNature',
					width:100,

					dataIndex:'fineNature'
				},{
					title:'借款期限',
					key:'loanPeriod ',
					width:100,

					dataIndex:'loanPeriod'
				},{
					title:'摘要',
					key:'abstract',
					width:100,

					dataIndex:'abstract'
				},{
					title:'项目名称',
					key:'project',
					width:100,

					dataIndex:'projectName'
				},{
					title:'票据编码',
					key:'invoiceCode',
					width:100,

					dataIndex:'invoiceCode'
				},{
					title:'一般纳税人税率',
					key:'taxRate1',
					width:120,

					dataIndex:'taxRate1'
				}]
			}]

		}, {
			name: 'footer',
			className: 'mk-app-complex-table-footer',
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
