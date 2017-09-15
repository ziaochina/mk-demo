/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    mySetting: {
        /**
         * @api {POST} /v1/mySetting/init 我的设置初始化
         * @apiName init
         * @apiGroup webapi__mySetting
         * @apiPermission anyone
         * @apiDescription 用于进入我的设置界面获取初始化数据
         * @apiParam  {String} userId 用户id
         * @apiParamExample  {String} 请求示例 
           1 //用户id
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": {  
                    user{
                        "id" : 1,
                        "mobile": "13334445556",
                        "password": "1"
                    },
                    securityLevel: 1
                }
            }
         */
        init: (userId) => fetch.post('/v1/mySetting/init', userId)
    },
    user: {
        /**
         * @api {POST} /v1/user/update 修改用户信息
         * @apiName update
         * @apiGroup webapi__user
         * @apiPermission anyone
         * @apiDescription 用于用户修改自己信息
         * @apiParam  {Object} option json对象
         * @apiParamExample  {json} 请求示例 
           {
               "id" : 1, //用户id
               "nickname" : "齐天大圣", //昵称
               "sex" : "1", //性别
               "birthday": '2008-12-30' //生日
           }
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": {  
                    "id": 1,
                    "mobile": 13334445556,
                    "password": "1",
                    "nickname": "齐天大圣",
                    "sex": "1",
                    "birthday": "2008-12-30"
                }
            }
         */
        update: (option) => fetch.post('/v1/user/update', option)
    }
}