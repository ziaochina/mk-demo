import aarGrid from 'mk-aar-grid'

function getGridOption() {
	return {
		'dataGrid': {
			path: 'data.list',
			selectFieldName: 'selected',
        },
    }
}

function actionCreator(option){
    return {
        gridAction: new aarGrid.action({...option, gridOption: getGridOption()})
    }
}

function reducerCreator(option){
    return {
        gridReducer: new aarGrid.reducer({...option, gridOption: getGridOption()})
    }
}

export default {
    actionCreator,
    reducerCreator
}