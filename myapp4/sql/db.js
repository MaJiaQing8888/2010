//引入 mongoose模块
const mongoose = require('mongoose');

//使用mongoose 里的API对mongoDB数据库操作

// 链接数据库      27017是mongodb默认的端口号
mongoose.connect('mongodb://localhost:27017/stu5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//添加监听事件
//链接成功
mongoose.connection.on('connected', (() => {
  console.log('链接成功');

}))
// 连接断开
mongoose.connection.on('disconnected', (() => {
  console.log('断开链接');

}));
// 连接错误
mongoose.connection.on('error', ((err) => {
  console.log('链接失败' + err);

}));

// 链接成功后，将模块对外暴露；
module.exports = {
  mongoose: mongoose,
}