let materialName = ''; //产品名称
let lineColor = '#92b3ff'; //折线颜色
$(function () {
    formatNav(5);
    // 获取多种材料物资数据
    getProduct();
    // 获取多种材料物资名称
    getProductName();


}) //end

// 获取多种材料物资数据
function getProduct() {
    let dataJson = {};
    let param = {};
    param.tokenstr = $("input[name=tokenstr]").val();
    dataJson.param = param;
    dataJson.controller = "Curve";
    dataJson.method = "dayCurveProduct";
    httpRequest(dataJson, proSuccCallback, proerrCallback);
}
// 请求成功回调函数
function proSuccCallback(info) {
    // console.log(info);
    const result = info.data;
    if (result) {
        let str = '';
        result.forEach(function (item, i) {
            const product_gains = item.product_gains.split(',').join('');
            // 三个产品的背景图片
            if (i == 0) {
                str += '<div class="ztx-price-steel ztx-price-material mr25">';
            } else if (i == 1) {
                str += '<div class="ztx-price-cement ztx-price-material mr25">';
            } else if (i == 2){
                str += '<div class="ztx-price-snail ztx-price-material">';
            }

            str += '<div class="clearfix ztx-price-material-name">';
            str += '<p class="fl">';
            str += '<span class="f18 f_300 whitec mr25 steel_name">' + item.product_name + '</span>';
            str += '<span>';
            if (Number(product_gains) > 0)
                str += '<i class="upper iblock steel_icon"></i>';
            else if (Number(product_gains) == 0)
                str += '<i class="equality iblock steel_icon"></i>';
            else
                str += '<i class="down iblock steel_icon"></i>';
            str += '<em class="f18 f_300 whitec steel_number">' + Math.abs(product_gains).toFixed(1) + '</em>';
            str += '</span>';
            str += '</p>';
            str += '<p class="fr f14 f_300 whitec steel_date">' + item.add_date + '</p>';
            str += ' </div>';
            str += '<p class="f45 f_300 whitec steel_price">' + Math.abs(item.product_price).toFixed(1) + '</p>';
            str += '</div>';
        })
        $('.ztx-price-quote').append(str);
    } else { }
}
// 请求失败回调函数
function proerrCallback(err) {
    console.log(err);
}

// 获取多种材料物资名称
function getProductName() {
    let dataJson = {};
    let param = {};
    param.tokenstr = $("input[name=tokenstr]").val();
    dataJson.param = param;
    dataJson.controller = "Curve";
    dataJson.method = "curveProduct";
    httpRequest(dataJson, proNameSuccCallback, proerrCallback);
}
// 请求成功回调函数
function proNameSuccCallback(info) {
    // console.log(info);
    const nameRes = info.data;
    if (nameRes) {
        // 折线图上的图例
        let str = '';
        let html = '';
        str += '<i class="iblock legend-steel w10 h10 br50 mr10"></i>';
        str += '<em class="mr20 iblock f_300" id="' + nameRes[0].product_id + '">' + nameRes[0].product_name + '</em>';
        str += '<i class="iblock legend-cement w10 h10 br50 mr10"></i>';
        str += '<em class="mr20 iblock f_300"  id="' + nameRes[1].product_id + '">' + nameRes[1].product_name + '</em>';
        str += '<i class="iblock legend-snail w10 h10 br50 mr10"></i>';
        str += '<em class="mr20 iblock f_300"  id="' + nameRes[2].product_id + '">' + nameRes[2].product_name + '</em>';
        $('.ztx-price-curve-legend').html();
        $('.ztx-price-curve-legend').html(str);

        // 折线图下的单选项
        materialName = nameRes[0].product_name;
        // 获取折线图数据
        getCurve();
        html += '<i class="selected ml40 curve-radio iblock"></i>';
        html += '<em class="c666 f_300" id="' + nameRes[0].product_id + '">' + nameRes[0].product_name + '</em>';
        html += '<i class="unselected ml40 curve-radio iblock"></i>';
        html += '<em class="c666 f_300" id="' + nameRes[1].product_id + '">' + nameRes[1].product_name + '</em>';
        html += '<i class="unselected ml40 curve-radio iblock"></i>';
        html += '<em class="c666 f_300" id="' + nameRes[2].product_id + '">' + nameRes[2].product_name + '</em>';
        $('.ztx-price-curve-radio').html();
        $('.ztx-price-curve-radio').html(html);
    } else { }
}


