/// <reference types="react" />
import React, { Component } from 'react';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
export interface AbstractInputProps {
    prefixCls?: string;
    className?: string;
    defaultValue?: any;
    value?: any;
    style?: React.CSSProperties;
}
export interface InputProps extends AbstractInputProps {
    placeholder?: string;
    type?: string;
    id?: number | string;
    name?: string;
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
    readOnly?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    onPressEnter?: React.FormEventHandler<any>;
    onKeyDown?: React.FormEventHandler<any>;
    onChange?: React.FormEventHandler<any>;
    onClick?: React.FormEventHandler<any>;
    onFocus?: React.FormEventHandler<any>;
    onBlur?: React.FormEventHandler<any>;
    autoComplete?: 'on' | 'off';
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    spellCheck?: boolean;
    autoFocus?: boolean;
}
export default class Input extends Component<InputProps, any> {
    static Group: typeof Group;
    static Search: typeof Search;
    static TextArea: typeof TextArea;
    static defaultProps: {
        prefixCls: string;
        type: string;
        disabled: boolean;
    };
    static propTypes: {
        type: any;
        id: any;
        size: any;
        disabled: any;
        value: any;
        defaultValue: any;
        className: any;
        addonBefore: any;
        addonAfter: any;
        prefixCls: any;
        autosize: any;
        onPressEnter: any;
        onKeyDown: any;
        onFocus: any;
        onBlur: any;
        prefix: any;
        suffix: any;
    };
    refs: {
        input: HTMLInputElement;
    };
    handleKeyDown: (e: any) => void;
    focus(): void;
    blur(): void;
    getInputClassName(): any;
    renderLabeledInput(children: any): any;
    renderLabeledIcon(children: any): any;
    renderInput(): any;
    render(): any;
}
