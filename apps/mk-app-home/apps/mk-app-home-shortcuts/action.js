import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import funImg from './img/photo.png'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    getFunImg = () => funImg

    openList = () => {
        this.open('列表','mk-app-person-list')
    }

    openCard = () => {
        this.open('卡片', 'mk-app-person-card')
    }

    openVoucher = () => {
        this.open('单据','mk-app-voucher')
    }

    openComplexTable = () => {
        this.open('复杂表格','mk-app-complex-table')
    }

    openEditableTable = () => {
        this.open('可编辑表格','mk-app-editable-table')
    }

    open = (name,appName) => {
        this.component.props.setPortalContent &&
            this.component.props.setPortalContent(name, appName)
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}