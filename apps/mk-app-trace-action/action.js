import React from 'react'
import { fromJS } from 'immutable'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import jsonHelp from 'mk-utils/lib/json'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init', {tracing: window.__mk_record_action__})
    }

    tracing = () => {
        const c = !this.metaAction.gf('data.tracing')
        window.__mk_record_action__ = c
        this.metaAction.sf('data.tracing', c)
    }

    refresh = () => {
        this.component.forceUpdate()

    }

    actions = () => {
        this.actions = window.__mk_actions__
        return this.actions
    }

    diff = () => {
        this.getDiff()
    }

    getDiff = () => {
        if (!this.currentAction)
            return

        var oldState = this.currentAction.oldState.toJS()
        var newState = this.currentAction.newState.toJS()
        delete oldState['@@require']
        delete newState['@@require']

        var r = jsonHelp.diffHtml(oldState, newState)
        return { __html: r }
    }

    rowClick = (e, rowIndex) => {
        const action = this.actions[rowIndex]

        if (this.currentAction == action)
            return

        this.currentAction = action

        this.component.forceUpdate()
    }

    getCellClassName = (rowIndex) => {
        if (this.currentAction == this.actions[rowIndex])
            return 'mk-app-trace-action-content-cell mk-app-trace-action-content-selectrow'
        else
            return 'mk-app-trace-action-content-cell'
    }

    getCurrentAction = () => {
        return this.currentAction
    }

    getOldState = () => {
        if (!this.currentAction)
            return
        var r = this.currentAction.oldState.toJS()
        delete r['@@require']
        return r
    }

    getNewState = () => {
        if (!this.currentAction)
            return
        var r = this.currentAction.newState.toJS()
        delete r['@@require']
        return r
    }

    isSelectAll = () => {
        if (!this.actions || this.actions.length == 0)
            return

        return this.actions.every(o => o.selected)
    }

    selectAll = (e) => {

        if (!this.actions || this.actions.length == 0)
            return

        this.actions.forEach(a => {
            a.selected = e.target.checked
        })

        this.component.forceUpdate()
    }

    rowSelectedChange = (e, option) => {
        if (!this.actions || this.actions.length == 0)
            return

        this.actions[option.rowIndex].selected = e.target.checked

        this.component.forceUpdate()
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}