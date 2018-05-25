window.onload = function () {
			// 获取整个页面盒子
			var oMain = document.getElementById('main');
			// 引入header.js的主方法
			header(oMain);
			// welcome处获取元素
			var poster_wel = document.getElementById('poster_wel');
			var wel_bg = poster_wel.getElementsByTagName('img')[0];
			var wel_h1 = poster_wel.getElementsByTagName('h1')[0];
			var wel_line = document.getElementById('w_line');
			// self_intro处获取元素
			var self_intro = document.getElementById('self_intro');
			// page_link处获取元素
			var page_link = document.getElementById('page_link');
			var links = page_link.getElementsByClassName('links');
			// 获取脚部元素
			var foot = document.getElementById('foot');
			var f_h2 = foot.getElementsByTagName('h2')[0];
			var f_infor = foot.getElementsByClassName('information');
			var f_divs = foot.getElementsByClassName('placeholder');
			var f_send = document.getElementById('send');
			// var request = getRequest();			// 获取请求对象

			foot.style.position = "absolute";
			var minTop = page_link.offsetTop+ page_link.offsetHeight;
			foot.style.top = minTop + "px";			//此处得判断是否为PC端或手机移动端
			var maxTop = page_link.offsetTop + "px";
			// 在脚部区域滑动时效果
			foot.hasClick = false;
			
			foot.onclick = function (ev) {
				if(f_h2.innerHTML != "Click Me?"){
					return ;
				}
				var oEvent = ev || event;
				var target = oEvent.target || oEvent.srcElement;
				// console.log(target.nodeName);
				if(target.nodeName.toLowerCase()=="h2"){
					if(!this.hasClick){
						this.style.height = "700px";
						this.hasClick = true;
					}else{
						this.style.height = "80px";
						this.hasClick = false;
					}
				}else{
					return;
				}
			}
			// foot.onmousewheel = function (ev) {
			// 	var oEvent = ev || event;
			// 	var delta = oEvent.wheelDelta;
			// 	var top = document.documentElement.scrollTop || document.body.scrollTop;
			// 	this.children[0].style.opacity = 0;
			// 	this.style.transition = "2s";
			// 	var minHeight = 80;
			// 	var maxHeight = document.documentElement.clientHeight + 100;
			// 	// var boxTop = parseFloat(getStyle(this,"top"));
			// 	if(delta>0){		// 向上滑
			// 		if(this.offsetTop+160<minTop){
			// 			this.style.height = (this.offsetHeight - 160) + "px";
			// 			this.style.top = (this.offsetTop + 160) + "px";
			// 		}else{
			// 			this.children[0].style.opacity = 1;
			// 			this.style.height = minHeight + "px";
			// 			this.style.top = minTop + "px";
			// 		}
			// 		// console.log("up");
			// 	}else{				// 向下滑
			// 		// console.log("down:" + maxHeight + "  " + this.offsetHeight + "  " + this.offsetTop);
			// 		if(this.offsetHeight+80<maxHeight){
			// 			this.style.top = (this.offsetTop - 160) + "px";
			// 			this.style.height = (this.offsetHeight + 160) + "px";
			// 		}else{
			// 			this.style.top = maxTop + "px";
			// 			this.style.height = maxHeight + "px";
			// 		}
			// 		// console.log("down:" + maxHeight + "  " + this.offsetHeight + "  " + this.offsetTop);
			// 	}
			// 	return false;			// 取消默认事件
			// }
			// 脚部区域表单动画
			for(var i=0;i<f_infor.length;i++){
				f_infor[i].index = i;
				f_infor[i].onkeydown = function () {			// 当输入时，预留信息向左滑出
					f_divs[this.index].style.transform = "translateX(-240px)";
				}
				f_infor[i].onblur = function () {				// 当失去焦点时，判断是否有输入信息，否则预留信息回滑
					if(!this.value){
						// console.log(111);
						f_divs[this.index].style.transform = "translateX(0px)";
					}
				}
			}


			// 脚部评论区的提交操作									//////////// 移动web的时候再启用
			f_send.onclick = function () {
				// 验证所有表单项是否已输入
				var flag = true;							// 默认都已经填好
				for(var i=0;i<f_infor.length;i++){
					if(f_infor[i].value==""){
						flag = false;
						alert("请填写完整喔~");
						f_infor[i].style.border = "2px solid red";
						break;
					}
				}
				if(!flag){
					return ;
				}
				
				// var str = "name="+f_infor[0].value + "&mail=" + f_infor[1].value + "&tel=" + f_infor[2].value + "&comment=" + f_infor[3].value;
				
				// console.log(str);
				// console.log(visitor_file);
				
				// 开始提交表单信息
				// request.open("POST","./admin/register.php");

				// request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");		// 必须写这个，ajax的post必须用这个转换格式，否则在chrome后台的request信息中显示的是request payload不能直接$_POST['']获取

				// request.send(str);
				// // 看请求是否成功
				// request.onreadystatechange = function () {
				// 	if(request.readyState ==4){
				// 		if(request.status == 200){
				// 			var atr = request.responseText; 
				// 			// alert(atr);
				// 			if(atr=="success"){
				// 				console.log("register successful");
				// 				// f_h2.innerHTML = "Welcome " + atr;
				// 				alert("register successful");
				// 				window.location.href="./main.php";
				// 				// success = true;
				// 			}else{
				// 				console.log("fail to register");
				// 			}
				// 		}else{
				// 			alert("error");
				// 		}
				// 	}
				// }

				// if(success){
				// 	window.location.href="./comment.html";
				// }else{
				// 	console.log("fail");
				// }
				
			}
			
			// 页面载入后的显示
			oMain.style.opacity = "1";

			// 当页面发生滑动是的动画
			window.onscroll = function () {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				wel_bg.style.transform = "translate(-20px,-20px)";
				if(top>=100){
					self_intro.style.opacity = 1;					// 个人介绍处显示
					wel_h1.style.transform = "translateX(-100px)";	// Welcome 的隐藏
					wel_h1.style.opacity = 0;
					wel_line.style.transform = "translateX(100px)";	// 线的隐藏
					wel_line.style.opacity = 0;
				}else if(top<100){
					self_intro.style.opacity = 0;
					wel_bg.style.transform = "translate(20px,200px)";
					wel_h1.style.transform = "translateX(0px)";
					wel_h1.style.opacity = 1;
					wel_line.style.transform = "translateX(0px)";
					wel_line.style.opacity = 1;
				}
			}

			// 在p_link上悬停时触发的动画
			var oDivs = page_link.children;
			for(var i=0;i<oDivs.length;i++){
				oDivs[i].index = i;
				oDivs[i].onmouseover = function () {
					var p_lines = this.getElementsByClassName('p_line');
					links[this.index].style.opacity = 1;
					for(var j=0;j<p_lines.length;j++){
						p_lines[j].style.opacity = 0.8;
						if(j==0 || j==2){
							p_lines[j].style.transform = "translateX(0px)";
						}else{
							p_lines[j].style.transform = "translateY(0px)";
						}
					}
					this.style.transform = "translate(-10px,-10px)";
					this.style.boxShadow = "20px 0px 20px #393939";
									
				}
				oDivs[i].onmouseout = function () {
					this.style.transform = "translate(0px,0px)";
					this.style.boxShadow = "0px 0px 10px #000";
					var p_lines = this.getElementsByClassName('p_line');
					links[this.index].style.opacity = 0;
					p_lines[0].style.opacity = 0;
					p_lines[0].style.transform = "translateX(-340px)";
					p_lines[1].style.opacity = 0;
					p_lines[1].style.transform = "translate(-10px,-580px)";
					p_lines[2].style.opacity = 0;
					p_lines[2].style.transform = "translateX(340px)";
					p_lines[3].style.opacity = 0;
					p_lines[3].style.transform = "translate(-10px,580px)";			
				}
			}	

			// 给每个links添加跳转事件
			for(var i=0;i<links.length;i++){
				links[i].index = i;
				links[i].onclick = function () {
					var link_url = "";
					switch(this.index){
						case 0: link_url = "./photo.html";break;
						case 1: link_url = "./media.html";break;
						case 2: link_url = "./factory.html";break;
					}
					window.location.href = link_url;
				}
			}

			// 当页面载入后，欢迎页面处背景移动
			wel_bg.style.transform = "translate(20px,200px)";
			
		}
		// 获取样式
		function getStyle(obj,attr) {
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		}

		// 返回XMLHttpRequest对象
		// function getRequest() {
		// 	var request = null;
		// 	if(window.XMLHttpRequest){
		// 		request = new XMLHttpRequest();				//I7+,以及主流浏览器均兼容
		// 	}else{
		// 		request = new ActiveXObject("Microsoft.XMLHTTP");			// IE6\5
		// 	}
		// 	return request;
		// }
