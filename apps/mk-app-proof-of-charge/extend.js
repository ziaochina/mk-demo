import aarGrid from 'mk-aar-grid'

function getGridOption() {
    return {
        'details': {
            path: 'data.form.details',
            selectFieldName: 'selected',
            cellClassName: 'mk-app-proof-of-charge-cell',
            emptyRow: {},
            getColNames: (gf) => {
                return [
                    'abstract',
                    'captionOfAccount',
                    'debit',
                    'credit',
                ]
            },
            cellIsReadonly: (cellPosition, path, gf) => {
                return false
            }
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