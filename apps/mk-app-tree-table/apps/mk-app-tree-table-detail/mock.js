/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

fetch.mock('/v1/goods/create', (option) => {
    const id = mockData.goods.length
    const v = { ...option, id }
    mockData.goods.push(v)
    return { result: true, value: v }
})

fetch.mock('/v1/goods/update', (option) => {
    const v = mockData.goods.find(o => o.id == option.id)
    debugger
    v.code = option.code
    v.name = option.name
    return { result: true, value: v }
})

fetch.mock('/v1/goods/findById', (id) => {
    const v = mockData.goods.find(o => o.id == id)
    return { result: true, value: v }
})