'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _notification = require('antd/lib/notification');

var _notification2 = _interopRequireDefault(_notification);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promiseWrapper(fun) {
	return function (props) {
		return new _promise2.default(function (resolve, reject) {
			var handleClose = function handleClose() {
				resolve(true);
			};
			props.onClose = handleClose;
			fun(props);
		});
	};
}

exports.default = {
	open: promiseWrapper(_notification2.default.open),
	success: promiseWrapper(_notification2.default.success),
	error: promiseWrapper(_notification2.default.error),
	info: promiseWrapper(_notification2.default.info),
	warning: promiseWrapper(_notification2.default.warning),
	warn: promiseWrapper(_notification2.default.warn)
};
module.exports = exports['default'];