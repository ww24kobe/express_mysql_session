var express = require('express');
var app = express(); //框架的实例app

var router = require('./route.js');
app.use('/',router);


app.listen(3000,function(){
  console.log('请访问http://127.0.0.1:3000');
});