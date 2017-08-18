import React from 'react'
import ReactDOM from 'react-dom'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { Map, fromJS } from 'immutable'
import moment from 'moment'
import utils from 'mk-utils'

const colKeys = ['name', 'rela', 'mobile', 'birthday', 'isWork']

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

    addrow = (ps) => {
        this.injections.reduce('addEmptyRow', ps.rowIndex + 1)
    }

    delrow = (ps) => {
        this.injections.reduce('delrow', ps.rowIndex)
    }

    getCellClassName = (path) => {
        return this.metaAction.isFocus(path) ? 'mk-app-voucher-cell editable-cell' : ''
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
        const position = utils.matrix.move(cellInfo.rowCount, cellInfo.colCount, { x: cellInfo.x, y: cellInfo.y }, action)
        this.focusCell(position)
    }

    focusCell(position) {
        this.metaAction.sfs({
            'data.other.focusFieldPath': `root.children.formDetails.columns.${colKeys[position.x]}.cell.cell,${position.y}`,
            'data.other.scrollToRow': position.y,
            'data.other.scrollToColumn': position.x
        })

        setTimeout(this.cellAutoFocus, 16)
    }

    getCellInfo(path) {
        const parsedPath = utils.path.parsePath(path)

        const rowCount = this.metaAction.gf('data.form.details').size
        const colCount = 5
        var colKey = parsedPath
            .path
            .replace('root.children.formDetails.columns.', '')
            .replace('.cell.cell', '')
            .replace(/\s/g, '')

        return {
            x: colKeys.findIndex(o => o == colKey),
            y: Number(parsedPath.vars[0]),
            colCount,
            rowCount,
        }
    }

    cellAutoFocus = () => {
        utils.dom.gridCellAutoFocus(this.component, '.editable-cell')
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}