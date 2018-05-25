// 返回音频的时长
function getDuration(aduio) {
	var duration = aduio.duration;		// 返回的是以s为单位
	return countTime(duration);
}

// 返回特定小数位的数值
function toFixedNum(num,bit) {
	return parseFloat(num.toFixed(bit));
}

// 返回当前进度时间
function curTime(audio) {
	return countTime(audio.currentTime);
}

// 计算时间格式
function countTime(time) {
	var min = 0;
	var second = 0;
	min = parseInt(time/60);
	second = parseInt(time%60);
	min = min<10?("0"+min) : min;
	second = second<10?("0"+second) :second;
	return min + ":" + second;	
}

// 计算播放进度
function nowRate(audio) {
	var rate = toFixedNum((audio.currentTime/audio.duration)*100,0);
	return rate/100;
}
// 获取样式
function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

// 截取音乐名字长度
function cutName(str) {
	return str.substring(0,12) + "...";
}

// 封装链式动画函数
function animate(obj,json,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var flag = true;			// 默认已完成链式运动
		for(var attr in json){
			if(attr == "opacity"){
				var curAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				var curAttr = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr]-curAttr)/6;			// 缓冲运动
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(curAttr!=json[attr]){
				flag = false;
			}
			// console.log(attr + ": " + curAttr + " ~"  + json[attr]);
			if(attr=="opacity"){
				obj.style.filter = "alpha(opacity:" + (curAttr+speed) + ")";
				obj.style.opacity = (curAttr+speed)/100;
			}else{
				obj.style[attr] = curAttr + speed + "px";
			}
		}
		if(flag){
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
}

