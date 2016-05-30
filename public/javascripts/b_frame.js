
var currentPage = 1;
var pageLoaded = {
    page1 : true, //always true because this is the default page to be loaded
    page2 : false,
    page3 : false,
    page4 : false,
    page5 : false,
    page6 : false,
    page7 : false,
    page8 : false,
    page9 : false
};

$(function() {
        var auchorTop = $("#anchor").css("top");
        auchorTop = Number(auchorTop.substring(0, auchorTop.indexOf("p"))); //首先在监听器外部记录某id=anchor的标签的初始位置
        window.onscroll = function () {
            if($("#anchor").css("display")=="none"){
                return false;
            }
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            //$("#anchor").css("top", auchorTop + top + "px");
            if(top>250){
                //固定tab
                var left = $("#anchor").css("left");
                $("#anchor").css("position","fixed").css("top","0").css("left",left);
            }else{
                //释放tab
                $("#anchor").removeAttr("style");
            }
        };






    hover7();
    hover8();
    $("#manager").click(function(){
        $("#m5-txt").css("color","#000000");
        $("#m1-txt").css("color","#000000");
        $("#m2-txt").css("color","#000000");
        $("#m7-txt").css("color","#000000");
         $("#m8-txt").css("color","#000000");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color","#797979");
        hover7();
        hover8();

    });

    var agent=navigator.userAgent;  //兼容代码 如果是IE游览器 则我的销售订单 和 我们购买订单 width=120
    if(/Trident\/\w+/.test(agent))
    {
        $("#m7,#m8").css("width","120");
    }

   

    //$.jGrowl("短消息");

    $("#pic1").hover(function(){
        $(this).attr("src","images/contact.png");
    },function(){
        $(this).attr("src","images/contact0.png");
    });

    $("#pic2").hover(function(){
        $(this).attr("src","images/download.png");
    },function(){
        $(this).attr("src","images/download0.png");
    });

    $("#pic3").hover(function(){
        $(this).attr("src","images/tothetop.png");
    },function(){
        $(this).attr("src","images/tothetop0.png");
    });

    $("#pic40").hover(function(){
        $(this).css("color","#F6921E");
    },function(){
        $(this).css("color","#797D81");
    });

    $("#pic4").hover(function(){
        $(this).attr("src","images/yuding.png");
    },function(){
        $(this).attr("src","images/yuding0.png");
    });

    $("#pic5").hover(function(){
        $(this).attr("src","images/ff.png");
    },function(){
        $(this).attr("src","images/ff0.png");
    });

    $("#pic6").hover(function(){
        $(this).attr("src","images/fg.png");
    },function(){
        $(this).attr("src","images/fg0.png");
    });

    $("#pic7").hover(function(){
        $(this).attr("src","images/fx.png");
    },function(){
        $(this).attr("src","images/fx0.png");
    });

    $("#pic10").hover(function(){
        $(this).attr("src","images/download0.png");
    },function(){
        $(this).attr("src","images/download.png");
    });

    $("#pic11").hover(function(){
        $(this).attr("src","images/downloadt.png");
    },function(){
        $(this).attr("src","images/downloadt0.png");
    });
});

//detect IE version
var div = document.createElement("div");
div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
var isIeLowerThan9 = (div.getElementsByTagName("i").length == 1);

//booking logic
var isInBooking = false;
var bookingFromProductDetailView = false;
var detailViewBackFromBooking = false;


function hover7() {
    $("#m7-txt,#m7-span").mouseenter(function () {
        $("#m7-span").css("color", "#FFFFFF");
    });
    $("#m7-txt").mouseleave(function () {
        $("#m7-span").css("color", "#797979");
    });

}
function hover8() {
    $("#m8-txt,#m8-span").mouseenter(function () {
        $("#m8-span").css("color", "#FFFFFF");
    });
    $("#m8-txt").mouseleave(function () {
        $("#m8-span").css("color", "#797979");
    });
}

