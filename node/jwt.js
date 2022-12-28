// token
const jwt = require("jsonwebtoken");
module.exports = Token = {
  // 生成token，有效期默认24小时
  encrypt: (data, time = 60 * 60 * 24) => {
    // 用户数据，秘钥
    return jwt.sign(data, "zwb", {
      expiresIn: time, // 有效期
      // algorithm: 'RS256' // 算法规则，默认rs256
    });
  },
  // 解析
  decrypt: (token) => {
    try {
      let result = jwt.verify(token, "zwb",(err,data) =>{
        if(err) {
          return false
        }else {
          return data
        }
      })
      return result
    }catch(error) {
      console.log('error--->',error);
    }
  },
};
