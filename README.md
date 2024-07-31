

# ciyverify 启动文档

产品展示 

https://c0i.cn/index.html

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
