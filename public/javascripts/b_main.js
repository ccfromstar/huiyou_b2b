$(function(){
    var url = window.location.href;

    var urlbefore = document.referrer;

    var beforetmp = urlbefore.split("/");

    if($("#beforetmp")){
        $("#beforetmp").val(beforetmp[3]);
    }

    var tmp = url.split("/");

    //个人中心标签显示
    if(tmp[3]=="optionpwd"||tmp[3]=="option"||tmp[3]=="optionadmin"||tmp[3]=="optioncompany"){
        $("#_om5").css("background-color","#F7861E").removeClass("tdfooter2");
    }else if(tmp[3]=="optionaccount"){
        $("#_om4").css("background-color","#F7861E").removeClass("tdfooter2");
    }else if(tmp[3]=="optionpublish1"||tmp[3]=="optionpublish2"){
        $("#_om3").css("background-color","#F7861E").removeClass("tdfooter2");
    }else if(tmp[3]=="optionpublish"){
        $("#_om2").css("background-color","#F7861E").removeClass("tdfooter2");
    }else if(tmp[3]=="optionweixin"){
        $("#_om6").css("background-color","#F7861E").removeClass("tdfooter2");
    }

    if(tmp[3]=="market"){
        window.parent.gt3();
    }else if(tmp[3]=="marketbuy"){
        window.parent.gt31();
    }



    //加载首页滚动广告
    var winlen = $(window).width();
    var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
    var len = $("#focus ul li").length; //获取焦点图个数
    var lengthd =  len/50;
    var index = 0;
    var indexd = 25;
    var picTimer;

    setCookie("indexd",25);
    setCookie("label",0);

    //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
    //var btn = "<div class='btnBg'></div>";
    var btn = "<div class='btn'>";
    for(var i=0; i < lengthd; i++) {
        btn += "<span></span>";
    }
    btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    $("#focus").append(btn);
    $("#focus .btnBg").css("opacity",0.5);

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#focus .btn span").css("opacity",0.4).mouseover(function() {
        index = $("#focus .btn span").index(this);
        //indexd = $("#focus .btn span").index(this);
        //if(getCookie("indexd")){
        indexd = index + Number(getCookie("indexd"))*lengthd;
        //}else{
        //    indexd = index;
        //}
        if(Number(getCookie("label")) == 0){
            showPics1(index,indexd,lengthd,sWidth);
        }else{
            showPics(index,indexd,lengthd,sWidth);
        }


    }).eq(0).trigger("mouseover");

    //上一页、下一页按钮透明度处理
    $("#focus .preNext").css("opacity",0.4).hover(function() {
        $(this).stop(true,false).animate({"opacity":"0.5"},300);
    },function() {
        $(this).stop(true,false).animate({"opacity":"0.4"},300);
    });

    //上一页按钮
    $("#focus .pre").click(function() {
        index -= 1;
        indexd -= 1;
        if(index == -1) {index = lengthd - 1;}
        if(index == 499) {index = lengthd - 1;}

        //if(indexd < 0){alert("已经是第一张图片!");return false;}
        showPics(index,indexd,lengthd,sWidth);
    });

    //下一页按钮
    $("#focus .next").click(function() {
        index += 1;
        indexd += 1;
        if(index == lengthd) {index = 0;}
        showPics(index,indexd,lengthd,sWidth);
    });

    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $("#focus ul").css("width",sWidth * (len));


    var picTimer = setInterval(function() {
        if(indexd ==len){
            window.location.reload();
        }
        showPics(index,indexd,lengthd,sWidth);
        index++;
        indexd++;
        if(index == lengthd) {index = 0;}
    },5000); //此5000代表自动播放的间隔，单位：毫秒

    $(".btn").css("left",350);

    //格式修正
    
    if($("#qxzc").html()){
        var ht = $("#qxzc").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        $("#qxzc").html(ht);
    }

    for(var i=0;i<10;i++){
        if($("#xiaoC"+i).html()){
            var ht = $("#xiaoC"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#xiaoC"+i).html(ht);
        }
    }

    for(var i=0;i<50;i++){
        if($("#xiaoD"+i).html()){
            var ht = $("#xiaoD"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#xiaoD"+i).html(ht);
        }
    }

    if($("#qxzc1").html()){
        var ht = $("#qxzc1").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        $("#qxzc1").html(ht);
    }
    /*
    //点击预览页
    if(url.indexOf("publishproductyulan")!=-1) {
        for(var i=1;i<7;i++){
            window.parent.document.getElementById('page'+i).style.height = '5000px';
        }
    }
    //点击产品详情
    if(url.indexOf("productdetail")!=-1) {
        for(var i=1;i<7;i++){
            window.parent.document.getElementById('page'+i).style.height = '5000px';
        }
    }
    */




    for(var i=0;i<6;i++){
        if($("#cxtableid"+i)){
            $("#cxtableid"+i).hover(function(){
                $(this).css("border-color","#85B4DE");
            },function(){
                $(this).css("border-color","#ABBBBB");
            });
        }
    }

    //马里奥
    $("#fa1").hover(function(){
        $(this).attr("src","/images/fa11.png");
        $("#jian1").css("display","inline").css("width","35px");
    },function(){
        $(this).attr("src","/images/fa1.png");
        $("#jian1").css("display","none");
    });

    $("#fa2").hover(function(){
        $(this).attr("src","/images/fa22.png");
        $("#jian2").css("display","inline").css("width","35px");
    },function(){
        $(this).attr("src","/images/fa2.png");
        $("#jian2").css("display","none");
    });

    $("#fa3").hover(function(){
        $(this).attr("src","/images/fa33.png");
        $("#jian3").css("display","inline").css("width","35px");
    },function(){
        $(this).attr("src","/images/fa3.png");
        $("#jian3").css("display","none");
    });

    $(".bcs").hover(function(){
        $(this).css("color","#F4901E");
    },function(){
        $(this).css("color","#797979");
    });
     
     //用户打印时 隐藏最上一排fixed
    $("#print-button").click(function(){
       $("#print").hide();
       window.print();
       $("#print").show();
      

    });

    //*********************************************


    var url = window.location.href;
    //if(url.indexOf("homepage")==-1) {

    //}

    if(url.indexOf("market")!=-1) {
        if(url.indexOf("?p=fb")!=-1) {
           $("#buy1").css("display","none");
        } else{
           $("#buy2").css("display","none");
        }
    }

    if(document.getElementById("name")){
        var remember = getCookie("remember");
        if (remember) {
            var username = getCookie("username");
            document.getElementById("name").value=username;
            document.getElementById("pwd").value=getCookie("password");

            document.getElementById("txtRememberKey").checked=true;
        }
    }

    $("#txtCuriseCompany").change(function(){
        var comno = this.value;
        var txth = "<option value='*'>邮轮名称</option>";
        var tmp1 = $("#shipNo").val().split(";");
        var tmp2 = $("#shipName").val().split(";");
        var tmp3 = $("#shipComNo").val().split(";");
        for(var i=0;i<tmp3.length;i++){
            if(tmp3[i]==comno){
                txth = txth + "<option value='"+tmp1[i]+"'>"+tmp2[i]+"</option>";
            }
        }
        $("#ship_id").html(txth);
    });


    if($("#info").val()){
        if($("#info").val()!="null" && $("#info").val()!="undefined"){
            showdialog($("#info").val());
        }
    }
    if($("#infor").val()){
        if($("#infor").val()!="null" && $("#infor").val()!="undefined"){
            showdialog($("#infor").val());
            window.parent.closeAndReloadWin();
        }
    }
    if($("#userid").val()){
        if($("#userid").val()=="null" || $("#userid").val()=="undefined"){
            jAlert("用户身份验证失败，请重新登录！");
            window.location = "/";
        }
    }
    $(".tdfooter").hover(function(){
        //$(this).css("background-color","#F78D2B").css("color","#FFFFFF");
    },function(){
        //$(this).css("background-color","#FFFFFF").css("color","#1A1A1A");
    });

    $(".tdfooter2").hover(function(){
        var a = $("#tabid").val();
        if(a){
            if($(this).attr("id")!="h"+a){
                $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
            }
        }else{
           $(this).css("background-color","#F78D2B").css("color","#FFFFFF"); 
        }
        
    },function(){
        var a = $("#tabid").val();
        if(a){
            if($(this).attr("id")!="h"+a){
                $(this).css("background-color","#ABBBBB").css("color","#FFFFFF");
            }
        }else{
           $(this).css("background-color","#ABBBBB").css("color","#FFFFFF");
        }
        
    });

    $(".tdfooter1-txt").hover(function(){
        //$(this).css("background-color","#F78D2B").css("color","#FFFFFF");
    },function(){
        //$(this).css("background-color","#FFFFFF").css("color","#1A1A1A");
    });

    if(url.indexOf("homepage")>0){
        $("#m1").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m1").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }else if(url.indexOf("market")>0){
        $("#m3").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m3").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
        $("#m3-txt").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m3-txt").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }else if(url.indexOf("option")>0){
        $("#m4").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m4").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }else if(url.indexOf("message")>0){
        $("#m5").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m5").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
        $("#m5-txt").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m5-txt").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }else if(url.indexOf("publishproduct")>0){
        $("#m6").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m6").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }else if(url.indexOf("productbooking")>0){
        $("#m4").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m4").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }
    else if(url.indexOf("product")>0){
        $("#m2").css("background-color","#F78D2B").css("color","#FFFFFF");
        $("#m2").hover(function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        },function(){
            $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
        });
    }


    $("#province").change(function(){
        var comno = this.value;

        var txth = "<option value='-'>市</option>";
        var tmp1 = $("#a1").val().split(";");
        var tmp2 = $("#a2").val().split(";");
        if(this.value=="1"){
            txth = txth + "<option selected value='北京市'>北京市</option>";
        }else if(this.value=="2"){
            txth = txth + "<option selected value='天津市'>天津市</option>";
        }else if(this.value=="3"){
            txth = txth + "<option selected value='上海市'>上海市</option>";
        }else if(this.value=="4"){
            txth = txth + "<option selected value='重庆市'>重庆市</option>";
        }else{
            for(var i=0;i<tmp2.length;i++){
                if(tmp2[i]==comno){
                    txth = txth + "<option value='"+tmp1[i]+"'>"+tmp1[i]+"</option>";
                }
            }
        }

        $("#city").html(txth);
    });

    $('input[name="servicetype"]').click(function(){
        if($('input[name="servicetype"]:checked').val()=="0"){
            $("#username").val($("#username1").val());
            $("#usertel").val($("#usertel1").val());
            $("#usermail").val($("#usermail1").val());
            $("#shuru1").css("display","inline");
        }else{
            $("#username").val("");
            $("#usertel").val("");
            $("#usermail").val("");
            $("#shuru1").css("display","none");
        }
    });

    $('#file_upload').click(function(){

        var data = new FormData();
        var files = $('#file')[0].files;

        if (files) {
            data.append('codecsv',files[0]);
        }

        $.ajax({
            cache: false,
            type: 'post',
            dataType: 'json',
            url:'upload',
            data : data,
            contentType: false,
            processData: false,
            success : function () {

            }
        });
    });

    $("#ship_id1").change(function(){
        var a = $("#shipNo").val();
        var b = $("#shipNum").val();
        var t = a.split(";");
        var t1 = b.split(";");
        var shipNo = "";
        for(var i=0;i< t.length;i++){
            if(t[i]==$("#ship_id1").val()){
                shipNo = t1[i];
            }
        }
        var y1 = ($("#ch1").val()).split("@");
        var y2 = ($("#ch2").val()).split("@");
        var y3 = ($("#ch3").val()).split("@");
        var html = "<option value='9999'>多种舱房类型</option>";
        for(var i=0;i<y1.length;i++){
            if(y1[i]==shipNo){
                html = html + "<option value='"+y3[i]+"'>"+y2[i]+"</option>";
            }
        }
        $("#cabin_category_id").html(html);

    });

    $("#ship_id").change(function(){
        loadPRICE();
        $(".zhup").css("display","none");
    });

    $("#txtPlace").change(function(){
        if($("#days").val()!=""){
            loadxc();
        }

    });

    $(".sure").click(function(){
        //修改游客信息
        var a1 = "";
        var a2 = "";
        var a3 = "";
        var a9 = "";
        var a10 = "";
        var a6 = "";
        var mm1 = Number($("#mm1").val());
        for(var i=1;i<mm1+1;i++){
            for(var j=1;j<5;j++){
                if($("#r"+i+j+"1").val()){
                        if(a1==""){
                            a1 = $("#r"+i+j+"0").val();
                            a2 = $("#r"+i+j+"1").val();
                            a3 = $("#r"+i+j+"2").val();
                            a9 = $("#r"+i+j+"9").val();
                            a10 = $("#r"+i+j+"10").val();
                            a6 = "q"+i+j+"11";
                        }else{
                            a1 = a1 + "@" + $("#r"+i+j+"0").val();
                            a2 = a2 + "@" + $("#r"+i+j+"1").val();
                            a3 = a3 + "@" + $("#r"+i+j+"2").val();
                            a9 = a9 + "@" + $("#r"+i+j+"9").val();
                            a10 = a10 + "@" + $("#r"+i+j+"10").val();
                            a6 = a6 + "@" +"q"+i+j+"11";
                        }
                }
            }
        }

        $("#pas1").val(a1);
        $("#pas2").val(a2);
        $("#pas3").val(a3);
        $("#pas4").val(a9);
        $("#pas5").val(a10);
        $("#pas6").val(a6);
       
        $('#sType').val("append");
        document.forms[0].submit();
    });

    //补充游客信息
    $("#buchong").click(function(){
        var mm1 = Number($("#mm1").val());
        //赋值游客信息
        var a1 = ""; var a2 = "";var a3 = "";var a4 = "";var a5 = "";var a6 = "";var a7 = "";var a8 = "";
        for(var i=1;i<2;i++){
            for(var j=1;j<2;j++){
                if($("#q"+i+j+"1").css("display")!="none"){
                    if($("#q"+i+j+"1").val()!=""){
                        if(a1==""){
                            a1 = $("#cfxh").val();
                            a2 = $("#q"+i+j+"1").val();
                            a3 = $("#q"+i+j+"2").val();
                            if($("#q"+i+j+"3a").val()!="-" && $("#q"+i+j+"3b").val()!="-" && $("#q"+i+j+"3c").val()!="-"){
                                a4 = $("#q"+i+j+"3a").val()+"-"+ $("#q"+i+j+"3b").val()+"-" + $("#q"+i+j+"3c").val();
                            }else{
                                a4 = "0000-00-00";
                            }
                            a5 = $("#q"+i+j+"4").val();
                            if($("#province"+i+j).val()!="-" && $("#city"+i+j).val()!="-" ){
                                a6 = $("#province"+i+j).find("option:selected").text()+$("#city"+i+j).val();
                            }else{
                                a6 = "";
                            }
                            if($("#q"+i+j+"3d").val()!="-" && $("#q"+i+j+"3e").val()!="-" && $("#q"+i+j+"3f").val()!="-"){
                                a7 = $("#q"+i+j+"3d").val()+"-"+ $("#q"+i+j+"3e").val()+"-" + $("#q"+i+j+"3f").val();
                            }else{
                                a7 = "0000-00-00";
                            }
                            a8 = $("#q"+i+j+"7").combobox('getValue');
                        }else{
                            a1 = a1 + "@" + $("#cfxh").val();
                            a2 = a2 + "@" + $("#q"+i+j+"1").val();
                            a3 = a3 + "@" + $("#q"+i+j+"2").val();
                            if($("#q"+i+j+"3a").val()!="-" && $("#q"+i+j+"3b").val()!="-" && $("#q"+i+j+"3c").val()!="-"){
                                a4 = a4 + "@" + $("#q"+i+j+"3a").val()+"-"+ $("#q"+i+j+"3b").val()+"-" + $("#q"+i+j+"3c").val();
                            }else{
                                a4 = a4 + "@" +"0000-00-00";
                            }
                            a5 = a5 + "@" +$("#q"+i+j+"4").val();
                            if($("#province"+i+j).val()!="-" && $("#city"+i+j).val()!="-" ){
                                a6 = a6 + "@" +$("#province"+i+j).find("option:selected").text()+$("#city"+i+j).val();
                            }else{
                                a6 = a6 + "@" +"";
                            }
                            if($("#q"+i+j+"3d").val()!="-" && $("#q"+i+j+"3e").val()!="-" && $("#q"+i+j+"3f").val()!="-"){
                                a7 = a7 + "@" +$("#q"+i+j+"3d").val()+"-"+ $("#q"+i+j+"3e").val()+"-" + $("#q"+i+j+"3f").val();
                            }else{
                                a7 = a7 + "@" +"0000-00-00";
                            }
                            a8 = a8 + "@" +$("#q"+i+j+"7").combobox('getValue');
                        }
                    }
                }
            }
        }

        $("#pas1").val(a1);
        $("#pas2").val(a2);
        $("#pas3").val(a3);
        $("#pas4").val(a4);
        $("#pas5").val(a5);
        $("#pas6").val(a6);
        $("#pas7").val(a7);
        $("#pas8").val(a8);


        document.forms[0].submit();
    });

    //预定保存
    $("#bookingsave").click(function(){
        var num1 = "";var num2 = "";var num3 = "";
        for(var i=1;i<50;i++){
            if($("#peo"+i+"1").val()){
                if(num1==""){
                    num1 = $("#peo"+i+"1").val();
                    num2 = $("#peo"+i+"2").val();
                    num3 = $("#peo"+i+"3").html();
                }else{
                    num1 = num1+"@"+$("#peo"+i+"1").val();
                    num2 = num2+"@"+$("#peo"+i+"2").val();
                    num3 = num3+"@"+$("#peo"+i+"3").html();
                }
            }
        }
        $("#zd5").val(num1);
        $("#zd6").val(num2);
        $("#zd7").val(num3);
        $("#stype").val("save");
        document.forms[0].submit();
    });


    if(url.indexOf("publishproductedit")!=-1){
         //putincl();
    }else{
        for(var i=1;i<15;i++){
            $("#bh"+i).val(2);
        }
    }
   
    //编辑产品预览
    $("#yulaned").click(function(){


        //检测签证材料收取截止日
        if($("#visa_application_until").val()>$("#start_date").val()){
            jAlert("签证材料收取截止日不能大于出发日期！");return false;

        }

        if($("#visa_application_until").val()==""){
            jAlert("签证材料收取截止日必填！");return false;
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

       //$("#product_number").val($("#companyID").val()+"-"+t2[0].substring(2,4)+"-"+shipNo+t2[1]+t2[2]);
       //判断如果供应商,船，出发日期有变化的时候才生成新的产品编号
        if($("#numchanged").val()=="1"){
            createNo(t2,shipNo);
        }

        //去掉例内容
        /*
        var c1 = $("#advertising").val();
        var c2 = $("#visa_comment").val();
        var c3 = $("#booking_note").val();
        var bj = "例:";
        if(c1.indexOf(bj)!=-1){
            $("#advertising").val("");
        }
        if(c2.indexOf(bj)!=-1){
            $("#visa_comment").val("");
        }
        if(c3.indexOf(bj)!=-1){
            $("#booking_note").val("");
        } */
        document.forms[0].submit();
        window.parent.htotop();
    });

   

    //发布产品预览
    $("#yulan").click(function(){


        //检测签证材料收取截止日
        if($("#visa_application_until").val()>$("#start_date").val()){
            jAlert("签证材料收取截止日不能大于出发日期！");return false;

        }

        if($("#visa_application_until").val()==""){
            jAlert("签证材料收取截止日必填！");return false;
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
                    a0 = a0 + "@"
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

       //$("#product_number").val($("#companyID").val()+"-"+t2[0].substring(2,4)+"-"+shipNo+t2[1]+t2[2]);
       createNo(t2,shipNo);

        //去掉例内容
        /*
        var c1 = $("#advertising").val();
        var c2 = $("#visa_comment").val();
        var c3 = $("#booking_note").val();
        var bj = "例:";
        if(c1.indexOf(bj)!=-1){
            $("#advertising").val("");
        }
        if(c2.indexOf(bj)!=-1){
            $("#visa_comment").val("");
        }
        if(c3.indexOf(bj)!=-1){
            $("#booking_note").val("");
        } */
        document.forms[0].submit();
        window.parent.htotop();
    });

    $("#changepwd").click(function(){
         if($("#password2").val()!=$("#password3").val()){
             jAlert("两次输入的密码不一致！");return false;
         }
         document.forms[0].submit();
    });

    //添加子用户
    $("#adduser").click(function(){
        var a8 = $("#username").val();
        var a9 = $("#usertelephone").val();
        var a10 = $("#userTel").val();
        var a11 = $("#useremail").val();
        //if(a10.length!=11){
          //  alert("请输入正确的手机号！");return false;
        //}
        if(a8==""){
            jAlert("姓名必填！");return false;
        }
        if(a9==""){
            jAlert("电话必填！");return false;
        }
        if(a10==""){
            jAlert("手机必填！");return false;
        }
        if(a11==""){
            jAlert("邮箱必填！");return false;
        }
        if($("#password2").val()!=$("#password3").val()){
            jAlert("两次输入的密码不一致！");return false;
        }
        if($("#txtPayType1").attr("checked")=="checked"){
            $("#role_buyer").val(1);
        }else{
            $("#role_buyer").val(0);
        }
        if($("#txtPayType2").attr("checked")=="checked"){
            $("#role_seller").val(1);
        }else{
            $("#role_seller").val(0);
        }
        if($("#txtPayType3").attr("checked")=="checked"){
            $("#role_accountant").val(1);
        }else{
            $("#role_accountant").val(0);
        }
        $("#stype").val("new");
        window.parent.htotop();
        document.forms[0].submit();
    });

    //更新子用户
    $("#updateuser").click(function(){
        var a8 = $("#username").val();
        var a9 = $("#usertelephone").val();
        var a10 = $("#userTel").val();
        var a11 = $("#useremail").val();
        if(a8==""){
            jAlert("姓名必填！");return false;
        }
        if(a9==""){
            jAlert("电话必填！");return false;
        }
        if($("#txtPayType1").attr("checked")=="checked"){
            $("#role_buyer").val(1);
        }else{
            $("#role_buyer").val(0);
        }
        if($("#txtPayType2").attr("checked")=="checked"){
            $("#role_seller").val(1);
        }else{
            $("#role_seller").val(0);
        }
        if($("#txtPayType3").attr("checked")=="checked"){
            $("#role_accountant").val(1);
        }else{
            $("#role_accountant").val(0);
        }
        $("#stype").val("update");
        document.forms[0].submit();
    });

    //注册提交
    $("#regsubmit").click(function(){

        var a1 = $("#shortname").val();
        var a2 = $("#txtCompanyName").val();
        var a3 = $("#province").val();
        var a4 = $("#city").val();
        var a5 = $("#address").val();
        var a6 = $("#zone").val();
        var a7 = $("#txtTel").val();
        var a8 = $("#username").val();
        var a9 = $("#usertelephone").val();
        var a10 = $("#userTel").val();
        var a11 = $("#useremail").val();
        var a12 = $("#departmentName").val();

        if($("#txtUserAgreement").attr("checked")!="checked"){
            jAlert("请确认您阅读并同意遵守《协议条款》！");return false;
        }
        //if(a10.length!=11){
          //  jAlert("请输入正确的手机号！");return false;
        //}
        if(a12 == ""|a12 == "例:XX部"){
            jAlert("部门/营业部必填！");return false;
        }
        if(a1.length >12){
            jAlert("公司简称不能超过12个字哦！");return false;
        }
        if(a2==""|a2=="例:上海XXX旅行社有限公司"){
            jAlert("公司名称必填！");return false;
        }
        if(a1==""|a1=="例:XXX-XX部"){
            jAlert("公司简称必填！");return false;
        }
        if(a3=="-" || a4=="-" || a5=="" || a5=="请输入详细地址"){
            jAlert("公司地址必填！");return false;
        }
        if(a6=="" || a7==""){
            jAlert("公司电话必填！");return false;
        }
        if(a8==""){
            jAlert("管理员姓名必填！");return false;
        }
        if(a9==""){
            jAlert("管理员电话必填！");return false;
        }
        if(a10==""){
            jAlert("管理员手机必填！");return false;
        }

        if(a11==""){
            jAlert("管理员邮箱必填！");return false;
        }

        if($("#txtPayType1").attr("checked")=="checked"){
            $("#payment_transfer").val(1);
        }else{
            $("#payment_transfer").val(0);
        }

        if($("#txtPayType2").attr("checked")=="checked"){
            $("#payment_online_banking").val(1);
        }else{
            $("#payment_online_banking").val(0);
        }

        if($("#txtPayType3").attr("checked")=="checked"){
            $("#payment_alipay").val(1);
        }else{
            $("#payment_alipay").val(0);
        }

        if($("#txtPayType4").attr("checked")=="checked"){
            $("#payment_cheque").val(1);
        }else{
            $("#payment_cheque").val(0);
        }

        if($("#txtPayType5").attr("checked")=="checked"){
            $("#payment_cash").val(1);
        }else{
            $("#payment_cash").val(0);
        }

        document.forms[0].submit();
    });

    $("#zone").blur(function(){
        $("#zone1").val($(this).val());
        $("#zone2").val($(this).val());
        $("#zone3").val($(this).val());
    });

    $("#txtTel").blur(function(){
        $("#usertelephone").val($(this).val());
    });

    $("#txtFax").blur(function(){
        $("#userFax").val($(this).val());
    });



    $("#days").blur(function(){
        if(isNaN($(this).val())) {
            jAlert("必须填写数字！");$(this).val("0");return false;
        }
        if(Number($(this).val())>0){
            $("#wan").val(Number($(this).val())-1);
        }else{
            $("#wan").val("");
        }

    });

    //计算30秒倒计时
    var handler = function(){
        var a1 = Number($("#miao").html());
        if(a1==1){
            clearInterval(timer);
            window.location = "/";
        }
        $("#miao").html(a1-1);
    }

    var handler1 = function(){
        var a1 = Number($("#miao1").html());
        if(a1==1){
            clearInterval(timer1);
            history.go(-1);
        }
        $("#miao1").html(a1-1);
    }

    var handler2 = function(){
        var a1 = Number($("#miao2").html());
        if(a1==1){
            clearInterval(timer1);
            window.parent.htg('optionorder');
        }
        $("#miao2").html(a1-1);
    }

    if($("#miao").html()){
        var timer = setInterval( handler , 1000);
    }

    if($("#miao1").html()){
        var timer1 = setInterval( handler1 , 1000);
    }

    if($("#miao2").html()){
        var timer2 = setInterval( handler2 , 1000);
    }

    if($("#bh1").html()){
        var ht =  $("#bh1").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        $("#bh1").html(ht);
    }

    if($("#bh2").html()){
        var ht =  $("#bh2").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        $("#bh2").html(ht);
    }

    //包含不包含
    $("#yy1").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx1").css("background-color","#B3B3B3");
            $("#bh1").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh1").val(2);
        }
    });
    $("#yy2").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx2").css("background-color","#B3B3B3");
            $("#bh2").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh2").val(2);
        }
    });
    $("#yy3").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx3").css("background-color","#B3B3B3");
            $("#bh3").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh3").val(2);
        }
    });
    $("#yy4").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx4").css("background-color","#B3B3B3");
            $("#bh4").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh4").val(2);
        }
    });
    $("#yy5").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx5").css("background-color","#B3B3B3");
            $("#bh5").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh5").val(2);
        }
    });
    $("#yy6").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx6").css("background-color","#B3B3B3");
            $("#bh6").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh6").val(2);
        }
    });
    $("#yy7").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx7").css("background-color","#B3B3B3");
            $("#bh7").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh7").val(2);
        }
    });
    $("#yy8").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx8").css("background-color","#B3B3B3");
            $("#bh8").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh8").val(2);
        }
    });
    $("#yy9").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx9").css("background-color","#B3B3B3");
            $("#bh9").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh9").val(2);
        }
    });
    $("#yy10").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx10").css("background-color","#B3B3B3");
            $("#bh10").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh10").val(2);
        }
    });
    $("#yy11").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx11").css("background-color","#B3B3B3");
            $("#bh11").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh11").val(2);
        }
    });
    $("#yy12").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx12").css("background-color","#B3B3B3");
            $("#bh12").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh12").val(2);
        }
    });
    $("#yy13").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx13").css("background-color","#B3B3B3");
            $("#bh13").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh13").val(2);
        }
    });
    $("#yy14").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#62C46F");
            $("#xx14").css("background-color","#B3B3B3");
            $("#bh14").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh14").val(2);
        }
    });

    $("#xx1").click(function(){
        //alert($(this).css("background-color"));
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy1").css("background-color","#B3B3B3");
            $("#bh1").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh1").val(2);
        }
    });

    $("#xx2").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy2").css("background-color","#B3B3B3");
            $("#bh2").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh2").val(2);
        }
    });

    $("#xx3").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy3").css("background-color","#B3B3B3");
            $("#bh3").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh3").val(2);
        }
    });

    $("#xx4").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy4").css("background-color","#B3B3B3");
            $("#bh4").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh4").val(2);
        }
    });

    $("#xx5").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy5").css("background-color","#B3B3B3");
            $("#bh5").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh5").val(2);
        }
    });

    $("#xx6").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy6").css("background-color","#B3B3B3");
            $("#bh6").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh6").val(2);
        }
    });

    $("#xx7").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy7").css("background-color","#B3B3B3");
            $("#bh7").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh7").val(2);
        }
    });

    $("#xx8").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy8").css("background-color","#B3B3B3");
            $("#bh8").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh8").val(2);
        }
    });

    $("#xx9").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy9").css("background-color","#B3B3B3");
            $("#bh9").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh9").val(2);
        }
    });

    $("#xx10").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy10").css("background-color","#B3B3B3");
            $("#bh10").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh10").val(2);
        }
    });

    $("#xx11").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy11").css("background-color","#B3B3B3");
            $("#bh11").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh11").val(2);
        }
    });

    $("#xx12").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy12").css("background-color","#B3B3B3");
            $("#bh12").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh12").val(2);
        }
    });

    $("#xx13").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy13").css("background-color","#B3B3B3");
            $("#bh13").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh13").val(2);
        }
    });

    $("#xx14").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)" || $(this).css("background-color")=="#b3b3b3"){
            $(this).css("background-color","#F7861E");
            $("#yy14").css("background-color","#B3B3B3");
            $("#bh14").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh14").val(2);
        }
    });

    for(var j=1;j<7;j++){
        //window.parent.ResizeIframeFromParent('page'+j);
    }
    var tmp = url.split("/");
    if(tmp[3]==""){
        if(getCookie("logousername")){
            //alert("您已经登录过一个账户，请先退出后再登录！");
            //$("#bt").css("display","none");
            //$("#dl1").css("display","none");
        }
    }

    if(tmp[3]=="publishproduct" || tmp[3]=="help" ||tmp[3]=="homepage" || tmp[3]=="option" || tmp[3].indexOf("publishproductyulan")!=-1 || tmp[3].indexOf("publishproductread")!=-1 || tmp[3].indexOf("productbooking")!=-1|| tmp[3].indexOf("publishproductedit")!=-1){
        setInterval(function() {
            window.parent.ResizeIframeFromParent('page1');
            window.parent.ResizeIframeFromParent('page2');
            window.parent.ResizeIframeFromParent('page3');
            window.parent.ResizeIframeFromParent('page4');
            window.parent.ResizeIframeFromParent('page5');
            window.parent.ResizeIframeFromParent('page6');
            window.parent.ResizeIframeFromParent('page7');
            window.parent.ResizeIframeFromParent('page8');
            window.parent.ResizeIframeFromParent('page9');
            window.parent.ResizeIframeFromParent('page10');
        }, 2000);
    }else {
        if (tmp[3]!="" && tmp[3]!="redirect" && tmp[3]!="userdominomanagement" && tmp[3]!="b_user" && tmp[3]!="b_product") {

        //setTimeout(function () {
            window.parent.ResizeIframeFromParent('page1');
            window.parent.ResizeIframeFromParent('page2');
            window.parent.ResizeIframeFromParent('page3');
            window.parent.ResizeIframeFromParent('page4');
            window.parent.ResizeIframeFromParent('page5');
            window.parent.ResizeIframeFromParent('page6');
            window.parent.ResizeIframeFromParent('page7');
            window.parent.ResizeIframeFromParent('page8');
            window.parent.ResizeIframeFromParent('page9');
        //}, 500);
        }
    }
	
	if(tmp[3].indexOf("productbooking")!=-1 && $("#cb").val()){
        setInterval(function() {

        //计算合计金额信息
        var mm1 = Number($("#mm1").val());
        var str1 = "";
        var str3 = "";
        var d1 = $("#cb").val();
        var d2 = $("#cba").val();
        var dt1 = d1.split(";");
        var dt2 = d2.split(";");
        for(var i=0;i<dt1.length;i++){
            str3 = str3 + "<span style='color:#0A68BC;font-size:14px;'>"+dt1[i] + " x" + dt2[i]+"<span>&nbsp;&nbsp;";
        }

        //舱房信息
        str1 = "<table style='width:895px;'>";        
        str1 = str1 + "<tr><td style='color:#797979;font-size:14px;;text-align:center'>舱房</td><td style='color:#797979;font-size:14px;;text-align:center'>第1/2人单价</td><td style='color:#797979;font-size:14px;;text-align:center'>第3/4成人单价</td><td style='color:#797979;font-size:14px;;text-align:center'>第3/4儿童单价</td><td style='color:#797979;font-size:14px;;text-align:center'>成人数量</td><td style='color:#797979;font-size:14px;;text-align:center'>儿童数量</td><td style='color:#797979;font-size:14px;;text-align:center'>金额</td></tr>";
        
        for(var i=1;i<mm1+1;i++){
            str1 = str1 + "<tr style='height:30px;line-height:30px;'>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#icc"+i).html()+"</td>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#peo"+i+"4").html()+"</td>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#peo"+i+"5").html()+"</td>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#peo"+i+"6").html()+"</td>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#peo"+i+"1").val()+"</td>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#peo"+i+"2").val()+"</td>";
            str1 = str1 + "<td style='color:#0A68BC;text-align:center'>"+$("#peo"+i+"3").html()+"</td>";
            str1 = str1 + "</tr>";
        }
        
        str1 = str1 + "</table>";
        var total1 = 0;
        var total2 = 0;
        var total3 = 0;
        for(var i=1;i<mm1+1;i++){
            total1 = total1 + Number($("#peo"+i+"1").val());
            total3 = total3 + Number($("#peo"+i+"2").val());
            total2 = total2 + Number($("#peo"+i+"3").html());
        }
        var str2 = "";
        str2 = str2+"<span style='font-size:14px;'><b style='font-size:14px;'>&nbsp;&nbsp;&nbsp;&nbsp;总计：</b>"+str3+"<b style='font-size:14px;'>&nbsp;&nbsp;&nbsp;&nbsp;成人人数：</b>"+total1+"人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style='font-size:14px;'>儿童人数：</b>"+total3+"人 <span>";
        $("#roomPrice").html(str1);
        $("#roomPrice2").html(str2);
        $("#roomPrice1").html(total2+"元");
        $("#moneytotal").html(total2+Number($("#bxnum").html())+"元");
        }, 1000);
    }

    if(tmp[3]=="market"){
        window.parent.document.getElementById("buy").style.display = "inline";
        window.parent.document.getElementById("sell").style.display = "none";
    }

    if(tmp[3]=="marketbuy"){
        window.parent.document.getElementById("buy").style.display = "none";
        window.parent.document.getElementById("sell").style.display = "inline";
    }

    $("#pagename").html(tmp[3]);

    //判断是否加载浮动条
    var tmq =  tmp[3].split("?");

    if(tmq[0]=="productdetail"){
       window.parent.document.getElementById("totop").style.display = "inline";
        window.parent.document.getElementById("anchor").style.display = "inline";
        window.parent.document.getElementById("anchor1").style.display = "inline";
    }else{
        if(window.parent.document.getElementById("totop")){
            window.parent.document.getElementById("totop").style.display = "none";
        }
        if(window.parent.document.getElementById("anchor")){
            window.parent.document.getElementById("anchor").style.display = "none";
        }
        if(window.parent.document.getElementById("anchor1")){
            window.parent.document.getElementById("anchor1").style.display = "none";
        }
    }

    if(tmq[0]=="help"){
        //changeh(1);
        /*
        setInterval(function() {
           for(var i=1;i<9;i++){
                $("#h"+i).addClass("tdfooter2"); 
                $("#h"+i).css("background-color","#ABBBBB");    
           } 
           var ih1 = $("#tabid").val();
           $("#h"+ih1).removeClass("tdfooter2");
           $("#h"+ih1).css("background-color","#F7861E");
        }, 100);
        */
        changeg(1);
    }

