$(function () {
    $.extend({
        loginState: function(page,lstate,info){
            if (page > 20 && lstate == 0) {
                new Dialog({
                    "type": "notice",
                    "content": info+"<br><a href=" + $("#loginUrl").val() + "  class=\"page-login\">登录</a>&nbsp; 或 &nbsp;<a href=" + $("#registerUrl").val() + " class=\"page-reg\">注册</a>",
                    "buttons": ["取消"]
                });
                return 0;
            }else{
                return 1;
            }
        },
        //分页
        fullPageList: function (count,nowpage,pagesize,container) {
            var count = parseInt(count);
            var nowPage = parseInt(nowpage);
            var pageSize = parseInt(pagesize);

            //获取最后一页(总页数)
            var countPage=Math.ceil(count/pageSize);
            //当前页大于最后一页则是最后一页
            if(nowPage>countPage){
                nowPage=countPage;
            }
            //当前页数小于1则是到第一页
            if(nowPage<1){
                nowPage=1;
            }
            //上一页
            var prePage=nowPage-1;
            //下一页
            var nextPage=nowPage+1;

            var pageHtml = '';
            if(nowPage>1){
                pageHtml += '<div class="page-start fl"><a href="javascript:getList('+prePage+')" class="page-one"><i class="home-icon"></i>上一页</a></div>';
            }else{
                pageHtml += '<div class="page-start fl"><a href="javascript:void(0)" class="page-one"><i class="home-icon"></i>上一页</a></div>';
            }
            pageHtml += '<div class="page-center fl">';
            if(countPage>21){
                if((nowPage-1)<=10){
                    for(var i=1; i<=19; i++){
                        if(nowPage==i) {
                            pageHtml += '<a href="javascript:getList('+i+')" class="curr">'+i+'</a>';
                        }else{
                            pageHtml += '<a href="javascript:getList('+i+')">'+i+'</a>';
                        }
                    }
                    pageHtml += '<span class="ellipsis">...</span>';
                    pageHtml += '<a href="javascript:getList('+countPage+')">'+countPage+'</a>';
                }else if((nowPage-1)>10 && (countPage-nowPage)<10){
                    pageHtml += '<a href="javascript:getList(1)">1</a>';
                    pageHtml += '<span class="ellipsis">...</span>';
                    var moveNum=0;
                    if(countPage==nowPage) {
                        moveNum=18;
                    }else if((countPage-nowPage)==1){
                        moveNum=17;
                    }else if((countPage-nowPage)==2){
                        moveNum=16;
                    }else if((countPage-nowPage)==3){
                        moveNum=15;
                    }else if((countPage-nowPage)==4){
                        moveNum=14;
                    }else if((countPage-nowPage)==5){
                        moveNum=13;
                    }else if((countPage-nowPage)==6){
                        moveNum=12;
                    }else if((countPage-nowPage)==7){
                        moveNum=11;
                    }else if((countPage-nowPage)==8){
                        moveNum=10;
                    }else if((countPage-nowPage)==9){
                        moveNum=9;
                    }

                    for(var i=(nowPage-moveNum); i<=countPage; i++){
                        if(nowPage==i) {
                            pageHtml += '<a href="javascript:getList('+i+')" class="curr">'+i+'</a>';
                        }else{
                            pageHtml += '<a href="javascript:getList('+i+')">'+i+'</a>';
                        }
                    }

                }else if((nowPage-1)>10 && (countPage-nowPage)<=10){
                    pageHtml += '<a href="javascript:getList(1)">1</a>';
                    pageHtml += '<span class="ellipsis">...</span>';
                    for(var i=(nowPage-8); i<=countPage; i++){
                        if(nowPage==i) {
                            pageHtml += '<a href="javascript:getList('+i+')" class="curr">'+i+'</a>';
                        }else{
                            pageHtml += '<a href="javascript:getList('+i+')">'+i+'</a>';
                        }
                    }
                }else if((nowPage-1)>10 && (countPage-nowPage)>10){
                    pageHtml += '<a href="javascript:getList(1)">1</a>';
                    pageHtml += '<span class="ellipsis">...</span>';
                    for(var i=(nowPage-8); i<=(nowPage+8); i++){
                        if(nowPage==i) {
                            pageHtml += '<a href="javascript:getList('+i+')" class="curr">'+i+'</a>';
                        }else{
                            pageHtml += '<a href="javascript:getList('+i+')">'+i+'</a>';
                        }
                    }
                    pageHtml += '<span class="ellipsis">...</span>';
                    pageHtml += '<a href="javascript:getList('+countPage+')">'+countPage+'</a>';
                }
            }else{
                for(var i=1; i<=countPage; i++){
                    if(nowPage==i){
                        pageHtml += '<a href="javascript:getList('+i+')" class="curr">'+i+'</a>';
                    }else{
                        pageHtml += '<a href="javascript:getList('+i+')">'+i+'</a>';
                    }
                }
            }
            pageHtml += '</div>';
            if(nowPage<countPage){
                pageHtml += '<div class="page-end fr"><a href="javascript:getList('+nextPage+')" class="page-one">下一页<i class="home-icon"></i></a></div>';
            }else{
                pageHtml += '<div class="page-end fr"><a href="javascript:void(0)" class="page-one">下一页<i class="home-icon"></i></a></div>';
            }

            $('#'+container).html(pageHtml);
        }
    });
});