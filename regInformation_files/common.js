if (typeof (ddaccordion) != 'undefined') {
	//折叠初始化
	ddaccordion.init({
        headerclass: "expandable",
        contentclass: "categoryitems",
        revealtype: "click",
        mouseoverdelay: 500,
        collapseprev: true,
        defaultexpanded: [],
        onemustopen: false,
        animatedefault: false,
        persiststate: true,
        toggleclass: ["", "openheader"],
        animatespeed: "fast",
        onopenclose: function (header, index, state, isuseractivated) { }
    });
    ddaccordion.init({
        headerclass: "subexpandable",
        contentclass: "subcategoryitems",
        revealtype: "click",
        mouseoverdelay: 200,
        collapseprev: true,
        defaultexpanded: [],
        toggleclass: ["opensubheader", "closedsubheader"],
        animatespeed: "fast",
        oninit: function (headers, expandedindices) {
            $(".categoryitems").hide();
            $(".openheader").removeClass("openheader");
            var title = $(".info_nav_top").attr("index");
            ddaccordingchange(title);
        }
    });
}
//audio
function autoPlay(audioid, embedid) {
	try { document.getElementById(audioid).play(); }
	catch (e) { document.getElementById(embedid).play(); }
}



//折叠点击
function ddaccordingchange(title) {
	var index = 0;
	//var index2 = 0;
	if (title != "" && title != undefined) {
		$(".info_nav_top").prop("class", "click_info");
		$("a.liorge").removeClass("liorge");
		if (title.indexOf("|") > -1) {
			var title1 = title.split('|')[0];
			var title2 = title.split('|')[1];
			var title3 = title.split('|')[2];
			var $a = $("ul li a[index='" + title1 + "|" + title2 + "']");
			$a.addClass("liorge");
			index = $(".categoryitems").index(($a).parent().parent());
			$(".categoryitems:eq(" + index + ")").show();
			$(".menuheader:eq(" + index + ")").addClass("leftchose openheader");
			if (title3 != undefined) {
				$a.siblings("ul").show();
				$a.siblings("ul").find("li a").eq(title3).addClass("bluestrong");
			}
		} else {
			$("ul li a[title='" + title + "']").addClass("liorge");
			index = $(".categoryitems").index($("ul.categoryitems li a[index='" + title + "']").parent().parent());
			$(".categoryitems:eq(" + index + ")").show();
			$(".menuheader:eq(" + index + ")").addClass("leftchose openheader");
		}
	}
}
//弹出框
function show_pop(pop_id, need_bg) {
    $('#dv_pop6 a').show();
	if (need_bg) { showBg();}
	var width = $("#" + pop_id).width();
	$("#" + pop_id).css({ "width": width, "margin-left": -width / 2, "top": $(window).scrollTop() + 100 }).show();
	//$("#"+pop_id).css({"width":width,"margin-left":-width/2,"position":"fixed","top":5}).show();
}
function hide_pop() {
	closeBg();
	$(".dialog_eg").hide();
}

function hide_popid(pop_id) {
	closeBg();
	$("#" + pop_id).hide();
}
//遮罩层
function showBg() {
	var bH = document.body.scrollHeight
	var cH = window.screen.height;
	if (bH < cH) bH = cH;
	$("#fullbg").css({ height: bH, display: "block" });
}
//关闭灰色JS遮罩层和操作窗口
function closeBg() {
	$("#fullbg").css("display", "none");
	//融资申请页面 关闭 申请融资提示窗口；
	$(".positin").hide();

}
//融资申请遮罩层  09.20
$(document).ready(function(){
	$(".positin").hide();
})
function showMask(){
	$(".positin").show();
	$("#fullbg").css("display", "block");
}



