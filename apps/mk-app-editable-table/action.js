import React from 'react'
import ReactDOM from 'react-dom'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { Input, DataGrid, DatePicker, Select } from 'mk-component'
import { Map } from 'immutable'
import moment from 'moment'
import utils from 'mk-utils'

const colKeys = ['name', 'mobile', 'birthday', 'sex']

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
        const response = await this.webapi.editableTable.query()
        this.injections.reduce('load', response)
    }

    save = async () => {
        var list = this.metaAction.gf('data.list').toJS()
        await this.webapi.editableTable.save(list)
        this.metaAction.toast('success', '保存成功')
        this.load()
    }


    addrow = (ps) => {
        this.injections.reduce('addEmptyRow', ps.rowIndex + 1)
    }

    delrow = (ps) => {
        const list = this.metaAction.gf('data.list')
        const id = list.getIn([ps.rowIndex, 'id'])
        this.injections.reduce('delrow', id)
    }


    mousedown = (e) => {
        const path = utils.path.findPathByEvent(e)
        if (this.metaAction.isFocus(path)) return

        if (path.indexOf('cell.cell') != -1) {
            this.focusCell(this.getCellInfo(path))
        }
        else {
            if (!this.metaAction.focusByEvent(e)) return
            setTimeout(this.cellAutoFocus, 16)
        }
    }

    getCellInfo(path) {
        const parsedPath = utils.path.parsePath(path)

        const rowCount = this.metaAction.gf('data.list').size
        const colCount = 4
        var colKey = parsedPath.path
            .replace('root.children.table.columns.', '')
            .replace('.cell.cell', '')
            .replace(/\s/g, '')

        return {
            x: colKeys.findIndex(o => o == colKey),
            y: Number(parsedPath.vars[0]),
            colCount,
            rowCount,
        }
    }

    focusCell(position) {
        this.metaAction.sfs({
            'data.other.focusFieldPath': `root.children.table.columns.${colKeys[position.x]}.cell.cell,${position.y}`,
            'data.other.scrollToRow': position.y,
            'data.other.scrollToColumn': position.x
        })

        setTimeout(this.cellAutoFocus, 16)
    }

    cellAutoFocus = () => {
        utils.dom.gridCellAutoFocus(this.component, '.editable-cell')
    }

    getCellClassName = (path) => {
        return this.metaAction.isFocus(path) ? 'mk-app-editable-table-cell editable-cell' : ''
    }

    isFocusCell = (ps, columnKey) => {
        const focusCellInfo = this.metaAction.gf('data.other.focusCellInfo')
        if (!focusCellInfo)
            return false
        return focusCellInfo.columnKey == columnKey && focusCellInfo.rowIndex == ps.rowIndex
    }

    gridBirthdayOpenChange = (status) => {
        if (status) return
        const editorDOM = ReactDOM.findDOMNode(this.component).querySelector(".editable-cell")
        if (!editorDOM) return

        if (editorDOM.className.indexOf('datepicker') != -1) {
            const input = editorDOM.querySelector('input')
            input.focus()
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