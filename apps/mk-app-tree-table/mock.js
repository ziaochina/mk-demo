/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initGoods() {
    mockData.goodsTypes = [{
        id: 1,
        code: '001',
        name: '衣服',
        children: [{
            id: 101,
            code: '00101',
            name: '女式衣服'
        }, {
            id: 102,
            code: '00102',
            name: '男式衣服'
        }, {
            id: 103,
            code: '00102',
            name: '童衣'
        }]
    }, {
        id: 2,
        code: '002',
        name: '裤子',
        children: [{
            id: 201,
            code: '00101',
            name: '女式裤子'
        }, {
            id: 202,
            code: '00102',
            name: '男式裤子'
        }, {
            id: 203,
            code: '00102',
            name: '童裤'
        }]
    }, {
        id: 3,
        code: '003',
        name: '鞋子',
    }]

    mockData.goods = []

    for (let i = 1; i < 200; i++) {
        mockData.goods.push({
            id: 1000 + i,
            code: 1000 + i + '',
            name: '女风衣' + i,
            type: 101
        })
    }

    for (let i = 1; i < 6; i++) {
        mockData.goods.push({
            id: 2000 + i,
            code: 2000 + i + '',
            name: '男风衣' + i,
            type: 102
        })
    }

    for (let i = 1; i < 10; i++) {
        mockData.goods.push({
            id: 3000 + i,
            code: 3000 + i + '',
            name: '童衣' + i,
            type: 103
        })
    }

    for (let i = 1; i < 34; i++) {
        mockData.goods.push({
            id: 4000 + i,
            code: 4000 + i + '',
            name: '女裤' + i,
            type: 201
        })
    }

    for (let i = 1; i < 8; i++) {
        mockData.goods.push({
            id: 5000 + i,
            code: 5000 + i + '',
            name: '男裤' + i,
            type: 202
        })
    }

    for (let i = 1; i < 28; i++) {
        mockData.goods.push({
            id: 6000 + i,
            code: 6000 + i + '',
            name: '童裤' + i,
            type: 203
        })
    }

    for (let i = 1; i < 50; i++) {
        mockData.goods.push({
            id: 7000 + i,
            code: 7000 + i + '',
            name: '鞋子' + i,
            type: 301
        })
    }
}


fetch.mock('/v1/goods/init', (option) => {
    var ret = query(option)
    ret.value.goodsTypes = mockData.goodsTypes
    return ret
})


fetch.mock('/v1/goods/query', (option) => {
    return query(option)
})

function query(option) {
    initGoods()

    const { pagination, filter } = option

    var data = mockData.goods
    
    if (filter) {
        if (filter.type){
            data = data.filter(o => {
                debugger
                return o.type.toString().substr(0, filter.type.toString().length) == filter.type
            })
        }
            
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
}
