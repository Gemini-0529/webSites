const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const jwt = require('../jwt')
router.get('/login',(req, response) => {
  const { uname, pwd} = req.query
  let sql = `
    select uid,uname from users
    where uname='${uname}' and pwd='${pwd}'
  `
  
  db.query(sql, (err, data) => {
    if(err) {
      response.json({
        status: 500,
        msg: err
      })
    }else {
      if(data.length) {
        const {uid, uname} = data[0]
        // 传入用户id、name，生成token返回客户端
        const token = jwt.encrypt({uid,uname})
        response.json({
          token:token
        })
      }else {
        response.json({
          msg: '请检查用户名、密码是否正确'
        })
      }
    }
  })
})
module.exports = router