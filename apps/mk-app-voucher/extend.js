import aarGrid from 'mk-aar-grid'

function getGridOption() {
    return {
        'details': {
            path: 'data.form.details',
            selectFieldName: 'selected',
            cellClassName: 'mk-app-voucher-cell',
            emptyRow: {},
            getColNames: (gf) => {
                return [
                    'name',
                    'rela',
                    'mobile',
                    'birthday',
                    'isWork'
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