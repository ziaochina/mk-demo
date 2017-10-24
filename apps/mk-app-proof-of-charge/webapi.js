/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    proofOfCharge: {
        init: (option) => fetch.post('/v1/proofOfCharge/init', option),
        create: (option) => fetch.post('/v1/proofOfCharge/create', option),
        update: (option) => fetch.post('/v1/proofOfCharge/update', option),
        del: (option) => fetch.post('/v1/proofOfCharge/del', option),
        audit: (option) => fetch.post('/v1/proofOfCharge/audit', option),
        prev: (id) => fetch.post('/v1/proofOfCharge/prev', { id }),
        next: (id) => fetch.post('/v1/proofOfCharge/next', { id }),
    },
    abstract: {
        query: (option) => fetch.post('/v1/abstract/query', option)
    },
    captionOfAccount: {
        query: (option) => fetch.post('/v1/captionOfAccount/query', option)
    }
}