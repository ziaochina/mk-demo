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

    btnClick = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '修改密码',
            okText: '确认修改',
            children: this.metaAction.loadApp('mk-app-modify-password', {
                store: this.component.props.store,
            })
        })
        console.log(ret)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}