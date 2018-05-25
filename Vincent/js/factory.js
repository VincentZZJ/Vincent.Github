window.onload = function () {
	// 获取主盒子
	var oFactory = document.getElementById('factory');
	// 引入头部JS
	header(oFactory);
	var oContent = document.getElementById('content');
	// 获取编辑菜单元素
	var meun = document.getElementById('lines');
	var edit_btn = document.getElementById('edit');
	var add_btn = document.getElementById('add');
	// 获取编辑框
	var new_note = document.getElementById('new_note');
	var cancel = document.getElementById('cancel');

	// 获取线条
	var line = meun.getElementsByTagName('div');
	// 菜单动画事件
	meun.hasClick = false;
	meun.onmousedown = function () {
		this.style.transform = "scale(0.8)";
	}
	meun.onmouseup = function () {
		this.style.transform = "";
		if(!this.hasClick){		
			this.style.background = "rgba(240,10,20,0.8)";
			line[0].style.transform = "translateY(8px) rotate(36deg)";
			line[1].style.opacity = 0;
			line[2].style.transform = "translateY(-8px) rotate(-36deg)";
			// edit_btn.style.display = add_btn.style.display = "block";
			setTimeout(function () {
				edit_btn.style.display = add_btn.style.display = "block";
			},200);
			edit_btn.style.opacity = add_btn.style.opacity = 1;
			edit_btn.style.transform = add_btn.style.transform = "translateX(0px)";
			this.hasClick = true;
		}else{
			this.style.background = "";
			line[0].style.transform = line[2].style.transform = "";
			line[1].style.opacity = 1;
			// edit_btn.style.display = add_btn.style.display = "none";
			edit_btn.style.opacity = add_btn.style.opacity = 0;
			edit_btn.style.transform = add_btn.style.transform = "translateX(30px)";
			setTimeout(function () {
				edit_btn.style.display = add_btn.style.display = "none";
			},800);
			this.hasClick = false;	
		}
	}
	// 新添笔记事件
	add_btn.onmousedown = function () {
		this.style.transform = "scale(0.8)";
	}
	add_btn.onmouseup = function () {
		this.style.transform = "scale(1) translateX(0px)";
		// 样式转换
		oContent.style.filter = "blur(6px)";
		new_note.style.opacity = 1;
		new_note.style.display = "block";
	}
	// 关闭笔记添加框
	var oLines = cancel.getElementsByTagName('div');
	cancel.onclick = function () {
		oContent.style.filter = "";
		new_note.style.opacity = 0;
		new_note.style.display = "none";
	}
	cancel.onmouseover = function () {
		oLines[0].style.transform = "translateY(8px) rotate(35deg)";
		oLines[1].style.transform = "translateY(-9px) rotate(-35deg)";
		this.style.background = "rgba(240,10,10,0.8)";
	}
	cancel.onmouseout = function () {
		oLines[0].style.transform = oLines[1].style.transform = "";
		this.style.background = "rgba(199,203,209,0.2)";
	}
}
