const jwt = require('./jwt')
let auth = jwt.encrypt({
  uname: 'zwb'
})
console.log('test-->',auth);
jwt.decrypt(auth)