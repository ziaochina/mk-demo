import config from './config'
import * as data from './data'

export default {
	name: "mk-app-stock-list",
	version: "1.0.1",
	description: "mk-app-stock-list",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-stock-list")
	}
}