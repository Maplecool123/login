  			var area_selected= new Array();//区域选中级别
			$(function() {
				//初始化区域	 
				init_city();
				//更新下级区域
				$('.area-list').on('click', '.selectable li', function(){
					var me = $(this);
					me.siblings().removeClass('ui-selected');
					me.addClass('ui-selected');
					var index = $('.area-list-item').index($(this).parents('.area-list-item'));
					//更新下属区域
					var area_list = $.area_json['中国'];
					area_key_list[index] = $(this).find('span').text();
					for(var i=0; i<index+1; i++)
					{
						area_list = area_list[area_key_list[i]];
					}
					$(this).parents('.area-list-item').nextAll().find('.selectable').empty();
					var next_selectable = $(this).parents('.area-list-item').next().find('.selectable');
					var prev_text = '';
					var prev_all_div = me.parents('.area-list-item').prevAll();
					for(var i = prev_all_div.length-1; i>=0; i--)
					{
						prev_text = prev_text + $(prev_all_div[i]).find('.ui-selected span').text() + '-' ;
					}
					for( var item in area_list)
					{
						var next_text = prev_text+area_key_list[index] + '-' +item;
						if(me.find('a').hasClass('choiced') || $.inArray(next_text,area_selected) !=-1)
						{
							next_selectable.append(li_prev_html + item + img_prev_choiced_html + li_last_html);
						}
						else
						{
							next_selectable.append( li_prev_html + item + img_prev_html + li_last_html);
						}
					}
				});
		
				$('.area-list').on('mouseover', '.selectable li', function(){
					$(this).find('.choice').show();
				});
				$('.area-list').on('mouseleave', '.selectable li', function(){
					$(this).find('.choice').hide();
				});
				
				/*//点击打勾删除区域
				$('.area-list .selectable').on('click', '.choiced', function(){ alert(1);
					var name=$(this).siblings("span").html(); 
					s_del(name);
				})*/
					
				//删除全国
				$('.area_selected_show').on('click','s.dela',function() { 
					$(".area_selected_show").empty(); 
					$(".area-list-item").eq(0).find("span").each(function(index, element) {
						s_del($(this).text());
                    });
					 
				})
				
				//删除区域
				$('.area_selected_show').on('click','s.del',function(){
					if($(this).hasClass("dela")) return;					
					var text = $(this).prev().text();
					s_del(text);
				});
				
				//选全国
				$(".allcity").click(function(e) { 
					allcity();
				 }) 
				
		
				//选择区域
				$('.area-list .selectable').on('click', '.choice', function(){  
					var me = $(this);
					if(!me.hasClass('choiced'))
					{
						me.addClass('choiced').removeAttr('style');
						me.removeClass('choice').removeAttr('style');
						//判断是否所有子项被选中
						var others_length = me.parent().siblings().find('.choice').length;
						if(others_length == 0 && me.parents('.area-list-item').find(".t").text()!="省份"){ 	 
							me.parents('.area-list-item').prev().find('.ui-selected a.choice').trigger('click');
						}
						else if(others_length == 0 && me.parents('.area-list-item').find(".t").text()=="省份"){
							$(".area_selected_show").empty().append('<li><a href="javascript:void(0);">全国</a><s class="del dela"></s></li>');
						}
						else { updateSelected(me); }
					}
				}); 
				
				//初始化
				function init_city(){ 
					for(var i=0; i<3; i++)
					{
						for(var item in area_json)
						{								 		
							if(area_key_list[i] == item)
							{
								$('.area_list_js').slice(i,i+1).append( li_prev_html_selected + item + img_prev_html + li_last_html);
							}
							else
							{
								$('.area_list_js').slice(i,i+1).append( li_prev_html + item + img_prev_html + li_last_html);
							}
						}
						area_json = area_json[area_key_list[i]];
					}
				}
				//删除
				function s_del(text){	
					var new_arr = new Array();				
					for(var k in area_selected)
					{
						if(text != area_selected[k])
						{
							new_arr.push(area_selected[k]);
						}
					}
					area_selected = new_arr;
					showAreaSelected(area_selected);
					var choiseds = $('.ui-widget-content').find('.choiced');
		
					for(var i=0; i<choiseds.length; i++)
					{
						var c_text = $(choiseds[i]).prev().text();
						var index_p = $('.area-list-item').index($(choiseds[i]).parents('.area-list-item'));
						var c_prev_text = '';
						for(var j=0;j<index_p;j++)
						{
							c_prev_text = c_prev_text + $($('.area-list-item')[j]).find('.ui-selected span').text()+'-';
						}
						c_text = c_prev_text + c_text;
						if(text==c_text)
						{
							if($(choiseds[i]).parents('li').hasClass('ui-selected'))
							{
								$(choiseds[i]).parents('.area-list-item').next().find('.ui-widget-content a').removeClass('choiced').addClass('choice').removeAttr('style');
							}
							$(choiseds[i]).removeClass('choiced').addClass('choice').removeAttr('style');
						}
					}
				}
				//选全国
				function allcity(){
					$(".area-list-item").eq(0).find('.ui-widget-content a.choice').each(function(index, element) {
                        $(this).trigger('click');
                    });
				}
				//区域展示
				function showAreaSelected(area_selected)
				{
					$('.area_selected').each(function(index, element) {
						$(this).text(area_selected);
					});
					var html = '';
					var html_h = '<li><a href="javascript:void(0);">';
					var html_f = '</a><s class="del"></s></li>';
					for(var k in area_selected)
					{  
						if(area_selected[k].toString().substring(0,3)=="fun");
						else html += html_h + area_selected[k] + html_f;
					}
					$('.area_selected_show').each(function(index, element) {
						$(this).html(html)
					});
				}
				//区域更新
				function updateSelected(choice_item)
				{
					var choice_text = choice_item.prev().text(); 
					var index_p = $('.area-list-item').index(choice_item.parents('.area-list-item'));
					var prev_text = '';
					for(var j=0;j<index_p;j++)
					{
						prev_text = prev_text + $($('.area-list-item')[j]).find('.ui-selected span').text()+'-';
					}
					choice_text = prev_text + choice_text;
		
					var new_arr = new Array();
					for(var k in area_selected)
					{ 
						if(choice_text != area_selected[k].toString().substring(0,choice_text.length))//是否保留
						{ 							
							new_arr.push(area_selected[k]);  
						}
					}
					new_arr.push(choice_text);
					area_selected = new_arr;
					showAreaSelected(area_selected);
				}
			});
			
			
			//删除区域
				function cancelArea(text){
					var new_arr = new Array(); 
					for(var k in area_selected)
					{
						if(text != area_selected[k])
						{
							new_arr.push(area_selected[k]);
						}
					}
					area_selected = new_arr;
					showAreaSelected(area_selected);
					var choiseds = $('.ui-widget-content').find('.choiced');
		
					for(var i=0; i<choiseds.length; i++)
					{
						var c_text = $(choiseds[i]).prev().text();
						var index_p = $('.area-list-item').index($(choiseds[i]).parents('.area-list-item'));
						var c_prev_text = '';
						for(var j=0;j<index_p;j++)
						{
							c_prev_text = c_prev_text + $($('.area-list-item')[j]).find('.ui-selected span').text()+'-';
						}
						c_text = c_prev_text + c_text;
						if(text==c_text)
						{
							if($(choiseds[i]).parents('li').hasClass('ui-selected'))
							{
								$(choiseds[i]).parents('.area-list-item').next().find('.ui-widget-content a').removeClass('choiced').addClass('choice').removeAttr('style');
							}
							$(choiseds[i]).removeClass('choiced').addClass('choice').removeAttr('style');
						}
					}
				}
				
				//绑定已选地区
				function getArea(){
					if($(".area_selected_show").eq(0).find("a").html()=="全国"){
						//allcity();
						
						$(".area-list-item").eq(0).find('.ui-widget-content a.choice').each(function(index, element) {
							$(this).trigger('click');
						});
						return;
					}
					if($(".area_selected_show").eq(0).html()!="") {   
							var arr=[];
							$(".area_selected_show").eq(0).find("a").each(function(){	 
									 arr.push($(this).html()); 
								})
							for(var i=0; i<arr.length; i++){ 
								var name=arr[i];
								switch(name.split('-').length){
										 case 1: $(".area-list li:contains("+name+")").find("a").trigger("click"); break;
										 case 2: $(".selectable li:contains("+name.split('-')[0]+")").trigger("click");$(".area-list li:contains("+name.split('-')[1]+")").find("a").trigger("click"); break;
										 case 3: $(".selectable li:contains("+name.split('-')[0]+")").trigger("click");$(".selectable li:contains("+name.split('-')[1]+")").trigger("click");$(".area-list li:contains("+name.split('-')[2]+")").find("a").trigger("click"); break;
										 default:;
										 }	
							}
						} 
				}