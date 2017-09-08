import React, { Component } from 'react'
import { wrapper } from 'mk-meta-engine'
import appInfo from './index'

@wrapper(appInfo)
export default class C extends Component {
	componentWillReceiveProps(nextProps) {
		if (this.props.uiMeta != nextProps.uiMeta
			|| this.props.uiData != nextProps.uiData) {
			this.props.componentWillReceiveProps(nextProps)
		}

	}

	render() {
		return this.props.monkeyKing({ ...this.props, path: 'root' })
	}
}