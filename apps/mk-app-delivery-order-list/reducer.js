import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import extend from './extend'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(response.list))
        state = this.metaReducer.sf(state, 'data.pagination', fromJS(response.pagination))
        state = this.metaReducer.sf(state, 'data.filter', fromJS(response.filter))
        state = this.metaReducer.sf(state, 'data.total', fromJS(response.total))
        if (response.customers)
            state = this.metaReducer.sf(state, 'data.other.customers', fromJS(response.customers))

        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        extendReducer = extend.reducerCreator({ ...option, metaReducer }),
        o = new reducer({ ...option, metaReducer, extendReducer })
    return { ...metaReducer, ...extendReducer.gridReducer, ...o }
}