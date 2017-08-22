/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    user: {
        create: (option) => fetch.post('/v1/user/create', option),
        existsMobile: (mobile) => fetch.post('/v1/user/existsMobile', mobile)
    },
    captcha: {
        fetch: (option) => fetch.post('/v1/captcha/fetch')
    }
}