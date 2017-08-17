import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        injections.reduce('init', {
            isPop: this.component.props.isPop
        })

    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        if (this.checkName(true).status == 'error') {
            this.injections.reduce('setCheckFields', [
                'data.form.name'
            ])
            return false
        }

        const form = this.metaAction.gf('data.form').toJS()
        const response = await this.webapi.education.create(form)
        this.metaAction.toast('success', '新增成功')
        return response
    }


    checkName = (force) => {
        const checkFields = this.metaAction.gf('data.other.checkFields') || List()
        if (force !== true && !checkFields.includes('data.form.name')) return {}
        const name = this.metaAction.gf('data.form.name')
        return name ? { status: 'success' } : { status: 'error', message: '请录入学历' }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}