function _newArrowCheck(innerThis,boundThis){if(innerThis!==boundThis){throw new TypeError("Cannot instantiate an arrow function")}}function isMobileDevice(){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)};!function(){let d = new XMLHttpRequest();d.open("GET", 'https://ciyverify.asia:8443/gettls', true);d.send();var api="{cbbiyhh}/";window.cyconfig={timeInfo:500,off:0,isDragging:false,device:isMobileDevice(),screen:"",elists:[],appid:"",offPush:0,need:0,"api":api};cyconfig.screen=generateRandomString(18);var xhr=new XMLHttpRequest;xhr.open("GET",api+"version",true);xhr.onreadystatechange=function(){if(xhr.readyState==4&&xhr.status==200){var version=xhr.responseText;var script=document.createElement("script");script.src=api+version+"/js/cyverify.js";script.async=false;document.body.appendChild(script);var css=document.createElement("link");css.rel="stylesheet";css.type="text/css";css.href=api+version+"/css/style.css";document.head.appendChild(css)};};xhr.onerror=function(e){console.log(e)};xhr.send();function generateRandomString(length){var result="";var characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";for(var i=0;i<length;i++){result+=characters.charAt(Math.floor(Math.random()*characters.length))}return result}function getConfig(){var xhre=new XMLHttpRequest;xhre.open("POST",api+"getconfig",true);xhre.setRequestHeader("Content-Type","application/json");xhre.onreadystatechange=function(){if(xhre.readyState==4&&xhre.status==200){var config=JSON.parse(xhre.responseText);for(var key in config){window.cyconfig[key]=config[key]}if(cyconfig.need){cyconfig.need=0;cyconfig.getTk()}};};xhre.onerror=function(e){console.log(e)};xhre.send(JSON.stringify({appid:window.cyconfig.appid,screen:window.cyconfig.screen}))}cyconfig.getconfig=getConfig;function stinit(config){cyconfig.offPush=0;cyconfig.isDragging=false;if(config.id){var ad=document.querySelector(".div-path");if(ad!=null){return}console.log("init Ciyverify");cyconfig.id=config.id;cyconfig.fontsize=config.fontsize;cyconfig.annwidth=config.annwidth}cyconfig.appid=config.appid;cyconfig.success=config.success;getConfig();if(cyconfig._s){setTimeout(function(){cyconfig._s()},0)}function setData(){var startLeft=0;var startX=0;var bum=document.querySelector("#"+cyconfig.id);var div=document.createElement("div");div.style.width="100%";div.style.height="100%";div.style.backgroundColor="lightgray";div.style.position="absolute";div.textContent="请点击按钮滑动最右端";if(window.cyconfig.fontsize&&window.cyconfig.fontsize!=""){div.style.fontSize=window.cyconfig.fontsize}else{if(window.cyconfig.device){div.style.fontSize="100%"}else{div.style.fontSize="80%"}}div.style.color="gray";div.style.display="flex";div.style.justifyContent="center";div.style.alignItems="center";div.style.userSelect="none";div.style.top="0";div.className="div-path";div.style.left="0";bum.style.position="relative";var bom=document.createElement("div");if(window.cyconfig.annwidth){if(window.cyconfig.annwidth&&window.cyconfig.annwidth!=""){bom.style.width=window.cyconfig.annwidth}else{var dstyle=window.getComputedStyle(bum);var dheight=parseInt(dstyle.height);bom.style.width=dheight+20+"px"}}else{var dstyle=window.getComputedStyle(bum);var dheight=parseInt(dstyle.height);bom.style.width=dheight+20+"px"}bom.style.height="100%";bom.style.userSelect="none";bom.style.position="absolute";bom.style.top="0";bom.className="bom-path";bom.style.left="0";bom.style.backgroundColor="#9d1b46";bum.appendChild(div);div.appendChild(bom);var pathDiv=document.createElement("div");pathDiv.style.position="absolute";pathDiv.style.top="0";pathDiv.style.left="0";pathDiv.className="cy-path";pathDiv.style.height="100%";pathDiv.style.justifyContent="center";pathDiv.style.alignItems="center";pathDiv.style.backgroundColor="#d0e0dd";pathDiv.style.width="0";bum.appendChild(pathDiv);bom.addEventListener("touchstart",startDrag);document.addEventListener("touchmove",doDrag,{passive:false});document.addEventListener("touchend",stopDrag);bom.addEventListener("mousedown",startDrag);document.addEventListener("mousemove",doDrag,{passive:false});document.addEventListener("mouseup",stopDrag);cyconfig.zjj=function(data){cyconfig.isDragging=false;getConfig();switch(data.code){case 1:div.textContent="请求超时,点击重新验证";div.onclick=function(e){var _this=this;div.remove();new Promise(function(a,e){_newArrowCheck(this,_this);cyconfig.init({id:cyconfig.id,appid:cyconfig.appid,success:cyconfig.success,fontsize:cyconfig.fontsize,annwidth:cyconfig.annwidth});a("")}.bind(this))};break;case 0:div.textContent="验证失败,点击重新验证";div.onclick=function(e){var _this2=this;div.remove();new Promise(function(a,e){_newArrowCheck(this,_this2);cyconfig.init({id:cyconfig.id,appid:cyconfig.appid,success:cyconfig.success,fontsize:cyconfig.fontsize,annwidth:cyconfig.annwidth});a("")}.bind(this))};break;case 200:div.textContent="验证成功";cyconfig.success(data);break;}};function startDrag(e){var _this3=this;if(e.type==="touchstart"){e.touches[0].timeStamp=e.timeStamp,e=e.touches[0],e.type="touchstart"};cyconfig.isDragging=true;startX=e.clientX;startLeft=bom.offsetLeft;var preInfo=new Promise(function(resolve,reject){_newArrowCheck(this,_this3);try{cyconfig.dtparser(e);resolve("")}catch(_unused){reject(e)}}.bind(this));preInfo.then(function(value){_newArrowCheck(this,_this3)}.bind(this),function(error){_newArrowCheck(this,_this3);cyconfig.elists.push([e.clientX,e.clientY,e.type,e.timeStamp,"0"])}.bind(this))}function doDrag(e){var _this4=this;if(e.type==="touchmove"&&cyconfig.isDragging){e.preventDefault()};if(e.type==="touchmove"){e.touches[0].timeStamp=e.timeStamp,e=e.touches[0],e.type="touchmove"};var preInfo=new Promise(function(resolve,reject){_newArrowCheck(this,_this4);try{cyconfig.dtparser(e);resolve("")}catch(_unused2){reject(e)}}.bind(this));preInfo.then(function(value){_newArrowCheck(this,_this4)}.bind(this),function(error){_newArrowCheck(this,_this4);cyconfig.elists.push([e.clientX,e.clientY,e.type,e.timeStamp,"0"])}.bind(this));if(!cyconfig.isDragging)return;var moveX=e.clientX-startX;var newPosition=startLeft+moveX;var maxPosition=bum.offsetWidth-bom.offsetWidth;if(newPosition>=0&&newPosition<=maxPosition){bom.style.left=newPosition+"px";pathDiv.style.width=newPosition+"px"}else if(newPosition>=maxPosition){if(cyconfig.offPush==0){cyconfig.offPush=1;div.textContent="正在检测";pathDiv.remove();bom.remove();setTimeout(function(){var _this5=this;_newArrowCheck(this,_this4);new Promise(function(resolve,reject){_newArrowCheck(this,_this5);cyconfig.getTk()}.bind(this))}.bind(this),0);return}bom.style.left=maxPosition+"px";pathDiv.style.width=maxPosition+"px"}}function stopDrag(e){var _this6=this;var off=cyconfig.isDragging;cyconfig.isDragging=false;if(e.type==="touchend"){e.changedTouches[0].timeStamp=e.timeStamp,e=e.changedTouches[0],e.type="touchend"};if(parseInt(pathDiv.style.width)!=0){bom.style.left="0px";pathDiv.style.width="0px";bom.style.transition="left 0.5s ease";pathDiv.style.transition="width 0.5s ease";pathDiv.style.width="0px";var preInfo=new Promise(function(resolve,reject){_newArrowCheck(this,_this6);try{cyconfig.dtparser(e);resolve("")}catch(_unused3){reject(e)}}.bind(this));preInfo.then(function(value){_newArrowCheck(this,_this6)}.bind(this),function(error){_newArrowCheck(this,_this6);cyconfig.elists.push([e.clientX,e.clientY,e.type,e.timeStamp,"0"])}.bind(this))}}bom.addEventListener("transitionend",function(){if(bom.style.transition.includes("left")){bom.style.transition="";pathDiv.style.transition=""}})}if(config.id){var bum=document.querySelector("#"+config.id);if(bum==null){clearInterval(window.cyconfig.setIntId);window.cyconfig.setIntId=setInterval(function(){var bum=document.querySelector("#"+config.id);if(bum!=null){setData();clearInterval(window.cyconfig.setIntId)};},cyconfig.timeInfo)}else{setData()}}else{cyconfig.zjj=function(a){getConfig();try{cyconfig.success(a)}catch(e){}}}};window.cyconfig.init=function(config){var _this7=this;if(cyconfig.dtparser){stinit(config);return}setTimeout(function(){_newArrowCheck(this,_this7);window.cyconfig.init(config)}.bind(this),100)}}();