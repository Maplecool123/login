$(function(){
    $(".center-car").slide({ mainCell:".pic",effect:"leftLoop", autoPlay:true, delayTime:600, interTime:3000, trigger:"click"});

    $(".advert").each(function(){
        $(this).find(".tit").css({"margin-left":-(($(this).find(".tit").width())/2),"left":"50%","margin-top":-(($(this).find(".tit").height())/2),"top":"50%","display":"block"});
	});

    //获取检索值
    $("#searchInput").val($("#s").val());
    $("#search-input").val($("#s").val());
    $(".search__list li").eq(2).addClass("current").siblings().removeClass("current");

    //左侧物质列表
    var material_json= $.material_json['material'];
    $(".nav-bar-ul").html('');
    //绑定一级菜单
    $.each(material_json,function(key){
        $(".nav-bar-ul").append('<li><span>'+key+'</span><i class="white-right"></i></li>');
    });
    //绑定二级菜单
    $(".nav-bar-ul li").each(function(index, element) {
        var mat_name=$(this).find("span").html();
        var strLi="<ul class=\"subnav\">";
        for ( var i=0; i< material_json[mat_name].length; i++){
            strLi+="<li>"+material_json[mat_name][i].name+"</li>";
        }
        strLi+="</ul>";
        $(this).append(strLi);
    });
    //左侧物质列表点击事件
    $(".subnav li").click(function(e){
        var strhtml='["'+$(this).html()+'"]';
        $("#materialClass").val(strhtml);
        var type_child = $(this).html();
        $(".subnav li").removeClass("current");
        $(".nav-bar-ul li").removeClass("current");
        $(this).addClass("current");
        $(this).parents("li").addClass("current");
        var type_main = $(this).parents("li").find("span").html();
        var url = $("#supplierListUrl").val();//typem/"+type_main+"/typec/"+type_child;
        $.cookie("typem", type_main, { expires: 1, path: $("#TOKENPATH").val(),domain: $("#DOMAINZHUJC").val()});
        $.cookie("typec", type_child, { expires: 1, path: $("#TOKENPATH").val(),domain: $("#DOMAINZHUJC").val()});
        window.location.href=url;
    });

    //主导航
    formatNav(3);
    //左侧物质列表
    $(".subnav-bar").hide();
    $(".nav-bar li").hover(function(){
    },function(){
        if(!$(this).hasClass('current')){
            $(this).removeClass();
        }
    });

    //获取 供应商列表
    getList(1);

    //获取 企业风采
    getComp();

	//获取 中标榜单
    billboard(10);
});

	//中标榜单
	function billboard(page) {
	    var dataJson = {};
	    var param = {};
	    param.tokenstr = $("input[name=tokenstr]").val();
	    param.page = page;
	    dataJson.param = param;
	    dataJson.controller = "Index";
	    dataJson.method = "ads_supplier_bid";
	    httpRequest(dataJson,mySuccCallback,myErrCallback);
	}
	//中标榜单 请求成功执行函数，调取数据库
	function mySuccCallback(result){
		var result = JSON.parse(result);
		if(result.res.length>0){
			$.each(result.res,function(index,item){
				if(index+1==1){
					$("#billboard").append('<li class="company-list"><i class="gold home-icon"></i><a href="javascript:supplierIndex('+item.id+')" class="gold-wrap" title="'+item.name+'">'+$.Substr(item.name,20)+'</a></li>')
				}else if(index+1==2){
					$("#billboard").append('<li class="company-list"><i class="silver home-icon"></i><a href="javascript:supplierIndex('+item.id+')" class="gold-wrap" title="'+item.name+'">'+$.Substr(item.name,20)+'</a></li>')
				}else if(index+1==3){
					$("#billboard").append('<li class="company-list"><i class="copper home-icon"></i><a href=javascript:supplierIndex('+item.id+') class="gold-wrap" title="'+item.name+'">'+$.Substr(item.name,20)+'</a></li>')
				}else{
					$("#billboard").append('<li class="company-list"><i class="bidding-order">'+(index+1)+'</i><a href=javascript:supplierIndex('+item.id+') class="gold-wrap" title="'+item.name+'">'+$.Substr(item.name,20)+'</a></li>')
				}
			})
		}
	}
	//中标榜单 请求失败,报错
	function myErrCallback(){
    		("#billboard").html("数据获取失败");
	}

	//企业风采展示
	function getComp(){
		var dataJson = {};
	    var param = {};
	    param.tokenstr = $("input[name=tokenstr]").val();
	    param.type = '供应商风采';
	    dataJson.param = param;
	    dataJson.controller = "Index";
	    dataJson.method = "ads_company";
	    httpRequest(dataJson,companySuccCallback,companyErrCallback);
	}

	//企业风采展示 成功返回
	function companySuccCallback(result){
		var result=JSON.parse(result);
		if(result.count>0){
			$.each(result.res,function(i,item){
				var html='';
				html += '<span class="porate-ml">';
                html += '<a href="javascript:void(0)" onclick="companyDetail('+item.id+')">';
                html += '<img src="'+item.url+'" alt="'+item.title+'">';
                html += '<p>'+$.Substr(item.title,24)+'</p>';
                html += '</a>';
                html += '</span>';

				$(".porate-img").append(html)
			})
		}
	}
	//企业风采展示 错误返回
	function companyErrCallback(){
		(".porate-ml").html("数据获取失败");
	}

	//供应商列表展示
	function getList(page){
        var search = $("#s").val();
	    var materialClass = $('#materialClass').val();
		var sort = $('#sort').val();
		var searchfund_s = $('#searchfund_s').val();
		var searchfund_e = $('#searchfund_e').val();
        var area='["'+$('#area').html()+'"]';
        if (area=='["服务区域"]' || area=='["全国"]' || area=='[]' || area=='["undefined"]')
            area='';

		var dataJson = {};
	    var param = {};
	    param.tokenstr = $("input[name=tokenstr]").val();
	    param.materialclass = materialClass;
	    param.sort = sort;
	    param.searchfund_s = searchfund_s;
	    param.searchfund_e = searchfund_e;
	    param.area = area;
	    param.page = page;
	    param.search = search;
	    dataJson.param = param;
	    dataJson.controller = "Index";
	    dataJson.method = "supplier_list";
	    httpRequest(dataJson,supplierSuccCallback,supplierErrCallback);
	}

	function supplierSuccCallback(result){
		// alert(result);
		var result=JSON.parse(result);
		if(result.success==1){
			if($.loginState(result.page,result.lstate,'请登录平台后，查看更多供应商信息!')==0){
                return false;
            }
			var html='';
			if(result.pagecount>0){
				$.each(result.res,function (i,item){
					html+='<div class="find-comp-bar shadow current">';
					html+='<div class="find-search-bar clearfix">';
					html+='<div class="find-search-title fl">';
		//			 判断是代理商还是厂商
					if(item.type=="2"){
							html+='<i class="home-icon find-red">代理商</i>'
					}else{
							html+='<i class="home-icon find-blue">厂商</i>'
						}
					html+='<a>'+item.name+'</a>';
					html+='</div>';
					html+='<div class="find-btn fr">';
					html+='<a onclick="supplierIndex('+item.id+')">进入企业专区 <i class="home-icon"></i></a>';
					html+='</div>';
					html+='</div>';
					html+='<div class="clear"></div>';
					html+='<div class="find-content-bar clearfix">';
					html+='<div class="find-list-left fl">';
					html+='<div class="find-info  mt25">';
					html+='<span>注册资金：</span>';
					html+='<i>'+item.fund+'万元</i>';
					html+='</div>';
					html+='<div class="find-info">';
					html+='<span>服务区域：</span><i>'+item.supplyarea+'</i>';
					html+='</div>';
					html+='<div class="find-info">';
					html+='<span>主营物资：</span><i>'+item.supplygoods+'</i>';
					html+='</div>';
					html+='<div class="find-info">';
					html+='<span>营业地址：</span><i>'+item.province+' '+item.city+' '+item.area+' '+item.address+'</i>';
					html+='</div>';
					html+='</div>';
					html+='<div class="find-list-right fl">';
					html+='<div class="find-info mt25">';
					html+='<span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span><i>'+item.listname+'</i>';
					html+='</div>';
					html+='<div class="find-info">';
					html+='<span>联系电话：</span><i>'+item.linktel+'</i>';
					html+='</div>';
					html+='<div class="find-info">';
					html+='<span>联系手机：</span><i>'+item.phone+'</i>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
				});
                $.fullPageList(result.pagecount,result.page,10,'pageHtml');
            }else{
                html += '没有查询到符合条件的结果';
                $("#pageHtml").hide();
            }
			$('#supplierList').html(html);
        }
	}
	function supplierErrCallback(){
		("#supplierList").html("数据获取失败");
	}
	

