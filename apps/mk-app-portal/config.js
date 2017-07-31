import logo from './img/logo.png'
import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogout: {
		appName: 'mk-app-login',
		appParams: {}
	},
	menu: [{
		key: '1',
		name: 'about',
		appName: 'mk-app-portal-about',
		isDefault: true
	}, {
		key: '2',
		name: 'apps',
		isExpand:true,
		children: [{
			key: '201',
			name: 'app1',
			appName: 'mk-app-portal-app1'
		}, {
			key: '202',
			name: 'app2',
			appName: 'mk-app-portal-app2'
		}]
	}],
	logo
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config