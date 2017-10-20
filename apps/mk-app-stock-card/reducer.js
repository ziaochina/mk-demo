import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import extend from './extend'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, { stock, stockCategories, pricingModes, stockTypes, taxRates, meaUnits }) => {
        if (stock) {
            state = this.metaReducer.sf(state, 'data.form', fromJS(stock))
        }
        else {
            state = this.metaReducer.sf(state, 'data', fromJS(getInitState().data))
        }

        state = this.metaReducer.sf(state, 'data.other.categories', fromJS(stockCategories))
        state = this.metaReducer.sf(state, 'data.other.pricingModes', fromJS(pricingModes))
        state = this.metaReducer.sf(state, 'data.other.types', fromJS(stockTypes))
        state = this.metaReducer.sf(state, 'data.other.taxRates', fromJS(taxRates))
        state = this.metaReducer.sf(state, 'data.other.meaUnits', fromJS(meaUnits))
        if(!this.metaReducer.gf(state, 'data.form.barcodes')){
            state = this.metaReducer.sf(state, 'data.form.barcodes', fromJS([{}]))
        }
        return state
    }

    setForm = (state, form) => {
        if (form)
            state = this.metaReducer.sf(state, 'data.form', fromJS(form))
        else
            state = this.metaReducer.sf(state, 'data.form', fromJS(getInitState().data.form))

        if(!this.metaReducer.gf(state, 'data.form.barcodes')){
            state = this.metaReducer.sf(state, 'data.form.barcodes', fromJS([{}]))
        }
        return state
    }

    delImg = (state) => {
        const imgs = this.metaReducer.gf(state, 'data.form.imgs')
        if (!imgs || imgs.size == 0)
            return state

        const index = this.metaReducer.gf(state, 'data.other.selectedImgIndex') || 0
        state = this.metaReducer.sf(state, 'data.form.imgs', imgs.remove(index))
        state = this.metaReducer.sf(state, 'data.other.selectedImgIndex', undefined)
        return state
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        extendReducer = extend.reducerCreator({ ...option, metaReducer }),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...extendReducer.gridReducer, ...o }
}