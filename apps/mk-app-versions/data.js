export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-versions',
		children: [{
			name: 'hello',
			component: 'Timeline',
			_visible:'{{!!data.versions}}',
			children: [{
				name: 'versionItem',
				component: 'Timeline.Item',
				_power:'for in data.versions',
				children: [{
					name: 'content',
					component: '::div',
					children: [{
						name: 'version',
						component: '::h2',
						children:'{{data.versions[_rowIndex].version}}'
					},{
						name: 'date',
						component: '::p',
						children:{
							name:'date',
							component:'::code',
							children:'{{data.versions[_rowIndex].date}}'
						},
					},{
						name: 'list',
						component: '::ul',
						children:[{
							name: 'li',
							component:'::li',
							children:'{{data.versions[_rowIndex].items[_vars[1]]}}',
							_power:'for in data.versions._rowIndex.items'
						}]
					}]
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			//versions: []
		}
	}
}