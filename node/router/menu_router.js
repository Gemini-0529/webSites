const express = require('express')
const router = express.Router()
const { getDataFromDb } = require('../utils/index.js')

router.get('/menuList', (req, response)=> {
  let sql = 'select * from menuList'
  getDataFromDb(sql, null, response)
})
router.post('/addMenu', (req, response) => {
  const {parentId, label, checkAuthority=1, level} = req.body
  const sql = `insert into menulist
    (parentId, label, checkAuthority, level)
    values
    (${parentId}, '${label}', '${checkAuthority}', '${level}')
  `;
  editDbData(sql, response)
})
module.exports = router
