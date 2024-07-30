



# Ciyverify对接教程


## 产品介绍
- - -
    本产品主要针对web和h5的网站进行保护，其接入十分方法简单

    用途例子:
        1.防止短信验证码被恶意请求
        2.防止商品购买被恶意抢购
        3.防止登入接口被恶意爆破
        ...

    该滑块验证码所使用的加密方式是jsvmp，其难度应该是现在(2024-02-29)在国内外的web安全产品中属于顶尖的，可以拦截绝大部分的算法还原

    该产品的检测方法分为两种:
        1.滑块验证码校验方案
        2.无感环境检测方案

    该版本永久免费，不定期升级加密方法和风控策略
    官方qq群:939583243

- - -
## 产品接口申请
>校验邮箱后appid和key和发送到你的邮箱，当你需要修改风控配置时使用同一个邮箱去申请就可以修改配置(不会重置appid和key)
<form id="yxInfo">
    <label for="email">邮箱:</label><br>
    <input type="email" id="email" name="email" required><br>
    <label for="code">验证码:</label><br>
    <input type="text" id="code" name="code" required>
    <div class="hkxx"></div>
    <button type="button" class="sms-btn" onclick="getSms()">获取验证码</button><br><br>
    <label for="maxdy">3分钟内总请求tk次数超过多少启动风控:</label><br>
    <input type="text" id="maxdy" name="maxdy" required><br>
    <label htmlFor="maxuserdy">3分钟内单用户请求tk次数超过多少启动封禁3分钟:</label><br/>
    <input type="text" id="maxuserdy" name="maxuserdy" required/>
    <input type="button" value="申请接口" onclick="verifyMail()">
</form>



## 滑块验证码对接
----------
> 通过校验用户在界面的轨迹操作去做风控校验,防御强度大于无感环境检测方案
### 第一步
*我们需要把该产品需要用的javascript文件添加到<head>标签中*
``` html
<head>
    <script src="{cbbiyhh}/1.0.1/js/cyverification.js"></script>
</head>
```
### 第二步
*我们需要在你需要的位置创建一个标签并给定id属性，下面我创建一个div且id为"test"的标签*
``` html
<head>
    <script src="{cbbiyhh}/1.0.1/js/cyverification.js"></script>
</head>
<body>
    <div id="test">点击验证</div>
</body>
```
### 第三步
*我们需要给这个标签一个长度和宽度，这将决定滑块的形状，我在下面是加上了一个简单的css样式*
``` html
<head>
    <script src="{cbbiyhh}/1.0.1/js/cyverification.js"></script>
    <style>
    #test {
      position: relative;
      width: 300px;
      height: 40px;
      text-align: center; /* Center the text inside the container */
      line-height: 40px; /* Align the text vertically */
      user-select: none; /* Prevent text selection */
    }
    </style>
</head>
<body>
    <div id="test">点击验证</div>
</body>
```
*下面是效果展示*

<div id="test2">点击验证</div>

### 第四步
*这一步就是最后一步了，这里我们需要执行一个javascript函数就可以把上面的标签变成滑块了，下面就是这个函数的详细解释*
``` javascript
cyconfig.init({
    id: "test", // 需要变滑块的元素id
    appid: "GJHCIOBHKJSMCLZX", // 你申请的appid
    success: function s(data) { // 滑块通过时返回的数据会传入这个回调函数
        console.log(data) // 打印返回数据
    },
    fontsize: "100%", // 设置滑块中的字体大小(可以是其他单位如:54px,也可以为"" 空字符串会自动使用默认字体大小)
    annwidth: "44px" // 设置滑块的宽度大小(可以是其他单位如:24%,也可以为"" 空字符串会自动使用默认宽度)
})

```
*接下来我们可以自己执行这个函数让上面的div元素变为滑块，也可以给div一个点击事件让他被点击时执行这个函数*

``` html
<head>
    <script src="{cbbiyhh}/1.0.1/js/cyverification.js"></script>
    <style>
    #test {
      position: relative;
      width: 300px;
      height: 40px;
      text-align: center; /* Center the text inside the container */
      line-height: 40px; /* Align the text vertically */
      user-select: none; /* Prevent text selection */
    }
    </style>
</head>
<body>
    <div id="test" onclick="cyconfig.init({id:'test', appid:'GJHCIOBHKJSMCLZX',success:function s(data){console.log(data)}, fontsize:'100%', annwidth: '44px'})">点击验证</div>
</body>
```
### 滑块测试
*下面是上面代码的效果 可以直接点击测试*
<div id="test" onclick="cyconfig.init({id:'test', appid:'GJHCIOBHKJSMCLZX',success:function s(data){console.log(data);document.getElementById('info').textContent = JSON.stringify(data);}, fontsize:'100%', annwidth: '44px'})">点击验证</div>

