# mk-app-loader

## mk简介

mk = monkey king = 齐天大圣

## mk-app-loader特点

- 这是一个基于react, redux, immutable的开源项目  
- 简化原生redux实现状态管理的过程
- 以app的方式组织代码，隔离app状态
- 单页程序，通过提供不同app名装载不同应用
- 每个app模式统一，可维护性强，大规模开发，项目管理更加容易

## 适用人员

有react, redux经验的人员

## 运行example

```
$ cd example
$ npm install
$ npm start
浏览器访问127.0.0.1:8089

```

## API

```
npm install mk-app-loader --save
```

属性 | 说明 | 类型
-----|-----|-----
AppLoader | app名 | ReactNode
config| 配置，{apps:"多个应用对象",middlewares:"redux中间件数组",actionInjections:'action注入',reducerInjections:'reducer注入',targetDomId:'render目标dom', startAppName:'入口app名'} | function
start| 启动 | function


### AppLoader组件属性

属性 | 说明 | 类型
-----|-----|-----
name | app名 | string


### this.props包含属性介绍

属性 | 说明 | 数据类型
-----|-----|-----
action文件中export的所有方法 | component可以通过this.props.action方法名(),调用action文件中export的所有方法 | function
payload | 当前应用的状态 | immutable Map
appName | 当前app名,如helloWorld | string
appFullName | 当前app全名包括query，如：helloWorld?a=1 | string
appQuery | 当前app全名中'?'后字符串，如：a=1 | string
appParams | appQuery转object,如：{a:1} | object

### action代码

定义component事件需要处理的一些行为方法，示例代码如下

```javascript
export function initView(){
	//injectFuns是appMiddleware注入对象，其中最重要的一个reduce方法可以指定reducer方法名就可以调用
	//避免redux中处理消息的很多代码
	return injectFuns=>{
		injectFuns.reduce('initView')
	}
}
```

- injectFuns是appMiddleware注入的，默认包含下面两个方法

属性 | 说明 | 数据类型
-----|-----|-----
reduce | reduce方法能调用reducer的方法，格式：reduce(reducer中方法名, 参数1, 参数2...)|function
getState | getState方法能取到当前应用的state | function 


### reducer代码

定义修改状态的方法，由action调用

它里面所有对外的方法第一个参数是state表示旧状态，返回值是新状态

示例代码如下

```javascript
import {Map} from 'immutable'

export function initView(state=Map() ){
	return state.set('text', '这是hello world app!')
}
```






