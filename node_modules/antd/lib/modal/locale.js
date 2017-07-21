'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.changeConfirmLocale = changeConfirmLocale;
exports.getConfirmLocale = getConfirmLocale;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultLocale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};
var runtimeLocale = (0, _extends3['default'])({}, defaultLocale);
function changeConfirmLocale(newLocale) {
    if (newLocale) {
        runtimeLocale = (0, _extends3['default'])({}, runtimeLocale, newLocale);
    } else {
        runtimeLocale = (0, _extends3['default'])({}, defaultLocale);
    }
}
function getConfirmLocale() {
    return runtimeLocale;
}