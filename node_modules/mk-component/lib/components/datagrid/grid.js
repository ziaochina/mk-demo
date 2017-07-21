'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = GridComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fixedDataTable = require('fixed-data-table');

var _sequenceColumn = require('./sequenceColumn');

var _sequenceColumn2 = _interopRequireDefault(_sequenceColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GridComponent(props) {
	var key = props.key,
	    rowsCount = props.rowsCount,
	    headerHeight = props.headerHeight,
	    rowHeight = props.rowHeight,
	    groupHeaderHeight = props.groupHeaderHeight,
	    footerHeight = props.footerHeight,
	    width = props.width,
	    height = props.height,
	    heightFromRowsCount = props.heightFromRowsCount,
	    readonly = props.readonly,
	    enableSequence = props.enableSequence,
	    startSequence = props.startSequence,
	    enableAddDelrow = props.enableAddDelrow,
	    sequenceFooter = props.sequenceFooter,
	    onAddrow = props.onAddrow,
	    onDelrow = props.onDelrow,
	    onRowClick = props.onRowClick,
	    onRowDoubleClick = props.onRowDoubleClick,
	    onRowMouseEnter = props.onRowMouseEnter,
	    onRowMouseLeave = props.onRowMouseLeave,
	    onScrollEnd = props.onScrollEnd,
	    scrollToRow = props.scrollToRow,
	    scrollToColumn = props.scrollToColumn,
	    columns = props.columns;

	//高度根据行数计算

	if (heightFromRowsCount) {
		height = headerHeight + 2 + rowHeight * rowsCount + footerHeight;
	}

	columns = [].concat((0, _toConsumableArray3.default)(columns));
	if (enableSequence) {
		columns.splice(0, 0, (0, _sequenceColumn2.default)({
			startSequence: startSequence,
			enableAddDelrow: readonly === false ? enableAddDelrow : false,
			footer: sequenceFooter,
			onAddrow: onAddrow,
			onDelrow: onDelrow
		}));
	}

	return _react2.default.createElement(
		_fixedDataTable.Table,
		{
			key: key,
			rowsCount: rowsCount,
			headerHeight: headerHeight,
			rowHeight: rowHeight,
			groupHeaderHeight: groupHeaderHeight,
			footerHeight: footerHeight,
			width: width,
			height: height,
			scrollToRow: scrollToRow,
			scrollToColumn: scrollToColumn,
			onRowDoubleClick: readonly === false ? undefined : onRowDoubleClick,
			onRowClick: readonly === false ? undefined : onRowClick,
			onRowMouseEnter: readonly === false ? undefined : onRowMouseEnter,
			onRowMouseLeave: readonly === false ? undefined : onRowMouseLeave,
			scrollEnd: onScrollEnd
		},
		columns
	);
}
module.exports = exports['default'];