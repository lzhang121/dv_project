#!/bin/bash

NO=$1

# 检查参数是否为空或不是正整数
if ! [[ "$NO" =~ ^[0-9]+$ ]] || [ "$NO" -eq 0 ]; then
  echo "用法: $0 <要启动的agent数量>"
  exit 1
fi

# 可选：创建自定义 Docker 网络（如果还没有）
docker network inspect ngrinder-net >/dev/null 2>&1 || \
  docker network create ngrinder-net

# 启动多个 agent 容器
for i in $(seq 1 $NO); do
  name="agent$i"
  echo "启动 $name ..."
  docker run -d --name $name --platform linux/amd64 --link controller:controller ngrinder/agent
done