//个人中心产品 游轮集市 标签 切换
   $(".n1-button").click(function(){
      $(".n1-button").removeAttr("style").css({"background":"#FFFFFF","color":"#1A1A1A"});
      $(this).removeAttr("style").css({"background":"#F7861E","color":"#FFFFFF"});
      var buttonId=$(this).attr("id").slice(-1);
      $("#list1,#list2").hide();
      $("#list"+buttonId).show();
   });


  //限时特价 早定优惠 特色航次  开始
   $("#home_button1").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#F4901E','fontWeight':'none'});
     $("#home_button2,#home_button3").css({'color':'black','background':'#FFFFFF','fontWeight':'bold'});
     $("#home1").show();
     $("#home2,#home3").hide();
   });

    $("#home_button2").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#F4901E','fontWeight':'none'});
     $("#home_button1,#home_button3").css({'color':'black','background':'#FFFFFF','fontWeight':'bold'});
     $("#home2").show();
     $("#home1,#home3").hide();
   });

     $("#home_button3").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#F4901E','fontWeight':'none'});
     $("#home_button1,#home_button2").css({'color':'black','background':'#FFFFFF','fontWeight':'bold'});
     $("#home3").show();
     $("#home1,#home2").hide();
   });                   
  //限时特价 早定优惠 特色航次  结束
   
});//结束

