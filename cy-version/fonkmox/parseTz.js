var fkdid = []
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
function jiexip(data, gl){
    let allInfo = data.length;
    let fkip = []
    let ds=0
    var dt = countStrings(data,'ip');
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}
function jiexGpurenderer(data, gl){
    let allInfo = data.length;
    let fkip = []
    let ds=0
    var dt = countStrings(data,'Gpurenderer');
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}
function jiexwebgl(data, gl){
    let allInfo = data.length;
    let fkip = []
    let ds=0
    var dt = countStrings(data,'webgl');
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}
function jiexcanvas(data, gl){
    let allInfo = data.length;
    let fkip = []
    let ds=0
    var dt = countStrings(data,'canvaszw');
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}
function jiexaudio(data, gl){
    let allInfo = data.length;
    let fkip = []
    let ds=0
    var dt = countStrings(data,'audio');
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}

function countNs(list,key,ixget) {
    let idx = 0;
    let gjid = {}
    let countMap =  {}
      for (let item of list){
             countMap[item[key][ixget]+''] = (countMap[item[key][ixget]+''] || 0) + 1;
            if (!gjid[item[key][ixget]+'']){
                gjid[item[key][ixget]+''] = [];
                gjid[item[key][ixget]+''].push(idx);
            }else {
                gjid[item[key][ixget]+''].push(idx);
            }
            idx += 1;


      }

    return [countMap,gjid];
}

function jiexllqkgzw(data, gl,idget){
    let allInfo = data.length;
    let fkip = []
    let ds=0
    var dt = countNs(data,'llqkgzw',idget);
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}
function countNsfw(list,key,ixget,fw) {
    ixget = parseInt(ixget)
    let idx = 0;
    let gjid = {}
    let countMap =  {}
    countMap[ixget+''] = 0;
      for (let item of list){
            if (Math.abs(item[key] - ixget) < fw){
                countMap[ixget+''] += 1
            }

            if (!gjid[ixget+'']){
                gjid[ixget+''] = [];
                gjid[ixget+''].push(idx);
            }else {
                gjid[ixget+''].push(idx);
            }
            idx += 1;
      }

    return [countMap,gjid];
}

function jiexwebglusertime(data, gl){
    let allInfo = data.length;
    let zg = 0

    for (let hi of data){
        zg += hi.webglusertime
    }
    let zws = zg/allInfo

    let fkip = []
    let ds=0
    var dt = countNsfw(data,'webglusertime',zws,1500);
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}

function jiexjcNiframeTime(data, gl){
    let allInfo = data.length;
    let zg = 0

    for (let hi of data){
        zg += hi.jcNiframeTime
    }
    let zws = zg/allInfo

    let fkip = []
    let ds=0
    var dt = countNsfw(data,'jcNiframeTime',zws, 200);
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}

function jiexusedJSHeapSize(data, gl){
    let allInfo = data.length;
    let zg = 0

    for (let hi of data){
        zg += hi.usedJSHeapSize
    }
    let zws = zg/allInfo

    let fkip = []
    let ds=0
    var dt = countNsfw(data,'usedJSHeapSize',zws, 416800);
    var idinfo = dt[1]
    dt = dt[0]
    for (let i in dt){
        if (dt[i]/allInfo > gl){
            let cs = 0
            for (let jio of idinfo[i] ){
                if (fkdid.indexOf(jio) == -1){
                    cs+=1
                    fkdid.push(jio)
                }
            }
            ds += cs
            fkip.push( i)
        }
    }
    return [fkip,ds]


}