window.onload = function () {
	// 获取该页盒子
	var oMedia = document.getElementById('media');
	// 引入header.JS主方法
	header(oMedia);
	// 页面载入效果
	oMedia.style.opacity = 1;
	// 获取所有音频
	var oAudios =  document.getElementsByTagName('audio');
	var mvPlay = document.getElementById('mvPlay');
	
	var play_wrap = document.getElementById('play_wrap');	// 获取音乐盒
	var volCtr_btn = document.getElementById('volCtr_btn');		//获取音量键按钮
	var list_btn = document.getElementById('list_btn');		//获取播放列表按钮
	var lines = document.getElementById('lines');
	var btn_line = lines.getElementsByTagName('div');
	var volCtr = document.getElementById('volCtr');			//获取左侧音量条
	var list_bg = document.getElementById('list_bg');			//获取列表，并将音频放入
	var playList = document.getElementById('play_list');

	for(var i=0;i<oAudios.length;i++){							// 装载音频
		oAudios[i].index = i;
		var oLi = document.createElement('li');
		oLi.textLong = oAudios[i].title.length;
		oLi.innerHTML = "<h3>" + oAudios[i].title + "</h3>";
		play_list.appendChild(oLi);
	}

	// 获取播放列表中的每一项
	var play_lis = playList.getElementsByTagName('li');

	list_btn.hasClick = false;
	list_btn.onclick = function () {
		if(!this.hasClick){				// 判断是否打开播放列表
			// console.log(1);
			btn_line[0].style.width = btn_line[2].style.width = "20px"; 
			btn_line[0].style.transform = "translateY(3px) rotate(-30deg)";
			btn_line[2].style.transform = "translateY(-3px) rotate(30deg)";
			this.style.background = "rgba(234,32,0,0.6)";
			this.style.transform = "scale(1.2,1.2)";
			list_bg.style.display = "block";
			animate(list_bg,{"right":-160,"opacity":100});
			animate(play_wrap,{"left":-30});
			this.hasClick = true;
		}else{
			btn_line[0].style.width = btn_line[2].style.width = "40px"; 
			btn_line[0].style.transform = "";
			btn_line[2].style.transform = "";
			this.style.background = "rgba(199,203,209,0.2)";
			this.style.transform = "";
			animate(list_bg,{"right":10,"opacity":0});
			animate(play_wrap,{"left":0});
			setTimeout(function () {
				list_bg.style.display = "none";
			},500);
			this.hasClick = false;
		}
	}

	volCtr_btn.hasClick = false;
	volCtr_btn.onclick = function () {
		if(!volCtr_btn.hasClick){		//判断左侧音量控制条是否打开
			this.style.background = "rgba(234,32,0,0.6)";
			this.style.transform = "scale(1.2,1.2)";
			volCtr.style.display = "block";
			animate(volCtr,{"left":-40,"opacity":100});
			this.hasClick = true;
		}else{
			this.style.background = "rgba(199,203,209,0.2)";
			this.style.transform = "";
			animate(volCtr,{"left":10,"opacity":0});
			this.hasClick = false;
			setTimeout(function () {
				volCtr.style.display = "none";
			},500);
		}
	}

	// 获取音量条/进度条等
	var vol_bg = document.getElementById('vol_bg');				//总音量条
	var volume = document.getElementById('volume');				//音量条
	var vol_picker = document.getElementById('vol_picker');		//音量滑块
	var vol_show = document.getElementById('vol_show');			//音量显示		与滑块的bottom一样
	var vol_add = document.getElementById('vol_add');			//音量增加键
	var vol_del	= document.getElementById('vol_del');			//音量减少键

	var dur_bg = document.getElementById('dur_bg');				//总进度条
	var process = document.getElementById('process');			//进度条
	var dur_picker = document.getElementById('dur_picker');		//进度滑块
	var showTime = document.getElementById('showTime');			//进度显示
	var nowTime = document.getElementById('nowTime');			//当前时间
	var endTime = document.getElementById('endTime');			//歌曲总长度

	var album = document.getElementById('album');				//获取专辑图像
	var album_pic = album.getElementsByTagName('img')[0];		
	var album_bg = document.getElementById('album_bg');			//专辑背景
	var m_title = document.getElementById('m_title');			//专辑名字

	// 音乐初始化设置
	var aAudio = oAudios[0];

	aAudio.volume = 0.5;		//设置初始化音量
	songPlay(aAudio);			//播放时的各种状态
	changeBg(aAudio.title);		//更换背景
	m_title.innerText = aAudio.title;
	var nowVol = 0.5;			
	vol_show.innerText = 50;	//当前音量
	endTime.innerText = countTime(aAudio.duration);		//当前音乐的时长
	var nowSong = 0;									// 记录当前音乐的序号

	// 背景更换
	function changeBg(title) {
		while(title.indexOf(' ')!=-1){
			title = title.replace(" ","");
		}
		// console.log(title);
		album_bg.style.backgroundImage = "url('./images/music/" + title + ".jpg')";
		album_pic.src = "./images/music/" + title + ".jpg";
		// MV的切换和载入
		mvPlay.src = "./mv/" + title + ".mp4";
		mvPlay.load();
		album_bg.style.opacity = album_pic.style.opacity = 0.7;
		setTimeout(function () {
			album_bg.style.opacity = album_pic.style.opacity = 1;
		},500);
	}

	var timer;		// 更新播放时间
	var timer1;		// 更新进度条

	var vol_timer;		// 音乐显示的延迟消失

	// console.log(play_wrap.offsetTop);
	// console.log(vol_bg.offsetHeight);

	vol_picker.onmousedown = function (ev) {		// 拖动滑条来控制音量
		clearTimeout(vol_timer);
		var oEvent = ev || event;
		var old_Y = oEvent.clientY-102;
		vol_show.style.opacity = 1;
		document.onmousemove = function (ev) {
			var oEvent = ev || event;
			var new_Y = oEvent.clientY-102;
			// var disY = old_Y - new_Y;			// 滑动距离
			// console.log(oEvent.clientY);
			var maxDis = vol_bg.offsetHeight  -4;
			// console.log(disY);
			var num = maxDis - new_Y;
			if(num<0){
				num = 0;
			}
			if(num>maxDis){
				num = maxDis;
				console.log(num);
			}
			volume.style.height =vol_picker.style.bottom =num + "px";
			vol_show.style.bottom = num - 5 + "px";
			vol_show.innerText = Math.ceil(num/5);
			nowVol = aAudio.volume = Math.ceil(num/5)/100;
		}
		document.onmouseup = function () {
			vol_show.style.opacity = 0;
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}

	vol_bg.onclick = function (ev) {			// 通过点击来改变音量
		var oEvent = ev || event;
		vol_show.style.opacity = 1;
		var new_Y = oEvent.clientY - 102;
		var maxDis = vol_bg.offsetHeight - 4;
		var num = maxDis - new_Y;
		if(num<0){
			num = 0;
		}
		if(num>maxDis){
			num = maxDis;
			console.log(num);
		}
		volume.style.height =vol_picker.style.bottom =num + "px";
		vol_show.style.bottom = num - 5 + "px";
		vol_show.innerText = Math.ceil(num/5);
		nowVol = aAudio.volume = Math.ceil(num/5)/100;
		vol_timer = setTimeout(function () {
			vol_show.style.opacity = 0;
		},500);
	}

	var dur_timer ;						// 进度时间的定时器
	// console.log(dur_bg.offsetLeft);
	dur_picker.onmousedown = function (ev) {			// 滑动修改进度
		var oEvent = ev || event;
		clearTimeout(dur_timer);
		clearInterval(timer1);			// 先清除进度条变化的定时器
		var nowPlaytime=0.001;
		var old_X = oEvent.clientX - this.offsetLeft;		// 原位置
		var maxLong = dur_bg.offsetWidth - dur_picker.offsetWidth;
		showTime.style.opacity = 1;
		document.onmousemove = function (ev) {
			var oEvent = ev || event;
			var new_X = oEvent.clientX;
			// console.log(new_X);
			var long = new_X - old_X;
			if(long>maxLong){
				long = maxLong;
			}
			if(long<0){
				long = 0;
			}
			process.style.width = dur_picker.style.left = long + "px";
			showTime.style.left = long - 5 + "px";
			nowPlaytime = (long/maxLong)*aAudio.duration;
			showTime.innerText = nowTime.innerText =  countTime(nowPlaytime);
		}
		document.onmouseup = function () {
			aAudio.currentTime = toFixedNum(nowPlaytime,2);
			dur_timer = setTimeout(function () {
				showTime.style.opacity = 0;
			},500);
			document.onmousemove = null;
			document.onmouseup = null;
		}

	}

	dur_bg.onclick = function (ev) {
		var oEvent = ev || event;
		clearTimeout(dur_timer);
		clearInterval(timer1);
		var nowPlaytime=0.001;
		var maxLong = dur_bg.offsetWidth - dur_picker.offsetWidth;
		showTime.style.opacity = 1;
		var long = oEvent.clientX - play_wrap.offsetLeft - dur_bg.offsetLeft;
		if(long>maxLong){
			long=maxLong;
		}
		process.style.width = dur_picker.style.left = long + "px";
		showTime.style.left = long - 5 + "px";
		nowPlaytime = (long/maxLong)*aAudio.duration;
		showTime.innerText = nowTime.innerText =  countTime(nowPlaytime);
		aAudio.currentTime = toFixedNum(nowPlaytime,2);
		dur_timer = setTimeout(function () {
			showTime.style.opacity = 0;
		},500);
	}



	// 播放时的动画设置		(自行检测音频的状态)
	function songPlay(audio) {
		// console.log(1);
		audio.onplaying = function () {		// 正在播放
			// console.log(111);
			play_lis[aAudio.index].children[0].style.color = "red";
			album_pic.style.animationPlayState = "running";
			clearInterval(timer);
			timer = setInterval(function () {
				nowTime.innerText = curTime(aAudio);
			},500);

			timer1 = setInterval(function () {
				process.style.width = dur_picker.style.left = 620*nowRate(aAudio) + "px";
				showTime.style.left = 620*nowRate(aAudio) - 5 + "px";
				showTime.innerText = curTime(aAudio);
			},500);

		}
		audio.onpause = function () {		// 暂停播放
			album_pic.style.animationPlayState = "paused";
			clearInterval(timer1);
			clearInterval(timer);
		}
		audio.onend = function () {			// 播放结束
			album_pic.style.animationPlayState = "paused";
			clearInterval(timer1);
			clearInterval(timer);
			showTime.innerText = nowTime.innerText = "00:00";
			process.style.width = dur_picker.style.left = "0px"; 
			changeSong("next");
		}
	}

	// 播放控件
	var play = document.getElementById('play');		//播放按钮
	var play_bg = play.children[0];
	var prev = document.getElementById('prev');		//上一个
	var next = document.getElementById('next');		//下一个

	var isPlay = false;				// 当前是否播放


	play.onmousedown = function () {		// 播放 & 暂停按钮
		this.style.boxShadow = "0px 0px 15px rgba(0,0,0,0.6)";
		this.style.transform = "scale(0.9,0.9)";

		play.onmouseup = function () {
			this.style.boxShadow = this.style.transform = "";
			if(!isPlay){		// 播放状态
				play_bg.src = "./images/music/pause.png";
				aAudio.play();
				isPlay = true;
			}else{				// 暂停状态
				play_bg.src = "./images/music/play.png";
				aAudio.pause();
				isPlay = false;
			}
		}
	}
	// 上下首的切换
	prev.onmousedown = next.onmousedown = function () {
		this.style.boxShadow = "0px 0px 15px rgba(0,0,0,0.6)";
		this.style.transform = "scale(0.9,0.9)";
	}

	prev.onmouseup = next.onmouseup = function () {
		this.style.boxShadow = this.style.transform = "";
		// if(isPlay){			// 当前为播放状态
		// 	aAudio.pause();
		// 	isPlay = false;
		// }
		changeSong(this.id);
	}
	// 停止播放
	function stopPlay(audio) {
		album_pic.style.animationPlayState = "paused";
		play_lis[aAudio.index].children[0].style.color = "gray";
		clearInterval(timer);
		clearInterval(timer1);
		audio.load();
		play_bg.src = "./images/music/play.png";
		showTime.innerText = nowTime.innerText = "00:00";
		process.style.width = dur_picker.style.left = "0px"; 
	}

	// 换歌
	function changeSong(id) {
		var isContinue ;
		nowSong = aAudio.index;
		if(!aAudio.paused){
			isContinue = true;
		}else{
			isContinue = false;
			aAudio.currentTime = 0;
		}
		stopPlay(aAudio);
		if(id=="prev"){		// 上一首
			nowSong--;
			if(nowSong<0){
				nowSong = oAudios.length-1;
			}
		}else if(id=="next"){
			nowSong++;
			if(nowSong>oAudios.length-1){
				nowSong = 0;
			}
		}
		// 再次初始化音频信息
		aAudio = oAudios[nowSong];
		changeBg(aAudio.title);
		songPlay(aAudio);
		m_title = aAudio.title;
		endTime.innerText = countTime(aAudio.duration);
		if(isContinue){
			aAudio.play();
			play_bg.src = "./images/music/pause.png";
		}
	}

	// 给每个li添加事件
	// var play_lis = playList.children;
	// var play_lis = playList.getElementsByTagName('li');
	for(var i =0; i<play_lis.length;i++){
		play_lis[i].index = i;
		play_lis[i].onmousemove = function () {			// 鼠标滑过的时候显示歌名全部
			var ah3 = this.children[0];
			ah3.style.transition = "1.5s";
			ah3.style.width = 151 + (this.textLong-15)*10 + "px";
			ah3.style.left = - (this.textLong-15)*10 + "px";
			// clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				ah3.style.width = 151 + "px";
				ah3.style.left = 0 + "px";
			},1500);
		}
		play_lis[i].onclick = function () {
			if(nowSong == this.index){	// 如果选回当前的歌曲则更改状态
				if(isPlay){		// 若正在播放则暂停
					aAudio.pause();
				}else{
					aAudio.play();
				}
			}else{				// 切换另一首歌
				aAudio.pause();
				stopPlay(aAudio);
				aAudio = oAudios[this.index];
				nowSong = this.index;
				changeBg(aAudio.title);
				songPlay(aAudio);
				m_title = aAudio.title;
				endTime.innerText = countTime(aAudio.duration);
				aAudio.play();
				isPlay = true;
			}
		}
	}

	// 获取切换MV按钮
	var switchMV = document.getElementById('switchMV');
	var mvBox = document.getElementById('mvBox');
	var mv_ctr = document.getElementById('mv_ctr');
	var mvLine = mv_ctr.children;

	function backStyle(tag) {
		if(tag){		// 打开了MV
			play_wrap.style.filter = "blur(10px)";
			mvBox.style.display = "block";
			mvBox.style.opacity = 1;
			mvBox.style.animation = "mvIn 2s";
			// mvBox.style.transform = "scale(1) rotateX(0deg)";
			mvPlay.play();
		}else{
			play_wrap.style.filter = "";
			// mvBox.style.transform = "scale(0.2,0.2) rotate(360deg)";
			mvBox.style.animation = "mvOut 2s";
			setTimeout(function () {
				mvBox.style.opacity = 0;
				mvBox.style.display = "none";
				switchMV.style.color = "#fff";
			},2000);	
		}
	}

	var hasShow = false;		// 判断当前是否在播放MV

	switchMV.onmousedown = function () {			// 切换MV按钮
		this.style.transform = "scale(0.8,0.8)";
		this.onmouseup = function () {
			this.style.transform = "";
			this.style.color = "red";
			// 暂停当前音乐
			if(isPlay){
				aAudio.pause();			
				isPlay = false;
				play_bg.src = "./images/music/play.png";
			}
			// 修改背后模板样式		
			hasShow = true;
			backStyle(hasShow);
		}
	}

	mv_ctr.onmouseover = function () {				
		mvLine[0].style.transform = "translateY(10px) rotate(30deg)";
		mvLine[1].style.transform = "translateY(-4px) rotate(-30deg)";
		this.style.background = "red";
	}
	mv_ctr.onclick = function () {			// 关闭MV
		hasShow = false;
		mvPlay.pause();
		backStyle(hasShow);
	}
	mv_ctr.onmouseout = function () {
		mvLine[0].style.transform = mvLine[1].style.transform = "";
		this.style.background = "rgba(199,203,209,0.2)";
	}


}