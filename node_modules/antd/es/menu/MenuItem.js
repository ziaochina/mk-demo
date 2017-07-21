import React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
var MenuItem = function MenuItem(props, _ref) {
    var inlineCollapsed = _ref.inlineCollapsed;

    return React.createElement(
        Tooltip,
        { title: inlineCollapsed && props.level === 1 ? props.children : '', placement: 'right', overlayClassName: props.rootPrefixCls + '-inline-collapsed-tooltip' },
        React.createElement(Item, props)
    );
};
MenuItem.contextTypes = {
    inlineCollapsed: PropTypes.bool
};
export default MenuItem;