$(document).ready(function () {
	/*bar*/
	$(".Bar div span").each(function (e) {
		var dw = parseFloat($(this).html());
		if (dw < 33) {
			$(this).parent("div").css({ "width": dw + "%", "background-color": "red" });
		}
		else if (dw > 66) {
			$(this).parent("div").css({ "background-color": "green", "width": dw + "%" });
		}
		else {
			$(this).parent("div").css({ "background-color": "#ff6600", "width": dw + "%" });
		}
	})
	/*ddaccording*/
	/*$(".menuheader ul li a").click(function(){
		ddaccordingchange($(this).attr("index"));
	})
	$(".categoryitems li a").click(function(){
		ddaccordingchange($(this).attr("index"));
	})*/
	/*select*/
	var flag = false;
	$(".tag_select").click(function () {
		flag = true; $(".tag_options").hide();
		$(this).siblings(".tag_options").show(10, function () { flag = false; });
	});
	$(".tag_options li").click(function (e) {
		$(this).parents("ul").siblings(".tag_select").attr('value', $(this).attr('value')).html(($(this).text()));

		$(this).parents("ul").hide(10);
		//alert($(this).val());
	});
	$("html").bind("click", function () {
		var isShow = false;
		if (!flag) {
			$('.tag_options').each(function () {
                if ($(this).hasClass("show")) { isShow = true; $(this).removeClass("show"); }
            });
			//console.info(isShow);
			if (!isShow) { $(".tag_options").hide(10); }
		}
	})

	/*checkbox*/
	$(".chx_list input[type=checkbox]").click(function (e) {
		if ($(this).is(":checked")) { $(this).parents("label").addClass("f_b"); }
		else { $(this).parents("label").removeClass("f_b"); }
	})

	/*slide*/
	$(".shen_s_d").click(function (e) {
		var h = $("#div_show .out-table").height();
		if ($(this).hasClass("g_n")) { $("#div_show").animate({ "height": "0px" }, 500); $(this).removeClass("g_n").html("展开"); }
		else { $('body,html').animate({ scrollTop: h + 50 }, 500); $("#div_show").animate({ "height": h + "px" }, 500); $(this).addClass("g_n").html("收起"); }
	});
	/*select-x*/
	var w = 16 + (($(".mod-leftx").width() > $(".mod-leftx .tag_options").width()) ? $(".mod-leftx").width() : $(".mod-leftx .tag_options").width());
	if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
		if ($(".mod-leftx .tag_select").html() != null && typeof ($(".mod-leftx .tag_select").html()) != 'undefined') {
			var maxlength = $(".mod-leftx .tag_select").html().toString().length;
			$(".mod-leftx .tag_options li").each(function (index, element) {
				if ($(this).html().toString().length > maxlength) maxlength = $(this).html().toString().length;
			});
			w = maxlength * 15 + 30;
		}
	}
	//w=$(".mod-leftx .tag_select").html().length*15+30;
	$(".mod-leftx").width(w);
	$(".mod-leftx .tag_options").width(w - 1);
	/*delete row*/
	$(".liebiao a[title='删除']").click(function (e) {
		$(this).parent("td").parent("tr").remove();
	})

})

function change_stage() { //alert($(".liebiao input:checked").eq(1).html());
	$(".liebiao input:checked").parents("td").siblings(".td_reply").find("img").attr("src", "images/mail_read.png");
}

function delete_td() {
	$(".liebiao input:checked").parents("tr").remove();
}

function delete_tr() {
	$(this).parent("td").parent("tr").remove();
}

/**
 * 截取字符串
 * @param {str} 需要截取的原字符串
 * @param {num} 需要截取的字符数目
 * @return {string}
 */
function getSubstr(str, num) {
	//判断不是null
	if (!str && typeof (str) != "undefined" && str != 0) {
		return '';
	}
	if (str.length < num) return str;
	try {
		return (str.substr(0, num) + "…")
	}
	catch (e) {
		return 'error';
	}
}