function ResizeIframeFromParent(id) {       //计算高度
    if (jQuery('#'+id).length > 0) {
        var window = document.getElementById(id).contentWindow;
        var prevheight = jQuery('#'+id).css('height');
        var newheight = window.document.body?Math.max(window.document.body.offsetHeight, window.document.body.clientHeight ):prevheight;
        if (newheight != prevheight && newheight > 0) {
            jQuery('#'+id).css('height', newheight);
        }
    }
}


function isCurrentPage(num) {
    return currentPage == num;
}
/* determine if the specified page could be refreshed, e.g. product overview list, booking list. */
function isPageRefreshable(pageNum){
    return window.frames['page'+pageNum].document.getElementById('refreshable-page');
}

function goToProductListView(){
    if( !detailViewBackFromBooking && pageLoaded.page2 ) {
        history.go(-1);
    } else {
        document.getElementById("totop").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        $("#page2").attr("src", "productlist").css("height", "1400px");
        pageLoaded.page2 = true;
        ResizeIframeFromParent('page2'); 
    }
    ctab(6);
    detailViewBackFromBooking = false;
    bookingFromProductDetailView = false;
}

function isVisible(elementId) {
    return document.getElementById(elementId).style.display != "none";
}

function showElement(elementId) {
    if ( !isVisible(elementId) ){
        document.getElementById(elementId).style.display = "inline";
    }
}
function hideElement(elementId) {
    if ( isVisible(elementId) ){
        document.getElementById(elementId).style.display = "none";
    }
}
function hideElements(ids){
    for( var i in ids ){
        hideElement(ids[i]);
    }
}
function showElements(ids){
    for( var i in ids ){
        showElement(ids[i]);
    }
}
// workaround for mobile device browser
function changePageOnTouch(num) {
    if( mobileDevice.isAny() ) {
        //alert("is mobile device");
        changepage(num);
        return false;
    }
}
// for desktop browser
function changePageOnClick(num) {
    if( mobileDevice.isAny()) return;
    //alert("is desktop");
    changepage(num);
    return false;
}
function changepage(num, parameters) {
    if (num == 1) {
        hideElements(["totop","anchor","anchor1","publish","buy","sell"]);
        if (isCurrentPage(num)) {
            $("#page1").attr("src", "loading?page=homepage").css("height", "900px");
            ResizeIframeFromParent('page1');
        }
        showIframe(1);
        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m1-txt").css("color", "#FFFFFF");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();

    } else if (num == 2) {

        var o = $('#page2')[0].contentWindow.location.href;

        if (!isInBooking && o.indexOf("productdetail") != -1 && o.indexOf("productdetailbooking") == -1) {
            showElements(["totop","anchor","anchor1"]);
        } else {
            hideElements(["totop","anchor","anchor1"]);
        }

        var tmp1 = o.split("/");
        if (getCookie("logorole") == 1) {
            if (tmp1[3] == "loading" || tmp1[3] == "productlist") {
                document.getElementById("publish").style.display = "inline";
            } else {
                document.getElementById("publish").style.display = "none";
            }
        }
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";

        var isChanged = document.getElementById('m2-changed').value == '1';
        if (isChanged) removeNotify(2);
        if (isCurrentPage(num) || !pageLoaded.page2 || (isChanged && isPageRefreshable(num))) {
            $("#page2").attr("src", "productlist").css("height", "1400px");
            pageLoaded.page2 = true;
            //ResizeIframeFromParent('page2'); // <- call this in the iframe after page is loaded completely
        }

        if (isInBooking) {
            showIframe(10);
        } else {
            showIframe(2);
        }

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m2-txt").css("color", "#FFFFFF");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();

    } else if (num == 3) {
        document.getElementById("totop").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";

        var o = $('#page3')[0].contentWindow.location.href;

        var tmp1 = o.split("/");

        if (tmp1[3] == "loading" || tmp1[3] == "market") {
            document.getElementById("buy").style.display = "inline";
            document.getElementById("sell").style.display = "none";
        } else if (tmp1[3] == "loading" || tmp1[3] == "marketbuy") {
            document.getElementById("buy").style.display = "none";
            document.getElementById("sell").style.display = "inline";
        } else {
            document.getElementById("buy").style.display = "none";
            document.getElementById("sell").style.display = "none";
        }


        var isChanged = document.getElementById('m3-changed').value == '1';
        if (isChanged) removeNotify(3);
        if (isCurrentPage(num) || !pageLoaded.page3 || (isChanged && isPageRefreshable(num))) {
            $("#page3").attr("src", "loading?page=market").css("height", "1600px");
            pageLoaded.page3 = true;
            ResizeIframeFromParent('page3');
        }

        showIframe(3);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m3-txt").css("color", "#FFFFFF");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();
    } else if (num == 4) {
        document.getElementById("totop").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("buy").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        document.getElementById("sell").style.display = "none";
        if (isCurrentPage(num) || !pageLoaded.page4) {
            if (getCookie("logorole") == 0) {
                $("#page4").attr("src", "loading?page=optioncompany").css("height", "500px");
            } else {
                $("#page4").attr("src", "loading?page=optioncompany").css("height", "500px");
            }

            ResizeIframeFromParent('page4');
            pageLoaded.page4 = true;
            removeNotify(4);
        }
        showIframe(4);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();
    } else if (num == 5) {
        document.getElementById("totop").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("buy").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        document.getElementById("sell").style.display = "none";
        //load message page
        if (isCurrentPage(num) || !pageLoaded.page5) {
            if (parameters) {
                //call iframe js function after iframe loaded
                $('#page5').load(function () {
                    document.getElementById('page5').contentWindow.openOrCreateTopic(parameters);
                });
            }
            if (isIeLowerThan9) {
                $("#page5").attr("src", "loading?page=message").css("height", "900px");
            } else {
                //TODO 
                $("#page5").attr("src", "loading?page=message2").css("height", "900px");
            }
            pageLoaded.page5 = true;
        } else if (parameters) {
            document.getElementById('page5').contentWindow.openOrCreateTopic(parameters);
        }
        /*if ( src_url ) {
         $("#page5").attr("src", src_url).css("height", "900px");
         }*/

        removeNotify(5);
        showIframe(5);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m5-txt").css("color", "#FFFFFF");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();
    } else if (num == 6) {
        document.getElementById("totop").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";
        if (isCurrentPage(num) || !pageLoaded.page6) {
            $("#page6").attr("src", "loading&page=publishproductmenu").css("height", "650px");
            ResizeIframeFromParent('page6');
            pageLoaded.page6 = true;
        }
        showIframe(6);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();
    } else if (num == 7) {
        var o = $('#page7')[0].contentWindow.location.href;

        document.getElementById("totop").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";

        var isChanged = document.getElementById('m7-changed').value == '1';
        if (isChanged) removeNotify(7);
        if (isCurrentPage(num) || !pageLoaded.page7 || (isChanged && isPageRefreshable(num))) {
            $("#page7").attr("src", "loading?page=optionordersell");
            pageLoaded.page7 = true;
            ResizeIframeFromParent('page7');
        }
        showIframe(7);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#FFFFFF");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m7-txt #m7-span").css("color", "#FFFFFF");
        $("#m8-txt #m8-span").css("color", "#797979");
        $("#m7-txt,#m7-span").unbind();  
        hover8();

        //$("#page7").attr("src","optionordersell?p="+parameters);
    } else if (num == 8) {
        var o = $('#page8')[0].contentWindow.location.href;

        document.getElementById("totop").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";

        var isChanged = document.getElementById('m8-changed').value == '1';
        if (isChanged) removeNotify(8);
        if (isCurrentPage(num) || !pageLoaded.page8 || (isChanged && isPageRefreshable(num))) {
            $("#page8").attr("src", "loading?page=optionorder");
            pageLoaded.page8 = true;
            ResizeIframeFromParent('page8');
        }
        showIframe(8);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#FFFFFF");
        $("#m7-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m8-txt #m8-span").css("color", "#FFFFFF");
        $("#m7-txt #m7-span").css("color", "#797979");
        $("#m8-txt,#m8-span").unbind();
        hover7();

    } else if (num == 9) {
        var o = $('#page9')[0].contentWindow.location.href;

        document.getElementById("totop").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";
        document.getElementById("publish").style.display = "none";
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";

        var isChanged = document.getElementById('m9-changed').value == '1';
        if (isChanged) removeNotify(9);
        if (isCurrentPage(num) || !pageLoaded.page9 || (isChanged && isPageRefreshable(num))) {
            $("#page9").attr("src", "loading?page=help");
            pageLoaded.page9 = true;
            ResizeIframeFromParent('page9');
        }
        showIframe(9);

        for (var i = 1; i < 10; i++) {
            if ($("#m" + i).attr("class") == "tdfooter0") {
                $("#m" + i).removeClass("tdfooter0");
                $("#m" + i).addClass("tdfooter");
                break;
            }
        }
        $("#m1-txt").css("color", "#000000");
        $("#m2-txt").css("color", "#000000");
        $("#m3-txt").css("color", "#000000");
        $("#m5-txt").css("color", "#000000");
        $("#m7-txt").css("color", "#000000");
        $("#m8-txt").css("color", "#000000");
        $("#m" + num).removeClass("tdfooter");
        $("#m" + num).addClass("tdfooter0");
        $("#m7-txt #m7-span,#m8-txt #m8-span").css("color", "#797979");
        hover7();
        hover8();
    }
}

