/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

fetch.mock('/v1/report/query', (option) => {
    return {
        result: true,
        value: [{
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '总裁办',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15

        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '人力资源部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '行政部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '财务部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '客服部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '采购部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '技术部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '后勤部门',
            dept3: '质量管理部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '营销中心',
            dept3: '市场部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '营销中心',
            dept3: '业务部',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '集团总部',
            dept2: '小计',
            beginPersonCount: 100,
            endPersonCount: 200,
            averagePersonCount: 150
        }, {
            dept1: '分公司',
            dept2: '浙江分公司',
            dept3: '杭州办事处',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '分公司',
            dept2: '浙江分公司',
            dept3: '义务办事处',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '分公司',
            dept2: '浙江分公司',
            dept3: '温州办事处',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '分公司',
            dept2: '浙江分公司',
            dept3: '金华办事处',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '分公司',
            dept2: '江苏分公司',
            beginPersonCount: 10,
            endPersonCount: 20,
            averagePersonCount: 15
        }, {
            dept1: '分公司',
            dept2: '小计',
            beginPersonCount: 50,
            endPersonCount: 100,
            averagePersonCount: 75
        }, {
            dept1: '合计',
            beginPersonCount: 150,
            endPersonCount: 300,
            averagePersonCount: 225
        }]
    }
})
