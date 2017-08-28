export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-report',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-report-header',
			_visible: false
		}, {
			name: 'content',
			className: 'mk-app-report-content',
			component: 'Layout',
			children: [{
				name: 'report',
				component: 'Table',
				pagination: false,
				//scroll: { x: true, y: true },
				bordered: true,
				width: true,
				dataSource: '{{data.reportDS}}',
				columns: [{
					title: '部门',
					rowSpan: 3,
					children: [{
						colSpan: 0,
						rowSpan: 2,
						dataIndex: 'dept1',
						render: "{{$cellRender('dept1')}}"
					}, {
						title: '2级',
						colSpan: 0,
						rowSpan: 2,
						dataIndex: 'dept2',
						render: "{{$cellRender('dept2')}}"
					}, {
						title: '3级',
						colSpan: 0,
						rowSpan: 2,
						dataIndex: 'dept3',
						render: "{{$cellRender('dept3')}}"
					}]

				}, {
					title: '期初人数',
					dataIndex: 'beginPersonCount',
					render: "{{$cellRender('beginPersonCount')}}"
				}, {
					title: '期末人数',
					dataIndex: 'endPersonCount',
					render: "{{$cellRender('endPersonCount')}}"
				}, {
					title: '平均人数',
					dataIndex: 'averagePersonCount',
					render: "{{$cellRender('averagePersonCount')}}"
				}, {
					title: '入职',
					children: [{
						title: '人数',
					}, {
						title: '入职率%',
					}]

				}, {
					title: '离职',
					children: [{
						title: '人数',
					}, {
						title: '入职率%',
					}]
				}, {
					title: '学历层次',
					children: [{
						title: '研究生',
						children: [{
							title: '人数',
						}, {
							title: '占比',
						}]
					}, {
						title: '本科',
						children: [{
							title: '人数',
						}, {
							title: '占比',
						}]
					}, {
						title: '专科',
						children: [{
							title: '人数',
						}, {
							title: '占比',
						}]
					}]
				}, {
					title: '备注'
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			reportDS: []
		}
	}
}