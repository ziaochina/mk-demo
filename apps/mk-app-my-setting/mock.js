/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch, password } from 'mk-utils'

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


fetch.mock('/v1/mySetting/init', (userId) => {
    initMockData()
    const user = mockData.users.find(o => o.id == userId)
    const securityLevel = password.analyzeSecurityLevel(user.password)
    return { result: true, value: {user, securityLevel} }
})

fetch.mock('/v1/user/update', (option) => {
    initMockData()
    var user = mockData.users.find(o => o.id == option.id)
    user.nickname = option.nickname
    user.sex = option.sex
    user.birthday = option.birthday
    return { result: true, value: user }
})


function analyzePasswordSecurityLevel(password) {
    var pwdArray = new Array();
    var securityLevelFlag = 1;
    if (password.length < 6) {
        return 1;
    }
    else {
        var securityLevelFlagArray = new Array(0, 0, 0, 0);
        for (var i = 0; i < password.length; i++) {
            var asciiNumber = password.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                securityLevelFlagArray[0] = 1;  //digital
            }
            else if (asciiNumber >= 97 && asciiNumber <= 122) {
                securityLevelFlagArray[1] = 1;  //lowercase
            }
            else if (asciiNumber >= 65 && asciiNumber <= 90) {
                securityLevelFlagArray[2] = 1;  //uppercase
            }
            else {
                securityLevelFlagArray[3] = 1;  //specialcase
            }
        }

        for (var i = 0; i < securityLevelFlagArray.length; i++) {
            if (securityLevelFlagArray[i] == 1) {
                securityLevelFlag++;
            }
        }
        return securityLevelFlag;
    }
}