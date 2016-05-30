/**
 * js for creating or editing of new product
 * Created by teng on 30.11.2014.
 */
var DEFAULT_VALUE_SCHEDULE_COMMENT = '例：此处用于添加与行程内容有关的备注说明！';
var DEFAULT_VALUE_ADVERTISING = '例：把你的优惠促销、卖点写出来吧，酒香也怕巷子深，吸引分销商的眼球很重要！';
var DEFAULT_VALUE_EXCURSION = '例：此处用于添加岸上游具体行程说明！';

function addXC(){
    var n = Number($("#xcnum").val());
    var e1 = $("#e1").val();
    var tmp1 = e1.split("@");
    n = n + 1;
    $("#xcnum").val(n);
    //var h = $("#xingcheng").html();
    var h = "";
    h = h + "<table style='width: 100%;border:2px solid #ABBBBB;margin-top: 5px' cellpadding='0' cellspacing='0'>";
    h = h + "<tr style='text-align: center;line-height: 20px'>";
    h = h + "<td style='width: 80px;'>第"+n+"天</td>";
    h = h + "<td style='width:100px;'><select id='location"+n+"' class='easyui-combobox' style='width: 80px;'>";
    var str1 = "";

    var hq = $("#txtPlace").val();
    var hq1 = "";
    if(hq=="6"){
        hq1 = "航海日;上海;济州;釜山;福冈;长崎;鹿儿岛;仁川/首尔;丽水;冲绳;济州（过夜）;首尔（过夜）;横滨/东京;天津;神户;别府";
    }else if(hq=="11"){
        hq1 = "航海日;上海;福冈;长崎;鹿儿岛;冲绳;横滨/东京;天津;神户;别府";
    }else if(hq=="10"){
        hq1 = "航海日;上海;济州;釜山;仁川/首尔;丽水;济州（过夜）;首尔（过夜）;天津";
    }else if(hq=="8"){
        hq1 = "航海日;上海;天津;高雄;基隆/台北;台中";
    }
    h = h + "<option value=''></option>";
    for(var i=0;i<tmp1.length;i++){
        if(tmp1[i]!=str1){
            //判断航区加载目的地
            if(hq1.indexOf(tmp1[i])!=-1){
                h = h + "<option value='"+tmp1[i]+"'>"+tmp1[i]+"</option>";
                str1 = tmp1[i];
            }
        }

    }
    h = h + "</select></td>";
    //h = h + "<td><input type='text' class='easyui-timespinner' id='arrival_time"+n+"' style='width: 60px;' value='00:00'></td>";
    //h = h + "<td><input type='text' class='easyui-timespinner' id='departure_time"+n+"' style='width: 60px;' value='00:00'></td>";
    h = h + "<td style='width:100px;'><select class='easyui-combobox' id='arrival_time"+n+"' style='width:60px;'><option value='00:00'>-</option><option value='01:00'>01:00</option><option value='02:00'>02:00</option><option value='03:00'>03:00</option><option value='04:00'>04:00</option><option value='05:00'>05:00</option><option value='06:00'>06:00</option><option value='07:00'>07:00</option><option value='08:00'>08:00</option><option value='09:00'>09:00</option><option value='10:00'>10:00</option><option value='11:00'>11:00</option><option value='12:00'>12:00</option><option value='13:00'>13:00</option><option value='14:00'>14:00</option><option value='15:00'>15:00</option><option value='16:00'>16:00</option><option value='17:00'>17:00</option><option value='18:00'>18:00</option><option value='19:00'>19:00</option><option value='20:00'>20:00</option><option value='21:00'>21:00</option><option value='22:00'>22:00</option><option value='23:00'>23:00</option><option value='24:00'>24:00</option></select></td>";
    h = h + "<td style='width:100px;'><select class='easyui-combobox' id='departure_time"+n+"' style='width:60px;'><option value='00:00'>-</option><option value='01:00'>01:00</option><option value='02:00'>02:00</option><option value='03:00'>03:00</option><option value='04:00'>04:00</option><option value='05:00'>05:00</option><option value='06:00'>06:00</option><option value='07:00'>07:00</option><option value='08:00'>08:00</option><option value='09:00'>09:00</option><option value='10:00'>10:00</option><option value='11:00'>11:00</option><option value='12:00'>12:00</option><option value='13:00'>13:00</option><option value='14:00'>14:00</option><option value='15:00'>15:00</option><option value='16:00'>16:00</option><option value='17:00'>17:00</option><option value='18:00'>18:00</option><option value='19:00'>19:00</option><option value='20:00'>20:00</option><option value='21:00'>21:00</option><option value='22:00'>22:00</option><option value='23:00'>23:00</option><option value='24:00'>24:00</option></select></td>";
    h = h + "<td style='width:300px'><textarea id='description"+n+"' style='margin-left: 3px;margin-right: 3px;width:95%;' rows='4'></textarea></td>";
    //h = h + "<td><span onclick='showchange(\""+n+"\");' style='line-height:20px;margin-top:0px;display:inline-block;cursor:pointer;background-color: #0169C0;width: 50px;height: //60px;color:#FFFFFF;text-align: center'>选择<br/>预设<br/>行程</span></td>";
    h = h + "<td style='width:100px'><span style='cursor:pointer;' onclick='showchange(\""+n+"\");'><image src='/images/yushe.png' /></span></td>";
    h = h + "<td style='width:100px'><br/>早餐&nbsp;<select class='easyui-combobox' id='breakfast"+n+"' style='width:50px;'><option value=''></option><option value='飞机'>飞机</option><option value='邮轮' selected>邮轮</option><option value='不含'>不含</option><option value='团餐'>团餐</option><option value='酒店'>酒店</option><option value='自理'>自理</option></select><br/>午餐&nbsp;<select class='easyui-combobox' id='lunch"+n+"' style='width:50px;'><option value=''></option><option value='飞机'>飞机</option><option value='邮轮'>邮轮</option><option value='不含'>不含</option><option value='团餐'>团餐</option><option value='酒店'>酒店</option><option value='自理'>自理</option></select><br/>晚餐&nbsp;<select class='easyui-combobox' id='dinner"+n+"' style='width:50px;'><option value=''></option><option value='飞机'>飞机</option><option value='邮轮'>邮轮</option><option value='不含'>不含</option><option value='团餐'>团餐</option><option value='酒店'>酒店</option><option value='自理'>自理</option></select><br/><br/></td>";
    h = h + "<td style='width:80px'><select class='easyui-combobox' id='overnight_stay"+n+"' style='width:50px;'><option value='邮轮'>邮轮</option><option value='酒店'>酒店</option><option value='飞机'>飞机</option><option value='不含'>不含</option></select></td>";
    h = h + "</tr>";
    h = h + "</table>";
    //$("#xingcheng").html(h);

    var targetObj = $(h).appendTo("#xingcheng");
    $("#location"+n).combobox({
        onChange: function (newv,oldv) {
            //监听了select的onchange事件
            if(newv == "航海日"){
                $("#breakfast"+n).combobox('setValue','邮轮');
                $("#lunch"+n).combobox('setValue','邮轮');
                $("#dinner"+n).combobox('setValue','邮轮');
            }else{
                //$("#breakfast"+n).combobox('setValue','');
                //$("#lunch"+n).combobox('setValue','');
                //$("#dinner"+n).combobox('setValue','');
            }
        }
    });
    $.parser.parse(targetObj);
}

