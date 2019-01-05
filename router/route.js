var express = require('express');
var app = express(); //框架的实例app

//抽离路由部分挂载到router对象身上
//1.通过express.Router得到路由对象
var router = express.Router();

//2.在路由对象router设置路由，
//3.引入controller.js
var controller = require('./controller.js');
router.get('/login',controller.login)
router.get('/register',controller.register)

//最后需要通过module.exports暴露出去，外面就可以通过requre进行接收使用
module.exports = router;

