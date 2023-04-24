const express = require('express')
const router = express.Router()
const { getDataFromDb, editDbData } = require('../utils/index.js')

router.get('/menuList', (req, response)=> {
  let sql = `select * from menuList where uid=${req.query.uid}`
  getDataFromDb(sql, response, false)
})
router.post('/addMenu', (req, response) => {
  const {parentId, label, checkAuthority=1, level, uid} = req.body
  const sql = `insert into menulist
    (parentId, label, checkAuthority, level, uid)
    values
    (${parentId}, '${label}', '${checkAuthority}', '${level}', ${uid})
  `;
  editDbData(sql, response)
})
module.exports = router
