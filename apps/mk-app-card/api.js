export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-card',
		children:[{
			name: 'header',
			component:'Layout',
			className:'mk-app-card-header',
			children:[{
				name:'left',
				component:'Layout',
				className:'header-left'
			},{
				name:'right',
				component:'Layout',
				className:'mk-app-card-header-right'
			}]
		},{
			name:'content',
			component:'Layout',
			className:'mk-app-card-content',
			children:[{
				name:'form',
				component:'Form',
				className:'mk-app-card-content-form',
				children:[{
					name:'nameItem',
					component:'Form.Item',
					label:'姓名',
					required: true,
					hasFeedback:true,
					validateStatus: '{{$checkName().status}}',
					help:'{{$checkName().message}}',
					children:[{
						name:'name',
						component:'Input',
						value:'{{data.form.name}}',
						onChange:"{{(e)=>$setField('data.form.name',e.target.value)}}"
					}]
				},{
					name:'sexItem',
					component:'Form.Item',
					label:'性别',
					required: true,
					children:[{
						name:'sex',
						component:'Select',
						showSearch:false,
						value:'{{data.form.sex}}',
						onChange:"{{(v)=>$setField('data.form.sex', v)}}",
						children: [{
							name: 'man',
							component: 'Select.Option',
							value: '0',
							children: '男'
						}, {
							name: 'woman',
							component: 'Select.Option',
							value: '1',
							children: '女'
						}]
					}]
				},{
					name:'mobileItem',
					component:'Form.Item',
					label:'手机',
					required: true,
					hasFeedback: true,
					validateStatus: '{{$checkMobile().status}}',
					help:'{{$checkMobile().message}}',
					children:[{
						name:'mobile',
						component:'Input.Number',
						value:'{{data.form.mobile}}',
						onChange:"{{(v)=>$setField('data.form.mobile', v)}}"
					}]
				},{
					name:'birthdayItem',
					component:'Form.Item',
					label:'生日',
					required: true,
					children:[{
						name:'birthday',
						component:'DatePicker',
						value:'{{data.form.birthday}}',
						onChange:"{{(d)=>$setField('data.form.birthday',d)}}"
					}]
				},{
					name:'addressItem',
					component:'Form.Item',
					label:'地址',
					children:[{
						name:'address',
						component:'Input',
						value:'{{data.form.address}}',
						onChange:"{{(e)=>$setField('data.form.address',e.target.value)}}"
					}]
				},{
					name:'btns',
					component:'Form.Item',
					label:'',
					children:[{
						name:'save',
						component:'Button',
						children:'保存',
						type:'primary',
						style:{marginRight:10, width:100},
						onClick:'{{$save}}'
					},{
						name:'reset',
						component:'Button',
						style:{width:100},
						children:'重置'
					}]
				}]
			}]

		}]
	}
}