// 点击切换折线图材料
$('.ztx-price-curve-radio').on('click', '.curve-radio', function () {
    $(this).addClass('selected').siblings('.curve-radio').removeClass('selected').addClass('unselected');
    materialName = $(this).next().text();
    if (materialName == '三级螺纹钢') {
        lineColor = '#92b3ff';
    } else if (materialName == '普通硅酸盐水泥') {
        lineColor = '#1B83FF';
    } else {
        lineColor = '#70e0a8';
    }
    getCurve();
})
// 获取折线图数据
function getCurve() {
    let dataJson = {};
    let param = {};
    param.product_name = materialName;
    param.tokenstr = $("input[name=tokenstr]").val();
    dataJson.param = param;
    dataJson.controller = "Curve";
    dataJson.method = "curveData";
    httpRequest(dataJson, curveSuccCallback, proerrCallback);
}
// 请求成功回调函数
function curveSuccCallback(info) {
    // console.log(info);
    // 最大最小值  
    function yValue(arr, section) {  //arr:数组   section：数值上下波动范围
        let value = {};
        let min = arr[0];
        let max = arr[0];
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Number(arr[i]);
            min = (arr[i] < min) ? arr[i] : min;  //找出最小值
            value.min = (min - section) > 0 ? Math.ceil(min - section) : 0;
            max = (arr[i] > max) ? arr[i] : max;  //找出最大值
            value.max = Math.ceil(max + section);
        }
        return value;
    }

    //  折线图
    let myLine = echarts.init(document.getElementById("priceCurve"));
    // 始末时间设置
    let curveRes = info.data;
    if (curveRes) {
        let date = [];
        let data = [];
        curveRes.forEach(function (item, i) {
            date.push(item.add_date);
            data.push(item.product_price);
        })
        // console.log(date, data);
        // 添加折线图设置选项
        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                },
                axisPointer: {
                    lineStyle: { //悬浮指针的颜色
                        color: '#bfbfbf'
                    }
                },
                backgroundColor: '#fff',   //悬浮框背景 
                textStyle: {
                    color: '#6e6e6e'  //悬浮框文字颜色
                },
                extraCssText: 'box-shadow: 0px 0px 20px rgba(163, 163, 163, 0.4);',    //悬浮框阴影
                padding: [10, 10],
                formatter: '{a0}： ' + $.Substr(materialName,11) + '<br />{a1}：&nbsp;{b1}<br />{a2}：&nbsp;{c0}'

            },
            grid: {  //整个画布铺满程度设置
                left: '0%',
                right: '2%',
                bottom: '18%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: { //x轴颜色
                        color: '#ddd',
                    }
                },
                axisTick: { //去掉x轴刻度线
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: { //x轴文字颜色
                        color: '#666'
                    },
                    interval: 'auto'

                },
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '90%'],
                axisLine: { //去掉y轴线
                    show: false
                },
                axisTick: { //去掉y轴刻度线
                    show: false
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed'  //网格设置为虚线
                    }
                },
                //   y轴最大、最小值设置
                // min: yValue(data, 100).min,
                // max: yValue(data, 100).max
                // min: dataMin,
                // max: dataMax
            },
            dataZoom: [{  //区域缩放
                type: 'inside',  //内置在坐标系中
                start: 0,
                end: 100,  //拖动手柄的默认间距
                moveOnMouseMove: false //滚动鼠标不进行缩放
            }, {
                // start: 0,
                // end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%', //拖动圆柄的大小
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name: '材料',
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: lineColor  //折线颜色
                        }
                    },
                    areaStyle: {
                        normal: {  //折线填充区域渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: lineColor
                            }, {
                                offset: 1,
                                color: '#fff'
                            }])
                        }
                    },
                    data: data
                },
                {
                    name: '时间',
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: lineColor  //折线颜色
                        }
                    },
                    areaStyle: {
                        normal: {  //折线填充区域渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: lineColor
                            }, {
                                offset: 1,
                                color: '#fff'
                            }])
                        }
                    },
                    data: data
                },
                {
                    name: '价格',
                    type: 'line',
                    smooth: true,
                    symbol: 'emptyCircle',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: lineColor  //折线颜色
                        }
                    },
                    areaStyle: {
                        normal: {  //折线填充区域渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: lineColor
                            }, {
                                offset: 1,
                                color: '#fff'
                            }])
                        }
                    },
                    data: data
                },
            ]
        };

        myLine.setOption(option);
    } else { }
}




