$(function(){
    beginFullLoad("数据加载中");
    endFullLoad();

    //点击更换验证码
    var phone_c = 0, imgCode_c = 0;
    $("#phone").keyup(function () {
        if($("#phone").val()!=""){
            phone_c = fieldTell('phone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
            if(phone_c==1){
                checkValidPhone();
            }
            // $("#mobileCode").val("");
            // $("#sno").val("");
        }
    });
    //加change 主要是为了鼠标离开后如果没有修改手机号则不清空手机短信验证码的sno
    $("#phone").change(function () {
        if($("#phone").val()!=""){
            phone_c = fieldTell('phone','手机号格式不正确','phone_c',mobileReg,'手机号格式不正确');
            if(phone_c==1){
                checkValidPhone();
            }
            $("#mobileCode").val("");
            $("#sno").val("");
        }
    });
    /*$("#phone").blur(function () {
        if($("#phone").val()==""){
            phone_c = fieldTell('phone','手机号格式不正确','phone_c','^1(3[0-9]|4[57]|5[0-35-9]|7[0-9]|8[0-9])\\d{8}$','手机号格式不正确');
            if(phone_c==1){
                checkValidPhone();
            }
        }
    });*/
    /*验证手机号码是否已被注册*/
    function checkValidPhone(){
        var dataJson = {};
        var param = {};
        param.phone = $("#phone").val();

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "checkRegedPhone";
        httpRequest(dataJson,phoneSuccCallback,phoneErrCallback);
    }
    function phoneSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(!jsonobj.result){
            $("#phoneError").css('display','block').html("该手机号未绑定平台账号");
            phone_c = 2;
        }else{
            $("#phoneError").css('display','block').html('<font style="color:green;">该手机号可以取回密码</font>');
            phone_c = 1;
        }
    }
    function phoneErrCallback() {

    }


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
                    $("#imgCodeError").css('display','block').html('图形验证码错误，请重新输入');
                }else{
                    imgCodeState=0;
                    imgCode_c=1;
                    $("#imgCodeError").css('display','block').html('<font style="color:green;">图形验证码输入正确</font>');
                }
            }
        });
    });
    $("#imgCode").blur(function(){
    	if($(this).val() != ""){
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
	                    $("#imgCodeError").css('display','block').html('图形验证码错误，请重新输入');
	                }else{
	                    imgCodeState=0;
	                    imgCode_c=1;
	                    $("#imgCodeError").css('display','block').html('<font style="color:green;">图形验证码输入正确</font>');
	                }
	            }
	        });
    	}
    });
    $("#imgVerify").click(function(){
        $('#imgCode').val('');
        $("#imgCodeError").css('display','none').html('');
    });
    $("#changeVerify").click(function(){
        $('#imgCode').val('');
        $("#imgCodeError").css('display','none').html('');
    });

    //点击获取手机短信验证码
    $("#mobileCodeBtn").click(function(){
        if(imgCodeState==1){
            $("#imgCode").nextAll("span").css('display','block').html('图形验证码输入错误，请重新输入');
        }else{
            sendSmsCode();
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
            new Dialog({
                "type":"fail",
                "content":jsonobj.info,
                "buttons":["确认"]
            });
            $('#mobileCodeBtn').attr('disabled',false);
            return false;
        }
    }
    function smsErrCallback() {

    }

    //密码重置步骤 第一步
    $("#step1").click(function () {
    	if($("#phone").val() == ""){
    		new Dialog({
                "type":"fail",
                "content":"请输入手机号！",
                "buttons":["确认"]
            });
            return false;
    	}
    	if(phone_c==0){
            new Dialog({
                "type":"fail",
                "content":"手机号码输入不正确！",
                "buttons":["确认"]
            });
            $("#phoneError").css('display','block').html("手机号格式不正确");
            $("#phone").focus();
            return false;
        }else if(phone_c==2){
            new Dialog({
                "type":"fail",
                "content":"该手机号未绑定平台账号",
                "buttons":["确认"]
            });
            $("#phoneError").css('display','block').html("该手机号未绑定平台账号");
            $("#phone").focus();
            return false;
        }
        
    	if($("#imgCode").val() == ""){
    		new Dialog({
                "type":"fail",
                "content":"请输入验证码！",
                "buttons":["确认"]
            });
            return false;
    	}
        if(imgCode_c==0){
            new Dialog({
                "type":"fail",
                "content":"图形验证码错误，请重新输入！",
                "buttons":["确认"]
            });
            $("#imgCode").val('');
            document.getElementById('imgVerify').src=document.getElementById('imgVerify').src+'?'+Math.random();
            $("#imgCodeError").css('display','none').html("");
            $("#imgCode").focus();
            return false;
        }

        /*验证前判断*/
        if($("#sno").val()==''){
            new Dialog({
                "type":"fail",
                "content":"请先点击获取短信验证码",
                "buttons":["确认"]
            });
            return false;
        }
        if($("#mobileCode").val()==''){
            new Dialog({
                "type":"fail",
                "content":"请输入验证码",
                "buttons":["确认"]
            });
            return false;
        }
        /*判断短信验证码是否正确*/
        checkSmsRegCode();

    });

    function checkSmsRegCode(){
        var dataJson = {};
        var param = {};
        param.phone = $("#phone").val();
        param.mobileCode = $("#mobileCode").val();
        param.sno = $("#sno").val();

        dataJson.param = param;
        dataJson.controller = "Base";
        dataJson.method = "checkSmsRegCode";
        httpRequest(dataJson,mcodeSuccCallback,mcodeErrCallback);
    }
    function mcodeSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            $(".modify-bar").removeClass("modify-style1");
            $(".modify-bar").addClass("modify-style2");
            $(".phone-step2").hide();
            $(".reset2").show();
            accountList($("#phone").val(),"","",1,100,1);
            return false;
        }else{
            new Dialog({
                "type":"fail",
//              "content":jsonobj.info,
                "content":"短信验证码错误",
                "buttons":["确认"]
            });
            return false;
        }
    }
    function mcodeErrCallback() {

    }

    //进入密码重置步骤 第二步

    //获取多用户账号列表
    function accountList(phone,password,type,page,pagesize,flag) {
        var dataJson = {};
        var param = {};
        param.phone = phone;
        param.password = password;
        param.type = type;
        param.page = page;
        param.pagesize = pagesize;
        param.flag = flag;
        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "accountList";
        httpRequest(dataJson, accountListSuccCallback, accountListErrCallback);
    }

    function accountListSuccCallback(result){
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            var alist = jsonobj.list;
            var ahtml = '';
            for(var i=0; i<alist.length; i++){
                ahtml += '<li data-username="'+alist[i].username+'" data-id="'+alist[i].id+'"><span>账户名：'+alist[i].username+'</span><p title="'+alist[i].company+'">'+alist[i].company+'</p></li>';
            }
            ahtml += '</ul>';
            $(".ul-user").html(ahtml);
            showModal('chooseUser');
            jQuery(".userColumn").slide({titCell:".hd ul",mainCell:".bd .ulUser",autoPage:true,effect:"leftLoop",autoPlay:false,vis:1});

        }
    }

    function accountListErrCallback(){
        new Dialog({
            "type":"fail",
            "content":"用户信息获取失败，请稍后重试",
            "buttons":["确认"]
        });
    }

    //登录多账户选择JS
    $(".ul-user").on("click","li",function(){
        $(".ul-user li").removeClass("curr");
        $(this).addClass("curr");
    });

    //第二步点击下一步
    $("#step2").click(function () {
        var userData = {};
        userData.username = $(".ul-user li.curr").closest("li").attr("data-username");//合同id
        if(!userData.username){
            new Dialog({
                "type":"notice",
                "content":"请选择需要重置密码的账户！",
                "buttons":["确认"]
            });
            return false;
        }

        $(".modify-bar").removeClass("modify-style2");
        $(".modify-bar").addClass("modify-style3");
        $(".phone-step2").hide();
        $(".reset3").show();
    });



    //点入第三步， 判断密码
    var confirmPassword_c = 0;
    $("#confirmPassword").blur(function(){
        var password = $("#password").val();
        if($(this).val()!=password){
            $(this).next("span").css('display','block').html('与设置的密码不一致，请重新输入');
            confirmPassword_c = 0;
        }else{
            $(this).next("span").css('display','none').html('');
            confirmPassword_c = 1;
        }
    });
    $("#confirmPassword").keyup(function(){
        var password = $("#password").val();
        if($(this).val()!=password){
            $(this).next("span").css('display','block').html('与设置的密码不一致，请重新输入');
            confirmPassword_c = 0;
        }else{
            $(this).next("span").css('display','none').html('');
            confirmPassword_c = 1;
        }
    });
    $("#step3").click(function () {
    	if($("#password").val()==""){
    		new Dialog({
                "type":"fail",
                "content":"请输入新密码",
                "buttons":["确认"]
            });
            $("#password").focus();
            return false;
    	}
        var pwd_s = $(".pwd-einfo").find("p.pwd-einfo-s").length; //判断密码符合要求的个数
        if(pwd_s != 3) {
            new Dialog({
                "type":"fail",
                "content":"密码设置错误",
                "buttons":["确认"]
            });
            $("#password").focus();
            return false;
        }
        if($("#confirmPassword").val()==""){
    		new Dialog({
                "type":"fail",
                "content":"请确认新密码",
                "buttons":["确认"]
            });
            $("#confirmPassword").focus();
            return false;
    	}
        if(confirmPassword_c==0){
            new Dialog({
                "type":"fail",
                "content":"与设置的密码不一致，请重新输入",
                "buttons":["确认"]
            });
            $("#confirmPassword").focus();
            $("#confirmPassword").next("span").css('display','block').html('与设置的密码不一致，请重新输入');
            return false;
        }
        saveGetPassword();
    });
    function saveGetPassword(){
        var dataJson = {};
        var param = {};
        param.phone = $("#phone").val();
        param.password = $("#password").val();
        param.mobileCode = $("#mobileCode").val();
        param.sno = $("#sno").val();
        param.id = $(".ul-user li.curr").closest("li").attr("data-id");

        dataJson.param = param;
        dataJson.controller = "User";
        dataJson.method = "saveGetPassword";
        httpRequest(dataJson,getPwdSuccCallback,getPwdErrCallback);
    }
    function getPwdSuccCallback(result) {
        var jsonobj = JSON.parse(result);
        if(jsonobj.success==1){
            new Dialog({
                "type":"success",
                "content":"重置密码成功",
                "buttons":["登录"],
                "cancel": function() {
                    window.location.href=$("#loginUrl").val();
                }
            });
            return false;
        }else{
            new Dialog({
                "type":"fail",
                "content":jsonobj.info,
                "buttons":["确认"]
            });
            return false;

        }
    }
    function getPwdErrCallback() {

    }
	//收不到验证码
	$(".hit").click(function(){
        new Dialog({
            "type":"notice",
            "content":"若接收不到短信验证码，请致电平台客服！<br>客服联系方式：021-63300237",
            "buttons":["确认"]
        })
    });
});

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
