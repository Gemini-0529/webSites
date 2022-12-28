const express = require('express')
const router = express.Router()
const { getDataFromDb } = require('../utils/index.js')

router.get('/menuList', (req, response)=> {
  let sql = 'select * from menuList'
  getDataFromDb(sql, null, response)
})

module.exports = router