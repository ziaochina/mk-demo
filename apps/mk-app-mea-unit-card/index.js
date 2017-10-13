import config from './config'
import * as data from './data'

export default {
	name: "mk-app-mea-unit-card",
	version: "1.0.2",
	description: "mk-app-mea-unit-card",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-mea-unit-card")
	}
}