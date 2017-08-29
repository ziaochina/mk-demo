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

        injections.reduce('init', {
            isPop: this.component.props.isPop
        })

        this.load()
    }

    load = async () => {
        const payload = {}

        var response = await this.webapi.department.query()
        payload.departments = response

        if (this.component.props.personId || this.component.props.personId == 0) {
            response = await this.webapi.person.findById(this.component.props.personId)
            payload.person = response
        }

        this.injections.reduce('load', payload)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        
        const ok = await this.check([{
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.mobile', value: form.mobile
        }])

        if (!ok) return false

        if (form.id || form.id == 0) {
            const response = await this.webapi.person.update(form)
            if (response) {
                this.metaAction.toast('success', '保存人员成功')
                this.injections.reduce('setPerson', response)
            }

        } else {
            const response = await this.webapi.person.create(form)
            if (response) {
                this.metaAction.toast('success', '保存人员成功')
                this.injections.reduce('setPerson', response)
            }
        }
        return true
    }
    add = () => {
        this.injections.reduce('setPerson', {
            id: undefined,
            name: '',
            sex: '0',
            birthday: `1980-01-01`,
            mobile: '',
            dept: undefined,
            address: '北京海淀'
        })
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.person.prev(id)
        if (response) {
            this.injections.reduce('setPerson', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.person.next(id)
        if (response) {
            this.injections.reduce('setPerson', response)
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
            else if (o.path == 'data.form.mobile') {
                Object.assign(r, await this.checkMobile(o.value))
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

    checkName = async (name) => {
        var message

        if (!name)
            message = '请录入姓名'

        return { errorPath: 'data.other.error.name', message }
    }

    checkMobile = async (mobile) => {
        var message

        if (!mobile)
            message = '请录入手机号'
        else if (!/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))
            message = '请录入有效的手机号'

        return { errorPath: 'data.other.error.mobile', message }
    }

    departmentFocus = async () => {
        const response = await this.webapi.department.query()
        this.metaAction.sf('data.other.departments', fromJS(response))
    }

    addDepartment = async () => {
        if (!this.config.apps['mk-app-department-card']) {
            throw '依赖mk-app-department-card app,请使用mk clone mk-app-department-card命令添加'
        }


        const ret = await this.metaAction.modal('show', {
            title: '新增部门',
            children: this.metaAction.loadApp('mk-app-department-card', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            this.injections.reduce('addDepartment', ret)
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}