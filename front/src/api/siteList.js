import axios from "@/axios.js";
function getSiteList(params) {
  return axios.get("/API/site/siteList", {
    params,
  });
}
function addSite(params) {
  return axios.post("/API/site/addSite", {
    ...params,
  });
}
function delSite(params) {
  return axios.post("/API/site/delSite", {
    ...params,
  });
}
function colSite(params) {
  return axios.post("/API/site/colSite", {
    ...params,
  });
}

// 爬取网站icon
function spliderIcon(params) {
  return axios.get("/API/site/getIco", {
    params,
  });
}
// 获取网站详情
function siteDetail(params) {
  return axios.get("/API/site/siteDetail", {
    params,
  });
}
// 修改网站
function updateSite(params) {
  return axios.post("/API/site/updateSite", {
    ...params,
  });
}
export {
  getSiteList,
  addSite,
  delSite,
  spliderIcon,
  colSite,
  siteDetail,
  updateSite,
};
