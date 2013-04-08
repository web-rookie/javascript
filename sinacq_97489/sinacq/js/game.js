/*<<<<<<<<<<<<<<<<<<<<<<<抽奖游戏版块>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
overturn(picList);                                       //运行函数
function overturn(obj){
	var lis = obj.getElementsByTagName("li");
	var childLists = new Array();                 //存放可以点击的所有图片
	var index = new Array();                       //存放中奖的图片的索引
	var count = 0;                                       //抽奖次数计数
	for(var i=0;i<lis.length;i++){
		childLists.push(lis[i].getElementsByTagName("img")[0]);
	}
	for(var i=0;i<childLists.length;i++){
		index.push(i);
	}
	var arr = Random(index,0.33);               //定义中奖百分比
	for(var i=0;i<arr.length;i++){
		childLists[arr[i]].className = "ok"
	}
	for(var i=0;i<childLists.length;i++){
		childLists[i].onclick = function(Number){
			return function(){
				if(count <5){
					if(this.className == "ok"){
						var imgOk = document.createElement("img");
						imgOk.className = "IMG1";
						imgOk.style.height = 0;
						imgOk.style.top = 36 +"px";
						imgOk.src = "images/pic5.jpg";
						this.parentNode.appendChild(imgOk);
						turnning(this,imgOk);
						count++;
						this.onclick = function(){return false;}
					}else{
						var imgNo = document.createElement("img");
						imgNo.className = "IMG1";
						imgNo.style.height = 0;
						imgNo.style.top = 36 +"px";
						imgNo.src = "images/pic8.jpg";
						this.parentNode.appendChild(imgNo);
						turnning(this,imgNo);
						count++;
						this.onclick = function(){return false;}
					}
				}else{
					alert("您今天抽奖的次数已用完！");
				}
				
			}
			
		}(i);
	}
}
/*按一定几率随机出现不重复的中奖图片*/
function Random(Arr,precentage){
	var Len = Arr.length;
	var selected = Math.floor(Len*precentage);
	var arr = new Array();
	for(var i=0;i<selected;i++){
		var len = Arr.length; 
		var Random_number = Math.floor(Math.random()*len);
		arr.push(Arr[Random_number]);
		if(Random_number == 0){
			Arr = Arr.slice(1);
		}else if(Random_number == 1){
			Arr = Arr.slice(0,1).concat(Arr.slice(2));
		}else{
			Arr = Arr.slice(0,Random_number).concat(Arr.slice(Random_number+1));
		}
	}
	return arr;
}
/*鼠标点击翻动效果*/
function turnning(Obj,otherObj){
	var otherTop = parseInt(otherObj.style.top);
	var otherHeight = parseInt(otherObj.style.height);
	if(Obj.height <= 1){
		Obj.style.display = "none";
		otherObj.width= 143;
		otherHeight =otherHeight + 4;
		otherObj.style.height = otherHeight + "px";
		otherTop-=2;
		otherObj.style.top = otherTop + "px";
		if(otherHeight >= 72){
			clearTimeout(t);
			return;
		}
		
	}else{
			Obj.width= 143;
			Obj.height =Obj.height - 4;
			if(Obj.style.top == ""){
				Obj.style.top = 0 +"px";
			}
			var top = parseInt(Obj.style.top);	
			top+=2;
			Obj.style.top = top + "px";
	}
	
	var t= setTimeout(function(){turnning(Obj,otherObj)},1);
}
window.onerror = function(){return true;}    //去除ie6的错误提示框
/*<<<<<<<<<<<<<<<<<<<<<<<测试你的保险生活态度>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
Checked(buttons,divs);  
function Checked(Obj,otherObj){
	var li_list = Obj.getElementsByTagName("li");
	var DIV_list = otherObj.getElementsByTagName("div");
	var div_list = new Array();                                             //存放标签
	var buttonUp_list = new Array();                                   //存放向上的按钮
	var buttonDown_list = new Array();                               //存放向下的按钮
	var showBox_list = new Array();                                   //存放每个标签包含照片的div
	var showBody_list = new Array();                                
	var showPicList_length = new Array();                               //存放每个标签中包含的照片的个数
	var showIMG = document.getElementById("showIMG");     
	var img_list = showIMG.getElementsByTagName("img");    //左侧显示图片的位置
	for(var i=0;i<DIV_list.length;i++){
		if(DIV_list[i].className == "DIV"){                             //取到四个标签放到一个数组中
			div_list.push(DIV_list[i]);
		}else if(DIV_list[i].className == "ButtonUp"){           //取到每个标签中向上的按钮
			buttonUp_list.push(DIV_list[i]);
		}else  if(DIV_list[i].className == "showBox"){           //取到每个标签中放照片的div放到一个数组中
			showBox_list.push(DIV_list[i]);
		}else if(DIV_list[i].className == "showBody"){      
			showBody_list.push(DIV_list[i]);
		}else if(DIV_list[i].className == "ButtonDown"){      //取到每个标签中向下的按钮
			buttonDown_list.push(DIV_list[i]);
		}
	}
	for(var i=0;i<showBox_list.length;i++){
		showPicList_length.push(showBox_list[i].getElementsByTagName("img").length);
	}
/*实现右侧四个标签的切换*/
	for(var i=0;i<li_list.length;i++){                                  
		li_list[i].onclick = function(num){
			return function(){
				for(var j=0;j<li_list.length;j++){
					li_list[j].className = "buttonUnChecked";
				}	
				this.className = "buttonChecked";
				for(var k=0;k<div_list.length;k++){
					div_list[k].style.display = "none";
				}
				div_list[num].style.display = "block";
			}
		}(i);
	}
