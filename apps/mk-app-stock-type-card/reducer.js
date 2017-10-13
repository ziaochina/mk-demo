import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import moment from 'moment'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        const initState  = getInitState()
        if(option && option.parentId)
            initState.data.form.parentId = option.parentId
        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        return this.metaReducer.sf(state, 'data.form', fromJS(response))
    }

 
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}