//打开遮罩
function beginLoadMask(text) {
	var h = $("html").height();
	if (document.body.scrollHeight > h) h = document.body.scrollHeight;
	if (text == "" || text == null) text = "Loading...";
	$("body").append("<div style='height:" + h + "px' id='loading-mask'></div><div id='loading'>" + text + "</div>");
}
//关闭遮罩
function endLoadMask() {
	$("#loading-mask").remove();
	$("#loading").remove();
}
//金额格式化
function getAmount(e) {
	try {
		if (e.indexOf(".") == -1) {
			return e + ".00";
		}
		else {
			var array = e.split('.');
			return (array[0] + "." + array[1].substr(0, 2));
		}
	}
	catch (ex) {
		return e;
	}
}
//金额格式化2,,
function formatMoney(number,n){
    if(n != 0 ){
        n = (n > 0 && n <= 20) ? n : 2;
    }
    number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var sub_val = number.split(".")[0].split("").reverse();
    var sub_xs = number.split(".")[1];

    var n_html = "";
    for (i = 0; i < sub_val.length; i++){
        n_html += sub_val[i] + ((i + 1) % 3 == 0 && (i + 1) != sub_val.length ? "," : "");
    }
    if(n == 0){
        return n_html.split("").reverse().join("");
    }else{
        return n_html.split("").reverse().join("") + "<i style='font-style: normal'>." + sub_xs +"</i>";
    }
}

//限制输入框只能输入数字 2016/9/19
$.fn.onlyNum = function() {
	$(this).keypress(function (event) {
		var eventObj = event || e;
		var keyCode = eventObj.keyCode || eventObj.which;
		if ((keyCode >= 48 && keyCode <= 57))
			return true;
		else
			return false;
	}).focus(function () {
		this.style.imeMode = 'disabled';
	}).bind("paste", function () {
		var clipboard = window.clipboardData.getData("Text");
		if (/^\d+$/.test(clipboard))
			return true;
		else
			return false;
	});
};

//限制输入框只能输入正数和小数点 2016/9/19
$.fn.onlyNumDot= function () {
    $(this).keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).css("ime-mode", "disabled")
};

//限制输入框只能输入字母
$.fn.onlyAlpha = function () {
	$(this).keypress(function (event) {
		var eventObj = event || e;
		var keyCode = eventObj.keyCode || eventObj.which;
		if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
			return true;
		else
			return false;
	}).focus(function () {
		this.style.imeMode = 'disabled';
	}).bind("paste", function () {
		var clipboard = window.clipboardData.getData("Text");
		if (/^[a-zA-Z]+$/.test(clipboard))
			return true;
		else
			return false;
	});
};



