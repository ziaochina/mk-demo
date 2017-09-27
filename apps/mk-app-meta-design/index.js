import config from './config'
import * as data from './data'
import CodeMirror from 'mk-component/lib/components/codeMirror'

export default {
	name: "mk-app-meta-design",
	version: "1.0.5",
	description: "mk-app-meta-design",
	meta: data.getMeta(),
	components: [{
		name: 'CodeMirror',
		component: CodeMirror
	}],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-meta-design")
	}
}