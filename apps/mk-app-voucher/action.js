import React from 'react'
import ReactDOM from 'react-dom'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { Map, fromJS } from 'immutable'
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
        const payload = {}
        const response = await this.webapi.voucher.init({ id: this.component.props.voucherId })
        payload.voucher = response.voucher
        payload.educationDataSource = response.educations
        payload.relaDataSource = response.relas
        this.injections.reduce('load', payload)
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.voucher.prev(id)
        if (response) {
            this.injections.reduce('setVoucher', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.voucher.next(id)
        if (response) {
            this.injections.reduce('setVoucher', response)
        }
    }

    add = () => {
        this.injections.reduce('setVoucher')
    }

    del = async () => {
        const id = this.metaAction.gf('data.form.id')
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const response = await this.webapi.voucher.del({ id })
            this.metaAction.toast('success', '删除单据成功')
            this.injections.reduce('setVoucher', response)
        }
    }

    checkSave(form) {
        var msg = []
        if (!form.name) {
            msg.push('姓名不能为空!')
        }

        if (!form.mobile)
            msg.push('手机不能为空!')

        if (!form.details || form.details.length == 0) {
            msg.push('家庭情况不能为空！')
        }

        form.details.forEach((detail, index) => {
            if (!detail.name)
                msg.push(`家庭情况第${index + 1}行，家庭成员姓名不能为空！`)

            if (!detail.rela)
                msg.push(`家庭情况第${index + 1}行，关系不能为空！`)
        })

        return msg
    }

    save = async () => {
        var form = this.metaAction.gf('data.form').toJS()
        const msg = this.checkSave(form)

        if (msg.length > 0) {
            this.metaAction.toast('error',
                <ul style={{ textAlign: 'left' }}>
                    {msg.map(o => <li>{o}</li>)}
                </ul>
            )
            return
        }

        if (form.id || form.id == 0) {
            const response = await this.webapi.voucher.update(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setVoucher', response)
            }
        }
        else {
            const response = await this.webapi.voucher.create(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setVoucher', response)
            }
        }
    }

    addEducation = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增学历',
            children: this.metaAction.loadApp('mk-app-voucher-education', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            const response = await this.webapi.education.query()
            this.metaAction.sfs({
                'data.other.educationDataSource': fromJS(response),
                'data.form.education': fromJS(ret)
            })
        }
    }

    educationFocus = async () => {
        const response = await this.webapi.education.query()
        this.metaAction.sf('data.other.educationDataSource', fromJS(response))
    }

    educationChange = (v) => {
        const educationDataSource = this.metaAction.gf('data.other.educationDataSource')
        const education = educationDataSource.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.education`, education)
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