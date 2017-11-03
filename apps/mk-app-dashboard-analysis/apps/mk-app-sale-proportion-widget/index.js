import config from './config'
import * as data from './data'

export default {
	name: "mk-app-sale-proportion-widget",
	version: "1.0.0",
	description: "mk-app-sale-proportion-widget",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-sale-proportion-widget")
	}
}