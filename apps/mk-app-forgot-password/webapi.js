/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    user: {
        /**
         * @api {POST} /v1/user/resetPassword 重置密码
         * @apiName resetPassword
         * @apiGroup webapi__user
         * @apiPermission anyone
         * @apiDescription 用于用户忘记自己密码使用的接口，可以重置
         * @apiParam  {Object} option json对象
         * @apiParamExample  {json} 请求示例 
           {
               "mobile" : "13334445556", //手机号
               "password" : "111" //密码
           }
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": {  
                    "mobile": "13334445556",
                    "password": "111"
                }
            }
         */
        resetPassword: (option) => fetch.post('/v1/user/resetPassword', option),

        /**
         * @api {POST} /v1/user/existsMobile 手机号是否存在
         * @apiName existsMobile
         * @apiGroup webapi__user
         * @apiPermission anyone
         * @apiDescription 用于用户注册等情况实时校验手机号是否存在
         * @apiParam  {String} mobile 手机号
         * @apiParamExample  {String} 请求示例 
            13334445556 //手机号
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": true
            }
         */
        existsMobile: (mobile) => fetch.post('/v1/user/existsMobile', mobile)
    },
    captcha: {
        /**
         * @api {POST} /v1/captcha/fetch 获取验证码
         * @apiName fetch
         * @apiGroup webapi__captcha
         * @apiPermission anyone
         * @apiDescription 用于用户注册等情况获取验证码
         * @apiParamExample  {String} 请求示例
             //无参数
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": "123456"
            }
         */
        fetch: (option) => fetch.post('/v1/captcha/fetch'),
        /**
         * @api {POST} /v1/captcha/validate 校验验证码
         * @apiName validate
         * @apiGroup webapi__captcha
         * @apiPermission anyone
         * @apiDescription 用于用户注册等情况校验验证码
         * @apiParam  {String} captcha 验证码
         * @apiParamExample  {String} 请求示例 
            123456 //验证码
         * @apiSuccessExample {Json} 返回示例 
           {
                "result": true, //是否成功标志
                //返回值
                "value": true
            }
         */
        validate: (captcha) => fetch.post('/v1/captcha/validate', captcha)
    }
}