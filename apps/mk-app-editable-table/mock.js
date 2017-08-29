/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
const mockData = fetch.mockData

function init() {
    if (!mockData.editableTable) {
        mockData.editableTable = []
        for (let i = 0; i < 5; i++) {
            mockData.editableTable.push({
                id: i,
                name: '诸葛' + (i + 1),
                sex: i % 2,
                birthday: `1980-${i % 11 + 1}-${i % 28 + 1}`,
                mobile: '13818181' + (100 + i),
            })
        }
    }
}


fetch.mock('/v1/editabletable/query', (option) => {

    init()

    return {
        result: true, value: {
            list: mockData.editableTable
        }
    }
})

fetch.mock('/v1/editabletable/save', (option) => {
    mockData.editableTable = option.list

    return {
        result: true, value: true
    }
})

