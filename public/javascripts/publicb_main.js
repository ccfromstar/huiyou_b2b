$(function(){
    var url = window.location.href;
    var tmp = url.split("/");
    if(tmp[3]=="market"){
        window.parent.gt3();
    }else if(tmp[3]=="marketbuy"){
        window.parent.gt31();
    }

    $(".btn").css("left",350);

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

    var url = window.location.href;

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
            showdialog($("#info").val(),"warning");
        }
    }
    if($("#infor").val()){
        if($("#infor").val()!="null" && $("#infor").val()!="undefined"){
            showdialog($("#infor").val(),"warning");
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
        $(this).css("background-color","#F78D2B").css("color","#FFFFFF");
    },function(){
        $(this).css("background-color","#ABBBBB").css("color","#FFFFFF");
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



    for(var i=1;i<15;i++){
        $("#bh"+i).val(2);
    }


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

    if($("#miao").html()){
        var timer = setInterval( handler , 1000);
    }

    if($("#miao1").html()){
        var timer1 = setInterval( handler1 , 1000);
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
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx1").css("background-color","#B3B3B3");
            $("#bh1").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh1").val(2);
        }
    });
    $("#yy2").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx2").css("background-color","#B3B3B3");
            $("#bh2").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh2").val(2);
        }
    });
    $("#yy3").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx3").css("background-color","#B3B3B3");
            $("#bh3").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh3").val(2);
        }
    });
    $("#yy4").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx4").css("background-color","#B3B3B3");
            $("#bh4").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh4").val(2);
        }
    });
    $("#yy5").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx5").css("background-color","#B3B3B3");
            $("#bh5").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh5").val(2);
        }
    });
    $("#yy6").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx6").css("background-color","#B3B3B3");
            $("#bh6").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh6").val(2);
        }
    });
    $("#yy7").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx7").css("background-color","#B3B3B3");
            $("#bh7").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh7").val(2);
        }
    });
    $("#yy8").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx8").css("background-color","#B3B3B3");
            $("#bh8").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh8").val(2);
        }
    });
    $("#yy9").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx9").css("background-color","#B3B3B3");
            $("#bh9").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh9").val(2);
        }
    });
    $("#yy10").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx10").css("background-color","#B3B3B3");
            $("#bh10").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh10").val(2);
        }
    });
    $("#yy11").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx11").css("background-color","#B3B3B3");
            $("#bh11").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh11").val(2);
        }
    });
    $("#yy12").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx12").css("background-color","#B3B3B3");
            $("#bh12").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh12").val(2);
        }
    });
    $("#yy13").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx13").css("background-color","#B3B3B3");
            $("#bh13").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh13").val(2);
        }
    });
    $("#yy14").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#62C46F");
            $("#xx14").css("background-color","#B3B3B3");
            $("#bh14").val(1);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh14").val(2);
        }
    });

    $("#xx1").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy1").css("background-color","#B3B3B3");
            $("#bh1").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh1").val(2);
        }
    });

    $("#xx2").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy2").css("background-color","#B3B3B3");
            $("#bh2").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh2").val(2);
        }
    });

    $("#xx3").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy3").css("background-color","#B3B3B3");
            $("#bh3").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh3").val(2);
        }
    });

    $("#xx4").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy4").css("background-color","#B3B3B3");
            $("#bh4").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh4").val(2);
        }
    });

    $("#xx5").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy5").css("background-color","#B3B3B3");
            $("#bh5").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh5").val(2);
        }
    });

    $("#xx6").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy6").css("background-color","#B3B3B3");
            $("#bh6").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh6").val(2);
        }
    });

    $("#xx7").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy7").css("background-color","#B3B3B3");
            $("#bh7").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh7").val(2);
        }
    });

    $("#xx8").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy8").css("background-color","#B3B3B3");
            $("#bh8").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh8").val(2);
        }
    });

    $("#xx9").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy9").css("background-color","#B3B3B3");
            $("#bh9").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh9").val(2);
        }
    });

    $("#xx10").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy10").css("background-color","#B3B3B3");
            $("#bh10").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh10").val(2);
        }
    });

    $("#xx11").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy11").css("background-color","#B3B3B3");
            $("#bh11").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh11").val(2);
        }
    });

    $("#xx12").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy12").css("background-color","#B3B3B3");
            $("#bh12").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh12").val(2);
        }
    });

    $("#xx13").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
            $(this).css("background-color","#F7861E");
            $("#yy13").css("background-color","#B3B3B3");
            $("#bh13").val(0);
        }else{
            $(this).css("background-color","#B3B3B3");
            $("#bh13").val(2);
        }
    });

    $("#xx14").click(function(){
        if($(this).css("background-color")=="rgb(179, 179, 179)"){
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
            //jAlert("您已经登录过一个账户，请先退出后再登录！");
            //$("#bt").css("display","none");
            //$("#dl1").css("display","none");
        }
    }

    //window.parent.ResizeIframeFromParent('page1');
           
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
});

function showdialog(str,type){
    jAlert(str);
}

