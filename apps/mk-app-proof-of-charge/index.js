import config from './config'
import * as data from './data'
import MoneyCellHeader from './components/moneyCellHeader'
import MoneyCell from './components/moneyCell'

export default {
	name: "mk-app-proof-of-charge",
	version: "1.0.0",
	description: "mk-app-proof-of-charge",
	meta: data.getMeta(),
	components: [{
		appName:'mk-app-proof-of-charge', 
		name: 'MoneyCellHeader', 
		component: MoneyCellHeader
	},{
		appName:'mk-app-proof-of-charge', 
		name: 'MoneyCell', 
		component: MoneyCell
	}],
	dependencies:['mk-aar-grid'],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-proof-of-charge")
	}
}