function changeh(j){
    //隐藏使用帮助div
    $("#help3").removeAttr("style");$("#help2").css("display","none");$("#help1").css("display","none");
    $("#tabid").val(j);
    //显示当前权限和分类下的
    var ht = $("#htype").val();
    if(ht == 1){
        ht = 8;
    }else{
        ht = 7;
    }
    for(var i=0;i<100;i++){
        if($("#ghelpa"+i).html()){
            if($("#ghelpa"+i).html() == ht){
                if(Number($("#ghelpb"+i).html()) == Number(j)){
                    $("#ghelp"+i).removeAttr("style");
                    $("#ghelp"+i).css("color","#00B3E6").css("cursor","pointer").css("font-size","16px");
                }else{
                    $("#ghelp"+i).css("display","none"); 
                }
            }else{
                $("#ghelp"+i).css("display","none");
            }
        }
    }
           for(var i=1;i<9;i++){
                $("#h"+i).addClass("tdfooter2"); 
                $("#h"+i).css("background-color","#ABBBBB");    
           } 
           
           $("#h"+j).removeClass("tdfooter2");
           $("#h"+j).css("background-color","#F7861E");
}

function changeg(i){
    if(i==1){
        $("#help1").removeAttr("style");$("#help2").css("display","none");$("#help3").css("display","none");
    }else{
        $("#help2").removeAttr("style");$("#help1").css("display","none");$("#help3").css("display","none");
    }
    $("#tabid").val(i+4);
     for(var i=1;i<9;i++){
                $("#h"+i).addClass("tdfooter2"); 
                $("#h"+i).css("background-color","#ABBBBB");    
           } 
           var ih1 = $("#tabid").val();
           $("#h"+ih1).removeClass("tdfooter2");
           $("#h"+ih1).css("background-color","#F7861E");
}

