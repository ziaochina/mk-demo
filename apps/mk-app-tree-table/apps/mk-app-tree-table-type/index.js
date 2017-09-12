import config from './config'
import * as data from './data'

export default {
	name: "mk-app-tree-table-type",
	version: "1.0.0",
	description: "mk-app-tree-table-type",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-tree-table-type")
	}
}