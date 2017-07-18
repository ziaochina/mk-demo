import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        const cfg = config.getCurrent()
        const data = {
            data: {
                currentAppName: cfg.defaultAppName,
                currentAppParams: cfg.defaultAppParams
            }
        }
        return this.metaReducer.init(state, data)
    }

    redirect = (state, appName, appProps) => {
        state = this.metaReducer.sf(state, 'data.currentAppName', appName)
        state = this.metaReducer.sf(state, 'data.currentAppProps', appProps)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}