/*根据图片的数量判断上下滚动的按钮是否出现*/
	for(var i=0;i<showPicList_length.length;i++){
		if(showPicList_length[i] <=3){
			buttonUp_list[i].style.display = "none";
			buttonDown_list[i].style.display = "none";
		}else if(showPicList_length[i] == 4){
			//buttonUp_list[i].style.display = "block";
			buttonDown_list[i].style.display = "block";
		}
	}
/*图片的数量为4时实现图片手动上下滚动显示并判断按钮是否出现*/	
	for(var i=0;i<buttonDown_list.length;i++){
		
		if(buttonDown_list[i].style.display != "none" ){
			buttonDown_list[i].onclick = function(num){
				return function(){
				
					if(showBody_list[num].style.top == ""){showBody_list[num].style.top = 0 +"px";}
					if(parseInt(showBody_list[num].style.top) >= 0){
						toggle(showBody_list[num]);
						this.style.display = "none";
						buttonUp_list[num].style.display = "block"; 
					}
				}
			}(i);
		}
	}
	for(var i=0;i<buttonUp_list.length;i++){
			buttonUp_list[i].onclick = function(num){
				return function(){
					if( parseInt(showBody_list[num].style.top) <= -153){
						toggle1(showBody_list[num]);
						this.style.display = "none";
						buttonDown_list[num].style.display = "block"; 
					}
				}
			}(i);
	}
/*点击右侧图片显示在左侧相应的位置上*/	
	var div_list_child = new Array();
	for(var i=0;i<showBody_list.length;i++){	
		div_list_child[i] = new Array();
		for(var j=0;j<showBody_list[i].getElementsByTagName("img").length;j++){
			div_list_child[i][j]= showBody_list[i].getElementsByTagName("img")[j];
			div_list_child[i][j].onclick = function(num){
				return function(){
					img_list[num].src = this.src;
				}
			}(i);
		}
		
	}	
/*点击左侧图片初始化当前图片*/
	for(var i=0;i<img_list.length;i++){
		img_list[i].onclick = function(num){
			return function(){
				for(var j=0;j<li_list.length;j++){
					li_list[j].className = "buttonUnChecked";
				}	
				li_list[num].className = "buttonChecked";
				for(var k=0;k<div_list.length;k++){
					div_list[k].style.display = "none";
				}
				div_list[num].style.display = "block";
				switch(num){
					case 0:
						this.src = "images1/img1.png";
						break;
					case 1:
						this.src = "images1/img2.png";
						break;
					case 2:
						this.src = "images1/img3.png";
						break;
					case 3:
						this.src = "images1/img4.png";
						break;
					default:
						return false;
				}
			}
		}(i);
	}	
}

function toggle(Obj){
	if(Obj.style.top == ""){
		Obj.style.top = 0+ "px";
	}
	var Top = parseInt(Obj.style.top);
	if(Top <= -153){
		clearTimeout(t);
		return;
	}else{
		Top -=2;
		Obj.style.top = Top + "px";
	}
	var t = setTimeout(function(){toggle(Obj);},1);
}
function toggle1(Obj){
	if(Obj.style.top == ""){
		Obj.style.top = 0+ "px";
	}
	var Top = parseInt(Obj.style.top);
	if(Top >= 0){
		clearTimeout(t);
		return;
	}else{
		Top +=2;
		Obj.style.top = Top + "px";
	}
	var t = setTimeout(function(){toggle1(Obj);},1);
}
/*<<<<<<<<<<<<<<<<<<<<<<<<<<点击草坪送出一朵花>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
var x=0,y=0;
 function Moving(Event){
		Event = Event?Event:window.event;
		var mouse = document.getElementById("mouse");
		var green = document.getElementById("green");
		var fatherTop = getY(green);
		var fatherLeft = getX(green);
		
		if(!!Event.pageX){
				x = Event.pageX-fatherLeft-25;
				y = Event.pageY-fatherTop+35;
		}else{
			if (document.compatMode === "BackCompat") {
				x = document.body.scrollLeft-fatherLeft + Event.clientX-25;
				y = document.body.scrollTop+ Event.clientY-fatherTop+35;
			} else {
				x = document.documentElement.scrollLeft-fatherLeft + Event.clientX-25;
				y = document.documentElement.scrollTop-fatherTop+ Event.clientY+35;
			}
		}
		mouse.style.top = y +"px";
		mouse.style.left = x +"px";
		if(x>=23 && x<=(904-63) && y>=(63)&&y<=(609-23)){
			mouse.style.display = "block";
			green.style.cursor = "pointer";
			green.onclick = function(){
				var flower = document.createElement("img");
				flower.src = "images1/flower.png";
				flower.style.position = "absolute";
				flower.style.top = y + "px";
				flower.style.left = x + "px";
				green.appendChild(flower);
			}
		}else{
			mouse.style.display = "none";
			green.style.cursor = "";
			green.onclick = function(){
				return false;
			}
		}
	} 
 function getX(obj){  
		var left=obj.offsetLeft;    
        var obj=obj.offsetParent;     
        while(obj){     
            left+=obj.offsetLeft;    
			obj= obj.offsetParent			
        }     
        return left;     
    }     
     
    function getY(obj){  
		var top=obj.offsetTop;    
        var obj=obj.offsetParent;     
        while(obj){     
            top+=obj.offsetTop;    
			obj= obj.offsetParent			
        }     
        return top;     
    }   
document.onmousemove = Moving;




