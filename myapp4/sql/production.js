// 引入链接数据库的模块
const db = require('./db');

//设定集合字段规则
const goodscontrolSchema = new db.mongoose.Schema({
  "proName": {
    type: String
  },
  "column": {
    type: String
  },
  "brand": {
    type: String
  },
  "logo": {
    type: String
  },
  "price": {
    type: String
  },
  "proImg": {
    type: String
  },
  "introduce": {
    type: String
  },
  "stock": {
    type: Number
  },
  "discount": {
    type: Number
  },
  "score": {
    type: Number
  }
});

// 创建集合
const production = db.mongoose.model('production', goodscontrolSchema);

// 将创建集合 模块对外导出
module.exports = production;