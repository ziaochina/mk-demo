import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import moment from 'moment'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, { voucher, educationDataSource, relaDataSource }) => {
        if (voucher) {
            state = this.metaReducer.sf(state, 'data.form', fromJS(voucher))
        }
        else{
            state  = this.metaReducer.sf(state, 'data', fromJS(getInitState().data))
        }
        
        state = this.metaReducer.sf(state, 'data.other.educationDataSource', fromJS(educationDataSource))
        state = this.metaReducer.sf(state, 'data.other.relaDataSource', fromJS(relaDataSource))
        return state
    }

    setVoucher = (state, voucher) => {
        if(voucher)
            return this.metaReducer.sf(state, 'data.form', fromJS(voucher))
        else
            return this.metaReducer.sf(state, 'data.form', fromJS(getInitState().data.form))
    }

    addEmptyRow = (state, rowIndex) => {
        var details = this.metaReducer.gf(state, 'data.form.details')
        details = details.insert(rowIndex, Map({}))

        return this.metaReducer.sf(state, 'data.form.details', details)
    }

    delrow = (state, rowIndex) => {
        var details = this.metaReducer.gf(state, 'data.form.details')

        if (rowIndex == -1)
            return state

        details = details.remove(rowIndex)

        //永远保证有一行
        if (details.size == 0)
            details = details.insert(rowIndex, Map({}))

        return this.metaReducer.sf(state, 'data.form.details', details)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}