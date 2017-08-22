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

fetch.mock('/v1/user/login', (option) => {
    initMockData()

    const user = mockData.users.find(o=>o.mobile == option.mobile && o.password == option.password)

    if(user){
        return {result: true, value: option}
    }
    else{
         return {result:false, error:{message:'请输入正确的用户名密码（系统内置用户user:13334445556,pwd:1）'}}
    }
})
