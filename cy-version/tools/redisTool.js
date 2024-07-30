const redis = require('redis');
const config = require('../config.json');

// 创建 Redis 客户端
var client = redis.createClient({
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.password,
    db: config.redis.db,
    retry_strategy: function(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // 服务器拒绝连接
            console.error('Redis server refused the connection');
        }

        if (options.total_retry_time > 1000 * 60 * 60) {
            // 重试时间总和超过1小时
            return new Error('Retry time exhausted');
        }

        if (options.attempt > 10) {
            // 尝试次数超过10次
            return undefined;
        }

        // 重新连接的时间间隔
        return Math.min(options.attempt * 100, 3000);
    }
});

client.on('ready', function() {
    console.log('Redis is ready');
});

client.on('error', function(err) {
    console.error('Redis Error ' + err);
});

module.exports = client;
