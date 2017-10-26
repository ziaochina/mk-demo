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

        const ok =  await this.extendAction.formAction.check([{
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.mobile', value: form.mobile
        }], this.check)

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

    check = async (option) => {
        if (!option || !option.path)
            return

        if (option.path == 'data.form.name') {
            return { errorPath: 'data.other.error.name', message: option.value ? '' : '请录入姓名' }
        }
        else if (option.path == 'data.form.mobile') {
            let message

            if (!option.value)
                message = '请录入手机号'
            else if (!/^1[3|4|5|8][0-9]\d{8}$/.test(option.value))
                message = '请录入有效的手机号'
            return { errorPath: 'data.other.error.mobile', message }
        }
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