//小数并确定小数点后位数
$.fn.extend({
    decimalSet:function(n){  //小数 n小数点后面位数
        $(this).on('keyup', function (event) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            if(n==1){
                //先把非数字的都替换掉，除了数字和.
                $(this).val($(this).val().replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'));
            }else if(n==2){
                //先把非数字的都替换掉，除了数字和.
                $(this).val($(this).val().replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
            }else if(n==3){
                //先把非数字的都替换掉，除了数字和.
                $(this).val($(this).val().replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'));
            }else if(n==4){
                //先把非数字的都替换掉，除了数字和.
                $(this).val($(this).val().replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'));
            }
            else if(n==7){
                //先把非数字的都替换掉，除了数字和.
                $(this).val($(this).val().replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d).*$/, '$1$2.$3'));
            }
            //当位数大于1位时，如果第一位是0，那么移除第一位
            if($(this).val().length>1){
                if($(this).val().charAt(1)!="."){
                    var nf = $(this).val().charAt(0);
                    if(nf==0){
                        $(this).val($(this).val().substring(1));
                    }
                }
            }
        });
        $(this).on('paste',function(event){
            if(n==2){
                setTimeout(function() {
                    //响应鼠标事件，允许左右方向键移动
                    event = window.event || event;
                    if (event.keyCode == 37 | event.keyCode == 39) {
                        return;
                    }
                    //先把非数字的都替换掉，除了数字和.
                    $(this).val($(this).val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
                }, 100);
            }else if(n==3){
                setTimeout(function() {
                    //响应鼠标事件，允许左右方向键移动
                    event = window.event || event;
                    if (event.keyCode == 37 | event.keyCode == 39) {
                        return;
                    }
                    //先把非数字的都替换掉，除了数字和.
                    $(this).val($(this).val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'));
                }, 100);
            }else if(n==4){
                setTimeout(function() {
                    //响应鼠标事件，允许左右方向键移动
                    event = window.event || event;
                    if (event.keyCode == 37 | event.keyCode == 39) {
                        return;
                    }
                    //先把非数字的都替换掉，除了数字和.
                    $(this).val($(this).val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'));
                }, 100);
            }else if(n==7){
                setTimeout(function() {
                    //响应鼠标事件，允许左右方向键移动
                    event = window.event || event;
                    if (event.keyCode == 37 | event.keyCode == 39) {
                        return;
                    }
                    //先把非数字的都替换掉，除了数字和.
                    $(this).val($(this).val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d).*$/, '$1$2.$3'));
                }, 100);
            }
            //当位数大于1位时，如果第一位是0，那么移除第一位
            if($(this).val().length>1){
                if($(this).val().charAt(1)!="."){
                    var nf = $(this).val().charAt(0);
                    if(nf==0){
                        $(this).val($(this).val().substring(1));
                    }
                }
            }
        });
        $(this).on('blur', function () {
            //最后一位是小数点的话，移除
            $(this).val(($(this).val().replace(/\.$/g, "")));
            //判断如果小数点移除了以后只剩一个0的话，移除
            if($(this).val()==0){
                $(this).val('');
            }
        });
    },
    positiveSet:function(){   //正整数可以等于0,但是如果是多位，但是第一位不能是0
        $(this).on('keyup', function (event) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字
            $(this).val($(this).val().replace(/[^\d]/g, ""));

            //当位数大于1位时，如果第一位是0，那么移除第一位
            if($(this).val().length>1){
                var nf = $(this).val().charAt(0);
                if(nf==0){
                    $(this).val($(this).val().substring(1));
                }
            }
        });
        $(this).on('paste',function(event){
            setTimeout(function() {
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，除了数字
                $(this).val($(this).val().replace(/[^\d]/g, ""));

                //当位数大于1位时，如果第一位是0，那么移除第一位
                if($(this).val().length>1){
                    var nf = $(this).val().charAt(0);
                    if(nf===0){
                        $(this).val($(this).val().substring(1));
                    }
                }
            }, 100);
        });
        $(this).on('blur', function () {
            //判断如果连续两个0的话，移除
            if($(this).val()=="00" || $(this).val()=="000" || $(this).val()=="0000" || $(this).val()=="00000"){
                $(this).val('');
            }
        });
    },
    integerSet:function(){  //正整数大于0
        $(this).on('keyup', function (event) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字
            $(this).val($(this).val().replace(/[^\d]/g, ""));

            //当位数大于1位时，如果第一位是0，那么移除第一位
            if($(this).val().length>1){
                var nf = $(this).val().charAt(0);
                if(nf==0){
                    $(this).val($(this).val().substring(1));
                }
            }
            //如果等于0,直接移除
            if($(this).val()==0){
                $(this).val('');
            }
        });
        $(this).on('paste',function(event){
            setTimeout(function() {
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，除了数字
                $(this).val($(this).val().replace(/[^\d]/g, ""));

                //当位数大于1位时，如果第一位是0，那么移除第一位
                if($(this).val().length>1){
                    var nf = $(this).val().charAt(0);
                    if(nf===0){
                        $(this).val($(this).val().substring(1));
                    }
                }
                //如果等于0,直接移除
                if($(this).val()==0){
                    $(this).val('');
                }
            }, 100);
        });
        $(this).on('blur', function () {
            //判断如果只剩一个0的话，移除
            if($(this).val()=="0" || $(this).val()=="00" || $(this).val()=="000" || $(this).val()=="0000" || $(this).val()=="00000"){
                $(this).val('');
            }
        });
    },
    telSet:function(){  //固话格式，可以输入中线 -
        $(this).on('keyup', function (event) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字
            $(this).val($(this).val().replace(/[^\d-]/g, ""));
        });
        $(this).on('paste',function(event){
            setTimeout(function() {
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，除了数字
                $(this).val($(this).val().replace(/[^\d-]/g, ""));
            }, 100);
        });
        $(this).on('blur', function () {
            //判断如果输入两个0以上，移除
            if($(this).val()=="00" || $(this).val()=="000" || $(this).val()=="0000" || $(this).val()=="00000"){
                $(this).val('');
            }
        });
    },
    mobSet:function(){  //手机格式
        $(this).on('keyup', function (event) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字
            $(this).val($(this).val().replace(/[^\d]/g, ""));

            //当位数大于1位时，如果第一位是0，那么移除第一位
            if($(this).val().length>1){
                var nf = $(this).val().charAt(0);
                if(nf==0){
                    $(this).val($(this).val().substring(1));
                }
            }
        });
        $(this).on('paste',function(event){
            setTimeout(function() {
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，除了数字
                $(this).val($(this).val().replace(/[^\d]/g, ""));

                //当位数大于1位时，如果第一位是0，那么移除第一位
                if($(this).val().length>1){
                    var nf = $(this).val().charAt(0);
                    if(nf==0){
                        $(this).val($(this).val().substring(1));
                    }
                }
            }, 100);
        });
        $(this).on('blur', function () {
            //判断如果输入0以上，移除
            if($(this).val()=="0" || $(this).val()=="00" || $(this).val()=="000" || $(this).val()=="0000" || $(this).val()=="00000"){
                $(this).val('');
            }
        });
    },
    telCode:function(){  //区号 021
        $(this).on('keyup', function (event) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            //先把非数字的都替换掉，除了数字
            $(this).val($(this).val().replace(/[^\d]/g, ""));
        });
        $(this).on('paste',function(event){
            setTimeout(function() {
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，除了数字
                $(this).val($(this).val().replace(/[^\d]/g, ""));
            }, 100);
        });
        $(this).on('blur', function () {
            //判断如果输入两个0以上，移除
            if($(this).val()=="00" || $(this).val()=="000" || $(this).val()=="0000" || $(this).val()=="00000"){
                $(this).val('');
            }
        });
    }

});
/****
 *动态模态框
 *弹出提示框
 "type":"success",           四种状态success\fail\notice\none，默认是success
 "title":"Im a new Title",   标题
 "content":"contentcontentt",内容
 "buttons":["取消","确认"],  按钮用数组格式，一个按钮也要用
 "cancel":function(){        回调函数
	history.go(-1);
},
 "confirm":function(){
	location.reload();
},
 "countDown":10              倒计时关闭

 实例：
 new Dialog({
	"type":"notice",
	"title":"失败",
	"content":"网络异常",
	"buttons":["返回上一页","刷新页面"],
	"cancel":function(){
		history.go(-1);
	},
	"confirm":function(){
		location.reload();
	}
});
 ***/

