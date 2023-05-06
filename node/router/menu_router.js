const express = require('express')
const router = express.Router()
const { getDataFromDb, editDbData } = require('../utils/index.js')
// 获取菜单列表
router.get('/menuList', (req, response) => {
  const sql = `select * from menuList where uid=${req.query.uid}`
  getDataFromDb(sql, response)
})

// 添加二级菜单时获取所有父菜单
router.get('/parentMenu', (req, response) => {
  const sql = `select * from menuList where uid=${req.query.uid} and level=1`
  getDataFromDb(sql, response)
})

// 添加菜单
router.post('/addMenu', (req, response) => {
  const {parentId, label, checkAuthority=1, level, uid} = req.body
  const sql = `insert into menulist
    (parentId, label, checkAuthority, level, uid)
    values
    (${parentId}, '${label}', '${checkAuthority}', '${level}', ${uid})
  `;
  editDbData(sql, response)
})

// 删除菜单
router.post('/delMenu', (req, response) => {
  const sql = `delete from menulist where id in(${req.body.delMenuIds.join()})`
  editDbData(sql, response)
})

module.exports = router
