/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import img1 from './img/img1.png'
import img2 from './img/img2.jpg'

const mockData = fetch.mockData

function initMockData() {
    //摘要
    if(!mockData.abstracts){
        mockData.abstracts = [{
            id: 1,
            name: '提现模板'
        },{
            id: 2,
            name: '存款模板'
        }]
    }

    //科目
    if(!mockData.captionOfAccounts){
        mockData.captionOfAccounts = [{
            id: 1,
            code: '1001',
            name: '库存现金'
        },{
            id:2, 
            code: '100201',
            name: '银行存款-银行基本户'
        }]
    }

    //凭证
    if(!mockData.proofOfCharges){
        mockData.proofOfCharges = []
        for(let i = 0; i < 117; i++){
            mockData.proofOfCharges.push({
                id: i,
                code: ((i+1) +'').padStart(4,'0'),
                date: '2017-10-24',
                attachment: 0,
                attachmentFiles: [{
                    id: 1, 
                    alt: '图片1',
                    src: img1
                },{
                    id: 2, 
                    alt: '图片2',
                    src: img2
                }],
                details: [{
                    id: 1,
                    abstract: '卖东西',
                    captionOfAccount: mockData.captionOfAccounts[0],
                    debit: 100.11 + i * 50
                },{
                    id: 2,
                    abstract: '买东西',
                    captionOfAccount: mockData.captionOfAccounts[1],
                    credit: 100.11 + i * 50
                }]
            })
        }
    }
}


fetch.mock('/v1/proofOfCharge/init', (option) => {
    initMockData()
    return {
        result: true,
        value: {
            voucher: (option.id || option.id == 0) ? mockData.proofOfCharges.find(o => o.id == option.id) : undefined,
            abstracts: mockData.abstracts,
            captionOfAccounts: mockData.captionOfAccounts
        }
    }
})

fetch.mock('/v1/abstract/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.abstracts
    }
})

fetch.mock('/v1/captionOfAccount/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.captionOfAccounts
    }
})


fetch.mock('/v1/proofOfCharge/prev', (option) => {
    initMockData()
    if (!mockData.proofOfCharges || mockData.proofOfCharges.length == 0) {
        return {
            result: false,
            error: {
                message: '不存在任何单据！'
            }
        }
    }

    if (!(option.id || option.id == 0)) {
        return { result: true, value: mockData.proofOfCharges[mockData.proofOfCharges.length - 1] }
    }

    const index = mockData.proofOfCharges.findIndex(o => o.id == option.id)

    if (index == 0) {
        return {
            result: false,
            error: {
                message: '已经到第一张单据！'
            }
        }
    }

    return { result: true, value: mockData.proofOfCharges[index - 1] }
})


fetch.mock('/v1/proofOfCharge/next', (option) => {
    initMockData()

    if (!mockData.proofOfCharges || mockData.proofOfCharges.length == 0) {
        return {
            result: false,
            error: {
                message: '不存在任何存货！'
            }
        }
    }

    if (!(option.id || option.id == 0)) {
        return { result: true, value: mockData.proofOfCharges[mockData.proofOfCharges.length - 1] }
    }

    const index = mockData.proofOfCharges.findIndex(o => o.id == option.id)

    if (index == mockData.proofOfCharges.length - 1) {
        return {
            result: false,
            error: {
                message: '已经到最后一张单据！'
            }
        }
    }


    return { result: true, value: mockData.proofOfCharges[index + 1] }
})


fetch.mock('/v1/proofOfCharge/update', (option) => {
    initMockData()

    const index = mockData.proofOfCharges.findIndex(o => o.id == option.id)
    mockData.proofOfCharges.splice(index, 1, option)
    return { result: true, value: option }
})

fetch.mock('/v1/proofOfCharge/create', (option) => {
    initMockData()

    var maxId = 0

    mockData.proofOfCharges.forEach(o => {
        maxId = maxId > o.id ? maxId : o.id
    })

    const id = maxId + 1
    option = { ...option, id }

    mockData.proofOfCharges.push(option)

    return { result: true, value: option }
})

fetch.mock('/v1/proofOfCharge/audit', (option) => {
    initMockData()

    const order = mockData.proofOfCharges.find(o => o.id == option.id)
    order.isAudit = true

    return { result: true, value: order }
})

fetch.mock('/v1/proofOfCharge/del', (option) => {
    initMockData()

    const index = mockData.proofOfCharges.findIndex(o => o.id == option.id)
    mockData.proofOfCharges.splice(index, 1)

    if (!mockData.proofOfCharges || mockData.proofOfCharges.length == 0) {
        return {
            result: true
        }
    }

    if (mockData.proofOfCharges.length - 1 >= index) {
        return {
            result: true,
            value: mockData.proofOfCharges[index]
        }
    }
    else {
        return {
            result: true,
            value: mockData.proofOfCharges[mockData.proofOfCharges.length - 1]
        }
    }
})
