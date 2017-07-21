"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _addEventListener = require("rc-util/lib/Dom/addEventListener");

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _Grid = require("./Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _throttleByAnimationFrame = require("../_util/throttleByAnimationFrame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3["default"])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Card = function (_Component) {
    (0, _inherits3["default"])(Card, _Component);

    function Card() {
        (0, _classCallCheck3["default"])(this, Card);

        var _this = (0, _possibleConstructorReturn3["default"])(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));

        _this.state = {
            widerPadding: false
        };
        _this.saveRef = function (node) {
            _this.container = node;
        };
        return _this;
    }

    (0, _createClass3["default"])(Card, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.updateWiderPadding();
            this.resizeEvent = (0, _addEventListener2["default"])(window, 'resize', this.updateWiderPadding);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.resizeEvent) {
                this.resizeEvent.remove();
            }
        }
    }, {
        key: "updateWiderPadding",
        value: function updateWiderPadding() {
            var _this2 = this;

            // 936 is a magic card width pixer number indicated by designer
            var WIDTH_BOUDARY_PX = 936;
            if (this.container.offsetWidth >= WIDTH_BOUDARY_PX && !this.state.widerPadding) {
                this.setState({ widerPadding: true }, function () {
                    _this2.updateWiderPaddingCalled = true; // first render without css transition
                });
            }
            if (this.container.offsetWidth < WIDTH_BOUDARY_PX && this.state.widerPadding) {
                this.setState({ widerPadding: false }, function () {
                    _this2.updateWiderPaddingCalled = true; // first render without css transition
                });
            }
        }
    }, {
        key: "isContainGrid",
        value: function isContainGrid() {
            var containGrid = void 0;
            _react.Children.forEach(this.props.children, function (element) {
                if (element && element.type && element.type === _Grid2["default"]) {
                    containGrid = true;
                }
            });
            return containGrid;
        }
    }, {
        key: "render",
        value: function render() {
            var _classNames;

            var _a = this.props,
                _a$prefixCls = _a.prefixCls,
                prefixCls = _a$prefixCls === undefined ? 'ant-card' : _a$prefixCls,
                className = _a.className,
                extra = _a.extra,
                bodyStyle = _a.bodyStyle,
                noHovering = _a.noHovering,
                title = _a.title,
                loading = _a.loading,
                _a$bordered = _a.bordered,
                bordered = _a$bordered === undefined ? true : _a$bordered,
                others = __rest(_a, ["prefixCls", "className", "extra", "bodyStyle", "noHovering", "title", "loading", "bordered"]);
            var children = this.props.children;
            var classString = (0, _classnames2["default"])(prefixCls, className, (_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + "-loading", loading), (0, _defineProperty3["default"])(_classNames, prefixCls + "-bordered", bordered), (0, _defineProperty3["default"])(_classNames, prefixCls + "-no-hovering", noHovering), (0, _defineProperty3["default"])(_classNames, prefixCls + "-wider-padding", this.state.widerPadding), (0, _defineProperty3["default"])(_classNames, prefixCls + "-padding-transition", this.updateWiderPaddingCalled), (0, _defineProperty3["default"])(_classNames, prefixCls + "-contain-grid", this.isContainGrid()), _classNames));
            if (loading) {
                children = _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement("p", { className: prefixCls + "-loading-block", style: { width: '94%' } }),
                    _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '28%' } }),
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '62%' } })
                    ),
                    _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '22%' } }),
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '66%' } })
                    ),
                    _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '56%' } }),
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '39%' } })
                    ),
                    _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '21%' } }),
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '15%' } }),
                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '40%' } })
                    )
                );
            }
            var head = void 0;
            if (!title) {
                head = null;
            } else {
                head = typeof title === 'string' ? _react2["default"].createElement(
                    "div",
                    { className: prefixCls + "-head" },
                    _react2["default"].createElement(
                        "h3",
                        { className: prefixCls + "-head-title" },
                        title
                    )
                ) : _react2["default"].createElement(
                    "div",
                    { className: prefixCls + "-head" },
                    _react2["default"].createElement(
                        "div",
                        { className: prefixCls + "-head-title" },
                        title
                    )
                );
            }
            return _react2["default"].createElement(
                "div",
                (0, _extends3["default"])({}, others, { className: classString, ref: this.saveRef }),
                head,
                extra ? _react2["default"].createElement(
                    "div",
                    { className: prefixCls + "-extra" },
                    extra
                ) : null,
                _react2["default"].createElement(
                    "div",
                    { className: prefixCls + "-body", style: bodyStyle },
                    children
                )
            );
        }
    }]);
    return Card;
}(_react.Component);

exports["default"] = Card;

Card.Grid = _Grid2["default"];
__decorate([(0, _throttleByAnimationFrame.throttleByAnimationFrameDecorator)()], Card.prototype, "updateWiderPadding", null);
module.exports = exports["default"];