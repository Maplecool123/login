	/*添加一个圖片*/
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
		
		if (!title || typeof(title)=="undefined"){
			htmlstr = '无上传附件';
		}else{
			htmlstr = title.substring(0,6);
			htmlstr += '('+strsize+')<a class="chx blue" title="查看" target="_blank" href="'+url+'"  >查看</a><a class="blue" title="删除" onclick=\'removeAttach("'+objname+'");\' >删除</a>';
		}

		$(objname_detail).html(htmlstr);
	}

		/*添加一个附件*/
	function addAttach1(objname,id,title,size,url,name){
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
			htmlstr = title.split('/')[6];
		}

		htmlstr += '';
		$(objname_detail).html(htmlstr);
	}

	/*添加一个附件(采购企业显示专用)*/
	function addAttachnew(objname,id,title,size,url,createtime,oldid){
		//alert(objname);
		var objname_id = "#"+objname + "_id";
		var objname_detail = "#"+objname + "_detail";
		var objnameold_id = "#"+objname + "old_id";
		$(objname_id).val(id);
		$(objnameold_id).val(oldid);
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
		//alert(id);
		//alert(oldid);
		if(id==oldid){
			if (!title && typeof(title)!="undefined"){
				htmlstr = '无名称';
			}else{
				htmlstr = title.substring(0,6);
			}

			htmlstr += '('+strsize+')<a class="chx blue" title="查看" target="_blank" href="'+url+'"  >查看</a><a class="blue" title="删除" onclick=\'removeAttach("'+objname+'");\' >删除</a>';
		}else{
			htmlstr = '<span>您'+createtime+'提交的附件，正在审核中</span>';
		}
		//alert(htmlstr);
		$(objname_detail).html(htmlstr);
	}

	/*添加一个附件(带缩略图)*/
	function addAttachMap(objname,id,title,size,url){
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
			htmlstr = '<a class="chx blue" target="_blank" href="'+url+'"  ><img src="'+url+'" height="40"></a>无名称('+strsize+')';
		}else{
			htmlstr = '<a class="chx blue" target="_blank" href="'+url+'"  ><img src="'+url+'" height="40"></a>'+title.substring(0,10)+'('+strsize+')';
		}


		$(objname_detail).html(htmlstr);
	}

	/*删除一个附件*/
	function removeAttach(objname){
	/*清除id为objname_id的input框的值*/
	/*清除id为objname_detail的<span>标签中的html数据*/
		var objname_id = "#"+objname + "_id";
		var objname_detail = "#"+objname + "_detail";
		$(objname_id).val("");
		$(objname_detail).html("");
	}


	/*添加一个一个添加多个 附件*/
	function addAttachOnebyOne(objname,id,title,size,url){
		var objname_id = "#"+objname + "_id";
		var objname_detail = "#"+objname + "_detail";
		if(size>1024*1024){
			size = size/1024/1024;
			strsize = size.toFixed(1)+'M';
		}else if(size>1024){
			size = size/1024;
			strsize = size.toFixed(1)+'KB';
		}else{
			strsize = size+'KB';
		}
		/*保存图片路径*/
		$(objname).val(url);

		/*保存图片附件id到objname_id中*/
		//alert(id);
		str_ids = $(objname_id).val();
		str_ids += id+',';
		///alert(str_ids);
		$(objname_id).val(str_ids);
		/*添加图片信息*/
		htmlstr =  $(objname_detail).html();
		htmlstr += '<div id="div_'+objname+'_'+id+'"><input type="hidden" id="input_'+objname+'_id'+'" value="'+id+'">';

		if (!title && typeof(title)!="undefined"){
			htmlstr += '无名称';
		}else{
			htmlstr += title.substring(0,6);
		}
		htmlstr += '('+strsize+')<a class="chx blue" title="查看" target="_blank" href="'+url+'"  >查看</a><a class="blue" title="删除" onclick=\'removeAttachOnebyOne("'+objname+'",'+id+');$("'+objname_detail+'").hide()\' >删除</a></div>';
		$(objname_detail).html(htmlstr);
	}
	function addAttachOnebyOne2(objname,id,title,size,url,showdel){
		var objname_id = "#"+objname + "_id";
		var objname_detail = "#"+objname + "_detail";
		if(size>1024*1024){
			size = size/1024/1024;
			strsize = size.toFixed(1)+'M';
		}else if(size>1024){
			size = size/1024;
			strsize = size.toFixed(1)+'KB';
		}else{
			strsize = size+'KB';
		}
		/*保存图片路径*/
		$(objname).val(url);

		/*保存图片附件id到objname_id中*/
		//alert(id);
		str_ids = $(objname_id).val();
		var check=str_ids.substr(str_ids.length-1,1);
		//alert(check);alert(str_ids);
		if (check==',' || str_ids==''){
			//alert(1);
		}else{
			str_ids +=',';//alert(2);
		}
		str_ids += id+',';
		///alert(str_ids);
		$(objname_id).val(str_ids);
		/*添加图片信息*/
		htmlstr =  $(objname_detail).html();
		htmlstr += '<div id="div_'+objname+'_'+id+'"><input type="hidden" class="input_'+objname+'_id'+'" value="'+id+'">';

		if (!title && typeof(title)!="undefined"){
			htmlstr += '无名称';
		}else{
			htmlstr += title.substring(0,6);
		}
		htmlstr += '('+strsize+')<a class="chx blue" title="查看" target="_blank" href="'+url+'"  >查看</a>';
		if(showdel=="1") htmlstr+='</div>';
		else htmlstr +='<a class="blue" title="删除" onclick=\'removeAttachOnebyOne("'+objname+'",'+id+')\' >删除</a></div>';
		$(objname_detail).html(htmlstr);
	}


	/*删除一个附件*/
	function removeAttachOnebyOne(objname,id){
		/*把id从objname_id的input框中去除*/
		var objname_id = "#"+objname + "_id";
		str_ids = '*,'+$(objname_id).val()+',*';
		strrep = ','+id+',';
		str_ids = str_ids.replace(strrep,',');
		str_ids = str_ids.replace('*,','');
		str_ids = str_ids.replace(',*','');
		$(objname_id).val(str_ids);


		/*清除id为objname_detail的<span>标签中的html数据*/
		var objname_div = '#div_'+objname+'_'+id;
		$(objname_div).remove();
	}



	/*数据调用时显示旋转读取图片*/
	function showLoading(objname){
		$(objname).html(' <div style="width:100%;text-align:center; line-height:25px;padding-top:50px; "><img height="20px" src="'+publicpath+'/images/loading.gif" /></div>');

	}

	/*设置省市区(通过id获取）*/
	function setPDAS(objprovince,objcity,objarea,objstreet,l,id){
		    var objname='';
			if(l!=1&&l!=2&&l!=3&&l!=4){
				level=1;
			}else{
				level=l;
			}
			switch(l){
				case 1:
					objname = objprovince;
					if(objcity!=''){
						levelchild = 2;
						objchild = objcity;
					}else{
						levelchild = 0;
						objchild = '';
					}
					break;
				case 2:
					objname = objcity;
					if(objarea!=''){
						levelchild = 3;
						objchild = objarea;
					}else{
						levelchild = 0;
						objchild = '';
					}
					break;
				case 3:
					objname = objarea;
					if(objstreet!=''){
						levelchild = 4;
						objchild = objstreet;
					}else{
						levelchild = 0;
						objchild = '';
					}
					break;
				default:
					levelchild =  0;
					objchild = '';
			}

			if(!(id>=0)){
				code = 0;
			}else{
				code = id;
			}

			//删除所有
			$(objname).closest('.select_box').children('ul.tag_options').find("li").remove();
			var client = new HproseHttpClient(hprosepath+'/hprose.php/User', ['getPDAS']);
			client.getPDAS(code,level,function(result) {
				/*把返回的字符串转换为json格式*/
				var jsonobj = jQuery.parseJSON(result);
				if(jsonobj.success == 1){
					if(jsonobj.arr!=null){
						strhtml = "";
						$.each(jsonobj.arr,function(i, item){
							strhtml += ' <li class="open" value="'+item.id+'" code="'+item.code+'" title="'+item.name+'" ';
							if(objchild!=''){
									strhtml += 'onclick="javascript:setPDAS(\''+objprovince+'\',\''+objcity+'\',\''+objarea+'\',\''+objstreet+'\','+levelchild+','+item.code+');"';
							}
							strhtml += '>'+item.name+'</li>';
						});

						$(objname).closest('.select_box').children('ul.tag_options').html(strhtml);

					}
					//alert(objprovince);

					/*select*/
					var flag=false;
					$(".tag_select").click(function(){
						flag=true;
						$(".tag_options").hide();
						$(this).siblings(".tag_options").show(10,function(){flag=false;
						});
					});
					$(".tag_options li").click(function(e) {
					$(this).parents("ul").siblings(".tag_select").attr('value',$(this).val()).html(($(this).text()));
					$(this).parents("ul").hide(10);
						//alert($(this).val());
					});
					$("body,html").bind("click",function(){
						if(!flag) { $(".tag_options").hide(10);
					}
					})

				}else{
					alert(jsonobj.info);
				}
			}, function(name, err) {
				alert(err);
			});
	}

	/*设置省市区（通过名称获取）*/
	function setPDASbyName(objprovince,objcity,objarea,objstreet,l,v){
			if((l!=2&&l!=3)||(objname=='')){
				alert('省市区信息获取失败！');
			}else{
				level = l;
				name = v;
			}

			switch(l){
				case 1:
					levelchild = 2;
					objchild = objcity;
					break;
				case 2:
					levelchild = 3;
					objchild = objarea;
					break;
				default:
					levelchild =  0;
					objchild = '';
			}


			//删除所有
			// $(objname).closest('.select_box').children('ul.tag_options').find("li").remove();

			// switch(l){
			// 	case 2:
			// 		/*删除市区下拉选项*/
			// 		$(objcity).closest('.select_box').children('ul.tag_options').find("li").remove();
			// 		$(objarea).closest('.select_box').children('ul.tag_options').find("li").remove();
			// 		/*设置市区下拉框内容*/
			// 		$(objcity).html('请选择城市');
			// 		$(objarea).html('请选择地区');
			// 		break;
			// 	case 3:
			// 		/*删除市区下拉选项*/
			// 		$(objarea).closest('.select_box').children('ul.tag_options').find("li").remove();
			// 		/*设置市区下拉框内容*/
			// 		$(objarea).html('请选择地区');
			// 		break;
			// }
			/*通过接口获取信息*/
			var client = new HproseHttpClient(hprosepath+'/hprose.php/User', ['getPDASbyName']);
			client.getPDASbyName(name,level,function(result) {
				/*把返回的字符串转换为json格式*/
				var jsonobj = jQuery.parseJSON(result);
				if(jsonobj.success == 1){
					if(jsonobj.arr!=null){
						strhtml = "";
						$.each(jsonobj.arr,function(i, item){
							strhtml += ' <li class="open" value="'+item.id+'" code="'+item.code+'" title="'+item.name+'" ';
							if(objchild!=''){
									strhtml += 'onclick="javascript:setPDAS(\''+objchild+'\','+levelchild+','+item.code+');"';
							}
							strhtml += '>'+item.name+'</li>';
						});
						$(objname).closest('.select_box').children('ul.tag_options').html(strhtml);
					}


					/*select*/
					var flag=false;
					$(".tag_select").click(function(){
						flag=true;
						$(".tag_options").hide();
						$(this).siblings(".tag_options").show(10,function(){flag=false;});
					});
					$(".tag_options li").click(function(e) {
					$(this).parents("ul").siblings(".tag_select").attr('value',$(this).val()).html(($(this).text()));
						//alert($(this).val());
					});
					$("body,html").bind("click",function(){
						if(!flag) { $(".tag_options").hide(10);}
					})

				}else{
					alert(jsonobj.info);
				}
			}, function(name, err) {
				alert(err);
			});
	}


	/**
	 * 数字转中文
	 * @param dValue
	 * @returns
	 */
	function chineseNumber(dValue) {
		var maxDec = 2;
		/*验证输入金额数值或数值字符串 ：*/
		dValue = dValue.toString().replace(/,/g, "");
		dValue = dValue.replace(/^0+/, ""); /*金额数值转字符、移除逗号、移除前导零*/
		if (dValue == "") {
			return "零元整";
		} /*（错误：金额为空！）*/
		else if (isNaN(dValue)) {
			return "错误：金额不是合法的数值！";
		}
		var minus = ""; /* 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。*/
		var CN_SYMBOL = ""; /* 币种名称（如“人民币”，默认空）*/
		if (dValue.length > 1) {
			if (dValue.indexOf('-') == 0) {
				dValue = dValue.replace("-", "");
				minus = "负";
			} /*处理负数符号“-”*/
			if (dValue.indexOf('+') == 0) {
				dValue = dValue.replace("+", "");
			} /* 处理前导正数符号“+”（无实际意义）*/
		}
		/*变量定义：*/
		var vInt = "";
		var vDec = ""; /* 字符串：金额的整数部分、小数部分*/
		var resAIW; /* 字符串：要输出的结果*/
		var parts; /*数组（整数部分.小数部分），length=1时则仅为整数。*/
		var digits, radices, bigRadices, decimals; /*数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。*/
		var zeroCount; /*零计数*/
		var i, p, d; /*循环因子；前一位数字；当前位数字。*/
		var quotient, modulus; /*整数部分计算用：商数、模数。*/
		/*金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。*/
		var NoneDecLen = (typeof (maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5); /*是否未指定有效小数位（true/false）*/
		parts = dValue.split('.'); /* 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。*/
		if (parts.length > 1) {
			vInt = parts[0];
			vDec = parts[1]; /* 变量赋值：金额的整数部分、小数部分*/
			if (NoneDecLen) {
				maxDec = vDec.length > 5 ? 5 : vDec.length;
			} /*未指定有效小数位参数值时，自动取实际小数位长但不超5。*/
			var rDec = Number("0." + vDec);
			rDec *= Math.pow(10, maxDec);
			rDec = Math.round(Math.abs(rDec));
			/*小数四舍五入*/
			rDec /= Math.pow(10, maxDec);
			var aIntDec = rDec.toString().split('.');
			if (Number(aIntDec[0]) == 1) {
				vInt = (Number(vInt) + 1).toString();
			} /*小数部分四舍五入后有可能向整数部分的个位进位（值1）*/
			if (aIntDec.length > 1) {
				vDec = aIntDec[1];
			} else {
				vDec = "";
			}
		} else {
			vInt = dValue;
			vDec = "";
			if (NoneDecLen) {
				maxDec = 0;
			}
		}
		if (vInt.length > 44) {
			return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！";
		}
		/* 准备各字符数组 Prepare the characters corresponding to the digits:*/
		digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); /*零~玖*/
		radices = new Array("", "拾", "佰", "仟"); /*拾,佰,仟*/
		bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"); /* 万,亿,兆,京,垓,杼,穰,沟,涧,正*/
		decimals = new Array("角", "分", "厘", "毫", "丝"); /* 角/分/厘/毫/丝*/
		resAIW = ""; /*开始处理*/
		/*处理整数部分（如果有）*/
		if (Number(vInt) > 0) {
			zeroCount = 0;
			for (i = 0; i < vInt.length; i++) {
				p = vInt.length - i - 1;
				d = vInt.substr(i, 1);
				quotient = p / 4;
				modulus = p % 4;
				if (d == "0") {
					zeroCount++;
				} else {
					if (zeroCount > 0) {
						resAIW += digits[0];
					}
					zeroCount = 0;
					resAIW += digits[Number(d)] + radices[modulus];
				}
				if (modulus == 0 && zeroCount < 4) {
					resAIW += bigRadices[quotient];
				}
			}
			resAIW += "元";
		}
		/*处理小数部分（如果有）*/
		for (i = 0; i < vDec.length; i++) {
			d = vDec.substr(i, 1);
			if (d != "0") {
				resAIW += digits[Number(d)] + decimals[i];
			}
		}
		/*处理结果*/
		if (resAIW == "") {
			resAIW = "零" + "元";
		} /*零元*/
		if (vDec == "") {
			resAIW += "整";
		} /*...元整*/
		resAIW = CN_SYMBOL + minus + resAIW; /*人民币/负......元角分/整*/
		return resAIW;
	}

	/**
	 * 中文转数字
	 * @param num
	 * @returns
	 */
	function aNumber(num) {
		var numArray = new Array();
		var unit = "亿万元$";
		for ( var i = 0; i < unit.length; i++) {
			var re = eval("/" + (numArray[i - 1] ? unit.charAt(i - 1) : "") + "(.*)" + unit.charAt(i) + "/");
			if (num.match(re)) {
				numArray[i] = num.match(re)[1].replace(/^拾/, "壹拾");
				numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g, function($1) {
					return "零壹贰叁肆伍陆柒捌玖".indexOf($1);
				});
				numArray[i] = numArray[i].replace(/[分角拾佰仟]/g, function($1) {
					return "*" + Math.pow(10, "分角 拾佰仟 ".indexOf($1) - 2) + "+"
				}).replace(/^\*|\+$/g, "").replace(/整/, "0");
				numArray[i] = "(" + numArray[i] + ")*" + Math.ceil(Math.pow(10, (2 - i) * 4));
			} else
				numArray[i] = 0;
		}
		return eval(numArray.join("+"));
	}

	//只能填写数字
	function changeprice(e){
		if(e.value==''){
				//e.value=0;
			}else{
				var v1 = e.value;
				if(!isNaN(v1)){;}else{
					if(!isNaN(parseFloat(v1))){
						e.value=(parseFloat(v1));
					}else{
						alert('只能填写阿拉伯数字，包括“0”');
						e.value="";
					}
				}
			}
	}

	//金额千分位自动分位
	function comdify(thisnum)
	{
	  if(isNaN(thisnum)){
			return '';
	  }
	  var strnum = thisnum.toString().replace(/,/g, "");
	 // if (thisnum.length > 10)
	//      {
	//     	 thisobj.value = thisobj.value.substring(0, 10);
	//      }
	  var re=/\d{1,3}(?=(\d{3})+$)/g;
	  var n1=strnum.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
	  return n1;
	}





