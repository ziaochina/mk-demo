/// <reference types="react" />
import React from 'react';
import moment from 'moment';
export interface HeaderProps {
    prefixCls?: string;
    locale?: any;
    fullscreen?: boolean;
    yearSelectOffset?: number;
    yearSelectTotal?: number;
    type?: string;
    onValueChange?: (value) => void;
    onTypeChange?: (type: string) => void;
    value: any;
}
export default class Header extends React.Component<HeaderProps, any> {
    static defaultProps: {
        prefixCls: string;
        yearSelectOffset: number;
        yearSelectTotal: number;
    };
    calenderHeaderNode: any;
    getYearSelectElement(year: any): JSX.Element;
    getMonthsLocale(value: moment.Moment): any[];
    getMonthSelectElement(month: any, months: any): JSX.Element;
    onYearChange: (year: any) => void;
    onMonthChange: (month: any) => void;
    onTypeChange: (e: any) => void;
    getCalenderHeaderNode: (node: any) => void;
    render(): JSX.Element;
}
