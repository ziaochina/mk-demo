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
        const response = await this.webapi.proofOfCharge.init({ id: this.component.props.proofOfChargeId })
        this.injections.reduce('load', response)
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.proofOfCharge.prev(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.proofOfCharge.next(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    add = () => {
        this.injections.reduce('setForm')
    }

    del = async () => {
        const id = this.metaAction.gf('data.form.id')
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const response = await this.webapi.proofOfCharge.del({ id })
            this.metaAction.toast('success', '删除单据成功')
            this.injections.reduce('setForm', response)
        }
    }

    audit = async () => {
        const id = this.metaAction.gf('data.form.id')
        if (!id)
            return

        const response = await this.webapi.proofOfCharge.audit({ id })
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    commonMenuClick = (e) => {
         switch (e.key) {
            case 'useCommon':
                throw '请实现使用常用凭证'
            case 'saveCommon':
                throw '保存为常用凭证'
        }
    }

    moreMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.del()
                break
            case 'print':
                throw '请实现打印功能'
        }
    }

    checkSave(form) {
        var msg = []

        if (!form.code)
            msg.push('凭证号不能为空!')

        if (!form.date ) {
            msg.push('日期不能为空!')
        }


        form.details.forEach((detail, index) => {
            if (!detail.abstract)
                msg.push(`明细第${index + 1}行，摘要不能为空！`)
            if (!detail.captionOfAccount)
                msg.push(`明细第${index + 1}行，科目不能为空！`)
            if (!detail.debit && !detail.credit)
                msg.push(`明细第${index + 1}行，借方金额和贷方金额不能同时为空或者0！`)
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
            const response = await this.webapi.proofOfCharge.update(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
        else {
            const response = await this.webapi.proofOfCharge.create(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
    }


    abstractFocus = async () => {
        const response = await this.webapi.abstract.query()
        this.metaAction.sf('data.other.abstracts', fromJS(response))
    }

    abstractChange = (rowIndex, row, src) => (v) => {
        const hit = src.find(o => o.id == v)
        if (hit)
            this.metaAction.sf('data.form.details.' + rowIndex + '.abstract', fromJS(hit))
        else
            this.metaAction.sf('data.form.details.' + rowIndex + '.abstract', v)
    }

    captionOfAccountFocus = async () => {
        const response = await this.webapi.captionOfAccount.query()
        this.metaAction.sf('data.other.captionOfAccounts', fromJS(response))
    }

    sum = (details, fieldName) => {
        return this.sumInternal(details, (a, b) => a + b[fieldName])
    }

    getTotal = (details) => {
        return '合计:' + utils.number.moneySmalltoBig (this.sum(details, 'debit'))
    }

    sumInternal(details, fn) {
        if (!details || details.length == 0)
            return '0'

        return details.reduce((a, b) => {
            let r = fn(a, b)
            return isNaN(r) ? a : r
        }, 0)
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