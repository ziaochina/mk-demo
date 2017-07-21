'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mkAppLoader = require('mk-app-loader');

var _componentFactory = require('./componentFactory');

var _componentFactory2 = _interopRequireDefault(_componentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toast, notification, modal;

function config(option) {
	var components = option.components;

	toast = option.toast;
	notification = option.notification;
	modal = option.modal;

	(0, _mkAppLoader.config)(option);

	_componentFactory2.default.registerComponent('AppLoader', _mkAppLoader.AppLoader);

	if (!components || components.length == 0) return;

	components.forEach(function (c) {
		if (c.appName) _componentFactory2.default.registerComponent(c.appName, c.name, c.component);else _componentFactory2.default.registerComponent(c.name, c.component);
	});
}

config.getToast = function () {
	return toast;
};
config.getNotification = function () {
	return notification;
};
config.getModal = function () {
	return modal;
};

exports.default = config;
module.exports = exports['default'];