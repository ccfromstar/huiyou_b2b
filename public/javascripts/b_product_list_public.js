/**
 *
 * Created by teng on 01.12.2014.
 */
var cruiseAreaPortMap;
var cities;
var cruiseCompanies;
var ships;
var offset = 0;
var PAGE_MAX_ITEMS = 6;
var total = 0;// 产品总数

//using this to solve the IE10 issue (IE10 does not send ajax request again)
function _ieWorkaround(){
    return "?time='"+new Date().getTime() + "'";
}

function loadProductFilter(){
    $.ajax({
        url: "getCityFilter" + _ieWorkaround(),
        type:'get',
        success: function(res) {
            createDepartureFilter(res);
        },
        error: function(err) {
            console.log(err);
        }
    });
    $.ajax({
        url: "getCruiseCompanyShipFilter" + _ieWorkaround(),
        type:'get',
        success: function(res) {
            createCompanyShipFilter(res);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function addPorts(excludes){
    var area = $("#area").val();
    for ( var i in cruiseAreaPortMap ){
        if ( excludes && _citiesContains(cruiseAreaPortMap[i].port) ) continue;
        if (!area || area == '*' || cruiseAreaPortMap[i].area == area ) {
            var item = '<option value="' + cruiseAreaPortMap[i].port + '">' + cruiseAreaPortMap[i].port + '</option>';
            $("#departure").append(item);
        }
    }
}
function changeDeparture() {
    document.getElementById('departure').innerHTML = '';
    var productType = $('#product-type').val();
    if ( productType == 1 ) {
        $("#departure").append('<option value="*">所有出发港口</option>');
        addPorts();
    } else {
        createDepartureFilter({cities: cities, port_map: cruiseAreaPortMap});
    }
}

function createDepartureFilter(result){
    cruiseAreaPortMap = result.port_map;
    cities = result.cities;
    $("#departure").append('<option value="*">所有出发城市</option>');
    for ( var i in cities ) {
        $("#departure").append('<option value="'+cities[i].name+'">'+ cities[i].name +'</option>');
    }
    var area = $("#area").val();
    for ( var i in cruiseAreaPortMap ){
        if ( !_citiesContains(cruiseAreaPortMap[i].port) && (!area || area == '*' || cruiseAreaPortMap[i].area == area )) {
            $("#departure").append('<option value="' + cruiseAreaPortMap[i].port + '">' + cruiseAreaPortMap[i].port + '</option>');
        }
    }
}

function createCompanyShipFilter(result){
    cruiseCompanies = result.companies;
    ships = result.ships;
    for( var i in cruiseCompanies ) {
        $("#cruise-company").append('<option value="'+cruiseCompanies[i].txtCompanyNo+'">'+cruiseCompanies[i].txtCompanyName+'</option>');
    }
    for( var i in ships ){
        $("#ship-id").append('<option value="'+ships[i].id+'">'+ships[i].txtShipName+'</option>');
    }
}

function changeShipFilter(){
    var companyNo = $('#cruise-company').val();
    document.getElementById('ship-id').innerHTML = '';
    $("#ship-id").append('<option value="-">所有邮轮</option>');
    for ( var i in ships ){
        if ( ships[i].txtCompanyNo == companyNo ){
            $("#ship-id").append('<option value="'+ships[i].id+'">'+ships[i].txtShipName+'</option>');
        }
    }
}

function _citiesContains(port) {
    for( var i in cities ) {
        if(cities[i].name == port) return true;
    }
    return false;
}

function createProductList(result) {
    if ( result.error ) {
        jAlert('查询产品发生系统错误:' + error.message);
        return false;
    }
    document.getElementById('loading').style.display = "none";
    document.getElementById('price-comment').style.display = "block";
    total = result.total;
    if( total > 0 ) {
        createProductListView(result.product, result.inf, result.pp, result.ts);
    }
    createPagination();
};

function resetPage(){
    offset = 0;
}
function fetchProducts(){
    document.getElementById('product-list').innerHTML = '';
    document.getElementById('product-paging').innerHTML = '';
    window.parent.htotop();
    document.getElementById('price-comment').style.display = "none";
    document.getElementById('loading').style.display = "block";
    var type = $('#product-type').val();
    var order = $('#pse2').val();
    var dateStart = $('#date-start').val();
    var area = $('#area').val();
    var departure = $('#departure').val();
    var ccompany = $('#cruise-company').val();
    var shipId = $('#ship-id').val();
    var params = {
        offset: offset,
        product_type : (type?type:'*'),
        pse2 : order,
        datstart : (dateStart?dateStart:'*'),
        cf: (area?area:'*'),
        mdd: (departure?departure:'*'),
        cruise_company : (ccompany?ccompany:'*'),
        ship_id : (shipId?shipId:'*'),
        public : true
    };
    $.ajax({
        url: "fetchProductsData" + _ieWorkaround(),
        type:'get',
        data: params,
        dataType: 'json',
        success: function(res) {
            createProductList(res);
        },
        error: function(err) {
            console.log(err);
        }
    });
}
function onPageValueChanged(){
    var page =  parseInt(document.getElementById("numNo1").value);
    if ( page > 0 ) {
        var newOffset = (page-1)*PAGE_MAX_ITEMS;
        if ( newOffset > total ){
            return false;
        }
        offset = newOffset;
        fetchProducts();
    }
}

function nextPage(){
    if(offset+PAGE_MAX_ITEMS > total){
        jAlert("没有下一页，已经是最后一页！");
        return false;
    }
    offset += PAGE_MAX_ITEMS;
    fetchProducts();
}

function previoursPage(){
    if(offset == 0){
        jAlert("没有上一页，已经是第一页！");
        return false;
    }
    offset = offset-PAGE_MAX_ITEMS >= 0 ? offset-PAGE_MAX_ITEMS : 0;
    fetchProducts();
}

function createPagination(){
    var paging = $('#product-paging');
    paging.append('<table style="width: 100%"><tr><td style="text-align: center;font-size: 12px;">');

    if(offset != 0){
        paging.append('<img src="images/previours_page.png" style="cursor: pointer;margin-bottom:-5px" onclick="previoursPage();" title="上一页"/>');
    }
    paging.append('&nbsp;第&nbsp;<input style="width: 25px;text-align: center" type="text" id="numNo1" value="'+(offset/PAGE_MAX_ITEMS+1)+'" onchange="onPageValueChanged();" />&nbsp;页&nbsp;共'+Math.ceil(total/6)+'页&nbsp;'+total+'条记录');

    if(offset+PAGE_MAX_ITEMS < total) {
        paging.append('<img src="images/next_page.png" style="margin-bottom:-5px;padding-left: 5px;cursor: pointer" onclick="nextPage();" title="下一页"/>');
    }
    paging.append('</td></tr></table>');
    parent.ResizeIframeFromParent('page1');
}

function createProductListView(product, inf, pp, ts) {
    var statusName;
    var html;
    for (var i in product) {
        if (product[i].status_id == 3 || product[i].status_id == 4) {
            if (product[i].status_id == 3) {
                statusName = '<span style="color:#6296C1">' + product[i].statusname + '</span>';
            } else {
                statusName = '<span style="color:#ff0000">' + product[i].statusname + '</span>';
            }
            var tp = "";
            if (product[i].type_id == 1) {
                tp = "单船票"
            } else {
                tp = "团队游"
            }
            // show new product icon
            var dat1c = product[i].created_at;//.Format("yyyy-MM-dd");
            dat1c = (dat1c?dat1c.substring(0, 10):'');
            var myDate = new Date();
            var m = myDate.getMonth() + 1;
            m = m + "";
            if (m.length == 1) {
                m = "0" + m;
            }
            var d = myDate.getDate();
            d = d + "";
            if (d.length == 1) {
                d = "0" + d;
            }
            var d2 = myDate.getFullYear() + "-" + m + "-" + d;
            var newIcon = (dat1c == d2 ? '<img src="/images/45.gif" />' : '');

            var startDate = product[i].start_date;//.Format("yyyy-MM-dd");
            startDate = (startDate?startDate.substring(0, 10):'');
            var dp = 999999;
            for (var j in pp) {
                if (pp[j].product_id == product[i].id) {
                    if (pp[j].price < dp && pp[j].price != 0) {
                        dp = pp[j].price;
                    }
                }
            }

            var h1 = "";
            var hx = "";
            for (j in ts) {
                if (ts[j].product_id == product[i].id && ts[j].day_number == 1) {
                    h1 = ts[j].location;
                }
                if (ts[j].product_id == product[i].id) {
                    if (ts[j].location != "航海日") {
                        hx = hx == "" ? ts[j].location : hx + "-" + ts[j].location;
                    }

                }
            }

            var dp1 = 999999;
            var dp2 = 0;
            var dp3 = 999999;
            var dp4 = 0;
            var dp5 = 999999;
            var dp6 = 0;
            var dp7 = 999999;
            var dp8 = 0;
            for (var j in pp) {
                if (pp[j].product_id == product[i].id && pp[j].cabin_type_id == 1) {
                    if (pp[j].price < dp1 && pp[j].price != 0) {
                        dp1 = pp[j].price;
                        dp2 = pp[j].amount + "间";
                    }
                }
                if (pp[j].product_id == product[i].id && pp[j].cabin_type_id == 2) {
                    if (pp[j].price < dp3 && pp[j].price != 0) {
                        dp3 = pp[j].price;
                        dp4 = pp[j].amount + "间";
                    }
                }
                if (pp[j].product_id == product[i].id && pp[j].cabin_type_id == 3) {
                    if (pp[j].price < dp5 && pp[j].price != 0) {
                        dp5 = pp[j].price;
                        dp6 = pp[j].amount + "间";
                    }
                }
                if (pp[j].product_id == product[i].id && pp[j].cabin_type_id == 4) {
                    if (pp[j].price < dp7 && pp[j].price != 0) {
                        dp7 = pp[j].price;
                        dp8 = pp[j].amount + "间";
                    }
                }
            }
            if (dp1 == 999999) {
                dp1 = "-";
                dp2 = "-";
            } else {
                dp1 = "￥" + dp1;
            }

            if (dp3 == 999999) {
                dp3 = "-";
                dp4 = "-";
            } else {
                dp3 = "￥" + dp3;
            }

            if (dp5 == 999999) {
                dp5 = "-";
                dp6 = "-";
            } else {
                dp5 = "￥" + dp5;
            }

            if (dp7 == 999999) {
                dp7 = "-";
                dp8 = "-";
            } else {
                dp7 = "￥" + dp7;
            }

            var adv = product[i].productfeature?product[i].productfeature:"";

            html =
                '<table id="cxtableid' + i + '" class="pclass" onmouseover="$(this).css(\'background-color\',\'#F2F0F4\');" onmouseout="$(this).css(\'background-color\',\'#FFFFFF\');" style="margin-top:10px;width:960px;BORDER-COLLAPSE: collapse ;border-color: #ABBBBB;border:2px solid #ABBBBB;"  cellspacing="0" cellpadding="0" >' +
                '<tr><td rowspan="5" style="text-align: center;width: 100px;line-height: 20px;"><img src="images/' + product[i].rtfCompanyLogo + '" style="width: 80px;padding-top: 10px;" /><br/><br/>' +
                product[i].product_number + '<br/>' + product[i].txtCruiseArea + '<br/>' + statusName + '</td>' +
                '<td  style="text-align: center">' + tp + '</td>' +
                '<td colspan="6" style="font-size: 16px;font-weight: bold;color:#0468B9">&nbsp;&nbsp;&nbsp;&nbsp;' + product[i].title + '&nbsp;&nbsp;&nbsp;' + newIcon + '</td>' +
                '<td colspan="3">&nbsp;&nbsp;&nbsp;&nbsp;供应商：' + product[i].short_name + '</td>' +
                '<td rowspan="5" style="width: 100px;text-align: center;line-height: 20px;"><span style="font-size: 12px;color: #000000;">最低市场价</span><br/><span style="font-size: 16px;color: #FA8723;font-weight: bold">￥' + dp + '</span><br/><br/><br/>';
            html += '<img onclick="window.open(\'routedownloadpublic?p=' + product[i].product_number + '\');" style="cursor:pointer;margin-left: 0px;" src="/images/detail.png" />' ;
            
            html += '<br/>预订请登陆<br/><a href="#" onclick="window.parent.location=\'/userregist\'">注册</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick="window.parent.location=\'/\'">登陆</a></td></tr>' +
            '<tr><td colspan="8" style="padding-left:15px;padding-right:12px;">' + ((hx.length > 100) ? (hx.substring(0, 99) + "...") : hx) + '</td><td colspan="2"  style="text-align: center">出发日期：' + startDate + '</td></tr>' +
            '<tr style="text-align: center"><td style="width: 76px;">内舱</td><td style="width: 76px;">海景</td><td style="width: 76px;">阳台</td><td style="width: 76px;">套房</td><td style="width: 76px;">港务费</td><td style="width: 76px;">岸上游</td><td style="width: 76px;">邮轮小费</td><td style="width: 76px;">领队费</td><td style="width: 76px;">签证费</td><td style="width: 76px;">保险费</td></tr>' +
            '<tr style="text-align: center"><td style="font-weight: bold">' + dp1 + '</td><td style="font-weight: bold">' + dp3 + '</td><td style="font-weight: bold">' + dp5 + '</td><td style="font-weight: bold">' + dp7 + '</td>';

            for (j in inf) {
                if (inf[j].product_id == product[i].id) {
                    var b1 = "不含";
                    var b2 = "不含";
                    var b3 = "不含";
                    var b4 = "不含";
                    var b5 = "不含";
                    var b6 = "不含";
                    if (inf[j].incl_port_tax == 1) {
                        b1 = "含";
                    }
                    if (inf[j].incl_excursion == 1) {
                        b2 = "含";
                    }
                    if (inf[j].incl_tip == 1) {
                        b3 = "含";
                    }
                    if (inf[j].incl_tourist_guide == 1) {
                        b4 = "含";
                    }
                    if (inf[j].incl_visa_fee == 1) {
                        b5 = "含";
                    }
                    if (inf[j].incl_travel_insurance == 1) {
                        b6 = "含";
                    }
                    if (inf[j].port_tax_fee == 0) {
                        c1 = "";
                    } else {
                        c1 = "￥" + inf[j].port_tax_fee;
                    }
                    if (inf[j].excursion_fee == 0) {
                        c2 = "";
                    } else {
                        c2 = "￥" + inf[j].excursion_fee;
                    }
                    if (inf[j].tip == 0) {
                        c3 = "";
                    } else {
                        c3 = "￥" + inf[j].tip;
                    }
                    if (inf[j].tourist_guide_fee == 0) {
                        c4 = "";
                    } else {
                        c4 = "￥" + inf[j].tourist_guide_fee;
                    }
                    if (inf[j].visa_fee == 0) {
                        c5 = "";
                    } else {
                        c5 = "￥" + inf[j].visa_fee;
                    }
                    if (inf[j].incl_travel_insurance_comment == 0) {
                        c6 = "";
                    } else {
                        c6 = "￥" + inf[j].incl_travel_insurance_comment;
                    }

                    html +=
                        '<td>' + c1 + b1 + '</td><td>' + c2 + b2 + '</td><td>' + c3 + b3 + '</td><td>' + c4 + b4 + '</td><td>' + c5 + b5 + '</td><td>' + b6 + '</td>';
                }
            }
            html +=
                '</tr><tr><td colspan="10" style="width: 760px;padding: 10px;line-height: 20px;height: 40px;">'+adv+'</td></tr>' +
                '</table>';

            $('#product-list').append(html);

        }
    }
}

$(function(){
    loadProductFilter();
    fetchProducts();
});

