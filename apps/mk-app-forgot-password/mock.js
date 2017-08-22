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
    var user = mockData.users.find(o => o.mobile == option.mobile)
    user.password = option.password
    return { result: true, value: user }
})

fetch.mock('/v1/user/existsMobile', (mobile) => {
    initMockData()
    return { result: true, value: mockData.users.findIndex(o => o.mobile == mobile) != -1 }
})

fetch.mock('/v1/captcha/fetch', (option) => {
    return { result: true, value: '123456' }
})

fetch.mock('/v1/captcha/validate', (captcha) => {
    if (captcha != '123456') {
        return { result: false, error: { message: '验证码错误，请重新获取验证码录入' } }
    }
    return { result: true, value: true }
})

