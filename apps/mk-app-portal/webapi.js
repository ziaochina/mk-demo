/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    portal: {
        /**
         * @api {POST} /v1/portal/init 门户初始化
         * @apiName init
         * @apiGroup webapi__portal
         * @apiPermission anyone
         * @apiDescription 用于进入门户时，获取初始化数据
         * @apiParamExample  {json} 请求示例 
            //空           
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": {  
                    user: {
                        "id" : 1,
                        "mobile": "13334445556",
                        "password": "111"
                    }
                    
                }
            }
         */
        init: (option) => fetch.post('/v1/portal/init', option),
    },
    user: {
        /**
         * @api {POST} /v1/user/logout 用户注销
         * @apiName logout
         * @apiGroup webapi__user
         * @apiPermission anyone
         * @apiDescription 用于用户注销操作
         * @apiParamExample  {json} 请求示例 
            //空           
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": true
            }
         */
        logout: () => fetch.post('/v1/user/logout')
    }
}