/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.home) {
        mockData.home = {}
    }

    if(!mockData.home.messages){
        mockData.home.messages = []
        for (let i = 0; i < 50; i++) {
            mockData.home.messages.push({
                id: i,
                message: '通知消息' + i,
                date: `2017-${i % 11 + 1}-${i % 28 + 1}`,
            })
        }
    }
}


fetch.mock('/v1/homeMessage/query', (option) => {
    initMockData()
    return {result: true, value: mockData.home.messages}
})
