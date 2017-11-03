import config from './config'
import * as data from './data'

export default {
	name: "mk-app-hot-search-widget",
	version: "1.0.0",
	description: "mk-app-hot-search-widget",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-hot-search-widget")
	}
}