// 弹窗
(function ($) {
    var Dialog = function (param) {
        this.param = param;
        var _this_ = this;
        var paramDefault = {
            "type": "success",
            "buttons": ["取消", "确认"],
            "countDown": null
        };
        $.extend(paramDefault, this.param);
        // console.log(this.param);
        this.createDialog(this.param);

        var buttons = $(".dialog").find(".dialog__footer").children("a");
        buttons.eq(0).click(function () {
            if (_this_.param.cancel) {
                _this_.param.cancel();
            }
            _this_.removeDialog();
        });
        if (buttons.eq(1)) {
            buttons.eq(1).click(function () {
                _this_.param.confirm();
                _this_.removeDialog();
            })
        }
        if (this.param.countDown) {
            var countDown = this.param.countDown;
            _this_.timeOutClose(countDown);
        }
        $(".dialog__footer").find("a").focus().css("outline-width", "0px");
    };
    Dialog.prototype = {
        createDialog: function (param) {
            var body = $("body");
            // 循环按钮数组
            var dialogFooter = "";
            param.buttons.forEach(function (value) {
                dialogFooter += '<a href="javascript:void(0)">' + value + '</a>'
            });
            var dialogDom = '<div class="dialog">';
            dialogDom += '<div class="dialog__header"></div>';
            dialogDom += '<div class="dialog__content"><div class="dialog__content-layout">';
            if (param.title) {
                dialogDom += '<h3>' + param.title + '</h3>';
            }
            if (param.content) {
                dialogDom += '<p>' + param.content + '</p>';
            }
            dialogDom += '</div></div>';
            dialogDom += '<div class="dialog__footer">' + dialogFooter + '</div>';
            dialogDom += '</div>';
            body.addClass("noScroll");
            body.append("<div class='full-cover-modal'></div>");
            body.append(dialogDom);
            $(".dialog__header").addClass("dialog-" + param.type);
            if (param.countDown > 0) {
                $(".dialog__content").find("p").append('<span class=\"countdown\"></span>')
            }
        },
        removeDialog: function () {
            var body = $("body");
            $('.full-cover-modal').remove();
            $('.dialog').remove();
            body.removeClass("noScroll");
        },
        timeOutClose: function (outTime) {
            var _self = this;
            outTime = outTime - 1;
            $(".dialog__content").find(".countdown").html(outTime);
            if (outTime > 0) {
                setTimeout(_self.timeOutClose(outTime), 1000);
            }
        }
    };
    window['Dialog'] = Dialog;
})(jQuery);




