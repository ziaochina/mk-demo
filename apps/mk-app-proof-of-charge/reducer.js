import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import moment from 'moment'
import extend from './extend'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, { voucher, abstracts, captionOfAccounts }) => {
        if (voucher) {
            state = this.metaReducer.sf(state, 'data.form', fromJS(voucher))
        }
        else {
            state = this.metaReducer.sf(state, 'data', fromJS(getInitState().data))
        }

        state = this.metaReducer.sf(state, 'data.other.abstracts', fromJS(abstracts))
        state = this.metaReducer.sf(state, 'data.other.captionOfAccounts', fromJS(captionOfAccounts))
        return state
    }

    setForm = (state, form) => {
        if (form)
            return this.metaReducer.sf(state, 'data.form', fromJS(form))
        else
            return this.metaReducer.sf(state, 'data.form', fromJS(getInitState().data.form))
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        extendReducer = extend.reducerCreator({ ...option, metaReducer }),
        o = new reducer({ ...option, metaReducer, extendReducer })

    return { ...metaReducer, ...extendReducer.gridReducer, ...o }
}