function getDays(y,m){
//返回当前月份有多少天
if(m == 2){
return y % 4 == 0 ? 29 : 28;
}else if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
return 31;
}else{
return 30;
}
}

function getToday(){
    var myDate = new Date();
    var m = myDate.getMonth()+1;
    m = m +"";
    if(m.length==1){
        m = "0" + m;
    }
    var d = myDate.getDate();
    d= d +"";
    if(d.length==1){
        d = "0" + d;
    }
    var d2 = myDate.getFullYear()+"-"+m+"-"+d;
    return d2;
}

function showdialog(str,type){
    if(type == 'warning') {
        jWarning(str);
    } else {
        jAlert(str);
    }
}

function login(guest){
    if(!guest && $("#name").val()==""|$("#pwd").val()==""){
        showdialog("请填写用户名及密码！","warning");
        return false;
    }
    //判断是否记住
    if($("#txtRememberKey").attr("checked")=="checked"){
        setCookie("username",document.getElementById("name").value,30);
        setCookie("password",document.getElementById("pwd").value,30);
        setCookie("remember",document.getElementById("txtRememberKey").checked,30);
    }else{
        deleteCookie("username");
        deleteCookie("password");
        deleteCookie("remember");
    }

    if(getCookie("logousername")){
        //alert("您已经登录过一个账户，请先退出后再登录！");
        //$("#bt").css("display","none");
        //$("#dl1").css("display","none");
        //return false;
    }

    document.forms[0].submit();
}

function register(){
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    if(username==""){
        showdialog("姓名不能为空！","warning");
        return false;
    }
    if(email==""){
        showdialog("电子邮件地址不能为空！","warning");
        return false;
    }
    if(email.indexOf("@")==-1){
        showdialog("电子邮件格式不正确！","warning");
        return false;
    }
    if($("#loginname").val()==""){
        showdialog("用户名不能为空！","warning");
        return false;
    }
    if(password==""){
        showdialog("密码不能为空！","warning");
        return false;
    }
    if($("#password1").val()==""){
        showdialog("第二次密码不能为空！","warning");
        return false;
    }
    if(password!=$("#password1").val()){
        showdialog("两次输入的密码不一致！","warning");
        return false;
    }
    if(password.length <6){
        showdialog("密码最少为6位的数字或字母！","warning");
        return false;
    }
    document.forms[0].submit();
}

function updateRecord(){

    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    if(username==""){
        showdialog("姓名不能为空！","warning");
        return false;
    }
    if(email==""){
        showdialog("电子邮件地址不能为空！","warning");
        return false;
    }
    if(email.indexOf("@")==-1){
        showdialog("电子邮件格式不正确！","warning");
        return false;
    }
    if(password==""){
        showdialog("密码不能为空！","warning");
        return false;
    }
    if(password.length <6){
        showdialog("密码最少为6位的数字或字母！","warning");
        return false;
    }

    document.forms[0].submit();
}

// store cookie value with optional details as needed
function setCookie(name, value, expires, path) {
    if (expires){
        if (typeof expires == "number"){
            expires = getExpDate(expires)
        }
        else{
            expires = expires.toGMTString;
        }
    }

    if(!path){
        path = "/";
    }

    document.cookie = name + "=" + escape (value) +
        ((expires) ? ";expires=" + expires : "") +
        ((path) ? ";path=" + path : "") ;
}

// get cookie value with cookie name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length, c.length));
        }
    }
    return false;
}

// remove the cookie by setting ancient expiration date
function deleteCookie(name) {
    setCookie(name,"",-1);
}

// get expiration date
function getExpDate(days) {
    var expDate = new Date();
    expDate.setDate(expDate.getDate( ) + parseInt(days));
    return expDate.toGMTString( );
}

