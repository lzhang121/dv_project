
set -a
if [ "$1" = "prod" ]; then
  ENV_FILE=config/prod.env
elif [ "$1" = "stage" ]; then
    ENV_FILE=config/stage.env
elif [ "$1" = "dev" ]; then
    ENV_FILE=config/dev.env
elif [ "$1" = "qa" ]; then
    ENV_FILE=config/qa.env
else
    echo "Usage: $0 {prod|stage|dev|qa}"
    exit 1
fi
source $ENV_FILE
set +a

echo "当前环境为: $(echo $1 | tr 'a-z' 'A-Z')"

# 注册用户
# k6 run --out influxdb=http://localhost:8086/k6db scripts/register_user.js

# 展示用户
# k6 run --out influxdb=http://localhost:8086/k6db scripts/show_user.js

# 场景化压测
k6 run --out influxdb=http://localhost:8086/k6db scripts/scenarios_test.js
