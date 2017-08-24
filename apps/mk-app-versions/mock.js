/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.versions) {
        mockData.versions = []

        for (let i = 9; i > 0; i--) {
            mockData.versions.push({
                version: `${i}.0.0`,
                date: `2017-${i}-1`,
                items:['新增功能1','新增功能2']
            })
        }
    }
}

fetch.mock('/v1/version/query', (option) => {
    initMockData()
    debugger
    return { result: true, value: mockData.versions }
})