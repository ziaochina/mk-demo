import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'
import extend from './extend'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.formAction.onInit({ component, injections })
        this.component = component
        this.injections = injections

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        if (this.component.props.typeId) {
            injections.reduce('init')
            this.load()
        }
        else {
            injections.reduce('init', { parentId: this.component.props.parentId })
        }
    }

    load = async () => {
        const response = await this.webapi.stockType.findById(this.component.props.typeId)
        this.injections.reduce('load', response)
    }

    onOk = async () => {
        return await this.save()
    }

    check = async (option) => {
        if (!option || !option.path)
            return

        if (option.path == 'data.form.code') {
            return { errorPath: 'data.other.error.code', message: option.value ? '' : '请录入编码' }
        }
        else if (option.path == 'data.form.name') {
            return { errorPath: 'data.other.error.name', message: option.value ? '' : '请录入名称' }
        }
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.extendAction.formAction.check([{
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.code', value: form.code
        }], this.check)

        if (!ok) return false

        if (form.id) {
            const response = await this.webapi.stockType.update(form)
            this.metaAction.toast('success', '修改成功')
            return response
        }
        else {
            const response = await this.webapi.stockType.create(form)
            this.metaAction.toast('success', '新增成功')
            return response
        }
    }

    fieldChange = (path, value) => {
        this.extendAction.formAction.fieldChange(path, value, this.check)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction }),
        ret = { ...metaAction, ...extendAction.formAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}