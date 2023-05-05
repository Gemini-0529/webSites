const express = require('express')
const router = express.Router()
const multiparty = require('multiparty')
const sysIP = require('../utils/getSysIP')

router.post('/upload', (req, res) => {
  let form = new multiparty.Form()
  // 写入上传的文件到images下
  form.uploadDir = './images'
  form.parse(req, (err,fields, files)=> {
    console.log('123======>',err,fields, '+++++>',files);
    let url = files.file[0].path.replace(/\\/g,'/')
    console.log('----------.',url);
    if(err) {
      res.json({
        code: 400,
        msg:'上传失败'+err
      })
    }else {
      res.json({
        code: 200,
        imgSrc: `http://${sysIP()}:3000/${url}`
      })
    }
  })
})
module.exports = router
