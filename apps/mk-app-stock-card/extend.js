import aarGrid from 'mk-aar-grid'

function getGridOption() {
	return {
		'unitGrid': {
			path: 'data.form.units',
			selectFieldName: 'selected',
			cellClassName: 'mk-app-stock-card-cell',
			emptyRow: {},
			getColNames: (gf) => {
				return [
					'unit',
					'conversionRate',
					'conversionDesc',
					'isBase',
					'isPu',
					'isSa',
					'isSt'
				]
			},
		},
		'priceGrid': {
			path: 'data.form.prices',
			selectFieldName: 'selected',
			cellClassName: 'mk-app-stock-card-cell',
			emptyRow: {},
			getColNames: (gf) => {
				return [
					'unit',
					'lastPuPrice',
					'referPuPrice',
					'lastSaPrice',
					'retailPrice',
					'firstTradePrice',
					'secondTradePrice',
					'thirdTradePrice',
					'fourthTradePrice',
					'fifthTradePrice',
					'sixthTradePrice',
					'servenTradePrice',
					'eighthTradePrice',
					'ninthTradePrice',
					'tenthTradePrice',
				]
			},
		},
		'barcodeGrid': {
			path: 'data.form.barcodes',
			selectFieldName: 'selected',
			cellClassName: 'mk-app-stock-card-cell',
			emptyRow: {},
			getColNames: (gf) => {
				return [
					'barcode',
					'unit'
				]
			},
		}
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