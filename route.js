
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



//定义路由  正则匹配 /  或  /index
router.get(/^\/$|^\/index$/,controller.index)

//删除
router.get('/del',controller.del);

//编辑，实现文章的回显操作
router.get('/upd',controller.updView) 

//完成编辑入库操作
router.post('/upd',controller.upd)

//展示添加模板的视图
router.get('/add',controller.addView)

//完成文章的添加入库操作
router.post('/add',controller.add)

//完成用户的退出
router.get('/logout',controller.logout);

//3.通过module.exports进行暴露路由对象
module.exports = router;