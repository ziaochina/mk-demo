import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'
import utils from 'mk-utils'

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

        injections.reduce('init')
    }


    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.oldPassword', value: form.oldPassword
        },{
            path: 'data.form.password', value: form.password
        }, {
            path: 'data.form.confirmPassword', value: form.confirmPassword
        }])

        if (!ok) return false

        const currentUser = this.metaAction.context.get('currentUser')
        var id = currentUser && currentUser.id

        //网站中不存在login应用，那么就不做用户相关处理，正式环境应该不需要这段代码，仅为单应用运行使用
        if (!this.config.apps['mk-app-login']) {
            id = 1
        }

        await this.webapi.user.modifyPassword({
            id,
            oldPassword:form.oldPassword,
            password: form.password
        })

        this.metaAction.toast('success', `修改密码成功`)

        return true
    }

    getSecurityLevelText = (password) => {
        if(!password)
            return ''
        const level = utils.password.analyzeSecurityLevel(password)
        if (level == 1)
            return '强度：低'
        else if (level == 2)
            return '强度：中低'
        else if (level == 3)
            return '强度：中'
        else if (level == 4)
            return '强度：中高'
        else
            return '强度：高'
    }

    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }

    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.oldPassword') {
                Object.assign(r, await this.checkOldPassword(o.value))
            }
            
            else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value))
                const confirmPassword = this.metaAction.gf('data.form.confirmPassword')
                if(confirmPassword)
                    checkResults.push(await this.checkConfirmPassword(confirmPassword, o.value))
            }
            else if (o.path == 'data.form.confirmPassword') {
                Object.assign(r, await this.checkConfirmPassword(o.value, this.metaAction.gf('data.form.password')))
            }

            checkResults.push(r)

        }

        var json = {}
        var hasError = true
        checkResults.forEach(o => {
            json[o.path] = o.value
            json[o.errorPath] = o.message
            if (o.message)
                hasError = false
        })

        this.metaAction.sfs(json)
        return hasError
    }

    checkOldPassword = async (password) => {
        var message
        if (!password)
            message = '请录入旧的密码'

        return { errorPath: 'data.other.error.oldPassword', message }
    }

    checkPassword = async (password) => {
        var message
        if (!password)
            message = '请录入新的密码'

        return { errorPath: 'data.other.error.password', message }
    }

    checkConfirmPassword = async (confirmPassword, password) => {
        var message
        if (!confirmPassword)
            message = '请录入确认密码'

        else if (password != confirmPassword)
            message = '两次密码输入不一致，请确认'

        return { errorPath: 'data.other.error.confirmPassword', message }
    }


}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}