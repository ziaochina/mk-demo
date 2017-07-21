import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from 'rc-calendar/es/locale/en_US';
import TimePickerLocale from '../../time-picker/locale/en_US';
// Merge into a locale object
var locale = {
    lang: _extends({ placeholder: 'Wybierz datę', rangePlaceholder: ['Data początkowa', 'Data końcowa'] }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;