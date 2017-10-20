import img1 from './img/img1.png'
import img2 from './img/img2.jpg'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-stock-card',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-stock-card-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-stock-card-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-stock-card-header-right',
				children: [{
					name: 'save',
					component: 'Button',
					type: 'showy',
					onClick: '{{$save}}',
					children: '保存'
				}, {
					name: 'add',
					component: 'Button',
					type: 'softly',
					onClick: '{{$add}}',
					children: '新增'
				}]
			}]
		}, {
			name: 'tabs',
			component: 'Tabs',
			className: 'mk-app-stock-card-tabs',
			type: 'card',
			activeKey: '{{data.other.tabKey}}',
			onChange: '{{$tabChange}}',
			children: [{
				name: 'base',
				component: 'Tabs.TabPane',
				key: 'base',
				tab: '基本信息'
			}, {
				name: 'stock',
				component: 'Tabs.TabPane',
				key: 'stock',
				tab: '库存'
			}, {
				name: 'barcode',
				component: 'Tabs.TabPane',
				key: 'barcode',
				tab: '条码'
			}]
		}, {
			name: 'base',
			component: 'Layout',
			className: 'mk-app-stock-card-base',
			_visible: "{{data.other.tabKey=='base'}}",
			children: [{
				name: 'zone1',
				component: 'Layout',
				className: 'mk-app-stock-card-base-zone1',
				children: [{
					name: 'left',
					component: 'Form',
					className: 'mk-app-stock-card-base-zone1-left',
					children: [{
						name: 'codeItem',
						component: 'Form.Item',
						label: '存货编码',
						required: true,
						children: [{
							name: 'code',
							component: 'Input',
							value: '{{data.form.code}}',
							onChange: "{{(e)=>$sf('data.form.code',e.target.value)}}",
						}]
					}, {
						name: 'nameItem',
						component: 'Form.Item',
						label: '存货名称',
						required: true,
						children: [{
							name: 'name',
							component: 'Input',
							value: '{{data.form.name}}',
							onChange: "{{(e)=>$sf('data.form.name',e.target.value)}}",
						}]
					}, {
						name: 'categoryItem',
						component: 'Form.Item',
						label: '存货类型',
						children: [{
							name: 'category',
							component: 'Select',
							showSearch: false,
							value: '{{data.form.category && data.form.category.id }}',
							onChange: "{{$categoryChange}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.categories && data.other.categories[_rowIndex].id }}",
								children: '{{data.other.categories && data.other.categories[_rowIndex].name }}',
								_power: 'for in data.other.categories'
							}
						}]
					}, {
						name: 'specItem',
						component: 'Form.Item',
						label: '规格型号',
						children: [{
							name: 'spec',
							component: 'Input',
							value: '{{data.form.spec}}',
							onChange: "{{(e)=>$sf('data.form.spec',e.target.value)}}",
						}]
					}, {
						name: 'pricingModeItem',
						component: 'Form.Item',
						label: '计价方式',
						children: [{
							name: 'pricingMode',
							component: 'Select',
							showSearch: false,
							value: '{{data.form.pricingMode && data.form.pricingMode.id }}',
							onChange: "{{$pricingModeChange}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.pricingModes && data.other.pricingModes[_rowIndex].id }}",
								children: '{{data.other.pricingModes && data.other.pricingModes[_rowIndex].name }}',
								_power: 'for in data.other.pricingModes'
							}
						}]
					}, {
						name: 'typeItem',
						component: 'Form.Item',
						label: '存货分类',
						children: [{
							name: 'type',
							component: 'TreeSelect',
							treeDefaultExpandAll: true,
							dropdownStyle: { maxHeight: 400, overflow: 'auto' },
							onChange: '{{$typeChange}}',
							value: '{{data.form.type && data.form.type.id}}',
							children: '{{$getTypeDropdownChildren(data.other.types)}}',

						}]
					}, {
						name: 'taxRateItem',
						component: 'Form.Item',
						label: '税率',
						children: [{
							name: 'taxRate',
							component: 'Select',
							showSearch: false,
							value: '{{data.form.taxRate && data.form.taxRate.id }}',
							onChange: "{{$taxRateChange}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.taxRates && data.other.taxRates[_rowIndex].id }}",
								children: '{{data.other.taxRates && data.other.taxRates[_rowIndex].name }}',
								_power: 'for in data.other.taxRates'
							}
						}]
					}, {
						name: 'meaUnitItem',
						component: 'Form.Item',
						label: '计量单位',
						children: [{
							name: 'meaUnit',
							component: 'Select',
							showSearch: false,
							value: '{{data.form.meaUnit && data.form.meaUnit.id }}',
							onChange: "{{$meaUnitChange}}",
							onFocus: "{{$meaUnitFocus}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.meaUnits && data.other.meaUnits[_rowIndex].id }}",
								children: '{{data.other.meaUnits && data.other.meaUnits[_rowIndex].name }}',
								_power: 'for in data.other.meaUnits'
							},
							dropdownFooter: {
								name: 'add',
								component: 'Button',
								type: 'primary',
								style: { width: '100%' },
								children: '新增',
								onClick: '{{$addMeaUnit}}'
							},
						}]
					}, {
						name: 'multiMeaItem',
						component: 'Form.Item',
						className: 'mk-app-stock-card-base-zone1-left-checkbox',
						label: '多计量',
						children: [{
							name: 'multiMea',
							component: 'Checkbox',
							checked: '{{data.form.multiMea}}',
							onChange: "{{(e)=>$sf('data.form.multiMea',e.target.checked)}}",
						}]
					}, {
						name: 'disableItem',
						component: 'Form.Item',
						className: 'mk-app-stock-card-base-zone1-left-checkbox',
						label: '停用',
						children: [{
							name: 'disable',
							component: 'Checkbox',
							checked: '{{data.form.disable}}',
							onChange: "{{(e)=>$sf('data.form.disable',e.target.checked)}}",
						}]
					}]
				}, {
					name: 'right',
					component: 'Layout',
					className: 'mk-app-stock-card-base-zone1-right',
					children: [{
						name: 'left',
						component: 'Layout',
						children: [{
							name: 'imgs',
							component: 'Carousel',
							initialSlide: '{{data.other.selectedImgIndex}}',
							afterChange: '{{$imgChange}}',
							children: {
								name: 'img',
								component: '::img',
								src: '{{data.form.imgs[_rowIndex].url}}',
								_power: 'for in data.form.imgs'
							}
						}]
					}, {

						name: 'right',
						component: 'Layout',
						className: 'mk-app-stock-card-base-zone1-right-right',
						children: [{
							component: 'Button',
							type: "softly",
							shape: "circle",
							icon: 'plus',
							onClick: '{{$addImg}}'
						}, {
							component: 'Button',
							type: "softly",
							shape: "circle",
							icon: 'close',
							onClick: '{{$delImg}}'
						}]


					}]
				}]

			}, {
				name: 'splitter1',
				component: '::h3',
				className: 'mk-app-stock-card-base-splitter1',
				children: '计量单位'
			}, {
				name: 'zone2',
				component: 'Layout',
				className: 'mk-app-stock-card-base-zone2',
				children: [{
					name: 'unitGrid',
					component: 'DataGrid',
					className: 'mk-app-stock-card-base-zone2-purchase-grid',
					headerHeight: 35,
					rowHeight: 35,
					rowsCount: '{{data.form.units.length}}',
					enableSequence: true,
					enableAddDelrow: true,
					startSequence: 1,
					readonly: false,
					onAddrow: "{{$addRow('unitGrid')}}",
					onDelrow: "{{$delRow('unitGrid')}}",
					onKeyDown: '{{$gridKeydown}}',
					scrollToColumn: '{{data.other.unitGridScrollToColumn}}',
					scrollToRow: '{{data.other.unitGridScrollToRow}}',
					columns: [{
						name: 'unit',
						component: 'DataGrid.Column',
						columnKey: 'unit',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '单位'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath)}}",
							showSearch: false,
							value: `{{{
								if(!data.form.units[_rowIndex].unit) return
								return $isFocus(_ctrlPath)
									? data.form.units[_rowIndex].unit.id
									: data.form.units[_rowIndex].unit.name
							}}}`,
							onChange: `{{(v)=>{
								const hit = data.other.meaUnits.find(o=>o.id==v)
								$sf('data.form.units.'+ _rowIndex + '.unit', $fromJS(hit,null))
							}}}`,
							onFocus: "{{$meaUnitFocus}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.meaUnits && data.other.meaUnits[_lastIndex].id }}",
								children: '{{data.other.meaUnits && data.other.meaUnits[_lastIndex].name }}',
								_power: 'for in data.other.meaUnits'
							},
							dropdownFooter: {
								name: 'add',
								component: 'Button',
								type: 'primary',
								style: { width: '100%' },
								children: '新增',
								onClick: '{{$addMeaUnit4UnitGird(_rowIndex)}}'
							},
							_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'conversionRate',
						component: 'DataGrid.Column',
						columnKey: 'conversionRate',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '换算率'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{data.form.units[_rowIndex].conversionRate}}",
							onChange: "{{(v)=>$sf('data.form.units.' + _rowIndex + '.conversionRate', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'conversionDesc',
						component: 'DataGrid.Column',
						columnKey: 'conversionDesc',
						flexGrow: 1,
						width: 200,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '换算说明'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'left')}}",
							value: "{{data.form.units[_rowIndex].conversionDesc}}",
							onChange: "{{(e)=>$sf('data.form.units.' + _rowIndex + '.conversionDesc', e.target.value)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'isBase',
						component: 'DataGrid.Column',
						columnKey: 'isBase',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '是基本计量单位'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath)}}",
							value: "{{ data.form.units[_rowIndex].isBase ? '是': '否' }}",
							checked: "{{ data.form.units[_rowIndex].isBase }}",
							onChange: "{{(e)=>$sf('data.form.units.' + _rowIndex + '.isBase', e.target.checked)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'isPu',
						component: 'DataGrid.Column',
						columnKey: 'isPu',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '是采购常用单位'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath)}}",
							value: "{{ data.form.units[_rowIndex].isPu ? '是': '否' }}",
							checked: "{{ data.form.units[_rowIndex].isPu }}",
							onChange: "{{(e)=>$sf('data.form.units.' + _rowIndex + '.isPu', e.target.checked)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'isSa',
						component: 'DataGrid.Column',
						columnKey: 'isSa',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '是采购常用单位'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath)}}",
							value: "{{ data.form.units[_rowIndex].isSa ? '是': '否' }}",
							checked: "{{ data.form.units[_rowIndex].isSa }}",
							onChange: "{{(e)=>$sf('data.form.units.' + _rowIndex + '.isSa', e.target.checked)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'isSt',
						component: 'DataGrid.Column',
						columnKey: 'isSt',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '是库存常用单位'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath)}}",
							value: "{{ data.form.units[_rowIndex].isSt ? '是': '否' }}",
							checked: "{{ data.form.units[_rowIndex].isSt }}",
							onChange: "{{(e)=>$sf('data.form.units.' + _rowIndex + '.isSt', e.target.checked)}}",
							_power: '({rowIndex})=>rowIndex',

						},
					}]
				}]

			}, {
				name: 'splitter2',
				component: '::h3',
				className: 'mk-app-stock-card-base-splitter2',
				children: '价格信息'
			}, {
				name: 'zone3',
				component: 'Layout',
				className: 'mk-app-stock-card-base-zone3',
				children: [{
					name: 'priceGrid',
					component: 'DataGrid',
					className: 'mk-app-stock-card-base-zone3-sale-grid',
					headerHeight: 35,
					rowHeight: 35,
					rowsCount: '{{data.form.prices.length}}',
					enableSequence: true,
					enableAddDelrow: true,
					startSequence: 1,
					readonly: false,
					onAddrow: "{{$addRow('priceGrid')}}",
					onDelrow: "{{$delRow('priceGrid')}}",
					onKeyDown: '{{$gridKeydown}}',
					scrollToColumn: '{{data.other.priceGridScrollToColumn}}',
					scrollToRow: '{{data.other.priceGridScrollToRow}}',
					columns: [{
						name: 'unit',
						component: 'DataGrid.Column',
						columnKey: 'unit',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '单位'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath)}}",
							showSearch: false,
							value: `{{{
								if(!data.form.prices[_rowIndex].unit) return
								return $isFocus(_ctrlPath)
									? data.form.prices[_rowIndex].unit.id
									: data.form.prices[_rowIndex].unit.name
							}}}`,
							onChange: `{{(v)=>{
								const hit = data.other.meaUnits.find(o=>o.id==v)
								$sf('data.form.prices.'+ _rowIndex + '.unit', $fromJS(hit,null))
							}}}`,
							onFocus: "{{$meaUnitFocus}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.meaUnits && data.other.meaUnits[_lastIndex].id }}",
								children: '{{data.other.meaUnits && data.other.meaUnits[_lastIndex].name }}',
								_power: 'for in data.other.meaUnits'
							},
							dropdownFooter: {
								name: 'add',
								component: 'Button',
								type: 'primary',
								style: { width: '100%' },
								children: '新增',
								onClick: '{{$addMeaUnit4PriceGird(_rowIndex)}}'
							},
							_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'lastPuPrice',
						component: 'DataGrid.Column',
						columnKey: 'lastPuPrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '最近进价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].lastPuPrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.lastPuPrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'referPuPrice',
						component: 'DataGrid.Column',
						columnKey: 'lastPuPrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '参考进价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].referPuPrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.referPuPrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'lastSaPrice',
						component: 'DataGrid.Column',
						columnKey: 'lastSaPrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '最近售价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].lastSaPrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.lastSaPrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'retailPrice',
						component: 'DataGrid.Column',
						columnKey: 'retailPrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '零售价格'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].retailPrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.retailPrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'firstTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'firstTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '一级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].firstTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.firstTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'secondTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'secondTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '二级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].secondTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.secondTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'thirdTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'thirdTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '三级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].thirdTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.thirdTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'fourthTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'fourthTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '四级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].fourthTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.fourthTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'fifthTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'fifthTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '五级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{ $isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].fifthTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.fifthTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'sixthTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'sixthTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '六级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].sixthTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.sixthTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'servenTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'servenTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '七级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].servenTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.servenTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'eighthTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'eighthTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '八级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].eighthTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.eighthTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'ninthTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'ninthTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '九级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].ninthTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.ninthTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}, {
						name: 'tenthTradePrice',
						component: 'DataGrid.Column',
						columnKey: 'tenthTradePrice',
						width: 100,
						header: {
							name: 'header',
							component: 'DataGrid.Cell',
							children: '十级批发价'
						},
						cell: {
							name: 'cell',
							component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
							className: "{{$getCellClassName(_ctrlPath,'right')}}",
							value: "{{$numberFormat($isFocus(_ctrlPath),data.form.prices[_rowIndex].tenthTradePrice,2)}}",
							onChange: "{{(v)=>$sf('data.form.prices.' + _rowIndex + '.tenthTradePrice', v)}}",
							_power: '({rowIndex})=>rowIndex',
						},
					}]
				}]
			}, {
				name: 'splitter3',
				component: '::h3',
				className: 'mk-app-stock-card-base-splitter2',
				children: '备注'
			}, {
				name: 'zone4',
				component: 'Layout',
				className: 'mk-app-stock-card-base-zone4',
				children: {
					name: 'memo',
					component: 'Input.TextArea',
					autosize: { minRows: 4, maxRows: 10 },
					onChange: "{{(e)=>$sf('data.form.memo',e.target.value)}}",
					value: "{{data.form.memo}}"
				}
			}]
		}, {
			name: 'stock',
			component: 'Layout',
			className: 'mk-app-stock-card-stock',
			_visible: "{{data.other.tabKey=='stock'}}",
			children: [{
				name: 'form',
				component: 'Form',
				className: 'mk-app-stock-card-stock-zone1',
				children: [{
					name: 'referCostItem',
					component: 'Form.Item',
					label: '参考成本',
					children: [{
						name: 'referCost',
						component: 'Input.Number',
						value: '{{data.form.referCost}}',
						onChange: "{{(v)=>$sf('data.form.referCost',v)}}",
					}]
				}, {
					name: 'lastCostItem',
					component: 'Form.Item',
					label: '最新成本',
					children: [{
						name: 'lastCost',
						component: 'Input.Number',
						disabled: true,
						value: '{{data.form.lastCost}}',
					}]
				}, {
					name: 'averageCostItem',
					component: 'Form.Item',
					label: '平均成本',
					children: [{
						name: 'averageCost',
						component: 'Input.Number',
						disabled: true,
						value: '{{data.form.averageCost}}',
					}]
				}, {
					name: 'minStockItem',
					component: 'Form.Item',
					label: '最低库存',
					children: [{
						name: 'minStock',
						component: 'Input.Number',
						value: '{{data.form.minStock}}',
						onChange: "{{(v)=>$sf('data.form.minStock',v)}}",
					}]
				}, {
					name: 'maxStockItem',
					component: 'Form.Item',
					label: '最高库存',
					children: [{
						name: 'maxStock',
						component: 'Input.Number',
						value: '{{data.form.maxStock}}',
						onChange: "{{(v)=>$sf('data.form.maxStock',v)}}",
					}]
				}, {
					name: 'securityStockItem',
					component: 'Form.Item',
					label: '安全库存',
					children: [{
						name: 'securityStock',
						component: 'Input.Number',
						value: '{{data.form.securityStock}}',
						onChange: "{{(v)=>$sf('data.form.securityStock',v)}}",
					}]
				}, {
					name: 'taxClassCodeItem',
					component: 'Form.Item',
					label: '税收分类编码',
					children: [{
						name: 'taxClassCode',
						component: 'Input',
						value: '{{data.form.taxClassCode}}',
						onChange: "{{(e)=>$sf('data.form.taxClassCode',e.target.value)}}",
					}]
				}]
			}]

		}, {
			name: 'barcode',
			component: 'Layout',
			className: 'mk-app-stock-card-barcode',
			_visible: "{{data.other.tabKey=='barcode'}}",
			children: [{
				name: 'barcodeGrid',
				component: 'DataGrid',
				className: 'mk-app-stock-card-barcode-zone1',
				headerHeight: 35,
				rowHeight: 35,
				rowsCount: '{{data.form.barcodes.length}}',
				enableSequence: true,
				enableAddDelrow: true,
				startSequence: 1,
				readonly: false,
				onAddrow: "{{$addRow('barcodeGrid')}}",
				onDelrow: "{{$delRow('barcodeGrid')}}",
				onKeyDown: '{{$gridKeydown}}',
				scrollToColumn: '{{data.other.barcodeGridScrollToColumn}}',
				scrollToRow: '{{data.other.barcodeGridScrollToRow}}',
				columns: [{
					name: 'barcode',
					component: 'DataGrid.Column',
					columnKey: 'barcode',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '条形码'
					},
					cell: {
						name: 'cell',
						component: "{{$isFocus(_ctrlPath) ? 'Input' : 'DataGrid.TextCell'}}",
						className: "{{$getCellClassName(_ctrlPath,'left')}}",
						value: "{{data.form.barcodes[_rowIndex].barcode}}",
						onChange: "{{(e)=>$sf('data.form.barcodes.' + _rowIndex + '.barcode', e.target.value)}}",
						_power: '({rowIndex})=>rowIndex',
					},
				}, {
					name: 'unit',
					component: 'DataGrid.Column',
					columnKey: 'unit',
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '单位'
					},
					cell: {
						name: 'cell',
						component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
						className: "{{$getCellClassName(_ctrlPath)}}",
						showSearch: false,
						value: `{{{
								if(!data.form.barcodes[_rowIndex].unit) return
								return $isFocus(_ctrlPath)
									? data.form.barcodes[_rowIndex].unit.id
									: data.form.barcodes[_rowIndex].unit.name
							}}}`,
						onChange: `{{(v)=>{
								const hit = data.other.meaUnits.find(o=>o.id==v)
								$sf('data.form.barcodes.'+ _rowIndex + '.unit', $fromJS(hit,null))
							}}}`,
						onFocus: "{{$meaUnitFocus}}",
						children: {
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.meaUnits && data.other.meaUnits[_lastIndex].id }}",
							children: '{{data.other.meaUnits && data.other.meaUnits[_lastIndex].name }}',
							_power: 'for in data.other.meaUnits'
						},
						dropdownFooter: {
							name: 'add',
							component: 'Button',
							type: 'primary',
							style: { width: '100%' },
							children: '新增',
							onClick: '{{$addMeaUnit4barcodeGird(_rowIndex)}}'
						},
						_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
						_power: '({rowIndex})=>rowIndex',
					},
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				code: '',
				name: '',
				units: [{}],
				prices: [{}],
				barcodes: [{}],
				imgs: [{
					id: 1,
					url: img1
				}, {
					id: 2,
					url: img2
				}]
			},
			other: {
				tabKey: 'base'
			}
		}
	}
}
