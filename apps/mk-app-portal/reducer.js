import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const data = {
            data: {
                menu: this.config.menu,
                menuDefaultSelectedKeys: this.config.menuDefaultSelectedKeys,
                menuDefaultOpenKeys: this.config.menuDefaultOpenKeys,
                content: this.config.defaultContent
            }
        }
        return this.metaReducer.init(state, data)
    }

    setContent = (state, appName, appProps) => {
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