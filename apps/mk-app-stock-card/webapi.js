/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    stock: {
        init: (option) => fetch.post('/v1/stock/init', option),
        create: (option) => fetch.post('/v1/stock/create', option),
        update: (option) => fetch.post('/v1/stock/update', option),
        prev: (id) => fetch.post('/v1/stock/prev', { id }),
        next: (id) => fetch.post('/v1/stock/next', { id })
    },
    meaUnit: {
        query: (option) => fetch.post('/v1/meaUnit/query', option)
    }
}