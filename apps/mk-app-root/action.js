import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current

        window.onhashchange = () => {
            const hash = document.location.hash || ''
            if (!hash || hash.substr(1) == this.metaAction.gf('data.currentAppName')){
                return
            }
            this.onRedirect({ appName: hash.substr(1) })
        }
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    onRedirect = ({ appName }) => {
        this.injections.reduce('redirect', appName)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}