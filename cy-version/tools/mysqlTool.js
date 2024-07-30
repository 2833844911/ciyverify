const mysql = require('mysql2/promise');
const config = require('../config.json');
// 定义一个异步函数，用于检查并插入用户
async function checkAndInsertUser(user,appid, key , maxdy,maxuserNum) {
  try {
    // 使用配置创建数据库连接
    const connection = await mysql.createConnection({
      port: config.mysql.port,
      host: config.mysql.host,  // 数据库地址
      user: config.mysql.user,       // 数据库用户
      password: config.mysql.password,  // 数据库密码
      database: config.mysql.db   // 数据库名
    });

    console.log("连接成功");
    var off = 0
    // 查询cyvety表中是否存在特定的用户
    const [rows] = await connection.query('SELECT * FROM ciyverifyusers WHERE user = ?', [user]);

    if (rows.length === 0) {
      // 如果用户不存在，则插入新用户
      await connection.query('INSERT INTO ciyverifyusers (`user`, `appid`, `key`, `maxDy`, `maxuserNum`) VALUES (?, ?, ?, ?, ?)', [user, appid, key, parseInt(maxdy), parseInt(maxuserNum)]);
      // console.log('新记录插入成功');
      off = 1;
    } else {
        await connection.query('UPDATE ciyverifyusers SET maxDy = ? WHERE user = ?', [parseInt(maxdy), user]);
        await connection.query('UPDATE ciyverifyusers SET maxuserNum = ? WHERE user = ?', [parseInt(maxuserNum), user]);
        off = 2
    }

    // 关闭数据库连接
    await connection.end();
    return off
  } catch (error) {
    console.error('发生错误:', error);
    return 0;
  }
}


async function checkTableExists() {
  const connection = await mysql.createConnection({
    port: config.mysql.port,
      host: config.mysql.host,  // 数据库地址
      user: config.mysql.user,       // 数据库用户
      password: config.mysql.password,  // 数据库密码
      database: config.mysql.db   // 数据库名
  });

  const tableName = 'ciyverifyusers';

  const query = `
    SELECT COUNT(*)
    AS tableExists
    FROM information_schema.tables
    WHERE table_schema = ?
    AND table_name = ?`;

  try {
    const [results] = await connection.execute(query, [connection.config.database, tableName]);
    if (results[0].tableExists > 0) {
      console.log(`Table ${tableName} exists.`);
    } else {
      console.log(`Table ${tableName} does not exist.`);
      var query2 = `CREATE TABLE \`${tableName}\` (
  \`user\` varchar(100) NOT NULL COMMENT '用户邮箱',
  \`appid\` varchar(100) NOT NULL COMMENT 'appid',
  \`key\` varchar(100) NOT NULL COMMENT 'key',
  \`maxDy\` int(11) NOT NULL COMMENT '3分钟最大调用量',
  \`addDate\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  \`upDate\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  \`maxuserNum\` int(100) NOT NULL COMMENT '单用户使用最大频率',
  PRIMARY KEY (\`user\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
      const [results] = await connection.execute(query2, [connection.config.database, tableName]);

    }
  } catch (error) {
    console.error('Error checking table existence:', error);
  } finally {
    await connection.end();
  }
}


// 关闭数据库连接
// checkAndInsertUser();
module.exports = {
    checkAndInsertUser,
  checkTableExists
};
