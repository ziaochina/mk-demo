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

    register = async () => {
        const form = this.metaAction.gf('data.form').toJS()

        const ok = await this.check([{
            path: 'data.form.mobile', value: form.mobile
        }, {
            path: 'data.form.password', value: form.password
        }, {
            path: 'data.form.captcha', value: form.captcha
        }])

        if (!ok) return

        await this.webapi.user.create(form)
        this.metaAction.toast('success', '注册成功')

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

    showAgreement = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '用户协议条款',
            width : 700,
            bodyStyle: {height: 400, overflow: 'auto'},
            okText: '同意',
            cancelText: '不同意',
            children: this.metaAction.loadApp('mk-app-agreement', {
                store: this.component.props.store,
            })
        })

        this.metaAction.sf('data.form.agree', !!ret)
    }

    goLogin = () => {
        if(!this.config.apps['mk-app-login']){
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
            else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value))
            }
            else if (o.path == 'data.form.captcha') {
                Object.assign(r, await this.checkCaptcha(o.value))
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
        else if (await this.webapi.user.existsMobile(mobile))
            message = '该手机号已经注册'

        return { errorPath: 'data.other.error.mobile', message }
    }

    checkPassword = async (password) => {
        var message

        if (!password)
            message = '请录入密码'

        return { errorPath: 'data.other.error.password', message }
    }

    checkCaptcha = async (captcha) => {
        var message

        if (!captcha)
            message = '请录入验证码'

        return { errorPath: 'data.other.error.captcha', message }
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}