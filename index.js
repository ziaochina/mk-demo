import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import mk_app_apidoc from './apps/mk-app-apidoc/index.js'
import mk_app_bar_graph from './apps/mk-app-bar-graph/index.js'
import mk_app_complex_table from './apps/mk-app-complex-table/index.js'
import mk_app_hot_search_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-hot-search-widget/index.js'
import mk_app_market_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-market-widget/index.js'
import mk_app_sale_proportion_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-sale-proportion-widget/index.js'
import mk_app_sale_trend_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-sale-trend-widget/index.js'
import mk_app_sale_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-sale-widget/index.js'
import mk_app_trade_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-trade-widget/index.js'
import mk_app_visit_widget from './apps/mk-app-dashboard-analysis/apps/mk-app-visit-widget/index.js'
import mk_app_dashboard_analysis from './apps/mk-app-dashboard-analysis/index.js'
import mk_app_delivery_order from './apps/mk-app-delivery-order/index.js'
import mk_app_delivery_order_list from './apps/mk-app-delivery-order-list/index.js'
import mk_app_devtools_test from './apps/mk-app-devtools/apps/mk-app-devtools-test/index.js'
import mk_app_devtools from './apps/mk-app-devtools/index.js'
import mk_app_editable_table from './apps/mk-app-editable-table/index.js'
import mk_app_forgot_password from './apps/mk-app-forgot-password/index.js'
import mk_app_home_chart from './apps/mk-app-home/apps/mk-app-home-chart/index.js'
import mk_app_home_list from './apps/mk-app-home/apps/mk-app-home-list/index.js'
import mk_app_home_shortcuts from './apps/mk-app-home/apps/mk-app-home-shortcuts/index.js'
import mk_app_home from './apps/mk-app-home/index.js'
import mk_app_hot_modify_app from './apps/mk-app-hot-modify-app/index.js'
import mk_app_login from './apps/mk-app-login/index.js'
import mk_app_mea_unit_card_test from './apps/mk-app-mea-unit-card/apps/mk-app-mea-unit-card-test/index.js'
import mk_app_mea_unit_card from './apps/mk-app-mea-unit-card/index.js'
import mk_app_meta_design_preview from './apps/mk-app-meta-design/apps/mk-app-meta-design-preview/index.js'
import mk_app_meta_design from './apps/mk-app-meta-design/index.js'
import mk_app_modify_password_test from './apps/mk-app-modify-password/apps/mk-app-modify-password-test/index.js'
import mk_app_modify_password from './apps/mk-app-modify-password/index.js'
import mk_app_my_setting from './apps/mk-app-my-setting/index.js'
import mk_app_person_card from './apps/mk-app-person-card/index.js'
import mk_app_person_list from './apps/mk-app-person-list/index.js'
import mk_app_portal_about from './apps/mk-app-portal/apps/mk-app-portal-about/index.js'
import mk_app_portal_app1 from './apps/mk-app-portal/apps/mk-app-portal-app1/index.js'
import mk_app_portal_app2 from './apps/mk-app-portal/apps/mk-app-portal-app2/index.js'
import mk_app_portal from './apps/mk-app-portal/index.js'
import mk_app_product_list from './apps/mk-app-product-list/index.js'
import mk_app_proof_of_charge from './apps/mk-app-proof-of-charge/index.js'
import mk_app_agreement from './apps/mk-app-register/apps/mk-app-agreement/index.js'
import mk_app_register from './apps/mk-app-register/index.js'
import mk_app_report from './apps/mk-app-report/index.js'
import mk_app_root_about from './apps/mk-app-root/apps/mk-app-root-about/index.js'
import mk_app_root_helloWorld from './apps/mk-app-root/apps/mk-app-root-helloWorld/index.js'
import mk_app_root from './apps/mk-app-root/index.js'
import mk_app_stock_card from './apps/mk-app-stock-card/index.js'
import mk_app_stock_list from './apps/mk-app-stock-list/index.js'
import mk_app_stock_type_card_test from './apps/mk-app-stock-type-card/apps/mk-app-stock-type-card-test/index.js'
import mk_app_stock_type_card from './apps/mk-app-stock-type-card/index.js'
import mk_app_trace_action from './apps/mk-app-trace-action/index.js'
import mk_app_tree_table_detail from './apps/mk-app-tree-table/apps/mk-app-tree-table-detail/index.js'
import mk_app_tree_table_type from './apps/mk-app-tree-table/apps/mk-app-tree-table-type/index.js'
import mk_app_tree_table from './apps/mk-app-tree-table/index.js'
import mk_app_versions from './apps/mk-app-versions/index.js'
import mk_app_voucher_education from './apps/mk-app-voucher/apps/mk-app-voucher-education/index.js'
import mk_app_voucher from './apps/mk-app-voucher/index.js'

