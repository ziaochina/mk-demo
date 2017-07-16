export function getMeta(){
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-template-portal',
		children: [{
			name: 'header',
			component:'Layout',
			className:'header',
			children:[{
				name:'left',
				component:'Layout',
				className:'header-left',
				children:[{
					name:'logo',
					component:'::img',
					className: 'header-left-logo',
					src:'{{$getLogo()}}'
				},{
					name:'siteName',
					component:'::h1',
					children:'Monkey King'
				}]
			},{
				name:'right',
				component:'Layout',
				className:'header-right',
				children:[{
					name:'notification',
					component:'Icon',
					type:'notification'
				},{
					name:'setting',
					component:'Icon',
					type:'setting'
				},{
					name:'photo',
					component:'::img',
					className: 'header-right-photo',
					src:'{{$getPhoto()}}'
				},{
					name:'my',
					component: 'Dropdown',
					overlay: {
						name:'myMenu',
						component:'Menu',
						onClick:'{{$myMenuClick}}',
						children:[{
							name:'logout',
							component:'Menu.Item',
							key:'logout',
							children:'logout'
						}]
					},
					children:{
						name:'me',
						component:'::a',
						style:{fontSize:15},
						children:'monkey king'
					}
				}]
			}]
		},{
			name:'content',
			component:'Layout',
			className:'content',
			children:[{
				name:'left',
				component:'Layout',
				className:'content-left',
				children:[{
					name:'menu',
					component:'Menu',
					mode:'inline',
					theme:'dark',
					defaultSelectedKeys:"{{data.menuDefaultSelectedKeys}}",
          			defaultOpenKeys:"{{data.menuDefaultOpenKeys}}",
					onClick:'{{$menuClick}}',
					children:'{{$getMenuChildren()}}'
				}]
			},{
				name:'main',
				component:'Layout',
				className:'content-main',
				children:{
		        	name:'app',
		        	component:'AppLoader',
		        	appName:'{{data.content.appName}}',
		        	'...': '{{data.content.appParams}}'
        		}
			}]
		}]
	}
}



