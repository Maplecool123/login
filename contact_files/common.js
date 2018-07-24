/*code by kayak,incude：
 * 1. document.ready加载内容，前台各頁面的點擊事件
 * 2. myBrowser(), refuseIE()低版本浏览器拒绝访问，浮窗下载浏览器
 * 3. mainsearch(),头部搜索
 * 4. formatNav(nth),页面主导航点亮
 * 5. httpRequest(),调用hprose接口的封装方法
 * 6. countDown() 构造函数招标倒计时
 */
var mobileReg= '^1(3[0-9]|4[57]|5[0-35-9]|7[0-9]|8[0-9]|9[9])\\d{8}$';
//判定低版浏览器方法
$(function () {
    refuseIE();
    //侧边栏手机号判定
    // $("#advisePhone").kakPhone();
    //头部--搜索框点击事件
    $(".search__list li").click(function () {
        $(".search__list li").each(function () {
            $(this).removeClass();
        });
        $(this).addClass("current");
    });

    //头部搜索方法
    $("#search__btn").on("click",function () {
        mainsearch();
    });

    //侧边显示建议浮窗
	$(".sidebar__li1").click(function () {
	    showModel("adviseView");
	});
	$(".advise-view__close").click(function () {
	    closeModel();
	});

    //判断距离顶部的距离
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 480) {
            $(".sidebar__li4").show();
        } else {
            $(".sidebar__li4").hide();
        }
    });

    //鼠标经过侧边按钮显示下面的内容
    $(".sidebar ul li").hover(function () {
        $(this).find("div").show();
    }, function () {
        $(this).find("div").hide();
    });

    //点击侧边回到顶部的按钮滚到顶部
    $(".sidebar__li4").click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
    });


	//招标公告详情页面选项卡
	$(".der-tab-title li").click(function () {
	    $(".der-tab-title li").each(function () {
	        $(this).removeClass().siblings(".der-tab-content div");
	    });
	    $(this).addClass("current");
	});
});

function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
    }//isIE end
    else{
        if(userAgent.indexOf('2345Explorer') > 0){
            return "2345";
        }
    }

}//myBrowser() end
//以下是调用上面的函数
function refuseIE() {
    if (myBrowser() == "IE55" || myBrowser() == "IE6" || myBrowser() == "IE7" || myBrowser() == "IE8" || myBrowser() == "2345") {
        var html = '';
        html += '<div class="index-mask-bar">';
        html += '<div class="index-mask-bg">';
        html += '<h1>你使用的浏览器版本过低</h1><span>为保证你的采购体验，建议你立即升级浏览器！</span>';
        html += '<span class="mask-img"><i></i>微软已停止对IE6-8的安全更新，你的浏览器可能存在安全风险</span>';
        html += '<div class="browser-bar">';
        html += '<span class="brow-ser1 fl">';
        html += '<i class="firefox"></i>';
        html += '<p>火狐浏览器</p>';
        html += '<a href="http://www.firefox.com.cn/">下载更新</a>';
        html += '</span>';
        html += '<span class="brow-ser2 fr">';
        html += '<i class="goole"></i>';
        html += '<p>谷歌浏览器</p>';
        html += '<a href="https://www.baidu.com/link?url=yhyTnfxy6NTuY4SfFJqUBfww0woNIAWzzlFSl3I8oCLRpIqZ5eL_dPmwxme5u8zODtI2ia-1VtxLSsludWz2pTSS56x-wnSjq45oHYl9LxS&wd=&eqid=bb17ff5d0000229e00000003595e3b5f">下载更新</a>';
        html += '</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $("body").append(html).css({"width": "100%", "height": "100%", "overflow": "hidden"})
    }
}

