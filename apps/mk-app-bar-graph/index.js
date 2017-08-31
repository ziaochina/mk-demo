import config from './config'
import * as data from './data'

export default {
	name: "mk-app-bar-graph",
	version: "1.0.4",
	description: "mk-app-bar-graph",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-bar-graph")
	}
}