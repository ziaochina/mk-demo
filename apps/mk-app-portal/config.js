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
		app: 'mk-app-portal-about'
	}, {
		key: '2',
		name: 'apps',
		children: [{
			key: '201',
			name: '人员列表',
			app: 'mk-app-person-list'
		}, {
			key: '202',
			name: '人员卡片',
			app: 'mk-app-person-card'
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
		Object.assign(_options, options)
	}
}

config.current = _options

export default config