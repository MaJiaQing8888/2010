const db = require("./db");

const adminSchema = new db.mongoose.Schema({
  "username": {
    type: String
  },
  "password": {
    type: String
  },

})
// 我们的数据库锁死名字叫users   
module.exports = db.mongoose.model("users", adminSchema);