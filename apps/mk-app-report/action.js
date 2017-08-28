import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
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
    }

    load = async () =>{
        const response = await this.webapi.report.query()
        this.injections.reduce('load', response)
    }

    cellRender = (columnKey) => (text, row, rowIndex) => {
        if (columnKey == 'dept1')
            return this.dept1Render(text, row, rowIndex)
        else if (columnKey == 'dept2')
            return this.dept2Render(text, row, rowIndex)
        else if (columnKey == 'dept3')
            return this.dept3Render(text, row, rowIndex)
        else {
            const reportDS = this.metaAction.gf('data.reportDS')
            var className = 'mk-app-report-cell-right'
            const isTotalRow = reportDS.getIn([rowIndex, 'dept1']) == '合计' || reportDS.getIn([rowIndex, 'dept2']) == '小计'
            if(isTotalRow)
                className += ' mk-app-report-total-cell'
            return {
                children: <div className={className}>{text}</div>,
            }
        }
    }

    dept1Render = (text, row, rowIndex) => {
        if (text == '合计') {
            return {
                children: <div className='mk-app-report-total-cell'>合计</div>,
                props: {
                    rowSpan: 1,
                    colSpan: 3
                },
            }
        }

        return {
            children: <div>{text}</div>,
            props: {
                rowSpan: this.calcRowSpan(text, 'dept1', rowIndex),
            },
        }
    }


    dept2Render = (text, row, rowIndex) => {
        if (this.metaAction.gf('data.reportDS').getIn([rowIndex, 'dept1']) == '合计') {
            return {
                props: { colSpan: 0 }
            }
        }

        const ret = {
            children: (<div className={text == '小计' ? 'mk-app-report-total-cell' : undefined}>
                {text}
            </div >),
            props: {
                rowSpan: this.calcRowSpan(text, 'dept2', rowIndex),
            },
        }


        if (!this.metaAction.gf('data.reportDS').getIn([rowIndex, 'dept3'])) {
            ret.props.colSpan = 2
        }

        return ret
    }

    dept3Render = (text, row, rowIndex) => {
        if (this.metaAction.gf('data.reportDS').getIn([rowIndex, 'dept1']) == '合计') {
            return {
                props: { colSpan: 0 }
            }
        }

        return {
            children: <div>{text}</div>,
            props: {
                colSpan: text ? 1 : 0
            }
        }
    }

    isTotalRow = (rowIndex) => {

    }


    calcRowSpan(text, columnKey, currentRowIndex) {
        const reportDS = this.metaAction.gf('data.reportDS')
        if (!reportDS) return
        const rowCount = reportDS.size
        if (rowCount == 0 || rowCount == 1) return 1

        if (currentRowIndex > 0
            && currentRowIndex <= rowCount
            && text == reportDS.getIn([currentRowIndex - 1, columnKey])) {
            return 0
        }

        var rowSpan = 1
        for (let i = currentRowIndex + 1; i < rowCount; i++) {
            if (text == reportDS.getIn([i, columnKey]))
                rowSpan++
            else
                break
        }

        return rowSpan
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}