function loadxc(){
    var n = Number($("#days").val());
    //solution to can not select in the second day
    var _cache = 0;
    for(var c=0;c<2;c++){
        $("#xcnum").val(0);
        $("#xingcheng").html("");
        for(var i=0;i<n;i++){
            addXC();
        }
    }

    //第1天早餐不含，午餐不含，晚餐邮轮
    //最后一天早餐邮轮，午餐，晚餐不含
    //其他的早餐邮轮
    //最后一天住宿默认没有
    $("#breakfast1").combobox("setValue","不含");
    $("#lunch1").combobox("setValue","不含");
    $("#dinner1").combobox("setValue","邮轮");

    $("#breakfast"+n).combobox("setValue","邮轮");
    $("#lunch"+n).combobox("setValue","不含");
    $("#dinner"+n).combobox("setValue","不含");

    $("#overnight_stay"+n).combobox("setValue","");
}

function productsave(){

    if($("#txtCuriseCompany").val()=="*"){
        alert("邮轮公司必填！");return false;
    }
    if($("#ship_id").val()=="*"){
        alert("邮轮名称必填！");return false;
    }
    if(!$("input[name='ptype']:checked").val()){
        alert("产品类型必填！");return false;
    }
    if(!$("input[name='gotype']:checked").val()){
        alert("出发地区必填！");return false;
    }
    if($("#txtPlace").val()=="*"){
        alert("航区必填！");return false;
    }
    if($("#start_date").val()==""){
        alert("出发日期必填！");return false;
    }
    if($("#days").val()==""){
        alert("天数必填！");return false;
    }

    //必须上传图片
    if($("#advertising_img_url").val()!=""){
        var tmp1 =  $("#advertising_img_url").val().split(".");
        if(tmp1[1] !='jpg' && tmp1[1] !='JPG' && tmp1[1] !='bmp' && tmp1[1] !='png'){
            alert("对不起，促销海报上传文件格式出错，请选择图片文件！"); return false;
        }
    }

    createpName();

    var titlec = $("#titlec").val();
    if(titlec!=""){
        var tmpc = titlec.split("@");
        for(var i=0;i<tmpc.length;i++){
            if(tmpc[i]==$("#title").val()){
                //var bln1 = window.confirm("贵公司已发布过产品名称为'"+$("#title").val()+"'的产品，再次发布将替换原有产品，是否继续操作？");
                //if(bln1 == false){return false;}
            }
        }
    }
    $("#redirurl").val("optionpublish");
    if($("#visa_application_until").val()==""){
        $("#visa_application_until").val("1977-01-01");
    }

    html = editor.html();
    editor.sync();

    if($("#advertising").val()==DEFAULT_VALUE_ADVERTISING){
        $("#advertising").val("");
    }

    if($("#excursion_txt").val()==DEFAULT_VALUE_EXCURSION){
        $("#excursion_txt").val("");
    }

    if($("#schedule_comment").val()==DEFAULT_VALUE_SCHEDULE_COMMENT) {
        $("#schedule_comment").val("");
    }

    var d = $("#start_date").val();
    var t2 = d.split("-");
    var a = $("#shipNo").val();
    var b = $("#shipNum").val();
    var t = a.split(";");
    var t1 = b.split(";");
    var shipNo = "";
    for(var i=0;i< t.length;i++){
        if(t[i]==$("#ship_id").val()){
            shipNo = t1[i];
        }
    }
    /*
     for(var i=1;i<14;i++){
     if($("#ck"+i).attr("checked")=="checked"){
     $("#bh"+i).val(1);
     }else{
     $("#bh"+i).val(0);
     }
     } */
    //添加行程


    var a1 = "";var a2 = "";var a3 = "";var a4 = "";var a5 = "";var a6 = "";var a7 = "";var a8 = "";var a9 = "";
    var l = Number($("#xcnum").val());
    for(var i=1;i<l+1;i++){
        if(a1==""){
            a1 = i+"";
            a2 = $("#location"+i).next().find("input").val();
            a3 = $("#arrival_time"+i).next().find("input").val()=="-"?"00:00":$("#arrival_time"+i).next().find("input").val();

            a4 = $("#departure_time"+i).next().find("input").val()=="-"?"00:00":$("#departure_time"+i).next().find("input").val();

            a5 = $("#description"+i).val();
            a6 = $("#breakfast"+i).next().find("input").val();
            a7 = $("#lunch"+i).next().find("input").val();
            a8 = $("#dinner"+i).next().find("input").val();
            a9 = $("#overnight_stay"+i).next().find("input").val();
        }else{
            a1 = a1+"@"+i+"";
            a2 = a2+"@"+$("#location"+i).next().find("input").val();
            a3 = a3+"@"+($("#arrival_time"+i).next().find("input").val()=="-"?"00:00":$("#arrival_time"+i).next().find("input").val());

            a4 = a4+"@"+($("#departure_time"+i).next().find("input").val()=="-"?"00:00":$("#departure_time"+i).next().find("input").val());

            a5 = a5+"@"+$("#description"+i).val();
            a6 = a6+"@"+$("#breakfast"+i).next().find("input").val();
            a7 = a7+"@"+$("#lunch"+i).next().find("input").val();
            a8 = a8+"@"+$("#dinner"+i).next().find("input").val();
            a9 = a9+"@"+$("#overnight_stay"+i).next().find("input").val();
        }
    }

    $("#day_number0").val(a1);
    $("#location0").val(a2);
    $("#departure_time0").val(a3);
    $("#arrival_time0").val(a4);
    $("#description0").val(a5);
    $("#breakfast0").val(a6);
    $("#lunch0").val(a7);
    $("#dinner0").val(a8);
    $("#overnight_stay0").val(a9);

    //添加价格
    var a1 = "";var a2 = "";var a3 = "";var a4 = "";var a5 = "";var a6 = "";var a7 = "";var a8 = "";var a9 = "";var a0 = "";
    for(var i=1;i<100;i++){
        if($("#z"+i+"1").val()){
            if(a1==""){
                a1 = $("#z"+i+"8").val();
                a2 = "";
                a3 = $("#z"+i+"1").val();
                a4 = $("#z"+i+"2").val();
                a5 = $("#z"+i+"3").val();
                a6 = $("#z"+i+"4").val();
                a7 = $("#z"+i+"5").val();
                a8 = $("#z"+i+"6").val();
                a9 = $("#z"+i+"7").val();
                a0 = "";
            }else{
                a1 = a1+"@"+$("#z"+i+"8").val();
                a2 = a2+"@"+"";
                a3 = a3+"@"+$("#z"+i+"1").val();
                a4 = a4+"@"+$("#z"+i+"2").val();
                a5 = a5+"@"+$("#z"+i+"3").val();
                a6 = a6+"@"+$("#z"+i+"4").val();
                a7 = a7+"@"+$("#z"+i+"5").val();
                a8 = a8+"@"+$("#z"+i+"6").val();
                a9 = a9+"@"+$("#z"+i+"7").val();
                a0 = a0+"@";
            }
        }
        if($("#w"+i+"1").val()){
            a1 = a1+"@"+$("#w"+i+"9").val();
            a2 = a2+"@"+$("#w"+i+"8").val();
            a3 = a3+"@"+$("#w"+i+"1").val();
            a4 = a4+"@"+$("#w"+i+"2").val();
            a5 = a5+"@"+$("#w"+i+"3").val();
            a6 = a6+"@"+$("#w"+i+"4").val();
            a7 = a7+"@"+$("#w"+i+"5").val();
            a8 = a8+"@"+$("#w"+i+"6").val();
            a9 = a9+"@"+$("#w"+i+"7").val();
            a0 = a0+"@"+$("#w"+i+"0").val();
        }
    }

    $("#dh1").val(a1);
    $("#dh2").val(a2);
    $("#dh3").val(a3);
    $("#dh4").val(a4);
    $("#dh5").val(a5);
    $("#dh6").val(a6);
    $("#dh7").val(a7);
    $("#dh8").val(a8);
    $("#dh9").val(a9);
    $("#dh0").val(a0);

    createNo(t2,shipNo);


    alert("保存成功！");
    document.forms[0].submit();
}

