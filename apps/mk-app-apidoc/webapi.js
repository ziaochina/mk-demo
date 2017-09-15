/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    
    apiDoc: {
        /**
         * @api {POST} /v1/apidoc/test 测试
         * @apiName test
         * @apiGroup webapi__apidoc
         * @apiPermission anyone
         * @apiDescription apidoc应用测试webapi接口
         * @apiParam  {Object} option json对象
         * @apiParamExample  {json} 请求示例 
           {
               param1 : 'aa',
               param2 : 2
           }
         * @apiParamExample  {json} 请求说明 
           {
               param1 : 'aa', //参数1
               param2 : 2     //参数2
           }
         * @apiSuccessExample {Json} 返回示例 
           {
               result:true,
               value:true
           }
         * @apiSuccessExample {Json} 返回说明
           {
               result:true, //result标志，ok:true,err:false
               value:true   //value:返回值
           }
         */
        test: (option) => fetch.post('/v1/apidoc/test', option)
    }
}