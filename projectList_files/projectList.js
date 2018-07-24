$(function(){
    formatNav(4);
    getList(1);
 });

function getList(page) {
    var dataJson = {};
    var param = {};
    param.tokenstr = $("input[name=tokenstr]").val();
    param.sort=$('#sort').val();
    param.search=$('#search').val();
    if ($('#area').html()=='全国')
        param.area='';
    else
        param.area=$('#area').html();

    param.state=$('#state').attr("value");
    param.type = '';
    param.page = page;
    dataJson.param = param;
    dataJson.controller = "Index";
    dataJson.method = "project_list";
    httpRequest(dataJson,mysucccallback,myerrcallback);
}

//请求成功回调函数
function mysucccallback(result) {
    var jsonData = JSON.parse(result);
    if($.loginState(jsonData.page,jsonData.lstate,'请登录平台后，查看更多项目信息!')==0){
        return false;
    }
    var html = '';
    if (jsonData.pagecount > 0) {
        $.each(jsonData.res,function(i, item) {
            html += '<div class="find-bar shadow">';
            html += '<div class="look-project-left"><div class="look-project-img"><img src=' + item.url + '></div>';
            html += '<div class="left-content">';
            if (item.state == 1)
                html += '<div class="look-title"><i class="look-state bg-state1">进行中</i><span>' + item.name + '</span></div>';
            else if (item.state == 2)
                html += '<div class="look-title"><i class="look-state bg-state3">已结束</i><span>' + item.name + '</span></div>';
            else
                html += '<div class="look-title"><i class="look-state bg-state2">未进行</i><span>' + item.name + '</span></div>';

            html += '<div class="project-icon-left">';
            html += '<div class="project-address ptb10 clearfix">';
            html += '<i class="home-icon address fl"></i>';
            html += '<em>项目地址：</em>';
            html += '<span class="span-sp">' + item.address + '</span>';
            html += '</div>';

            html += '<div class="item-type ptb10 clearfix">';
            html += '<i class="home-icon type fl"></i>';
            html += '<em>项目类型：</em>';
            html += '<span class="span-sp">' + item.type + '</span>';
            html += '</div>';

            html += '<div class="area-covered ptb10 clearfix">';
            html += '<i class="home-icon covered"></i>';
            html += '<em>占地面积：</em>';
            html += '<span class="span-sp">' + item.totalarea + ' 平方米</span>';
            html += '</div>';
            html += '</div>';

            html += '<div class="project-icon-right">';
            html += '<div class="ml40 ptb10">';
            html += '<i class="home-icon unit"></i>';
            html += '<em>发布单位：</em>';
            html += '<span class="span-sp">' + item.pname + '</span>';
            html += '</div>';

            html += '<div class="ml40 ptb10">';
            html += '<i class="home-icon build"></i>';
            html += '<em>建筑面积：</em>';
            html += '<span class="span-sp">' + item.coveredarea + ' 平方米</span>';
            html += '</div></div></div></div>';

            html += '<div class="look-project-right">';
            html += '<h3>招标信息： <span class="look-num"> ' + item.bcount + ' </span>条</h3>';
            html += '<a class="details" href="javascript:winLink(' + item.id + ')">查看详情</a>';
            html += '<div class="look-time">';
            html += '<i class="home-icon clock fl"></i><span>发布时间：' + item.publishtime + '</span>';
            html += '</div></div></div></div>';
        });
        $("#pageHtml").show();
        $.fullPageList(jsonData.pagecount, jsonData.page, 10, 'pageHtml');
    }
    else{
        html+='<div class="noBid" style="margin-bottom: 100px;"><i></i><p class="noresult">没有查询到符合条件的结果 ,请<a href="javascript:win("+item.id+")" style="color:#1B83FF;" id="news">重新查询</a> </p></div>';
        $("#pageHtml").hide();
    }

    $(".look-project-bar").html(html);

    $("#news").click(function(){
        $("#area").html("全国");
        $("#state").html("不限");
        $("#state").attr("value","");
        $("#search").val("");
        getList(1);
    });

    $("#descd").click(function(){
        $("#area").html("全国");
        $("#state").html("不限");
        $("#state").attr("value","");
        $("#search").val("");
        //alert($("#area").val());
        getList(1);
    });

}

//请求失败回调函数
    function myerrcallback(){
    $(".look-project-bar").html("数据获取失败，请稍后再次......");
}



