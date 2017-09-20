import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import utils from 'mk-utils'
import common from './common'
import beautify from 'mk-utils/lib/beautify'
import { fromJS } from 'immutable'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init', { apps: this.getApps() })
    }

    getApps = (search) => {
        const apps = this.config.apps
        const keys = Object.keys(apps)
        const ret = []

        keys.forEach(k => {
            if (k != 'config') {
                ret.push({
                    name: apps[k].name,
                    meta: apps[k].meta
                })
            }
        })
        if (!search)
            return ret

        return ret.filter(o => o.name.indexOf(search) != -1)
    }

    appSelected = (selectedKeys) => {
        if(!selectedKeys && selectedKeys.length == 0)
            return 

        const apps = this.metaAction.gf('data.apps')
        const hit = apps.find(o => o.get('name') == selectedKeys[0])

        if (hit) {
            this.metaAction.sfs({
                'data.selectApp': hit,
                'data.currentJson':
                this.metaAction.gf('data.selectType') == 'meta'
                    ? beautify.beautifyJS(JSON.stringify(hit.get('meta').toJS()))
                    : beautify.beautifyJS(this.getAppState(hit.get('name')))
            })
        }

    }

    searchChange = (e) => {
        this.metaAction.sfs({
            'data.search': e.target.value,
            'data.apps': fromJS(this.getApps(e.target.value))
        })
    }

    typeChange = (e) => {
        var currentJson = ''

        if (e.target.value == 'meta') {
            currentJson = beautify.beautifyJS(JSON.stringify(this.metaAction.gf('data.selectApp.meta').toJS()))
        } else {
            const appName = this.metaAction.gf('data.selectApp.name')
            currentJson = this.getAppState(appName)
        }

        this.metaAction.sfs({
            'data.selectType': e.target.value,
            'data.currentJson': beautify.beautifyJS(currentJson)
        })
    }

    getAppState = (appName) => {
        var state = window.__mk_store__.getState().get(appName)
        if (!state)
            return '该应用还未加载'
        state = state.toJS()
        return beautify.beautifyJS(JSON.stringify({ data: state.data }))
    }

    jsonChange = (e, d, v) => {
        try {
            const json = utils.string.toJson(v)
            const appName = this.metaAction.gf('data.selectApp.name')
            const type = this.metaAction.gf('data.selectType')

            if(type == 'meta'){
                this.metaAction.sfs({
                    'data.currentJson': v,
                    'data.selectApp.meta': fromJS(json)
                })
            }
            else{
                this.metaAction.sf('data.currentJson', v)
            }
            
            if (type == 'meta'){
                
                this.forceUpdateMeta(appName, json)
            }
            else if (type == 'state')
                this.forceUpdateState(appName, json)
        }
        catch (e) {
            console.error(e)
        }
    }


    forceUpdateMeta = (appName, meta) => {
        setTimeout(() => {
            this.metaAction.setMetaForce(appName, meta)
            const apps = this.metaAction.getAppInstances()
            const keys = Object.keys(apps)
            keys.forEach(k => {
                if (apps[k].appName == appName) {
                    const inst = apps[k].instance
                    inst.forceUpdate()
                }
            })
        }, 0)
    }

    forceUpdateState = (appName, state) => {
        setTimeout(() => {
            const apps = this.metaAction.getAppInstances()
            const keys = Object.keys(apps)
            keys.forEach(k => {
                if (apps[k].appName == appName) {
                    const inst = apps[k].instance
                    inst.props.setField('data', fromJS(state.data))
                }
            })
        }, 0)
    }

    formatJson = () => {
        const formated = beautify.beautifyJS(this.metaAction.gf('data.currentJson'))
        this.metaAction.sf('data.currentJson', formated)
    }

    reset = () => {
        const apps = this.config.apps
        const keys = Object.keys(apps)
        const selectApp = this.metaAction.gf('data.selectApp')
        keys.forEach(k => {
            if (apps[k].name == selectApp.get('name')) {
                this.metaAction.sfs({
                    'data.selectApp.meta': fromJS(apps[k].meta),
                    'data.currentJson': beautify.beautifyJS(JSON.stringify(apps[k].meta))
                })

                this.forceUpdateMeta(selectApp.get('name'), apps[k].meta)
            }
        })
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}