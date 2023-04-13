const express = require('express')
const router = express.Router()

const { getDataFromDb, editDbData } = require('../utils/index')
// 获取用户信息
router.get('/getUserInfo', (req, response) => {
  const sql = `select * from users where uid=${req.query.uid*1}`
  getDataFromDb(sql, response, true, "YYYY-MM-DD", false )
})
// 修改用户信息
router.post('/updateUserInfo', (req, response) => {
  const {phone, pwd, uname, uid} = req.body
  const sql = `
    update users
    set phone=${phone},pwd=${pwd},uname='${uname}'
    where uid=${uid}
  `
  editDbData(sql, response)
})

module.exports = router
