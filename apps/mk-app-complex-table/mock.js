/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initList(filter) {
    let inoutName = '收入',
        bizType = '销售商品'

    if(filter){
        switch(filter.inoutType){
            case '0':
                inoutName = '收入'
                bizType = '销售商品'
                break
            case '1':
                inoutName = '支出'
                bizType = '采购商品'
                break
            case '2':
                inoutName = '成本、折旧和摊销'
                bizType = '成本'
                break
            case '3':
                inoutName = '存取现金、内部账户互转'
                bizType = '存取现金'
                break
            case '4':
                inoutName = '收款、付款'
                bizType = '收回赊销款'
                break
            case '5':
                inoutName = '请会计处理'
                bizType = '请会计处理'
                break
        }
    }
    // if (!mockData.list) {
        mockData.list = []
        for (let i = 0; i < 200; i++) {
            mockData.list.push({
                id: i,
                inoutName: inoutName,
                code1: '10',
                code2: '10' + i %10 + '0',
                code3: '10' + i %10 + '0'+i %10+'0',
                bizType: bizType,
                invoiceType: i %2? '增值税普通发票':'其他票据',
                bankAccount: '622848 8888 8888 888'+i %10,
                invoiceNum: i,
                fineNature:'',
                loanPeriod: i %10+'年',
                abstract:'',
                projectName:'新项目',
                invoiceCode:'',
                taxRate1: i %2? '13%':'17%'
            })
        }
    // }
}


fetch.mock('/v1/tamplate/query', (option) => {
    initList(option.filter)
    const { pagination, filter } = option

    var data = mockData.list
    if (filter && filter.inoutType) {
        data.filter = filter
    }else{
        data.filter.inoutType = '0'
    }

    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current

    var ret = {
        result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            list: []
        }
    }
    for (let j = start; j < end; j++) {
        if (data[j])
            ret.value.list.push(data[j])
    }
    return ret
})