> 运行结果
<pre v-pre="" data-lang=""><code class="lang-" id="info">等待回调结果</code></pre>
*上面滑块通过后会返回tk值，我们可以把tk值放入headers或者cookies中之后和你的其他请求一起传入后端进行校验(文章后面会提在后端如何校验tk是否有效)*
- - -
## 无感环境验证码对接
----------
> 可以调用javascript的函数直接检测浏览器的环境，不会影响用户任何操作
### 第一步
*我们需要把该产品需要用的javascript文件添加到<head>标签中*
``` html
<head>
    <script src="{cbbiyhh}/1.0.1/js/cyverification.js"></script>
</head>
```
### 第二步
*初始化检测脚本，调用执行一个javascript函数(cyconfig.init函数)，下面就是这个函数的详细解释，*
``` javascript
cyconfig.init({
    appid: "GJHCIOBHKJSMCLZX", // 你申请的appid
    success: function s(data) { // 返回的数据(不管成功或者失败)会传入这个回调函数
        console.log(data) // 打印返回数据
    }
})
```
### 第三步
*执行环境校验函数（cyconfig.getTk）*
``` javascript
cyconfig.getTk() // 执行环境校验函数，数据会返回到上面init里面自己设置的函数中
```
### 无感防御测试
*我们在页面中加入这段代码*
``` html
<head>
    <script src="{cbbiyhh}/1.0.1/js/cyverification.js"></script>
    <script>
    cyconfig.init({
        appid: "GJHCIOBHKJSMCLZX", // 你申请的appid
        success: function s(data) { // 返回的数据(不管成功或者失败)会传入这个回调函数
            console.log(data) // 打印返回数据
        }
    })
    </script>
    <script>
        setTimeout(()=>{
            cyconfig.getTk() // 执行环境校验函数，数据会返回到上面init里面自己设置的函数中
        },300)

    </script>
</head>
```
> 运行结果
``` javascript
// 成功时的返回
{code: 200, tk: 'JigAqGYYeJgjjnHQWlCHLetiUVwIeQkb'}

// 失败时的返回
{"code": 0}

// 超时或者重复请求(失败)的返回
{code: 1}
```

- - -
## tk值校验
> tk值是滑块成功后返回的值，我们可以把tk值放入headers或者cookies中之后和你的其他请求一起传入后端进行校验，或者其他方法，这里主要说一下怎么校验
### 请求格式
```
请求的api接口为 : "{cbbiyhh}/getverify"

设置headers需要带上
Content-Type: application/x-www-form-urlencoded

需要携带的参数为:

    "appid": "GJHCIOBHKJSMCLZX" 你申请接口时，邮箱回件中的appid
    "tk" : "VGIjwlCLvxnjuAWjeAlOnghBnetXwqMc" 你需要校验的tk
    "key": "fhagkjfjadfklasoijklo" 你申请接口时，邮箱回件中的key


校验“滑块tk”有效时返回值:
    {"data":"1"}

校验“无感tk”有效时返回值:
    {"data":"2"}

校验tk无效时返回值:
    {"data":null}

自己要注意区分“滑块tk”和“无感tk”
服务器对tk的缓存为6分钟，请自己及时保存到自己的服务器上
```
*原始请求数据*
```
POST {cbbiyhh}/getverify HTTP/1.1
User-Agent: python-requests/2.28.1
Accept-Encoding: gzip, deflate, br
Accept: */*
Connection: keep-alive
Content-Length: 84
Content-Type: application/x-www-form-urlencoded

appid=GJHCIOBHKJSMCLZX&tk=VGIjwlCLvxnjuAWjeAlOnghBnetXwqMc&key=fhagkjfjadfklasoijklo
```
### python请求例子

```python
import requests

req = requests.post('{cbbiyhh}/getverify',data={
    "appid": "GJHCIOBHKJSMCLZX",
    "tk" : "VGIjwlCLvxnjuAWjeAlOnghBnetXwqMc",
    "key": "fhagkjfjadfklasoijklo"
})
print(req.json())
```

### node请求例子


```javascript
const axios = require('axios');

axios.post('{cbbiyhh}/getverify', {
    appid: "GJHCIOBHKJSMCLZX",
    tk: "VGIjwlCLvxnjuAWjeAlOnghBnetXwqMc",
    key: "fhagkjfjadfklasoijklo"
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});
```

### xhr请求例子

```javascript
var xhr = new XMLHttpRequest();
xhr.open("POST", "{cbbiyhh}/getverify", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 请求成功，处理响应数据
        console.log(xhr.responseText);
    }
};

// 发送请求
var data = "appid=GJHCIOBHKJSMCLZX&tk=VGIjwlCLvxnjuAWjeAlOnghBnetXwqMc&key=fhagkjfjadfklasoijklo";
xhr.send(data);
```
----------
## 注意事项
    滑块和无感在一个页面中只能使用一个，且一个页面不能使用多个滑块
    校验成功时返回的tk值我的服务器会缓存6分钟，所以使用者请及时校验后保存在自己的服务器上



