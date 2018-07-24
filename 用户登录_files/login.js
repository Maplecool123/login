$(function(){
    if(!navigator.cookieEnabled){
        alert('本网站需要Cookie支持，您的浏览器暂不支持Cookie,请打开支持第三方Cookie选项！');
        return false;
    }

    if ($("input[name=logoutflag]").val()==1){
        logout_home();/*调用logout_home方法*/
    }

    $("#username").keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13){
            $("#btnLogin").click();
            return false;
        }else{
            return true;
        }
    });
    $("#password").keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13){
            $("#btnLogin").click();
            return false;
        }else{
            return true;
        }
    });

    $(".checkbox-group-bar").each(function() {
        /*默认如果checkbox是选中的，那么span就是选中的。*/
        if($(this).find("input").is(':checked') == true) {
            $(this).find(".checkbox-block").addClass("curr");
        } else {
            $(this).find(".checkbox-block").removeClass("curr");
        }

        /*点击选中事件*/
        $(this).click(function(event) {
            /*判断是不是disabled，如果是则不给点击事件*/
            if($(this).find(".checkbox-bar").attr("class") != "checkbox checkbox-disabled") {
                /*判断当前是否选中的抓个状态*/
                if($(this).find("input").is(':checked') == true) {
                    $(this).find(".checkbox-block").removeClass("curr");
                    $(this).find("input").prop("checked", false);
                } else {
                    $(this).find(".checkbox-block").addClass("curr");
                    $(this).find("input").prop("checked", true);
                }
            }
            event.preventDefault();
        });
    });

    //头部点击JS
    $(".land-title li").click(function() {
        $(".land-title li").each(function() {
            $(this).removeClass();
        });
        $(this).addClass("curr-land");
        // $("#username").val('');
        // $("#password").val('');
    });

    /*密码框禁止复制、剪切、粘贴*/
    $("input:password").bind("copy cut paste",function(){
        return false;
    });

    /*所有input框不能输入空格*/
    $(":input").keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 32){
            return false;
        }
    });
});
