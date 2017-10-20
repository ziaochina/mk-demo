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
        const response = await this.webapi.deliverOrderList.init({ pagination, filter })
        response.filter = filter
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    add = async () => {
        if (!this.config.apps['mk-app-delivery-order']) {
            throw '依赖mk-app-delivery-order app,请使用mk clone mk-app-delivery-order命令添加'
        }

        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('销售出库单', 'mk-app-delivery-order')
    }


    batchMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.batchDel()
                break
            case 'audit':
                this.batchAudit()
                break
        }
    }

    batchDel = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要删除的记录')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要删除的记录')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.deliverOrderList.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    batchAudit = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要审核的记录')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要审核的记录')
            return
        }

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.deliverOrderList.audit({ ids })
        this.metaAction.toast('success', '审核成功')
        this.reload()
    }

    audit = (id) => async () => {
        await this.webapi.deliverOrderList.audit({ ids: [id] })
        this.metaAction.toast('success', '审核成功')
        this.reload()
    }

    reject = (id) => async () => {
        await this.webapi.deliverOrderList.reject({ ids: [id] })
        this.metaAction.toast('success', '反审核成功')
        this.reload()
    }

    del = (id) => async () => {
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        await this.webapi.deliverOrderList.del({ ids: [id] })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    modify = (id) => async () => {
        if (!this.config.apps['mk-app-delivery-order']) {
            throw '依赖mk-app-delivery-order app,请使用mk clone mk-app-delivery-order命令添加'
        }
        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('存货卡片', 'mk-app-delivery-order', { deliveryOrderId: id })
    }

    toggleShowAdvanceFilter = () => {
        this.metaAction.sf('data.other.isFold', !this.metaAction.gf('data.other.isFold'))
    }

    commonFilterChange = async (e) => {

        const key = e.target.value

        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.common = key
        const response = await this.webapi.deliverOrderList.query({ pagination, filter })

        response.filter = filter

        this.load(pagination, filter)
    }

    tabChange = async (key) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.targetList = key
        const response = await this.webapi.deliverOrderList.query({ pagination, filter })
        response.filter = filter

        this.load(pagination, filter)
    }

    customerChange = (v) => {
        const ds = this.metaAction.gf('data.other.customers')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.filter.customer`, hit)
    }

    search = () => {
        this.reload()
    }

    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ current, pageSize }, filter)
    }

    receipt = () => {
        throw '请实现收框功能'
    }

    print = () => {
        throw '请实现打印功能'
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