function openBooking(productNumber, fromDetaiView){
    $("#page10").attr("src", "productdetailbooking?p="+productNumber).css("height", "1400px");
    isInBooking = true;
    if( fromDetaiView ){
        bookingFromProductDetailView = true;
    }
    ResizeIframeFromParent('page10');
    showIframe(10);
}

function cancelBooking(){
    isInBooking = false;
    $("#page10").attr("src", "about:blank").css("height", "0px");
    ResizeIframeFromParent('page2');
    showIframe(2);
    if ( bookingFromProductDetailView ) {
        detailViewBackFromBooking = true;
        if (!isVisible("anchor")) {
            showElement("anchor");
        }
    } else {
        if ( !isVisible("anchor") ) {
           hideElement("anchor");
        }
    }
}


/*function ht3(){
    var isChanged = document.getElementById('m3-changed').value == '1';
    if ( isCurrentPage(3) || document.getElementById('page-loaded-3').value == '0' || isChanged ) {
        $("#page3").attr("src", "loading?page=market").css("height", "1600px");
        document.getElementById('page-loaded-3').value = '1';
        ResizeIframeFromParent('page3');
        removeNotify(3);
    }
    showIframe(3);
    for(var i=1;i<7;i++){
        if($("#m"+i).attr("class")=="tdfooter0"){
            $("#m"+i).removeClass("tdfooter0");
            $("#m"+i).addClass("tdfooter");
        }

    }
    $("#m3-txt").css("color","#000000");
    $("#m5-txt").css("color","#000000");
    $("#m2-txt").css("color","#000000");
    $("#m3").removeClass("tdfooter");
    $("#m3").addClass("tdfooter0");
    $("#m3-txt").css("color","#FFFFFF");
    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = window.location.href+"#";
    }else{
        window.location = window.location.href;
    }
}*/
function hometoMarketFB2(num) {
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";

    var o = $('#page3')[0].contentWindow.location.href;

    var tmp1 = o.split("/");

    if (tmp1[3] == "loading" || tmp1[3] == "market") {
        document.getElementById("buy").style.display = "inline";
        document.getElementById("sell").style.display = "none";
    } else if (tmp1[3] == "loading" || tmp1[3] == "marketbuy") {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "inline";
    } else {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";
    }


    var isChanged = document.getElementById('m3-changed').value == '1';
    //if ( isChanged )
    removeNotify(3);
    $("#page3").attr("src", "marketbuy?p=fb").css("height", "1600px");
    pageLoaded.page3 = true;
    ResizeIframeFromParent('page3');


    showIframe(3);

    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m2-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m" + num).removeClass("tdfooter");
    $("#m" + num).addClass("tdfooter0");
    $("#m3-txt").css("color", "#FFFFFF");

}

