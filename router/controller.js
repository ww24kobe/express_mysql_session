
var controller = {};

// var login = function(req,res){
//   res.send('login');
// }

// var register = function(req,res){
//   res.send('register');
// }

controller.login = function(req,res){
  res.send('login111');
}

controller.register = function(req,res){
  res.send('register22');
}


//暴露所有的函数
module.exports = controller;