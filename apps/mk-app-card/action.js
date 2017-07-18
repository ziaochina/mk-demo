import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List } from 'immutable'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    save = () => {
        if (this.checkName(true).status == 'error'
            && this.checkMobile(true).status == 'error') {
            this.injections.reduce('setCheckFields', [
                'data.form.name',
                'data.form.sex',
                'data.form.mobile',
                'data.form.birthday'
            ])
        }else{
            console.log(this.metaAction.gf('data.form').toJS())
            this.metaAction.toast('success', '请看控制台')
        }
    }

    checkName = (force) => {
        const checkFields = this.metaAction.gf('data.other.checkFields') || List()
        if (force !== true && !checkFields.includes('data.form.name')) return {}
        const name = this.metaAction.gf('data.form.name')
        return name ? { status: 'success' } : { status: 'error', message: '请录入用户名' }
    }

    checkMobile = (force) => {
        const checkFields = this.metaAction.gf('data.other.checkFields') || List()
        if (force !== true && !checkFields.includes('data.form.mobile')) return {}
        const mobile = this.metaAction.gf('data.form.mobile')
        return mobile ? { status: 'success' } : { status: 'error', message: '请录入用户名' }
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}