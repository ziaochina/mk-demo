import {Toast,Notification, Modal } from 'mk-component'

var _options

function config(options) {
	_options = options
	_options.targetDomId = 'app'
	_options.startAppName = 'mk-app-root' 
	options.apps['mk-app-root'].config({defaultAppName:'mk-app-login'})

	_options.toast = Toast
	_options.notification = Notification
	_options.modal = Modal
	return _options
}

config.getCurrent = () => _options

export default config