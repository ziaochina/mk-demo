/// <reference types="react" />
import React from 'react';
export interface PaginationProps {
    total: number;
    defaultCurrent?: number;
    current?: number;
    defaultPageSize?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    onShowSizeChange?: (current: number, size: number) => void;
    showQuickJumper?: boolean;
    showTotal?: (total: number) => React.ReactNode;
    size?: string;
    simple?: boolean;
    style?: React.CSSProperties;
    locale?: Object;
    className?: string;
    prefixCls?: string;
    selectPrefixCls?: string;
    itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next') => React.ReactNode;
}
declare const _default: React.ComponentClass<PaginationProps>;
export default _default;
