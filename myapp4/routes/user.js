var express = require('express');
var router = express.Router();
//引入 集合模块
const users = require('../sql/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  // 查找所并渲染
  users.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)

    res.render("user", {
      index: 2,
      data: data
    })
  });
});

//添加数据
router.get('/add', function (req, res, next) {
  res.render('userAdd', {
    index: 2
  });
});

// 提交显示
router.post("/addAction", function (req, res, next) {
  console.log('进入user addAction')

  let obj = req.body;
  console.log(obj)

  users.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })


});

// 删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  users.deleteOne({
    '_id': req.query._id
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  });
});


//修改操作
router.get("/updateUser", function (req, res, next) {
  //get来的数据在req.query.id

  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);

  users.findById({
    "_id": _id
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate', {
      index: 2,
      data: data
    })
  })


});

// 修改操作 - 更新数据
router.post("/updateActionUser", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;
  console.log(obj);


  // 处理数据类型，符合数据集合的字段类型


  // console.log(obj._id);
  // console.log('obj_id', obj)
  users.findByIdAndUpdate(obj._id, {$set: obj}, (err, data) => {
    if (err) {
      console.log(err)
    }
    // console.log(data)
    res.redirect("/user");

  });
});



//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  users.find({
    username: reg
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data,
    });
  })


});



























module.exports = router;