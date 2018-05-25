window.onload = function () {
	// 登录与注册切换的动画效果
	var l_box = document.getElementById('l_box');
	var r_box = document.getElementById('r_box');
	var sw_btn = document.getElementsByClassName('switch');

	// 切换到注册窗口
	sw_btn[0].onclick = function () {
		var _this = l_box;
		animate(_this,{"left":-400,"opacity":0},function () {
			_this.style.display = "none";
		});
		r_box.style.display = "block"
		// r_box.style.transform = "translateX(0px)";
		animate(r_box,{"left":0,"opacity":100});
	}

	// 切换到登录窗口
	sw_btn[1].onclick = function () {
		var _this = r_box;
		animate(_this,{"left":200,"opacity":0},function () {
			_this.style.display = "none";
		});
		l_box.style.display = "block"
		// r_box.style.transform = "translateX(0px)";
		animate(l_box,{"left":0,"opacity":100});
	}

	// 获取登录窗口的操作
	var l_btn = document.getElementById('l_btn');
	var login_form = document.getElementById('login_form');
	l_btn.onclick = function () {
		login_form.submit();
	}
	// 获取注册窗口的操作
	var r_btn = document.getElementById('r_btn');
	var register_form = document.getElementById('register_form');
	r_btn.onclick = function () {
		register_form.submit();
	}
}

// 获取样式函数
function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

// 链式动画
function animate(obj,json,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var flag = true;						// 默认所有动画已完成
		for(var attr in json){
			// 获取当前样式
			if(attr=="opacity"){		// 获取透明样式
				var curAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				var curAttr = parseInt(getStyle(obj,attr));
			}
			// 缓冲运动
			var speed = (json[attr]-curAttr)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			// 判断当前运动是否结束
			if(curAttr!=json[attr]){
				flag = false;
			}
			// 赋予新样式
			if(attr=="opacity"){
				obj.style.filter = "alpha(opacity:" + (curAttr+speed) + ")";
				obj.style.opacity = (curAttr+speed)/100 ;
			}else{
				obj.style[attr] = (curAttr+speed) + "px";
			}
		}
		// 判断链式运动是否结束
		if(flag){
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
}