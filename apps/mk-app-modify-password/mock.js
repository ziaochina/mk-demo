/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.users) {
        mockData.users = [{
            id: 1,
            mobile: 13334445556,
            password: '1'
        }]
    }
}


fetch.mock('/v1/user/modifyPassword', (option) => {
    initMockData()
    var user = mockData.users.find(o => o.id == option.id)
    if (user.password != option.oldPassword) {
        return { result: false, error: { message: '旧密码不对，请重新录入' } }
    }
    user.password = option.password
    return { result: true, value: user }
})
