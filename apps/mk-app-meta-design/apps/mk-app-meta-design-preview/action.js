import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { fromJS } from 'immutable'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        this.metaAction.setMetaForce('mk-app-meta-design-preview', this.component.props.uiMeta)
        this.metaAction.sf('data', fromJS(this.component.props.uiData))
    }

    componentWillReceiveProps = (nextProps) => {
        setTimeout(() => {
            this.metaAction.setMetaForce('mk-app-meta-design-preview', nextProps.uiMeta)
            this.metaAction.sf('data', fromJS(nextProps.uiData))
        }, 0)

    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}