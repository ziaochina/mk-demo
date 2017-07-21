'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _appFactory = require('./appFactory');

var _appFactory2 = _interopRequireDefault(_appFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _options = {};

function config(options) {
	(0, _assign2.default)(_options, options);
}

config.current = _options;

exports.default = config;
module.exports = exports['default'];