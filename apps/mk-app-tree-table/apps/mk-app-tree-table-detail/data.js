import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-tree-table-detail',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'mk-app-tree-table-detail-form',
			children: [{
				name: 'codeItem',
				component: 'Form.Item',
				label: '编码',
				required: true,
				validateStatus: "{{data.other.error.code?'error':'success'}}",
				help: '{{data.other.error.code}}',
				children: [{
					name: 'code',
					component: 'Input',
					value: '{{data.form.code}}',
					onChange: "{{(e)=>$fieldChange('data.form.code',e.target.value)}}"
				}]
			},{
				name: 'nameItem',
				component: 'Form.Item',
				label: '商品',
				required: true,
				validateStatus: "{{data.other.error.name?'error':'success'}}",
				help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: "{{(e)=>$fieldChange('data.form.name',e.target.value)}}"
				}]
			}]
		}]
	}
}


export function getInitState() {
	var state = {
		data: {
			form: {
				name: '',
			},
			other: {
				error: {}
			}
		}
	}
	return state
}