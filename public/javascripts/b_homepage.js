/**
 * Created by teng on 07.12.2014.
 */
var productList = [];
var startDateList = [];
var productTitleList = [];
var priseList = [];
var productNumbers = [];
var departureCities = [];
var statusList = [];
var currentY;

//using this to solve the IE10 issue (IE10 does not send the ajax request to the same url again)
function _ieWorkaround(){
    return "?time='"+new Date().getTime() + "'";
}

function fetchProduct4Calendar() {

    var u = $('#user-id');
    $.ajax({
        url: "fetchProducts4Calendar" + _ieWorkaround(),
        type:'get',
        dataType: 'json',
        data: {user_id : (u?u.val():null)},
        success: function(res) {
            productList = res.products;
            setCalendarMonthData();
            showCalender();
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function setCalendarMonthData() {
    var y = $("#caly").val();
    var m = $("#calm").val();
    if (m.length == 1) m = "0"+m;
    var dateStr = y+"-"+m;
    var p = [];
    for(var i in productList ){
        if ( productList[i].start_date.lastIndexOf(dateStr, 0) === 0){
            p.push(productList[i]);
        }
    }
    startDateList = [];
    productTitleList = [];
    priseList = [];
    productNumbers = [];
    departureCities = [];
    statusList = [];
    for (var i in p) {
        if (p[i].retail_price) {
            priseList.push(p[i].retail_price);
        } else {
            priseList.push(p[i].price);
        }
        startDateList.push(p[i].start_date);
        productTitleList.push(p[i].title);
        productNumbers.push(p[i].product_number);
        departureCities.push(p[i].location);
        statusList.push(p[i].status_id);
    }
}

function fetchNews(){
    document.getElementById('notice-board').innerHTML = "";

    $.ajax({
        url: "fetchNews" + _ieWorkaround(),
        type:'get',
        data: {test:''},
        dataType: 'json',
        success: function(res) {
            if ( res.error ) {
                console.log(JSON.stringify(res));
            }
            showNoticeBoard(res);
        },
        error: function(err) {
            console.log(JSON.stringify(err));
        }
    });
}
function showNoticeBoard(result) {
    for (var i in result) {
        console.log(result[i].type);
        if (result[i].type == 'product') {
            $('#notice-board').append('<div class="bcs" style="cursor:pointer" onclick="window.parent.hometoProduct(2);">' + result[i].date + '<br/>' + result[i].title + '&nbsp;&nbsp;&nbsp;' + result[i].publisher + '<br/>在【邮轮集市】发布了一条产品！</div><br/>');
        }
        if (result[i].type == 'supply') {
            $('#notice-board').append('<div class="bcs" style="cursor:pointer" onclick="window.parent.hometoMarket(3);">' + result[i].date + '<br/>' + result[i].title + '&nbsp;&nbsp;&nbsp;' + result[i].publisher + '<br/>在【尾舱买卖】发布了一条新供应信息！</div><br/>');
        }
        if (result[i].type == 'demand') {
            $('#notice-board').append('<div class="bcs" style="cursor:pointer" onclick="window.parent.hometoMarketBuy(3);">' + result[i].date + '<br/>' + result[i].title + '&nbsp;&nbsp;&nbsp;' + result[i].publisher + '<br/>在【尾舱买卖】发布了一条新需求信息！</div><br/>');
        }
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

function changeCalender() {
    var y = $("#caly").val();
    if ( y && currentY && y < currentY ) {
        $("#calm").val("12");
    } else if ( y && currentY && y > currentY ){
        $("#calm").val("01");
    }
    setCalendarMonthData();
    showCalender();
}

function showCalender(){
    hideDiv();
    var y = $("#caly").val();
    var m = $("#calm").val();
    currentY = y;
    var cal = "";
    var j = "";
    var maxm = getDays(y,m)+1;

    var nd = getToday();


    for(var i=1;i<maxm;i++){

        j = i + "";
        if(j.length==1){
            j = "0"+j;
        }
        var d = y+"-"+m+"-"+j;
        var p = "<br/>&nbsp;";
        var q = "&nbsp;";
        var cp = "";
        var r = "";
        var minp = 999999;
        var s = "";
        var ss = "";
        var tt = "";
        var color = 1;

        for(var k=0;k<startDateList.length;k++){
            if(startDateList[k]==d){
                if(minp == 999999){
                    if(Number(priseList[k])<minp){
                        minp = Number(priseList[k]);
                        color = 0;
                    }
                }else{
                    if(Number(priseList[k])<minp && statusList[k]!="6"){
                        minp = Number(priseList[k]);
                        color = 1;
                    }
                }

                if(startDateList[k]>nd && statusList[k]!="6"){
                    p = "<br/><span style='color:#FF0000;font-size:16px;'>￥"+minp+"起</span>";
                    ss = "1";
                }else{
                    p = "<br/><span style='color:#ABABAB;font-size:16px;'>￥"+minp+"起</span>";
                    ss = "0";
                }


                if(q=="&nbsp;"){
                    q = "￥"+priseList[k]+"起";
                    cp = "【"+departureCities[k]+"出发】"+productTitleList[k];
                    r =  productNumbers[k];
                    s = ss;
                    tt = statusList[k];
                }else{
                    q = q+"@"+"￥"+priseList[k]+"起";
                    cp = cp+"@"+"【"+departureCities[k]+"出发】"+productTitleList[k];
                    r =  r+"@"+productNumbers[k];
                    s = s + "@" + ss;
                    tt = tt + "@" + statusList[k];
                }

            }
        }

        if(minp!=999999){
            //如果当前日期过了
            if(d>nd){
                p = "<br/><span style='color:#FF0000;font-size:14px;'>￥"+minp+"起</span>";
            }else{
                p = "<br/><span style='color:#ABABAB;font-size:14px;'>￥"+minp+"起</span>";
            }
        }


        if(i==1){
            cal = cal + "<tr style='height:60px;line-height:28px;'><td style='width:90.57px;text-align:right;padding-right:5px;' onmouseover=' $(this).css(\"background-color\",\"#C5DCEE\");showDiv(event,\""+cp+"\",\""+q+"\",\""+r+"\",\""+s+"\",\""+tt+"\");' onmouseout='$(this).css(\"background-color\",\"#FFFFFF\");'><span style='font-weight:bold;font-size:18px;'>"+i+"</span>"+p+"</td>";
        }else{
            if((i-1)%7 !=0){
                cal = cal +"<td id='t"+i+"' style='width:90.57px;text-align:right;padding-right:5px;' onmouseover='$(this).css(\"background-color\",\"#C5DCEE\");showDiv(event,\""+cp+"\",\""+q+"\",\""+r+"\",\""+s+"\",\""+tt+"\");' onmouseout='$(this).css(\"background-color\",\"#FFFFFF\");'><span style='font-weight:bold;font-size:18px;'>"+i+"</span>"+p+"</td>";
            }else{
                cal = cal +"</tr><tr style='height:60px;line-height:28px;'><td id='t"+i+"' style='width:90.57px;text-align:right;padding-right:5px;' onmouseover='$(this).css(\"background-color\",\"#C5DCEE\");showDiv(event,\""+cp+"\",\""+q+"\",\""+r+"\",\""+s+"\",\""+tt+"\");' onmouseout='$(this).css(\"background-color\",\"#FFFFFF\");'><span style='font-weight:bold;font-size:18px;'>"+i+"</span>"+p+"</td>";
            }
        }
    }
    if(maxm == 29){
        cal = cal + "</tr><tr style='height:60px;line-height:28px;'><td colspan='"+(36-maxm)+"'></td></tr>";
    }else{
        cal = cal + "<td colspan='"+(36-maxm)+"'></td></tr>";
    }

    $("#calender").html(cal);
    unmask();
}

function showDiv(e,title,p,pnum,s,tt){
    if(title!=""){
        var x = e.clientX;
        var y = e.clientY;
        var tmp1 = pnum.split("@");
        var tmp2 = title.split("@");
        var tmp3 = p.split("@");
        var tmp4 = s.split("@");

        var tmp5 = tt.split("@");
        var tooltipHtml = "";
        for(var i=0;i<tmp1.length;i++){
            if(tooltipHtml==""){
                if(tmp5[i]=="6"){
                    tooltipHtml = "【停售】"+tmp2[i]+"<span style='color:#ABABAB'>"+tmp3[i]+"</span>"; //创建提示框
                }else{
                    if(tmp4[i]=="1"){
                        tooltipHtml = "<a href='#' onclick='window.parent.htp(\""+tmp1[i]+"\");'>"+tmp2[i]+"<span style='color:#FF0000'>"+tmp3[i]+"</span></a>"; //创建提示框
                    }else{
                        tooltipHtml = "【停售】"+tmp2[i]+"<span style='color:#ABABAB'>"+tmp3[i]+"</span>"; //创建提示框
                    }
                }


            }else{
                if(tmp5[i]=="6"){
                    tooltipHtml = tooltipHtml+"<br/>【停售】"+tmp2[i]+"<span style='color:#ABABAB'>"+tmp3[i]+"</span>"; //创建提示框
                }else{
                    if(tmp4[i]=="1"){
                        tooltipHtml = tooltipHtml+"<br/>"+"<a href='#' onclick='window.parent.htp(\""+tmp1[i]+"\");'>"+tmp2[i]+"<span style='color:#FF0000'>"+tmp3[i]+"</span></a>"; //创建提示框
                    }else{
                        tooltipHtml = tooltipHtml+"<br/>"+"【停售】"+tmp2[i]+"<span style='color:#ABABAB'>"+tmp3[i]+"</span>"; //创建提示框
                    }
                }

            }

        }

        $("#tooltip").html(tooltipHtml); //添加到页面中
        $("#tooltip2").css({
            "top": y + "px",
            "left": x + "px"
        }).show("fast"); //设置提示框的坐标，并显示
    }else{
        $("#tooltip2").hide();
    }
}

function hideDiv(){
    $("#tooltip2").hide();
}

$(function() {
    mask("加载邮轮日历...");
    showCalender();
    fetchProduct4Calendar();
    fetchNews();
});