function forgetpwd(){
    //if($("#name").val()==""){
      //  alert("请正确填写您的邮箱/手机号，我们会将您的密码发送到您注册时填写的邮箱！");return false;
    //}
    var form = '<div id="forgetpwd-form"><b>您的邮箱：</b><input type="text" id="email4pwd" name="email4pwd" /></div>';
    var errVisible = false;
    jForm(form, "找回密码", function(ok){
        var value = $("#email4pwd").val();
        if(ok && (!value || value.indexOf("@")<0)) {
            if( !errVisible ) {
                $("#forgetpwd-form").after("<div style='display:block;color:red'>请填写您账户的邮箱地址！</div>");
                errVisible = true;
            }
        } else if (ok) {
            hidePopup();
            window.location='/forgetpwd?p='+value;
        }        
    });    
}

function replaceTextarea1(str)
{
var reg= new RegExp("/r/n","g");
var reg1= new RegExp(" ","g");

str=str.replace(reg,"<br>");
str =str.replace(reg1,"<p>");
return str;
}

function buypublish(){
    if($("#description").val()=="例:我需要蓝宝石公主号717济州釜山內舱3人房5间，有的请联系我，谢谢！"){
        jWarning("需求信息不能为空！");return false;
    }

    $("#description").val(replaceTextarea1($("#description").val()));

    $("#sType1").val("");
    $("#sType").val("fb");
    document.forms[0].submit();
    
}

function sellpublish(){
    //必须上传图片
    if($("#img_url").val()!=""){
        var tmp1 =  $("#img_url").val().split(".");
        if(tmp1[1] !='jpg' && tmp1[1] !='JPG' && tmp1[1] !='bmp' && tmp1[1] !='png'){
            jWarning("对不起，上传文件格式出错，请选择图片文件！"); return false;
        }
    }

    if($("#ship_id1").val()==""||$("#ship_id1").val()=="-"||$("#ship_id1").val()=="*"){
        jWarning("邮轮名称不能为空！");return false;
    }
    if($("#departure_date").val()==""){
        jWarning("出航日期不能为空！");return false;
    }
    if($("#days").val()==""){
        jWarning("天数不能为空！");return false;
    }
    if($("#cruise_route").val()==""){
        jWarning("航线不能为空！");return false;
    }
    if($("#price_now").val()==""){
        jWarning("现价不能为空！");return false;
    } else if (!isPrice($("#price_now").val())) {
        jWarning("现价请输入数字！");return false;
    }

    if($("#amount").val()==""){
        $("#amount").val("-1");
    }
    if($("#price_old").val()==""){
        $("#price_old").val("0");
    } else if (!isPrice($("#price_old").val())) {
        jWarning("原价请输入数字！");return false;
    }

    $("#sType1").val("");
    $("#sType").val("fb");
    document.forms[0].submit();
    
}

function hovmx(i){
    if($("#mx"+i).css("display")=="none"){
        $("#mx"+i).css("display","inline-block").css("top",$("#mxc"+i).offset().top).css("left",$("#mxd"+i).offset().left-15);
    }else{
        $("#mx"+i).css("display","none");
    }
}

function hovmx1(i){
    if($("#mx"+i).css("display")=="none"){
        $("#mx"+i).removeAttr("style");
        //$("#mx"+i).css("background-color","#F2F0F4");
    }else{
        $("#mx"+i).css("display","none");
    }
}

function onPageValueChanged(totalPages){
    var page =  parseInt(document.getElementById("numNo1").value);
    if ( page > 0 && page <= totalPages ) {
        retferto();
    }
}
function onPreviousPageClicked(currentPage){
    if ( currentPage > 1 ) {
        listpageUp();
    }
}
function onNextPageClicked(currentPage, totalPages) {
    if ( currentPage < totalPages ) {
        listpageDown();
    }
}

function listpageDown(){
    var num1 = Number(document.all.numStart.value);
    num1 = num1+6;
    if(num1>Number($("#pronum1").val())){
        jAlert("没有下一页，已经到底！");return false;
    }
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function listpageUp(){
    var num1 = Number(document.all.numStart.value);
    if(num1 == 1){
        jAlert("没有上一页，已经到头！");return false;
    }
    num1 = num1-6;
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function retferto(){
    var num1 = Number($("#numNo1").val());
    num1 = (num1-1)*6;
    document.all.numStart.value = num1;
    document.forms[0].submit();
}


function gettotal1(i){
    //判断人数是否大于房间人数
    var a1 = Number($("#peo"+i+"1").val());
    var a2 = Number($("#peo"+i+"2").val());
    var can1 = Number($("#canc"+i).html());
    if(a1+a2>can1){
        jAlert("人数超过房间可入住上限！");$("#peo"+i+"1").val(0);
        a1 = 0;
        //计算填写的房间数
        for(var j=1;j<5;j++){
            $("#q"+i+j).removeAttr("style");
        }

        for(var j=1;j<5;j++){
            if(j>(a1+a2)){
                $("#q"+i+j).css("display","none");
            }else{
                $("#q"+i+j).attr("style","line-height:25px;text-align: center;");
            }
        }
        return false;
    }

     var b1 = Number($("#peo"+i+"4").html());
     var b2 = Number($("#peo"+i+"5").html());
     var b3 = Number($("#peo"+i+"6").html());
     var a3 = 0;
     if((a1==1 && a2 ==0)||(a1==1 && a2 ==1)||(a1==2 && a2 ==0)){
         a3 = b1*2;
     }else if((a1==1 && a2 ==2)||(a1==2 && a2 ==1)){
         a3 = b1*2+b3*1;
     }else if(a1==3 && a2 ==0){
         a3 = b1*2+b2*1;
     }else if((a1==1 && a2 ==3)||(a1==2 && a2 ==2)){
         a3 = b1*2+b3*2;
     }else if(a1==3 && a2 ==1){
         a3 = b1*2+b2*1+b3*1;
     }else if(a1==4 && a2 ==0){
         a3 = b1*2+b2*2;
     }
    $("#peo"+i+"3").html(a3);
    //计算填写的房间数
    for(var j=1;j<5;j++){
        $("#q"+i+j).removeAttr("style");
    }

    for(var j=1;j<5;j++){
        if(j>(a1+a2)){
            $("#q"+i+j).css("display","none");
        }else{
            $("#q"+i+j).attr("style","line-height:25px;text-align: center;");
        }
    }
    _clearPassage(i);
}

function _clearPassage(i){
    //清空填写过的姓和名
    for(var j=1;j<5;j++){
        $("#q"+i+j+"1").val("");
        $("#q"+i+j+"2").val("");
    }
}

function gettotal2(i){
    //判断人数是否大于房间人数
    var a1 = Number($("#peo"+i+"1").val());
    var a2 = Number($("#peo"+i+"2").val());
    var can1 = Number($("#canc"+i).html());
    if(a1+a2>can1){
        jAlert("人数超过房间可入住上限！");$("#peo"+i+"2").val(0);
        a2 = 0;
        //计算填写的房间数
        for(var j=1;j<5;j++){
            $("#q"+i+j).removeAttr("style");
        }

        for(var j=1;j<5;j++){
            if(j>(a1+a2)){
                $("#q"+i+j).css("display","none");
            }else{
                $("#q"+i+j).attr("style","line-height:25px;text-align: center;");
            }
        }

        return false;
    }

    var b1 = Number($("#peo"+i+"4").html());
    var b2 = Number($("#peo"+i+"5").html());
    var b3 = Number($("#peo"+i+"6").html());
    var a3 = 0;
    if((a1==1 && a2 ==0)||(a1==1 && a2 ==1)||(a1==2 && a2 ==0)){
        a3 = b1*2;
    }else if((a1==1 && a2 ==2)||(a1==2 && a2 ==1)){
        a3 = b1*2+b3*1;
    }else if(a1==3 && a2 ==0){
        a3 = b1*2+b2*1;
    }else if((a1==1 && a2 ==3)||(a1==2 && a2 ==2)){
        a3 = b1*2+b3*2;
    }else if(a1==3 && a2 ==1){
        a3 = b1*2+b2*1+b3*1;
    }else if(a1==4 && a2 ==0){
        a3 = b1*2+b2*2;
    }
    $("#peo"+i+"3").html(a3);
    //计算填写的房间数
    for(var j=1;j<5;j++){
        $("#q"+i+j).removeAttr("style");
    }

    for(var j=1;j<5;j++){
        if(j>(a1+a2)){
            $("#q"+i+j).css("display","none");
        }else{
            $("#q"+i+j).attr("style","line-height:25px;text-align: center;");
        }
    }
    _clearPassage(i);
}

function showchange(m){
    var top1 = 700+m*100;
    var key1 = $("#location"+m).combobox('getValue');
    var e1 = $("#e1").val();
    var e2 = $("#e2").val();
    var tmp1 = e1.split("@");
    var tmp2 = e2.split("@");
    var html = "";
    var j = 0;
    for(var i=0;i<tmp1.length;i++){
        if(tmp1[i]==key1){
            j = j + 1;
            html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设行程"+j+"</span>";
            html = html + "<div ><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
            html = html + "<div onclick='checkkuang("+j+");$(\"#description"+m+"\").val(\""+tmp2[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp2[i]+"</div><br/>";
        }
    }
    if(html==""){
        html="您选择的目的地没有预设行程！";
    }
    //html = html + "<br/><span style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");'><img src='/images/close.png'></span>";
    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#description"+m+"\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/write.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/yes.png'' />";
    $("#htmlxc2").html(htmlxc1);

    //$("#w").window("open");
    $("#chooseinfo").css("display","inline-block").css("top",top1);
}

function getname(i){
   var name1 = $("#file"+i).val();
   var tmp = name1.split("\\");
   $("input[name='filename"+i+"']").val(tmp[tmp.length-1]);
}

function getname1(){
    var name1 = $("#advertising_img_url").val();
    var tmp = name1.split("\\");
    $("input[name='filenameadv']").val(tmp[tmp.length-1]);
}

function getnamezf1(){
    var name1 = $("#filezf").val();
    var tmp = name1.split("\\");
    $("input[name='filenamezf']").val(tmp[tmp.length-1]);
}

function getnamexls(){
    var name1 = $("#pxls_url").val();
    var tmp = name1.split("\\");
    $("input[name='filenamexls']").val(tmp[tmp.length-1]);
}

function onlyNum()
{
    //if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
    //    event.returnValue=false;
}

function loadPRICE(){
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
    var y1 = ($("#ch1").val()).split("@");
    var y2 = ($("#ch2").val()).split("@");
    var y3 = ($("#ch3").val()).split("@");
    var y4 = ($("#ch4").val()).split("@");
    var y5 = ($("#ch5").val()).split("@");
    var y6 = ($("#ch6").val()).split("@");
    var html1 = "<table style='width: 100%;border:2px solid #ABBBBB;'  cellspacing='0' cellpadding='0' class='pclass'>";
    html1 = html1 + "<tr style='text-align: center;color: #000000;font-weight: bold;background-color: #EDEBEC'>";
    html1 = html1 + "<td style='width: 70px'>代码</td>";
    html1 = html1 + "<td style='width: 160px'>舱房说明</td>";
    html1 = html1 + "<td style='width: 80px'>可入住人数</td>";
    html1 = html1 + "<td style='width: 90px'>第1、2人</td>";
    html1 = html1 + "<td style='width: 90px'>结算价</td>";
    html1 = html1 + "<td style='width: 90px'>第3、4人</td>";
    html1 = html1 + "<td style='width: 90px'>结算价</td>";
    html1 = html1 + "<td style='width: 90px'>第3、4儿童</td>";
    html1 = html1 + "<td style='width: 90px'>结算价</td>";
    html1 = html1 + "<td style='width: 140px'>可售房间数</td>";
    html1 = html1 + "<td style='width: 80px'>返佣金额</td>";
    html1 = html1 + "</tr>";
    var tmps = "";
    var t= 1;
    var j = 0;
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="内舱房") {
                //舱房分类BEGIN--------------------------------------
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='11'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
                //舱房分类END--------------------------------------
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="皇家大道景观房") {
                //舱房分类BEGIN--------------------------------------
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='11'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
                //舱房分类END--------------------------------------
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="海景房") {
                //舱房分类BEGIN--------------------------------------
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='11'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
                //舱房分类END--------------------------------------
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="阳台房") {
                //舱房分类BEGIN--------------------------------------
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='11'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
                //舱房分类END--------------------------------------
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="套房") {
                //舱房分类BEGIN--------------------------------------
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0  /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='11'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){alert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};$(\"#w"+j+"5\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};$(\"#w"+j+"7\").val(this.value);' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' style='width: 50px' type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){alert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){alert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){alert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue;}if(isNaN(value)){alert(\"只能填写数字\");value=0;}'  type='text' id='w" + j + "7' value=0 onkeydown='onlyNum();' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    
                    }

                    
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "0' value=100 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    //html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "a' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){alert(\"只能填写数字\");value=0;}' /></td>";
                    
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
                //舱房分类END--------------------------------------
            }
        }
    }
    html1 = html1 + "</table>";
    $("#pricelist").html(html1);
}

