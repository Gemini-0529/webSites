#### 启动server
```
cd node
npm install
npm run serve
```

#### 启动前端
```
cd front
npm install
npm run dev
```

### 虚拟机模拟服务器上线*vue+node+mysql*项目

*参考链接 https://blog.csdn.net/qq_43353619/article/details/108076663*

#### 下载宝塔面板

> yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh

如果提示需要root权限，输入su，输入开机密码，继续运行下载宝塔命令 *(默认安装在www下)*

下载成功提示：

外网面板地址: https://124.126.224.82:23614/f470600f
内网面板地址: https://192.168.179.132:23614/f470600f
username: ryyvlrsn
password: 65b35957

> 外网面板地址无法访问，用内网，绑定账号。还无法访问，就查看虚拟机ip，换一下IP地址   查看IP地址：ifconfig

#### 下载需要的软件、服务

进入宝塔页面后，下载需要的软件(nginx、mysql、PHP、pure-ftpd、PHPadmin、pm2、linux工具箱等)，用lnmp

#### 上传node

点击文件--进入根目录 > www > wwwroot 新建文件夹放node项目 *(不需要上传node_modules)*。

#### node命令不能用

node环境变量需要修改

> cd /www/server/nvm/versions/node
>
> 复制正确的node路径 PATH=$PATH:/www/server/nvm/versions/node/版本号/bin
>
> 进入根目录修改文件 vim ~/.bash_profile
>
> 光标移动到要编辑的行 按 *i* 出现insert时输入路径
>
> 按esc，输入:wq 保存退出
>
> 运行环境变量文件  source .bash_profile

#### 进入node目录

> 输入su，密码，进入root权限 *(否则无法安装node_modules)*
>
> cd /www/wwwroot/server_node
>
> npm i

#### 添加数据库

1. 数据库名、用户名跟node中一样，提示用户名不合法就换一个，数据库管理密码错误就更新一下root密码，再添加数据库
2. phpadmin   name: db_zwb  pwd: admin
3. 导入sql

#### 测试连接数据库

| 字段   | 值       |
| ------ | -------- |
| 主机   | 虚拟机ip |
| 端口   | 3306     |
| 用户名 | db_zwb   |
| 密码   | admin    |

如果连接不成功，可能是未开放端口

> 安全里添加端口规则

#### 上传dis文件夹

#### 配置Nginx，解决跨域

```javascript
server {
    listen 80;
    server_name localhost;
    location / {
      root /www/wwwroot/website/dist;
      index index.html index.htm;
      #解决history模式，找不到文件资源
      try_files $uri $uri/ /index.html;
      error_page 405 =200 @405;
    }
  }
  server {
    listen 9100;
    location / {
      proxy_pass http://192.168.179.134:3000/;
      add_header Access-Control-Allow-Origin '*';
      add_header Access-Control-Allow-Headers '*';
      add_header Access-Control-Allow-Methods '*';
      add_header Access-Control-Allow-Credentials true;
    } 
  }
```

#### 前端请求地址更改

开发环境/API/...

生产环境http://192.168.179.134:9100/login/login



#### 校验token中间件以后的接口跨域

> 复杂请求会先发送一个options的预请求，预请求中获取不到token，无法通过此中间件，Nginx无法添加允许跨域响应头

```javascript
// 服务器报错(Cannot set headers after they are sent to the client)，无法使用此方法
// 解决预检请求options 跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);
    if(req.method == 'OPTIONS') {
        res.sendStatus(200)
    }
    next()
})

// 临时方案--校验token中，跳过options请求
// 校验token中间件
app.use((req,res,next) => {
    // 跳过服务器预检请求 options
    if(req.method == 'OPTIONS') {
        next()
    }
    const token = req.headers.token
    const validToken = jwt.decrypt(token)
    // 验证失败返回401
    validToken ? next() : res.status(401).send('unAuthority')
})
```

#### 开启ftp

进入宝塔-ftp-添加ftp

用户名：root

密码：zwb123...

>  用filezilla连接传输文件*ftp://192.168.179.134:21*

#### 预览网站

> http://192.168.179.134/login
