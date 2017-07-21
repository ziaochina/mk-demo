/// <reference types="react" />
import React from 'react';
import { AbstractInputProps } from './Input';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export interface TextAreaProps extends AbstractInputProps {
    autosize?: boolean | AutoSizeType;
    onPressEnter?: React.FormEventHandler<any>;
}
export declare type HTMLTextareaProps = React.HTMLProps<HTMLTextAreaElement>;
export default class TextArea extends React.Component<TextAreaProps & HTMLTextareaProps, any> {
    static defaultProps: {
        prefixCls: string;
    };
    nextFrameActionId: number;
    textAreaRef: HTMLTextAreaElement;
    state: {
        textareaStyles: null;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    focus(): void;
    blur(): void;
    resizeTextarea: () => void;
    handleTextareaChange: (e: any) => void;
    handleKeyDown: (e: any) => void;
    saveTextAreaRef: (textArea: any) => void;
    render(): JSX.Element;
}