function ctab(i){
    if(i<1) return;
    for(var j=1;j<7;j++){
        var o = ($("#n"+j).attr("class"));
        $("#n"+j).removeClass(o);
        if(j==i){
           $("#n"+j).addClass("tab1");
        }else{
           $("#n"+j).addClass("tab2");
        }
        var tab = document.getElementById("tab"+j);
        if( i == 6 || i == j ) {
            $(tab).show();
        } else {
            $(tab).hide();
        }
    }
    /*var url = window.location.href;
    var tmp = url.split("#");
    var nurl = tmp[0]+"#tab"+i;
    window.location = nurl;*/    
}

function showcity(str){
    var comno = $("#province"+str).val();

    var txth = "<option value='-'>市</option>";
    var tmp1 = $("#a1").val().split(";");
    var tmp2 = $("#a2").val().split(";");
    if(comno=="1"){
        txth = txth + "<option selected value='北京市'>北京市</option>";
    }else if(comno=="2"){
        txth = txth + "<option selected value='天津市'>天津市</option>";
    }else if(comno=="3"){
        txth = txth + "<option selected value='上海市'>上海市</option>";
    }else if(comno=="4"){
        txth = txth + "<option selected value='重庆市'>重庆市</option>";
    }else{
        for(var i=0;i<tmp2.length;i++){
            if(tmp2[i]==comno){
                txth = txth + "<option value='"+tmp1[i]+"'>"+tmp1[i]+"</option>";
            }
        }
    }

    $("#city"+str).html(txth);
}

function addfj(){
    var n = Number($("#fnum").val());
    n = n + 1;
    var html = "&nbsp;&nbsp;&nbsp;<b>文件名：</b><input type='text' name='filename"+n+"' /> <input onchange='getname(\""+n+"\");' type='file' name='file"+n+"' id='file"+n+"'></input><br/>";
    $("#filearea").append(html);
    $("#fnum").val(n);
}

function checkkuang(n){
   for(var i=1;i<4;i++){
      if($("#gou"+i)){
          if(n==i){
              $("#gou"+i).attr("src","/images/gou.png");
          }else{
              $("#gou"+i).attr("src","/images/gou1.png");
          }
      }
   }
}

//取消政策
function showchange1(){
    var top1 = ($("#cancellation_policy").offset().top)-150;

    var html = "<div style='width:100%;text-align:right;cursor: pointer'  onclick='$(\"#cancellation_policy\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");'>关闭&nbsp;&nbsp;</div>";
    var a1 = $("#chose1").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
            j = j + 1;
            html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设"+j+"</span>";
            html = html + "<div><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
            html = html + "<div onclick='checkkuang("+j+");$(\"#cancellation_policy\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div><br/>";
    }

    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#cancellation_policy\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/write.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/yes.png'' />";
    $("#htmlxc2").html(htmlxc1);

    //$("#w").window("open");
    $("#chooseinfo").css("display","inline-block").css("top",top1);
}

//签证说明
function showchange2(){
    var top1 = ($("#visa_comment").offset().top)-150;

    var html = "<div style='width:100%;text-align:right;cursor: pointer'  onclick='$(\"#visa_comment\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");'>关闭&nbsp;&nbsp;</div>";
    var a1 = $("#chose2").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设"+j+"</span>";
        html = html + "<div><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        html = html + "<div onclick='checkkuang("+j+");$(\"#visa_comment\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div><br/>";
    }

    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#visa_comment\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/write.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/yes.png'' />";
    $("#htmlxc2").html(htmlxc1);

    //$("#w").window("open");
    $("#chooseinfo").css("display","inline-block").css("top",top1);
}

//付款说明
function showchange3(){
    var top1 = ($("#payment_comment").offset().top)-150;

    var html = "<div style='width:100%;text-align:right;cursor: pointer'  onclick='$(\"#payment_comment\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");'>关闭&nbsp;&nbsp;</div>";
    var a1 = $("#chose3").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设"+j+"</span>";
        html = html + "<div><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        html = html + "<div onclick='checkkuang("+j+");$(\"#payment_comment\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div><br/>";
    }

    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#payment_comment\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/write.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/yes.png'' />";
    $("#htmlxc2").html(htmlxc1);

    //$("#w").window("open");
    $("#chooseinfo").css("display","inline-block").css("top",top1);
}

//预定须知
function showchange4(){
    var top1 = ($("#booking_note").offset().top)-150;

    var html = "<div style='width:100%;text-align:right;cursor: pointer'  onclick='$(\"#booking_note\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");'>关闭&nbsp;&nbsp;</div>";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设"+j+"</span>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        html = html + "<div onclick='checkkuang("+j+");$(\"#booking_note\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div><br/>";
    }

    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#booking_note\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/write.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/yes.png'' />";
    $("#htmlxc2").html(htmlxc1);

    //$("#w").window("open");
    $("#chooseinfo").css("display","inline-block").css("top",top1);

}

function showchangebbc(){
    
    var top1 = ($("#comment").offset().top)-200;
    var html = "";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<div style='line-height: 10px;margin-top: 20px;'><img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>取消理由"+j+"</span></div>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        if(j==3){
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 500px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }

    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sa1").val("nopass");
            document.forms[0].submit();
        }
    });
}

function showchangebbc1(){
    
   /**/ var top1 = ($("#cw1").offset().top)-400;

    var html = "";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<div style='line-height: 10px;margin-top: 20px;'><img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>取消理由"+j+"</span></div>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        if(j==3){
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 500px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }


    jConfirmIframe2(html, "", function(yes){
        if ( yes ) {
            $("#sa1").val("nopass");
            document.forms[0].submit();

        }

    });
}

function showchangebbc3(){
    
    var top1 = ($("#cw3").offset().top)-400;

    var html = "";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<div style='line-height: 10px;margin-top: 20px;'><img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>取消理由"+j+"</span></div>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        if(j==3){
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 500px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }

    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sa1").val("nopass");
            document.forms[0].submit();
        }
    });
}

function showchangebbc4(){
    
    var top1 = ($("#cw4").offset().top)-100;

    var html = "";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<div style='line-height: 10px;margin-top: 20px;'><img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>取消理由"+j+"</span></div>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        if(j==3){
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 500px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }

    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sa1").val("nopass");
            document.forms[0].submit();
        }
    });
}

function showchangebbc5(){
    
    var top1 = ($("#cw5").offset().top)-100;

    var html = "";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<div style='line-height: 10px;margin-top: 20px;'><img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>取消理由"+j+"</span></div>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        if(j==3){
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 500px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }

    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sa1").val("nopass");
            document.forms[0].submit();
        }
    });
}


function showchangebbc2(){
    
    var top1 = ($("#cw2").offset().top)-150;

    var html = "";
    var a1 = $("#chose4").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<div style='line-height: 10px;margin-top: 20px;'><img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>取消理由"+j+"</span></div>";
        html = html + "<div style='line-height: 10px;'><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        if(j==3){
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 500px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }

    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sa1").val("nopass");
            document.forms[0].submit();
        }
    });
}




function showPics1(index,indexd,lengthd,sWidth) { //普通切换
    setCookie("indexd",Math.floor(indexd/lengthd));
    setCookie("label",1);
    /*
    if($("#namelist").html()){
        //setCookie("indexd",indexd);
        var txt_dzh_cn = $("#namelist").html();
        var txt_dzh = $("#ennamelist").html();
        var tmp = txt_dzh.split(";");
        var tmp1 = txt_dzh_cn.split(";");
        $("#pname").html(tmp1[index]+"<br/><div class='pname_en'>"+tmp[index]+"</div>");
    } */
    var nowLeft = -indexd*sWidth; //根据index值计算ul元素的left值
    $("#focus ul").stop(true,false).animate({"left":nowLeft},100); //通过animate()调整ul元素滚动到计算出的position
    //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},1500); //为当前的按钮切换到选中的效果
}

function showPics(index,indexd,lengthd,sWidth) { //普通切换
    setCookie("indexd",Math.floor(indexd/lengthd));
    /*
    if($("#namelist").html()){
        //setCookie("indexd",indexd);
        var txt_dzh_cn = $("#namelist").html();
        var txt_dzh = $("#ennamelist").html();
        var tmp = txt_dzh.split(";");
        var tmp1 = txt_dzh_cn.split(";");
        $("#pname").html(tmp1[index]+"<br/><div class='pname_en'>"+tmp[index]+"</div>");
    } */
    var nowLeft = -indexd*sWidth; //根据index值计算ul元素的left值
    $("#focus ul").stop(true,false).animate({"left":nowLeft},1500); //通过animate()调整ul元素滚动到计算出的position
    //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},1500); //为当前的按钮切换到选中的效果
}
/*iframe in focus -> reset web title*/


$(window).focus(function() {
	var p = window.parent.document;
    var url = window.location.href;
    var tmp = url.split("/");
    if(tmp[3]!="" && tmp[3]!="b_user" && tmp[3]!="b_product" && tmp[3]!="b_product"){
        if (parseInt(p.getElementById('new-count').value) > 0) {
            var t = p.title;
            p.title = t.substring(0, 3);
            p.getElementById('new-count').value = '0';
        }
        p.getElementById('focus-' + window.frameElement.id).value = '1';
    }
});


