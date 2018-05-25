// 自动生成标签
function createMsBox(parent,name,content,time) {
	var newLi = document.createElement('li');
	newLi.innerHTML = "<div class='msgBox'>" +
							"<div class='delCtr'>" +
									"<div class='delLine'></div><div class='delLine'></div>" + 
							"</div>" +
							"<p class='topMsg'># <label>" + name + "</label><time>" + time + "</time></p>" + 
							"<p class='mainMsg'>" + content + "</p>" + 
							"<ul class='comList'></ul>" +
							"<div class='secMsg'>" +
									// "<form action:'javascript:'>" + 
										"<input type='text' name='msg'><input type='submit' name='submit' value='reply'>" + 
									// "</form>" + 	
							"</div>" + 
						"</div>";
	parent.appendChild(newLi);
}
function createSecBox(parent,name,content,time) {
	var newLi = document.createElement('li');
	newLi.innerHTML =   "<div class='secBox'>" + 
							"<p class='secMsg'>#<label>" + name + "</label><time>" + time + "</time></p>" + 
							"<p class='secMain'>" + content + "</p>" +
						"</div>";
	parent.appendChild(newLi);
}

// 获取当前时间
function getDate() {
	var nowdate = new Date();
	var iYear = nowdate.getFullYear();
	var iMon = setForm(nowdate.getMonth()+1);
	var iDay = setForm(nowdate.getDate());
	var iHour = setForm(nowdate.getHours());
	var iMin = setForm(nowdate.getMinutes());
	var iSec = setForm(nowdate.getSeconds());

	var nowTime = iYear + "-" + iMon + "-" + iDay + " ------ " + iHour + ":" + iMin + ":" + iSec;

	function setForm(num) {
		return num<10?("0"+num):num;
	}

	return nowTime;
}

// 获取XMLHttpRequest对象
// function getRequest() {
// 	var request = null;
// 	if(window.XMLHttpRequest){
// 		request = new XMLHttpRequest();
// 	}else{
// 		request = new ActiveXObject("Microsoft.XMLHTTP");
// 	}
// 	return request;
// }

window.onload = function () {
	var oComment = document.getElementById('comment');
	// 引入header主方法
	header(oComment); 
	var msgList = document.getElementById('msgList');		// 获取消息列表
	
	var addNew = document.getElementById('addNew');			// 获取表单元素
	var submit_btn = document.getElementById('submit_btn');		// 提交按钮
	var register_btn = document.getElementById('submit');		// 注册按钮
	var register_box = document.getElementById('register_box');		// 隐藏的表单
	var oIpts = register_box.getElementsByTagName('input');

	var li_tag = 0;			// 用于记录第几个li

	// 对示例的操作
	var example = document.getElementById('example');
	var example_del = example.getElementsByClassName('delCtr')[0];
	example_del.onclick = function () {
		example.remove();
	}

	// var request = getRequest();			

	// 注册
	register_btn.onclick = function () {
		var flag = true;			// 默认表单都填了
		for(var i=0;i<3;i++){
			if(oIpts[i].value==""){
				flag = false;
				oIpts[i].style.border = "1px solid red";
				alert("表单不能有空喔...");
				break;
			}
		}
		if(!flag){
			return ;
		}
		// var v_name = oIpts[0].value;
		// var v_mail = oIpts[1].value;
		// var v_tel = oIpts[2].value;

		// var postUrl =  "name=" + v_name + "&mail=" + v_mail + "&tel=" + v_tel; 

		// request.open("post","./admin/register.php");
		// request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");		/*必须得有*/
		// request.send(postUrl);

		// request.onreadystatechange = function () {
		// 	if(request.readyState == 4 && request.status == 200){
		// 		var response = request.responseText;
		// 		if(response=="success"){
		// 			console.log("register successful");
		// 			alert("register successful");
		// 			window.location.href = "./comment.php";
		// 		}else{
		// 			console.log(response);
		// 		}
		// 	}
		// }
	}

	// 发表评论
	submit_btn.onclick  = function () {
		// console.log(session_name);
		// 这里会添加一个判断是否已注册
		// if(session_name=="noregister"){
		// 	alert("您尚未注册");
		// 	register_box.style.display = "block";
		// 	return ;
		// }

		// 获取表单信息和当前时间
		var cont = addNew.value;		
		var nowTime = getDate();

		// console.log(session_name);
		if(cont!=""){		// 判断输入内容是否为空
			li_tag++;
		}else{
			alert("评论不能为空！");
			return ;
		}

		// 开始添加评论框
		createMsBox(msgList,132445165,cont,nowTime);

		// nowTime = nowTime.replace(" ------ ","-");

		// 数据传回后台
		// var postUrl = "id=" + li_tag + "&v_name=" + session_name + "&v_content=" + cont + "&date=" + nowTime + "&action=add";
		// request.open("post","./admin/OpComment.php");
		// request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		// request.send(postUrl);

		// request.onreadystatechange = function () {
		// 	if(request.readyState==4){
		// 		if(request.status==200){
		// 			var response = request.responseText;
		// 			if(response=="success"){
		// 				console.log("thank you");
		// 				alert("thank you");
		// 			}else{
		// 				console.log("fail to comment");
		// 			}
		// 		}else{
		// 			alert("error");
		// 		}
		// 	}
		// }


		addNew.value = "";

		// 更新li
		var fir_lis = msgList.children[li_tag];
		fir_lis.index = li_tag;
		// 获取当前li下的相关元素
		var delCtr = fir_lis.getElementsByClassName('delCtr')[0];		// 删除按钮
		var comList = fir_lis.getElementsByClassName('comList')[0];		// 获取二次评论列表
		var secMsg = fir_lis.getElementsByClassName('secMsg')[0];		// 二次评论输入框
		var sec_input = secMsg.getElementsByTagName('input');	

		sec_input[1].onclick = function () {
			// console.log(this.value);
			// 获取表单信息
			var sec_cont = sec_input[0].value;
			var sec_time = getDate();
			if(sec_cont!=""){
				comList.style.display = "block";
				createSecBox(comList,"13690115942",sec_cont,sec_time);
				sec_input[0].value = "";
			}else{
				return ;
			}
		}

		delCtr.onclick = function () {
			// if(host_name!="vincent"){
			// 	alert("只能博主才可以删除评论");
			// 	return ;
			// }
			// 删除评论
			fir_lis.remove();			
			// 把后台数据给删了
			// var postUrl = "id=" + li_tag + "&action=delete"; 
			// request.open("post","./admin/OpComment.php");
			// request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			// request.send(postUrl);

			// request.onreadystatechange = function () {
			// 	if(request.readyState==4){
			// 		if(request.status==200){
			// 			var response = request.responseText;
			// 			if(response=="success"){
			// 				console.log("delete successful");
			// 			}else{
			// 				console.log("fail to delete");
			// 			}
			// 		}else{
			// 			alert("error");
			// 		}
			// 	}
			// }

			li_tag--;
		}

	}
}