window.onload = function () {
	// 获取页面盒子
	var oPhoto = document.getElementById('photo');
	// 引入header.js的主方法
	header(oPhoto);
	// banner处获取元素
	var b_pic = document.getElementById('pic');
	var oImgs = b_pic.getElementsByTagName('img');
	var l_turn = document.getElementById('l_turn');
	var r_turn = document.getElementById('r_turn');
	var gas = document.getElementById('gas');
	// 图片展示区
	var c_box = document.getElementById('c_box');
	var pics_box = document.getElementById('pics_box');
	var p_Imgs = pics_box.getElementsByTagName('img');
	var pic_up = c_box.getElementsByClassName('pic_up')[0];
	var pic_down = c_box.getElementsByClassName('pic_down')[0];
	var pic_ul = document.getElementById('pics_nav');
	var pic_lis = pic_ul.getElementsByTagName('li');
	var p_lines = document.getElementById('p_lines');
	var p_divs = p_lines.getElementsByTagName('div');
	var pic_aside = c_box.getElementsByClassName('pic_aside')[0];
	var desc = c_box.getElementsByClassName('desc')[0];
	// var pic_guide = pic_ul.children[0];

	//图片区导航图标的动画效果
	pic_lis[0].hasClick = false;
	pic_lis[0].onmousedown = function () {
		var _this = this;
		//三条线的操作
		if(!this.hasClick){
			p_lines.style.transform = "scale(0.8,0.8)";
			p_divs[0].style.transform = "translateY(8px) rotate(45deg)";
			p_divs[1].style.opacity = "0";
			p_divs[2].style.transform = "translateY(-6px) rotate(-45deg)";
			this.hasClick = true;
			// 侧边选择图标的飞出
			for(var i=1;i<pic_lis.length;i++){
				pic_lis[i].style.cursor = "pointer";
				pic_lis[i].style.transform = "translateX(-20px)";
				pic_lis[i].style.opacity = 1;
			}
		}else{
			p_lines.style.transform = "";
			this.style.transform = "";
			p_divs[0].style.transform = "";
			p_divs[1].style.opacity = "1";
			p_divs[2].style.transform = "";
			this.hasClick = false;
			// 侧边栏收回来
			for(var i=1;i<pic_lis.length;i++){
				pic_lis[i].style.cursor = "";
				pic_lis[i].style.transform = "translateX(50px)";
				pic_lis[i].style.opacity = 0;
			}
		}
	}

	// 左侧图片路径
	var pic_paths = ["./images/photo/live_aside.png","./images/photo/travel_aside.png","./images/photo/sport_aside.png"];
	var pic_desc = ["Lives","Trip","Sport"];
	

	// 针对飞出的图标进行点击事件绑定
	for(var i=1;i<pic_lis.length;i++){
		pic_lis[i].index = i;
		pic_lis[i].hasFinish = true;
		pic_lis[i].onclick = function () {
			var _this = this;
			// 改变左侧背景和文字
			// var bg_url = pic_aside.getAttribute('src');				//  img.src --> 图片的完整路径（绝对路径）
			// pic_aside.setAttribute('src',pic_paths[this.index-1]);		//  img.getAttribute('src') --> 图片的相对路径
			var txt = pic_desc[this.index-1];
			if(this.hasFinish){	
				this.hasFinish = false;
				changePic(pic_lis[this.index],txt);
			}else{
				return ;
			}
		}
		pic_lis[i].onmouseover = function () {
			this.style.transform = "scale(1.2) translateX(-20px)"
		}
		pic_lis[i].onmouseout = function () {
			this.style.transform = "translateX(-20px)"
		}
	}
	// 改变图片函数
	function changePic(obj,txt) {
		// 获取图片盒子
		pics_box.style.transform = "scale(0.2,0.2) rotateY(180deg)";
		setTimeout(function () {
			for(var i=0;i<p_Imgs.length;i++){
				var p_src = "./images/photo/" + txt + "/" + i + ".png";
				p_Imgs[i].setAttribute('src',p_src);
			}
			pics_box.style.transform = "rotateY(0)";
			pic_aside.setAttribute('src',pic_paths[obj.index-1]);
			desc.innerText = txt;
			obj.hasFinish = true;
		},1000);
	}


	// 将图片区的图片转为绝对定位
	for(var i=0;i<p_Imgs.length;i++){
		p_Imgs[i].style.left = p_Imgs[i].offsetLeft + "px";
		if(i<12){
			p_Imgs[i].style.top = p_Imgs[i].offsetTop + "px";				// 高度分别为 2 / 166 / 330 / 494
		}else{
			p_Imgs[i].style.top = 330 + "px";
		}
		// console.log(p_Imgs[i].offsetTop);
	}
	for(var i=0;i<p_Imgs.length;i++){
		p_Imgs[i].style.position = "absolute";
		p_Imgs[i].style.zIndex = 5;
		if(i>7){
			p_Imgs[i].style.opacity = 0;
			p_Imgs[i].style.display = "none";
		}
	}

	var now = 0;		// 当前可视框中第一张图片
	var hasChange = false;
	// 图片区向上翻页时
	pic_up.onclick = function () {
		// hasChange = true;
		if(now+7>14){		// 判断是否已经触底
			return ;
		}	
		if(hasChange){
			return;
		}
		hasChange = true;
		var i = now;
		var timer = setInterval(function () {
			// 如果可视区第一行 = 0~3，则整体变化
			// 如果可视区第一行 = 4~11，则除0~3外其余变化
			
			if(i<now+4){
				animate(p_Imgs[i],{"top":-162,"opacity":0});		// 第一行变化
				p_Imgs[i].style.display = "none";
			}else if(i<now+8){
				animate(p_Imgs[i],{"top":2});			// 第二行变化
			}else{
				if(i==now+12){			// 翻页结束
					clearInterval(timer);
					hasChange = false;
					now+=4;
					console.log("翻页" + now%4);
				}else{
					p_Imgs[i].style.display = "block";
					animate(p_Imgs[i],{"top":166,"opacity":40});		// 第三行变化
				}
			}
			i++;
		},50);
	}
	// 向下翻时
	pic_down.onclick = function () {
		if(now-4<0){
			return ;
		}
		if(hasChange){
			return ;
		}
		hasChange = true;
		var i = now+7;
		var timer = setInterval(function () {
			if(i>now+3){						// 第三行
				animate(p_Imgs[i],{"top":330,"opacity":0});
				p_Imgs[i].style.display = "none";
			}else if(i>=now){					// 第二行
				animate(p_Imgs[i],{"top":166});
			}else{
				if(i>now-5){
					p_Imgs[i].style.display = "block";
					animate(p_Imgs[i],{"top":2,"opacity":40});	// 第一行
				}else{
					clearInterval(timer);
					hasChange = false;
					now-=4;
				}
			}
			i--;
		},50);
	}
	// 给图片添加点击事件，滑入滑出事件
	for(var i=0;i<p_Imgs.length;i++){
		p_Imgs[i].index = i;
		p_Imgs[i].onclick = function () {
			p_Imgs[this.index].style.transform = "scale(2)";
			p_Imgs[this.index].style.opacity = 1;
			p_Imgs[this.index].style.zIndex = 10;
		}
		p_Imgs[i].onmouseover = function () {
			p_Imgs[this.index].style.transition = "1s";
			p_Imgs[this.index].style.opacity = 1;
			p_Imgs[this.index].style.zIndex = 10;
			// console.log("over");
		}
		p_Imgs[i].onmouseout = function () {
			var _this = this;
			p_Imgs[this.index].style.transform = "";
			p_Imgs[this.index].style.opacity = 0.4;
			p_Imgs[this.index].style.zIndex = 5;
			// console.log("out");
			setTimeout(function () {
				
				p_Imgs[_this.index].style.transition = "";
			},1000);
		}
	}

	// 当页面载入后显示页面
	oPhoto.style.opacity = 1;

	// // 图片轮播
	// 设置循环播放
	var tag = 1;		// 用于记录每次循环数
	// 鼠标移入移出效果
	b_pic.onmouseover = function () {		// 鼠标移入时清除定时器
		clearInterval(this.timer);
	}
	b_pic.onmouseout = function () {
		this.timer = setInterval(function () {
			pics_move(b_pic,tag);
			tag++;
		},2000);
	}
	// 左右切换效果
	l_turn.onclick = function () {			
		pics_move(b_pic,tag);
	}
	// 图片路径数组
	var bg_paths = ["./images/photo/travel_bg.png","./images/photo/live_bg.jpg","./images/photo/sport_bg.png","./images/photo/travel_bg1.png","./images/photo/live_bg1.png","./images/photo/sport_bg1.png"];
	r_turn.hasClick = false;
	r_turn.onclick = function () {
		var _this = this;
		if(this.hasClick){
			return;
		}
		this.hasClick = true;
		clearInterval(b_pic.timer);
		b_pic.left = (tag-1)%3;					// 判断是哪个位置的图片
		b_pic.mid = tag%3;
		b_pic.right = (tag+1)%3;
		// 针对mid照片动画
		oImgs[b_pic.mid].style.transform = "scale(0.8)";
		oImgs[b_pic.mid].style.left = "51.5%";
		oImgs[b_pic.mid].style.opacity = "0.2";
		oImgs[b_pic.mid].style.zIndex = "5";
		// 针对left照片动画
		oImgs[b_pic.left].style.transform = "scale(1)";
		oImgs[b_pic.left].style.left = "25%";
		oImgs[b_pic.left].style.opacity = "1";
		oImgs[b_pic.left].style.zIndex = "10";
		// 针对right照片动画
		var flag = oImgs[b_pic.right].index ;
		flag = Math.abs(flag - 3);
		oImgs[b_pic.right].index = flag;
		oImgs[b_pic.right].setAttribute('src',bg_paths[flag%6]);
		oImgs[b_pic.right].style.left = "-4%";
		// tag = Math.abs(tag-1);
		tag --;
		b_pic.timer = setInterval(function () {				// 向右切换后，重新定义计时器（因为一进来的时候已经清除了）
			pics_move(b_pic,tag);
			tag++;
			_this.hasClick = false;
		},2000);
	}
	// 图片点击效果
	for(var i=0;i<oImgs.length;i++){
		oImgs[i].hasClick = false;
		oImgs[i].index = i;
		oImgs[i].onclick = function () {
			if(!this.hasClick){
				this.style.transform = "translateY(20px) scale(1.2)";
				this.hasClick = true;
			}else{
				this.style.transform = "scale(1) translateY(0px)";
				this.hasClick = false;
			}
		}
	}
	//循环播放
	clearInterval(b_pic.timer);					// 先清除定时器
	b_pic.timer = setInterval(function () {
		pics_move(b_pic,tag);
		tag++;
	},2000);
	// 图片轮播函数
	function pics_move(obj,tag) {
		obj.left = (tag-1)%3;					// 判断是哪个位置的图片
		obj.mid = tag%3;
		obj.right = (tag+1)%3;
		// 针对mid照片动画
		oImgs[obj.mid].style.transform = "scale(0.8)";
		oImgs[obj.mid].style.left = "-4%";
		oImgs[obj.mid].style.opacity = "0.2";
		oImgs[obj.mid].style.zIndex = "5";
		// 针对right照片动画
		oImgs[obj.right].style.transform = "scale(1)";
		oImgs[obj.right].style.left = "25%";
		oImgs[obj.right].style.opacity = "1";
		oImgs[obj.right].style.zIndex = "10";
		// 针对left照片动画
		var flag = oImgs[obj.left].index;
		flag = flag+3;
		oImgs[obj.left].index = flag;
		oImgs[obj.left].setAttribute('src',bg_paths[flag%6]);
		oImgs[obj.left].style.left = "51.5%";
	}
}

// 获取样式
function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

// 链式运动函数
function animate(obj,json,fn) {
	// clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var flag = true;		// 默认所有运动已完成
		for(var attr in json){
			// console.log(json[attr]);
			if(attr=="opacity"){// 透明样式
				var curAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				var curAttr = parseInt(getStyle(obj,attr));
				// console.log(curAttr);
			}
			// console.log(attr+ " :" + json[attr] + ": " + curAttr);
			// 缓冲运动
			var speed = (json[attr]-curAttr)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			// console.log("speed:" + speed);
			if(curAttr!=json[attr]){		//判断是否已完成效果
				flag = false;
			}
			if(attr=="opacity"){
				obj.style.filter = "alpha(opacity:" + (curAttr+speed) + ")";
				obj.style.opacity = (curAttr+speed)/100;
				// console.log("curAttr:" + getStyle(obj,attr));
			}else{
				obj.style[attr] = curAttr + speed + "px";
				// console.log("curAttr:" + getStyle(obj,attr));
			}
		}
		// 判断是否结束链式运动
		if(flag){
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
}
