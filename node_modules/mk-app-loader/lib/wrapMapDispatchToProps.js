'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = wrapMapDispatchToProps;

var _redux = require('redux');

var _parseName = require('./parseName');

var _parseName2 = _interopRequireDefault(_parseName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapDispatchToProps(fullName, actionCreators, reducer) {
	var parsedName = (0, _parseName2.default)(fullName),
	    wrapActionCreators = {},
	    keys = (0, _keys2.default)(actionCreators);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];

		if (key === 'directFuns') continue;

		var wrapActionCreator = wrapAction(actionCreators[key], reducer, parsedName.fullName, parsedName.name, parsedName.query, parsedName.params);
		wrapActionCreators[key] = wrapActionCreator;
	}

	return function (dispatch) {
		return (0, _extends3.default)({}, (0, _redux.bindActionCreators)(wrapActionCreators, dispatch), actionCreators.getDirectFuns && actionCreators.getDirectFuns(parsedName) || {});
	};
}

function wrapAction(actionCreator, reducer, fullName, name, query, params) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return function () {
			return {
				fullName: fullName,
				name: name,
				query: query,
				params: params,
				actionCreator: actionCreator,
				reducer: reducer,
				args: args
			};
		};
	};
}
module.exports = exports['default'];