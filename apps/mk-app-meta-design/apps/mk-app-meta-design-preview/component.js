import React, { Component } from 'react'
import { wrapper } from 'mk-meta-engine'
import appInfo from './index'


@wrapper(appInfo)
export default class C extends Component {
	render() {
		debugger
		return this.props.monkeyKing({ ...this.props, path: 'root' })
	}
}