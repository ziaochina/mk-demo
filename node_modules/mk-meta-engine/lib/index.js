'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mkAppLoader = require('mk-app-loader');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _componentFactory = require('./componentFactory');

var _componentFactory2 = _interopRequireDefault(_componentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	start: _mkAppLoader.start,
	config: _config2.default,
	action: _action2.default,
	reducer: _reducer2.default,
	wrapper: _wrapper2.default,
	componentFactory: _componentFactory2.default,
	AppLoader: _mkAppLoader.AppLoader
};
module.exports = exports['default'];