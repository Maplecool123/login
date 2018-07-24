accessid = '';
accesskey = '';
host = '';
policyBase64 = '';
signature = '';
callbackbody = '';
filename = '';
key = '';
expire = 0;
g_object_name = '';
g_object_name_type = '';
now = timestamp = Date.parse(new Date()) / 1000;

function send_request()
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null)
    {
        serverUrl = webServerPhpUrl;
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
};

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length ; i++ )
    {
        if(tt[i].checked)
        {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

function get_signature()
{
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3)
    {
        body = send_request();
        var obj = eval ("(" + body + ")");
        host = obj['host'];
        policyBase64 = obj['policy'];
        accessid = obj['accessid'];
        signature = obj['signature'];
        expire = parseInt(obj['expire']);
        callbackbody = obj['callback'];
        key = obj['dir'];
        return true;
    }
    return false;
};

function delThis(n) {
    n.parents("p").remove();
}

function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.');
    suffix = '';
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{
    suffix = get_suffix(filename);
    g_object_name = key + random_string(10) + suffix;
    return ''
}

function get_uploaded_object_name(filename)
{
    return g_object_name.split('/')[1];
}

function set_upload_param(up, filename, ret)
{
    if (ret == false)
    {      ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') {
        suffix = get_suffix(filename);
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,
        'signature': signature
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

function getDate() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    if(month<10){
        month = "0"+month;
    }
    var nowDate = year + "-" + month;
    return nowDate;
}

var uploaders = [];
var initUploaders = function(uploaders) {
    $(".browse-button").each(function() { // 上传按钮必须添加.browse-button,必须带ID
        var self= $(this);
        var image_url   = ossUrl + getDate(); // OSS附件文件夹路径,日期(年-月)文件夹
        var image_fileurl = '/'+getDate();  //OSS上传文件夹名
        var dataId      = self.attr('id');  // 获取此上传按钮的ID
        var preview     = self.siblings('.preview'); // 获取此成功上传文件的容器
        var process     = self.siblings('.process'); // 获取此进度条的容器
        var uploadType  = self.attr('upload-type'); // 获取此上传组件的类型
        var dataLimit   = self.attr('data-limit');  // 获取此上传组件的大小限制
        var dataType    = self.attr('data-allow-type'); // 获取此上传组件允许上传的文件类型
        var delBtn      = self.siblings('.preview').find('.delBtn');    // 获取此上传文件的删除按钮
        var dataSingle; // 获取此上传组件是否允许多个文件上传，现在依据上传类型自动判断
        if(uploadType=='2'){
            dataSingle= false;
        }else {
            dataSingle= true;
        }
        // 第一种上传，删除上传完毕的图片预览
        delBtn.click(function () {
            preview.html("");
            preview.hide();
        });
        // 第二种、第三种上传删除上传完毕的附件行
        function delThis(n) {
            n.parents("p").remove();
        }

        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : dataId,
            multi_selection: false,
            max_retries: 3,
            container: self.parents('.upload-box').attr('id'),
            flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
            silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
            url : 'http://oss.aliyuncs.com',
            // multi_selection: dataSingle,

            filters: {
                mime_types : [ //允许上传的文件类型
                    { title : "Image files", extensions : dataType }
                ],
                max_file_size : dataLimit, //最大文件限制
                prevent_duplicates : false //允许选取重复文件
            },

            init: {
                //修改按钮方法，暂不能用
                PostInit: function() {
                },
                //选中文件即上传
                FilesAdded: function(up, files) {
                    set_upload_param(uploader, '', false);
                    return false;
                },
                //上传前
                BeforeUpload: function(up, file) {
                    check_object_radio();
                    set_upload_param(up, file.name, true);
                },
                //上传中进度条显示
                UploadProgress: function(up, file) {
                    pWidth = file.percent +'%';
                    if (uploadType =='1'){
                        process.show();
                        process.html('<div class="text"></div>');
                        process.find('.text').html(pWidth)
                    } else {
                        process.html('<div class="percent"><div class="percent-bar" style="width: 0%"></div></div><div class="text"></div>');
                        process.show();
                        pWidth = file.percent +'%';
                        process.find(".percent-bar").css('width',pWidth);
                        process.find(".text").html(pWidth);
                    }
                },
                // 上传完毕
                FileUploaded: function(up, file, info) {
                    if (info.status == 200)
                    {
                        var url = image_fileurl + "/" + get_uploaded_object_name(file.name);
                        // var title = get_uploaded_object_name(file.name).split(".")[0];
                        var title = (file.name).split(".")[0];
                        var suffix = get_uploaded_object_name(file.name).split(".")[1];
                        var client = new HproseHttpClient(webHproseUrl+'Base', ['createAttachmentInfo']);
                        client.createAttachmentInfo($("#tokenstr").val(),title,suffix,url,file.size,function(result) {
                            var result = JSON.parse(result);
                            if(result.success==1){
                                process.hide();
                                if (uploadType=='1') {
                                    preview.append('<p class="image" data-fileid = "'+result.id+'"><img src="'+image_url+'/' + get_uploaded_object_name(file.name) + '"/>' + '<span onclick="javascript:delThis($(this))" class="delBtn">删除</span></p>');
                                }
                                else if(uploadType=='3'){
                                    preview.append('<p data-fileid = "'+result.id+'"><span>'+(file.name)+'</span><a href="'+image_url+'/'+get_uploaded_object_name(file.name)+'" target="_blank">查看</a><a onclick="javascript:delThis($(this))">删除</a></p>')
                                }
                                else if(uploadType=='4'){
                                    if(typeof(eval(saveBid))=="function"){
                                        is_update=true;
                                        saveBid(); //保存标书
                                    }
                                    preview.append('<p data-fileid = "'+result.id+'"><span>'+(file.name)+'</span><a href="'+image_url+'/'+get_uploaded_object_name(file.name)+'" target="_blank">查看</a><a onclick="javascript:delThis($(this))">删除</a></p>')
                                }else {
                                    preview.html('<p data-fileid = "'+result.id+'"><span>'+(file.name)+'</span><a href="'+image_url+'/'+get_uploaded_object_name(file.name)+'" target="_blank">查看</a><a onclick="javascript:delThis($(this))">删除</a></p>')
                                }

                            }else{
                                alert("附件上传失败，请稍后重试");
                            }
                        });

                    }
                    else
                    {
                        document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                    }
                },
                // 上传错误提示
                Error: function(up, err) {
                    if (err.code == -600) {
                        new Dialog({
                            "type": "notice",
                            "content": "上传文件过大，请重新上传",
                            "buttons": ["确认"],
                            "cancel":function(){

                            }
                        });
                    }
                    else if (err.code == -601) {
                        new Dialog({
                            "type": "notice",
                            "content": "上传文件格式错误，请重新上传",
                            "buttons": ["确认"],
                            "cancel":function(){

                            }
                        });
                    }
                    else if (err.code == -602) {
                        new Dialog({
                            "type": "notice",
                            "content": "这个文件已经上传过一遍了",
                            "buttons": ["确认"],
                            "cancel":function(){

                            }
                        });
                    }
                    else
                    {
                        // alert("\nError xml:" + err.response);
                        new Dialog({
                            "type": "notice",
                            "content": "网络错误，上传超时；请重新上传",
                            "buttons": ["确认"],
                            "cancel":function(){

                            }
                        });
                    }
                }
            }
        });
        uploader.init();
        uploaders.push(uploader);
    });
};
initUploaders(uploaders);


