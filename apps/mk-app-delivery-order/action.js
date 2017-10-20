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
        const response = await this.webapi.deliveryOrder.init({ id: this.component.props.deliveryOrderId })
        this.injections.reduce('load', response)
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.deliveryOrder.prev(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.deliveryOrder.next(id)
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
            const response = await this.webapi.deliveryOrder.del({ id })
            this.metaAction.toast('success', '删除单据成功')
            this.injections.reduce('setForm', response)
        }
    }

    audit = async () => {
        const id = this.metaAction.gf('data.form.id')
        if (!id)
            return

        const response = await this.webapi.deliveryOrder.audit({ id })
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    moreMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.del()
                break
            case 'receipt':
                throw '请实现收款功能'
            case 'history':
                throw '请实现历史功能'
        }
    }

    setting = () => {
        throw '请实现设置功能'
    }


    checkSave(form) {
        var msg = []
        if (!form.customer || !form.customer.id) {
            msg.push('客户不能为空!')
        }

        if (!form.date)
            msg.push('单据日期不能为空!')

        if (!form.warehouse || !form.warehouse.id)
            msg.push('仓库不能为空!')

        if (!form.ticketType || !form.ticketType.id)
            msg.push('仓库不能为空!')

        if (!form.details || form.details.length == 0) {
            msg.push('明细不能为空！')
        }

        form.details.forEach((detail, index) => {
            if (!detail.stock)
                msg.push(`明细第${index + 1}行，存货不能为空！`)
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
            const response = await this.webapi.deliveryOrder.update(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
        else {
            const response = await this.webapi.deliveryOrder.create(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
    }

    customerFocus = async () => {
        const response = await this.webapi.customer.query()
        this.metaAction.sf('data.other.customers', fromJS(response))
    }

    warehouseFocus = async () => {
        const response = await this.webapi.warehouse.query()
        this.metaAction.sf('data.other.warehouses', fromJS(response))
    }

    ticketTypeFocus = async () => {
        const response = await this.webapi.ticketType.query()
        this.metaAction.sf('data.other.ticketTypes', fromJS(response))
    }

    stockFocus = async () => {
        const response = await this.webapi.stock.query()
        this.metaAction.sf('data.other.stocks', fromJS(response))
    }

    taxRateFocus = async () => {
        const response = await this.webapi.taxRate.query()
        this.metaAction.sf('data.other.taxRates', fromJS(response))
    }

    settlementModeFocus = async () => {
        const response = await this.webapi.settlementMode.query()
        this.metaAction.sf('data.other.settlementModes', fromJS(response))
    }

    accountFocus = async () => {
        const response = await this.webapi.assetAccount.query()
        this.metaAction.sf('data.other.assetAccounts', fromJS(response))
    }

    numberFormat = (number, decimals, isFocus = false) => {
        if (isFocus === true) return number
        return utils.number.format(number, decimals)
    }

    numberChange = (rowIndex, rowData) => (v) => {
        const number = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            amount = utils.number.round(price * number, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.number`]: number,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.priceTaxTotal`]: priceTaxTotal,
        })
    }

    priceChange = (rowIndex, rowData) => (v) => {
        const price = utils.number.round(v, 2),
            number = utils.number.round(rowData.number, 2),
            amount = utils.number.round(price * number, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.price`]: price,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.priceTaxTotal`]: priceTaxTotal,
        })
    }

    taxRateChange = (rowIndex, rowData, taxRates) => (v) => {
        const hit = taxRates.find(o => o.id == v)

        if (!hit)
            return

        const amount = rowData.amount,
            tax = utils.number.round(amount * hit.id / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.taxRate`]: fromJS(hit),
            [`data.form.details.${rowIndex}.tax`]: fromJS(tax),
            [`data.form.details.${rowIndex}.priceTaxTotal`]: priceTaxTotal,
        })
    }

    sumAmount = (details) => {
        return this.numberFormat(this.sum(details, (a, b) => a + b.amount), 2)
    }

    sumTax = (details) => {
        return this.numberFormat(this.sum(details, (a, b) => a + b.tax), 2)
    }

    sumPriceTaxTotal = (details) => {
        return this.numberFormat(this.sum(details, (a, b) => a + b.priceTaxTotal), 2)
    }

    calcBalance = (data) => {
        const priceTaxTotal = this.sum(data.form.details, (a, b) => a + b.priceTaxTotal),
            settlementTotal = this.sum(data.form.settlements, (a, b) => a + b.settlementAmount),
            advanceAmount = data.form.useAdvance ? utils.number.round(data.form.advanceAmount, 2) : 0

        return this.numberFormat(priceTaxTotal - settlementTotal - advanceAmount, 2)
    }




    sum(details, fn) {
        if (!details || details.length == 0)
            return this.numberFormat(0, 2)

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