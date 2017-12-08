import config from './config'
import * as data from './data'

export default {
	name: "mk-app-stock-type-card",
	version: "1.0.3",
	description: "mk-app-stock-type-card",
	meta: data.getMeta(),
	components: [],
	dependencies: ['mk-aar-form'],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-stock-type-card")
	}
}