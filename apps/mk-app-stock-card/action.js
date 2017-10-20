import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import utils from 'mk-utils'
import { fromJS } from 'immutable'
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
        const response = await this.webapi.stock.init({ id: this.component.props.stockId })
        this.injections.reduce('load', response)
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.stock.prev(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.stock.next(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    add = () => {
        this.injections.reduce('setForm')
    }

    checkSave(form) {
        var msg = []

        if (!form.code)
            msg.push('存货编码不能为空!')

        if (!form.name) {
            msg.push('存货名称不能为空!')
        }

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
            const response = await this.webapi.stock.update(form)
            if (response) {
                this.metaAction.toast('success', '保存存货成功')
                this.injections.reduce('setForm', response)
            }
        }
        else {
            const response = await this.webapi.stock.create(form)
            if (response) {
                this.metaAction.toast('success', '保存存货成功')
                this.injections.reduce('setForm', response)
            }
        }
    }

    tabChange = (key) => {
        this.metaAction.sf('data.other.tabKey', key)
    }

    categoryChange = (v) => {
        const ds = this.metaAction.gf('data.other.categories')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.category`, hit)
    }

    pricingModeChange = (v) => {
        const ds = this.metaAction.gf('data.other.pricingModes')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.pricingMode`, hit)
    }

    getTypeDropdownChildren = (types) => {
        if (!types)
            return

        return {
            _isMeta: true,
            value: utils.tree.map(types, 'children', '', (n) => ({
                name: n.id,
                component: 'TreeSelect.TreeNode',
                key: n.id,
                title: n.name,
                value: n.id,
                children: n.children
            }))
        }
    }

    typeChange = (v) => {
        const ds = this.metaAction.gf('data.other.types').toJS()
        const hit = utils.tree.find(ds, 'children', (n) => n.id == v)
        this.metaAction.sf(`data.form.type`, fromJS(hit))
    }

    typeFocus = async () => {
    }


    addType = async () => {

    }

    getImg = () => img

    taxRateChange = (v) => {
        const ds = this.metaAction.gf('data.other.taxRates')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.taxRate`, hit)
    }



    meaUnitChange = (v) => {
        const ds = this.metaAction.gf('data.other.meaUnits')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.meaUnit`, hit)
    }

    meaUnitFocus = async () => {
        const response = await this.webapi.meaUnit.query()
        this.metaAction.sf('data.other.meaUnits', fromJS(response))
    }

    addMeaUnit = async () => {
        this.addUnit('data.form.meaUnit')
    }

    addMeaUnit4UnitGird = rowIndex => async () => {
        this.addUnit(`data.form.units.${rowIndex}.unit`)
    }

    addMeaUnit4PriceGird = rowIndex => async () => {
        this.addUnit(`data.form.prices.${rowIndex}.unit`)
    }

    addMeaUnit4barcodeGird = rowIndex => async () => {
        this.addUnit(`data.form.barcodes.${rowIndex}.unit`)
    }

    addUnit = async (path) => {
        if (!this.config.apps['mk-app-mea-unit-card']) {
            throw '依赖mk-app-mea-unit-card app,请使用mk clone mk-app-mea-unit-card命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-mea-unit-card', {
                store: this.component.props.store
            })
        })

        if (ret) {
            const response = await this.webapi.meaUnit.query()
            this.metaAction.sfs({
                'data.other.meaUnits': fromJS(response),
                [path]: fromJS(ret)
            })
        }
    }

    imgChange = (index) => {
        this.metaAction.sf(`data.other.selectedImgIndex`, index)
    }

    addImg = () => {
        this.metaAction.toast('error', '静态网站未实现')
    }

    delImg = () => {
        this.injections.reduce('delImg')
    }

    

    addUnitRow = (ps) => {
        this.injections.reduce('addUnitRow', ps.rowIndex + 1)
    }

    delUnitRow = (ps) => {
        this.injections.reduce('delUnitRow', ps.rowIndex)
    }

    addPriceRow = (ps) => {
        this.injections.reduce('addPriceRow', ps.rowIndex + 1)
    }

    delPriceRow = (ps) => {
        this.injections.reduce('delPriceRow', ps.rowIndex)
    }

    addBarcodeRow = (ps) => {
        this.injections.reduce('addBarcodeRow', ps.rowIndex + 1)
    }

    delBarcodeRow = (ps) => {
        this.injections.reduce('delBarcodeRow', ps.rowIndex)
    }

    unitsUnitChange = (rowIndex) => (v) => {
        const ds = this.metaAction.gf('data.other.meaUnits')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.units.${rowIndex}.unit`, hit)
    }

    numberFormat = (isFocus, number, decimals) => {
        if (isFocus) return number
        return utils.number.format(number, decimals)
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction}),
        o = new action({ ...option, metaAction, extendAction }),
        ret = { ...metaAction, ...extendAction.gridAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}