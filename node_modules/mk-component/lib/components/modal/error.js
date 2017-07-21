'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = error;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(props) {
	return new _promise2.default(function (resolve, reject) {
		var handleOk = function handleOk() {
			resolve(true);
		};

		var handleCancel = function handleCancel() {
			resolve(false);
		};

		props.onOk = handleOk;
		props.onCancel = handleCancel;

		_modal2.default.error(props);
	});
}
module.exports = exports['default'];