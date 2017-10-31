import React from 'react'
import { Menu } from 'mk-component'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import { history } from 'mk-utils'
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
        injections.reduce('init')

        this.load()

        //history增加
        history.listen('mk-app-portal', this.listen)
    }

    //history增加
    listen = (childApp, location, action) => {
        const currentAppName = this.metaAction.gf('data.content.appName')
        const targetAppName = childApp
        if (!targetAppName) {
            this.injections.reduce('closeAll')
            return
        }

        if (targetAppName == currentAppName) {
            return
        }

        this.setContent('', targetAppName)
    }


    componentWillUnmount = () => {
        history.unlisten('mk-app-portal', this.listen)
    }


    load = async () => {
        //网站中不存在login应用，那么就不做用户相关处理，正式环境应该不需要这段代码，仅为单应用运行使用
        if (!this.config.apps['mk-app-login']) {
            const user = { id: 1, mobile: '13334445556', nickname: '齐天大圣' }
            this.metaAction.context.set('currentUser', user)
            this.metaAction.sf('data.other.currentUser', fromJS(user))
            return
        }

        const response = await this.webapi.portal.init()

        if (response.user) {
            this.metaAction.context.set('currentUser', response.user)
            this.metaAction.sf('data.other.currentUser', fromJS(response.user))
        }
        else {
            this.metaAction.context.set('currentUser', undefined)
            if (this.component.props.onRedirect && this.config.goAfterLogout) {
                this.component.props.onRedirect(this.config.goAfterLogout)
            }
        }

        if (response.menu) {
            this.injections.reduce('load', { menu: response.menu })
        }
        /*
        如果菜单从ajax获取，那么使用下面的方式
        if (this.webapi.getMenu) {
            const menu = await this.webapi.getMenu()
            this.injections.reduce('load', {menu})
        }*/
    }

    getLogo = () => this.config.logo

    getPhoto = () => require('./img/photo.png')

    getCurrentUser = () => this.metaAction.context.get('currentUser') || {}

    getMenuChildren = () => {
        const menu = this.metaAction.gf('data.menu').toJS()

        const loop = (children, level) => {
            const ret = []
            children.forEach(child => {
                
                let ele = {
                    name: child.key,
                    key: child.key
                }

                if (!child.children) {
                    ele.component  = 'Menu.Item'

                    if (child.icon || level == 1) {
                        ele.children = [{
                            name: 'icon',
                            component: 'Icon',
                            type: child.icon || 'desktop'
                        }, {
                            name: 'name',
                            component: '::span',
                            children: child.name
                        }]
                    }
                    else {
                        ele.children = child.name
                    }
                }
                else {
                    ele.component  = 'Menu.SubMenu'
                    ele.children = loop(child.children, level + 1)

                    if (child.icon || level == 1) {
                        ele.title = [{
                            name: 'icon',
                            component: 'Icon',
                            type: child.icon || 'desktop'
                        }, {
                            name: 'name',
                            component: '::span',
                            children: child.name
                        }]
                    }
                    else {
                        ele.title = child.name
                    }
                }

                ret.push(ele)
            })
            return ret
        }
        return {
            _isMeta: true,
            value: loop(menu, 1)
        }

    }

    topMenuClick = async (e) => {
        switch (e.key) {
            case 'logout':
                if (this.component.props.onRedirect && this.config.goAfterLogout) {
                    await this.webapi.user.logout()
                    this.metaAction.context.set('currentUser', undefined)
                    this.component.props.onRedirect(this.config.goAfterLogout)
                }
                break;
            case 'github':
                window.open('https://www.github.com/ziaochina/mk-demo')
                break;
            case 'gitter':
                window.open('https://gitter.im/mk-js/mk-js?utm_source=share-link&utm_medium=link&utm_campaign=share-link')
                break;
            case 'mySetting':
                if (!this.config.apps['mk-app-my-setting'])
                    throw '不存在mk-app-my-setting应用，该功能不能使用'

                this.setContent('个人设置', 'mk-app-my-setting')
                break;
            case 'toggleTabs':
                this.metaAction.sf('data.isTabsStyle', !this.metaAction.gf('data.isTabsStyle'))
        }
    }


    menuClick = (e) => {
        const menu = this.metaAction.gf('data.menu').toJS()
        const find = (children) => {
            for (let child of children) {
                if (child.key == e.key) {
                    return child
                }
                if (child.children) {
                    let o = find(child.children)
                    if (o) return o
                }
            }
        }

        const hit = find(menu)
        if (hit) {
            this.setContent(hit.name, hit.appName, hit.appParams)
        }
    }
    
    issueClick = () => {
        window.open('https://github.com/ziaochina/mk-demo/issues/new')
    }

    getMenuSelectKeys = () => {
        const content = this.metaAction.gf('data.content')
        if (!content) return
        const menuKeyNameMap = this.metaAction.gf('data.menuKeyNameMap')
        return [menuKeyNameMap.get(content.get('name'))]
    }
    tabChange = (key) => {
        const openTabs = this.metaAction.gf('data.openTabs')
        const curr = openTabs.find(o => o.get('name') == key)
        this.setContent(curr.get('name'), curr.get('appName'), curr.get('appProps'))
    }

    tabEdit = (key, action) => {
        if (action == 'remove') {
            this.injections.reduce('closeContent', key)
        }
    }

    setContent = (name, appName, appProps) => {
        this.injections.reduce('setContent', name, appName, appProps)
    }

    foldMenu = () => {
        this.metaAction.sf('data.isFoldMenu', !this.metaAction.gf('data.isFoldMenu'))
        setTimeout(function () {
            var event = document.createEvent('HTMLEvents')
            event.initEvent("resize", true, true)
            window.dispatchEvent(event)
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
