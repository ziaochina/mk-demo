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
        return this.metaReducer.init(state, getInitState(option))
    }

    load = (state, { person, departments }) => {
        if (person) {
            state = this.metaReducer.sf(state, 'data.form', fromJS({
                ...person,
                birthday: moment(person.birthday),
            }))
        }
        return this.metaReducer.sf(state, 'data.other.departments', fromJS(departments))
    }

    setPerson = (state, person) => {
        state = this.metaReducer.sf(state, 'data.form', fromJS({
            ...person, birthday: moment(person.birthday)
        }))

        return this.metaReducer.sf(state, 'data.other.checkFields', List())
    }

    setField = (state, fieldPath, value) => {
        state = this.metaReducer.setField(state, fieldPath, value)
        return this.setCheckFields(state, fieldPath)
    }

    setCheckFields = (state, fields) => {
        if (!fields) return state
        var checkFields = this.metaReducer.gf(state, 'data.other.checkFields') || List()

        if (typeof fields == 'string') {
            checkFields = checkFields.includes(fields) ? checkFields : checkFields.push(fields)
            return this.metaReducer.sf(state, 'data.other.checkFields', checkFields)
        }
        if (fields instanceof Array) {
            fields.forEach(field => {
                checkFields = checkFields.includes(field) ? checkFields : checkFields.push(field)
            })

            return this.metaReducer.sf(state, 'data.other.checkFields', checkFields)
        }

        return state
    }

    addDepartment = (state, { id, code, name }) => {
        return this.metaReducer.sf(state, 'data.form.department', code)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}