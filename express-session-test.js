var express = require('express');
//1.引入session
var session = require('express-session');

var app = express();

//2.设置session一些初始化配置操作
//通过app.use中间件设置session的参数
app.use(session({
  name:'SESSIONID',  // session会话名称在cookie中的值
  secret:'%#%￥#……%￥', // 必填项，用户session会话加密（防止用户篡改cookie）
  cookie:{  //设置session在cookie中的其他选项配置
    path:'/',
    secure:false,  // true 只针对于域名https协议
    maxAge:60000*24,  //设置有效期为24分钟，说明：24分钟内，不访问就会过期，如果24分钟内访问了。则有效期在初始化为24分钟。
  }
}));

app.get('/set',function(req,res){
  //设置session
  req.session.uid = 1001;
  req.session.username = 'admin';
  res.send('session已设置')
})

app.get('/get',function(req,res){
  //获取session
  console.log(req.session.uid);
  console.log(req.session.username);
  res.send('获取session')
})


app.get('/delui',function(req,res){
  //删除一个session
  req.session.username = null;
  res.send('删除username');
})

app.get('/delsess',function(req,res){
  //删除整个session会话
  req.session.destroy(function(err){
    if(err){
      throw err;
    }
  });
  res.send('删除session会话');
})


app.get('/youxiaoqi',function(req,res){
  // console.log(req.session.cookie);
  console.log(req.session.cookie.maxAge);
});

app.listen(3000,function(){
  console.log('请访问');
})