function parseTz(data,bad, zcfw, jcgd){
    fkdid = []
    let shujl = data.length

    let zwfk = {}

    // --------------------IP--------------------
    var bfb = 40/100
    if (bad == 1){
        bfb = 10/100
    }
    var jcip = jiexip(data,bfb) //获取风控的ip
    let fkl = jcip[1]
    jcip =jcip[0]
    if (jcip.length != 0){
        zwfk['ip'] = jcip
    }
    if (!jcgd['ip']){
        jcgd['ip'] = jcip

        if (shujl-fkl < zcfw*0.9){ // 风控if发现流量回归正常就返回风控
            return zwfk
        }

    }else {
        jcgd['ip'] = jcgd['ip'].concat(jcip)
    }

    // ------------------canvas------------------
    bfb = 20/100
    if (bad == 1){
        bfb = 10/100
    }
    var jccanvaszw = jiexcanvas(data,bfb) //获取风控的ip
    fkl += jccanvaszw[1]
    jccanvaszw =jccanvaszw[0]
    if (jccanvaszw.length != 0){
        zwfk['canvaszw'] = jccanvaszw
    }
    if (!jcgd['canvaszw']) {
        jcgd['canvaszw'] = jccanvaszw
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['canvaszw'] = jcgd['canvaszw'].concat(jccanvaszw)
    }

    // ---------------webgl---------------
    bfb = 20/100
    if (bad == 1){
        bfb = 10/100
    }
    var jcwebgl = jiexwebgl(data,bfb) //获取风控的ip
    fkl += jcwebgl[1]
    jcwebgl =jcwebgl[0]
    if (jcwebgl.length != 0){
        zwfk['webgl'] = jcwebgl
    }
    if (!jcgd['webgl']) {
        jcgd['webgl'] = jcwebgl
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['webgl'] = jcgd['webgl'].concat(jcwebgl)
    }

    // ---------------audio---------------
    bfb = 20/100
    if (bad == 1){
        bfb = 10/100
    }
    var jcaudio = jiexaudio(data,bfb) //获取风控的ip
    fkl += jcaudio[1]
    jcaudio =jcaudio[0]
    if (jcaudio.length != 0){
        zwfk['audio'] = jcaudio
    }
    if (!jcgd['audio']) {
        jcgd['audio'] = jcaudio
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['audio'] = jcgd['audio'].concat(jcaudio)
    }


    // ---------------llqkgzw2---------------
    bfb = 20/100
    if (bad == 1){
        bfb = 10/100
    }
    var jcllqkgzw2 = jiexllqkgzw(data,bfb,2) //获取风控的ip
    fkl += jcllqkgzw2[1]
    jcllqkgzw2 =jcllqkgzw2[0]
    if (jcllqkgzw2.length != 0){
        zwfk['jcllqkgzw2'] = jcllqkgzw2
    }
    if (!jcgd['jcllqkgzw2']) {
        jcgd['jcllqkgzw2'] = jcllqkgzw2
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['jcllqkgzw2'] = jcgd['jcllqkgzw2'].concat(jcllqkgzw2)
    }


    // ---------------llqkgzw3---------------
    bfb = 20/100
    if (bad == 1){
        bfb = 10/100
    }
    var jcllqkgzw3 = jiexllqkgzw(data,bfb,3) //获取风控的ip
    fkl += jcllqkgzw3[1]
    jcllqkgzw3 =jcllqkgzw3[0]
    if (jcllqkgzw3.length != 0){
        zwfk['jcllqkgzw3'] = jcllqkgzw3
    }
    if (!jcgd['jcllqkgzw3']) {
        jcgd['jcllqkgzw3'] = jcllqkgzw3
    }else {
        jcgd['jcllqkgzw3'] = jcgd['jcllqkgzw3'].concat(jcllqkgzw3)
    }
    if (bad != 1){ // 正常浏览器用户返回
        return zwfk
    }

    // ------------嫌疑请求-----------------------
    bfb = 10/100
    // ---------------llqkgzw4---------------
    var jcllqkgzw4 = jiexllqkgzw(data,bfb,4) //获取风控的ip
    fkl += jcllqkgzw4[1]
    jcllqkgzw4 =jcllqkgzw4[0]
    if (jcllqkgzw4.length != 0){
        zwfk['llqkgzw4'] = jcllqkgzw4
    }
    if (!jcgd['llqkgzw4']) {
        jcgd['llqkgzw4'] = jcllqkgzw4
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['llqkgzw4'] = jcgd['llqkgzw4'].concat(jcllqkgzw4)
    }
    // ---------------llqkgzw5---------------
    var jcllqkgzw5 = jiexllqkgzw(data,bfb,5) //获取风控的ip
    fkl += jcllqkgzw5[1]
    jcllqkgzw5 =jcllqkgzw5[0]
    if (jcllqkgzw5.length != 0){
        zwfk['llqkgzw5'] = jcllqkgzw5
    }
    if (!jcgd['llqkgzw5']) {
         jcgd['llqkgzw5'] = jcllqkgzw5
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['llqkgzw5'] = jcgd['llqkgzw5'].concat(jcllqkgzw5)
    }
    // ---------------webglusertime-------------------
    var jcwebglusertime = jiexwebglusertime(data,bfb) //获取风控的ip
    fkl += jcwebglusertime[1]
    jcwebglusertime =jcwebglusertime[0]
    if (jcwebglusertime.length != 0){
        zwfk['webglusertime'] = jcwebglusertime
    }
    if (!jcgd['webglusertime']) {
        jcgd['webglusertime'] = jcwebglusertime
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['webglusertime'] = jcgd['webglusertime'].concat(jcwebglusertime)
    }

    // ---------------jcNiframeTime-------------------
    var jcjcNiframeTime = jiexjcNiframeTime(data,bfb) //获取风控的ip
    fkl += jcjcNiframeTime[1]
    jcjcNiframeTime =jcjcNiframeTime[0]
    if (jcjcNiframeTime.length != 0){
        zwfk['jcNiframeTime'] = jcjcNiframeTime
    }
    if (!jcgd['jcNiframeTime']) {
        jcgd['jcNiframeTime'] = jcjcNiframeTime
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['jcNiframeTime'] = jcgd['jcNiframeTime'].concat(jcjcNiframeTime)
    }


    // ---------------usedJSHeapSize-------------------
    var jcusedJSHeapSize = jiexusedJSHeapSize(data,bfb) //获取风控的ip
    fkl += jcusedJSHeapSize[1]
    jcusedJSHeapSize =jcusedJSHeapSize[0]
    if (jcusedJSHeapSize.length != 0){
        zwfk['jcusedJSHeapSize'] = jcusedJSHeapSize
    }
    if (!jcgd['jcusedJSHeapSize']) {
        jcgd['jcusedJSHeapSize'] = jcusedJSHeapSize
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['jcusedJSHeapSize'] = jcgd['jcusedJSHeapSize'].concat(jcusedJSHeapSize)
    }

   // ------------------Gpurenderer------------------
    bfb = 40/100
    if (bad == 1){
        bfb = 10/100
    }
    var jcGpurenderer = jiexGpurenderer(data,bfb) //获取风控的ip
    fkl += jcGpurenderer[1]
    jcGpurenderer =jcGpurenderer[0]
    if (jcGpurenderer.length != 0){
        zwfk['Gpurenderer'] = jcGpurenderer
    }
    if (!jcgd['Gpurenderer']) {
        jcgd['Gpurenderer'] = jcGpurenderer
        if (shujl - fkl < zcfw * 0.9) { // 风控if发现流量回归正常就返回风控
            return zwfk
        }
    }else {
        jcgd['Gpurenderer'] = jcgd['Gpurenderer'].concat(jcGpurenderer)
    }
    return zwfk







}

