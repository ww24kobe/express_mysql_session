//搭建一个web服务
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var artTemplate = require('art-template');
var expressArtTemplate = require('express-art-template');
var mysql = require('mysql');
var session = require('express-session');
var app = express();
var router = require('./route.js');  //后台路由（需要验证session）
var publicRouter = require('./publicRoute.js'); // 前台路由（不需要验证session）

//配置session的初始化操作
app.use(session({
  name:'SESSIONID',
  secret:"%^&^^%%^",
  cookie:{
    path:"/",
    secure:false,
    maxAge:60000*24
  }
}));



//配置模板引擎art-template
app.set('views',path.join(__dirname,'views')) //配置视图的目录
app.engine('html',expressArtTemplate); //配置静态模板后缀为html
app.set('view engine','html'); //设置视图引擎

//配置body-parser中间件，获取post参数
app.use('/',bodyParser.urlencoded({extended:false}));

//设置中间件，托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));

app.use(publicRouter); //这里定义的路由，是不会经过下面的中间件 (放行，不需要验证session)
//定义中间件，判断是否有session
app.use(function(req,res,next){
  //判断是否有session
  if(!req.session.uid){
    //打回登录页 
    res.redirect('/login');
  }
  //有session信息，就是执行下一个中间件
  next();
})
//引入route.js路由模块,并把返回的路由对象通过app.use进行中间件的挂载
app.use(router);  // 只有定义在这里的路由才会执行上面的中间件(需要验证session)


app.listen(3000,function(){
  console.log('项目已启动http://127.0.0.1:3000');
});