
import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'


class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, apis) => {
        const initState = getInitState()
        initState.data.groups = this.getGroupsTree(apis)
        if (initState.data.groups && initState.data.groups.length > 0)
            initState.data.filter.group = initState.data.groups[0].group

        return this.metaReducer.init(state, initState)
    }

    getGroupsTree = (apis) => {
        if (!apis || apis.lenght == 0)
            return

        var ret = []
        const appendNode = (group) => {
            var parent = ret
            group.forEach(s => {
                const c = parent.find(o => o.group == s)

                if (!c) {
                    let curr = { group: s, children: [] }
                    parent.push(curr)
                    parent = curr.children
                } else {
                    //parent.push(c)
                    parent = c.children
                }

            })
        }

        apis.forEach(api => appendNode(api.group.split('__')))

        return ret
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}