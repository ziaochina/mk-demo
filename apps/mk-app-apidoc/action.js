import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { Tree } from 'mk-component'
import utils from 'mk-utils'
import beautify from 'mk-utils/lib/beautify'
import { fromJS } from 'immutable'

let apisJson
let apis


class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        if (!apisJson) {
            apisJson = [...this.config.apis]
            Object.keys(utils.fetch.mockApi).forEach(k => {
                if (apisJson.findIndex(o => o.url == k) == -1) {
                    apisJson.push({
                        url: k,
                        group: '未写注释'
                    })
                }
            })
            apisJson = apisJson.sort((a, b) => a.url > b.url ? 1 : -1)
            apisJson = apisJson.filter((o, index, self) => self.findIndex(x => x.url == o.url) == index)
            apis = fromJS(apisJson)
        }

        injections.reduce('init', apisJson)

        const filter = this.metaAction.gf('data.filter').toJS()

        this.load(filter)
    }

    load = (filter) => {
        var lst = apis.filter(o => {
            return o.get('group').indexOf(filter.group) != -1
                && (
                    !filter.search
                    || (o.get('title') && o.get('title').indexOf(filter.search) != -1)
                    || (o.get('url') && o.get('url').indexOf(filter.search) != -1)
                )
        })

        this.metaAction.sfs({
            "data.apis": lst,
            "data.filter": fromJS(filter)
        })
    }


    loopTreeChildren = (groups) => {
        if (!groups || groups.length == 0) return null
        return groups.map((item) => {
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.group} title={item.group}>{this.loopTreeChildren(item.children)}</Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.group} title={item.group} />
        })
    }

    selectGroup = (selectedKeys) => {
        const filter = this.metaAction.gf('data.filter').toJS()

        var selectedGroup = ''
        if (!selectedKeys || selectedKeys.length == 0)
            selectedGroup = ''
        else
            selectedGroup = selectedKeys[0]

        if (filter.gourp == selectedGroup)
            return

        filter.group = selectedGroup
        this.load(filter)

    }
    searchChange = (e) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        const search = e.target.value
        if (search == filter.search)
            return

        filter.search = search
        this.load(filter)
    }

    rowClick = (e, rowIndex) => {
        const api = this.metaAction.gf('data.apis.' + rowIndex)
        const currentApi = this.metaAction.gf('data.currentApi')

        if (currentApi && currentApi.get('url') == api.get('url'))
            return
        const apiJSON = api.toJS()
        const apiParamExample = apiJSON.parameter && apiJSON.parameter.examples && apiJSON.parameter.examples[0]

        this.metaAction.sfs({
            'data.currentApi': api,
            'data.currentTabKey': 'base',
            'data.runParams': apiParamExample && apiParamExample.content,
            'data.runUrl': apiJSON.url,
            'data.runResult': undefined
        })
    }

    tabChange = (key) => {
        this.metaAction.sf('data.currentTabKey', key)
    }

    getCellClassName = (rowIndex) => {
        if (this.metaAction.gf('data.currentApi.url') == this.metaAction.gf(`data.apis.${rowIndex}.url`))
            return 'mk-app-apidoc-content-grid-content-cell mk-app-apidoc-content-grid-content-selectrow'
        else
            return 'mk-app-apidoc-content-grid-content-cell'
    }
    runParamsChange = (e, d, v) => {
        this.metaAction.sf('data.runParams', v)
    }

    run = async () => {
        var runParams = this.metaAction.gf('data.runParams')
        var runUrl = this.metaAction.gf('data.runUrl')
        try {
            runParams = utils.string.toJson(runParams)
            const response = await utils.fetch.post(runUrl, runParams, undefined, { ignoreAOP: true })

            this.metaAction.sf('data.runResult', beautify.beautifyJS(JSON.stringify(response)))
        } catch (e) {

            this.metaAction.sf('data.runResult', e.stack)
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