import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import utils from 'mk-utils'
import { fromJS } from 'immutable'


const unitGridColKeys = [
    'unit',
    'conversionRate',
    'conversionDesc',
    'isBase',
    'isPu',
    'isSa',
    'isSt'
]
const priceGirdColKeys = [
    'unit',
    'lastPuPrice',
    'referPuPrice',
    'lastSaPrice',
    'retailPrice',
    'firstTradePrice',
    'secondTradePrice',
    'thirdTradePrice',
    'fourthTradePrice',
    'fifthTradePrice',
    'sixthTradePrice',
    'servenTradePrice',
    'eighthTradePrice',
    'ninthTradePrice',
    'tenthTradePrice',
]

const barcodeGridColKeys = [
    'barcode',
    'unit'
]


class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
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

    mousedown = (e) => {
        const path = utils.path.findPathByEvent(e)
        if (this.metaAction.isFocus(path)) return

        if (path.indexOf('cell.cell') != -1) {
            this.focusCell(this.getCellInfo(path), path)
        }
        else {
            if (!this.metaAction.focusByEvent(e)) return
            setTimeout(this.cellAutoFocus, 16)
        }
    }

    gridKeydown = (e) => {
        var path = ''

        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 40) {
            path = utils.path.findPathByEvent(e)
            if (!path || path.indexOf(',') == -1)
                return
        }

        //37:左键
        if (e.keyCode == 37) {
            if (!utils.dom.cursorAtBegin(e)) return
            this.moveEditCell(path, 'left')
            return
        }

        //39:右键 13:回车 108回车 tab:9
        if (e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9) {
            if (!utils.dom.cursorAtEnd(e)) return
            this.moveEditCell(path, 'right')
            return
        }

        //38:上键
        if (e.keyCode == 38) {
            this.moveEditCell(path, 'up')
            return
        }

        //40:下键
        if (e.keyCode == 40) {
            this.moveEditCell(path, 'down')
            return
        }

    }

    moveEditCell(path, action) {
        const cellInfo = this.getCellInfo(path)
        this.moveCell(cellInfo, action, path)
    }

    moveCell(cellInfo, action, path) {
        const isReadOnly = (cellPosition, path) => {
            /*
            if (path.indexOf('unitGrid') != -1) {
                if (cellPosition.x == 2) {
                    return true
                }
            }*/
            return false
        }

        const position = utils.matrix.move(cellInfo.rowCount, cellInfo.colCount, { x: cellInfo.x, y: cellInfo.y }, action)
        if (isReadOnly(position, path)) {
            this.moveCell(position, action, path)
        } else {
            this.focusCell(position, path)
        }
    }

    focusCell(position, path) {
        if (path.indexOf('unitGrid') != -1) {
            this.metaAction.sfs({
                'data.other.focusFieldPath': `root.children.base.children.zone2.children.unitGrid.columns.${unitGridColKeys[position.x]}.cell.cell,${position.y}`,
                'data.other.unitGridScrollToRow': position.y,
                'data.other.unitGridScrollToColumn': position.x + 1
            })
        }
        else if (path.indexOf('priceGrid') != -1) {
            this.metaAction.sfs({
                'data.other.focusFieldPath': `root.children.base.children.zone3.children.priceGrid.columns.${priceGirdColKeys[position.x]}.cell.cell,${position.y}`,
                'data.other.priceGridScrollToRow': position.y,
                'data.other.priceGridScrollToColumn': position.x + 1
            })
        }
        else if (path.indexOf('barcodeGrid') != -1) {
            this.metaAction.sfs({
                'data.other.focusFieldPath': `root.children.barcode.children.barcodeGrid.columns.${barcodeGridColKeys[position.x]}.cell.cell,${position.y}`,
                'data.other.priceGridScrollToRow': position.y,
                'data.other.priceGridScrollToColumn': position.x + 1
            })
        }


        setTimeout(this.cellAutoFocus, 16)
    }


    getCellInfo(path) {
        const parsedPath = utils.path.parsePath(path)
        if (path.indexOf('unitGrid') != -1) {
            const rowCount = this.metaAction.gf('data.form.units').size
            const colCount = 7
            var colKey = parsedPath.path
                .replace('root.children.base.children.zone2.children.unitGrid.columns.', '')
                .replace('.cell.cell', '')
                .replace(/\s/g, '')

            return {
                x: unitGridColKeys.findIndex(o => o == colKey),
                y: Number(parsedPath.vars[0]),
                colCount,
                rowCount,
            }
        }
        else if (path.indexOf('priceGrid') != -1) {
            const rowCount = this.metaAction.gf('data.form.prices').size
            const colCount = 15
            var colKey = parsedPath.path
                .replace('root.children.base.children.zone3.children.priceGrid.columns.', '')
                .replace('.cell.cell', '')
                .replace(/\s/g, '')

            return {
                x: priceGirdColKeys.findIndex(o => o == colKey),
                y: Number(parsedPath.vars[0]),
                colCount,
                rowCount,
            }
        }
        else if (path.indexOf('barcodeGrid') != -1) {
            const rowCount = this.metaAction.gf('data.form.barcodes').size
            const colCount = 2
            var colKey = parsedPath.path
                .replace('root.children.barcode.children.barcodeGrid.columns.', '')
                .replace('.cell.cell', '')
                .replace(/\s/g, '')

            return {
                x: barcodeGridColKeys.findIndex(o => o == colKey),
                y: Number(parsedPath.vars[0]),
                colCount,
                rowCount,
            }
        }
    }

    cellAutoFocus = () => {
        utils.dom.gridCellAutoFocus(this.component, '.editable-cell')
    }

    getCellClassName = (path, align) => {

        var clsName = this.metaAction.isFocus(path) ? 'mk-app-stock-card-cell editable-cell' : ''

        if (align) {
            clsName += ' mk-app-stock-card-cell-' + align
        }
        return clsName
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
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}