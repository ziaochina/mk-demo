import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { fromJS } from 'immutable'
import utils from 'mk-utils'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        
        this.metaAction.setMetaForce('mk-app-meta-design-preview', utils.string.toJson(this.component.props.uiMeta))
        this.metaAction.sf('data', fromJS(utils.string.toJson(this.component.props.uiData)))
    }

    componentWillReceiveProps = (nextProps) => {

        if (this.component.props.uiMeta != nextProps.uiMeta
            || this.component.props.uiData != nextProps.uiData) {
            this.metaAction.setMetaForce('mk-app-meta-design-preview', utils.string.toJson(nextProps.uiMeta))
            this.metaAction.sf('data', fromJS(utils.string.toJson(nextProps.uiData)))
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