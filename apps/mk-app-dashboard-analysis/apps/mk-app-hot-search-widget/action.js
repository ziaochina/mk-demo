import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init', this.component.props.data)
    }

    getChartOption = (data) => {
        return {
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                show: false,
                data: data.x
            },
            yAxis: {
                show: false,
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 15,
                top: 15
            },
            series: [{
                type: 'line',
                smooth: true,
                sampling: 'average',
                animation: false,
                itemStyle: {
                    normal: {
                        color: 'rgb(184, 134, 11)',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    },
                },
                areaStyle: {
                    normal: {
                        color: 'rgb(184, 134, 11)',
                    }
                },
                data: data.y
            }]
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}