'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = creator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mkAppLoader = require('mk-app-loader');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _immutable = require('immutable');

var _context4 = require('./context');

var _context5 = _interopRequireDefault(_context4);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var action = function action(option) {
	(0, _classCallCheck3.default)(this, action);

	_initialiseProps.call(this);

	this.appInfo = option.appInfo;
	this.meta = (0, _immutable.fromJS)(option.appInfo.meta);
	this.cache = {};

	util.setMeta(option.appInfo);
};

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.config = function (_ref) {
		var metaHandlers = _ref.metaHandlers;

		_this.metaHandlers = metaHandlers;
	};

	this.initView = function (component, injections) {
		_this.component = component;
		_this.injections = injections;

		_this.metaHandlers && _this.metaHandlers['onInit'] && _this.metaHandlers['onInit']({ component: component, injections: injections });
	};

	this.getField = function (fieldPath) {
		return util.getField(_this.injections.getState(), fieldPath);
	};

	this.setField = function (fieldPath, value) {
		return _this.injections.reduce('setField', fieldPath, value);
	};

	this.parseExpreesion = function (v) {
		var reg = new RegExp(/\{\{([^{}]+)\}\}/);

		if (!_this.cache.expression) _this.cache.expression = {};

		if (_this.cache.expression[v]) {
			return _this.cache.expression[v];
		}

		if (!_this.cache.expressionParams) {
			_this.cache.expressionParams = ['data'].concat((0, _keys2.default)(_this.metaHandlers).map(function (k) {
				return "$" + k;
			})).concat(['_path', '_rowIndex', '_vars']);
		}

		var params = _this.cache.expressionParams;

		var body = "return " + v.replace(reg, function (word, group) {
			return group;
		});
		//.replace(/\([ ]*\)/g, word=>`({path:_path, rowIndex:_rowIndex, vars: _vars})`)

		_this.cache.expression[v] = new (Function.prototype.bind.apply(Function, [null].concat((0, _toConsumableArray3.default)(params), [body])))();

		return _this.cache.expression[v];
	};

	this.updateMeta = function (meta, path, rowIndex, vars, data) {
		var reg = new RegExp(/\{\{([^{}]+)\}\}/);

		if (meta.name && meta.component) {
			meta.path = vars ? path + ', ' + vars.join(',') : path;
		}

		if (meta["_power"]) return;

		(0, _keys2.default)(meta).forEach(function (key) {
			var v = meta[key],
			    t = typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v),
			    currentPath = path;

			if (t == 'string' && reg.test(v)) {
				var f = _this.parseExpreesion(v);

				var values = [data];

				(0, _keys2.default)(_this.metaHandlers).forEach(function (k) {
					values.push(function () {
						var _metaHandlers;

						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}

						return (_metaHandlers = _this.metaHandlers)[k].apply(_metaHandlers, args.concat([{ currentPath: currentPath, rowIndex: rowIndex, vars: vars }]));
					});
				});

				values = values.concat([currentPath, rowIndex, vars]);
				var ret = f.apply(_this, values);
				if (key == '...' && ret && (typeof ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(ret)) == 'object') {
					(0, _keys2.default)(ret).forEach(function (kk) {
						meta[kk] = function () {
							return ret[kk];
						};
					});
					delete meta['...'];
				} else {
					meta[key] = function () {
						return ret;
					};
				}
			} else if (v instanceof Array) {

				v.forEach(function (c) {
					currentPath = path;
					if (c.name && c.component) {
						currentPath = currentPath ? currentPath + '.' + key + '.' + c.name : key + '.' + c.name;
					}
					_this.updateMeta(c, currentPath, rowIndex, vars, data);
				});
			} else if (t == 'object') {
				if (v.name && v.component) {
					currentPath = currentPath ? currentPath + '.' + key + '.' + v.name : key + '.' + v.name;
				}
				_this.updateMeta(meta[key], currentPath, rowIndex, vars, data);
			}
		});
	};

	this.calcBindField = function (bindField, vars) {
		if (!bindField) return bindField;

		if (!vars) return bindField;

		var hit = false;

		//root.detail.code,0;form.detail.${0}.code => form.detail.0.code
		//root.detail,0;form.detail => form.detail.0
		bindField = bindField.replace(/{(\d+)}/g, function (match, index) {
			hit = true;
			return vars[index];
		});
		return hit ? bindField : bindField + '.' + vars[0];
	};

	this.getMeta = function (fullPath, propertys) {
		var meta = util.getMeta(_this.appInfo, fullPath, propertys),
		    parsedPath = util.parsePath(fullPath),
		    path = parsedPath.path,
		    rowIndex = parsedPath.vars ? parsedPath.vars[0] : undefined,
		    vars = parsedPath.vars,
		    data = util.getField(_this.injections.getState()).toJS();

		meta['_power'] = undefined;
		_this.updateMeta(meta, path, rowIndex, vars, data);
		return meta;
	};

	this.asyncGet = function () {
		var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, property) {
			var parsedPath, eventSource, response;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							parsedPath = util.parsePath(path), eventSource = (parsedPath || {
								path: 'root'
							}).path;

							if (!(typeof property === 'string')) {
								_context.next = 7;
								break;
							}

							if (!(_this.event && _this.event[eventSource] && _this.event[eventSource][propertys])) {
								_context.next = 7;
								break;
							}

							_context.next = 5;
							return _this.event[eventSource][propertys]({
								path: eventSource,
								rowIndex: parsedPath.vars ? parsedPath.vars[0] : undefined
							});

						case 5:
							response = _context.sent;
							return _context.abrupt('return', _promise2.default.resolve(response));

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}();

	this.onEvent = function (eventName, option) {
		var parsedPath = util.parsePath(option.path),
		    eventSource = (parsedPath || {
			path: 'root'
		}).path;

		var strHandler = util.getMeta(_this.appInfo, eventSource, eventName);
		if (strHandler && strHandler.substring(0, 2) === '$$' && _this.metaHandlers[strHandler.substr(2)]) {
			_this.metaHandlers[strHandler.substr(2)]((0, _extends3.default)({}, option, {
				path: eventSource,
				rowIndex: parsedPath.vars ? parsedPath.vars[0] : option.rowIndex
			}));
		} else {
			_this.injections.reduce('onEvent', eventName, option);
		}
	};

	this.getDirectFuns = function () {
		return {
			getMeta: function getMeta(path, propertys) {
				return _this.getMeta(path, propertys);
			},
			getField: function getField(fieldPath) {
				return _this.getField(fieldPath);
			},
			asyncGet: function () {
				var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path, propertys) {
					return _regenerator2.default.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									_context2.next = 2;
									return _this.asyncGet(path, property);

								case 2:
									return _context2.abrupt('return', _context2.sent);

								case 3:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, _this);
				}));

				return function asyncGet(_x3, _x4) {
					return _ref3.apply(this, arguments);
				};
			}(),
			gm: function gm(path, propertys) {
				return _this.getMeta(path, propertys);
			},
			gf: function gf(fieldPath) {
				return _this.getField(fieldPath);
			},
			ag: function () {
				var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(path, propertys) {
					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return _this.asyncGet(path, property);

								case 2:
									return _context3.abrupt('return', _context3.sent);

								case 3:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this);
				}));

				return function ag(_x5, _x6) {
					return _ref4.apply(this, arguments);
				};
			}()
		};
	};

	this.toast = function () {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		var Toast = _config2.default.getToast();
		if (!Toast || args.length == 0 || !Toast[args[0]]) return;
		Toast[args[0]].apply(Toast, (0, _toConsumableArray3.default)(args.slice(1)));
	};

	this.notification = function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		var Notification = _config2.default.getNotification();
		if (!Notification || args.length == 0 || !Notification[args[0]]) return;
		Notification[args[0]].apply(Notification, (0, _toConsumableArray3.default)(args.slice(1)));
	};

	this.modal = function () {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		var Modal = _config2.default.getModal();
		if (!Modal || args.length == 0 || !Modal[args[0]]) return;
		return Modal[args[0]].apply(Modal, (0, _toConsumableArray3.default)(args.slice(1)));
	};

	this.loadApp = function (name, props) {
		return _react2.default.createElement(_mkAppLoader.AppLoader, (0, _extends3.default)({}, props, { name: name }));
	};

	this.gm = this.getMeta;
	this.gf = this.getField;
	this.sf = this.setField;
	this.context = _context5.default;
};

function creator(option) {
	return new action(option);
}
module.exports = exports['default'];