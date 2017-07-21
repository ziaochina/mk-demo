'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = creator;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = function reducer(option) {
	(0, _classCallCheck3.default)(this, reducer);

	_initialiseProps.call(this);

	this.appInfo = option.appInfo;
	this.onEvent = this.onEvent.bind(this);
};

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.init = function (state, option) {
		var _option$data = option.data,
		    data = _option$data === undefined ? {} : _option$data;


		return _this.initByImmutable(state, {
			data: _immutable2.default.fromJS(data)
		});
	};

	this.initByImmutable = function (state, option) {
		var data = option.data;

		//清除state中非@@开头的属性，那属性是mk-app-loader增加的

		var keys = [];
		state.mapKeys(function (key) {
			if (key.indexOf('@@') === -1) keys.push(key);
		});

		keys.forEach(function (key) {
			state = state.remove(key);
		});

		//设置状态
		return state.set('data', data);
	};

	this.onEvent = function (state, eventName, option) {
		var path = option.path;


		var fieldPath = util.getMeta(_this.appInfo, path, 'bindField');

		switch (eventName) {
			case 'onFieldFocus':
				return focus(state, path);
			case 'onFieldChange':
				return util.setField(state, fieldPath, option.value);
			default:
				return state;
		}
	};

	this.focus = function (state, path) {
		return util.setter(state, 'meta', 'focusField', path);
	};

	this.getMeta = util.getMeta;
	this.getField = util.getField;
	this.setField = util.setField;
	this.gm = util.getMeta;
	this.gf = util.getField;
	this.sf = util.setField;
	this.context = _context2.default;
};

function creator(option) {
	return new reducer(option);
}
module.exports = exports['default'];