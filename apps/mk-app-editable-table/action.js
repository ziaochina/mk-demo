import React from 'react'
import ReactDOM from 'react-dom'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { Input, DataGrid, DatePicker, Select } from 'mk-component'
import { Map } from 'immutable'
import moment from 'moment'
import utils from 'mk-utils'
import extend from './extend'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.gridAction.onInit({ component, injections })
        this.component = component
        this.injections = injections
        injections.reduce('init')
        this.load()
    }

    load = async () => {
        const response = await this.webapi.editableTable.query()
        this.injections.reduce('load', response)
    }

    save = async () => {
        var list = this.metaAction.gf('data.list').toJS()
        await this.webapi.editableTable.save(list)
        this.metaAction.toast('success', '保存成功')
        this.load()
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction }),
        ret = { ...metaAction, ...extendAction.gridAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}