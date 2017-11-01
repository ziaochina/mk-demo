import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
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

        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    load = async (pagination, filter) => {
        const response = await this.webapi.stockList.init({ pagination, filter })
        response.filter = filter
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ current, pageSize }, filter)
    }

    selectType = (selectedKeys, info) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS(),
            stockTypes = this.metaAction.gf('data.other.stockTypes').toJS(),
            stockType = utils.tree.find(stockTypes, 'children', n => n.id == selectedKeys[0])

        filter.type = stockType
        this.load(pagination, filter)
    }

    getTypeChildren = stockTypes => {
        if (!stockTypes)
            return null

        const value = utils.tree.map(stockTypes, 'children', '', (n) => ({
            name: n.id,
            component: 'Tree.TreeNode',
            key: n.id,
            title: n.name,
            children: n.children
        }))
        return { _isMeta: true, value }
    }

    searchChange = utils._.debounce((v) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.search = v
        this.load(pagination, filter)
    }, 200)

    showDisableChange = (e) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.showDisable = e.target.checked
        this.load(pagination, filter)
    }

    batchMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.batchDel()
                break
            case 'modify':
                this.batchModify()
                break
            case 'disable':
                this.batchDisable()
                break
            case 'enable':
                this.batchEnable()
                break

        }
    }

    batchModify = async () => {
        throw '请实现批量删除功能'
    }


    batchDel = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要删除的存货')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要删除的存货')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.stockList.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    batchDisable = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要停用的存货')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要停用的存货')
            return
        }

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.stockList.disable({ ids })
        this.metaAction.toast('success', '停用成功')
        this.reload()
    }

    batchEnable = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要启用的存货')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要启用的存货')
            return
        }

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.stockList.enable({ ids })
        this.metaAction.toast('success', '启用成功')
        this.reload()
    }

    del = (id) => async () => {
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = [id]
        await this.webapi.stockList.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    addType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个父分类')
            return
        }

        if (!this.config.apps['mk-app-stock-type-card']) {
            throw '依赖mk-app-stock-type-card app,请使用mk clone mk-app-stock-type-card命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-stock-type-card', {
                store: this.component.props.store,
                parentId: type.get('id')
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modifyType = async () => {
        const type = this.metaAction.gf('data.filter.type')

        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        if (!this.config.apps['mk-app-stock-type-card']) {
            throw '依赖mk-app-stock-type-card app,请使用mk clone mk-app-stock-type-card命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('mk-app-stock-type-card', {
                store: this.component.props.store,
                typeId: type.get('id')
            })
        })
        if (ret) {
            this.reload()
        }
    }

    delType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const id = this.metaAction.gf('data.filter.type.id')
            const response = await this.webapi.stockType.del({ id })
            this.metaAction.toast('success', '删除类型成功')
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination, { type: undefined })
        }
    }

    add = async () => {
        /*
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }*/

        if (!this.config.apps['mk-app-stock-card']) {
            throw '依赖mk-app-stock-card app,请使用mk clone mk-app-stock-card命令添加'
        }

        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('存货卡片', 'mk-app-stock-card')
    }

    modify = (id) => async () => {
        if (!this.config.apps['mk-app-stock-card']) {
            throw '依赖mk-app-stock-card app,请使用mk clone mk-app-stock-card命令添加'
        }

        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('存货卡片', 'mk-app-stock-card', { stockId: id })

    }

    print = () => {
        throw '请实现打印功能'
    }

    imp = () => {
        throw '请实现导入功能'
    }

    exp = () => {
        throw '请实现导出功能'
    }

    setting = () => {
        throw '请实现设置功能'
    }

    numberFormat = utils.number.format

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction })

    const ret = { ...metaAction, ...extendAction.gridAction, ...o }
    metaAction.config({ metaHandlers: ret })

    return ret
}