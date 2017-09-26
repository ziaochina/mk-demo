/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initPersons() {
    if (!mockData.persons) {
        mockData.persons = []
        for (let i = 0; i < 200; i++) {
            mockData.persons.push({
                id: i,
                name: '诸葛' + (i + 1),
                sex: i % 2 + '',
                birthday: `1980-${i % 11 + 1}-${i % 28 + 1}`,
                mobile: '13818181' + (100 + i),
                dept: undefined,
                address: '北京海淀'
            })
        }
    }
}

function initDepartments() {
    if (!mockData.departments) {
        mockData.departments = []
        for (let i = 0; i < 5; i++) {
            mockData.departments.push({
                id: i,
                code: '00' + (i + 1),
                name: '部门' + (i + 1),
            })
        }
    }
}
fetch.mock('/v1/person/findById', (option) => {
    initPersons()

    const person = mockData.persons.find(o => o.id == option.id)
    return {
        result: true,
        value: person
    }
})

fetch.mock('/v1/person/create', (option) => {
    initPersons()
debugger
    const id = mockData.persons.length
    const v = { ...option, id }
    mockData.persons.push(v)

    return { result: true, value: v }
})

fetch.mock('/v1/person/update', (option) => {
    initPersons()
    mockData.persons[option.id] = option
    return { result: true, value: option }
})

fetch.mock('/v1/person/prev', (option) => {
    initPersons()
    if (option.id) {
        const index = option.id - 1 < 0 ? 0 : option.id - 1
        return { result: true, value: mockData.persons[index] }
    }

    return { result: true, value: mockData.persons[mockData.persons.length - 1] }
})

fetch.mock('/v1/person/next', (option) => {
    initPersons()
    if (option.id) {
        const index = option.id + 1 > mockData.persons.length - 1 ? mockData.persons.length - 1 : option.id + 1
        return { result: true, value: mockData.persons[index] }
    }

    return { result: true, value: mockData.persons[mockData.persons.length - 1] }
})

fetch.mock('/v1/department/query', data => {
    initDepartments()

    return { result: true, value: mockData.departments }
})

