$(function(){
	//获取检索值
	$("#searchInput").val(search);
	$("#search-input").val(search);
	$(".search__list li").eq(1).addClass("current").siblings().removeClass("current");
	//招标公告列表页面选项卡
	$(".bid-list__header-list li").click(function () {
		$(this).addClass("current").siblings().removeClass("current");
	    getList(1);
	});
	getList(1);
});

function getList(page){
	var dataJson = {};
	dataJson.controller = "Index";
	dataJson.method = "bidlb";
	param = {};
	param.token= token;
	param.page = page;
	param.search=$("#searchInput").val();
	var order =$('.order1').val();
	if (order=="0"){
		order='finaltime asc';
	}else{
		order='finaltime desc';
	}
	param.order = order;
	param.pageSize = 10;
	param.area=$("em[name=area]").html();
	if(param.area == "全国"){
		param.area ="";
	}
	
	param.state=$("em[name=state]").html();
	if(param.state == "不限"){
		param.state ="";
	}else if(param.state == "中标"){
		param.state="1";
	}else if(param.state == "流标"){
		param.state="2";
	}else if(param.state == "二次招标"){
		param.state="5";
	}
//	param.btype="4";
	param.btype =$(".bid-list__header-list li.current").attr("status");
	dataJson.param = param;
	
	
	httpRequest(dataJson,getBidWinLisCall, errorCall);
}
//获取中标公示列表回调函数
function getBidWinLisCall(data){
	var data = JSON.parse(data);
	console.log(data);
	//判断是否登陆 分页显示
	if($.loginState(data.page,data.lstate,'请登录平台后，查看更多中标信息!')==0){
        return false;
    }
	var res = data.res;
	var html = "";
	if(res.length>0){
		for(var i=0;i<res.length;i++){
	//		if(res[i].isfinancing=="1"){//是否为金融标书
	//			html+='<ul class="bid-list__content-ul bid-list-coloum isFinance clearfix">';
	//		}else{
	//			html+='<ul class="bid-list__content-ul bid-list-coloum clearfix">';
	//		}
			html+='<ul class="bid-list__content-ul bid-list-coloum clearfix">';
			html+='<li> <div>';
			if(res[i].title.length>25){//招标名称
				html+='<p><a href="javascript:void(0)" onclick="ListToDetail('+res[i].id+');">'+res[i].title.substr(0,25)+'...'+'</a></p>';
			}else{
				html+='<p><a href="javascript:void(0)" onclick="ListToDetail('+res[i].id+');">'+res[i].title+'</a></p>';
			}
			if(res[i].bidtype=="1"){
				html+='<span class="bid-list__public">公开招标</span></div></li>';
			}else if(res[i].bidtype=="2"){
				html+='<span class="bid-list__public">不招标</span></div></li>';
			}else if(res[i].bidtype=="3"){
				html+='<span class="bid-list__ask">邀请招标</span></div></li>';
			}
			html+='</div></li>';
			html+='<li><div>';
			if(res[i].company.length>21){//招标单位
				html+='<p><a href="javascript:void(0)">'+res[i].company.substr(0,21)+'...'+'</a></p>';
			}else{
				html+='<p><a href="javascript:void(0)">'+res[i].company+'</a></p>';
			}
			if(res[i].city=='市辖区'||res[i].city=='市辖县'){
				html+='<span class="bid-list__address">'+res[i].province+''+res[i].area+'</span>';
			 }else{
				html+='<span class="bid-list__address">'+res[i].province+''+res[i].city+'</span>';
			}
			html+='</div></li>';
			html+='<li><div><p>'+res[i].finaltime.substring(0,11)+'</p></div></li>';
			var bidUnit=res[i].winsupplier;
			var unitName=bidUnit.split("<br/>");//以<br/>来分割数组
			html+='  <li><div>'+unitName+'</div></li>';
			html+='</ul>';
		}
        $("#pageHtml").show();
        $.fullPageList(data.count,data.page,10,'pageHtml');
	}else{
		html+='<div class="noBid"><i></i><p class="noresult">没有查询到符合条件的结果 ,请<a href="javascript:void(0)" onclick="reQuery();" style="color:#1B83FF;">重新查询</a> </p></div>';
        $("#pageHtml").hide();
	}

	$(".bid-list__content-content").html("");
	$(".bid-list__content-content").html(html);
}

function errorCall(name,err){
	alert(err.message);
}
//页面刷新调用
function reQuery(){
	$("#search-input").val("");
	$("#searchInput").val("");
	$("em[name=area]").html("全国");
	$("em[name=state]").html("不限");
	getList(1);
}


