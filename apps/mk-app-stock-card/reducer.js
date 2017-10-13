import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

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


    addUnitRow = (state, rowIndex) => {
        return this.addRow(state, 'data.form.units', rowIndex)
    }

    delUnitRow = (state, rowIndex) => {
        return this.delRow(state, 'data.form.units', rowIndex)
    }

    addPriceRow = (state, rowIndex) => {
        return this.addRow(state, 'data.form.prices', rowIndex)
    }
    delPriceRow = (state, rowIndex) => {
        return this.delRow(state, 'data.form.prices', rowIndex)
    }

    addBarcodeRow = (state, rowIndex) => {
        return this.addRow(state, 'data.form.barcodes', rowIndex)
    }
    delBarcodeRow = (state, rowIndex) => {
        return this.delRow(state, 'data.form.barcodes', rowIndex)
    }

    addRow = (state, path, rowIndex) => {
        var lst = this.metaReducer.gf(state, path)
        lst = lst.insert(rowIndex, Map({}))

        return this.metaReducer.sf(state, path, lst)
    }

    delRow = (state, path, rowIndex) => {
        var lst = this.metaReducer.gf(state, path)

        if (rowIndex == -1)
            return state

        lst = lst.remove(rowIndex)

        //永远保证有一行
        if (lst.size == 0)
            lst = lst.insert(rowIndex, Map({}))

        return this.metaReducer.sf(state, path, lst)
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
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}