import logo from './img/logo.png'

var _options = {
	goAfterLogout: {
		appName: 'mk-template-login',
		appParams: {}
	},
	menu: [{
		key: '1',
		name: 'about',
		app: 'mk-template-portal-about'
	}, {
		key: '2',
		name: 'apps',
		children: [{
			key: '201',
			name: 'app1',
			app: 'mk-template-portal-app1'
		}, {
			key: '202',
			name: 'app2',
			app: 'mk-template-portal-app2'
		}]
	}],
	menuDefaultSelectedKeys:['1'],
	menuDefaultOpenKeys:['2'],
	defaultContent:{
		appName: 'mk-template-portal-about',
        appParams:{}
	},
	logo
}

function config(options) {
	if (options) {
		_options = {..._options, ...options }
	}
}

config.getCurrent = () => _options

export default config