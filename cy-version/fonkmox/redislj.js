const redis = require('redis');
const config = require('../config.json');

// 创建 Redis 客户端
var client = redis.createClient( config.redis.port, config.redis.host, {
    auth_pass: config.redis.password,
    db: config.redis.db,
})
client.on('ready', function () {
    console.log('Redis is ready')
})
client.on('error', function (err) {
    console.error('Redis Error ' + err)
})

module.exports = client;