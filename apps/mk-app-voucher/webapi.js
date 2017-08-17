/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    voucher: {
        init: (option) => fetch.post('/v1/voucher/init', option),
        create: (option) => fetch.post('/v1/voucher/create', option),
        update: (option) => fetch.post('/v1/voucher/update', option),
        del: (option) => fetch.post('/v1/voucher/del', option),
        prev: (id) => fetch.post('/v1/voucher/prev', { id }),
        next: (id) => fetch.post('/v1/voucher/next', { id }),
    },
    education: {
        query: (option) => fetch.post('/v1/education/query', option)
    }
}