function producteditsave(){

    if($("#txtCuriseCompany").val()=="*"){
        alert("邮轮公司必填！");return false;
    }
    if($("#ship_id").val()=="*"){
        alert("邮轮名称必填！");return false;
    }
    if(!$("input[name='ptype']:checked").val()){
        alert("产品类型必填！");return false;
    }
    if(!$("input[name='gotype']:checked").val()){
        alert("出发地区必填！");return false;
    }
    if($("#txtPlace").val()=="*"){
        alert("航区必填！");return false;
    }
    if($("#start_date").val()==""){
        alert("出发日期必填！");return false;
    }
    if($("#days").val()==""){
        alert("天数必填！");return false;
    }

    //必须上传图片
    if($("#advertising_img_url").val()!=""){
        var tmp1 =  $("#advertising_img_url").val().split(".");
        if(tmp1[1] !='jpg' && tmp1[1] !='JPG' && tmp1[1] !='bmp' && tmp1[1] !='png'){
            alert("对不起，促销海报上传文件格式出错，请选择图片文件！"); return false;
        }
    }

    createpName();


    $("#redirurl").val("optionpublish");

    if($("#visa_application_until").val()==""){
        $("#visa_application_until").val("1977-01-01");
    }

    html = editor.html();
    editor.sync();

    if($("#advertising").val()=="例：把你的优惠促销、卖点写出来吧，酒香也怕巷子深，吸引分销商的眼球很重要！"){
        $("#advertising").val("");
    }

    if($("#excursion_txt").val()=="例：此处用于添加岸上游具体行程说明！"){
        $("#excursion_txt").val("");
    }



    var d = $("#start_date").val();
    var t2 = d.split("-");
    var a = $("#shipNo").val();
    var b = $("#shipNum").val();
    var t = a.split(";");
    var t1 = b.split(";");
    var shipNo = "";
    for(var i=0;i< t.length;i++){
        if(t[i]==$("#ship_id").val()){
            shipNo = t1[i];
        }
    }
    /*
     for(var i=1;i<14;i++){
     if($("#ck"+i).attr("checked")=="checked"){
     $("#bh"+i).val(1);
     }else{
     $("#bh"+i).val(0);
     }
     } */
    //添加行程

    var tm1 = $("#departure_time0").val();
    var tm2 = $("#arrival_time0").val();
    var tm3 = $("#breakfast0").val();
    var tm4 = $("#lunch0").val();
    var tm5 = $("#dinner0").val();
    var tm6 = $("#overnight_stay0").val();
    var cm1 = tm1.split("@");
    var cm2 = tm2.split("@");
    var cm3 = tm3.split("@");
    var cm4 = tm4.split("@");
    var cm5 = tm5.split("@");
    var cm6 = tm6.split("@");
    var a1 = "";var a2 = "";var a3 = "";var a4 = "";var a5 = "";var a6 = "";var a7 = "";var a8 = "";var a9 = "";
    var l = Number($("#xcnum").val());
    for(var i=1;i<l+1;i++){
        /*
        if(a1==""){
            a1 = i+"";
            a2 = $("#location"+i).combobox('getValue');
            a3 = $("#arrival_time"+i).combobox('getValue');
            if(a3 == "00:00"){
                a3 = cm2[i-1];
            }
            a4 = $("#departure_time"+i).combobox('getValue');
            if(a4 == "00:00"){
                a4 = cm1[i-1];
            }
            a5 = $("#description"+i).val();
            a6 = $("#breakfast"+i).combobox('getValue');
            if(a6==""){
                a6 = cm3[i-1];
            }
            a7 = $("#lunch"+i).combobox('getValue');
            if(a7==""){
                a7 = cm4[i-1];
            }
            a8 = $("#dinner"+i).combobox('getValue');
            if(a8==""){
                a8 = cm5[i-1];
            }
            a9 = $("#overnight_stay"+i).combobox('getValue');
            if(a9==""){
                a9 = cm6[i-1];
            }
        }else{
            a1 = a1+"@"+i+"";
            a2 = a2+"@"+$("#location"+i).combobox('getValue');
            if($("#arrival_time"+i).combobox('getValue')== "00:00"){
                a3 = a3+"@"+cm2[i-1];
            }else{
                a3 = a3+"@"+$("#arrival_time"+i).combobox('getValue');
            }

            if($("#departure_time"+i).combobox('getValue')== "00:00"){
                a4 = a4+"@"+cm1[i-1];
            }else{
                a4 = a4+"@"+$("#departure_time"+i).combobox('getValue');
            }

            a5 = a5+"@"+$("#description"+i).val();

            if($("#breakfast"+i).combobox('getValue')== ""){
                a6 = a6+"@"+cm3[i-1];
            }else{
                a6 = a6+"@"+$("#breakfast"+i).combobox('getValue');
            }

            if($("#lunch"+i).combobox('getValue')== ""){
                a7 = a7+"@"+cm4[i-1];
            }else{
                a7 = a7+"@"+$("#lunch"+i).combobox('getValue');
            }

            if($("#dinner"+i).combobox('getValue')== ""){
                a8 = a8+"@"+cm5[i-1];
            }else{
                a8 = a8+"@"+$("#dinner"+i).combobox('getValue');
            }

            if($("#overnight_stay"+i).combobox('getValue')== ""){
                a9 = a9+"@"+cm6[i-1];
            }else{
                a9 = a9+"@"+$("#overnight_stay"+i).combobox('getValue');
            }


        }*/
        if(a1==""){
            a1 = i+"";
            a2 = $("#location"+i).next().find("input").val();
            a3 = $("#arrival_time"+i).next().find("input").val()=="-"?"00:00":$("#arrival_time"+i).next().find("input").val();

            a4 = $("#departure_time"+i).next().find("input").val()=="-"?"00:00":$("#departure_time"+i).next().find("input").val();

            a5 = $("#description"+i).val();
            a6 = $("#breakfast"+i).next().find("input").val();
            a7 = $("#lunch"+i).next().find("input").val();
            a8 = $("#dinner"+i).next().find("input").val();
            a9 = $("#overnight_stay"+i).next().find("input").val();
        }else{
            a1 = a1+"@"+i+"";
            a2 = a2+"@"+$("#location"+i).next().find("input").val();
            a3 = a3+"@"+($("#arrival_time"+i).next().find("input").val()=="-"?"00:00":$("#arrival_time"+i).next().find("input").val());

            a4 = a4+"@"+($("#departure_time"+i).next().find("input").val()=="-"?"00:00":$("#departure_time"+i).next().find("input").val());

            a5 = a5+"@"+$("#description"+i).val();
            a6 = a6+"@"+$("#breakfast"+i).next().find("input").val();
            a7 = a7+"@"+$("#lunch"+i).next().find("input").val();
            a8 = a8+"@"+$("#dinner"+i).next().find("input").val();
            a9 = a9+"@"+$("#overnight_stay"+i).next().find("input").val();
        }
    }

    $("#day_number0").val(a1);
    $("#location0").val(a2);
    $("#departure_time0").val(a3);
    $("#arrival_time0").val(a4);
    $("#description0").val(a5);
    $("#breakfast0").val(a6);
    $("#lunch0").val(a7);
    $("#dinner0").val(a8);
    $("#overnight_stay0").val(a9);

    //添加价格
    var a1 = "";var a2 = "";var a3 = "";var a4 = "";var a5 = "";var a6 = "";var a7 = "";var a8 = "";var a9 = "";var a0 = "";
    for(var i=1;i<100;i++){
        if($("#z"+i+"1").val()){
            if(a1==""){
                a1 = $("#z"+i+"8").val();
                a2 = "";
                a3 = $("#z"+i+"1").val();
                a4 = $("#z"+i+"2").val();
                a5 = $("#z"+i+"3").val();
                a6 = $("#z"+i+"4").val();
                a7 = $("#z"+i+"5").val();
                a8 = $("#z"+i+"6").val();
                a9 = $("#z"+i+"7").val();
                a0 = "";
            }else{
                a1 = a1+"@"+$("#z"+i+"8").val();
                a2 = a2+"@"+"";
                a3 = a3+"@"+$("#z"+i+"1").val();
                a4 = a4+"@"+$("#z"+i+"2").val();
                a5 = a5+"@"+$("#z"+i+"3").val();
                a6 = a6+"@"+$("#z"+i+"4").val();
                a7 = a7+"@"+$("#z"+i+"5").val();
                a8 = a8+"@"+$("#z"+i+"6").val();
                a9 = a9+"@"+$("#z"+i+"7").val();
                a0 = a0 + "@" ;
            }
        }
        if($("#w"+i+"1").val()){
            a1 = a1+"@"+$("#w"+i+"9").val();
            a2 = a2+"@"+$("#w"+i+"8").val();
            a3 = a3+"@"+$("#w"+i+"1").val();
            a4 = a4+"@"+$("#w"+i+"2").val();
            a5 = a5+"@"+$("#w"+i+"3").val();
            a6 = a6+"@"+$("#w"+i+"4").val();
            a7 = a7+"@"+$("#w"+i+"5").val();
            a8 = a8+"@"+$("#w"+i+"6").val();
            a9 = a9+"@"+$("#w"+i+"7").val();
            a0 = a0+"@"+$("#w"+i+"0").val();
        }
    }



    $("#dh1").val(a1);
    $("#dh2").val(a2);
    $("#dh3").val(a3);
    $("#dh4").val(a4);
    $("#dh5").val(a5);
    $("#dh6").val(a6);
    $("#dh7").val(a7);
    $("#dh8").val(a8);
    $("#dh9").val(a9);
    $("#dh0").val(a0);

    //判断如果供应商,船，出发日期有变化的时候才生成新的产品编号
    if($("#numchanged").val()=="1"){
        createNo(t2,shipNo);
    }
    alert("保存成功！");
    document.forms[0].submit();
}

