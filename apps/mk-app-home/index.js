import config from './config'
import * as data from './data'

export default {
	name: "mk-app-home",
	version: "1.0.4",
	description: "mk-app-home",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-home")
	}
}