/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import moment from 'moment'
import utils from 'mk-utils'
import img1 from './img/img1.png'
import img2 from './img/img2.jpg'


const mockData = fetch.mockData

function initMockData() {
    //税率
    if (!mockData.taxRates) {
        mockData.taxRates = [{
            id: 17,
            name: '17%'
        }, {
            id: 5,
            name: '5%'
        }, {
            id: 3,
            name: '3%'
        }]
    }

    //票据类型
    if (!mockData.ticketTypes) {
        mockData.ticketTypes = [{
            id: 1,
            name: '专用发票'
        }, {
            id: 2,
            name: '普通发票'
        }]
    }

    //存货
    if (!mockData.stocks) {
        mockData.stocks = []

        for (let i = 1; i < 200; i++) {
            mockData.stocks.push({
                id: 1000 + i,
                code: 1000 + i + '',
                name: '肉' + i,
                memo: '肉' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 101,
                    code: '00101',
                    name: '肉类'
                },
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 6; i++) {
            mockData.stocks.push({
                id: 2000 + i,
                code: 2000 + i + '',
                name: '酒' + i,
                memo: '酒' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 102,
                    code: '00102',
                    name: '酒类'
                },
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 10; i++) {
            mockData.stocks.push({
                id: 3000 + i,
                code: 3000 + i + '',
                name: '干果' + i,
                memo: '干果' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 103,
                    code: '00102',
                    name: '干果'
                }
                ,
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 34; i++) {
            mockData.stocks.push({
                id: 4000 + i,
                code: 4000 + i + '',
                name: '衣服' + i,
                memo: '衣服' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 201,
                    code: '00201',
                    name: '衣服'
                }
                ,
                meaUnit: {
                    id: 2,
                    name: '件'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 8; i++) {
            mockData.stocks.push({
                id: 5000 + i,
                code: 5000 + i + '',
                name: '鞋子' + i,
                memo: '鞋子' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 202,
                    code: '00202',
                    name: '鞋子'
                }
                ,
                meaUnit: {
                    id: 5,
                    name: '双'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 5,
                        name: '双'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 5,
                        name: '双'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 28; i++) {
            mockData.stocks.push({
                id: 6000 + i,
                code: 6000 + i + '',
                name: '饰品' + i,
                memo: '饰品' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 203,
                    code: '00203',
                    name: '饰品'
                }
                ,
                meaUnit: {
                    id: 2,
                    name: '件'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 50; i++) {
            mockData.stocks.push({
                id: 7000 + i,
                code: 7000 + i + '',
                name: '设备' + i,
                memo: '设备' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 3,
                    code: '003',
                    name: '设备',
                }
                ,
                meaUnit: {
                    id: 3,
                    name: '台'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 3,
                        name: '台'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 3,
                        name: '台'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }
    }


    //客户
    if (!mockData.customers) {
        mockData.customers = [{
            id: 1,
            name: '腾讯'
        }, {
            id: 2,
            name: '阿里'
        }]
    }

    //仓库
    if (!mockData.warehouses) {
        mockData.warehouses = [{
            id: 1,
            name: '北京仓'
        }, {
            id: 2,
            name: '上海仓'
        }]
    }

    //结算方式
    if (!mockData.settlementModes) {
        mockData.settlementModes = [{
            id: 1,
            name: '现结'
        }, {
            id: 2,
            name: '月结'
        }]
    }

    //资金账户
    if (!mockData.assetAccounts) {
        mockData.assetAccounts = [{
            id: 1,
            name: '现金'
        }, {
            id: 2,
            name: '支付宝'
        }, {
            id: 3,
            name: '微信'
        }]
    }

    // 销售出库单
    if (!mockData.deliveryOrders) {
        mockData.deliveryOrders = []
        for (let i = 0; i < 200; i++) {
            mockData.deliveryOrders.push({
                id: i,
                code: 'do20170101' + (100 + i + 1),
                ticketType: { id: 1, name: '专用发票' },
                warehouse: { id: 1, name: '北京仓' },
                date: `2017-${i % 11 + 1}-${i % 28 + 1}`,
                customer: { id: 1, name: '腾讯' },
                salesman: '张三',
                voucherNO: i % 2 == 1 ? '' : 'VO' + (10000 + i),
                receiptNumber: i % 2 == 1 ? '' : 'RE' + (10000 + i),
                amount: 100,
                priceTaxTotal: 105,
                paidAmount: 105 - (i % 3) * 10,
                unpaidAmount: (i % 3) * 10,
                isAudit: i % 3 == 0,
                memo: '备注' + i,
                settlementMode: { id: 1, name: '现结' },
                details: [{
                    id: 1,
                    stock: mockData.stocks[1],
                    price: 10,
                    number: 10,
                    amount: 100,
                    taxRate: { id: 5, name: '5%' },
                    tax: 5,
                    priceTaxTotal: 105
                }],
                settlements: [{
                    account: { id: 1, name: '现金' },
                    settlementAmount: 105 - (i % 3) * 10
                }]
            })
        }
    }
}

fetch.mock('/v1/deliverOrderList/init', (option) => {
    initMockData()
    var ret = query(option)
    ret.value.ticketTypes = mockData.ticketTypes
    ret.value.customers = mockData.customers
    return ret
})




fetch.mock('/v1/deliverOrderList/query', (option) => {
    initMockData()
    return query(option)
})

function query(option) {
    const { pagination, filter } = option

    var data = mockData.deliveryOrders

    if (filter) {


        var dates = filter.dates

        if (!dates || dates.length == 0 && !dates[0]) {
            if (filter.common == 'today') {
                dates = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
            }
            else if (filter.common == 'yesterday') {
                dates = [moment().subtract(1, 'day').format('YYYY-MM-DD'), moment().subtract(1, 'day').format('YYYY-MM-DD')]
            }
            else if (filter.common == 'thisWeek') {
                dates = utils.moment.getThisWeekRange()
            }
            else if (filter.common == 'lastWeek') {
                dates = utils.moment.getLastWeekRange()
            }
            else if (filter.common == 'thisMonth') {
                dates = utils.moment.getThisMonthRange()
            }
            else if (filter.common == 'lastMonth') {
                dates = utils.moment.getLastMonthRange()
            }
            else if (filter.common == 'thisYear') {
                dates = utils.moment.getThisYearRange()
            }
        }

        if (dates && dates.length > 0 && dates[0]) {
            data = data.filter(o => moment(o.date).isBetween(dates[0], dates[1], null, '()'))
        }

        if (filter.customer) {
            data = data.filter(o => o.customer && o.customer.id == filter.customer.id)
        }

        if (filter.code)
            data = data.filter(o => o.code.indexOf(filter.code) != -1)
        /*
        if (filter.name)
            data = data.filter(o => o.name.indexOf(filter.name) != -1)
        if (filter.sex)
            data = data.filter(o => o.sex == filter.sex)
        if (filter.date) {
            data = data.filter(o => moment(o.date).isAfter(filter.dateRange[0]) && moment(o.date).isBefore(filter.dateRange[1]))
        }
        */
    }

    var unauditCount = data.filter(o => !o.isAudit).length,
        unpaidCount = data.filter(o => o.unpaidAmount > 0).length,
        paidCount = data.filter(o => o.unpaidAmount == 0).length,
        allCount = data.length

    if (filter) {
        if (filter.targetList == 'paid') {
            data = data.filter(o => o.unpaidAmount == 0)
        }
        else if (filter.targetList == 'unpaid') {
            data = data.filter(o => o.unpaidAmount > 0)
        }
        else if (filter.targetList == 'unaudit') {
            data = data.filter(o => !o.isAudit)
        }
    }

    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current


    var ret = {
        result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            list: []
        }
    }

    var tAmount = 0,
        tPriceTaxTotal = 0,
        tPaidAmount = 0,
        tUnpaidAmount = 0

    for (let j = start; j < end; j++) {
        if (data[j]) {
            ret.value.list.push(data[j])
            tAmount += data[j].amount ? data[j].amount : 0
            tPriceTaxTotal += data[j].priceTaxTotal ? data[j].priceTaxTotal : 0
            tPaidAmount += data[j].paidAmount ? data[j].paidAmount : 0
            tUnpaidAmount += data[j].unpaidAmount ? data[j].unpaidAmount : 0
        }
    }

    ret.value.total = {
        amount: tAmount,
        priceTaxTotal: tPriceTaxTotal,
        paidAmount: tPaidAmount,
        unpaidAmount: tUnpaidAmount,
        allCount,
        unauditCount,
        unpaidCount,
        paidCount,
    }

    return ret
}

fetch.mock('/v1/deliverOrderList/del', (option) => {
    initMockData()
    option.ids.forEach(id => {
        let index = mockData.deliveryOrders.findIndex(o => o.id == id)

        if (index || index === 0)
            mockData.deliveryOrders.splice(index, 1)
    })
    return { result: true, value: true }
})


fetch.mock('/v1/deliverOrderList/audit', (option) => {
    initMockData()
    option.ids.forEach(id => {
        let o = mockData.deliveryOrders.find(o => o.id == id)

        if (o)
            o.isAudit = true
    })
    return { result: true, value: true }
})



fetch.mock('/v1/deliverOrderList/reject', (option) => {
    initMockData()
    option.ids.forEach(id => {
        let o = mockData.deliveryOrders.find(o => o.id == id)

        if (o)
            o.isAudit = false
    })
    return { result: true, value: true }
})