$(function(){
	// 项目所在地--更换地址
    $("#projectLoca").click(function(){
        $(".option-bar").show();
    });

    $(".reset li").click(function (e) {
        $("#projectLoca em").text($(this).text());
        $(".option-bar").hide();
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        return false;
    });

    $(document).click(function(event){
        var _con = $('.area-box');
        if(!_con.is(event.target) && _con.has(event.target).length === 0){
            $('.option-bar').hide();
        }
    });

    //项目状态
    $("#projectStatus").click(function () {
        $(".option-wrap").show();
    });

    $(".cuent").click(function (e) {
        $("#projectStatus em").text($(this).text());
        $(".option-wrap").hide();
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        return false;
    });

    $(document).click(function(event){
        var _con = $('.area-wrap');
        if(!_con.is(event.target) && _con.has(event.target).length === 0){
            $('.option-wrap').hide();
        }
    });
    
 	$(".find-span").click(function(e){
		var sort='';
		sort=0-parseInt($(this).attr('value'));
		$(this).attr('value',0-parseInt($(this).attr('value')));
		if (sort==0)
		{	
			$(".arrow-head").attr("Class","arrow-bottom home-icon");
			$(this).siblings().eq(1).attr('value',1);
			$(this).siblings().eq(2).attr('value',2);
			$(this).siblings().eq(3).attr('value',3);
		}
		 if($(this).hasClass("arrow-head")){
            		$(this).removeClass("arrow-head").addClass("arrow-bottom");
        	}
         
		$('#sort').val(sort);
		getList(1);
//		$('.area-name').children().click(function(e){
//		$('#area').html($(this).html());
//		getList(1);
	});
 	
	$('.option-content li').click(function(){
		getList(1);
	})
});