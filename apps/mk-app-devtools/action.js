import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import utils from 'mk-utils'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        console.log('init')
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    getApps = () => {
        const keys = Object.keys(this.config.apps)
        var ret = {}
        keys.forEach(k=>{
            if(k != 'config')
                ret[k] = this.config.apps[k]
        })

        return ret
    }

    tabChange = (key) =>{
        this.metaAction.sf('data.tabKey', key)
    }

    getState = () =>{
        return window.reduxStore.getState().toJS()
    }

    getMockData = () => {
        return utils.fetch.mockData
    }

    getAPIs = () => {
        return utils.fetch.mockApi
    }

    isExistsApidocApp = () => {
        return !!this.config.apps['mk-app-apidoc']
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}