/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    goods: {
        create: (option) => fetch.post('/v1/goods/create', option),
        update: (option) => fetch.post('/v1/goods/update', option),
        findById: (id) => fetch.post('/v1/goods/findById', id),
    }
}