function hometoMarketFB(num) {
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";

    var o = $('#page3')[0].contentWindow.location.href;

    var tmp1 = o.split("/");

    if (tmp1[3] == "loading" || tmp1[3] == "market") {
        document.getElementById("buy").style.display = "inline";
        document.getElementById("sell").style.display = "none";
    } else if (tmp1[3] == "loading" || tmp1[3] == "marketbuy") {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "inline";
    } else {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";
    }


    var isChanged = document.getElementById('m3-changed').value == '1';
    //if ( isChanged )
    removeNotify(3);
    $("#page3").attr("src", "market?p=fb").css("height", "1600px");
    pageLoaded.page3 = true;
    ResizeIframeFromParent('page3');


    showIframe(3);

    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m2-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m" + num).removeClass("tdfooter");
    $("#m" + num).addClass("tdfooter0");
    $("#m3-txt").css("color", "#FFFFFF");
}

function hometoMarket(num) {
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";

    var o = $('#page3')[0].contentWindow.location.href;

    var tmp1 = o.split("/");

    if (tmp1[3] == "loading" || tmp1[3] == "market") {
        document.getElementById("buy").style.display = "inline";
        document.getElementById("sell").style.display = "none";
    } else if (tmp1[3] == "loading" || tmp1[3] == "marketbuy") {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "inline";
    } else {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";
    }


    var isChanged = document.getElementById('m3-changed').value == '1';
    //if ( isChanged )
    removeNotify(3);
    $("#page3").attr("src", "loading?page=market").css("height", "1600px");
    pageLoaded.page3 = true;
    ResizeIframeFromParent('page3');


    showIframe(3);

    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m2-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m" + num).removeClass("tdfooter");
    $("#m" + num).addClass("tdfooter0");
    $("#m3-txt").css("color", "#FFFFFF");
}

