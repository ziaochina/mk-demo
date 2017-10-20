/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    deliveryOrder: {
        init: (option) => fetch.post('/v1/deliveryOrder/init', option),
        create: (option) => fetch.post('/v1/deliveryOrder/create', option),
        update: (option) => fetch.post('/v1/deliveryOrder/update', option),
        del: (option) => fetch.post('/v1/deliveryOrder/del', option),
        audit: (option) => fetch.post('/v1/deliveryOrder/audit', option),
        prev: (id) => fetch.post('/v1/deliveryOrder/prev', { id }),
        next: (id) => fetch.post('/v1/deliveryOrder/next', { id }),
    },
    stock: {
        query: (option) => fetch.post('/v1/stock/query', option)
    },
    customer: {
        query: (option) => fetch.post('/v1/customer/query', option)
    },
    ticketType: {
        query: (option) => fetch.post('/v1/ticketType/query', option)
    },
    warehouse: {
        query: (option) => fetch.post('/v1/warehouse/query', option)
    },
    taxRate: {
        query: (option) => fetch.post('/v1/taxRate/query', option)
    },
    settlementMode: {
        query: (option) => fetch.post('/v1/settlementMode/query', option)
    },
    assetAccount: {
        query: (option) => fetch.post('/v1/assetAccount/query', option)
    }
}