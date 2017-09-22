import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'

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

        const pagination = this.metaAction.gf('data.pagination').toJS()
        this.load(pagination)
    }

    load = async (pagination, filter = { type: 1 }) => {
        const response = await this.webapi.goods.init({ pagination, filter })
        response.filter = filter
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    isSelectAll = () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
            return false

        return lst.every(o => o.get('selected'))
    }

    selectAll = (e) => {
        this.injections.reduce('selectAll', e.target.checked)
    }

    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ current, pageSize }, filter)
    }

    selectType = (selectedKeys, info) => {
        const pagination = { current: 1, total: 0, pageSize: 20 },
            filter = { type: selectedKeys[0] }
        this.load(pagination, filter)
    }

    loopTreeChildrenInternal = data => {
        if (!data) return null

        return data.map((item) => {
            if (item.children && item.children.length) {
                return {
                    name: item.id,
                    component: 'Tree.TreeNode',
                    key: item.id,
                    title: item.name,
                    children: this.loopTreeChildrenInternal(item.children)
                }
            }

            return {
                name: item.id,
                component: 'Tree.TreeNode',
                key: item.id,
                title: item.name
            }
        })
    }

    loopTreeChildren = data => {
        var ret = {
            _isMeta: true,
            value: this.loopTreeChildrenInternal(data)
        }
        /*
        return data.map((item) => {
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.id} title={item.name}>{this.loopTreeChildren(item.children)}</Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.id} title={item.name} />
        })*/
        return ret;
    }


    addType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-tree-table-type', {
                store: this.component.props.store,
                parentId: type
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

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('mk-app-tree-table-type', {
                store: this.component.props.store,
                typeId: type
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
            const id = this.metaAction.gf('data.filter.type')
            const response = await this.webapi.goodsType.del({ id })
            this.metaAction.toast('success', '删除类型成功')
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination, { type: -1 })

        }
    }

    addDetail = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-tree-table-detail', {
                store: this.component.props.store,
                typeId: type
            })
        })

        if (ret) {
            this.reload()
        }


    }

    modifyDetail = (id) => async () => {
        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('mk-app-tree-table-detail', {
                store: this.component.props.store,
                id
            })
        })

        if (ret) {
            this.reload()
        }
    }

    batchDelDetail = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0)
            this.metaAction.toast('error', '请选中要删除的商品')

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0)
            this.metaAction.toast('error', '请选中要删除的商品')

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.goods.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}