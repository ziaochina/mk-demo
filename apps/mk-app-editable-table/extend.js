import aarGrid from 'mk-aar-grid'

function getGridOption() {
    return {
        'table': {
            path: 'data.list',
            selectFieldName: 'selected',
            cellClassName: 'mk-app-editable-table-cell',
            emptyRow: {},
            getColNames: (gf) => {
                return [
                    'name',
                    'mobile',
                    'birthday',
                    'sex'
                ]
            },
        },
    }
}

function actionCreator(option) {
    return {
        gridAction: new aarGrid.action({ ...option, gridOption: getGridOption() })
    }
}

function reducerCreator(option) {
    return {
        gridReducer: new aarGrid.reducer({ ...option, gridOption: getGridOption() })
    }
}

export default {
    actionCreator,
    reducerCreator
}