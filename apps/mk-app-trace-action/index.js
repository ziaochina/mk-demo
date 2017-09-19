import config from './config'
import * as data from './data'

export default {
	name: "mk-app-trace-action",
	version: "1.0.1",
	description: "mk-app-trace-action",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-trace-action")
	}
}