function hometoMarketBuy(num) {
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";

    var o = $('#page3')[0].contentWindow.location.href;

    var tmp1 = o.split("/");

    if (tmp1[3] == "loading" || tmp1[3] == "market") {
        document.getElementById("buy").style.display = "inline";
        document.getElementById("sell").style.display = "none";
    } else if (tmp1[3] == "loading" || tmp1[3] == "marketbuy") {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "inline";
    } else {
        document.getElementById("buy").style.display = "none";
        document.getElementById("sell").style.display = "none";
    }


    var isChanged = document.getElementById('m3-changed').value == '1';
    //if ( isChanged )
    removeNotify(3);
    $("#page3").attr("src", "loading?page=marketbuy").css("height", "1600px");
    pageLoaded.page3 = true;
    ResizeIframeFromParent('page3');

    showIframe(3);

    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m2-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m" + num).removeClass("tdfooter");
    $("#m" + num).addClass("tdfooter0");
    $("#m3-txt").css("color", "#FFFFFF");
}

function hometoProduct(num) {
    var o = $('#page2')[0].contentWindow.location.href;

    if (o.indexOf("productdetail") != -1 && o.indexOf("productdetailbooking") == -1) {
        document.getElementById("totop").style.display = "inline";
        document.getElementById("anchor").style.display = "inline";
        document.getElementById("anchor1").style.display = "inline";
    } else {
        document.getElementById("totop").style.display = "none";
        document.getElementById("anchor").style.display = "none";
        document.getElementById("anchor1").style.display = "none";

    }

    var tmp1 = o.split("/");
    if (getCookie("logorole") == 1) {
        if (tmp1[3] == "loading" || tmp1[3] == "productlist") {
            document.getElementById("publish").style.display = "inline";
        } else {
            document.getElementById("publish").style.display = "none";
        }
    }
    document.getElementById("buy").style.display = "none";
    document.getElementById("sell").style.display = "none";

    var isChanged = document.getElementById('m2-changed').value == '1';
    removeNotify(2);
    $("#page2").attr("src", "productlist").css("height", "1400px");
    pageLoaded.page2 = true;
    ResizeIframeFromParent('page2');

    showIframe(2);
    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m" + num).removeClass("tdfooter");
    $("#m" + num).addClass("tdfooter0");
    $("#m2-txt").css("color", "#FFFFFF");
}

