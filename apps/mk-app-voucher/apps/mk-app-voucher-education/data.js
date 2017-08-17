import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-voucher-education',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'mk-app-voucher-education-form',
			children: [{
				name: 'nameItem',
				component: 'Form.Item',
				label: '学历',
				required: true,
				hasFeedback: true,
				validateStatus: '{{$checkName().status}}',
				help: '{{$checkName().message}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: "{{(e)=>$sf('data.form.name',e.target.value)}}"
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
			}
		}
	}
	return state
}