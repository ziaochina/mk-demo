import React, { Component } from 'react'
import classNames from 'classnames'

export default function moneyCellHeader(props) {
    return (
        <div className='mk-app-proof-of-charge-money-cell-header'>
            <label className='mk-app-proof-of-charge-money-cell-header-top'>{props.title}</label>
            <div className='mk-app-proof-of-charge-money-cell-header-bottom'>
                <div>亿</div>
                <div>千</div>
                <div>百</div>
                <div>十</div>
                <div>万</div>
                <div>千</div>
                <div>百</div>
                <div>十</div>
                <div>元</div>
                <div>角</div>
                <div>分</div>
            </div>
        </div>
    )
} 