
//项目的路由模块
//1.得到路由对象router
var express = require('express');
var router = express.Router();
//引入控制器模块controller.js
var controller = require('./controller.js');
//2.在路由对象身上定义一些路由规则

//定义/login,回显登录的表单
router.get('/login',controller.loginView)

//完成登录用户名和密码匹配的路由
router.post('/login',controller.login)

//完成用户的退出
router.get('/logout',controller.logout);

//3.通过module.exports进行暴露路由对象
module.exports = router;