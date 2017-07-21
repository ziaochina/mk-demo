'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = wrapMapStateToProps;

var _parseName = require('./parseName');

var _parseName2 = _interopRequireDefault(_parseName);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapStateToProps(fullName) {
	var parsedName = (0, _parseName2.default)(fullName);

	return function (state) {
		return {
			appName: parsedName.name,
			appFullName: parsedName.fullName,
			appQuery: parsedName.query,
			appParams: parsedName.params,
			payload: state.get(parsedName.fullName)
		};
	};
}
module.exports = exports['default'];