//前台页面导航指向当前页面
function formatNav(nth) {
    $(".nav").find("a").eq(nth).addClass("current");
}
//前台页面头部搜索
function mainsearch(){
    var search=$('#search-input').val();
    if(search==""){
        new Dialog({
            "type": "notice",
            "content": "您未输入查找信息，请输入信息后再点击搜索按钮",
            "buttons": ["确认"]
        });
        $("#search-input").focus();
        return false;
    }

    if ($('.current').html()=='招标信息')
        window.location.href=$("#bidUrl").val()+"/s/"+search;
    if ($('.current').html()=='中标信息')
        window.location.href=$("#bidWinUrl").val()+"/s/"+search;
    if ($('.current').html()=='找供应商')
        window.location.href=$("#supplierUrl").val()+"/s/"+search;
}

$(function () {
    //招标公告详情页--选项卡
    $(".der-tab-title li").click(function () {
        var index = $(".der-tab-title li").index(this);
        $(this).addClass("current").siblings().removeClass("current");
        $(".der-tab-content>div").eq(index).addClass("select").siblings().removeClass("select");
    });

    //点击提交按钮弹出遮罩层
    $("#step3").click(function(){
        $(".bomb-fail").show();
        $(".problem-box").show();
    });

    $("#close").click(function(){
        $(".bomb-fail").hide();
        $(".problem-box").hide();
    });

    $(".bida-page li").click(function(){
        $(this).siblings().removeClass("grayPage");
        $(this).addClass("grayPage");
    });

    //右侧悬浮框样式



    //找项目详情页放大照片
    $(".info-img img").click(function(){
        var ehtml = '<div class="mask-bar">';
        ehtml += '<div class="mask"></div>';
        ehtml += '<div class="enlarge-img">';
        ehtml += '<img src="'+$(this).attr("src")+'">';
        ehtml += '</div>';
        ehtml += '<div class="engre"></div>';
        ehtml += '</div>';
        $("body").append(ehtml);

        var maxWidth = 850;  // 图片最大宽度
        var maxHeight = 600; // 图片最大高度
        var ratio = 0;  // 缩放比例
        var img = new Image();
        img.src =$(".enlarge-img img").attr("src");
        var w = img.width;
        var h = img.height;
        if(w > maxWidth){
            ratio = maxWidth / w;   // 计算缩放比例
            w = maxWidth;
            $(".enlarge-img img").css("width", maxWidth);
            h = h * ratio;    // 计算等比例缩放后的高度
            $(".enlarge-img img").css("height", h);  // 设定等比例缩放后的高度
        }

        if(h > maxHeight){
            ratio = maxHeight / h; // 计算缩放比例
            h = maxHeight;
            $(".enlarge-img img").css("height", maxHeight);   // 设定实际显示高度
            w = w * ratio;    // 计算等比例缩放后的高度
            $(".enlarge-img img").css("width", w);    // 设定等比例缩放后的高度
        }

        $(".enlarge-img").css({"marginLeft":"-"+(w/2)+"px","left":"50%"});
        $(".enlarge-img").css({"marginTop":"-"+(h/2)+"px","top":"50%"});

        var winW = $(window).width();
        var winH = $(window).height();
        $(".engre").css({"left":(((winW-w-26)/2)+w+23)+"px"});
        $(".engre").css({"top":((winH-h-26)/2-16)+"px"});

    });

    $("body").on("click",".engre",function () {
        $(".mask-bar").remove();
    });

    var uwidth = $("#navUl").width();
    $(".last").css("left", uwidth - 36);

    $(window).resize(function () {
        var uwidth = $("#navUl").width();
        $(".last").css("left", uwidth - 36);
    });

    //物资类别
    $(".material-two li:first").show();
    $(".material-one li").click(function () {
        $(this).addClass("eye").siblings("li").removeClass("eye");
        $(".material-two li").eq($(this).index()).fadeIn().siblings("li").fadeOut();
    });

    // 下拉组件点击事件
    $(".select-like .select-area").click(function () {
        var $optionContent= $(this).nextAll(".select-like__option-content");
        if($optionContent.is(':hidden')){
            $optionContent.show();
        }else {
            $optionContent.hide();
        }
    });

    // 下拉组件option点击事件
    $(".reset li").click(function (e) {
        var $textNode= $(this).parents(".select-like").find("em");
        var $optionContent= $(this).parents(".select-like__option-content");
        $textNode.text($(this).text());
        $textNode.attr("value",$(this).attr("value"));
        $optionContent.hide();
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        return false;
    });

    // 点击任意位置隐藏select
    $(document).click(function(event){
        var _con = $('.area-like');
        if(!_con.is(event.target) && _con.has(event.target).length === 0){
            $('.area-list').hide();
        }
    });

    $(document).click(function(event){
        var _con = $('.state-like');
        if(!_con.is(event.target) && _con.has(event.target).length === 0){
            $('.state-list').hide();
        }
    });
    
    // 招标公告页面 公告日期\倒计时点击事件
    $(".desc-state").click(function () {
    	if($(this).find("i").hasClass("up-arrow")){
    		$(this).find("i").addClass("down-arrow").removeClass("up-arrow");
    	}else{
    		$(this).find("i").addClass("up-arrow").removeClass("down-arrow");
    	}
        if($(".order1").val() == 1){
        	$(".order1").val("0");
        }else{
        	$(".order1").val("1");
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

    //  前台首页登陆页面
    $(".index-login__header li").click(function () {
        $(".index-login__header li").each(function () {
            $(this).removeClass();
            // $("#username").val('');
            // $("#password").val('');
        });
        $(this).addClass("current");
    });

    //招标公告选项卡
    $(".bid-list__header-list li").each(function () {
        $(".bid-list__header-list li").eq(0).addClass("current");
        $(this).click(function () {
            $(".bid-list__header-list li").removeClass("current");
            $(this).addClass("current");
        });
    });


    // 帮助中心--左侧导航：常见问题、我要招标、我要投标、其他问题
    $(".main-left-nav li").click(function(){
        $(".main-left-nav li").each(function(){
            $(this).removeClass();
        });
        $(this).addClass("current-one");
    });

    //找供应商首页 上线时间、成立年份、注册资金
    $(".find-span i").click(function(){
        if($(this).hasClass("arrow-head")){
            $(this).removeClass("arrow-head").addClass("arrow-bottom");
        }else {
            $(this).removeClass("arrow-bottom").addClass("arrow-head");
        }
    });

    //系统公告--概览 左侧导航
    $(".notice-nav li").click(function () {
        $(".notice-nav li").each(function () {
            $(this).removeClass();
        });
        $(this).addClass("current-one");
    });

    $(".news-list-bar li").hover(function () {
        $(".news-list-bar li").each(function () {
            $(this).removeClass();
        });
        $(this).addClass("current-two");
    });


    //密码等级验证
    var pwdNum_regular = "^.{8,20}$";  //密码的正则，8-20位
    var pwdTs_regular = "^[a-z|A-Z|0-9|_|\-|#|;|@|?|<|>|(|)|^|%|&|$|*|\.|,|!|~]{1,90}$";  //密码的正则 只能包含大小写字母、数字以及标点符号（除空格）
    var pwdTt_regular = "^(?![0-9]+$)(?![A-Z]+$)(?![a-z]+$)(?![_|\-|#|;|@|?|<|>|(|)|^|%|&|$|*|\.|,|!|~]+$)[0-9A-Za-z|_|\-|#|;|@|?|<|>|(|)|^|%|&|$|*|\.|,|!|~]{1,90}$";
    var pwd_einfo1 = 0;
    var pwd_einfo2 = 0;
    var pwd_einfo3 = 0;
    $(".password").keyup(function(){
        var regular_val = $(this).val();
        if(regular_val.match(pwdNum_regular)){
            $(".pwd-einfo1").addClass("pwd-einfo-s");
            pwd_einfo1=1;
        }else{
            $(".pwd-einfo1").removeClass("pwd-einfo-s");
            pwd_einfo1=0;
        }
        if(regular_val.match(pwdTs_regular)){
            $(".pwd-einfo2").addClass("pwd-einfo-s");
            pwd_einfo2=1;
        }else{
            $(".pwd-einfo2").removeClass("pwd-einfo-s");
            pwd_einfo2=0;
        }
        if(regular_val.match(pwdTt_regular)){
            $(".pwd-einfo3").addClass("pwd-einfo-s");
            pwd_einfo3=1;
        }else{
            $(".pwd-einfo3").removeClass("pwd-einfo-s");
            pwd_einfo3=0;
        }

        if(pwd_einfo1==1 && pwd_einfo2==1  && pwd_einfo3==1){
            // var strongRegex = new RegExp("^(?=.{12,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
            // var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
            // var enoughRegex = new RegExp("(?=.{8,}).*", "g");
            var strongRegex = new RegExp("(?=.{12,}).*", "g");
            var mediumRegex = new RegExp("(?=.{10,}).*", "g");
            var enoughRegex = new RegExp("(?=.{8,}).*", "g");

            if (false == enoughRegex.test($(this).val())) {
                $(".pwd-einfo-sta").find("span").removeClass();
                $(".pwd-sta").html("");
            }else if (strongRegex.test($(this).val())) {
                $(".pwd-einfo-sta").find("span").removeClass();
                $("#pwd-sta1,#pwd-sta1s").addClass("high");
                $("#pwd-sta2,#pwd-sta2s").addClass("high");
                $("#pwd-sta3,#pwd-sta2s").addClass("high");
                $(".pwd-sta").html("高");
                /*密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 */
            }else if (mediumRegex.test($(this).val())) {
                $(".pwd-einfo-sta").find("span").removeClass();
                $("#pwd-sta1,#pwd-sta1s").addClass("medium");
                $("#pwd-sta2,#pwd-sta2s").addClass("medium");
                $(".pwd-sta").html("中");
                /*密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 */
            }else {
                $(".pwd-einfo-sta").find("span").removeClass();
                $("#pwd-sta1,#pwd-sta1s").addClass("low");
                $(".pwd-sta").html("低");
                /*如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 */
            }
        }else{
            $(".pwd-einfo-sta").find("span").removeClass();
            $(".pwd-sta").html("");
        }
    });


    // 点击分页按钮显示样式
    $(".bida-page li").click(function(){
        $(this).siblings().removeClass("grayPage");
        $(this).addClass("grayPage");
    });


    //点击注册，后弹出遮罩层
    $("#reg").click(function(){
        $(".bomb-fail").show();
        $(".problem-box").show();
    });

    $("#close").click(function(){
        $(".bomb-fail").hide();
        $(".problem-box").hide();
    });

});


//封装的请求方法
function httpRequest(dataJson,succCallBack,errCallBack) {                        
    var controller = dataJson.controller; //获取控制器名
    var method = dataJson.method;  //获取方法名
    var param = dataJson.param;  //传送到后端的参数
	
	var count = 0;														
	var propArr = [];
	for(var key in param){
		count++;
		propArr.push(key);
	}

	var client = new HproseHttpClient(hproseServerUrl+controller, [method]);
	/*根据传的参数最多的数量依次判断*/
	if(count == 0){
		client[method](function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 1){
		client[method](param[propArr[0]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 2){
		client[method](param[propArr[0]],param[propArr[1]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 3){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 4){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 5){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 6){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 7){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 8){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 9){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 10){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 11){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 12){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 13){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 14){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 15){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 16){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 17){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 18){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 19){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 20){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 21){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 22){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 23){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 24){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 25){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 26){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 27){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 28){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 29){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 30){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 31){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 32){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 33){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 34){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 35){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],param[propArr[34]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 36){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],param[propArr[34]],param[propArr[35]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 37){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],param[propArr[34]],param[propArr[35]],param[propArr[36]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 38){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],param[propArr[34]],param[propArr[35]],param[propArr[36]],param[propArr[37]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 39){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],param[propArr[34]],param[propArr[35]],param[propArr[36]],param[propArr[37]],param[propArr[38]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}else if(count == 40){
		client[method](param[propArr[0]],param[propArr[1]],param[propArr[2]],param[propArr[3]],param[propArr[4]],param[propArr[5]],param[propArr[6]],param[propArr[7]],param[propArr[8]],param[propArr[9]],param[propArr[10]],param[propArr[11]],param[propArr[12]],param[propArr[13]],param[propArr[14]],param[propArr[15]],param[propArr[16]],param[propArr[17]],param[propArr[18]],param[propArr[19]],param[propArr[20]],param[propArr[21]],param[propArr[22]],param[propArr[23]],param[propArr[24]],param[propArr[25]],param[propArr[26]],param[propArr[27]],param[propArr[28]],param[propArr[29]],param[propArr[30]],param[propArr[31]],param[propArr[32]],param[propArr[33]],param[propArr[34]],param[propArr[35]],param[propArr[36]],param[propArr[37]],param[propArr[38]],param[propArr[39]],function(result){
		succCallBack(result);
		},  function(name, err) {
				errCallBack(name,err);
			}
		);
	}
}


//招标倒计时
$(function () {
    $.extend({
        /**
         * 倒计时（天、时、分）
         * time:后端返回的日期距离当期当前时间的秒数
         * id:返回的元素ID名称
         **/
        countDown: function (time,id,ontainer) {
            var time = time;
            window.setInterval(function(){
                time--;
                var day=0,
                    hour=0,
                    minute=0,
                    second=0;//时间默认值
                if(time > 0){
                    day = Math.floor(time / (60 * 60 * 24));
                    hour = Math.floor(time / (60 * 60)) - (day * 24);
                    minute = Math.floor(time / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                $("#"+ontainer+id).html(day+"天"+hour+"时"+minute+"分");
            }, 1000);
        }

    });
});


function tip(obj){
	$(obj).attr("title",$(obj).text());
}

//上传附件方法
function addAttach(objname,id,title,size,url){
    var objname_id = "#"+objname + "_id";
    var objname_detail = "#"+objname + "_detail";
    $(objname_id).val(id);
    if(size>1024*1024){
        size = size/1024/1024;
        strsize = size.toFixed(1)+'M';
    }else if(size>1024){
        size = size/1024;
        strsize = size.toFixed(1)+'KB';
    }else{
        strsize = size+'KB';
    }
    $(objname).val(url);

    if (!title && typeof(title)!="undefined"){
        htmlstr = '无名称';
    }else{
        htmlstr = title.substring(0,6);
    }

    htmlstr += '('+strsize+')<a class="chx blue" title="查看" target="_blank" href="'+url+'"  >查看</a><a class="blue" title="删除" onclick=\'removeAttach("'+objname+'");\' >删除</a>';
    $(objname_detail).html(htmlstr);
}

function removeAttach(objname){
    /*清除id为objname_id的input框的值*/
    /*清除id为objname_detail的<span>标签中的html数据*/
    var objname_id = "#"+objname + "_id";
    var objname_detail = "#"+objname + "_detail";
    $(objname_id).val("");
    $(objname_detail).html("");
    $("#adviseAttachSubmit").show();
    $("#adviseAttachId").val('');
}

//打开通用小块加载中遮罩
function beginFullLoad(text) {
    if (text == "" || text == null) text = "数据加载中";
    $("body").append("<div name='loading' class='bg-loading'> <div class='small-loading'><div class='ball-spin-fade-loader'><div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div><div class='small-text'>"+text+"</div></div> </div>");
    $("body").addClass("loading-body");
}
//关闭通用小块加载中遮罩
function endFullLoad() {
    setTimeout(function(){
        $("div[name='loading']").remove();
        $("body").removeClass("loading-body");
    },400);
}

//关闭弹框
function closeModal(id){
    $("#modalMask").hide();
    $("#"+id).hide();
}

//显示弹框
function showModal(id){
    $("#modalMask").show();
    $("#"+id).show();
}

//登录多账户选择JS
$(".ulUser").on("click","ul li",function(){
    $(".ulUser li").removeClass("curr");
    $(this).addClass("curr");
});