/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
const mockData = fetch.mockData

function initMockData() {
    if (!mockData.vouchers) {
        mockData.vouchers = []
        for (let i = 0; i < 5; i++) {
            mockData.vouchers.push({
                id: i,
                name: '诸葛' + (i + 1),
                sex: i % 2 + '',
                birthday: `1980-${i % 11 + 1}-${i % 28 + 1}`,
                mobile: '13818181' + (100 + i),
                married: i % 2 == 0 ? true : false,
                education: { id: i % 2 + '', name: i % 2 == 0 ? '本科' : '专科' },
                signature: '诸葛' + (i + 1) + ' good!',
            })

            mockData.vouchers[i].details = []
            mockData.vouchers[i].details.push({
                id: 0,
                name: '公孙' + (i + 1),
                rela: { id: '0', name: '夫妻' },
                mobile: '13817181' + (100 + i),
                birthday: `1983-${i % 11 + 1}-${i % 28 + 1}`,
                isWork:i % 2 == 0 ? true : false, 
            })
        }
    }

    if (!mockData.educations) {
        mockData.educations = [{
            id: '0',
            name: '本科'
        }, {
            id: '1',
            name: '专科'
        }]
    }

    if (!mockData.relas) {
        mockData.relas = [{
            id: '0',
            name: '夫妻'
        }, {
            id: '1',
            name: '父母'
        }, {
            id: '2',
            name: '子女'
        }]
    }
}

fetch.mock('/v1/voucher/init', (option) => {
    initMockData()

    return {
        result: true,
        value: {
            voucher: (option.id || option.id == 0) ? mockData.vouchers.find(o => o.id == option.id) : undefined,
            educations: mockData.educations,
            relas: mockData.relas
        }
    }
})

fetch.mock('/v1/voucher/findById', (option) => {
    initMockData()
    const voucher = mockData.vouchers.find(o => o.id == option.id)
    return {
        result: true, value: voucher
    }
})


fetch.mock('/v1/voucher/prev', (option) => {
    initMockData()
    if (!mockData.vouchers || mockData.vouchers.length == 0) {
        return {
            result: false,
            error: {
                message: '不存在任何单据！'
            }
        }
    }

    if (!(option.id || option.id == 0)) {
        return { result: true, value: mockData.vouchers[mockData.vouchers.length - 1] }
    }

    const index = mockData.vouchers.findIndex(o => o.id == option.id)

    if (index == 0) {
        return {
            result: false,
            error: {
                message: '已经到第一张单据！'
            }
        }
    }

    return { result: true, value: mockData.vouchers[index - 1] }
})


fetch.mock('/v1/voucher/next', (option) => {
    initMockData()

    if (!mockData.vouchers || mockData.vouchers.length == 0) {
        return {
            result: false,
            error: {
                message: '不存在任何单据！'
            }
        }
    }

    if (!(option.id || option.id == 0)) {
        return { result: true, value: mockData.vouchers[mockData.vouchers.length - 1] }
    }

    const index = mockData.vouchers.findIndex(o => o.id == option.id)

    if (index == mockData.vouchers.length - 1) {
        return {
            result: false,
            error: {
                message: '已经到最后一张单据！'
            }
        }
    }


    return { result: true, value: mockData.vouchers[index + 1] }
})


fetch.mock('/v1/voucher/update', (option) => {
    initMockData()
    option.details.forEach((o, index) => o.id == index)

    const index = mockData.vouchers.findIndex(o => o.id == option.id)
    mockData.vouchers.splice(index, 1, option)
    return { result: true, value: option }
})

fetch.mock('/v1/voucher/create', (option) => {
    initMockData()

    var maxId = 0

    mockData.vouchers.forEach(o => {
        maxId = maxId > o.id ? maxId : o.id
    })

    const id = maxId + 1
    option = { ...option, id }
    option.details.forEach((o, index) => o.id == index)

    mockData.vouchers.push(option)

    return { result: true, value: option }
})

fetch.mock('/v1/voucher/del', (option) => {
    initMockData()

    const index = mockData.vouchers.findIndex(o => o.id == option.id)
    mockData.vouchers.splice(index, 1)

    if (!mockData.vouchers || mockData.vouchers.length == 0) {
        return {
            result: true
        }
    }

    if (mockData.vouchers.length - 1 >= index) {
        return {
            result: true,
            value: mockData.vouchers[index]
        }
    }
    else {
        return {
            result: true,
            value: mockData.vouchers[mockData.vouchers.length - 1]
        }
    }
})

fetch.mock('/v1/education/query', (option) => {
    return {
        result: true,
        value: mockData.educations
    }
})

