/// <reference types="react" />
import React from 'react';
import AnchorLink from './AnchorLink';
export interface AnchorProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    offsetTop?: number;
    bounds?: number;
    affix?: boolean;
    showInkInFixed?: boolean;
    target?: () => HTMLElement | Window;
}
export default class Anchor extends React.Component<AnchorProps, any> {
    static Link: typeof AnchorLink;
    static defaultProps: {
        prefixCls: string;
        affix: boolean;
        showInkInFixed: boolean;
    };
    static childContextTypes: {
        antAnchor: any;
    };
    refs: {
        ink?: any;
    };
    private links;
    private scrollEvent;
    private animating;
    constructor(props: AnchorProps);
    getChildContext(): {
        antAnchor: {
            registerLink: (link: String) => void;
            unregisterLink: (link: String) => void;
            activeLink: any;
            scrollTo: (link: any) => void;
        };
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    handleScroll: () => void;
    handleScrollTo: (link: any) => void;
    getCurrentAnchor(offsetTop?: number, bounds?: number): String;
    updateInk: () => void;
    render(): JSX.Element;
}
