import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import mk_app_bar_graph from './apps/mk-app-bar-graph/index.js'
import mk_app_complex_table from './apps/mk-app-complex-table/index.js'
import mk_app_editable_table from './apps/mk-app-editable-table/index.js'
import mk_app_login from './apps/mk-app-login/index.js'
import mk_app_person_card from './apps/mk-app-person-card/index.js'
import mk_app_person_list from './apps/mk-app-person-list/index.js'
import mk_app_portal_about from './apps/mk-app-portal/apps/mk-app-portal-about/index.js'
import mk_app_portal_app1 from './apps/mk-app-portal/apps/mk-app-portal-app1/index.js'
import mk_app_portal_app2 from './apps/mk-app-portal/apps/mk-app-portal-app2/index.js'
import mk_app_portal from './apps/mk-app-portal/index.js'
import mk_app_root_about from './apps/mk-app-root/apps/mk-app-root-about/index.js'
import mk_app_root_helloWorld from './apps/mk-app-root/apps/mk-app-root-helloWorld/index.js'
import mk_app_root from './apps/mk-app-root/index.js'
import mk_app_tree_table from './apps/mk-app-tree-table/index.js'

const apps = {
		
	[mk_app_bar_graph.name]: mk_app_bar_graph,	
	[mk_app_complex_table.name]: mk_app_complex_table,	
	[mk_app_editable_table.name]: mk_app_editable_table,	
	[mk_app_login.name]: mk_app_login,	
	[mk_app_person_card.name]: mk_app_person_card,	
	[mk_app_person_list.name]: mk_app_person_list,	
	[mk_app_portal_about.name]: mk_app_portal_about,	
	[mk_app_portal_app1.name]: mk_app_portal_app1,	
	[mk_app_portal_app2.name]: mk_app_portal_app2,	
	[mk_app_portal.name]: mk_app_portal,	
	[mk_app_root_about.name]: mk_app_root_about,	
	[mk_app_root_helloWorld.name]: mk_app_root_helloWorld,	
	[mk_app_root.name]: mk_app_root,	
	[mk_app_tree_table.name]: mk_app_tree_table,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()