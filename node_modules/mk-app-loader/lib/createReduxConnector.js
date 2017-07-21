'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createReduxConnector;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReduxConnector(WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps, options)(WrappedComponent);
}
module.exports = exports['default'];