module.exports = {
    parseTz
};


// d = {
//     "readyState": "complete",
//     "diaoycis": 1,
//     "wrtcInfo": "candidate:1734312414 1 udp 2113937151 3d552c9e-e3e1-461f-bee3-a073caa76920.local 62601 typ host generation 0 ufrag 3D+h network-cost 999",
//     "webglusertime": 11000,
//     "readyState2": "complete",
//     "timeOfJiaz": 0.19999998807907104,
//     "aBaseURI": "http://127.0.0.1:300",
//     "scrollY": 0,
//     "scrollX": 0,
//     "platform": "Win32",
//     "documentallLength": 31,
//     "jcNiframeTime": 464.80000001192093,
//     "functionLength": 252,
//     "iframeNa": "98-16-3-176-154",
//     "requestTime": 1709901980098,
//     "UA": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
//     "dzmax": 11428,
//     "href": "http://127.0.0.1:3000/test.html",
//     "canvas": ["e3001dff", "ff0000ff", "fc0002ff", "7d0082ff"],
//     "canvasTime": 0,
//     "body": true,
//     "llqkgzw": [2560, 1440, 646, 278, 1658, 1139, 1594, 1048],
//     "hkwidth": 300,
//     "canvaszw": "8017992b85eb0778a39385b00dfc412e",
//     "Gpuvendor": "Google Inc. (NVIDIA)",
//     "Gpurenderer": "ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 (0x00002484) Direct3D11 vs_5_0 ps_5_0, D3D11)",
//     "cpuhe": 20,
//     "jsInfo": ["http://127.0.0.1:3000/0.0.1/js/cyverification.js|8115|2.80", "http://127.0.0.1:3000/0.0.1/js/cyverify.js|50881|4.40"],
//     "dzxx": "Error",
//     "webgl": "f8f2a7e8390ea5d3e46b15d1f2a41617",
//     "audio": 126869,
//     "usedJSHeapSize": 3916800,
//     "colorDepth": 23,
//     "img1": "00",
//     "img2": "00",
//     "move": [[345, 531, 1, 1574], [344, 531, 1, 24], [341, 531, 1, 40], [333, 530, 1, 64], [327, 528, 1, 80], [321, 527, 1, 96], [316, 527, 1, 114], [314, 527, 1, 120], [312, 527, 1, 136], [311, 526, 1, 154], [310, 525, 1, 178], [307, 524, 1, 198], [302, 522, 1, 214], [301, 521, 1, 230], [299, 521, 1, 238], [299, 521, 0, 358], [300, 521, 1, 398], [304, 522, 1, 413], [311, 523, 1, 429], [318, 524, 1, 446], [325, 525, 1, 462], [331, 526, 1, 480], [336, 526, 1, 496], [346, 526, 1, 512], [361, 526, 1, 527], [383, 526, 1, 543], [407, 526, 1, 560], [430, 526, 1, 575], [451, 525, 1, 592], [471, 523, 1, 607], [490, 521, 1, 624], [514, 520, 1, 648], [527, 519, 1, 663], [537, 519, 1, 680], [546, 518, 1, 695]],
//     "ip": "1"
// }
// parseTz([
//     d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d
// ], 0,10, {'ip':1})

