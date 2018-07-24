
        try
        {
            if ( !$ ) 
            {
                alert("未找到jquery库,无法应用物资选择扩展!");
            }
            else
            {
                $.extend(
                {
                    material_json:eval({"material":{"土建材料":[{"name":"黑色及有色金属","tip":"|钢筋|钢板|角钢|槽钢|扁钢|工字钢|H型钢|铝板（带）材|钢带|铝型材|方钢|钢绞线、钢丝束|钢轨及钢轨配件|钢丝线|其他型钢|钢丝|钢棒材|加工件|钢板材|金属原材料|铜线材|六角钢|铝棒材|铜带材|铝材|锌材|铝线材|Z型钢|八角钢|钛材|镍材|硅钢片|其它金属材料|"},{"name":"水泥、砖瓦灰沙石及混凝土制品","tip":"|水泥|水泥及混凝土预制品|砌块|砌砖|混凝土、砂浆外加剂|瓦|石子|砂|灰、粉、土等掺合填充剂|钢筋混凝土预制品|石材|轻骨料|"},{"name":"砼、砂浆及其它配合比材料","tip":"|水泥混凝土|水泥砂浆|特种砂浆|沥青混凝土|其它砂浆|混合砂浆|特种混凝土|胶泥、脂、油|灰浆、水泥浆|轻质水泥混凝土|石灰砂浆|多合土垫层|灰土垫层|其他垫层材料|石子浆|"},{"name":"密封、电极及劳保用品等其它材料","tip":"|密封材料|劳保用品|电极材料|纸、笔|无损探伤用耗材|水电汽、煤炭|零星施工用料|火工材料|"},{"name":"成型构件及加工件","tip":"|钢结构制作件|活动房屋|水箱|减震器|其它成型制品|铸铁及铁构件|木质加工件|预制烟囱、烟道|变形缝|机械设备安装用加工件|漏斗|压力容器构件|装置设备附件|翻边短管|"}],"装饰装修":[{"name":"橡胶、塑料","tip":"|橡塑复合材料|塑料板|橡胶圈|橡胶板|塑料型材|其它塑料材料|橡胶条、带|塑料薄膜布|其它橡胶材料|其它非金属材料|玻璃钢及其制品|棉毛及其制品|化纤及其制品|有机玻璃|丝麻及其制品|塑料带|石墨碳素制品|塑料棒|草及其制品|"},{"name":"五金制品","tip":"|螺母|螺钉|网、纱|螺栓|普通钉料|铆钉|销|垫圈|涂附磨具与磨料|轴承|膨胀螺栓|焊条|钢筋接头及锚具|低值易耗品|焊丝|小五金|砂轮|铁丝|油石、砂瓦|磨头|铁件|焊剂、焊粉|挡圈|螺柱|键|钎料及钎剂|其它五金件|"},{"name":"木、竹材制品","tip":"|胶合板|细木工板|锯材|其它木制品|原木|其它人造木板|纤维板|刨花板|竹板|木制台料及货架|竹制品|竹料|空心木板|木质容器类|"},{"name":"玻璃陶瓷面砖","tip":"|陶瓷地砖|陶瓷内墙砖|钢化玻璃|中空玻璃|工艺装饰玻璃|陶瓷外墙砖|夹层玻璃|平板玻璃|特种玻璃|镀膜玻璃|其它面砖|陶瓷马赛克|其它玻璃|玻璃镜|彩色玻璃|夹丝玻璃|玻璃马赛克|玻璃制品|玻璃砖|镭射玻璃|石塑地砖|"},{"name":"装饰石材及地板","tip":"|天然石板|复合地板|人造石板材|橡胶地板|实木地板|石材制品|塑料地板|活动地板|其它装饰石材|其它地板|文化石及麻石材|石材装饰辅助用料|竹地板|地板支架材料|微晶玻璃板|软木地板|水磨石板|石材装饰零星制品|"},{"name":"墙面、天棚装饰及屋面材料","tip":"|轻钢龙骨|金属装饰板|竹木装饰板|石膏装饰板|轻质复合墙板、屋面板|矿物棉装饰板|龙骨配件|塑料装饰板|其它装饰板|铝塑复合板|格栅、格片挂片|隔断及筒形天棚|网格布带|纤维水泥装饰板|复合装饰板|其它龙骨|铝合金龙骨|硅酸钙装饰板|集成吊顶|珍珠岩装饰板|"},{"name":"门窗制品及门窗五金","tip":"|铝合金门窗|塑料(塑钢)门窗|木门窗|门窗五金|卷帘|门窗锁类|钢门、钢窗、钢闸|门、窗帘及其配件|特种门窗|全玻门、自动门|其它门窗|幕墙五金配件|铝合金建筑型材|纱门、纱窗|不锈钢门窗|塑料门窗异型材|彩钢门窗|铁艺门窗|玻璃钢门窗|"},{"name":"涂料及防腐防水材料","tip":"|防水卷材|建筑涂料|通用涂料|功能性建筑涂料|防水油膏、剂、粉、胶类|涂料辅助材料|其它防腐防水材料|沥青|木器涂料|止水材料|油料、树脂|金属涂料|其它专用涂料|道路、桥梁涂料|颜料、填料|耐酸砖、板|工业设备涂料|"},{"name":"装饰线条、装饰件、栏杆、扶手","tip":"|壁纸|木质装饰线条|扶手|栏杆、栏板|地毯、挂毯及门毡|其它装饰材料|石膏装饰线条、装饰件|金属装饰线条|招牌、灯箱|塑料装饰线条|贴墙布|石材装饰线条|复合材料装饰线条|艺术装饰制品|装饰字|其它装饰线条|轻质水泥纤维装饰线条|玻璃钢装饰线条、装饰件|旗杆|"},{"name":"绝热、耐火材料","tip":"|泡沫橡胶（塑料）及其制品|岩棉及其制品|玻璃棉及其制品|石棉及其制品|其它绝热材料|其它耐火材料|电伴热带缆|粘土质耐火砖|耐火纤维及其制品|膨胀珍珠岩及其制品|复合硅酸盐绝热材料|矿渣棉及其制品|耐火泥、砂、石硅质|耐火砖|耐火粉、骨料|不定形耐火材料|铝质耐火砖|膨胀蛭石及其制品|硅藻土及其制品|泡沫玻璃及其制品|刚玉砖|其它耐火砖材|镁质耐火砖|"}],"电气工程":[{"name":"灯具、光源","tip":"|光源|庭院、广场、道路、景观灯|格栅灯（荧光灯盘）|吸顶灯|泛光灯、投光灯|筒灯|标志、应急灯|吊灯（装饰花灯）|其它灯具及附件|厂矿、场馆用灯|射灯|灯架|启辉器、镇流器|台灯、落地灯|灯头、灯座、灯罩|壁灯|其他室内灯具|埋地灯|水下灯|歌舞厅灯|轮廓装饰灯|草坪灯|隧道灯|专用灯具电源|医院专用灯|灯戗、灯伞、灯臂|灯线及附件|"},{"name":"开关、插座","tip":"|电源插座|普通面板开关|电子感应开关|按钮开关|拉线开关|电源插座转换器|门铃、门铃开关|调光面板开关|面板、边框、盖板|调速面板开关|开关、插座功能件|其它开关|插卡取电开关|其它控制开关|电源插头|刮须插座|扳把开关|音量调节开关|多功能开关|自复位开关|"},{"name":"电气线路敷设材料","tip":"|电线、电缆套管及其管件|电缆桥架|电缆头|线槽及其连接件|母线槽|接线端子|接线盒（箱）|其它线路敷设材料|线路金具|桥架连接件及附件|线路连接附件|杆塔固定件|电杆、塔|母线金具|杆塔支撑横担及附件|线槽附件|变电金具|"},{"name":"保险、绝缘材料","tip":"|避雷器材|熔断器|绝缘板、绝缘箔|绝缘布、绝缘带|漏电保护器材|低压绝缘子|其余绝缘材料|高压绝缘子|保险器材|绝缘穿墙套管、瓷套管|瓷绝缘散材|绝缘棒|绝缘管|"},{"name":"工程检测仪器仪表","tip":"|其它工程仪器仪表|电源|电力仪表|电工测量仪表|通信测试仪表|信号发生器|工程测绘仪器|自动化仪表|功率计、场强仪|元器件测试仪|频率、时间测试仪|示波器、扫频仪|计算机仪表|测振仪、频谱仪|声振测量仪|噪声、杂音仪表、辐射计|石油专用仪表|雷达测试仪|电缆测试仪表|传输、网络分析仪|衰减器|电视仪表|光电测试仪|信号、逻辑分析仪|相位计、抖晃仪|调制度、失真度测试仪|话路测试仪|误码分析仪|电平表、振荡器|"},{"name":"弱电及信息类器材","tip":"|安防检查、监控显示器材|广播、音响系统器材|楼宇小区自控及多表远传系统|信息插座插头器材|安防报警、出入口控制器材|其它弱电及信息类器材|计算机网络系统器材|停车场管理系统器材|有线电视、卫星电视器材|电话通讯设备器材|广播线路、移动通信器材|"},{"name":"安防及建筑智能化设备","tip":"|门禁系统|入侵报警设备|楼宇对讲系统|扩声、背景音乐系统|其它智能化设备|计算机网络设备|电视监控设备|其余安防设备|电子巡更系统|楼宇自控系统|微波无线接入设备|综合布线系统|安全检查设备|出入口控制设备|有线电视、卫星电视系统|停车场管理系统|视频会议设备|终端显示设备|同声传译设备及器材|会议电话设备|楼宇多表远传系统|"},{"name":"电气设备及附件","tip":"|断路器|配电箱|配电开关|变压器|电气柜类|发电机|接触器|继电器|互感器|其它电气设备|电动机|电气控制器|起动器|电抗器、电容器|调压器、稳压器|电阻器、分流器|变频器|蓄电池及附件|箱式变电站（预装式变电站）|成套配电装置|电磁器件|电笛、电铃电气屏类|"},{"name":"电线电缆及光纤光缆","tip":"|电力电缆|电气装备用电线电缆|裸电线|信号电缆|光纤电缆|计算机用电缆|市内电话电缆|其它电线电缆|特种电缆|电视电话电缆|长途通信电缆|电磁线|充油及油浸纸绝缘电力电缆|"}],"给排水材料":[{"name":"管材","tip":"|塑料管|焊接钢管|不锈钢管|复合管|无缝钢管|镀锌钢管|水泥、混凝土管|异形钢管|铸铁管|金属软管|其它管材|金属波纹管|铜管|橡胶管|玻璃钢管|衬里管|铝管|陶瓷（土）管|编织管|玻璃管|钛管|铅管|镍管|"},{"name":"阀门","tip":"|蝶阀|闸阀|球阀|截止阀|止回阀|减压阀|安全阀|其它阀门|调节阀|平衡阀|旋塞阀|柱塞阀|电磁阀|浮球阀|水力控制阀|疏水阀|塑料阀门|阀门专用附件|排污阀|隔膜阀|减温减压阀|给水分配阀|节流阀|陶（搪）瓷阀门|"},{"name":"洁具及燃气器具","tip":"|水嘴、水龙头|大便器|浴缸、浴盘|洗脸盆、洗手盆|洁具专用阀门|淋浴器|其它卫生洁具|排水栓、地漏|浴室家具|洁具专用配件|地面扫除口、下水口|存水弯、检查口|小便器洗涤盆、化验盆|手部消毒器、烘手器|淋浴间、淋浴屏|橱柜|卫生器具用水箱|洁具专用开关件|化妆台、化妆镜|喷香机、给皂器|燃气管道专用附件|蒸汽房、桑拿房|净身盆、器（妇洗盆）|饮水器|洗发盆（洗头槽）|透气帽、铜纳子|厨用隔油器|调压装置|其它燃气器具|消毒器、消毒锅|抽水缸|盒子卫生间|"},{"name":"法兰及其垫片","tip":"|钢制法兰|不锈钢法兰|盲板|其它法兰|塑料法兰|铸铁法兰|非金属垫片|金属垫片|铜法兰|其它垫片|"},{"name":"泵、供水设备","tip":"|离心式水泵|离心式油泵|供水设备|供水控制柜|泵专用配件|离心式杂质泵|离心式耐腐蚀泵|其它泵|真空泵|电磁泵|转子泵|计量泵|轴流泵|混流泵|往复泵|旋涡泵|水轮泵|水锤泵|射流泵|气体扬水泵|"}],"消防燃气":[{"name":"消防器材","tip":"|报警器材|灭火器|消防通讯广播器材|消防箱、柜|成套报警装置|消防喷头|其它消防器材|消火栓分水器、集水器、滤水器|软管卷盘、水龙带及接扣|现场模块|消防工具|消防水泵|接合器|其它报警器材|水流指示器|消防水枪|灭火散材|泡沫发生器、比例混合器灭火剂|选择阀隔膜式气压水罐|"}],"采暖通风":[{"name":"水暖及通风空调器材","tip":"|钢制散热器|风管、风道|风口|风机盘管|空调用阀门|散热器|专用配件|铜及复合散热器|铸铁散热器|其它采暖材料|消声器|散流器|铝制散热器|其它通风空调器材|其它散热器|除污器|水锤吸纳器|集气罐|静压箱|风口过滤器、过滤网|集热器|膨胀水箱|罩类风帽汽水集配器|"},{"name":"通风空调设备","tip":"|通风机|排气扇、换气扇|空调器|成套通风空调|装置冷却塔|空调配件|压缩机|其它空气幕|冷热水机组|吊风扇、壁扇|净化过滤设备|其它通风器材|换热器（蒸发器、冷凝器）|空气加热、冷却器|鼓风机|台扇、落地扇|诱导器|喷雾室变速器|"},{"name":"热水、采暖锅炉设备","tip":"|热水锅炉|热水器、开水炉|蒸汽锅炉|热交换器|采暖炉|其它水暖设备|其它锅炉设备|沸水器|成套水暖装置|冷热水混合器|"}],"仿古工程":[{"name":"仿古建筑材料","tip":"|粘土瓦件（黑活瓦件）|仿古粘土砖|粘土瓦脊饰|琉璃瓦件|琉璃砖|其余琉璃仿古材料|其余仿古材料|仿古木作材料|琉璃瓦脊饰|裱糊工程材料|其余粘土煅烧类仿古材料|仿古油饰、彩画材料|"}],"园林绿化":[{"name":"园林绿化","tip":"|乔木|灌木|草本花卉|园林雕塑|水生花卉|假山、观景石|浇水喷头|盆景|其它园林绿化器材|地被植物园艺资材|观赏竹类|藤本植物|喷泉|农药|杀虫剂|苗木检修、栽培器材|棕榈科植物|"}],"其他材料":[{"name":"油品、化工原料及胶粘材料","tip":"|胶粘剂|胶粘制品|有机化工原料|无机化工原料|润滑油|化工剂类|燃料油|化工填料|润滑脂、蜡|工业气体|溶剂油、绝缘油|其它油品|"},{"name":"仪表及自动化控制","tip":"|水表|压力仪表|电工测量仪表|温度测量仪表|热量表|差压、流量仪表|显示仪表|燃气表|其它仪表及自控器材|电度表|过程控制仪表器件|集中监视与控制装置仪表|接头、堵头|工业计算机器材|物位检测仪表|机械量仪表|仪表专用阀门|节流装置|气象环保检测仪表|取源部件|物性检测仪表|仪表专用套管|过程分析仪表|仪表专用垫片|综合计费仪表|"},{"name":"水处理及环保设备","tip":"|水处理成套设备|过滤设备|水软化设备|水垢处理设备|灭菌消毒|加药装置|其它环保设备|除尘设备|油水分离装置|过滤材料|气浮设备|垃圾处理设施|环保厕所|除气设备|生化反应器|噪音防护设施|除污除砂排泥设备|填料膜与膜设备|毛发聚集器|格栅类|栏污设备|曝气设备|污泥脱水设备|"},{"name":"厨房设备","tip":"|小型食品加工机械|灶具操作台、操作柜|洗刷台、洗涮柜|吸油烟机|烤箱及蒸具炉具|其他排烟设备|盆台展示柜、保鲜柜|餐车冷藏、冷冻柜（库）|消毒柜|餐柜|餐架|大型厨房设备|洗碗机|餐桌、餐椅|"},{"name":"体育休闲设施","tip":"|其它体育休闲设施|健身设施|田径设施|室外球场设施|游泳馆设施|水上游乐设施|攀岩设施|室内球馆设施|"},{"name":"电梯","tip":"|乘客电梯|载货电梯|电梯机械配件|自动扶梯|电梯电气装置|别墅电梯|观光电梯|病床电梯|无机房电梯|客货两用电梯|自动人行道|其它电梯|船用电梯|汽车电梯|住宅电梯|杂物电梯|"}],"分包租赁":[{"name":"专业分包","tip":""},{"name":"劳务分包","tip":""},{"name":"设备租赁","tip":""}]}}
                    )
                })
            }
        }
        catch(e)
        {
            alert("未找到jquery库无法应用物资选择扩展!");
        }    
        