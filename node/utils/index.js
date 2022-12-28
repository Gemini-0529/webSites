const db = require("./db");
const moment = require("moment");
const cheerio = require("cheerio");
/**
 * @param {isFormatTime} 是否格式化日期格式
 * @param {formtValue} 日期格式
 */
function getDataFromDb(
  // ...arg
  sql,
  totalSql,
  response,
  isFormatTime = false,
  formtValue = "YYYY-MM-DD",
) {
  // total先搁置
  // if(totalSql) {
  //   dataObj.total = getTotal(totalSql)
  // }
  db.query(sql, (err, data) => {
    if (err) {
      response.json({
        data: null,
        status: 500,
        msg: err,
      });
    } else {
      if (isFormatTime) {
        data.forEach((item) => {
          item.createTime = moment(item.createTime).format(formtValue);
        });
      }
      response.json({
        status: 200,
        data,
        total:100,
      });
    }
  });
}
function editDbData(sql, response) {
  db.query(sql, (err, data) => {
    if (err) {
      console.log("操作失败", err);
      response.json({
        status: 500,
        data: null,
        msg: err,
      });
    } else {
      response.json({
        status: 200,
      });
    }
  });
}
// 爬取<link href="xx"/>
function handleHTML(data) {
  const tree = cheerio.load(data);

  const href = tree(`link[rel*="icon"]`).attr("href") || '';
  const description = tree(`meta[name*="description"]`).attr('content') || ''
  return {
    href,
    description
  };
}
function getTotal(sql) {
  let abc = 0
  db.query(sql, (err, data) => {
    if(err) {
      return null
    }else {
      console.log('789',data);
      abc = data
      console.log('???',abc);
    }
  })
  console.log('!!!',abc);
  return abc
}
module.exports = {
  getDataFromDb,
  editDbData,
  handleHTML,
};
