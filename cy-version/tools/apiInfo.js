// 设置静态文件目录
var client = require('./redisTool');
var {checkAndInsertUser,checkTableExists} = require('./mysqlTool');
var {jiemhans} = require('./jiem');
var {jiaoGj} = require('./gjverify');
var {parsedata} = require('../verify/1.0.1/jiaoyan');
var config = require('../config.json');
const {promisify} = require('util');
const nodemailer = require('nodemailer');

checkTableExists();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const lpushAsync = promisify(client.lpush).bind(client);

const delAsync = promisify(client.del).bind(client);

async function getAndDelete(key) {
    try {
        // 获取键的值
        const value = await getAsync(key);
        // 删除这个键
        await delAsync(key);
        // 返回获取到的值
        return value;
    } catch (error) {
        console.error('Redis getAndDelete error:', error);
        throw error; // 或处理错误
    }
}
var  transporter = '';
var mailOptions = {
        from: '@qq.com', // 发件人

    };

// 包含认证信息的HTTP代理服务器配置
const proxyUrl = config.proxyUrl;

// 创建代理代理
function inityx(user, pass){

    // 创建发送邮件的对象
     transporter= nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465, // QQ 邮箱SMTP服务器的端口号
        secure: true, // true for 465, false for other ports
        auth: {
            user: user, // 您的 QQ 邮箱地址
            pass: pass, // QQ 邮箱的第三方应用密码
        },

          // proxy: proxyUrl // 使用HTTPS代理
    });
     mailOptions.from =user


}
function putyx(who,code){
    let bh = {
        from: mailOptions.from, // 发件人
        to: "@qq.com", // 收件人，可以是 QQ 邮箱或其他邮箱
        subject: "ciyverify注册验证码", // 主题
        text: "Code:56789,5分钟有效", // 纯文本正文
        html: "<b>Code:56789,5分钟有效</b>", // HTML正文
    }
    bh.to = who;
    bh.text = "Code:"+code+",5分钟有效";
    bh.html = "<b>Code:"+code+",5分钟有效</b>";

    // 发送邮件
    transporter.sendMail(bh, (error, info) => {
        if (error) {
            console.log("------------------")
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}
// inityx("340795901@qq.com", "ofrmfgpgyppgcadc")
// putyx("2833844911@qq.com","dsdds")
function putkey(who,appid,key){
    let bh = {
        from: mailOptions.from, // 发件人
        to: "@qq.com", // 收件人，可以是 QQ 邮箱或其他邮箱
        subject: "ciyverify注册成功信息", // 主题
        text: "", // 纯文本正文
        html: "", // HTML正文
    }
    bh.to = who;
    bh.text = "ciyverify用户的appid:"+appid+",key:"+key;
    bh.html = "<b>ciyverify用户的appid:"+appid+",key:"+key+"</b>";

    // 发送邮件
    transporter.sendMail(bh, (error, info) => {
        if (error) {
            console.log('----------------------')
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getCode(length) {
    var result = '';
    var characters = '0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


async function getInfo(req, res) {
    console.log(req.query, "dddddddddddddddd");
    console.log(res.data);
    console.log(process.pid);
    res.send('');
}

// 获取版本的接口
async function getVersion(req, res) {
    // redis 获取版本号
    // const value2 = await getAsync('jscyversion');
    const value2 = "1.0.1"
    console.log("版本", value2);
    // 获取请求的IP地址
    let ip = req.ip;

    // 如果使用了代理（如Nginx），尝试从x-forwarded-for头获取原始IP地址
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(',')[0];
    }
    ip = ip.replace(/:/g, '')
    console.log(ip)

    await setAsync("cyredies:canuseIpinfo:"+ip, '1', 'EX',60 * 60)


    res.send(value2);

}


// 获取版本的接口
async function getConfig(req, res) {
    // redis 获取版本号
    // 获取POST请求的数据
    const postData = req.body;
    // console.log(postData)

    // redis 根据appid获取配置
    var screen = postData.screen

    var biaoq = generateRandomString(parseInt(15+ Math.random() * 10))
    var config = {a1: biaoq}
    // redisZd[screen] = postData.appid + ''
    await setAsync("cyredies:redisZd:"+screen, postData.appid + '', 'EX',6 * 60)
    // redisbq[screen] = biaoq
    await setAsync("cyredies:redisbq:"+screen, biaoq + '', 'EX',6 * 60)

    // console.log(redisZd)

    // console.log(config); // 打印POST请求的数据

    res.send(JSON.stringify(config));

}

async function putemail(req, res){

    if (config.canZuCe != 1){
        return
    }
    try{
        const postData = req.body;
        var email = postData.email;

        let appid2 = "GJHCIOBHKJSMCLZX";
        let key2 = "fhagkjfjadfklasoijklo";
        let tk = postData.tk;
        var h = await getAsync("cyredies:canuse:"+appid2+':'+key2+':'+tk);
        if (h+'' !== '1'){
            res.send({"code": 0,"msg":"环境校验失败请重新校验"})
            return
        }
        await delAsync("cyredies:canuse:"+appid2+':'+key2+':'+tk)
        await setAsync("cyredies:canuse2:"+appid2+':'+key2+':'+tk, '1', 'EX',6 * 60)

        let jccode = getCode(5);
        putyx(email, jccode)
        let zcode = await getAsync('cyredies:email:'+email.replace(/:/g,'?'));
        if (zcode){
            res.send({"code": 0})
            return
        }

        await setAsync("cyredies:email:"+email.replace(/:/g,'?'), ''+jccode, 'EX',6 * 60);
        res.send({"code": 1})
    }catch (e) {
        console.log(e)
        res.send({"code": 0,"msg":"环境校验失败请重新校验!"})
    }

}


async function verifymail(req, res){
    if (config.canZuCe != 1){
        return
    }
    try{
        const postData = req.body;
        let code = postData.code;
        let email = postData.email;
        let zcode = await getAsync('cyredies:email:'+email.replace(/:/g,'?'));
        if (zcode !== code+''){
            res.send({"code": 0,"msg":"验证码错误刷新后重新申请"})
            return
        }
        let appid2 = "GJHCIOBHKJSMCLZX";
        let key2 = "fhagkjfjadfklasoijklo";
        let tk = postData.tk;
        var h = await getAsync("cyredies:canuse2:"+appid2+':'+key2+':'+tk);
        if (h+'' !== '1'){
            res.send({"code": 0,"msg":"环境校验失败请重新校验"})
            return
        }
        await delAsync("cyredies:canuse2:"+appid2+':'+key2+':'+tk)
        let maxdy;
        if (!postData.maxdy){
             maxdy= 1000
        }
        else {maxdy = parseInt(postData.maxdy);}

        let maxuserdy;
        if (!postData.maxuserdy){
             maxuserdy= 100
        }
        else {
            maxuserdy = parseInt(postData.maxuserdy);
        }
        if (maxuserdy == 0){
            maxuserdy = 3
        }

        var appid =generateRandomString(16)
        var key =generateRandomString(21)
        let sfcg = await checkAndInsertUser(email, appid, key, maxdy,maxuserdy)
        console.log(sfcg,email, appid, key, maxdy)
        if (sfcg == 0){
            res.send({"code":1, "msg":"注册出现异常，联系qq：2833844911或者微信：17130449483"})

        }else if (sfcg == 1){
            await setAsync("cyredies:appandkey:"+appid, key)
            await lpushAsync("cyredies:appid", appid)
            await setAsync("cyredies:maxdy:"+appid, maxdy+'')
            await setAsync("cyredies:maxuserdy:"+appid, maxuserdy+'')
            putkey(email, appid, key)
            res.send({"code":2, "msg":"新用户注册成功，appid可key会发送到邮箱"})

        }else if (sfcg == 2){
            await setAsync("cyredies:maxdy:"+appid, maxdy+'')
            await setAsync("cyredies:maxuserdy:"+appid, maxuserdy+'')
            res.send({"code":3, "msg":"配置修改成功"})
        }
    }catch (e) {
        console.log(e)
        res.send({"code": 0,"msg":"环境校验失败请重新校验!"})
    }





}


function jioayantz(yuansp, fengj){
    for (let key in fengj){
        if (key === 'webglusertime'){
            for (let zzdz of fengj[key]){
                if (Math.abs(yuansp['webglusertime'] - parseInt(zzdz)) < 1500){
                    return true
                }
            }
        }
        else if (key === 'jcNiframeTime'){
            for (let zzdz of fengj[key]){
                if (Math.abs(yuansp['jcNiframeTime'] - parseInt(zzdz)) < 200){
                    return true
                }
            }
        }
        else if (key === 'jcusedJSHeapSize'){
            for (let zzdz of fengj[key]){
                if (Math.abs(yuansp['jcNiframeTime'] - parseInt(zzdz)) < 416800){
                    return true
                }
            }
        }else if (key === 'jcllqkgzw2'){
            for (let zzdz of fengj[key]){
                if (yuansp['llqkgzw'][2]+'' === ''+ zzdz){
                    return true
                }
            }
        }else if (key === 'jcllqkgzw3'){
            for (let zzdz of fengj[key]){
                if (yuansp['llqkgzw'][3]+'' === ''+ zzdz){
                    return true
                }
            }
        }else if (key === 'llqkgzw4'){
            for (let zzdz of fengj[key]){
                if (yuansp['llqkgzw'][4]+'' === ''+ zzdz){
                    return true
                }
            }
        }else if (key === 'llqkgzw5'){
            for (let zzdz of fengj[key]){
                if (yuansp['llqkgzw'][5]+'' === ''+ zzdz){
                    return true
                }
            }
        }else{
            for (let zzdz of fengj[key]){
                if (yuansp[key]+'' === zzdz+''){
                    return true
                }
            }
        }

    }
    return false
}


var sycgxsj = {}
var sycgxsjda = {}
var sycgxsjbd = {}
var sycgxsjdabd = {}
var zqqqd = {}
var isfkz = 0
async function verify(req, res){


    try{
        const postData = req.body;
        var cinfo = req.headers.c;
        var yinfo = req.headers.y;
        var sinfo = req.headers.s;
        var a1info = req.headers.a;
        var ginfo = req.headers.g; // 窗口信息和解密
        var t2info = req.headers.i; // 轨迹开始滑动的时间
        var tinfo = req.headers.t;
        var ua = req.headers['user-agent']
        console.log("s:",sinfo)
        let bad = await getAsync('cyredies:buxdseen:'+a1info);
        // console.log(bad)
        if (bad){
            res.send({code: 1});
            return
        }

        // let appid = redisZd[sinfo]
        let appid = await getAndDelete('cyredies:redisZd:'+sinfo);
        // let biaoq = redisbq[sinfo]
        let biaoq = await getAndDelete('cyredies:redisbq:'+sinfo);
        // console.log(biaoq, 'cyredies:redisbq:'+sinfo)
        var jImage = [cinfo, yinfo,sinfo,appid]

        // console.log(postData.s)
        var jiem = jiemhans(postData.s, jImage,sinfo,tinfo,appid,ginfo,t2info); // 解密信息
        // let jo = +new Date - t2info
        // if ( jo<0 || jo > 300000){ // 判断超时
        //     res.send({code: 1});
        //     return
        // }


        var infoJy = parsedata(jiem[0], sinfo, jiem[2],jiem[3], tinfo, biaoq); // 解析信息
        if (infoJy[0] == 1){
            res.send({"code": 0});
            return
        }

                    // 获取请求的IP地址
        let ip = req.ip;
        // console.log(ip)
        // 如果使用了代理（如Nginx），尝试从x-forwarded-for头获取原始IP地址
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(',')[0];
        }
        // console.log(ip)
        ip = ip.replace(/:/g, '')
        console.log(ip)
        var haveip = await getAsync('cyredies:canuseIpinfo:'+ip);
        infoJy[2].ip = haveip
        let cangj = 2;
        function jiandjiaoy(gjsz,kd){
            let izokk = 0
            let zhkd =10000
            let zhwz = 0
            for (let i of gjsz){
                if (i[2] == 0){
                    izokk += 1
                    zhkd = i[0]
                }
                zhwz = i[0]
            }
            let jsjl = Math.abs(zhwz - zhkd - kd )
            if (jsjl > 160){
                return false
            }
            return true
        }
        if (infoJy[2].hkwidth > 0){
            var jcgj =jiandjiaoy(infoJy[2].move,infoJy[2].hkwidth)
            // console.log("轨迹校验", jcgj)
            if (!jcgj){
                res.send({"code": 0});
                return
            }
            cangj = 1
        }

        infoJy[2].ip = ip
        infoJy[2]['headerua'] = ua;


        if (infoJy[1] == 1 || !haveip){
            console.log("====>bad")
            if (!sycgxsjbd[appid] ){
                let da = await getAsync("cyredies:sbjcpz:"+appid);
                if (da){
                    sycgxsjdabd[appid] = JSON.parse(da)
                }else {
                    sycgxsjdabd[appid] = {}
                }
                sycgxsjbd[appid]= Date.now()
            }

            if (Date.now() - sycgxsjbd[appid] >  60 * 1 * 1000 ){
                let da = await getAsync("cyredies:sbjcpz:"+appid);
                if (da){
                    sycgxsjdabd[appid] = JSON.parse(da)
                }else {
                    sycgxsjdabd[appid] =  {'newtime':Date.now()}
                }
                sycgxsjbd[appid]= Date.now()
            }
             if (infoJy[2].move.length != 0){
                let vgg = infoJy[2].move[3] +infoJy[2].requestTime
                if (!sycgxsjdabd[appid]['newtime']){
                    sycgxsjdabd[appid]['newtime'] = vgg
                }else {
                    if (Math.abs(vgg - sycgxsjdabd[appid]['newtime']) > 1000){
                        res.send({"code": 0});
                        return
                    }
                    sycgxsjdabd[appid]['newtime'] = vgg
                }

            }
            // 根据特征校验
            if (infoJy[2].move.length != 0){
                var jcgj = jiaoGj(infoJy[2].move, ua) // 检测轨迹
                console.log("轨迹校验", jcgj)
                if (!jcgj){
                    res.send({"code": 0});
                    return
                }
                cangj = 1
            }
            if (jioayantz(infoJy[2],sycgxsjdabd[appid])){
                console.log("异常被风控")
                res.send({"code": 0});
                return
            }else {
                client.lpush("cyredies:sbtz:"+appid, JSON.stringify(infoJy[2]), function(err, reply) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log("LPUSH reply:", reply); // 输出列表的长度
                    }
                });
            }
        }else {
            if (!sycgxsj[appid]){
                let da = await getAsync("cyredies:zqjcpz:"+appid);
                let daee = await getAsync("cyredies:zqjcpzuser:"+appid);
                if (daee){
                    zqqqd[appid] = JSON.parse(daee)
                }else {
                    zqqqd[appid] = {}
                }


                if (da){
                    sycgxsjda[appid] = JSON.parse(da)
                }else {
                    sycgxsjda[appid] = {}
                }
                sycgxsj[appid] = Date.now();
            }
            if ( Date.now() - sycgxsj[appid] >  60 * 1 * 1000 ){
                let da = await getAsync("cyredies:zqjcpz:"+appid);
                let daee = await getAsync("cyredies:zqjcpzuser:"+appid);
                if (daee){
                    zqqqd[appid] = JSON.parse(daee)
                }else {
                    zqqqd[appid] = {}
                }
                if (da){
                    sycgxsjda[appid] = JSON.parse(da)
                    isfkz = 1
                }else {

                    sycgxsjda[appid] = {'newtime':Date.now()}
                    isfkz =0
                }
                sycgxsj[appid] = Date.now();
            }

            if (infoJy[2].move.length != 0){
                let vgg = infoJy[2].move[3] +infoJy[2].requestTime
                if (!sycgxsjda[appid]['newtime']){
                    sycgxsjda[appid]['newtime'] = vgg
                }else {
                    if (Math.abs(vgg - sycgxsjda[appid]['newtime']) > 1500){
                        res.send({"code": 0});
                        return
                    }
                    sycgxsjda[appid]['newtime'] = vgg

                }

            }


            if (infoJy[2].move.length != 0 && isfkz == 1){
                var jcgj = jiaoGj(infoJy[2].move, ua) // 检测轨迹
                console.log("轨迹校验", jcgj)
                if (!jcgj){
                    res.send({"code": 0});
                    return
                }
                cangj = 1
            }
            // console.log(infoJy[2])
            console.log('===================')
            infoJy[2].appid = appid
            console.log(infoJy[2])

            if (jioayantz(infoJy[2],sycgxsjda[appid]) || jioayantz(infoJy[2],zqqqd[appid]) ){
                console.log("正常被风控")
                res.send({"code": 0});
                return
            }else
            {
                client.lpush("cyredies:zqtz:"+appid, JSON.stringify(infoJy[2]), function(err, reply) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log("LPUSH reply:", reply); // 输出列表的长度
                    }
                });
            }
        }
        // code 1  时间超时
        // code 0  验证失败
        // console.log(infoJy)
        var ko = generateRandomString(32);
        // await setAsync("cyredies:appandkey:"+appid, 'fhagkjfjadfklasoijklo')
        var key = await getAsync("cyredies:appandkey:"+appid);
        await setAsync("cyredies:canuse:"+appid+':'+ key+':'+ko, ''+cangj, 'EX',6 * 60);
        await setAsync("cyredies:buxdseen:"+a1info, '1', 'EX',60 * 60)
        console.log("成功")
        res.send({"code": 200, "tk": ko});
    }catch (e) {
        res.send({"code": 0});
    }
}
async function getVerify(req, res){
     const postData = req.body;
     var appid = postData.appid;
     var key = postData.key;
     var ko = postData.tk;
    // var key = await getAsync("cyredies:appandkey:"+appid);
    var h = await getAsync("cyredies:canuse:"+appid+':'+key+':'+ko);
    res.send({"data": h});
}


module.exports = {
    getInfo,
    getVersion,
    getConfig,
    verify,
    getVerify,
    inityx,
    putemail,
    verifymail
};