/*iframe has lost focus*/
$(window).blur(function() {
	var p = window.parent.document;
    var url = window.location.href;
    var tmp = url.split("/");
    if(tmp[3]!="" && tmp[3]!="redirect" && tmp[3]!="userdominomanagement" && tmp[3]!="b_user" && tmp[3]!="b_product"){
        p.getElementById('focus-'+window.frameElement.id).value = '0';
    }
});

function surebooking(){
    var va = $("input[name='payment_type']:checked").val();
        if(!va){
            alert("付款方式必选！");
            return false;
        }
    jConfirmIframe("是否确认提交？", "", function(confirmed){
        if ( !confirmed ) return false;
        if(va=="1"){
            if($("#payment_until").val()==""){
                jAlert("全款支付日期必填！");
                return false;
            }

            if($("#payment_until").val()> $("#cfrq").html()){
                jAlert("支付日期不能大于出发日期！");
                return false;
            }
        }else{
            if($("#deposit_until").val()==""){
                jAlert("订金支付日期必填！");
                return false;
            }
            if($("#pay_balance_until").val()==""){
                jAlert("余款支付日期必填！");
                return false;
            }
        }

        if($("#cusersel").val()){
            if($("#cusersel").val()=="-"){
                jAlert("跟单客服必选！");
                return false;
            }
        }
        $('#sa1').val('save');
        document.forms[0].submit();
    });
}

function getExcel(){
    var o = $("#filenamexls").val();
    var tmp = o.split(".");
    if(tmp[1]!="xls"){
        jAlert("导入文件格式不对，请重新选择！");return false;
    }
    var excelApp;
    var excelWorkBook;
    var excelSheet;
    try{
        excelApp = new ActiveXObject("Excel.Application");
        excelWorkBook = excelApp.Workbooks.open($("#pxls_url").val());
        excelSheet = excelWorkBook.ActiveSheet; //WorkSheets("sheet1")
        //alert(excelSheet.Cells(1,1).value);
        //excelSheet.Cells(6,2).value;//cell的值
        //excelSheet.usedrange.rows.count;//使用的行数
        //excelWorkBook.Worksheets.count;//得到sheet的个数
        //根据舱房编号来匹配舱房
        var j =(excelSheet.usedrange.rows.count);
        for(var i=2;i<j+1;i++){
            for(var k=1;k<100;k++){
                if($("#dm"+k).html()){
                    if(excelSheet.Cells(i,1).value==$("#dm"+k).html()){
                        $("#w"+k+"1").val(excelSheet.Cells(i,4).value);
                        $("#w"+k+"2").val(excelSheet.Cells(i,5).value);
                        $("#w"+k+"3").val(excelSheet.Cells(i,6).value);
                        $("#w"+k+"4").val(excelSheet.Cells(i,7).value);
                        $("#w"+k+"5").val(excelSheet.Cells(i,8).value);
                        $("#w"+k+"6").val(excelSheet.Cells(i,9).value);
                        $("#w"+k+"7").val(excelSheet.Cells(i,10).value);
                    }
                }
            }
        }
        excelSheet=null;
        excelWorkBook.close();
        excelApp.Application.Quit();
        excelApp=null;
    }catch(e){
        if(excelSheet !=null || excelSheet!=undefined){
            excelSheet =nul;
        }
        if(excelWorkBook != null || excelWorkBook!=undefined){
            excelWorkBook.close();
        }
        if(excelApp != null || excelApp!=undefined){
            excelApp.Application.Quit();
            excelApp=null;
        }
    }
}

