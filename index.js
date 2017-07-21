import { config, start, componentFactory } from 'mk-meta-engine'
import myConfig  from './config'

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

const apps = {
	[mk_app_login.name]:mk_app_login,	
	[mk_app_person_card.name]:mk_app_person_card,	
	[mk_app_person_list.name]:mk_app_person_list,	
	[mk_app_portal_about.name]:mk_app_portal_about,	
	[mk_app_portal_app1.name]:mk_app_portal_app1,	
	[mk_app_portal_app2.name]:mk_app_portal_app2,	
	[mk_app_portal.name]:mk_app_portal,	
	[mk_app_root_about.name]:mk_app_root_about,	
	[mk_app_root_helloWorld.name]:mk_app_root_helloWorld,	
	[mk_app_root.name]:mk_app_root,	
}


config(myConfig({apps}))


import * as mkComponents from 'mk-component'

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	

start()