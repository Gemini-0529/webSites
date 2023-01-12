import axios from "@/axios.js";
export function getSiteList(params) {
  return axios.get("/API/site/siteList", {
    params,
  });
}
export function addSite(params) {
  return axios.post("/API/site/addSite", {
    ...params,
  });
}
export function delSite(params) {
  return axios.post("/API/site/delSite", {
    ...params,
  });
}
export function colSite(params) {
  return axios.post("/API/site/colSite", {
    ...params,
  });
}

// 爬取网站icon
export function spliderIcon(params) {
  return axios.get("/API/site/getIco", {
    params,
  });
}
// 获取网站详情
export function siteDetail(params) {
  return axios.get("/API/site/siteDetail", {
    params,
  });
}
// 修改网站
export function updateSite(params) {
  return axios.post("/API/site/updateSite", {
    ...params,
  });
}
// 经常访问
export function frequentlyVisited() {
  return axios.get("API/site/frequentlyVisited",{})
}
// 点击后增加访问次数
export function addVisitTimes(params) {
  return axios.post("/API/site/addVisitTimes", {
    ...params
  })
}
export function visitedHistory(params) {
  return axios.get('/API/site/history', {
    params
  })
}
// export {
//   getSiteList,
//   addSite,
//   delSite,
//   spliderIcon,
//   colSite,
//   siteDetail,
//   updateSite,
//   frequentlyVisited,
//   addVisitTimes,
// };
