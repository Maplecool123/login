//登录框点击我同意按钮
$(".index-login__span span").click(function(){
	if($("#agree").hasClass("curr")){
		$("#agree").removeClass("curr");
	}else{		
		$("#agree").addClass("curr");
	}
});

//登录判定
//密码框禁止复制、剪切、粘贴
$("input:password").bind("copy cut paste",function(){
   return false;
});

//所有input框不能输入空格
$(":input").keypress(function (e) {
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if (keyCode == 32){
		return false;
	}
});

//在密码框按回车键登录
$("#password").keypress(function (e) {
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if (keyCode == 13){
		$("#login").click();
		return false;
	}else{
		return true;
	}
});

//监听轮播图的宽度

//window.onload=function(){
//	window.onresize = function(){
//     $('.tempWrap').css('width',document.body.clientWidth);
//     $('.pic li').css('width',document.body.clientWidth);
//	   $('.pic li a').css('width',document.body.clientWidth);
//     console.log('轮播图的宽度为：'+$('.tempWrap').width());
//	}
//
//}



