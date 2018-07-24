/*code by kayak,incude：
 * 1. 文字限制、输入框限制、判定的方法，详情参看说明文档。
 * 2. 显示弹窗和关闭弹窗方法
 * 3. 地区选择三级联动插件
 * 4. 模态框插件
 * 5. 半角括号替换全角括号，空格替换为空
 */

// 文字限制、输入框限制、判定的方法
$(function () {
    $.extend({
        Substr: function (str,n) {
            if(str=="" || str==null || str==undefined || typeof(str)=="undefined" || !str){
                return str;
            }else{
                var r=/[^\x00-\xff]/g;
                if(str.replace(r,"mm").length<=n){return str;}
                var m=Math.floor(n/2);
                for(var i=m;i<str.length;i++){
                    if(str.substr(0,i).replace(r,"mm").length>=n){
                        return str.substr(0,i)+"...";
                    }
                }
                return str;
            }
        }
    })
});
$(function () {
    jQuery.fn.extend({
        kakNull:function(className,_thisClassName){
            $(this).attr("disabled","disabled");
            this.each(function(){
                $('.'+className).each(function(){
                    $(this).keyup(function(){
                        var Value = $(this).attr("value").replace(/(^\s+)|(\s+$)/g,"");
                        $(this).attr("value",Value);
                        $('.'+className).each(function(){
                            if($(this).attr("value") == ''){
                                $("."+_thisClassName).attr("index","0");
                                return false;
                            }else{
                                $("."+_thisClassName).attr("index","1");
                            }
                        });
                        var Index = $("."+_thisClassName).attr("index");
                        if(Index == "0"){
                            $("."+_thisClassName).attr("disabled","disabled");
                        }else{
                            $("."+_thisClassName).attr("disabled","")
                        }
                    })

                });
            });
        },
        // 只能输入数字 带点
        kakNum:function(){
            var str = /^[0-9]$/g;/*只能以数字开头和结尾,只能输入数字*/
            var str1 = /[^\d.]/g;
            baseTest(str,this,str1);
            return this;
        },
        kakNum8Dot7:function(){
            var str = /^[0-9]$/g;/*只能以数字开头和结尾,只能输入数字*/
            var str1 = /[^\d]/g;
            baseTest(str,this,str1);
            return this;
        },
        // 只能输入字母
        kakLet:function(){
            var str = /[A-Za-z]$/g;
            var str1 = /[0-9\!\.@#\$%\^&\*\(\)\[\]\\?\\\/\|\-~`\+\=\,\r\n\:\'\"。，；……！￥\{\}]/g;
            baseTest(str,this,str1);
            return this;
        },
        // 手机号
        kakPhone:function(){
            var str = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            var msg = "请正确填写手机号码！";
            blurTest(str,this,msg);
            return this;
        },
        // 电话号码
        kakTel: function () {
            var str = /^(0\d{2,3}-|)\d{8}$/;
            var msg = "请填写正确的电话号码！";
            blurTest(str,this,msg);
            return this;
        },
        // email
        kakEmail:function(){
            var str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var msg = "请正确填写邮箱！";
            blurTest(str,this,msg);
            return this;
        },

        /*键盘事件*/
        kakFreeKeyup:function(option){
            var str = option.regExp;
            var str1 = option.regExpNo;
            baseTest(str,this,str1);
            return this;
        }
    })
})

// 判断所有的键盘按下通用设置
function baseTest(str,baseThis,str1){
    baseThis.each(function(){
        $(this).keyup(function(){
            var _thisValue = $(this).val();
            if (str.test(_thisValue) == false){
                var va = _thisValue.replace(str1,"");
                $(this).val(va);
            }else{
                $(this).val(_thisValue);
            }

        });
    });
}

// 判断所有的失去焦点通用设置
function blurTest(str,baseThis,msg){
    baseThis.each(function(){
        $(this).blur(function(){
            var _thisValue = $(this).val();
            var _thisNum = _thisValue.length-1;
            if(_thisValue == "" || _thisNum =='-1'){
                $(this).val('');
            }else{
                if (str.test(_thisValue) == false){
                    $(this).val("");
                    $(this).attr("placeholder",msg);
                }
            }
        });
    });
}


//显示弹窗
function showModel(id) {
    $('#'+id).show();
    $('body').append("<div class='full-cover'></div>")
}

function closeModel() {
    $(".model").hide();
    $(".full-cover").remove();
}

function hide_pop(id) {
    $('#'+id).hide();
    $(".full-cover").remove();
}

// 模态框插件
// 配置参数使用json内容为{
//    "type":"success",           // 四种状态success\fail\notice\none，默认是success
//    "title":"Im a new Title",   // 标题
//    "content":"contentcontentt",// 内容
//    "buttons":["取消","确认"],   // 按钮用数组格式，一个按钮也要用
//    "confirm": function() {  ， // 回调函数
//    alert("2a")
//    },
//    "countDown":10              // 倒计时关闭
// }
(function ($) {
    var Dialog= function (param) {
        this.param= param;
        var _this_= this;
        var paramDefault={
            "type":"success",
            "buttons":["取消","确认"],
            "countDown": null
        };
        $.extend(paramDefault,this.param);
        // console.log(this.param);
        this.createDialog(this.param);

        var buttons=$(".dialog").find(".dialog__footer").children("a");
        buttons.eq(0).click(function () {
            if(_this_.param.cancel){
                _this_.param.cancel();
            }
            _this_.removeDialog();
        });
        if(buttons.eq(1)){
            buttons.eq(1).click(function () {
                _this_.param.confirm();
                _this_.removeDialog();
            })
        }
        if(this.param.countDown){
            var countDown= this.param.countDown;
            _this_.timeOutClose(countDown);
        }
        $(".dialog__footer").find("a").focus().css("outline-width","0px");
    };
    Dialog.prototype= {
        createDialog: function (param) {
            var body=$("body");
            // 循环按钮数组
            var dialogFooter="";
            param.buttons.forEach(function (value) {
                dialogFooter+='<a href=javascript:void(0)>'+value+'</a>'
            });
            var dialogDom='<div class="dialog">';
            dialogDom+='<div class="dialog__header"></div>';
            dialogDom+='<div class="dialog__content"><div class="dialog__content-layout">';
            if(param.title){
                dialogDom+='<h3>'+param.title+'</h3>';
            }
            if(param.content){
                dialogDom+='<p>'+param.content+'</p>';
            }
            dialogDom+='</div></div>';
            dialogDom+='<div class="dialog__footer">'+dialogFooter+'</div>';
            dialogDom+='</div>';
            body.addClass("noScroll");
            body.append("<div class='full-cover2'></div>");
            body.append(dialogDom);
            $(".dialog__header").addClass("dialog-"+param.type);
            if(param.countDown>0){
                $(".dialog__content").find("p").append('<span class=\"countdown\"></span>')
            }
        },
        removeDialog: function () {
            var body=$("body");
            $('.full-cover2').remove();
            $('.dialog').remove();
            body.removeClass("noScroll");
        },
        timeOutClose: function (outTime) {
            var _self= this;
            outTime= outTime-1;
            $(".dialog__content").find(".countdown").html(outTime);
            if(outTime>0){
                setTimeout(_self.timeOutClose(outTime),1000);
            }
        }
    };
    window['Dialog']= Dialog;
})(jQuery);

//select组件
(function ($) {
    var selectBox= function (selectBox) {
        var _this_      = this;
        this.selectBox  = selectBox;
        this.state= 0;
        this.input      = this.selectBox.find("input");
        this.ul         = this.selectBox.find("ul");
        this.ul.css("width",_this_.input.outerWidth());
        this.input.click(function () {
            _this_.ul.show();
            this.state= 1;
        })
        this.ul.find("li").click(function () {
            var thisValue= $(this).text();
            _this_.input.val(thisValue);
            _this_.ul.hide();
            _this_.state= 0;
        });
        if(this.state=='1'){
            _this_.input.css("borderRadius","")
        }
    };
    selectBox.prototype= {

    };
    selectBox.init= function (selectBoxes) {
        var _this_= this;
        selectBoxes.each(function () {
            new _this_($(this));
        })
    }
    window['selectBox']= selectBox;
})(jQuery);

//替换()为（）,替换空格为空
function nameRep(str){
    //先去掉前后空格
    var str = str.trim();
    //定义替换英文小括号为中文小括号的正则,定义空格的正则
    var reg = /[\(]/g,reg2 = /[\)]/g,reg3 = /\s*/g;
    //替换小括号后的字符串
    newStr = str.replace(reg,"（").replace(reg2,"）").replace(reg3, "");
    return newStr;
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
