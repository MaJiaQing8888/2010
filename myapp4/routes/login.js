// 引入模块
const express = require('express');
// 建立路由表
const router = express.Router();
const users = require('../sql/user');


router.get('/', (req, res, next) => {
  console.log('进入了login 登录页面');
  // 响应 跳转到登录  的 ejs模板
  res.render('login');
});


// 点击 提交跳转的 路由   对象提交的数据处理
router.post('/in', (req, res, next) => {
  // 接收数据
  const obj = req.body;
  console.log(obj);

  // 查询数据库判断 用户存不存在
  users.findOne(obj, (err, data) => {
    // 服务器查询出错的操作
    if (err) {
      console.log(err);
    }
    // 查询成功
    if (data) { // 用户存在   跳转  商品管理页面
      //response  服务器和你说 你的肚子里面 cookie那个位置 给我村上islogin = 0k
      res.cookie('islogin', 'ok') // 登录成功设置 cookie
      //注意 这里是req 设置的 实在服务器端设置的 因为要先分裂成一个对象 给前端一个 后端藏一个  前端通过给的那一个加密的来找信息

      // sessio设置   令牌
      // req.session.islogin = 'ok';
      // console.log('我在login路由 /in')


      res.redirect('/pro')
    } else { // 用户 不存在 跳转 注册页面
      res.redirect('/register')
    }
  })
})



















module.exports = router;