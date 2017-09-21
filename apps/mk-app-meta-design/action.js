import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { fromJS } from 'immutable'
import utils from 'mk-utils'
import beautify from 'mk-utils/lib/beautify'
import common from './common'


class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.i = 0
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    metaChange = (e, d, v) => {
        try {
            utils.string.toJson(v)
            this.metaAction.sf('data.uiMeta', v)
        }
        catch (e) {
            this.metaAction.sf('data.other.error.uiMeta', e)
            console.error(e)
        }
    }

    dataChange = (e, d, v) => {
        try {
            utils.string.toJson(v)
            this.metaAction.sf('data.uiData', v)
        }
        catch (e) {
            this.metaAction.sf('data.other.error.uiData', e)
            console.error(e)
        }
    }

    styleChange = (e, d, v) => {
        common.addStyleSheet(v)
        this.metaAction.sf('data.uiStyle', v)
    }

    formatMeta = () => {
        this.metaAction.sf('data.uiMeta', beautify.beautifyJS(this.metaAction.gf('data.uiMeta')))
    }

    formatState = () => {
        this.metaAction.sf('data.uiData', beautify.beautifyJS(this.metaAction.gf('data.uiData')))
    }

    formatStyle = () => {
        this.metaAction.sf('data.uiStyle', beautify.beautifyCSS(this.metaAction.gf('data.uiStyle')))
    }

    getAppProps = () => {
        const data = this.metaAction.gf('data').toJS()
        return {
            uiMeta: data.uiMeta,
            uiData: data.uiData,
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}



