"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = function () {
	function context() {
		(0, _classCallCheck3.default)(this, context);

		this._context = {};
	}

	(0, _createClass3.default)(context, [{
		key: "set",
		value: function set(key, value) {
			this._context[key] = value;
		}
	}, {
		key: "get",
		value: function get(key) {
			return this._context[key];
		}
	}]);
	return context;
}();

var instance = new context();

exports.default = instance;
module.exports = exports["default"];