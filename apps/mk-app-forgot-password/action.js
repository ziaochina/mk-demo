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

        injections.reduce('init')
    }


    onOk = async () => {
        return await this.save()
    }

    next = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.mobile', value: form.mobile
        }, {
            path: 'data.form.captcha', value: form.captcha
        }])

        if (!ok) return

        await this.webapi.captcha.validate(form.captcha)

        this.metaAction.sf('data.other.step', 2)
    }

    prev = async () => {
        this.metaAction.sf('data.other.step', 1)
    }

    modify = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.password', value: form.password
        }, {
            path: 'data.form.confirmPassword', value: form.confirmPassword
        }])

        if (!ok) return

        await this.webapi.user.modifyPassword({mobile:form.mobile, password: form.password})
        this.metaAction.toast('success', `重设密码成功`)

        this.goLogin()
    }

    getLogo = () => this.config.logo

    getCaptcha = async () => {
        const captcah = await this.webapi.captcha.fetch()
        this.metaAction.toast('success', `验证码已经发送到您的手机，请输入[模拟先输入：123456]`)
    }

    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }

    goLogin = () => {
        if (!this.config.apps['mk-app-login']) {
            throw '请将这个应用加入到带mk-app-root和mk-app-login的网站中，跳转功能才能正常使用'
        }
        if (this.component.props.onRedirect && this.config.goLogin) {
            this.component.props.onRedirect(this.config.goLogin)
        }
    }

    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.mobile') {
                Object.assign(r, await this.checkMobile(o.value))
            }
            else if (o.path == 'data.form.captcha') {
                Object.assign(r, await this.checkCaptcha(o.value))
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


    checkMobile = async (mobile) => {
        var message

        if (!mobile)
            message = '请录入手机号'
        else if (!/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))
            message = '请录入有效的手机号'
        else if (await this.webapi.user.existsMobile(mobile) == false)
            message = '该手机号未注册'

        return { errorPath: 'data.other.error.mobile', message }
    }

    checkCaptcha = async (captcha) => {
        var message

        if (!captcha)
            message = '请录入验证码'

        return { errorPath: 'data.other.error.captcha', message }
    }

    checkPassword = async (password) => {
        var message
        if (!password)
            message = '请录入密码'

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