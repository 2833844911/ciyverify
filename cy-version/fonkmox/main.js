// var client = require('./redislj');
var {parseTz} = require('./parseTz');
const {promisify} = require('util');

const redis = require('redis');
const config = require('../config.json');




var dataKbcs = {

}
var dataKbcsSb = {

}

var dataPz = {


}
var dataPzSb = {


}

function countStrings(list,key) {
    let idx = 0;
    let gjid = {}
    let countMap =  {}
      for (let item of list){
             countMap[item[key]+''] = (countMap[item[key]+''] || 0) + 1;
            if (!gjid[item[key]+'']){
                gjid[item[key]+''] = [];
                gjid[item[key]+''].push(idx);
            }else {
                gjid[item[key]+''].push(idx);
            }
            idx += 1;


      }

    return [countMap,gjid];
}

function getUserInt(data, ztr){
    let ipfk = []
   let s = countStrings(data, "ip")
    for (let key in s[0]){
        if (s[0][key] > ztr){
            ipfk.push(key)
        }
    }
    return {"ip":ipfk}
}


async function main() {

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

    const getAsync = promisify(client.get).bind(client);
    const getlrange = promisify(client.lrange).bind(client);
    const getexists = promisify(client.exists).bind(client);
    const setAsync = promisify(client.set).bind(client);
    const lpushAsync = promisify(client.lpush).bind(client);
    // const lpopAsync = promisify(client.lpop).bind(client);
    const delAsync = promisify(client.del).bind(client);

    var dt = await getlrange('cyredies:appid',0,-1)
    for (let appid of dt){
        let g = await getexists("cyredies:zqtz:"+appid)
        await setAsync("cyredies:zqjcpzuser:"+appid, JSON.stringify({}))



        if (g){
            // let data = await lpopAsync("cyredies:zqtz:"+appid,0,-1)
            let data = await getlrange("cyredies:zqtz:"+appid,0,-1)
            await delAsync("cyredies:zqtz:"+appid)
            let maxid = await getAsync("cyredies:maxdy:"+appid)
            let maxuserid = await getAsync("cyredies:maxuserdy:"+appid)
            //775
            for (let jk=0; jk<data.length; jk++){
                data[jk] = JSON.parse(data[jk])
            }
            let d = getUserInt(data, maxuserid);
            console.log(d, Date.now())
            await setAsync("cyredies:zqjcpzuser:"+appid, JSON.stringify(d))


            if (data.length<parseInt(maxid)){
                dataPz[appid] = {}
                if (!dataKbcs[appid]){
                    dataKbcs[appid] =1
                }else {
                    dataKbcs[appid] +=1
                    if (dataKbcs[appid] > 20){
                        dataKbcs[appid] = 0
                        await delAsync("cyredies:zqjcpz:"+appid);
                    }
                }
                // continue
            }else {
                let zxdpz = dataPz[appid]
                if (!zxdpz){
                    zxdpz = {}
                }

                let zqjcpz = {}
                if (await getexists("cyredies:zqjcpz:"+appid)){
                    zqjcpz = await getAsync("cyredies:zqjcpz:"+appid)
                    zqjcpz = JSON.parse(zqjcpz)
                }
                maxid = parseInt(maxid)
                let pz = parseTz(data,0,maxid,zxdpz)
                dataPz[appid] = zxdpz
                for (let xdf in pz){
                    if (!zqjcpz[xdf]){
                        zqjcpz[xdf] = []
                    }
                    zqjcpz[xdf] = zqjcpz[xdf].concat(pz[xdf])
                    zqjcpz[xdf] = zqjcpz[xdf].slice(zqjcpz[xdf].length-10,zqjcpz[xdf].length)
                }
                await setAsync("cyredies:zqjcpz:"+appid, JSON.stringify(zqjcpz))
                console.log(pz)
            }

        }else
        {
                dataPz[appid] = {}
                if (!dataKbcs[appid]){
                    dataKbcs[appid] =1
                }else {
                    dataKbcs[appid] +=1
                    if (dataKbcs[appid] > 20){
                        dataKbcs[appid] = 0
                        await delAsync("cyredies:zqjcpz:"+appid);
                    }
                }
        }
        // g = await getexists("cyredies:sbtz:"+appid)
        g = await getexists("cyredies:sbtz:"+appid)
        if (g){
            // let data = await lpopAsync("cyredies:sbtz:"+appid,0,-1)
            let data = await getlrange("cyredies:sbtz:"+appid,0,-1)
            await delAsync("cyredies:sbtz:"+appid)
            if (data.length<3){
                dataPzSb[appid] = {}
                if (!dataKbcsSb[appid]){
                    dataKbcsSb[appid] =1
                }else {
                    dataKbcsSb[appid] +=1
                    if (dataKbcsSb[appid] > 60){
                        dataKbcsSb[appid] = 0
                        await delAsync("cyredies:sbjcpz:"+appid);
                    }
                }
                // continue
            }else
            {
                let zxdpz = dataPzSb[appid]
                if (!zxdpz){
                    zxdpz = {}
                }
                for (let jk=0; jk<data.length; jk++){
                    data[jk] = JSON.parse(data[jk])
                }
                let zqjcpz = {}
                if (await getexists("cyredies:sbjcpz:"+appid)){
                    zqjcpz = await getAsync("cyredies:sbjcpz:"+appid)
                    zqjcpz = JSON.parse(zqjcpz)
                }
                let pz = parseTz(data,1,7,zxdpz)
                dataPzSb[appid] = zxdpz
                for (let xdf in pz){
                    if (!zqjcpz[xdf]){
                        zqjcpz[xdf] = []
                    }
                    zqjcpz[xdf] = zqjcpz[xdf].concat(pz[xdf])
                    zqjcpz[xdf] = zqjcpz[xdf].slice(zqjcpz[xdf].length-10,zqjcpz[xdf].length)
                }
                await setAsync("cyredies:sbjcpz:"+appid, JSON.stringify(zqjcpz))
                console.log(pz)
            }

        }else
        {
            dataPzSb[appid] = {}
            if (!dataKbcsSb[appid]){
                dataKbcsSb[appid] =1
            }else {
                dataKbcsSb[appid] +=1
                if (dataKbcsSb[appid] > 60){
                    dataKbcsSb[appid] = 0
                    await delAsync("cyredies:sbjcpz:"+appid);
                }
            }
        }
    }
    // console.log(dt)
    console.log("检测结束")
    client.quit();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function loop() {
    while (true) {
        console.log("启动检测");
        await main();
        await sleep(3000); // 等待 3000 毫秒（3秒）
    }
}

loop(); // 调用循环函数