const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cluster = require('cluster');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const { getInfo, getVersion, getConfig, verify, getVerify, putemail, inityx, verifymail } = require('./tools/apiInfo');

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    for (let i = 0; i < config.process.forks; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
        console.log('正在fork一个新的进程...');
        cluster.fork();
    });
} else {
    const app = express();

    // 自定义中间件来处理文件替换
    app.use((req, res, next) => {
      const filePath = path.join(__dirname, 'public', req.url);

      if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
          
          const fileExtension = path.extname(filePath);
        let fileContent = fs.readFileSync(filePath, 'utf8');
        const modifiedContent = fileContent.replace(/{cbbiyhh}/g, config.serverhost);
    if (fileExtension === '.html') {
        res.setHeader('Content-Type', 'text/html');
      } else if (fileExtension === '.css') {
        res.setHeader('Content-Type', 'text/css');
      }
        res.send(modifiedContent);
      } else {
        next();
      }
    });


    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    inityx(config.QQemail.user, config.QQemail.pass);

    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    app.get('/', getInfo);
    app.get('/version', getVersion);
    app.post('/getconfig', getConfig);
    app.post('/getverify', getVerify);
    app.post('/verify', verify);
    app.post('/putemail', putemail);
    app.post('/verifymail', verifymail);

    app.listen(config.server.port, () => {
        console.log(`工作进程 ${process.pid} 启动`);
    });
}