function createpName(){
    var pname = "";
    //产品名称=出发日期月日+船名+晚天数+航区+“游”
    var a = $("#shipNo").val();
    var b = $("#shipName").val();
    var t = a.split(";");
    var t1 = b.split(";");
    var shipName = "";

    var d = $("#start_date").val();
    if(d!=""){
        var tmp = d.split("-");
        pname = pname +  Number(tmp[1])+"月"+Number(tmp[2])+"日";
    }

    for(var i=0;i< t.length;i++){
        if(t[i]==$("#ship_id").val()){
            shipName = t1[i];
        }
    }
    pname = pname +  shipName;

    pname = pname + $("#wan").val()+"晚"+ $("#days").val()+"天";
    pname = pname + $.trim($("#txtPlace").find("option:selected").text());
    pname = pname + "游";
    $("#title").val(pname);
}

function createNo(t2,shipNo){
    var dat = new Date();
    var day = (dat.getDate()+"").length == 1?"0"+dat.getDate():dat.getDate();
    var hour = (dat.getHours()+"").length == 1?"0"+dat.getHours():dat.getHours();
    //产品编号=供应商ID+出发日期年度后两位+船简称+出发日期月日+当前日期的月日小时分钟秒
    $("#product_number").val($("#companyID").val()+"-"+t2[0].substring(2,4)+"-"+shipNo+t2[1]+t2[2]+"-"+day+hour);
}

