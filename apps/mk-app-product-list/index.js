import config from './config'
import * as data from './data'

export default {
	name: "mk-app-product-list",
	version: "1.0.3",
	description: "mk-app-product-list",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-product-list")
	}
}