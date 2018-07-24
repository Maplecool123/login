$(function(){
	//获取检索值
	$("#searchInput").val(search);
	$("#search-input").val(search);
	//招标公告列表页面选项卡
	$(".bid-list__header-list li").click(function () {
		$(this).addClass("current").siblings().removeClass("current");
	    getList(1);
	});
	getList(1);
});


function getList(page,order){
	var dataJson = {};
	dataJson.controller = "Index";
	dataJson.method = "zblb";
	param = {};
	param.token= token;
	param.page = page;
//	if(param.page>19){
//		new Dialog({
//		"type":"success",
//		"title":"成功",
//		"content":"请登录平台后，查看更多招标信息！点击<a href='{:U('Index\/login')}' >“登录”</a>或<a href='{:U('Index/register')}' onclick='Register()';>“注册”</a>！",
//		"buttons":["取消","确认"]
//	});
//	alert('请登陆');
//
//	
//	}
	param.search=$("#searchInput").val();
	
	//公告日期  倒计时排序
	var orderval=$('.order1').val();
	if (order=='order1' && orderval==0)//上 正序排序(即：从小到大排序)
	order='a.updatetime asc';
	if (order=='order1' && orderval==1)//下  倒序排序(即：从大到小排序）
	order='a.updatetime desc';
	if (order=='order2' && orderval==0)
	order="a.endtime asc";
	if (order=='order2' && orderval==1)
	order='a.endtime desc';
	
	param.order = order;
	
	param.area=$("em[name=area]").html();
	if(param.area == "全国"){
		param.area ="";
	}
	
	param.state=$("em[name=state]").html();
	if(param.state == "不限"){
		param.state ="";
	}
	param.pagesize = 10;
	param.btype = $(".bid-list__header-list li.current").attr("status");
	dataJson.param = param;
	
	httpRequest(dataJson,getBidListCall, errorCall);
}
//获取招标公示列表回调函数
function getBidListCall(data){
	var data = JSON.parse(data);
	console.log(data);
	//判断是否登陆 分页显示
	if($.loginState(data.page,data.lstate,'请登录平台后，查看更多招标信息！')==0){
        return false;
    }
	var res = data.res;
	var html = "";
	if(res.length>0){
		for(var i=0;i<res.length;i++){
			if(res[i].isfinancing=="1"){//是否金融标书
                if(res[i].apptype=="2"){
                    html+='<ul class="bid-list__content-ul bid-list__item bidList__item isFinance_appType appType clearfix">';
                }else{
                    html+='<ul class="bid-list__content-ul bid-list__item bidList__item only_isFinance clearfix">';
				}
			}else{
                if(res[i].apptype=="2"){
                    html+='<ul class="bid-list__content-ul bid-list__item bidList__item only_appType clearfix">';
                }else{
                    html+='<ul class="bid-list__content-ul bid-list__item bidList__item clearfix">';
                }
            }
			html+='<li> <div>';//招标名称
			if(res[i].title.length>17){
				html+='<p><a href="javascript:void(0)" onclick="ListToDetail('+res[i].id+');">'+res[i].title.substr(0,17)+'...'+'</a></p>';
			}else{
				html+='<p><a href="javascript:void(0)" onclick="ListToDetail('+res[i].id+');">'+res[i].title+'</a></p>';
			}
			if(res[i].bidtype=="1"){
				html+='<span class="bid-list__public">公开</span></div></li>';
			}else if(res[i].bidtype=="2"){
				html+='<span class="bid-list__public">不招标</span></div></li>';
			}else if(res[i].bidtype=="3"){
				html+='<span class="bid-list__ask">邀请</span></div></li>';
			}
			html+='</div></li>';
			html+='<li> <div>';//项目名称
			if(res[i].projectname.length>14){
				html+='<p><a href="javascript:void(0)">'+res[i].projectname.substr(0,14)+'...'+'</a></p>';
			}else{
				html+='<p><a href="javascript:void(0)">'+res[i].projectname+'</a></p>';
			}
			if(res[i].city=='市辖区'||res[i].city=='市辖县'){
				html+='<span class="bid-list__address addr">'+res[i].province+''+res[i].area+'</span>';
			 }else{
				html+='<span class="bid-list__address addr">'+res[i].province+''+res[i].city+'</span>';
			}
			html+='</div></li>';
			if(res[i].companyname.length>17){//招标单位
				html+='<li><div><p><a href="javascript:void(0)">'+res[i].companyname.substr(0,15)+'...'+'</a></p></li></div>';
			}else{
				html+='<li><div><p><a href="javascript:void(0)">'+res[i].companyname+'</a></p></li></div>';//招标单位
			}
			if(res[i].companygroupsname.length>17){//集团单位
				html+='<li><div><p><a href="javascript:void(0)">'+res[i].companygroupsname.substr(0,15)+'...'+'</a></p></li></div>';
			}else{
				html+='<li><div><p><a href="javascript:void(0)">'+res[i].companygroupsname+'</a></p></li></div>';//招标单位
			}
			html+='<li><div><p>'+res[i].checktime.substring(0,10)+'</p></div></li>';//公告日期
			html+='<li><div><p class="bid-list__countdown" id="time'+res[i].id+'">0天0时00分</p></div></li>';//招标倒计时
				if(data.lstate==0 || ($.cookie($("#tokenstr").val()+".companytype")==5 || $.cookie($("#tokenstr").val()+".companytype")==6 || $.cookie($("#tokenstr").val()+".companytype")==7)){  //lstate==1 登录中  0 未登录
					html+='<li><div><p><a href="javascript:void(0)" class="bid-list__button" onclick="ListToDetail('+res[i].id+');">查看</a>';
				}else{
					html+='<li><div><p><a href="javascript:void(0)" class="bid-list__button" style="'+res[i].s_ck+'" onclick="ListToDetail('+res[i].id+');">我要投标</a><a href="javascript:void(0)" class="bid-list__button" style="'+res[i].s_tb+'" onclick="ListToDetail('+res[i].id+');">我要投标</a><a href="javascript:void(0)" class="bid-list_finish" style="'+res[i].s_yj+'" onclick="ListToDetail('+res[i].id+');">已截标</a><a href="javascript:void(0)" class=" bid-list_finish" style="'+res[i].s_yd+'" onclick="ListToDetail('+res[i].id+');">招标结束</a><a href="javascript:void(0)" class="bid-list_finish" style="'+res[i].s_yc+'" onclick="ListToDetail('+res[i].id+');">已撤标</a><a href="javascript:void(0)" class="bid-list__button" style="'+res[i].s_yt+'" onclick="ListToDetail('+res[i].id+');">已投标</a></p>';
				}
			html+='<div class="tender-name"><span class="fl"><i class="home-icon tender-hammer" style="position:relative;top:1px;"></i>投标 <span>'+res[i].bidcount+'</span></span><span class="fr"><i class="home-icon tender-eye" style="position:relative;top:1px;"></i>关注 <span>'+res[i].gzcount+'</span></span></div></div></li>';
			html+='</ul>';

			//倒计时调用
			$.countDown(res[i].difftime,res[i].id,'time');
		}
        $("#pageHtml").show();
        $.fullPageList(data.count,data.page,10,'pageHtml');
	}else{
		html+='<div class="noBid"><i></i><p class="noresult">没有查询到符合条件的结果 ,请 <a href="javascript:void(0)" onclick="reQuery();" style="color:#1B83FF;">重新查询></a> </p></div>';
        $("#pageHtml").hide();
	}

	$(".bid-list__content-content").html(html);
//	$(".bid-list__content-content").append(html);
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