import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import TimePickerPanel from 'rc-time-picker/es/Panel';
import classNames from 'classnames';
import { generateShowHourMinuteSecond } from '../time-picker';
import warning from '../_util/warning';
import { getComponentLocale } from '../_util/getLocale';
function getColumns(_ref) {
    var showHour = _ref.showHour,
        showMinute = _ref.showMinute,
        showSecond = _ref.showSecond,
        use12Hours = _ref.use12Hours;

    var column = 0;
    if (showHour) {
        column += 1;
    }
    if (showMinute) {
        column += 1;
    }
    if (showSecond) {
        column += 1;
    }
    if (use12Hours) {
        column += 1;
    }
    return column;
}
export default function wrapPicker(Picker, defaultFormat) {
    return _a = function (_React$Component) {
        _inherits(PickerWrapper, _React$Component);

        function PickerWrapper() {
            _classCallCheck(this, PickerWrapper);

            var _this = _possibleConstructorReturn(this, (PickerWrapper.__proto__ || Object.getPrototypeOf(PickerWrapper)).apply(this, arguments));

            _this.handleOpenChange = function (open) {
                var _this$props = _this.props,
                    onOpenChange = _this$props.onOpenChange,
                    toggleOpen = _this$props.toggleOpen;

                onOpenChange(open);
                if (toggleOpen) {
                    warning(false, '`toggleOpen` is deprecated and will be removed in the future, ' + 'please use `onOpenChange` instead, see: https://u.ant.design/date-picker-on-open-change');
                    toggleOpen({ open: open });
                }
            };
            return _this;
        }

        _createClass(PickerWrapper, [{
            key: 'render',
            value: function render() {
                var _classNames2;

                var props = this.props;
                var prefixCls = props.prefixCls,
                    inputPrefixCls = props.inputPrefixCls;

                var pickerClass = classNames(_defineProperty({}, prefixCls + '-picker', true));
                var pickerInputClass = classNames(prefixCls + '-picker-input', inputPrefixCls, (_classNames2 = {}, _defineProperty(_classNames2, inputPrefixCls + '-lg', props.size === 'large'), _defineProperty(_classNames2, inputPrefixCls + '-sm', props.size === 'small'), _defineProperty(_classNames2, inputPrefixCls + '-disabled', props.disabled), _classNames2));
                var locale = getComponentLocale(props, this.context, 'DatePicker', function () {
                    return require('./locale/zh_CN');
                });
                var timeFormat = props.showTime && props.showTime.format || 'HH:mm:ss';
                var rcTimePickerProps = _extends({}, generateShowHourMinuteSecond(timeFormat), { format: timeFormat, use12Hours: props.showTime && props.showTime.use12Hours });
                var columns = getColumns(rcTimePickerProps);
                var timePickerCls = prefixCls + '-time-picker-column-' + columns;
                var timePicker = props.showTime ? React.createElement(TimePickerPanel, _extends({}, rcTimePickerProps, props.showTime, { prefixCls: prefixCls + '-time-picker', className: timePickerCls, placeholder: locale.timePickerLocale.placeholder, transitionName: 'slide-up' })) : null;
                return React.createElement(Picker, _extends({}, props, { pickerClass: pickerClass, pickerInputClass: pickerInputClass, locale: locale, timePicker: timePicker, onOpenChange: this.handleOpenChange }));
            }
        }]);

        return PickerWrapper;
    }(React.Component), _a.contextTypes = {
        antLocale: PropTypes.object
    }, _a.defaultProps = {
        format: defaultFormat || 'YYYY-MM-DD',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange: function onChange() {},
        onOk: function onOk() {},
        onOpenChange: function onOpenChange() {},

        locale: {},
        prefixCls: 'ant-calendar',
        inputPrefixCls: 'ant-input'
    }, _a;
    var _a;
}