import webapi from './webapi'

var _options = {
	webapi,
	defaultAppName: 'mk-app-login',
	defaultAppParams: {}
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config