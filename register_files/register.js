$(function(){
    /*初始化页面*/
    $("#phone").val('');
    $("#listName").val('');
    $("#position").val('');
    $("#companyName").val('');
    $("#password").val('');
    $("#confirmPassword").val('');
    $("#imgCode").val('');
    $("#mobileCode").val('');

    /*密码框禁止复制、剪切、粘贴*/
    $("input:password").bind("copy cut paste",function(){
        return false;
    });

    /*获取省*/
    getProvince();
    function getProvince() {
        var dataJson = {};
        var param = {};
        param.pid = 0;
        param.level = 1;

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "getPDAS";
        httpRequest(dataJson,provinceSuccCallback,provinceErrCallback);
    }
    function provinceSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            var phtml = '';
            $.each(jsonobj.arr, function(i,item){
               phtml += '<li code="'+item.code+'" title="'+item.name+'">'+item.name+'</li>'
            });
        }else{
            phtml += '数据获取失败';
        }
        $("#provinceList").html(phtml);
    }
    function provinceErrCallback() {

    }

    //地区点击Input显示下拉
    $(".show-option-area").click(function(e){
        var element = $(this).next("ul").attr("id");
        var level = $(this).next("ul").attr("level");
        area_up(element,level);
        e.stopPropagation();
    });

    //点击下拉外，隐藏地区下拉
    $(document).click(function(event){
        var _con = $('.area-list');
        if(!_con.is(event.target) && _con.has(event.target).length === 0){
            $('.area-list').hide();
        }
    });

    //地区下拉点击下拉方法
    function area_up(element,level){
        var othLevel = 0;
        if(level==2){
            if($("#province").val()==""){
                return false;
            }
        }
        if(level==3){
            if($("#province").val()==""){
                return false;
            }
            if($("#city").val()==""){
                return false;
            }
        }
        $(".area-list:not('#"+element+"')").hide();
        $("ul[id='"+element+"']").toggle();
        $("ul[id='"+element+"'] li").click(function(){
            $(this).parent().prev().val($(this).html());
            $(this).parent().prev().attr("code",$(this).attr("code"));
            $(this).parent().hide();
            var code = $(this).attr("code");
            if(level==1){
                $("#city").val("");
                $("#city").attr("code","");
                $("#area").val("");
                $("#area").attr("code","");
                if(code==71 || code==81 || code==82){
                    $("#cityList").html('');
                }else{
                    othLevel=2;
                    getCity(code,othLevel);
                }
            }else if(level==2){
                $("#area").val("");
                $("#area").attr("code","");
                othLevel=3;
                getArea(code,othLevel);
            }
        })
    }

    //获取市
    function getCity(code,othLevel) {
        var dataJson = {};
        var param = {};
        param.pid = code;
        param.level = othLevel;

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "getPDAS";
        httpRequest(dataJson,citySuccCallback,cityErrCallback);
    }
    function citySuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            var chtml = '';
            $.each(jsonobj.arr, function(i,item){
                chtml += '<li code="'+item.code+'" title="'+item.name+'">'+item.name+'</li>'
            });
        }else{
            chtml += '数据获取失败';
        }
        $("#cityList").html(chtml);
    }
    function cityErrCallback() {

    }

    //获取地区
    function getArea(code,othLevel) {
        var dataJson = {};
        var param = {};
        param.pid = code;
        param.level = othLevel;

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "getPDAS";
        httpRequest(dataJson,areaSuccCallback,areaErrCallback);
    }
    function areaSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            var ahtml = '';
            $.each(jsonobj.arr, function(i,item){
                ahtml += '<li code="'+item.code+'" title="'+item.name+'">'+item.name+'</li>'
            });
        }else{
            ahtml += '数据获取失败';
        }
        $("#areaList").html(ahtml);
    }
    function areaErrCallback() {

    }


    var companytype = 2;
    //切换供应商、采购商 并获取是采购商还是供应商，采购商是1，供应商是2
    $(".reg-a").click(function(){
        var index = $(this).index();
        $(this).find(".type-a img").attr("src",$("#rootUrl").val()+"/Public/image/icon/zhuce2.png").end().siblings().find(".type-a img").attr("src",$("#rootUrl").val()+"/Public/image/icon/zhuce.png");
        $(".pt5:visible").hide();
        $(".pt5").eq(index).show();
        companytype = index;
        if(companytype==0){
            companytype=2;
        }
    });


    //
    // ** 供应商注册开始
    // ** by Cao
    //
    //供应商注册先声明所填字段变量用于最后判断是不是每个选项的值都符合要求,默认都是0
    var phone_c = 0,listName_c = 0,position_c = 0,companyName_c = 0,password_c = 0,confirmPassword_c = 0, imgCode_c = 0, mobileCode_c = 0;

    //供应商注册字段验证
    //手机号验证,电话号码变更时，验证码为空
    $("#phone").keyup(function () {
        phone_c = fieldTell('phone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
        if(phone_c==1){
            checkValidPhone($("#phone").val());
        }else{
            $("#phone").addClass("error-input");
        }
        $("#mobileCode").val("");
        $("#sno").val("");
    });
    $("#phone").blur(function () {
        if($("#phone").val()==""){
            phone_c = fieldTell('phone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
            if(phone_c==1){
                checkValidPhone($("#phone").val());
            }else{
                $("#phone").addClass("error-input");
            }
        }
    });
    /*验证手机号码是否已被注册*/
    function checkValidPhone(phone){
        var dataJson = {};
        var param = {};
        param.phone = phone;

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "checkRegPhone";
        httpRequest(dataJson,phoneSuccCallback,phoneErrCallback);
    }
    function phoneSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(!jsonobj.result){
            $("#phone").addClass("error-input");
            $("#phoneError").css('display','block').html("该手机号已注册！");
            phone_c = 0;
        }else{
            $("#phone").removeClass("error-input");
            $("#phoneError").css('display','block').html('<font style="color:green;">该手机号可以注册</font>');
            phone_c = 1;
        }
    }
    function phoneErrCallback() {

    }

    //联系人姓名
//  $("#listName").blur(function(){
//      listName_c = fieldTell('listName','姓名不能为空','listName_c');
//      if(listName_c==0){
//          $("#listName").addClass("error-input");
//      }else{
//          $("#listName").removeClass("error-input");
//      }
//  });

    //公司名称不能为空
//  $("#companyName").blur(function(){
//      $(this).val((nameRep($(this).val())));
//      companyName_c = fieldTell('companyName','公司名称不能为空','companyName_c');
//      if(companyName_c==0){
//          $("#companyName").addClass("error-input");
//      }else{
//          $("#companyName").removeClass("error-input");
//      }
//  });

    //判断密码是否符合要求
    $("#password").blur(function(){
        var pwd_s = $(".pwd-einfo").find("p.pwd-einfo-s").length; //判断密码符合要求的个数
        if(pwd_s != 3) {
            $("#password").addClass("error-input");
        }else{
            $("#password").removeClass("error-input");
        }
    });

    //判断重复密码
    $("#confirmPassword").blur(function(){
        var password = $("#password").val();
        if($(this).val()!=password){
            $(this).next("span").css('display','block').html('与设置的密码不一致，请重新输入');
            confirmPassword_c = 0;
            $("#confirmPassword").addClass("error-input");
        }else{
            $(this).next("span").css('display','none').html('');
            confirmPassword_c = 1;
            $("#confirmPassword").removeClass("error-input");
        }
    });

    var checkVerifyUrl = $("#checkVerifyUrl").val(); //图片验证码，验证URL
    var imgCodeState = 1;
    //判断图片验证码
    $("#imgCode").keyup(function(){
        $.ajax({
            data: {
                vcode:$(this).val()
            },
            type: "post",
            url: checkVerifyUrl,
            success:function(result){
                if(result!=1){
                    imgCodeState=1;
                    imgCode_c=0;
                    $("#imgCode").addClass("error-input");
                    $("#imgCodeError").css('display','block').html('图形验证码错误，请重新输入');
                }else{
                    imgCodeState=0;
                    imgCode_c=1;
                    $("#imgCode").removeClass("error-input");
                    $("#imgCodeError").css('display','none').html('');
                }
            }
        });
    });
    /*$("#imgCode").blur(function(){
        $.ajax({
            data: {
                vcode:$(this).val()
            },
            type: "post",
            url: checkVerifyUrl,
            success:function(result){
                if(result!=1){
                    imgCodeState=1;
                    imgCode_c=0;
                    $("#imgCode").addClass("error-input");
                    $("#imgCodeError").css('display','block').html('图形验证码错误，请重新输入');
                }else{
                    imgCodeState=0;
                    imgCode_c=1;
                    $("#imgCode").removeClass("error-input");
                    $("#imgCodeError").css('display','none').html('');
                }
            }
        });
    });*/
    $("#imgVerify").click(function(){
        $('#imgCode').val('');
        $("#imgCodeError").css('display','none').html('');
    });


    //手机短信验证码
    $("#mobileCode").blur(function(){
        mobileCode_c = fieldTell('mobileCode','短信验证码错误','mobileCode_c');
        if(mobileCode_c==0){
            $("#mobileCode").addClass("error-input");
        }else{
            $("#mobileCode").removeClass("error-input");
        }
    });
    $("#mobileCode").keyup(function(){
        mobileCode_c = fieldTell('mobileCode','短信验证码错误','mobileCode_c');
        if(mobileCode_c==0){
            $("#mobileCode").addClass("error-input");
        }else{
            $("#mobileCode").removeClass("error-input");
        }
    });

    //点击获取手机短信验证码
    $("#mobileCodeBtn").click(function(){
        if(imgCodeState==1){
            $("#imgCode").nextAll("span").css('display','block').html('图形验证码输入错误，请重新输入');
            $("#imgCode").val('');
            document.getElementById('imgVerify').src=document.getElementById('imgVerify').src+'?'+Math.random();
        }else{
            phone_c = fieldTell('phone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
            if(phone_c == 0){
                $("#phone").focus();
                new Dialog({
                    "type":"fail",
                    "content":"手机号格式不正确",
                    "buttons":["确认"]
                });
                $("#phone").addClass("error-input");
            }else{
                sendSmsCode();
                $("#phone").removeClass("error-input");
            }
        }
    });
    /*发送短信验证码*/
    function sendSmsCode(){
        var dataJson = {};
        var param = {};
        param.timeToken = $("#timeToken").val();
        param.phone = $("#phone").val();

        dataJson.param = param;
        dataJson.controller = "Base";
        dataJson.method = "sendSmsRegCode";
        httpRequest(dataJson,smsSuccCallback,smsErrCallback);
    }
    function smsSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            var iWait=60;
            $("#sno").val(jsonobj.sno);
            $('#mobileCodeBtn').hide();
            $('#mobileCodeBtnNo').show().html(""+(iWait--)+"s后可重新获取");
            var ishowWaitMsg = setInterval(function(){$("#mobileCodeBtnNo").show().html(""+(iWait--)+"s后可重新获取");},1000);
            setTimeout(function(){clearInterval(ishowWaitMsg);$("#mobileCodeBtn").html("重新获取").show();$('#mobileCodeBtnNo').hide();},iWait*1000);
        }else{
            // alert(jsonobj.info);
            new Dialog({
                "type":"notice",
                "content":jsonobj.info,
                "buttons":["确认"]
            });
            $('#mobileCodeBtn').attr('disabled',false);
            return false;
        }
    }
    function smsErrCallback() {

    }

    //判断注册字段选项是否正确
    function fieldTell(idName,strErr,eleAttr,regStr,regErr){
        var thisTag = $("#"+idName);
        var thisValue = $("#"+idName).val();
        if(thisValue==""){
            thisTag.nextAll("span").css('display','block').html(strErr);
            eleAttr = 0;
            return eleAttr;
        }else{
            if(regStr){
                var mobile_regular = new RegExp(regStr);
                if(mobile_regular.test(thisValue)==false){
                    thisTag.nextAll("span").css('display','block').html(regErr);
                    eleAttr = 0;
                    return eleAttr;
                }else{
                    thisTag.nextAll("span").css('display','none').html("");
                    eleAttr = 1;
                    return eleAttr;
                }
            }else{
                thisTag.nextAll("span").css('display','none').html("");
                eleAttr = 1;
                return eleAttr;
            }
        }
    }

    $(".hit").click(function(){
        new Dialog({
            "type":"notice",
            "content":"若接收不到短信验证码，请致电平台客服！<br>客服联系方式：021-63300237",
            "buttons":["确认"]
        })
    });

    //点击供应商注册按钮
    $("#supplierRegBtn").click(function(){
    	if($("#phone").val()==""){
        	$("#phone").addClass("error-input");
        	// alert("手机号码未填写");
            new Dialog({
                "type":"notice",
                "content":"手机号码未填写",
                "buttons":["确认"]
            });
        	$("#phone").focus();
        	return false;
        }
        if(phone_c==0){
            $("#phone").addClass("error-input");
            // alert("手机号格式不正确");
            new Dialog({
                "type":"notice",
                "content":"手机号格式不正确",
                "buttons":["确认"]
            });
            fieldTell('phone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
            $("#phone").focus();
            return;
        }
        if($("#listName").val()==""){
            $("#listName").addClass("error-input");
            // alert("姓名未填写");
            new Dialog({
                "type":"notice",
                "content":"姓名未填写",
                "buttons":["确认"]
            });
            fieldTell('listName','姓名不能为空','listName_c');
            $("#listName").focus();
            return;
        }else{
        	$("#listName").removeClass("error-input");
        	$("#listNameError").html("");
        }
        if($("#companyName").val()==""){
            $("#companyName").addClass("error-input");
            // alert("公司名称未填写");
            new Dialog({
                "type":"notice",
                "content":"公司名称未填写",
                "buttons":["确认"]
            });
            fieldTell('companyName','公司名称不能为空','companyName_c');
            $("#companyName").focus();
            return;
        }else{
        	$("#companyName").removeClass("error-input");
        	$("#companyNameError").html("");
        }
        if($("#password").val()==""){
        	$("#password").addClass("error-input");
        	// alert("密码未设置");
            new Dialog({
                "type":"notice",
                "content":"密码未设置",
                "buttons":["确认"]
            });
        	$("#password").focus();
        	return false;
        }
        var pwd_s = $(".pwd-einfo").find("p.pwd-einfo-s").length; //判断密码符合要求的个数
        if(pwd_s != 3) {
            $("#password").addClass("error-input");
            // alert("密码设置错误");
            new Dialog({
                "type":"notice",
                "content":"密码设置错误",
                "buttons":["确认"]
            });
            $("#password").focus();
            return false;
        }
        if($("#confirmPassword").val()==""){
        	$("#confirmPassword").addClass("error-input");
        	// alert("请输入确认密码");
            new Dialog({
               "type":"notice",
               "content":"请输入确认密码",
               "buttons":["确认"]
            });
        	$("#confirmPassword").focus();
        	return false;
        }
        if(confirmPassword_c==0){
            $("#confirmPassword").addClass("error-input");
            // alert("两次密码输入不一致");
            new Dialog({
                "type":"notice",
                "content":"两次密码输入不一致",
                "buttons":["确认"]
            });
            $("#confirmPassword").focus();
            $("#confirmPassword").next("span").css('display','block').html('与设置的密码不一致，请重新输入');
            return false;
        }
        if(imgCode_c==0){
            $("#imgCode").addClass("error-input");
            $("#imgCode").focus();
            $("#imgCode").nextAll("span").css('display','block').html('图形验证码错误，请重新输入');
            return false;
        }
        if(mobileCode_c==0){
            $("#mobileCode").addClass("error-input");
            $("#mobileCode").focus();
            fieldTell('mobileCode','短信验证码错误','mobileCode_c');
            if($("#mobileCode").val()==""){
            	new Dialog({
	                "type":"fail",
	                "content":"请输入短信验证码",
	                "buttons":["确认"]
	            });
            }
            return false;
        }
        /*请勾选《筑客集采云平台网站用户注册协议》*/
        if(!$("#chxMust").is(":checked")){
            new Dialog({
                "type":"fail",
                "content":"请勾选我同意合作协议及交易规则",
                "buttons":["确认"]
            });
            return false;
        }

        beginFullLoad("数据提交中");
        var dataJson = {};
        var param = {};
        param.companytype = companytype;
        param.phone = $("#phone").val();
        param.password = $("#password").val();
        param.listName = $("#listName").val();
        param.position = $("#position").val();
        param.companyName = $("#companyName").val();
        param.mobileCode = $("#mobileCode").val();
        param.sno = $("#sno").val();

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "registerUser";
        httpRequest(dataJson,regSuccCallback,regErrCallback);
    });
    function regSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==0){
            if(jsonobj.errorcode==118 || jsonobj.errorcode==108){
                $("#mobileCode").focus();
                $("#mobileCode").addClass("error-input");
                $("#mobileCode").nextAll("span").css('display','block').html('短信验证码错误');
            }
            return 0;
        }else{
            /*登录成功*/
            /*如果新获取的token值与原cookie中的不一致，要删除原cookie内容*/
            if(typeof($.cookie($("#TOKENNAME").val()))=="undefined"||$.cookie($("#TOKENNAME").val())==""){
                /*删除原有cookie*/
                if(typeof($.cookie($("#TOKENNAME").val()))!="undefined"&&$.cookie($("#TOKENNAME").val())!=jsonobj.token){
                    oldtokenname = $.cookie($("#TOKENNAME").val());
                    $.cookie($("#TOKENNAME").val(), 			"", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".uid", 		"", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".username", 	"",		{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".listname", 	"", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".companytype", "", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".companyname", "", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".companystate", "", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".adminflag", 	"", 	{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".autharr", 	"",		{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".authids", 	"",		{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".phone", 		"",		{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".id", 		"",		{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                    $.cookie(oldtokenname + ".isfinancing", "",		{ expires: -1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                }

                /*设置cookien内容*/
                $.cookie($("#TOKENNAME").val(), 		 jsonobj.token, 	{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".uid", 		 jsonobj.uid, 		{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".username", 	 jsonobj.username,	{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".listname", 	 jsonobj.listname, 	{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".companytype", jsonobj.companytype, { expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".companyname", jsonobj.companyname, { expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".companystate",jsonobj.companystate, { expires: 1, path:$("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".adminflag", 	 jsonobj.adminflag, { expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".autharr", 	 jsonobj.autharr,	{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".authids", 	 jsonobj.authids,	{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".phone", 		 jsonobj.phone,		{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});
                $.cookie(jsonobj.token + ".isfinancing", jsonobj.isfinancing,{ expires: 1, path: $("#TOKENPATH").val(),domain:$("#DOMAINZHUJC").val()});

            }
            strurl = $("#loginIndexUrl").val();
            document.location=strurl;
        }
        endFullLoad();
    }
    function regErrCallback(result) {

    }
    //************************************************************************
    //
    // ** 采购商注册开始
    // ** by Cao
    //
    //采购商注册字段验证
    
    $("#purCompanyName").keyup(function(){
    	$("#purCompanyName").removeClass("error-input").next("span").remove();
    });
    $("#purGroupName").keyup(function(){
    	$("#purGroupName").removeClass("error-input").next("span").remove();
    });
    $("#pruListName").keyup(function(){
    	$("#pruListName").removeClass("error-input").next("span").remove();
    });
    $("#purPhone").keyup(function () {
        phone_c = fieldTell('purPhone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
        if(phone_c==0){
            $("#purPhone").addClass("error-input");
        }else{
            $("#purPhone").removeClass("error-input");
            checkPurPhone($("#purPhone").val());
        }
    });

    /*采购商验证手机号码是否已被注册*/
    function checkPurPhone(phone){
        var dataJson = {};
        var param = {};
        param.phone = phone;

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "checkRegPhone";
        httpRequest(dataJson,purSuccCallback,purErrCallback);
    }
    function purSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(!jsonobj.result){
            $("#purPhone").addClass("error-input");
            $("#purPhoneError").css('display','block').html("该手机号已注册！");
            phone_c = 2;
        }else{
            $("#purPhone").removeClass("error-input");
            $("#purPhoneError").css('display','block').html('<font style="color:green;">该手机号可以注册</font>');
            phone_c = 1;
        }
    }
    function purErrCallback() {

    }

    //点击采购商注册按钮
    $("#purchaserRegBtn").click(function(){
        if($("#purCompanyName").val()==""){
            new Dialog({
                "type":"notice",
                "content":"公司名称未填写",
                "buttons":["确认"]
            });
            $("#purCompanyName").addClass("error-input");
            $("#purCompanyName").focus();
            $("#purCompanyName").next("span").css('display','block').html('公司名称未填写');
            return false;
        }else{
            $("#purCompanyName").removeClass("error-input");
            $("#purCompanyName").next("span").css('display','none').html('');
        }
        if($("#purGroupName").val()==""){
            new Dialog({
                "type":"notice",
                "content":"所属集团未填写",
                "buttons":["确认"]
            });
            $("#purGroupName").addClass("error-input");
            $("#purGroupName").focus();
            $("#purGroupName").next("span").css('display','block').html('所属集团未填写');
            return false;
        }else{
            $("#purGroupName").removeClass("error-input");
            $("#purGroupName").next("span").css('display','none').html('');
        }
        if($("#province").val()==""){
            // alert("公司地址未填写");
            new Dialog({
                "type":"notice",
                "content":"公司地址未填写",
                "buttons":["确认"]
            });
            $("#province").addClass("error-input");
            $("#address").next("span").css('display','block').html('公司地址未填写');
            return false;
        }else{
            $("#province").removeClass("error-input");
            if($("#province").val()=="台湾省" || $("#province").val()=="香港特别行政区" || $("#province").val()=="澳门特别行政区"){
                if($("#address").val()==""){
                    // alert("公司地址未填写");
                    new Dialog({
                        "type":"notice",
                        "content":"公司地址未填写",
                        "buttons":["确认"]
                    });
                    $("#address").addClass("error-input");
                    $("#address").next("span").css('display','block').html('公司地址未填写');
                    return false;
                }else{
                    $("#address").removeClass("error-input");
                    $("#address").next("span").css('display','none').html('');
                }
            }else{
                if($("#city").val()==""){
                    // alert("公司地址未填写");
                    new Dialog({
                        "type":"notice",
                        "content":"公司地址未填写",
                        "buttons":["确认"]
                    });
                    $("#city").addClass("error-input");
                    $("#address").next("span").css('display','block').html('公司地址未填写');
                    return false;
                }else{
                    $("#city").removeClass("error-input");
                    $("#address").next("span").css('display','none').html('');
                }
                if($("#area").val()==""){
                    // alert("公司地址未填写");
                    new Dialog({
                        "type":"notice",
                        "content":"公司地址未填写",
                        "buttons":["确认"]
                    });
                    $("#area").addClass("error-input");
                    $("#address").next("span").css('display','block').html('公司地址未填写');
                    return false;
                }else{
                    $("#area").removeClass("error-input");
                    $("#address").next("span").css('display','none').html('');
                }
                if($("#address").val()==""){
                    // alert("公司地址未填写");
                    new Dialog({
                        "type":"notice",
                        "content":"公司地址未填写",
                        "buttons":["确认"]
                    });
                    $("#address").addClass("error-input");
                    $("#address").next("span").css('display','block').html('公司地址未填写');
                    return false;
                }else{
                    $("#address").removeClass("error-input");
                    $("#address").next("span").css('display','none').html('');
                }
            }
        }
        var address = $("#province").val() + $("#city").val() + $("#area").val() +$("#address").val();
        if($("#pruListName").val()==""){
            // alert("联系人姓名未填写");
            new Dialog({
                "type":"notice",
                "content":"联系人姓名未填写",
                "buttons":["确认"]
            });
            $("#pruListName").addClass("error-input");
            $("#pruListName").focus();
            $("#pruListName").next("span").css('display','block').html('联系人姓名未填写');
            return false;
        }else{
            $("#pruListName").removeClass("error-input");
            $("#pruListName").next("span").css('display','none').html('');
        }
        if($("#purPosition").val()==""){
            // alert("职务未填写");
            new Dialog({
                "type":"notice",
                "content":"职务未填写",
                "buttons":["确认"]
            });
            $("#purPosition").addClass("error-input");
            $("#purPosition").focus();
            $("#purPosition").next("span").css('display','block').html('职务未填写');
            return false;
        }else{
            $("#purPosition").removeClass("error-input");
            $("#purPosition").next("span").css('display','none').html('');
        }
        if(phone_c==0){
            // alert("手机号码未填写或输入不正确");
            new Dialog({
                "type":"notice",
                "content":"手机号码未填写或输入不正确",
                "buttons":["确认"]
            });
            $("#purPhone").addClass("error-input");
            $("#purPhone").next("span").css('display','block').html('手机号格式不正确');
            $("#purPhone").focus();
            return false;
        }else if(phone_c==2){
            // alert("该手机号已注册！");
            new Dialog({
                "type":"notice",
                "content":"该手机号已注册",
                "buttons":["确认"]
            });
            $("#purPhone").addClass("error-input");
            $("#purPhone").next("span").css('display','block').html('该手机号已注册！');
            $("#purPhone").focus();
            return false;
        }else{
            $("#purPhone").removeClass("error-input");
            $("#purPhone").next("span").css('display','none').html('');
        }
        /*请勾选《筑客集采云平台网站用户注册协议》*/
        if(!$("#purMust").is(":checked")){
            new Dialog({
                "type":"fail",
                "content":"请勾选我同意合作协议及交易规则",
                "buttons":["确认"]
            });
            return false;
        }

        beginFullLoad("数据提交中");
        var dataJson = {};
        var param = {};
        param.company = $("#purCompanyName").val();
        param.groups = $("#purGroupName").val();
        param.listName = $("#pruListName").val();
        param.position = $("#purPosition").val();
        param.phone = $("#purPhone").val();
        param.address = address;

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "regUser";
        httpRequest(dataJson,pregSuccCallback,pregErrCallback);
    });
    function pregSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success == 1){
            new Dialog({
                "type":"success",
                "content":"加入申请提交成功，平台客服会在3个工作日内与您联系！",
                "buttons":["确认"],
                "cancel": function() {
                    window.location.href = $("#indexUrl").val();
                }
            });
        }
        else{
            new Dialog({
                "type":"fail",
                "content":"申请失败，请重新申请",
                "buttons":["确认"],
                "confirm": function() {
                    window.location.reload();
                }
            })
        }
        endFullLoad();
    }
    function pregErrCallback(result) {

    }




    //是否同意协议和规则
    $(".supp-checkbox").each(function(){
        /*默认如果checkbox是选中的，那么span就是选中的。*/
        if($(this).find("input").is(':checked') == true) {
            $(this).find(".supp-purch").addClass("curr");
        }else{
            $(this).find(".supp-purch").removeClass("curr");
        }

        /*点击选中事件*/
        $(this).click(function(event){
            /*判断当前是否选中的抓个状态*/
            if ($(this).find("input").is(':checked') == true) {
                $(this).find(".supp-purch").removeClass("curr");
                $(this).find("input").prop("checked", false);
            } else {
                $(this).find(".supp-purch").addClass("curr");
                $(this).find("input").prop("checked", true);
            }
            event.preventDefault();
        });
    });

});

//供应商和采购商弹出合作协议
$("#supPop").click(function(){
    showModel("dv_pop_sup");
});
$("#purPop").click(function(){
    showModel("dv_pop_pur");
});

function chxMust() {
    $("#chxMust").prop("checked", true);
    $(".supA").addClass("curr");
}

function purMust() {
    $("#purMust").prop("checked", true);
    $(".purA").addClass("curr");
}
