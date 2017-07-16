import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        const cfg = config.getCurrent()
        const data = { data: {
            menu:cfg.menu,
            menuDefaultSelectedKeys:cfg.menuDefaultSelectedKeys,
            menuDefaultOpenKeys:cfg.menuDefaultOpenKeys,
            content:cfg.defaultContent
        } }
        return this.metaReducer.init(state, data)
    }

    setContent = (state, appName, appProps) =>{
        state = this.metaReducer.sf(state, 'data.content.appName', appName)
        state = this.metaReducer.sf(state, 'data.content.appParams', appProps)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}