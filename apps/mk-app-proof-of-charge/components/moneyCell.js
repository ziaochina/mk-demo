import React, { Component } from 'react'
import classNames from 'classnames'
import { number } from 'mk-utils'

export default function moneyCell(props) {
    var v = number.round(props.value, 2) + ''

    if (v.indexOf('.') == -1) {
        v = v.padEnd(v.length + 2, '0')
    }
    else {
        v = v.replace('.', '')
    }

    v = v.padStart(11, ' ')

    const children = []
    for (var i = 0; i < v.length; i++) {
        children.push(<div>{v[i]}</div>)
    }

    return (
        <div className='mk-app-proof-of-charge-money-cell'>
            {children}
        </div>
    )
} 