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
  response,
  isFormatTime = true,
  formtValue = "YYYY-MM-DD",
  showTotal = false
) {
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
      if (showTotal) {
        const { data: arr, total } = getTotal(data);
        response.json({
          data: arr,
          status: 200,
          total,
        });
        return;
      }
      response.json({
        data,
        status: 200,
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
function getTotal(data) {
  let total = 0;
  data.forEach((item) => {
    if (!total) {
      total = item.total;
    }
    delete item.total;
  });
  return {
    total,
    data,
  };
}
function formatTime(time) {
  const current = new Date(time)
  let year = current.getFullYear()
  let month = current.getMonth() + 1 > 9 ? current.getMonth() + 1 : '0' + current.getMonth() + 1
  let day = current.getDate()
  let hour = current.getHours()
  let min = current.getMinutes()
  let second = current.getSeconds()
  return `${year}-${month}-${day} ${hour}:${min}:${second}`
}
module.exports = {
  getDataFromDb,
  editDbData,
  handleHTML,
  formatTime,
};
