import csv
import time
from influxdb import InfluxDBClient

# 连接 InfluxDB
client = InfluxDBClient(host='localhost', port=8086)
client.switch_database('jmeter')

# 读取 jtl 文件
with open('results.jtl', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        json_body = [
            {
                "measurement": "jmeter",
                "tags": {
                    "label": row['label'],
                    "responseCode": row['responseCode']
                },
                "time": int(row['timeStamp']) * 1000000,  # 毫秒 → 纳秒
                "fields": {
                    "elapsed": int(row['elapsed']),
                    "latency": int(row.get('Latency', 0)),
                    "success": 1 if row['success'] == 'true' else 0,
                    "bytes": int(row.get('bytes', 0)),
                    "threads": int(row.get('allThreads', 1))
                }
            }
        ]
        client.write_points(json_body)
