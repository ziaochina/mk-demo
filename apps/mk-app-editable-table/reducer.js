import { Map, fromJS } from 'immutable'
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
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        response.list.forEach(o=>o.birthday = moment(o.birthday))
        state = this.metaReducer.sf(state, 'data.list', fromJS(response.list))
        return this.metaReducer.sf(state, 'data.other.focusCellInfo', undefined)
    }

    addEmptyRow = (state, rowIndex) => {
        var list = this.metaReducer.gf(state, 'data.list')
        list = list.insert(rowIndex,Map({
            id: list.size
        }))

        return this.metaReducer.sf(state, 'data.list', list)
    }

    delrow = (state, id) => {
        var list = this.metaReducer.gf(state, 'data.list')
        const index = list.findIndex(o => {
           return  o.get('id') == id
        })
        
        if (index == -1)
            return state

        list = list.remove(index)
        return this.metaReducer.sf(state, 'data.list', list)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}