function login(){
    if($("#name").val()==""|$("#pwd").val()==""){
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
    if($("#name").val()==""){
        jAlert("请正确填写您的邮箱/手机号，我们会将您的密码发送到您注册时填写的邮箱！");return false;
    }
    window.location='/forgetpwd?p='+$("#name").val();
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
    h = h + "<td style='width:100px;'><select id='location"+n+"' style='width: 80px;'>";
    var str1 = "";

    var hq = $("#txtPlace").val();
    var hq1 = "";
    if(hq=="6"){
        hq1 = "航海日;上海;济州;釜山;福冈;长崎;鹿儿岛;仁川/首尔;丽水;冲绳;济州（过夜）;首尔（过夜）;横滨/东京;天津";
    }else if(hq=="11"){
        hq1 = "航海日;上海;福冈;长崎;鹿儿岛;冲绳;横滨/东京;天津";
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
    h = h + "<td style='width:100px'><br/>早餐&nbsp;<select class='easyui-combobox' id='breakfast"+n+"' style='width:50px;'><option value=''></option><option    value='邮轮' selected>邮轮</option><option value='不含'>不含</option><option value='团餐'>团餐</option></select><br/>午餐&nbsp;<select class='easyui-combobox' id='lunch"+n+"' style='width:50px;'><option value=''></option><option value='邮轮'>邮轮</option><option value='不含'>不含</option><option value='团餐'>团餐</option></select><br/>晚餐&nbsp;<select class='easyui-combobox' id='dinner"+n+"' style='width:50px;'><option value=''></option><option value='邮轮'>邮轮</option><option value='不含'>不含</option><option value='团餐'>团餐</option></select><br/><br/></td>";
    h = h + "<td style='width:80px'><select class='easyui-combobox' id='overnight_stay"+n+"' style='width:50px;'><option value='邮轮'>邮轮</option></select></td>";
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
    html1 = html1 + "<td style='width: 130px'>舱房说明</td>";
    html1 = html1 + "<td style='width: 80px'>可入住人数</td>";
    html1 = html1 + "<td style='width: 90px'>第1、2人</td>";
    html1 = html1 + "<td style='width: 90px'>结算价</td>";
    html1 = html1 + "<td style='width: 90px'>第3、4人</td>";
    html1 = html1 + "<td style='width: 90px'>结算价</td>";
    html1 = html1 + "<td style='width: 90px'>儿童价</td>";
    html1 = html1 + "<td style='width: 80px'>可售房间数</td>";
    html1 = html1 + "<td style='width: 150px'>备注</td>";
    html1 = html1 + "</tr>";
    var tmps = "";
    var t= 1;
    var j = 0;
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="内舱房") {
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='10'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="皇家大道景观房") {
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='10'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="海景房") {
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='10'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="阳台房") {
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='10'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
            }
        }
    }
    for(var i=0;i<y1.length;i++){
        if(y1[i]==shipNo){

            if(y6[i]=="套房") {
                j = j + 1;
                if (y6[i] == tmps) {
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                } else {
                    html1 = html1 + "<tr class='zhup' style='text-align: center;background-color: #EDEBEC'>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td id=dn"+t+">" + y6[i] + "</td>";
                    html1 = html1 + "<td>-</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0;}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#z"+t+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0};if(Number(value) > Number($(\"#z"+t+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='z" + t + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#z"+t+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 50px' type='text' id='z" + t + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' value='均价，舱房随机。' type='text' id='z" + t + "7' /><input style='width: 50px'  id='z" + t + "8'  type='hidden' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";

                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td colspan='10'><b>" + y6[i] + "</b></td>";
                    html1 = html1 + "</tr>";
                    html1 = html1 + "<tr class='zip' style='text-align: center'>";
                    html1 = html1 + "<td id=dm"+j+">" + y2[i] + "</td>";
                    html1 = html1 + "<td>" + y3[i] + "</td>";
                    html1 = html1 + "<td>" + y4[i] + "</td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "1' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"2\").val())){jAlert(\"1，2人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "2' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"结算价不能大于1，2人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    if(Number(y4[i])>2){
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>￥<input style='width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }else{
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "3' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) < Number($(\"#w"+j+"4\").val())){jAlert(\"3，4人价不能小于结算价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"1\").val())){jAlert(\"3，4人价不能大于1，2人价！\");value=0};' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "4' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"结算价不能大于3，4人价！\");value=0}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                        html1 = html1 + "<td>-<input style='display:none;width: 50px' type='text' id='w" + j + "5' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;};if(Number(value) > Number($(\"#w"+j+"3\").val())){jAlert(\"儿童价不能大于3，4人价！\");value=0;}' /></td>";
                    }


                    html1 = html1 + "<td><input style='width: 50px' type='text' id='w" + j + "6' value=0 onkeydown='onlyNum();' onFocus='if(value==defaultValue){value=\"\";}' onBlur='if(!value){value=defaultValue}if(isNaN(value)){jAlert(\"只能填写数字\");value=0;}' /></td>";
                    html1 = html1 + "<td><input style='width: 120px' type='text' id='w" + j + "7' /><input  type='hidden' style='width: 50px'  id='w" + j + "8' value='" + y5[i] + "' /><input  type='hidden' style='width: 50px'  id='w" + j + "9' value='" + y6[i] + "' /></td>";
                    html1 = html1 + "</tr>";
                    tmps = y6[i];
                    t = t + 1;
                }
            }
        }
    }
    html1 = html1 + "</table>";
    $("#pricelist").html(html1);
}

