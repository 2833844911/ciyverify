

# ciyverify 启动文档

该滑块验证码所使用的加密方式是jsvmp，其难度应该是现在(2024-02-29)在国内外的web安全产品中属于顶尖的，可以拦截绝大部分的算法还原

### 一、为什么要使用滑动验证码

首先，滑块验证码能够有效防止暴力破解和自动化攻击。在传统的账号密码验证方式下，黑客可以通过暴力破解手段尝试大量密码组合，从而获取用户账户的控制权。而滑块验证码的引入，使得每次验证都需要用户进行手动操作，极大地增加了黑客攻击的难度和成本。

其次，滑块验证码能够提升用户体验。相比于传统的文字或数字验证码，滑块验证码的操作更加简单直观，用户只需要通过拖动滑块即可完成验证，无需输入复杂的字符或数字。这不仅降低了用户的使用门槛，也提升了用户的操作体验。

此外，滑块验证码还具有一定的灵活性和可扩展性。淘宝等电商平台可以根据自身的安全需求和用户行为数据，动态调整滑块验证码的难度和出现频率。例如，在检测到异常登录行为或高风险操作时，平台可以要求用户进行更严格的滑块验证，以确保账户安全。

总的来说，淘宝频繁出现滑块验证码是为了保障用户账户的安全性和提升用户体验。通过引入这种交互式的验证方式，淘宝能够有效地防止自动化攻击和恶意操作，同时为用户提供更加便捷和安全的购物环境。


### 产品展示 以及 详情文档

https://c0i.cn/index.html

### 部署

docker 版本尽量高版本低版本可能会报错

cy-version/config.json 文件配置
```json
{
    "redis": {
        "host": "11.88.88.82",// redis ip地址
        "password": "a6666666",//  redis 密码
        "port": 6379,//  redis 端口
        "db": 0  //  db 数据库位置
    },
    "mysql": {
        "host": "11.88.88.82", // mysql ip地址
        "user": "cyhh",  // mysql 账号
        "password": "dsdasdasfdas", // mysql 密码
        "port": 3306,  // mysql 端口
        "db": "vghvhj"  // mysql 数据库
    },
    "QQemail": { 
        "user": "13321301@qq.com", // qq邮箱账号
        "pass": "ofrdspdasdgcadc"// qq邮箱POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务授权码
    },
    "server": {
        "port": 3000 //服务端口
    },
    "process": {
        "forks": 3 //进程数
    },
    "serverhost": "http://ciymy.com:28083", //外网访问host
    "canZuCe": 1 // 是否允许注册
}


```

配置好自己的文件后 在Dockerfile文件的同级目录下允许 `docker build -t ciyverify .` 命令打包镜像

然后创建启动容器 把docker里面的服务端口转发到28083
`docker run -p 28083:3000 -d ciyverify:latest`

然后开放28083这个端口

"serverhost": "http://你外网访问的域名" 

不能最后加"/"

"serverhost": "http://你外网访问的域名/" 这是错误的



然后注册自己的id信息

访问 `http://你外网访问的域名/test.html`

没有外网时构建镜像

把Dockerfile文件里面的
```
FROM ubuntu:22.04
替换
FROM docker.m.daocloud.io/ubuntu:22.04  # 国内可用源

```
