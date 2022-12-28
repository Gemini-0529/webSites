import axios from "@/axios.js";
function login(params) {
  console.log('params',params);
  return axios.get("/API/login/login", { params });
}

export {
  login
}