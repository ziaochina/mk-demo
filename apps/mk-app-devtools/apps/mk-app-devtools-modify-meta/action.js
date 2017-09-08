import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import utils from 'mk-utils'
import common from './common'
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

    getApps = () => {
        const apps = this.config.apps
        const keys = Object.keys(apps)
        const ret = []

        keys.forEach(k => {
            if (k != 'config') {
                ret.push({
                    name: apps[k].name,
                    meta: common.beautifyJS(JSON.stringify(apps[k].meta))
                })
            }
        })
        return ret
    }



    menuSelected = ({ item, key }) => {
        const apps = this.metaAction.gf('data.apps')
        const hit = apps.find(o => o.get('name') == key)
        if (hit)
            this.metaAction.sf('data.selectApp', hit)
    }

    metaChange = (e, d, v) => {
        try {
            const json = utils.string.toJson(v)
            const selectApp = this.metaAction.gf('data.selectApp').toJS()

            this.metaAction.sf('data.selectApp.meta', v)
            this.forceUpdateComponent(selectApp.name, json)
        }
        catch (e) {
            console.error(e)
        }
    }

    forceUpdateComponent = (appName, meta) => {
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

    /*
    getPreviewAppName = () => {
        var selectApp = this.metaAction.gf('data.selectApp')
        if (!selectApp || !selectApp.get('name')) return
        selectApp = selectApp.toJS()

        return selectApp.fullName.indexOf('?') == -1
            ? `${selectApp.fullName}?__isPreview=true`
            : `${selectApp.fullName}&__isPreview=true`
    }*/

    formatMeta = () => {
        this.metaAction.sf('data.selectApp.meta', common.beautifyJS(this.metaAction.gf('data.selectApp.meta')))
    }

    reset = () => {
        const apps = this.config.apps
        const keys = Object.keys(apps)
        const selectApp = this.metaAction.gf('data.selectApp')
        keys.forEach(k => {
            if (apps[k].name == selectApp.get('name')) {
                const resetMeta = common.beautifyJS(JSON.stringify(apps[k].meta))
                this.metaAction.sf('data.selectApp.meta', resetMeta)
                this.forceUpdateComponent(selectApp.get('name'), apps[k].meta)
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