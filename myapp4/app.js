var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register')

// 引入第三方包  cookie-parser 模块
var cookieParser = require('cookie-parser');
// 引入第三方包  express-session 模块
var session = require('express-session');
// 创建服务器
var app = express();

//   配置 session
//这个代码不是背的代码 这个代码 是session 设置文档里面的 直接理解其中的意思 会配置就可以
//在这里面这个配置引擎连分裂成 类似于量子纠缠的东西 一份给前端 一个后端藏着 前端通过那一份 找后端这一份
app.use(
  session({
    //session 加密信息
    secret: "gfgfg",
    //强制保存 官方建议false
    resave: false,
    //初始化session 存储 true
    saveUninitialized: true,

    //设置过期时间
    cookie: {
      maxAge: 1000 * 10 * 60
    },
  })
);


// cookieparse 和 session 都要经过 cookieParse() 中间件
app.use(cookieParser());


// cookie 路由守卫
//   拦截所有的请求，判断路由，next()中间件判断是否放行
app.all('*', (req, res, next) => {
  console.log('进入了路由守卫');
  // 获取 cookie 值
  console.log(req.cookies);
  console.log('上面是获取的cookie值');
  if (req.cookies.islogin === 'ok' || req.url === '/login' || req.url === '/login/in' || req.url === '/register') {
    console.log('next之前');
    next();
  } else {
    res.redirect('/login')
  }
});


// session 路由守卫
//   拦截所有的请求，判断路由，next()中间件判断是否放行
/* app.use((req, res, next) => {
  console.log('进入了路由守卫');
  // 获取 session 值
  console.log(req.session);
  console.log('上面是获取的 session 值');
  if (req.session.islogin === 'ok' || req.url === '/login' || req.url === '/login/in') {
    console.log('next之前');
    next();
  } else {
    res.redirect('/login');
  }
}); */








// view engine setup

app.set('views', path.join(__dirname, 'views'));
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));









//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);

app.use('/login', loginRouter)
app.use('/register', registerRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;