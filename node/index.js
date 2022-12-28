const express = require('express')
const app = express()
const jwt = require('./jwt')

const menuRouter = require('./router/menu_router')
const siteRouter = require('./router/siteList_router')
const loginRouter = require('./router/login_router')
const registerRouter = require('./router/register_router')

const commonRouter = require('./router/common_router')


app.listen(3000, ()=>{
    console.log('---server start---');
})
// 托管静态资源
app.use('/images',express.static('images'))
app.all('*', (req, res, next) => {
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})
// 解析post请求参数
app.use(express.urlencoded({extended: false}))//key=value&key=value
app.use(express.json())// {"key":"value","key":value}

// 登录相关路由
app.use('/login', loginRouter)
app.use('/register', registerRouter)

// 菜单相关路由
app.use('/menu', menuRouter)
// 校验token中间件
app.use((req,res,next) => {
    const validToken = jwt.decrypt(req.headers.token)
    console.log('验证token结果--->',validToken);
    // 验证失败返回401
    validToken ? next() : res.status(401).send('unAuthority')
    
})
// 网站相关路由
app.use('/site', siteRouter)

// 其他相关路由
app.use('/common', commonRouter)
