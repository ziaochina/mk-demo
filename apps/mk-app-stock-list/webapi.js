/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    stockList: {
        init: (option) => fetch.post('/v1/stockList/init', option),
        query: (option) => fetch.post('/v1/stockList/query', option),
        del: (option)  => fetch.post('/v1/stockList/del', option),
        disable: (option)  => fetch.post('/v1/stockList/disable', option),
        enable: (option)  => fetch.post('/v1/stockList/enable', option),
    },
    stockType: {
        del: (option) => fetch.post('/v1/stockType/del', option)
    }
}