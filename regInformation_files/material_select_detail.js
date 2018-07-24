				var fy=false; //是否为辅盈物资；
				var zy=false; //是否为主营物资；
				var zy_check=0; //主营数量；
				$(function(){ 	
					
                    $('.tip').poshytip({
                        className: 'tip-yellowsimple',
                        showOn: 'hover',
                        alignTo: 'target',
                        alignX: 'right',
                        alignY: 'bottom',
                        offsetY: -15,
                        offsetX: 3
                    }); 	
                    var mat_name=$(".material_choose li.on").html();   
                    getMaterialList(mat_name);
                    //鼠标移上
                    $(".material_choose li").hover(function(){ 
                            $(".material_choose li").removeClass("on");
                            $(this).addClass("on");	
                            mat_name=$(".material_choose li.on").html();
                            //绑定物资列表
                            getMaterialList(mat_name);			
                        }) /*
                    //取消物资
                    $(".material_selected_show .del").click(function(){ 
                            cancelMaterial($(this).siblings("a").html());
                        })  */
                    })		
                    
                //绑定物资列表
                function getMaterialList(mat_name){
                    var material_json = $.material_json['material'];  
                    var strLi=''; 
                    $(".material_detail").empty();
                    //绑定二级列表
                    for ( var i=0; i< material_json[mat_name].length; i++){
                        strLi="<li><label class=\"tip\" title='"+material_json[mat_name][i].tip+"'><input type=\"checkbox\" />"+material_json[mat_name][i].name+"</label></li>"
                        $(".material_detail").append(strLi);
                    }
                    //tip
                    $('.tip').poshytip({
                        className: 'tip-yellowsimple',
                        showOn: 'hover',
                        alignTo: 'target',
                        alignX: 'right',
                        alignY: 'bottom',
                        offsetY: -15,
                        offsetX: 3
                    });
                    //ckb点击
                    $(".material_detail input").click(function(){  
							
                            //取消选择
                            if($(this).prop("checked")==false){  
                                var str=$(this).parent('label').html().replace(/<[^>]+>/g,"");
                                cancelMaterial(str,fy);
                            }
                            //选中
                            else{ 
								if($(".budflag").val()=='1'){
									$(".material_detail label input").prop("checked",false);
									cancelMaterial(str,fy);
									$(this).prop("checked",true);
								}
								zy_check=0;
								$(".material_selected_show").eq(0).find("a").each(function(){ zy_check++; });
								if(zy && zy_check>=3) {alert("主营物资只能选择三项！");$(this).prop("checked",false);return;}
                                var str=$(this).parent('label').html().replace(/<[^>]+>/g,"");
                                var strLi="<li><a href=\"javascript:void(0);\">"+str+"</a><s class=\"del\" onclick='cancelMaterial(\""+str+"\","+fy+")'></s></li>";
								if(!fy){
                                	$(".material_selected_show").append(strLi);
								}
								else
									$(".material_selected_show_fy").append(strLi);	
                            }
                    })   
					$(".material_detail label input").prop("checked",false);
                    //绑定ckb状态
					if(!fy){
						if($(".material_selected_show").html()!="") { 
							$(".material_selected_show").eq(0).find("li").each(function(index, element) { 
								var name=$(this).find("a").html(); 				
								$(".material_detail label:contains('"+name+"')").find("input").prop("checked",true);
							});
						} 
					}
					else{
						if($(".material_selected_show_fy").html()!="") { 
							$(".material_selected_show_fy").eq(0).find("li").each(function(index, element) { 
								var name=$(this).find("a").html(); 				
								$(".material_detail label:contains('"+name+"')").find("input").prop("checked",true);
							});
						} 
					}
                } 
                 
                //取消物资
                function cancelMaterial(name,f){
					if($(".budflag").val()=='1'){
						$(".material_detail label:contains('"+name+"')").find("input").prop("checked",false);
						if(!f){					 
							$(".material_selected_show li").remove();		
						}
						else{
							$(".material_selected_show_fy li").remove();	
						}
					}else{
						$(".material_detail label:contains('"+name+"')").find("input").prop("checked",false);
						if(!f){					 
							$(".material_selected_show li:contains('"+name+"')").remove();		
						}
						else{
							$(".material_selected_show_fy li:contains('"+name+"')").remove();	
						}
					}
                }
				
				//选择物资点击事件
				function choose_mater(e){
				if(e=='0'){
					zy=true; fy=false; $('#dv_popx .material_selected_show_fy').hide(); 
					$('#dv_popx .material_selected_show').show(); 
					$("#dv_popx .dialog_header").html("请选择物资类别（最多只能选择3项）<a class=\"a_cheng\" style=\"float:right; margin-right:30px;\" href=\"javascript:hide_pop('dv_popx')\"> 确认</a>");
				}
				else{
					zy=false; fy=true; $('#dv_popx .material_selected_show_fy').show(); 
					$('#dv_popx .material_selected_show').hide(); 
					$("#dv_popx .dialog_header").html("请选择物资类别（可多选）<a class=\"a_cheng\" style=\"float:right; margin-right:30px;\" href=\"javascript:hide_pop('dv_popx')\"> 确认</a>"); 
				} 
				var mat_name=$(".material_choose li.on").html(); 
                getMaterialList(mat_name);
				show_pop('dv_popx',true);			
			}