function filterP(){

    //筛选订单状态
    var o = ($("#fp").val());
    var k = Number($("#kk").val()+1);
    if(o=="全部"){
        for(var i=0;i<k;i++){
            if($("#j"+i).html()){
                $("#j"+i).removeAttr("style").css("line-height","20px");
            }
            if($("#jj"+i).html()){
                $("#jj"+i).removeAttr("style");
            }
        }
    }else{
        for(var i=0;i<k;i++){
            if($("#j"+i).html()){
                $("#j"+i).removeAttr("style");
            }
            if($("#jj"+i).html()){
                $("#jj"+i).removeAttr("style");
            }
        }
        for(var i=0;i<k;i++){
            if($("#h"+i).html()){
                //alert(($("#h"+i).html()).replace(/(^\s*)|(\s*$)/g, ""));
                if(($("#h"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
    //筛选运营性质
    var o = ($("#fp1").val());
    var k = Number($("#kk").val()+1);
    if(o=="全部"){
       
    }else{
        
        for(var i=0;i<k;i++){
            if($("#sbh"+i).html()){
                if(($("#sbh"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
    //筛选客服
    var o = ($("#fp2").val());
    var k = Number($("#kk").val()+1);
    if(o=="全部"){
       
    }else{
        
        for(var i=0;i<k;i++){
            if($("#hu"+i).html()){
                if(($("#hu"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
    //筛选录入人
    var o = ($("#fp3").val());
    var k = Number($("#kk").val()+1);
    if(o=="全部"){
       
    }else{
        
        for(var i=0;i<k;i++){
            if($("#hua"+i).html()){
                if(($("#hua"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
    //供应商
    var o = ($("#fp4").val());
    var k = Number($("#kk").val()+1);
    if(o=="全部"){
       
    }else{
        
        for(var i=0;i<k;i++){
            if($("#hus"+i).html()){
                if(($("#hus"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
    //船
    var o = ($("#fp5").val());
    var k = Number($("#kk").val()+1);
    if(o=="全部"){
       
    }else{
        
        for(var i=0;i<k;i++){
            if($("#vb"+i).html()){
                if(($("#vb"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
    //出发日期
    var o = ($("#fp6").val());
    var k = Number($("#kk").val()+1);
    if(o==""){
       
    }else{
        
        for(var i=0;i<k;i++){
            if($("#va"+i).html()){
                if(($("#va"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
}

function filterQ(){
    var o = ($("#fp1").val());
    var k = $("#kk").val();
    if(o=="全部"){
        for(var i=0;i<k;i++){
            if($("#j"+i).html()){
                $("#j"+i).removeAttr("style");
            }
            if($("#jj"+i).html()){
                $("#jj"+i).removeAttr("style");
            }
        }
    }else{
        for(var i=0;i<k;i++){
            if($("#j"+i).html()){
                $("#j"+i).removeAttr("style");
            }
            if($("#jj"+i).html()){
                $("#jj"+i).removeAttr("style");
            }
        }
        for(var i=0;i<k;i++){
            if($("#sbh"+i).html()){
                if(($("#sbh"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }

    //...

    var o = ($("#fp").val());
    var k = $("#kk").val();
    if(o=="全部"){
        
    }else{
       
        for(var i=0;i<k;i++){
            if($("#h"+i).html()){
                if(($("#h"+i).html()).replace(/(^\s*)|(\s*$)/g, "")!=o){

                    if($("#j"+i).html()){
                        $("#j"+i).css("display","none");
                    }
                    if($("#jj"+i).html()){
                        $("#jj"+i).css("display","none");
                    }
                }
            }
        }
    }
}

function filterS(){
    var o = ($("#fs").val());

    var k = Number($("#kk").val())+1;

    if(o=="产品编号/产品名称" || o=="订单号/产品名称" || o=="产品名称" || o=="需求内容"){
        for(var i=0;i<k;i++){
            if($("#j"+i).html()){
                $("#j"+i).removeAttr("style");
            }
            if($("#jj"+i).html()){
                $("#jj"+i).removeAttr("style");
            }
        }
    }else{
        for(var i=0;i<k;i++){
            if($("#j"+i).html()){
                $("#j"+i).removeAttr("style");
            }
            if($("#jj"+i).html()){
                $("#jj"+i).removeAttr("style");
            }
        }
        for(var i=0;i<k;i++){
            var a1 = $("#w"+i).html();
            var a2 = $("#v"+i).html();
            if(a1 && a2){
                if(a1.indexOf(o)==-1 && a2.indexOf(o)==-1){


                if($("#j"+i).html()){
                    $("#j"+i).css("display","none");
                }
                if($("#jj"+i).html()){
                    $("#jj"+i).css("display","none");
                }
                }
            }

            

        }
    }
}


function cancelBooking(){
    //var bln1 = window.confirm("是否确认取消？");
    //if(bln1 == false){return false;}
    //var str=prompt("请填写取消理由！");
    //if(str == ""){alert("取消理由不能为空！");return false;}
    var top1 = ($("#cb1").offset().top)-50;
    var html = "";
    html ="<div style='font-size:14px;'>您确定要取消该订单吗？取消订单后，不能恢复。</div><div style='margin-top:8px;'><b>请选择取消理由：</b>";
    html = html + "<select onchange='setCanelReason(this.value);'><option value='-'></option><option value='客人取消购买'>客人取消购买</option><option value='信息填写错误，重新下订单'>信息填写错误，重新下订单</option><option value='其他原因'>其他原因</option></select>";
    html = html + "</div><div style='margin-top:15px;'><textarea onblur='setCanelReason(this.value);' style='width:430px' rows='3'></textarea></div>";
    //$("#htmlxc").html(html);
    //var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#sType\").val(\"cancel\");document.forms[0].submit();' src='/images/yes.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").removeClass(\"A2\");$(\"#chooseinfo\").addClass(\"A1\");' src='/images/close.png'' />";
    //$("#htmlxc2").html(htmlxc1);
    
    //$("#chooseinfo").removeClass("A1");
    //$("#chooseinfo").addClass("A2").css("top",top1);   
    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sType").val("cancel");
            document.forms[0].submit();
        }
    });
}

function setCanelReason(res){
    if(res!=""){
      $("#canreason").val(res);  
    } 
}

function cancelBooking5(){
    //var bln1 = window.confirm("是否确认取消？");
    //if(bln1 == false){return false;}
    //var str=prompt("请填写取消理由！");
    //if(str == ""){alert("取消理由不能为空！");return false;}
    var top1 = ($(".cb5").offset().top)-50;
    var html = "";
    html ="您确定要取消该订单吗？取消订单后，不能恢复。<br/><b>请选择取消理由：</b>";
    html = html + "<select><option value='-'></option><option value='客人取消购买'>客人取消购买</option><option value='信息填写错误，重新下订单'>信息填写错误，重新下订单</option><option value='其他原因'>其他原因</option></select>";
    html = html + "<br/><br/><input type='text' style='margin-left:97px' />";
     
    jConfirmIframe(html, "", function(yes){
        if ( yes ) {
            $("#sType").val("cancel");
            document.forms[0].submit();
        }
    });
}

function paid(){
    jConfirmIframe("是否确认已付款？", '', function(yes){
        if(yes) { 
            $("#sType").val("pay");
            document.forms[0].submit();
            window.parent.htotop();
        }
    });
    
}

function addpayinfo(){

}

function closesells(){
    
}

function goto(i){
    var url = window.location.href;
    var tmp = url.split("#");
    //window.location =  tmp[0] + "#tab"+i;
    window.location.hash = "#tab"+i;
}

function diplaybx(){
    if($("#bxcc").css("display")=="none"){
        $("#bxcc").css("display","inline");
    }else{
        $("#bxcc").css("display","none");
    }
}

function addRows(obj,e){
    var ev=e||event;
    if(ev.keyCode==13){
        obj.rows+=1;
    }
}

function jt(i){
    if($("#jt"+i).attr("src")== "/images/04up.gif"){
        $("#jtb"+i).css("display","none");
        $("#jt"+i).attr("src","/images/03down.gif");
    }else{
        $("#jtb"+i).css("display","inline");
        $("#jt"+i).attr("src","/images/04up.gif");
        for(var j=0;j<200;j++){
            if(j!=i){
                $("#jt"+j).attr("src","/images/02.png");
                $("#jtb"+j).css("display","none");
            }
        }
    }
}

function sureGYS(){
    var o =$("#gys").val();
    var tmp = o.split("#");

    $("#username").val(tmp[0]);
    $("#usertel").val(tmp[1]);
    $("#usermail").val(tmp[2]);

    $("#companyID").val(tmp[3]);
    $("#userID").val(tmp[4]);
}

function sureGYSM(){
    var o =$("#gys").val();
    var tmp = o.split("#");

    //$("#username").val(tmp[0]);
    //$("#usertel").val(tmp[1]);
    //$("#usermail").val(tmp[2]);

    //$("#companyID").val(tmp[3]);
    document.all.owner_id.value = (tmp[4]);
}

function changeSorting() {
    if($('#pse2').val()=="1"){
            console.log('val 1');
            $("#orderby1").val("1");
        }else if($('#pse2').val()=="2"){
            console.log('val 2');
            $("#orderby1").val("2");
        }else if($('#pse2').val()=="3"){
            console.log('val 3');
            $("#orderby1").val("3");
        }else if($('#pse2').val()=="4"){
            $("#orderby1").val("4");
        }
    document.all.numStart.value = "0"; 
    document.forms[0].submit();
}

//下拉框下图片的选择
function changeCover(str){
    $(".page").hide();
    if(str=="pattern1")
    {
       $("#page1").show();
    }
    if(str=="pattern2")
    {
        $("#page2").show();
    }
}

function createNo(t2,shipNo){
    var dat = new Date();
    var day = (dat.getDate()+"").length == 1?"0"+dat.getDate():dat.getDate();
    var hour = (dat.getHours()+"").length == 1?"0"+dat.getHours():dat.getHours();
    //产品编号=供应商ID+出发日期年度后两位+船简称+出发日期月日+当前日期的日+当前日期的小时
    $("#product_number").val($("#companyID").val()+"-"+t2[0].substring(2,4)+"-"+shipNo+t2[1]+t2[2]+"-"+day+hour);
}

function bookingNextStep() {
    //如果房间数都为0，则提示
    var lab = 0;
    for (var i = 1; i < 50; i++) {
        if ($("#p" + i).val()) {
            if ($("#p" + i).val() != "0") {
                lab = 1;
            }
        }
    }
    if (lab == 0) {
        jAlert("请选择需要预定的舱房类型及数量！");
        window.location = window.location.href + "#top";
        return false;
    }

    var num1 = "";
    for (var i = 1; i < 50; i++) {
        if ($("#p" + i).val()) {
            if (num1 == "") {
                num1 = $("#p" + i).val();
            } else {
                num1 = num1 + "@" + $("#p" + i).val();
            }
        }
    }
    $("#buynum").val(num1);
    document.forms[0].submit();
    window.parent.htotop();
    maskIframe('加载中...', false);
}

//预定
function submitBooking(){

    //如最大入住人数为2，则成人数量+儿童数量不能是1，只能是2.如最大入住人数是3，则成人数量+儿童数量总和一定是3.如最大入住人数是4，则成人数量+儿童数量总和可以是3或者4
    var mm1 = Number($("#mm1").val());
    for(var i=1;i<mm1+1;i++){
        var s1 = Number($("#peo"+i+"1").val());
        var s2 = Number($("#peo"+i+"2").val());
        if(Number($("#canc"+i).html())==2){
            if(s1+s2 == 1){
                //如最大入住人数为2，则成人数量+儿童数量不能是1，只能是2！
                //alert("您录入的入住人数量有误，请正确填写");return false;
            }
        }
        if(Number($("#canc"+i).html())==3){
            if(s1+s2 != 3){
                //如最大入住人数是3，则成人数量+儿童数量总和一定是3！
                jAlert("您录入的入住人数量有误，请正确填写");return false;
            }
        }
        if(Number($("#canc"+i).html())==4){
            if((s1+s2 != 3) && (s1+s2 != 4)){
                //如最大入住人数是4，则成人数量+儿童数量总和可以是3或者4！
                jAlert7("您录入的入住人数量有误，家庭房需入住3-4人，请正确填写");return false;
            }
        }
    }

    //弹出框询问是否确认预览信息
    var str1 = "您的预定信息为:\r\n";
    var d1 = $("#cb").val();
    var d2 = $("#cba").val();
    var dt1 = d1.split(";");
    var dt2 = d2.split(";");
    for(var i=0;i<dt1.length;i++){
        str1 = str1 + dt1[i] + "x" + dt2[i]+"\r\n";
    }
    var total1 = 0;
    var total2 = 0;
    for(var i=1;i<mm1+1;i++){
        total1 = total1 + Number($("#peo"+i+"1").val());
        total1 = total1 + Number($("#peo"+i+"2").val());
        total2 = total2 + Number($("#peo"+i+"3").html());
    }
    str1 = str1+"\r\n预定总人数为:"+total1+"人";
    str1 = str1+"\r\n总价为:"+total2+"元";
    str1 = str1+"\r\n是否确认";

    jConfirmIframe("是否确认提交！", "", function(confirmed){
        if(!confirmed) return false;
        //检查游客信息必填
        var lab = 0;

        for(var i=1;i<mm1+1;i++){
            var s1 = Number($("#peo"+i+"1").val());
            var s2 = Number($("#peo"+i+"2").val());
            var s3 = s1 + s2 + 1;
            for(var j=1;j<s3;j++){
                if($("#q"+i+j+"1").css("display")!="none"){
                    if($("#q"+i+j+"1").val()=="" || $("#q"+i+j+"2").val()==""){
                        lab = 1;
                    }
                }
            }
        }

        if(lab == 1){
            jAlert("游客姓名不全，请尽快补齐！");return false;
        }
        //赋值游客信息
        var a1 = ""; var a2 = "";var a3 = "";var a4 = "";var a5 = "";var a6 = "";var a7 = "";var a8 = "";var a9 = "";var a10 = "";var a11 = "";

        for(var i=1;i<mm1+1;i++){

            for(var j=1;j<5;j++){

                if($("#q"+i+j+"1").css("display")!="none"){

                    if($("#q"+i+j+"1").val()!=""){

                        if(a1==""){
                            a1 = i;
                            a2 = $("#q"+i+j+"1").val();
                            a3 = $("#q"+i+j+"2").val();
                            if($("#q"+i+j+"3a").val()!="-" && $("#q"+i+j+"3b").val()!="-" && $("#q"+i+j+"3c").val()!="-"){
                                a4 = $("#q"+i+j+"3a").val()+"-"+ $("#q"+i+j+"3b").val()+"-" + $("#q"+i+j+"3c").val();
                            }else{
                                a4 = "0000-00-00";
                            }
                            a5 = $("#q"+i+j+"4").val();
                            if($("#province"+i+j).val()!="-" && $("#city"+i+j).val()!="-" ){
                                a6 = $("#province"+i+j).find("option:selected").text()+$("#city"+i+j).val();
                            }else{
                                a6 = "";
                            }
                            if($("#q"+i+j+"3d").val()!="-" && $("#q"+i+j+"3e").val()!="-" && $("#q"+i+j+"3f").val()!="-"){
                                a7 = $("#q"+i+j+"3d").val()+"-"+ $("#q"+i+j+"3e").val()+"-" + $("#q"+i+j+"3f").val();
                            }else{
                                a7 = "0000-00-00";
                            }
                            a8 = $("#q"+i+j+"7").combobox('getValue');
                            a9 = $("#q"+i+j+"9").val();
                            a10 = $("#q"+i+j+"10").val();
                            a11 = "q"+i+j+"11";
                        }else{
                            a1 = a1 + "@" + i;
                            a2 = a2 + "@" + $("#q"+i+j+"1").val();
                            a3 = a3 + "@" + $("#q"+i+j+"2").val();
                            if($("#q"+i+j+"3a").val()!="-" && $("#q"+i+j+"3b").val()!="-" && $("#q"+i+j+"3c").val()!="-"){
                                a4 = a4 + "@" + $("#q"+i+j+"3a").val()+"-"+ $("#q"+i+j+"3b").val()+"-" + $("#q"+i+j+"3c").val();
                            }else{
                                a4 = a4 + "@" +"0000-00-00";
                            }
                            a5 = a5 + "@" +$("#q"+i+j+"4").val();
                            if($("#province"+i+j).val()!="-" && $("#city"+i+j).val()!="-" ){
                                a6 = a6 + "@" +$("#province"+i+j).find("option:selected").text()+$("#city"+i+j).val();
                            }else{
                                a6 = a6 + "@" +"";
                            }
                            if($("#q"+i+j+"3d").val()!="-" && $("#q"+i+j+"3e").val()!="-" && $("#q"+i+j+"3f").val()!="-"){
                                a7 = a7 + "@" +$("#q"+i+j+"3d").val()+"-"+ $("#q"+i+j+"3e").val()+"-" + $("#q"+i+j+"3f").val();
                            }else{
                                a7 = a7 + "@" +"0000-00-00";
                            }
                            a8 = a8 + "@" +$("#q"+i+j+"7").combobox('getValue');
                            a9 = a9 + "@" + $("#q"+i+j+"9").val();
                            a10 = a10 + "@" + $("#q"+i+j+"10").val();
                            a11 = a11 + "@" + "q"+i+j+"11";
                        }
                    }
                }
            }
        }

        $("#pas1").val(a1);
        $("#pas2").val(a2);
        $("#pas3").val(a3);
        $("#pas4").val(a4);
        $("#pas5").val(a5);
        $("#pas6").val(a6);
        $("#pas7").val(a7);
        $("#pas8").val(a8);
        $("#pas9").val(a9);
        $("#pas10").val(a10);
        $("#pas11").val(a11);

        //return false;

        var num1 = "";var num2 = "";var num3 = "";
        for(var i=1;i<50;i++){
            if($("#peo"+i+"1").val()){
                if(num1==""){
                    num1 = $("#peo"+i+"1").val();
                    num2 = $("#peo"+i+"2").val();
                    num3 = $("#peo"+i+"3").html();
                }else{
                    num1 = num1+"@"+$("#peo"+i+"1").val();
                    num2 = num2+"@"+$("#peo"+i+"2").val();
                    num3 = num3+"@"+$("#peo"+i+"3").html();
                }
            }
        }
        $("#zd5").val(num1);
        $("#zd6").val(num2);
        $("#zd7").val(num3);
        //return false;
        $("#stype").val("submit");
        document.forms[0].submit();
        window.parent.htotop();
    });
}

