export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-home-shortcuts',
		children: [{
			name: 'list',
			component: '::div',
			onClick: '{{$openList}}',
			children: [{
				name: 'img',
				component: '::img',
				src: '{{$getFunImg()}}'
			}, {
				name: 'text',
				component: '::a',
				children: '列表'
			}]
		}, {
			name: 'card',
			component: '::div',
			onClick: '{{$openCard}}',
			children: [{
				name: 'img',
				component: '::img',
				src: '{{$getFunImg()}}'
			}, {
				name: 'text',
				component: '::a',
				children: '卡片'
			}]
		}, {
			name: 'voucher',
			component: '::div',
			onClick: '{{$openVoucher}}',
			children: [{
				name: 'img',
				component: '::img',
				src: '{{$getFunImg()}}'
			}, {
				name: 'text',
				component: '::a',
				children: '单据'
			}]
		}, {
			name: 'complexTable',
			component: '::div',
			onClick: '{{$openComplexTable}}',
			children: [{
				name: 'img',
				component: '::img',
				src: '{{$getFunImg()}}'
			}, {
				name: 'text',
				component: '::a',
				children: '复杂表格'
			}]
		}, {
			name: 'editableTable',
			component: '::div',
			onClick: '{{$openEditableTable}}',
			children: [{
				name: 'img',
				component: '::img',
				src: '{{$getFunImg()}}'
			}, {
				name: 'text',
				component: '::a',
				children: '可编辑表格'
			}]
		}]
	}
}

	export function getInitState() {
		return {
			data: {
				content: 'hello world'
			}
		}
	}