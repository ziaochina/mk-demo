import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        this.replaceHistory(option.initState.data.currentAppName)
        return this.metaReducer.init(state, option.initState)
    }

    redirect = (state, appName) => {
        this.replaceHistory(appName)
        return this.metaReducer.sf(state, 'data.currentAppName', appName)
    }

    replaceHistory = (appName) => {
        setTimeout(() => {
            this.config.history.push(`/mk-app-root/${appName}`)
        }, 0)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}