/*分页跳转输入框*/
function keyup(e){
	var tmptxt=$(e).val();
	$(e).val(tmptxt.replace(/\D|^0/g,''));
	$(e).css("ime-mode", "disabled");
}

/*input失效*/
function disInput(){
	$('input').each(function(){
		$(this).attr('disabled',true);
	})
}

/*input变成span*/
function changeInput(){
	//输入框变span
	$("input[type='text']").each(function(){
		$(this).before("<span>"+$(this).val()+"</span>");
		$(this).remove();
		});

	//文本区域变span
     $("textarea").each(function(){
		var stext = $(this).text();
		$(this).before("<span>"+stext+"</span>");
		$(this).remove();
		});

	//select变span
	$("select").each(function(){
		var stext = $(this).find("option:selected").text();
		$(this).before("<span>"+stext+"</span>");
		$(this).remove();
		});
}

/*客服列表页字段长字符截取*/
function iTitle(titles,lengths){
	if (titles === null){
		return "null";
	}else{
		if (!titles || typeof titles !== "undefined" || titles != 0  || titles != ""){
			var ititle = titles;
			if (ititle.length > lengths) {
				ititle = ititle .substring(0,lengths)+"..."
			}
			return ititle;
		}else{
			return titles;
		}
	}
}

/*浮点数相加*/
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m
}

//限制输入框只能输入小数点3位的数字，onkeyup时调用，另外输入框禁止粘贴为 onpaste="return false"
function clearNoNum(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3');//只能输入三个小数
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value= parseFloat(obj.value);
    }
}

function clearNoNum2(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入三个小数
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value= parseFloat(obj.value);
    }
}

//判断是否IE浏览器，如果是再判断版本是否是IE9及以上，现用于供应商融资记录《南通农商银行电票》的签约判断
//by Cao 2017.6.9

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
	var isIE = !!window.ActiveXObject || "ActiveXObject" in window;  //判断是否IE浏览器
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
    }else{
        return "BrowserNo"
    }

}//myBrowser() end

function refuseIE() {
    if (myBrowser() == "IE55"||myBrowser() == "IE6"||myBrowser() == "IE7"||myBrowser() == "IE8"||myBrowser() =="BrowserNo") {
        return "No";
    }else{
    	return "Yes";
	}
}

//关闭浏览器标签页  by Cao 2017.6.9
function closeWindow() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    } else {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}







