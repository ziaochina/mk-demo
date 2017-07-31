import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

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

        var defaultMenuItem, firstMenuItem, defaultOpens = []

        const loop = (children) => {
            const ret = []
            children.forEach(child => {
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

        const menuDefaultSelectedKeys = fromJS(defaultMenuItem ? [defaultMenuItem.key] : [])
        const menuDefaultOpenKeys = fromJS(defaultOpens.map(o => o.key))
        const defaultContent = fromJS(defaultMenuItem ? defaultMenuItem : {})

        state = this.metaReducer.sf(state, 'data.menu', fromJS(menu))
        state = this.metaReducer.sf(state, 'data.menuDefaultSelectedKeys', menuDefaultSelectedKeys)
        state = this.metaReducer.sf(state, 'data.menuDefaultOpenKeys', menuDefaultOpenKeys)
        state = this.metaReducer.sf(state, 'data.content', defaultContent)

        return state
    }

    setContent = (state, appName, appProps) => {
        state = this.metaReducer.sf(state, 'data.content.appName', appName)
        state = this.metaReducer.sf(state, 'data.content.appParams', appProps)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}