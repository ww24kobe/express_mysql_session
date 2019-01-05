var express = require('express');
var app = express(); //框架的实例app

//抽离路由部分挂载到router对象身上
//1.通过express.Router得到路由对象
var router = express.Router();
//2.在路由对象router设置路由，
router.get('/login',function(req,res){
  res.send('login');
})

router.get('/register',function(req,res){
  res.send('register');
})
console.log(router.length); // 函数名.length：获取到函数的形参个数。req,res,next
//3.把路由对象通过app.use中间件进行挂载，挂载之后，app对象才可监听到路由
app.use('/',router);


// app.get('/login',function(req,res){
//   res.send('login');
// })

// app.get('/register',function(req,res){
//   res.send('register');
// })

app.listen(3000,function(){
  console.log('请访问http://127.0.0.1:3000');
});