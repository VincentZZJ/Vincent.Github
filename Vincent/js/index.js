window.onload = function () {
			// 获取当前页盒子
			var oIndex = document.getElementById('index');
			var oImg = document.getElementById('background');
			oImg.style.transform = "translateY(-100px)";

			// 页面载入后的显示
			oIndex.style.opacity = 1;

			// 顶部banner背景图随鼠标移动而移动
			document.onmousemove = function (ev) {
				var oEvent = ev || event;
				// 以文本窗口中点为参考点进行移动，可理解为直角坐标的四象限
				// 用当前鼠标的坐标减去窗口中点坐标来确定象限位置
				var moveX = oEvent.clientX - (document.documentElement.clientWidth / 2);
				var moveY = oEvent.clientY - (document.documentElement.clientHeight / 2);
				if(moveX>0 && moveY>0){		//第四象限
					oImg.style.transform = "translate(20px,10px)";
				}else if(moveX>0 && moveY<0){	//第一象限
					oImg.style.transform = "translate(20px,-50px)";
				}else if(moveX<0 && moveY<0){	//第二象限
					oImg.style.transform = "translate(-20px,-50px)";
				}else{							//第三象限
					oImg.style.transform = "translate(-20px,10px)";
				}
			}

			// 给入口添加点击事件，页面跳转
			var entrance = document.getElementById('entrance');
			clearTimeout(entrance.timer);
			entrance.onclick = function () {
				var oIndex = document.getElementById('index');
				// console.log(oIndex);
				oIndex.style.transform = "translate(-500px,-500px)";
				oIndex.style.opacity = 0;
				entrance.timer = setTimeout(function () {
					window.location.href = "./main.html";	
				},500);
			}
		}