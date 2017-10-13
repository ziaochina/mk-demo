import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

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

    add = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-stock-type-card', {
                store: this.component.props.store,
                parentId: 1
            })
        })
    }

    modify = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('mk-app-stock-type-card', {
                store: this.component.props.store,
                typeId: 101
            })
        })
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}