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
        this.open('mk-app-person-list')
    }

    openCard = () => {
        this.open('mk-app-person-card')
    }

    openVoucher = () => {
        this.open('mk-app-voucher')
    }

    openComplexTable = () => {
        this.open('mk-app-complex-table')
    }

    openEditableTable = () => {
        this.open('mk-app-editable-table')
    }

    open = (appName) => {
        this.component.props.setPortalContent &&
            this.component.props.setPortalContent(appName)
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}