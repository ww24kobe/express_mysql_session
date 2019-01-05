
//配置数据库连接
var mysql = require('mysql');
var md5 = require('md5');
var connection = mysql.createConnection({
  host:"127.0.0.1",
  port:3306,
  user:'root',
  password:'123456',
  database:"test"
});

//进行连接
connection.connect(function(err){
  if(err){
    throw err;
  }
  console.log('连接数据库成功');
});


//定义路由匹配的函数（类似控制器）
var controller = {};
//在controller对象中定义路由匹配的所有的方法
//controller.方法名 = 路由匹配的函数

controller.loginView = function(req,res){
  res.render('login.html');
}

controller.login = function(req,res){
  //1.获取参数
  var username = req.body.username;
  var password = req.body.password;
  //2.构建查询的sql语句
  var sql = "select * from users where username = '"+username+"' and password = '"+md5(password)+"' ";
  connection.query(sql,function(err,rows,fields){
    console.log(typeof rows[0]);  // 'undefined'
    console.log(typeof rows[0]);  // 'object'
    if(typeof rows[0] == 'undefined'){
      //用户名或密码错误
      res.render('login.html',{message:'用户名或密码失败'});
    }else{
      //设置用户信息到session中，重定向到首页
      req.session.uid = rows[0].uid;
      req.session.username = rows[0].username;
      res.redirect('/');
    }
  });
  
}

//文章列表页
controller.index = function(req,res){
  //1.获取文章的数据
  var sql = "select * from article";
  //2.执行sql语句
  connection.query(sql,function(err,rows,fields){
    if(err){
      throw err;
    }
    //分配变量输出模板 rows:   [{},{}]
    res.render('index.html',{
      'rows':rows,
      'username':req.session.username
    });
  })
  
}

//文章的删除
controller.del = function(req,res){
  //1.接收查询字符串的参数id
  var id = req.query.id;
  //2.编写sql语句，进行执行删除，重定向到首页
  var sql="delete from article where id = ?";
  var bind = [id];
  connection.query(sql,bind,function(err,result){
    if(err){
      throw err;
    }
    res.redirect('/');
  });
  
}

//文章的添加视图回显
controller.addView = function(req,res){
  res.render('add.html');
}
//文章的添加数据入库
controller.add = function(req,res){
  //1.接受post参数
  var title = req.body.title;
  var content = req.body.content;
  //2.入库操作
  var sql = "insert into article(title,content) values(?,?)";
  var bind = [title,content];
  //执行sql语句
  connection.query(sql,bind,function(err,result){
    if(err){
      throw err;
    }
    //说明入库成功，重定向到路由  / 
    res.redirect('/');

  })

}


//文章的编辑视图回显
controller.updView = function(req,res){
  //1.接收id参数
  var id = req.query.id;
  //2.查询一条数据，进行回显
  var sql = "select * from article where id= " + id;
  connection.query(sql,function(err,rows){
    if(err){
      throw err;
    }
    //回显数据到模板中  [{}]
    res.render('upd.html',{
      "row":rows[0]
    })
  })
}
//文章的编辑数据入库
controller.upd = function(req,res){
  //1.接受参数
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;
  //2.编写sql语句，入库
  var sql="update article set title = ? , content = ?  where id = ?";
  var bind = [title,content,id];
  connection.query(sql,bind,function(err,result){
    if(err){
      throw err;
    }
    res.redirect('/');
  })
}


//用户退出
controller.logout = function(req,res){
  //1.清除session
  req.session.uid = null;
  req.session.username = null;
  //2.重定向到登录页
  res.redirect('/login');
}

module.exports = controller;