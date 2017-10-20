/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    deliverOrderList: {
        init: (option) => fetch.post('/v1/deliverOrderList/init', option),
        query: (option) => fetch.post('/v1/deliverOrderList/query', option),
        del: (option) => fetch.post('/v1/deliverOrderList/del', option),
        audit: (option) => fetch.post('/v1/deliverOrderList/audit', option),
        reject: (option) => fetch.post('/v1/deliverOrderList/reject', option)
    }
}