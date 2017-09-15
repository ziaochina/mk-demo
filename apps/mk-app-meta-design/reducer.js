import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import common from './common'
import beautify from 'mk-utils/lib/beautify'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        initState.data.uiMeta = beautify.beautifyJS(initState.data.uiMeta)
        initState.data.uiData = beautify.beautifyJS(initState.data.uiData)
        initState.data.uiStyle = beautify.beautifyCSS(initState.data.uiStyle)
        common.addStyleSheet(initState.data.uiStyle)
        return this.metaReducer.init(state, initState)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}