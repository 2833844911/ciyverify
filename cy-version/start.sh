#!/bin/bash

# 切换到指定目录
cd /usr/local/bin/cy-version/fonkmox
chmod 777 ../node
# 运行命令
../node main.js &
../node initredis.js &

# 切换到应用目录
cd /usr/local/bin/cy-version

# 运行应用
./node app.js
