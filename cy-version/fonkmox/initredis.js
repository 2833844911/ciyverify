const mysql = require('mysql2/promise');
const config = require('../config.json');
var client = require('./redislj');
const {promisify} = require('util');


const getAsync = promisify(client.get).bind(client);
const getlrange = promisify(client.lrange).bind(client);
const getexists = promisify(client.exists).bind(client);
const setAsync = promisify(client.set).bind(client);
const lpushAsync = promisify(client.lpush).bind(client);
const lpopAsync = promisify(client.lpop).bind(client);

const delAsync = promisify(client.del).bind(client);

global.offr = 1
// 定义一个异步函数，用于检查并插入用户
async function checkAndInsertUser(user,appid, key , maxdy) {
  try {
    // 使用配置创建数据库连接
    const connection = await mysql.createConnection({
      port: config.mysql.port,
      host: config.mysql.host,  // 数据库地址
      user: config.mysql.user,       // 数据库用户
      password: config.mysql.password,  // 数据库密码
      database: config.mysql.db   // 数据库名
    });
    await setAsync('jscyversion','1.0.1')
    console.log("连接成功");
    var off = 0
    // 查询cyvety表中是否存在特定的用户
    const [rows] = await connection.query('SELECT * FROM ciyverifyusers');

    for (let v of rows){
        console.log(v)
        await setAsync("cyredies:appandkey:"+v.appid, v.key)
        await setAsync('cyredies:maxdy:'+v.appid,v.maxDy+'')
        await setAsync('cyredies:maxuserdy:'+v.appid,v.maxuserNum+'')
        if (global.offr == 1){
            await lpushAsync('cyredies:appid',v.appid+'')
        }


    }
    global.offr = 0
    // 关闭数据库连接
    await connection.end();
    return off
  } catch (error) {
    console.error('发生错误:', error);
    return 0;
  }
}
setTimeout(()=>{
    checkAndInsertUser()
})

setInterval(()=>{
    checkAndInsertUser()
}, 1000 * 60)