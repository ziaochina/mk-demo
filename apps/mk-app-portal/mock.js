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
            password: '1',
        }]
    }
}



fetch.mock('/v1/portal/init', (option, headers) => {
    initMockData()
    if (headers && headers.token) {
        const segments = headers.token.split(',')
        const [id, mobile, password, nickname, sex, birthday] = segments
        var user = mockData.users.find(o => o.id == id)
        //mock简单处理，因为刷新网站，mock数据会丢失，将token中的用户数据加回去
        if (!user) {
            user = { id, mobile, password, nickname: nickname ? nickname : mobile, sex, birthday }
            mockData.user.push(user)
        }
        else{
            user.nickname = user.nickname || user.mobile
        }
        return { result: true, value: { user } }
    }
    else {
        return { result: true, value: {} }
    }
})


fetch.mock('/v1/user/logout', ()=>{
    initMockData()
    fetch.clearAccessToken()
    return {result: true, value: true}
})
