// header主方法
function header(obj) {
	// header处获取元素
	var head = document.getElementById('header');
	var oUl = document.getElementById('nav');
	var h_icon = document.getElementById('icon');
	var aLis = oUl.getElementsByTagName('li');
	var oAs = oUl.getElementsByTagName('a');

	// 点击头像时发生页面跳转的动画
	clearTimeout(h_icon.timer);
	h_icon.onclick = function () {
		obj.style.transform = "translate(200px,-600px)";
		obj.style.opacity = 0;
		this.timer = setTimeout(function () {
			window.location.href = "./index.html";
		},500);
	}

	// 鼠标滑入导航链接时的效果
	for(var i=0;i<oAs.length;i++){
		oAs[i].index = i;
		oAs[i].onmouseover = function (ev) {
			var ev = ev || event;
			var target = ev.target || ev.srcElement;
			var oLi = aLis[this.index];
			var lines = oLi.getElementsByTagName('div'); 
			if(target.nodeName.toLowerCase() == "a"){
				lines[0].style.opacity = lines[1].style.opacity = 1;
				lines[0].style.transform = "translateX(-20px)";
				lines[1].style.transform = "translateX(20px)";
			}
		}
		oAs[i].onmouseout = function (ev) {
			var ev = ev || event;
			var target = ev.target || ev.srcElement;
			var oLi = aLis[this.index];
			var lines = oLi.getElementsByTagName('div'); 
			if(target.nodeName.toLowerCase() == "a"){
				lines[0].style.transform = "translateX(20px)";
				lines[1].style.transform = "translateX(-20px)";
				lines[0].style.opacity = lines[1].style.opacity = 0;
			}
		}
	}
}