function GetRandomNum(Min,Max){   
    var Range = Max - Min;   
    var Rand = Math.random();   
    return(Min + Math.round(Rand * Range));   
} 

 //如果修改了产品编号生成规则了
    function changeRule(){
        var d = $("#start_date").val();
        var t2 = d.split("-");

        var a = $("#shipNo").val();
        var b = $("#shipNum").val();
        var t = a.split(";");
        var t1 = b.split(";");
        var shipNo = "";
        for(var i=0;i< t.length;i++){
            if(t[i]==$("#ship_id").val()){
                shipNo = t1[i];
            }
        }
        createNo(t2,shipNo);
        $("#numchanged").val("1");
    }

function step1next(){
    //手机号验证
    var a10 = $("#usertel").val();
    //if(a10!="" && a10.length!=11){
    //  alert("请输入正确的手机号！");return false;
    //}
    if($("#txtCuriseCompany").val()=="*"){
        alert("邮轮公司必填！");return false;
    }
    if($("#ship_id").val()=="*"){
        alert("邮轮名称必填！");return false;
    }
    if(!$("input[name='ptype']:checked").val()){
        alert("产品类型必填！");return false;
    }
    if(!$("input[name='gotype']:checked").val()){
        alert("出发地区必填！");return false;
    }
    if($("#txtPlace").val()=="*"){
        alert("航区必填！");return false;
    }
    if($("#start_date").val()==""){
        alert("出发日期必填！");return false;
    }
    if($("#days").val()==""){
        alert("天数必填！");return false;
    }

    //必须上传图片
    if($("#advertising_img_url").val()!=""){
        var tmp1 =  $("#advertising_img_url").val().split(".");
        if(tmp1[1] !='jpg' && tmp1[1] !='JPG' && tmp1[1] !='bmp' && tmp1[1] !='png'){
            alert("对不起，促销海报上传文件格式出错，请选择图片文件！"); return false;
        }
    }

    for(var i=1;i<15;i++){
        $("#yy"+i).css("background-color","#B3B3B3");
        $("#xx"+i).css("background-color","#B3B3B3");
    }

    if($("input[name='ptype']:checked").val()=="1"){

        for(var i=1;i<3;i++){
            $("#yy"+i).css("background-color","#62C46F");
            $("#bh"+i).val(1);
        }
        $("#xx14").css("background-color","#F7861E");
        $("#bh14").val(0);
        for(var i=3;i<14;i++){
            $("#xx"+i).css("background-color","#F7861E");
            $("#bh"+i).val(0);
        }
    }else{
        for(var i=1;i<7;i++){
            $("#yy"+i).css("background-color","#62C46F");
            $("#bh"+i).val(1);
        }
        $("#yy14").css("background-color","#62C46F");
        $("#bh14").val(1);
        for(var i=9;i<14;i++){
            $("#xx"+i).css("background-color","#F7861E");
            $("#bh"+i).val(0);
        }
    }

    createpName();

    //点击下一步的时候判断是否是该公司已经发不过产品
    var d = $("#start_date").val();
    var t2 = d.split("-");

    var a = $("#shipNo").val();
    var b = $("#shipNum").val();
    var t = a.split(";");
    var t1 = b.split(";");
    var shipNo = "";
    for(var i=0;i< t.length;i++){
        if(t[i]==$("#ship_id").val()){
            shipNo = t1[i];
        }
    }

    createNo(t2,shipNo);

    var titlec = $("#titlec").val();
    
    if(titlec!=""){
        var tmpc = titlec.split("@");
        for(var i=0;i<tmpc.length;i++){
            if(tmpc[i]==$("#product_number").val()){
                var bln1 = window.confirm("贵公司已发布过产品名称为'"+$("#title").val()+"'的产品，再次发布将替换原有产品，是否继续操作？");
                if(bln1 == false){return false;}
            }
        }
    }


    $('#step1').css('display','none');
    $('#step2').removeAttr('style');
    $('#step3').css('display','none');

    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = url1 + "#";
    }else{
        window.location = url1;
    }
    window.parent.htotop();
}

