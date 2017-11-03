/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import moment from 'moment'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.visit) {
        const x = []
        const y = []
        var total = 0

        for (let i = 0; i < 30; i++) {
            x.push(moment().add(i, 'days').format('YYYY-MM-DD'))
            let v = Math.floor(Math.random() * 100) + 10
            y.push(v)
            total += v
        }

        mockData.visit = {
            total,
            x,
            y,
            average: Math.round(total / 30)
        }
    }

    if (!mockData.trade) {
        const x = []
        const y = []
        var total = 0

        for (let i = 0; i < 30; i++) {
            x.push(moment().add(i, 'days').format('YYYY-MM-DD'))
            let v = Math.floor(Math.random() * 100) + 10
            y.push(v)
            total += v
        }

        mockData.trade = {
            total,
            x,
            y,
            conversionRate: 0.65
        }
    }

    if (!mockData.market) {
        mockData.market = {
            rate: 0.88,
            WoW: 0.12,
            DoD: -0.11
        }
    }

    if (!mockData.sale) {
        mockData.sale = {
            total: 8181818,
            WoW: 0.12,
            DoD: -0.11,
            average: 12345
        }
    }

    if (!mockData.saleTrend) {
        const x = []
        const y = []

        for (let i = 12; i >= 0; i--) {
            x.push(moment().subtract(i, 'months').format('YYYY-MM'))
            let v = Math.floor(Math.random() * 10000) + 100
            y.push(v)
        }

        mockData.saleTrend = {
            x, y
        }
    }

    if (!mockData.topForStore) {
        mockData.topForStore = []
        for (let i = 1; i < 8; i++) {
            mockData.topForStore.push({
                index: i,
                storeName: '北京市海淀区上地门店' + i,
                total: (100 - i) * 100
            })
        }
    }

    if (!mockData.hotSearch) {
        let userCountX = [],
            userCountY = [],
            searchCountX = [],
            searchCountY = [],
            keys = []

        for (let i = 0; i < 7; i++) {
            userCountX.push(moment().add(i, 'days').format('YYYY-MM-DD'))
            let v = Math.floor(Math.random() * 100) + 10
            userCountY.push(v)
        }

        for (let i = 0; i < 7; i++) {
            searchCountX.push(moment().add(i, 'days').format('YYYY-MM-DD'))
            let v = Math.floor(Math.random() * 100) + 10
            searchCountY.push(v)
        }

        for (let i = 1; i < 31; i++) {
            keys.push({
                ranking: i,
                key: '搜索关键字' + i,
                searchCount: (100 - i) * 100,
                weeklyGains: '10%'
            })
        }

        mockData.hotSearch = {
            userCount: {
                x: userCountX,
                y: userCountY,
                total: userCountY.reduce((a, b) => a + b, 0)
            },
            searchCount: {
                x: searchCountX,
                y: searchCountY,
                total: searchCountY.reduce((a, b) => a + b, 0)
            },
            keys
        }
    }

    if (!mockData.saleProportion) {
        mockData.saleProportion = {
            total: 10000,
            details: [{
                id: 1,
                name: '家用电器',
                value: 3000
            },{
                id: 2,
                name: '个护健康',
                value: 4000
            },{
                id: 3,
                name: '服饰箱包',
                value: 1000,
            },{
                id: 4,
                name: '母婴产品',
                value: 1500
            },{
                id: 5,
                name: '其他',
                value: 500
            }]
        }
    }

}

fetch.mock('/v1/analysis/query', (option) => {
    initMockData()
    return {
        result: true,
        value: {
            visit: mockData.visit,
            trade: mockData.trade,
            market: mockData.market,
            sale: mockData.sale,
            saleTrend: mockData.saleTrend,
            topForStore: mockData.topForStore,
            hotSearch: mockData.hotSearch,
            saleProportion: mockData.saleProportion
        }
    }
})
