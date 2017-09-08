import config from './config'
import * as data from './data'

export default {
	name: "mk-app-meta-design-preview",
	version: "1.0.0",
	description: "mk-app-meta-design-preview",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-meta-design-preview")
	}
}