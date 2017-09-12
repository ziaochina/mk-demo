import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        if (this.component.props.id) {
            injections.reduce('init')
            this.load()
        } else {
            injections.reduce('init', { typeId: this.component.props.typeId })
        }


    }
    load = async () => {
        const response = await this.webapi.goods.findById(this.component.props.id)
        this.injections.reduce('load', response)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.code', value: form.code
        }])

        if (!ok) return false

        if(form.id){
            const response = await this.webapi.goods.update(form)
            this.metaAction.toast('success', '修改成功')
            return response
        }
        else{
            const response = await this.webapi.goods.create(form)
            this.metaAction.toast('success', '新增成功')
            return response
        }
    }



    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }

    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.name') {
                Object.assign(r, await this.checkName(o.value))
            }
            else if (o.path == 'data.form.code') {
                Object.assign(r, await this.checkCode(o.value))
            }
            checkResults.push(r)
        }

        var json = {}
        var hasError = true
        checkResults.forEach(o => {
            json[o.path] = o.value
            json[o.errorPath] = o.message
            if (o.message)
                hasError = false
        })

        this.metaAction.sfs(json)
        return hasError
    }

    checkCode = async (code) => {
        var message

        if (!code)
            message = '请录入编码'

        return { errorPath: 'data.other.error.code', message }
    }

    checkName = async (name) => {
        var message

        if (!name)
            message = '请录入名称'

        return { errorPath: 'data.other.error.name', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}