const apps = {
		
	[mk_app_apidoc.name]: mk_app_apidoc,	
	[mk_app_bar_graph.name]: mk_app_bar_graph,	
	[mk_app_complex_table.name]: mk_app_complex_table,	
	[mk_app_hot_search_widget.name]: mk_app_hot_search_widget,	
	[mk_app_market_widget.name]: mk_app_market_widget,	
	[mk_app_sale_proportion_widget.name]: mk_app_sale_proportion_widget,	
	[mk_app_sale_trend_widget.name]: mk_app_sale_trend_widget,	
	[mk_app_sale_widget.name]: mk_app_sale_widget,	
	[mk_app_trade_widget.name]: mk_app_trade_widget,	
	[mk_app_visit_widget.name]: mk_app_visit_widget,	
	[mk_app_dashboard_analysis.name]: mk_app_dashboard_analysis,	
	[mk_app_delivery_order.name]: mk_app_delivery_order,	
	[mk_app_delivery_order_list.name]: mk_app_delivery_order_list,	
	[mk_app_devtools_test.name]: mk_app_devtools_test,	
	[mk_app_devtools.name]: mk_app_devtools,	
	[mk_app_editable_table.name]: mk_app_editable_table,	
	[mk_app_forgot_password.name]: mk_app_forgot_password,	
	[mk_app_home_chart.name]: mk_app_home_chart,	
	[mk_app_home_list.name]: mk_app_home_list,	
	[mk_app_home_shortcuts.name]: mk_app_home_shortcuts,	
	[mk_app_home.name]: mk_app_home,	
	[mk_app_hot_modify_app.name]: mk_app_hot_modify_app,	
	[mk_app_login.name]: mk_app_login,	
	[mk_app_mea_unit_card_test.name]: mk_app_mea_unit_card_test,	
	[mk_app_mea_unit_card.name]: mk_app_mea_unit_card,	
	[mk_app_meta_design_preview.name]: mk_app_meta_design_preview,	
	[mk_app_meta_design.name]: mk_app_meta_design,	
	[mk_app_modify_password_test.name]: mk_app_modify_password_test,	
	[mk_app_modify_password.name]: mk_app_modify_password,	
	[mk_app_my_setting.name]: mk_app_my_setting,	
	[mk_app_person_card.name]: mk_app_person_card,	
	[mk_app_person_list.name]: mk_app_person_list,	
	[mk_app_portal_about.name]: mk_app_portal_about,	
	[mk_app_portal_app1.name]: mk_app_portal_app1,	
	[mk_app_portal_app2.name]: mk_app_portal_app2,	
	[mk_app_portal.name]: mk_app_portal,	
	[mk_app_product_list.name]: mk_app_product_list,	
	[mk_app_proof_of_charge.name]: mk_app_proof_of_charge,	
	[mk_app_agreement.name]: mk_app_agreement,	
	[mk_app_register.name]: mk_app_register,	
	[mk_app_report.name]: mk_app_report,	
	[mk_app_root_about.name]: mk_app_root_about,	
	[mk_app_root_helloWorld.name]: mk_app_root_helloWorld,	
	[mk_app_root.name]: mk_app_root,	
	[mk_app_stock_card.name]: mk_app_stock_card,	
	[mk_app_stock_list.name]: mk_app_stock_list,	
	[mk_app_stock_type_card_test.name]: mk_app_stock_type_card_test,	
	[mk_app_stock_type_card.name]: mk_app_stock_type_card,	
	[mk_app_trace_action.name]: mk_app_trace_action,	
	[mk_app_tree_table_detail.name]: mk_app_tree_table_detail,	
	[mk_app_tree_table_type.name]: mk_app_tree_table_type,	
	[mk_app_tree_table.name]: mk_app_tree_table,	
	[mk_app_versions.name]: mk_app_versions,	
	[mk_app_voucher_education.name]: mk_app_voucher_education,	
	[mk_app_voucher.name]: mk_app_voucher,
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