function step2next(){
    var lab = 0;
    for(var i=1;i<5;i++){
        if($("#z"+i+"6").val()){
            if($("#z"+i+"6").val()!="0"){
                lab = 1;
            }
        }
    }
    for(var i=1;i<50;i++){
        if($("#w"+i+"6").val()){
            if($("#w"+i+"6").val()!="0"){
                lab = 1;
            }
        }
    }
    if(lab == 0){
        alert("价格体系中可售房间数必填！");return false;
    }

    //如果1,2人价填写了，结算价必填
    for(var i=1;i<5;i++){
        if($("#z"+i+"1").val()){
            if($("#z"+i+"1").val()!="0" && $("#z"+i+"2").val()=="0"){
                alert("1，2人价格填写了结算价必填！");return false;
            }
            if($("#z"+i+"3").val()!="0" && $("#z"+i+"4").val()=="0"){
                alert("3，4人价格填写了结算价必填！");return false;
            }
        }
    }

    for(var i=1;i<50;i++){
        if($("#w"+i+"1").val()){
            if($("#w"+i+"1").val()!="0" && $("#w"+i+"2").val()=="0"){
                alert("1，2人价格填写了结算价必填！");return false;
            }
            if($("#w"+i+"3").val()!="0" && $("#w"+i+"4").val()=="0"){
                alert("3，4人价格填写了结算价必填！");return false;
            }
        }
    }
    $('#step1').css('display','none');$('#step3').removeAttr('style');$('#step2').css('display','none');

    if($("#visa_application_until").val()=="1977-01-01"){
        $("#visa_application_until").val("");
    }

    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = url1 + "#";
    }else{
        window.location = url1;
    }
    window.parent.htotop();
}