function loadxc(){
    var n = Number($("#days").val());
    $("#xcnum").val(0);
    $("#xingcheng").html("");
    for(var i=0;i<n;i++){
        addXC();
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

//function createpName(){
//    var pname = "";
//    //产品名称=出发日期月日+船名+晚天数+航区+“游”
//    var a = $("#shipNo").val();
//    var b = $("#shipName").val();
//    var t = a.split(";");
//    var t1 = b.split(";");
//    var shipName = "";
//
//    var d = $("#start_date").val();
//    if(d!=""){
//        var tmp = d.split("-");
//        pname = pname +  Number(tmp[1])+"月"+Number(tmp[2])+"日";
//    }
//
//    for(var i=0;i< t.length;i++){
//        if(t[i]==$("#ship_id").val()){
//            shipName = t1[i];
//        }
//    }
//    pname = pname +  shipName;
//
//    pname = pname + $("#wan").val()+"晚"+ $("#days").val()+"天";
//    pname = pname + $.trim($("#txtPlace").find("option:selected").text());
//    pname = pname + "游";
//        $("#title").val(pname);
//}

function ctab(i){
    for(var j=1;j<6;j++){
        var o = ($("#n"+j).attr("class"));
        $("#n"+j).removeClass(o);
        if(j==i){
           $("#n"+j).addClass("tab1");
        }else{
           $("#n"+j).addClass("tab2");
        }
    }
    var url = window.location.href;
    var tmp = url.split("#");
    var nurl = tmp[0]+"#tab"+i;
    window.location = nurl;
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
    var html = "&nbsp;&nbsp;&nbsp;文件名: <input type='text' name='filename"+n+"' /> <input onchange='getname(\""+n+"\");' type='file' name='file"+n+"' id='file"+n+"'></input><br/>";
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
    var top1 = ($("#cancellation_policy").offset().top);

    var html = "";
    var a1 = $("#chose1").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
            j = j + 1;
            html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设行程"+j+"</span>";
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
    var top1 = ($("#visa_comment").offset().top);

    var html = "";
    var a1 = $("#chose2").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        //alert(tmp1[i]);
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
    var top1 = ($("#payment_comment").offset().top);

    var html = "";
    var a1 = $("#chose3").val();
    var tmp1 = a1.split("@");
    var j = 0;

    for(var i=0;i<tmp1.length;i++){
        j = j + 1;
        html = html + "<img id='gou"+j+"' src='/images/gou1.png' /> <span style='font-weight: bold;margin-top: 0px;font-size: 12px;color:#F68421'>预设行程"+j+"</span>";
        html = html + "<div><img src='/images/ora.jpg' style='margin-top: 0px;height: 2px;width: 100%' /></div>";
        html = html + "<div onclick='checkkuang("+j+");$(\"#payment_comment\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div><br/>";
    }

    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#payment_comment\").val(\"\");$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/write.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/yes.png'' />";
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
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"&nbsp;&nbsp;<input type='text' style='width: 670px;' /></div>";
        }else{
            html = html + "<div onclick='checkkuang("+j+");$(\"#reject_reason\").val(\""+tmp1[i]+"\");' style='cursor: pointer;background-color: #F2F0F4;padding: 5px;'>"+tmp1[i]+"</div>";
        }

    }

    $("#htmlxc").html(html);
    var htmlxc1 = "<img style='cursor: pointer' onclick='$(\"#sa1\").val(\"nopass\");document.forms[0].submit();' src='/images/yes.png'' /><img style='cursor: pointer' onclick='$(\"#chooseinfo\").css(\"display\",\"none\");' src='/images/close.png'' />";
    $("#htmlxc2").html(htmlxc1);

    //$("#w").window("open");
    $("#chooseinfo").css("display","inline-block").css("top",top1);
}

function showPics1(index,indexd,lengthd,sWidth) { //普通切换
    //jAlert(Math.floor(indexd/lengthd));
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
    //jAlert(Math.floor(indexd/lengthd));
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
    if(tmp[3]!=""){
        if(p.getElementById('new-count')){
            if (parseInt(p.getElementById('new-count').value) > 0) {
                var t = p.title;
                p.title = t.substring(0, 3);
                p.getElementById('new-count').value = '0';
            }
            p.getElementById('focus-' + window.frameElement.id).value = '1';
        }
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


function filterP(){
    var o = ($("#fp").val());
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
            if($("#h"+i).html()){
                if($("#h"+i).html()!=o){

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
    var k = $("#kk").val();

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

