module.exports = [{
    "type": "POST",
    "url": "/v1/apidoc/test",
    "title": "测试",
    "name": "test",
    "group": "webapi__apidoc",
    "permission": [{
        "name": "anyone"
    }],
    "description": "apidoc应用测试webapi接口",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "Object",
                "optional": false,
                "field": "option",
                "description": "json对象"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "{\n    param1 : 'aa',\n    param2 : 2\n}",
            "type": "json"
        }, {
            "title": "请求说明 ",
            "content": "{\n    param1 : 'aa', //参数1\n    param2 : 2     //参数2\n}",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n    result:true,\n    value:true\n}",
            "type": "Json"
        }, {
            "title": "返回说明",
            "content": "{\n    result:true, //result标志，ok:true,err:false\n    value:true   //value:返回值\n}",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-apidoc/webapi.js",
    "groupTitle": "webapi__apidoc"
}, {
    "type": "POST",
    "url": "/v1/captcha/fetch",
    "title": "获取验证码",
    "name": "fetch",
    "group": "webapi__captcha",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注册等情况获取验证码",
    "parameter": {
        "examples": [{
            "title": "请求示例",
            "content": "//无参数",
            "type": "String"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": \"123456\"\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-register/webapi.js",
    "groupTitle": "webapi__captcha"
}, {
    "type": "POST",
    "url": "/v1/captcha/fetch",
    "title": "获取验证码",
    "name": "fetch",
    "group": "webapi__captcha",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注册等情况获取验证码",
    "parameter": {
        "examples": [{
            "title": "请求示例",
            "content": "//无参数",
            "type": "String"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": \"123456\"\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-forgot-password/webapi.js",
    "groupTitle": "webapi__captcha"
}, {
    "type": "POST",
    "url": "/v1/captcha/validate",
    "title": "校验验证码",
    "name": "validate",
    "group": "webapi__captcha",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注册等情况校验验证码",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "String",
                "optional": false,
                "field": "captcha",
                "description": "验证码"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "123456 //验证码",
            "type": "String"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": true\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-forgot-password/webapi.js",
    "groupTitle": "webapi__captcha"
}, {
    "type": "POST",
    "url": "/v1/mySetting/init",
    "title": "我的设置初始化",
    "name": "init",
    "group": "webapi__mySetting",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于进入我的设置界面获取初始化数据",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "String",
                "optional": false,
                "field": "userId",
                "description": "用户id"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "1 //用户id",
            "type": "String"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": {  \n         user{\n             \"id\" : 1,\n             \"mobile\": \"13334445556\",\n             \"password\": \"1\"\n         },\n         securityLevel: 1\n     }\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-my-setting/webapi.js",
    "groupTitle": "webapi__mySetting"
}, {
    "type": "POST",
    "url": "/v1/portal/init",
    "title": "门户初始化",
    "name": "init",
    "group": "webapi__portal",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于进入门户时，获取初始化数据",
    "parameter": {
        "examples": [{
            "title": "请求示例 ",
            "content": "//空",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": {  \n         user: {\n             \"id\" : 1,\n             \"mobile\": \"13334445556\",\n             \"password\": \"111\"\n         }\n         \n     }\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-portal/webapi.js",
    "groupTitle": "webapi__portal"
}, {
    "type": "POST",
    "url": "/v1/user/create",
    "title": "创建用户",
    "name": "create",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注册接口",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "Object",
                "optional": false,
                "field": "option",
                "description": "json对象"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "{\n    \"mobile\" : \"13334445557\", //手机号\n    \"password\" : \"1\", //密码\n    \"captcha\": \"123456\" //验证码\n}",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": {  \n         \"mobile\" : \"13334445557\", //手机号\n         \"password\" : \"1\", //密码\n    \n     }\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-register/webapi.js",
    "groupTitle": "webapi__user"
}, {
    "type": "POST",
    "url": "/v1/user/existsMobile",
    "title": "手机号是否存在",
    "name": "existsMobile",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注册等情况实时校验手机号是否存在",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "String",
                "optional": false,
                "field": "mobile",
                "description": "手机号"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "13334445556 //手机号",
            "type": "String"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": true\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-forgot-password/webapi.js",
    "groupTitle": "webapi__user"
}, {
    "type": "POST",
    "url": "/v1/user/existsMobile",
    "title": "手机号是否存在",
    "name": "existsMobile",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注册等情况实时校验手机号是否存在",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "String",
                "optional": false,
                "field": "mobile",
                "description": "手机号"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "13334445556 //手机号",
            "type": "String"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": true\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-register/webapi.js",
    "groupTitle": "webapi__user"
}, {
    "type": "POST",
    "url": "/v1/user/logout",
    "title": "用户注销",
    "name": "logout",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户注销操作",
    "parameter": {
        "examples": [{
            "title": "请求示例 ",
            "content": "//空",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": true\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-portal/webapi.js",
    "groupTitle": "webapi__user"
}, {
    "type": "POST",
    "url": "/v1/user/modifyPassword",
    "title": "修改密码",
    "name": "modifyPassword",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户设置新密码接口",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "Object",
                "optional": false,
                "field": "option",
                "description": "json对象"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "{\n    \"id\" : 1, //用户id\n    \"oldPassword\" : \"1\", //旧密码\n    \"password\" : \"111\" //新密码\n}",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": {  \n         \"id\" : 1,\n         \"mobile\": \"13334445556\",\n         \"password\": \"111\"\n     }\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-modify-password/webapi.js",
    "groupTitle": "webapi__user"
}, {
    "type": "POST",
    "url": "/v1/user/resetPassword",
    "title": "重置密码",
    "name": "resetPassword",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户忘记自己密码使用的接口，可以重置",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "Object",
                "optional": false,
                "field": "option",
                "description": "json对象"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "{\n    \"mobile\" : \"13334445556\", //手机号\n    \"password\" : \"111\" //密码\n}",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": {  \n         \"mobile\": \"13334445556\",\n         \"password\": \"111\"\n     }\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-forgot-password/webapi.js",
    "groupTitle": "webapi__user"
}, {
    "type": "POST",
    "url": "/v1/user/update",
    "title": "修改用户信息",
    "name": "update",
    "group": "webapi__user",
    "permission": [{
        "name": "anyone"
    }],
    "description": "用于用户修改自己信息",
    "parameter": {
        "fields": {
            "Parameter": [{
                "group": "Parameter",
                "type": "Object",
                "optional": false,
                "field": "option",
                "description": "json对象"
            }]
        },
        "examples": [{
            "title": "请求示例 ",
            "content": "{\n    \"id\" : 1, //用户id\n    \"nickname\" : \"齐天大圣\", //昵称\n    \"sex\" : \"1\", //性别\n    \"birthday\": '2008-12-30' //生日\n}",
            "type": "json"
        }]
    },
    "success": {
        "examples": [{
            "title": "返回示例 ",
            "content": "{\n     \"result\": true, //是否成功标志\n     //返回值\n     \"value\": {  \n         \"id\": 1,\n         \"mobile\": 13334445556,\n         \"password\": \"1\",\n         \"nickname\": \"齐天大圣\",\n         \"sex\": \"1\",\n         \"birthday\": \"2008-12-30\"\n     }\n }",
            "type": "Json"
        }]
    },
    "version": "0.0.0",
    "filename": "./apps/mk-app-my-setting/webapi.js",
    "groupTitle": "webapi__user"
}]