function steped1next(){
    //编辑后第一个下一步

    //手机号验证
    var a10 = $("#usertel").val();
    //if(a10!="" && a10.length!=11){
    //  alert("请输入正确的手机号！");return false;
    //}
    if($("#txtCuriseCompany").val()=="*"){
        jAlert("邮轮公司必填！");return false;
    }
    if($("#ship_id").val()=="*"){
        jAlert("邮轮名称必填！");return false;
    }
    if(!$("input[name='ptype']:checked").val()){
        jAlert("产品类型必填！");return false;
    }
    if(!$("input[name='gotype']:checked").val()){
        jAlert("出发地区必填！");return false;
    }
    if($("#txtPlace").val()=="*"){
        jAlert("航区必填！");return false;
    }
    if($("#start_date").val()==""){
        jAlert("出发日期必填！");return false;
    }
    if($("#days").val()==""){
        jAlert("天数必填！");return false;
    }

    //必须上传图片
    if($("#advertising_img_url").val()!=""){
        var tmp1 =  $("#advertising_img_url").val().split(".");
        if(tmp1[1] !='jpg' && tmp1[1] !='JPG' && tmp1[1] !='bmp' && tmp1[1] !='png'){
            alert("对不起，促销海报上传文件格式出错，请选择图片文件！"); return false;
        }
    }

    /*
     for(var i=1;i<15;i++){
     $("#yy"+i).css("background-color","#B3B3B3");
     $("#xx"+i).css("background-color","#B3B3B3");
     }

     if($("input[name='ptype']:checked").val()=="1"){

     for(var i=1;i<3;i++){
     $("#yy"+i).css("background-color","#62C46F");
     $("#bh"+i).val(1);
     }
     $("#xx14").css("background-color","#F7861E");
     $("#bh14").val(0);
     for(var i=3;i<14;i++){
     $("#xx"+i).css("background-color","#F7861E");
     $("#bh"+i).val(0);
     }
     }else{
     for(var i=1;i<7;i++){
     $("#yy"+i).css("background-color","#62C46F");
     $("#bh"+i).val(1);
     }
     $("#yy14").css("background-color","#62C46F");
     $("#bh14").val(1);
     for(var i=9;i<14;i++){
     $("#xx"+i).css("background-color","#F7861E");
     $("#bh"+i).val(0);
     }
     }
     */

    createpName();


    $('#step1').css('display','none');$('#step2').removeAttr('style');$('#step3').css('display','none');

    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = url1 + "#";
    }else{
        window.location = url1;
    }
}



