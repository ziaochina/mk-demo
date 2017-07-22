/// <reference types="react" />
import React from 'react';
export declare type ButtonSize = 'small' | 'large';
export interface ButtonGroupProps {
    size?: ButtonSize;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
}
declare const ButtonGroup: React.SFC<ButtonGroupProps>;
export default ButtonGroup;
