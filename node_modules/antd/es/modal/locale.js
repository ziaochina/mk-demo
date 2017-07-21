import _extends from 'babel-runtime/helpers/extends';
var defaultLocale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};
var runtimeLocale = _extends({}, defaultLocale);
export function changeConfirmLocale(newLocale) {
    if (newLocale) {
        runtimeLocale = _extends({}, runtimeLocale, newLocale);
    } else {
        runtimeLocale = _extends({}, defaultLocale);
    }
}
export function getConfirmLocale() {
    return runtimeLocale;
}