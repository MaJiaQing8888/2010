// 引入模块
const express = require('express');
const router = express.Router();
const users = require('../sql/user');



// 出现  响应 出  注册 的 ejs 模板页面
router.get('/', (req, res, next) => {
  console.log('进入了register 注册页面');

  // 响应 跳转到登录  的 ejs模板
  res.render('register')
});


// 获取注册的 数据  ，进行处理
/* router.post('/in', (req, res, next) => {
  // 获取 post 请求的 数据
  const obj = req.body;
  console.log(obj);
  // 添加新注册的  数据 进数据库
  users.create(obj, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    // 有 bug 空的也能注册成功
    if (data) {
      res.redirect('/login')
    } else {
      res.redirect('/register')
    }
  })
}) */


// *****解决用户注册  时 用户名重复的 流程
router.post('/in', (req, res, next) => {
  // 获取 注册提交的 数据信息
  const obj = req.body;
  console.log(obj);
  console.log(obj.username);
  // 查询数据库 比对用户名数据  是否存在
  users.findOne({
    username: obj.username
  }, (err, data) => {
    if (err) {
      // 写错误日志，放进数据库
      console.log(err);
    }

    if (data) { //data 不为null 则表明有数据用户已存在
      res.send('用户名已存在')
    } else {
      // 不存在 创建 成功 写入数据库 跳转到登录页面
      users.insertMany(obj, (err, data) => {
        console.log(data);
        res.redirect('/login')
      })
    }
  });

});










module.exports = router;