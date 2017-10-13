/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    stockType: {
        create: (option) => fetch.post('/v1/stockType/create', option),
        update: (option) => fetch.post('/v1/stockType/update', option),
        findById: (id) => fetch.post('/v1/stockType/findById', id),
    }
}