$(function(){
    $('#gys').select2();
    var url = window.location.href;
    if(url.indexOf("publishproduct")>0 && url.indexOf("publishproductedit")==-1){
        if($("#e1").val()){
            //addXC();

            //默认团队游包含前面6个，其他都不包含
            for(var i=1;i<7;i++){
                $("#yy"+i).css("background-color","#62C46F");
                $("#bh"+i).val(1);
            }
            $("#yy14").css("background-color","#62C46F");
            $("#bh14").val(1);
            for(var i=9;i<14;i++){
                $("#xx"+i).css("background-color","#F7861E");
                $("#bh"+i).val(0);
            }
        }
        //$('#w').window('close');
    }

    if(url.indexOf("publishproductedit")>0){
        //加载价格体系
        loadPRICE();
        //加载已经填写过的价格
        var tmp1 = ($("#cj1").val()).split("@");
        var tmp2 = ($("#cj2").val()).split("@");
        var tmp3 = ($("#cj3").val()).split("@");
        var tmp4 = ($("#cj4").val()).split("@");
        var tmp5 = ($("#cj5").val()).split("@");
        var tmp6 = ($("#cj6").val()).split("@");
        var tmp7 = ($("#cj7").val()).split("@");
        var tmp8 = ($("#cj8").val()).split("@");
        var tmp9 = ($("#cj9").val()).split("@");
        var tmp0 = ($("#cj0").val()).split("@");

        for(var i=1;i<50;i++){
            if($("#dm"+i).html()){
                for(var j=0;j<tmp8.length;j++){

                    if(tmp8[j]==$("#dm"+i).html()){
                        $("#w"+i+"1").val(tmp1[j]);
                        $("#w"+i+"2").val(tmp2[j]);
                        $("#w"+i+"3").val(tmp3[j]);
                        $("#w"+i+"4").val(tmp4[j]);
                        $("#w"+i+"5").val(tmp5[j]);
                        $("#w"+i+"6").val(tmp6[j]);
                        $("#w"+i+"7").val(tmp7[j]);
                        $("#w"+i+"0").val(tmp0[j]);
                    }
                }
            }
        }

        for(var i=1;i<6;i++){
            if($("#dn"+i).html()){
                for(var j=0;j<tmp8.length;j++){
                    if(tmp8[j]=="-"){
                        $("#z"+tmp9[j]+"1").val(tmp1[j]);
                        $("#z"+tmp9[j]+"2").val(tmp2[j]);
                        $("#z"+tmp9[j]+"3").val(tmp3[j]);
                        $("#z"+tmp9[j]+"4").val(tmp4[j]);
                        $("#z"+tmp9[j]+"5").val(tmp5[j]);
                        $("#z"+tmp9[j]+"6").val(tmp6[j]);
                        $("#z"+tmp9[j]+"7").val(tmp7[j]);
                    }
                }
            }
        }

        $('#pricelist').removeAttr('style');$('.zhup').css('display','none');$('.zip').removeAttr('style').css('text-align','center');$('#dlexl').css('display','none');

        //加载行程框
        var num = Number($("#ic").val());
        for(var i=1;i<num+1;i++){
            addXC();
        }
        //加载用户填写的行程内容
        var tmp1 = ($("#dj1").val()).split("@");
        var tmp2 = ($("#dj2").val()).split("@");
        var tmp3 = ($("#dj3").val()).split("@");
        var tmp4 = ($("#dj4").val()).split("@");
        var tmp5 = ($("#dj5").val()).split("@");
        var tmp6 = ($("#dj6").val()).split("@");
        var tmp7 = ($("#dj7").val()).split("@");
        var tmp8 = ($("#dj8").val()).split("@");
        var g1 = "";
        var g2 = "";
        var g3 = "";
        var g4 = "";
        var g5 = "";
        var g6 = "";
        var j = 0;
        for(var i=0;i<tmp1.length;i++){
            j = j + 1;
            //$("#arrival_time1 option[text='02:00']").attr("selected", true);
            $("#location"+j).combobox('setValue',tmp1[i]);
            $("#arrival_time"+j).combobox('setValue',tmp2[i].substring(0,5));
            // $("#arrival_time"+j).combobox('setValue','02:00');

            // $("#arrival_time"+j).combobox('select',data[1].value);
            $("#departure_time"+j).combobox('setValue',tmp3[i].substring(0,5));
            $("#description"+j).val(tmp4[i]);
            $("#breakfast"+j).combobox('setValue',tmp5[i]);
            $("#lunch"+j).combobox('setValue',tmp6[i]);
            $("#dinner"+j).combobox('setValue',tmp7[i]);
            $("#overnight_stay"+j).combobox('setValue',tmp8[i]);

            //添加赋值，防止产品再次编辑的时候抵达时间出发时间用餐住宿没有保存成功
            if(g1 == ""){
                g1 = tmp2[i].substring(0,5);
                g2 = tmp3[i].substring(0,5);

                g3 = tmp5[i].substring(0,5);
                g4 = tmp6[i].substring(0,5);
                g5 = tmp7[i].substring(0,5);
                g6 = tmp8[i].substring(0,5);
            }else{
                g1 = g1+"@"+tmp2[i].substring(0,5);
                g2 = g2+"@"+tmp3[i].substring(0,5);

                g3 = g3+"@"+tmp5[i].substring(0,5);
                g4 = g4+"@"+tmp6[i].substring(0,5);
                g5 = g5+"@"+tmp7[i].substring(0,5);
                g6 = g6+"@"+tmp8[i].substring(0,5);
            }
        }

        //
        $("#departure_time0").val(g2);
        $("#arrival_time0").val(g1);

        $("#breakfast0").val(g3);
        $("#lunch0").val(g4);
        $("#dinner0").val(g5);
        $("#overnight_stay0").val(g6);
        parent.ResizeIframeFromParent('page4');
    }

});