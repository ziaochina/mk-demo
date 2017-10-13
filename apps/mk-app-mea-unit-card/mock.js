/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initMockData() {
    //计量单位
    if (!mockData.meaUnits) {
        mockData.meaUnits = [{
            id: 1,
            name: '个'
        }, {
            id: 2,
            name: '件'
        }, {
            id: 3,
            name: '台'
        }, {
            id: 4,
            name: '斤'
        }, {
            id: 5,
            name: '双'
        }]
    }
}

function findNode(id, types) {
    for (let t of types) {
        if (t.id == id)
            return t
        else if (t.children) {
            let n = findNode(id, t.children)
            if (n) return n
        }
    }
}

fetch.mock('/v1/meaUnit/create', (option) => {
    initMockData()
    var maxId = 0
    mockData.meaUnits.forEach(o => {
        maxId = maxId > o.id ? maxId : o.id
    })

    var newId = maxId + 1

    const v = { name: option.name, id: newId }
    mockData.meaUnits.push(v)

    return { result: true, value: v }
})

fetch.mock('/v1/meaUnit/update', (option) => {
    initMockData()
    const node = findNode(option.id, mockData.meaUnits)
    node.name = option.name
    return { result: true, value: node }
})

fetch.mock('/v1/meaUnit/findById', (id) => {
    initMockData()
    const node = findNode(id, mockData.meaUnits)
    return { result: true, value: node }
})