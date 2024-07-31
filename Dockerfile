FROM ubuntu:22.04

#FROM docker.m.daocloud.io/ubuntu:22.04  # 国内可用源

COPY ./cy-version /usr/local/bin/cy-version

RUN chmod +x /usr/local/bin/cy-version/start.sh

# 设置工作目录
WORKDIR /usr/local/bin/cy-version

# 运行启动脚本
CMD ["./start.sh"]