function htg(str1) {
    //跳转到个人中心
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("buy").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";
    document.getElementById("sell").style.display = "none";
    $("#page4").attr("src", "loading?page=" + str1).css("height", "500px");
    ResizeIframeFromParent('page4');
    pageLoaded.page4 = true;

    showIframe(4);
    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m2-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m4").removeClass("tdfooter");
    $("#m4").addClass("tdfooter0");
    var url1 = window.location.href;
    if (url1.indexOf("#") == -1) {
        window.location = window.location.href + "#";
    } else {
        window.location = window.location.href;
    }
}

function htg1(str1) {
    //跳转到购买订单
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("buy").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";
    document.getElementById("sell").style.display = "none";

    $("#page8").attr("src", "loading?page=" + str1).css("height", "500px");
    ResizeIframeFromParent('page4');
    pageLoaded.page4 = true;

    showIframe(8);
    for (var i = 1; i < 10; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m2-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m8").removeClass("tdfooter");
    $("#m8").addClass("tdfooter0");
    var url1 = window.location.href;
    if (url1.indexOf("#") == -1) {
        window.location = window.location.href + "#";
    } else {
        window.location = window.location.href;
    }
}

function htp(str1) {
    //跳转到邮轮集市
    document.getElementById("totop").style.display = "none";
    document.getElementById("publish").style.display = "none";
    document.getElementById("buy").style.display = "none";
    document.getElementById("anchor").style.display = "none";
    document.getElementById("anchor1").style.display = "none";
    document.getElementById("sell").style.display = "none";

    $("#page2").attr("src", "productdetail?p=" + str1);
    bookingFromProductDetailView = true;
    ResizeIframeFromParent('page2');

    showIframe(2);
    for (var i = 1; i < 7; i++) {
        if ($("#m" + i).attr("class") == "tdfooter0") {
            $("#m" + i).removeClass("tdfooter0");
            $("#m" + i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color", "#000000");
    $("#m3-txt").css("color", "#000000");
    $("#m5-txt").css("color", "#000000");
    $("#m2").removeClass("tdfooter");
    $("#m2").addClass("tdfooter0");
    $("#m2-txt").css("color", "#FFFFFF");
    var url1 = window.location.href;
    if (url1.indexOf("#") == -1) {
        window.location = window.location.href + "#";
    } else {
        window.location = window.location.href;
    }
}

function ht31(){
    $("#page3").attr("src", "loading?page=marketbuy").css("height", "1600px");
    pageLoaded.page3 = true;
    ResizeIframeFromParent('page3');
    removeNotify(3);
    //}
    showIframe(3);
    for(var i=1;i<7;i++){
        if($("#m"+i).attr("class")=="tdfooter0"){
            $("#m"+i).removeClass("tdfooter0");
            $("#m"+i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color","#000000");
    $("#m2-txt").css("color","#000000");
    $("#m3-txt").css("color","#000000");
    $("#m5-txt").css("color","#000000");
    $("#m3").removeClass("tdfooter");
    $("#m3").addClass("tdfooter0");
    $("#m3-txt").css("color","#FFFFFF");
    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = window.location.href+"#";
    }else{
        window.location = window.location.href;
    }
}

function gt3(){
    for(var i=1;i<7;i++){
        if($("#m"+i).attr("class")=="tdfooter0"){
            $("#m"+i).removeClass("tdfooter0");
            $("#m"+i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color","#000000");
    $("#m2-txt").css("color","#000000");
    $("#m5-txt").css("color","#000000");
    $("#m3").removeClass("tdfooter");
    $("#m3").addClass("tdfooter0");
    $("#m3-txt").css("color","#FFFFFF");
    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = window.location.href+"#";
    }else{
        window.location = window.location.href;
    }
}

function gt31(){
    for(var i=1;i<7;i++){
        if($("#m"+i).attr("class")=="tdfooter0"){
            $("#m"+i).removeClass("tdfooter0");
            $("#m"+i).addClass("tdfooter");
        }

    }
    $("#m1-txt").css("color","#000000");
    $("#m2-txt").css("color","#000000");
    $("#m5-txt").css("color","#000000");
    $("#m3").removeClass("tdfooter");
    $("#m3").addClass("tdfooter0");
    $("#m3-txt").css("color","#FFFFFF");
    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = window.location.href+"#";
    }else{
        window.location = window.location.href;
    }
}

function htotop(){
    var url1 = window.location.href;
    if(url1.indexOf("#")==-1){
        window.location = window.location.href+"#";
    }else{
        window.location = window.location.href;
    }
}
/* show the specified iframe and hides all other iframe */
function showIframe(num){
    var p, d;
    for( var i = 1; i < 11; i++ ) {// 9 pages
        p = document.getElementById('page'+i);
        d = document.getElementById('div-page'+i);
        if ( i == num ){
            currentPage = i;
            if ( p.style.display != 'inline' ) p.style.display = 'inline';
            if ( d.style.display != 'inline' ) d.style.display = 'inline';
        } else { // hide page
            if ( p.style.display != 'none' ) p.style.display = 'none';
            if ( p.style.display != 'none' ) d.style.display = 'none';
        }
    }
}

function notifyChanges(msg, pageNum){
    notifyBlur();
    if ( currentPage == pageNum ) return;
    var m = document.getElementById('m'+pageNum+'-notify');
    if (m.getAttribute('title')) return;
    m.setAttribute('class', 'circle');
    m.setAttribute('title', msg);
    var c = document.getElementById('m'+pageNum+'-changed');
    if ( c ) {
        c.value = '1';
    }
}
function removeNotify(pageNum){
    var m = document.getElementById('m'+pageNum+'-notify');
    if ( !m ) return;
    if (m.getAttribute('class')) m.removeAttribute('class');
    if (m.getAttribute('title')) m.removeAttribute('title');
    var c = document.getElementById('m'+pageNum+'-changed');
    if ( c ) {
        c.value = '0';
    }
}
/* notification in web title if page is not in focus */
function notifyBlur(){
    var hasFocus = $('#focus').val() == '1';
    for( i = 1; !hasFocus && i < 7; i++) {
        hasFocus = $('#focus-page'+i).val() == '1';
    }
    if ( !hasFocus ) {//page not in focus
        var count = parseInt($('#new-count').val())+1;
        document.title = document.title.substring(0, 3) + '('+count+')';
        $('#new-count').val(count);
    }
}
/*page in focus -> reset web title */
$(window).focus(function() {
    if ( parseInt($('#new-count').val()) > 0 ) {
        document.title = document.title.substring(0, 3);
        $('#new-count').val('0');
    }
    $('#focus').val('1');
});
/*main page has lost focus*/
$(window).blur(function() {
    $('#focus').val('0');
});

/*change product detail tabs style*/
function ctab(i){
    for(var j=1;j<7;j++){
        var o = ($("#n"+j).attr("class"));
        $("#n"+j).removeClass(o);
        if(j==i){
            $("#n"+j).addClass("tab1");
        }else{
            $("#n"+j).addClass("tab2");
        }
    }
}

function getScrollTop() {
    return $(window).scrollTop().valueOf();
}

// getElementsByClassName polyfill
(function(){
    if (document.getElementsByClassName)
        return;
    if (!window.Element)
        throw "Can't polyfill getElementsByClassName";

    function gEBCN(className) {
        var all = this.getElementsByTagName("*"),
            rex = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"),
            out = [],
            element, i;
        for (i = all.length; i--;) {
            element = all[i];
            if (element.className.match(rex))
                out.unshift(element);
        }
        return out;
    }

    var el = window.Element.prototype;
    var doc = document.constructor.prototype;
    el.getElementsByClassName = doc.getElementsByClassName = gEBCN;
}());
