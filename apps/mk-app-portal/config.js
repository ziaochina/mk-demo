import logo from './img/logo.png'

var _options = {
	goAfterLogout: {
		appName: 'mk-app-login',
		appParams: {}
	},
	menu: [{
		key: '1',
		name: 'about',
		app: 'mk-app-portal-about'
	}, {
		key: '2',
		name: 'apps',
		children: [{
			key: '201',
			name: 'list',
			app: 'mk-app-list'
		}, {
			key: '202',
			name: 'card',
			app: 'mk-app-card'
		}]
	}],
	menuDefaultSelectedKeys: ['1'],
	menuDefaultOpenKeys: ['2'],
	defaultContent: {
		appName: 'mk-app-portal-about',
		appParams: {}
	},
	logo
}

function config(options) {
	if (options) {
		_options = { ..._options, ...options }
	}
}

config.getCurrent = () => _options

export default config