const express = require("express");
const router = express.Router();
const { getDataFromDb, editDbData, handleHTML, formatTime } = require("../utils/index");

const https = require("https");
// 查询网站列表
router.get("/siteList", (req, response) => {
  const { id, currentPage, pageSize }  = req.query
  const sql = `
  select * from siteList
  where typeId = ${id}
  limit ${(currentPage - 1) * pageSize},${pageSize}
  `;
  // total
  const totalSql = `select count(1) as total from siteList where typeId=${id}`
  getDataFromDb(sql, totalSql, response, true, "YYYY-MM-DD");
});
// 输入链接，自动获取对应icon
router.get("/getIco", (req, response) => {
  let html = "";
  https.get(req.query.url, (res) => {
    try {
      res.on("data", (chunk) => {
        html += chunk;
      });
      res.on("end", () => {
        const href_desc = handleHTML(html);
        response.json({
          ...href_desc,
        });
      });
    }catch(err) {
      response.json({
        data: null,
        status: 500,
        msg: err,
      })
    }
  });
});
// 新增网站
router.post("/addSite", (req, response) => {
  const { typeId, label, description, link, icon, createTime, isCollect } =
    req.body;
  // const sql = `insert into siteList (typeId,label,descript,link,icon,createTime,isCollect) values (${typeId},${label},${descript},${link},${icon},${createTime},${isCollect})`;
  const sql = `insert into siteList
    (typeId, label, description, link, icon, isCollect)
    values
    (${typeId}, '${label}', '${description}', '${link}', '${icon}', ${isCollect})
  `;
  editDbData(sql, response);
});

// 删除网站
router.post("/delSite", (req, response) => {
  const sql = `delete from siteList where id=${req.body.id}`;
  editDbData(sql, response);
});
// 收藏网站
router.post("/colSite", (req, response) => {
  const { id, curVal } = req.body;
  const sql = `update siteList set isCollect=${
    curVal === 1 ? 0 : 1
  } where id=${id}`;
  editDbData(sql, response);
});
// 网站详情
router.get("/siteDetail", (req, response) => {
  const sql = `select * from siteList where id=${req.query.id}`;
  getDataFromDb(sql, null, response, true, "YYYY-MM-DD HH:mm:ss");
});
// 修改网站
router.post("/updateSite", (req, response) => {
  const { label, description, link, icon, isCollect, id } = req.body;
  const sql = `
    update siteList
    set label='${label}',description='${description}',link='${link}',icon='${icon}',isCollect=${isCollect} where id=${id}`;
  editDbData(sql, response);
});
// 经常访问
router.get("/frequentlyVisited", (req, response) => {
  const sql = `
    select label, link, visitTimes from sitelist
    where visitTimes >= 5
    ORDER BY visitTimes DESC
  `
  getDataFromDb(sql, response,false)
})
// 点击后增加访问次数
router.post("/addVisitTimes", (req, response) => {
  const {id,visitTimes} = req.body
  const sql = `
    update sitelist
    set visitTimes=${visitTimes+1},lastVisitedTime='${formatTime(current)}'
    where id=${id}
  `
  editDbData(sql, response);
})
// 上个月、上周、今日历史记录
router.get('/history',(req, response) => {
  const {startTime, endTime, currentPage, pageSize} = req.query
  const sql = `
    select *,COUNT(1) over() as total from sitelist
    where lastVisitedTime <= '${endTime}' && lastVisitedTime >= '${startTime}'
    order by lastVisitedTime desc
    limit ${(currentPage - 1) * pageSize},${pageSize}
  `
  getDataFromDb(sql, response, false,"YYYY-MM-DD",true)
})
module.exports = router;
