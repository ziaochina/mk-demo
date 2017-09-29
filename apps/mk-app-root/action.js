import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { history as hh } from 'mk-utils'
import { getInitState } from './data'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        const initState = getInitState()
        initState.data.currentAppName = this.getAppNameByPathname(this.config.history.location.pathname)
        this.listenHistory()
        injections.reduce('init', { initState })
    }

    onRedirect = ({ appName }) => {
        this.injections.reduce('redirect', appName)
    }

    listenHistory = () => {
        const defaultAppName = getInitState().data.currentAppName

        if (!this.unlisten) {
            this.unlisten = this.config.history.listen((location, action) => {
                const currentAppName = this.metaAction.gf('data.currentAppName') || defaultAppName
                const targetAppName = this.getAppNameByPathname(location.pathname)

                if (targetAppName == currentAppName){
                    if(location.pathname != `/mk-app-root/${currentAppName}`){
                        this.config.history.replace(`/mk-app-root/${currentAppName}`)
                    }
                    return
                }
                this.onRedirect({ appName: targetAppName })
            })
        }
    }

    getAppNameByPathname = (pathname) => {
        const defaultAppName = getInitState().data.currentAppName
        if (!pathname || pathname == '/' || pathname.indexOf('mk-app-root') == -1)
            return defaultAppName

        const segs = pathname.replace('/mk-app-root', '').split('/')
        return segs.length > 1 ? segs[1] : defaultAppName
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}