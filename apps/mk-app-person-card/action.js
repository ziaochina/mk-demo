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

    onOk = () => {
        return new Promise(async (reslove, reject) => {
            const ret = await this.save()
            if (ret === false)
                reslove(false)
            else
                reslove(true)
        })
    }

    save = async () => {
        if (this.checkName(true).status == 'error'
            || this.checkMobile(true).status == 'error') {
            this.injections.reduce('setCheckFields', [
                'data.form.name',
                'data.form.sex',
                'data.form.mobile',
                'data.form.birthday'
            ])
            return false
        }

        const form = this.metaAction.gf('data.form').toJS()
        form.birthday = form.birthday.format('YYYY-MM-DD')
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



    checkName = (force) => {
        const checkFields = this.metaAction.gf('data.other.checkFields') || List()
        if (force !== true && !checkFields.includes('data.form.name')) return {}
        const name = this.metaAction.gf('data.form.name')
        return name ? { status: 'success' } : { status: 'error', message: '请录入姓名' }
    }

    checkMobile = (force) => {
        const checkFields = this.metaAction.gf('data.other.checkFields') || List()
        if (force !== true && !checkFields.includes('data.form.mobile')) return {}
        const mobile = this.metaAction.gf('data.form.mobile')
        return mobile ? { status: 'success' } : { status: 'error', message: '请录入手机号' }
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