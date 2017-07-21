'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mkAppLoader = require('mk-app-loader');

var _componentFactory = require('./componentFactory');

var _componentFactory2 = _interopRequireDefault(_componentFactory);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseMetaProps(meta, props) {
    var ret = {};

    (0, _keys2.default)(meta).forEach(function (key) {
        var v = meta[key],
            t = typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v);

        if (v instanceof Array) {
            ret[key] = [];
            v.forEach(function (c) {
                var mc = metaToComponent(c, props);
                if (mc instanceof Array) ret[key] = ret[key].concat(mc);else ret[key].push(mc);
            });
        } else if (t == 'object') {
            ret[key] = metaToComponent(v, props);
        } else if (t == 'function') {
            ret[key] = v();
        } else {
            ret[key] = v;
        }
    });

    return ret;
}

function metaToComponent(meta, props) {
    if (!meta) {
        return meta;
    } else if ((typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta)) == 'object' && meta['$$typeof']) {
        return meta;
    } else if ((typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta)) == 'object' && meta['_isAMomentObject']) {
        return meta;
    } else if ((typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta)) == 'object') {

        if (meta.component) {
            if (meta['_visible'] === false) return null;

            if (typeof meta['_visible'] === 'function' && meta['_visible']() === false) return null;

            if (meta['_power'] && /for[ ]+in/.test(meta['_power'])) {
                var items = props.gf(meta['_power'].replace(/for[ ]+in/, '').replace(' ', ''));

                if (!items || items.size == 0) return;
                items = items.toJS();
                return items.map(function (o, index) {
                    return metaToComponent((0, _extends3.default)({}, props.gm(meta.path + ',' + index), { _power: undefined }), props);
                });
            }

            if (meta['_power'] && meta['_power'].indexOf('=>') != -1) {
                return function () {
                    var varsString = new Function('return ' + meta['_power'])().apply(undefined, arguments);
                    return metaToComponent((0, _extends3.default)({}, props.gm(meta.path + ',' + varsString), { _power: undefined }), props);
                };
            }

            var componentName = meta.component,
                component = _componentFactory2.default.getComponent(props.appName, componentName);

            var allProps = (0, _extends3.default)({
                key: meta.path
            }, props, parseMetaProps(meta, props));

            allProps = (0, _omit2.default)(allProps, ['clearAppState', 'component', 'name', 'getDirectFuns', 'initView', 'payload']);

            if (componentName == 'AppLoader') {
                if (!allProps.appName) return null;
                return _react2.default.createElement(component, (0, _extends3.default)({}, allProps, { name: allProps.appName }));
            }
            //else if (typeof component == 'string' || component.prototype.isReactComponent) {
            return _react2.default.createElement(component, allProps);
            //}
            //else {
            //    return component(allProps)
            //}
        } else {
            return parseMetaProps(meta, props);
        }
    } else {
        return meta;
    }
}

var MonkeyKing = function MonkeyKing(props) {
    var path = props.path,
        gm = props.gm;

    var component = metaToComponent(gm(path), props);
    return component;
};

exports.default = MonkeyKing;
module.exports = exports['default'];