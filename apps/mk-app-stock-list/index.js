import config from './config'
import * as data from './data'

export default {
	name: "mk-app-stock-list",
	version: "1.0.5",
	description: "mk-app-stock-list",
	meta: data.getMeta(),
	components: [],
	dependencies:['mk-aar-grid'],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-stock-list")
	}
}