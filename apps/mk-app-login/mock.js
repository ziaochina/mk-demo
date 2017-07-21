/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

fetch.mock('/v1/user/login', (option) => {
    if(option.user == 1 && option.password == 1)
        return {result: true, value: option}
    return {result:false, error:{message:'请输入正确的用户名密码（user:1,pwd:1）'}}
})
