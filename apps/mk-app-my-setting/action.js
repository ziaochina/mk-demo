import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import photo from './img/photo.png'


class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        this.load()
    }

    load = async () => {
        //网站中不存在login应用，那么就不做用户相关处理，正式环境应该不需要这段代码，仅为单应用运行使用
        if (!this.config.apps['mk-app-login']) {
            const option = {
                user: {
                    id: 1, mobile: '13334445556', nickname: '齐天大圣', password: '1'
                },
                securityLevel: 1
            }

            this.injections.reduce('load', option)
            return
        }

        const currentUser = this.metaAction.context.get('currentUser')
        const response = await this.webapi.mySetting.init(currentUser.id)
        this.injections.reduce('load', response)
    }

    saveBaseInfo = async () => {
        const form = this.metaAction.gf('data.form').toJS()

        const ok = await this.check([{
            path: 'data.form.nickname', value: form.nickname
        }])

        if (!ok) return

        await this.webapi.user.update({
            id: form.id,
            mobile: form.mobile,
            sex: form.sex,
            nickname: form.nickname,
            birthday: form.birthday
        })

        this.component.props.onPortalReload && this.component.props.onPortalReload()

        this.metaAction.toast('success', '保存个人资料成功')
    }

    modifyPassword = async () => {
        if (!this.config.apps['mk-app-modify-password'])
            throw '网站中存在mk-app-modify-password才可使用这个功能'

        const ret = await this.metaAction.modal('show', {
            title: '修改密码',
            children: this.metaAction.loadApp('mk-app-modify-password', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            this.load()
        }
    }

    upload = () => {
        this.metaAction.toast('error', '纯静态网站，上传目前不可用')
    }

    getPhoto = () => photo

    getSecurityLevelText = () => {
        const level = this.metaAction.gf('data.form.securityLevel')

        if (level == 1)
            return '低'
        else if (level == 2)
            return '中低'
        else if (level == 3)
            return '中'
        else if (level == 4)
            return '中高'
        else
            return '高'
    }

    getSecurityLevelClassName = () => {
        var level = this.metaAction.gf('data.form.securityLevel')
        var className = 'mk-app-my-setting-security-level '
        if (level == 1)
            return className += 'mk-app-my-setting-security-level-error'
        else if (level == 2)
            return className += 'mk-app-my-setting-security-level-warn'
        else if (level == 3)
            return className += 'mk-app-my-setting-security-level-normal'
        else if (level == 4)
            return className += 'mk-app-my-setting-security-level-good'
        else
            return className += 'mk-app-my-setting-security-level-success'
    }

    menuSelected = ({ item, key }) => {
        this.metaAction.sf('data.other.selectedMenuItem', key)
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
            if (o.path == 'data.form.nickname') {
                Object.assign(r, await this.checkNickname(o.value))
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

    checkNickname = async (nickname) => {
        var message

        if (!nickname)
            message = '请录入昵称'

        return { errorPath: 'data.other.error.nickname', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}