/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    user: {
        /**
         * @api {POST} /v1/user/modifyPassword 修改密码
         * @apiName modifyPassword
         * @apiGroup webapi__user
         * @apiPermission anyone
         * @apiDescription 用于用户设置新密码接口
         * @apiParam  {Object} option json对象
         * @apiParamExample  {json} 请求示例 
           {
               "id" : 1, //用户id
               "oldPassword" : "1", //旧密码
               "password" : "111" //新密码
           }
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": {  
                    "id" : 1,
                    "mobile": "13334445556",
                    "password": "111"
                }
            }
         */
        modifyPassword: (option) => fetch.post('/v1/user/modifyPassword', option),
    }
}