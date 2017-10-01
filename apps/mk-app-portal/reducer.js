import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import { history } from 'mk-utils'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        state = this.metaReducer.init(state, getInitState())

        if (this.config.menu && !this.config.webapi.getMenu) {
            return this.load(state, { menu: this.config.menu })
        }

        return state
    }

    load = (state, { menu }) => {
        if (!menu || menu.lenght == 0)
            return state

        var defaultMenuItem, firstMenuItem, defaultOpens = [], menuKeyNameMap = {}, menuAppNameMap = {}

        const loop = (children) => {
            const ret = []
            children.forEach(child => {
                menuKeyNameMap[child.name] = child.key

                //history增加
                if (child.appName) {
                    menuAppNameMap[child.appName] = {
                        name: child.name,
                        props: child.appParams || {}
                    }
                }

                if (!child.children) {
                    if (!firstMenuItem) {
                        firstMenuItem = child
                    }

                    if (child.isDefault) {
                        defaultMenuItem = child
                    }
                }
                else {
                    if (child.isExpand) {
                        defaultOpens.push(child)
                    }

                    loop(child.children)
                }
            })
            return ret
        }

        loop(menu)

        defaultMenuItem = defaultMenuItem || firstMenuItem

        const menuSelectedKeys = fromJS(defaultMenuItem ? [defaultMenuItem.key] : [])
        const menuDefaultOpenKeys = fromJS(defaultOpens.map(o => o.key))
        const defaultContent = defaultMenuItem ? defaultMenuItem : {}

        state = this.metaReducer.sf(state, 'data.menu', fromJS(menu))
        state = this.metaReducer.sf(state, 'data.menuKeyNameMap', fromJS(menuKeyNameMap))
        state = this.metaReducer.sf(state, 'data.menuAppNameMap', fromJS(menuAppNameMap))
        state = this.metaReducer.sf(state, 'data.menuSelectedKeys', menuSelectedKeys)
        state = this.metaReducer.sf(state, 'data.menuDefaultOpenKeys', menuDefaultOpenKeys)

        const childApp = history.getChildApp('mk-app-portal')
        if (childApp)
            return this.setContent(state, '', childApp, {})
        else
            return this.setContent(state, defaultContent.name, defaultContent.appName, defaultContent.appProps)
    }

    setContent = (state, name, appName, appProps) => {

        //判断当前显示页签appName和要新打开的是否一致
        const currContent = this.metaReducer.gf(state, 'data.content')
        if (currContent && appName == currContent.get('appName'))
            return state

        //history增加
        let menuAppNameMap = this.metaReducer.gf(state, 'data.menuAppNameMap')
        if (name && appName && menuAppNameMap.getIn([appName, 'name']) != name) {
            menuAppNameMap = menuAppNameMap.set(appName, fromJS({ name, props: appProps }))
            state = this.metaReducer.sf(state, 'data.menuAppNameMap', menuAppNameMap)
        }

        name = menuAppNameMap.getIn([appName, 'name'])
        appProps = menuAppNameMap.getIn([appName, 'props'])

        const content = fromJS({ name, appName, appProps })
        state = this.metaReducer.sf(state, 'data.content', content)

        var openTabs = this.metaReducer.gf(state, 'data.openTabs') || List()
        var hit = openTabs.findIndex(o => o.get('name') == name || o.get('appName') == appName) != -1
        const isTabsStyle = this.metaReducer.gf(state, 'data.isTabsStyle')

        if (!hit) {
            if (isTabsStyle)
                openTabs = openTabs.push(content)
            else
                openTabs = List().push(content)
            state = this.metaReducer.sf(state, 'data.openTabs', openTabs)
        }
        else {
            if (!isTabsStyle) {
                openTabs = List().push(content)
                state = this.metaReducer.sf(state, 'data.openTabs', openTabs)
            }
        }

        setTimeout(() => {
            history.pushChildApp('mk-app-portal', content.get('appName'))
        }, 0)

        return state
    }

    closeContent = (state, name) => {
        var openTabs = this.metaReducer.gf(state, 'data.openTabs') || List()
        var hitIndex = openTabs.findIndex(o => o.get('name') == name)
        openTabs = openTabs.remove(hitIndex)
        state = this.metaReducer.sf(state, 'data.openTabs', openTabs)
        return this.metaReducer.sf(state, 'data.content', openTabs.get(openTabs.size - 1))
    }

    closeAll = (state) => {
        state = this.metaReducer.sf(state, 'data.openTabs', new List())
        return this.metaReducer.sf(state, 'data.content', new Map())
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}