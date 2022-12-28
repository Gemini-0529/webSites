const db = require('../utils/db')
const express = require('express')
const router = express.Router()
const { editDbData } = require('../utils/index')

router.post('/register',(req, response) =>{
  const { uname, pwd, phone } = req.body
  const sql = `
    insert into users
    (uname, phone, pwd) values ('${uname}', ${phone}, '${pwd}')
  `
  editDbData(sql, response)
})

module.exports = router