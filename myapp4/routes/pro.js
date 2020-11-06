// 引入 express 框架
const express = require('express');
// 创建路由表
const router = express.Router();
//引入 集合模块
const production = require('../sql/production');


router.get('/', (req, res, next) => {
  // 请求数据库得到数据，将数据渲染到页面
  production.find({}).exec((err, data) => {
    if (err) {
      console.log(err);

    }
    // 请求成功将数据 传给Pro.ejs模板渲染
    res.render('pro', {
      index: 1,
      data: data,
    });
  })
});



// 添加商品
router.get('/add', (req, res, next) => {
  //响应添加商品信息的 proAdd .ejs模板
  res.render('proAdd', {
    index: 1
  });
});

// 添加商品页面 点击提交按的跳转
router.post('/addAction', (req, res, next) => {
  // 获取到 post 请求的参数
  let postObj = req.body;
  // 将 库存，折扣，评分；参数转换成Number类型
  // 因为 集合 Schema 规则是
  /*  "stock":{type:Number},
    "discount":{type:Number},
    "score":{type:Number} */
  postObj.stock = Number(postObj.stock);
  postObj.price = postObj.price - 0;
  postObj.discount = postObj.discount * 1;
  // 追加到数据库
  production.insertMany(postObj, (err, data) => {
    if (err) {
      console.log(err);

    }
    // Express框架为我们提供了redirect方法来进行重定向，它的参数就是要跳转的地址
    res.redirect('/pro');
  })
});

// 删除操作
router.get('/delete', (req, res, next) => {
  // 获取 get 请求的参数
  console.log(req.query._id);
  // 根据id删除 集合中 指定的商品
  production.findOneAndDelete({
    '_id': req.query._id
  }, (err, data) => {
    if (err) {
      console.log(err);

    }
    console.log(data);
    res.redirect('/pro')
  });

});

// 修改操作
router.get('/update', (req, res, next) => {
  // 获取参数
  console.log(req.query._id);
  // 根据id 找出要 修改的数据
  production.findById({
    "_id": req.query._id
  }, (err, data) => {
    if (err) {
      console.log(err);

    }
    // 将查到的数据 渲染到 proUpdate.ejs模板中
    console.log(data);
    res.render('proUpdate', {
      index: 1, // 测试：也可以0
      data: data
    });
  });
});

// 接收到修改后的新数据，并更新数据库中数据，重新渲染
router.post('/updateAction', (req, res, next) => {
  // 获取 post 传递的参数
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  obj.price = Number(obj.price);
  obj.stock = parseInt(obj.stock)
  obj.discount = obj.discount - 0;
  obj.sales = obj.sales - 0;
  production.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/pro");
  });

});

// sort 排序 值是1表示升序 -1 表示降序
router.get('/sort1', (req, res, next) => {
  // const obj = req.query;
  // console.log(obj);
  production.find({}).sort({
    price: 1
  }).exec((err, data) => {
    if (err) {
      console.log(err);

    }
    console.log(data);
    res.render('pro', {
      index: 1,
      data: data
    })
  });
});

// 降序
router.get('/sort-1', (req, res, next) => {
  // const obj = req.query;
  // console.log(obj);
  production.find({}).sort({
    price: -1
  }).exec((err, data) => {
    if (err) {
      console.log(err);

    }
    console.log(data);
    res.render('pro', {
      index: 1,
      data: data
    })
  });
});








//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  production.find({
    proName: reg
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    });
  })


});













module.exports = router;