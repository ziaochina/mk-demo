import config from './config'
import * as data from './data'

export default {
	name: "mk-app-dashboard-analysis",
	version: "1.0.0",
	description: "mk-app-dashboard-analysis",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-dashboard-analysis")
	}
}