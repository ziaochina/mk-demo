/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initStocks() {
    if (mockData.stockTypes && mockData.stockTypes.length > 0)
        return

    mockData.stockTypes = [{
        id: 1,
        code: '001',
        name: '食品',
        children: [{
            id: 101,
            code: '00101',
            name: '肉类'
        }, {
            id: 102,
            code: '00102',
            name: '酒类'
        }, {
            id: 103,
            code: '00102',
            name: '干果'
        }]
    }, {
        id: 2,
        code: '002',
        name: '服饰',
        children: [{
            id: 201,
            code: '00201',
            name: '衣服'
        }, {
            id: 202,
            code: '00202',
            name: '鞋子'
        }, {
            id: 203,
            code: '00203',
            name: '饰品'
        }]
    }, {
        id: 3,
        code: '003',
        name: '设备',
    }]
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

fetch.mock('/v1/stockType/create', (option) => {
    initStocks()
    const parent = findNode(option.parentId, mockData.stockTypes)
    var newId = -1
    if (!parent.children) {
        parent.children = []
        newId = option.parentId * 100 + 1
    }
    else {
        newId = parent.children[parent.children.length - 1].id + 1
    }
    const v = { code: option.code, name: option.name, id: newId }
    parent.children.push(v)

    return { result: true, value: v }
})

fetch.mock('/v1/stockType/update', (option) => {
    initStocks()
    const node = findNode(option.id, mockData.stockTypes)
    node.code = option.code
    node.name = option.name
    return { result: true, value: node }
})

fetch.mock('/v1/stockType/findById', (id) => {
    initStocks()
    const node = findNode(id, mockData.stockTypes)
    return { result: true, value: node }
})