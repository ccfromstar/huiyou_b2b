var mysql = require('./db_mysql');
var nodeUtil = require('util');
var utils = require('../routes/utils.js')

var DEFAULT_LIMIT = 6;

function Product(product) {
    this.product_number = product.product_number;
    this.supplier_id = product.supplier_id;
    this.owner_id = product.owner_id;
    this.type_id = product.type_id;
    this.ship_id = product.ship_id;
    this.start_date = product.start_date;
    this.days = product.days;
    this.china_started = product.china_started;
    this.cruise_area_id = product.cruise_area_id;
    this.title = product.title;
    this.contact_person = product.contact_person;
    this.contact_mobile_phone = product.contact_mobile_phone;
    this.contact_email = product.contact_email;
    this.service_by_huiyou = product.service_by_huiyou;
    this.customized_ship_description = product.customized_ship_description;
    this.schedule_comment = product.schedule_comment;
    this.advertising = product.advertising;
    this.advertising_img_url = product.advertising_img_url;
    this.visa_application_until = product.visa_application_until;
    this.visa_comment = product.visa_comment;
    this.booking_note = product.booking_note;
    this.created_by = product.created_by;
    this.pid = product.pid;
    this.cancellation_policy = product.cancellation_policy;
    this.payment_comment = product.payment_comment;
    this.comment = product.comment;
    this.numStart = product.numStart;
    this.limit = product.limit;
    this.datstart = product.datstart;
    this.cf = product.cf;
    this.mdd = product.mdd;
    this.departurePort = product.departurePort;
    this.txtCuriseCompany = product.txtCuriseCompany;
    this.ship_id = product.ship_id;
    this.pse2 = product.pse2;
    this.nights = product.nights;
    this.cabin_comment = product.cabin_comment;
    this.excursion_txt = product.excursion_txt;
    this.approve_id = product.approve_id;
    this.productfeature = product.productfeature;
    this.remark = product.remark;
};
module.exports = Product;

function isEmptyObject( obj ) {
    for ( var i in obj ) {
        return false;
    }
    return true;
}

Product.prototype.save = function get(callback) {
    var product = {
        product_number: this.product_number,
        supplier_id: this.supplier_id,
        owner_id :this.owner_id,
        type_id :this.type_id,
        ship_id :this.ship_id,
        start_date :this.start_date,
        days :this.days,
        china_started :this.china_started,
        cruise_area_id :this.cruise_area_id,
        title :this.title,
        contact_person :this.contact_person,
        contact_mobile_phone :this.contact_mobile_phone,
        contact_email :this.contact_email,
        service_by_huiyou :this.service_by_huiyou,
        customized_ship_description :this.customized_ship_description,
        schedule_comment :this.schedule_comment,
        advertising :this.advertising,
        advertising_img_url :this.advertising_img_url,
        visa_application_until :this.visa_application_until,
        visa_comment :this.visa_comment,
        booking_note :this.booking_note,
        cancellation_policy :this.cancellation_policy,
        payment_comment :this.payment_comment,
        comment :this.comment,
        created_by :this.created_by,
        nights:this.nights,
        cabin_comment:this.cabin_comment,
        excursion_txt:this.excursion_txt,
        productfeature:this.productfeature,
        remark:this.remark
    };
    //TODO
    //先判断之前有没有发布过该产品编号的产品
    var SQL1 = "select * from product where status_id !=5 and product_number = '"+product.product_number+"'";
    nodeUtil.log("查找当前产品编号的产品是否存在"+SQL1);
    mysql.query(SQL1,function (err, rows1) {
        if (err){
            nodeUtil.error(err + ": " + SQL1);
            return callback(new Error(err));
        }
        if (!(isEmptyObject(rows1))) {
            //存在
            //先得到产品id
            var id1 = rows1[0].id;
            //新版2014-9-30增加已删除状态
            var SQL8 = "update product set status_id = 5 where id = "+id1;
            nodeUtil.log(SQL8);
            mysql.query(SQL8,function (err, res8) {
            if (err){console.log(err);return callback("error");}
                //保存
                if(product.advertising_img_url == ""){
                 var insertSQL  = "insert into product (product_number,supplier_id,owner_id,type_id,status_id,ship_id,start_date,days,china_started,cruise_area_id,title,contact_person,contact_mobile_phone,contact_email,service_by_huiyou,customized_ship_description,description,schedule_comment,advertising,advertising_img_url,currency_code,visa_application_until,visa_comment,booking_note,created_by,created_at,published_at,cancellation_policy,payment_comment,comment,nights,cabin_comment,excursion_txt,productfeature,remark) values ('"+product.product_number+"',"+product.supplier_id+","+product.owner_id+","+product.type_id+",1,"+product.ship_id+",'"+product.start_date+"',"+product.days+","+product.china_started+","+product.cruise_area_id+",'"+product.title+"','"+product.contact_person+"','"+product.contact_mobile_phone+"','"+product.contact_email+"',"+product.service_by_huiyou+",'"+product.customized_ship_description+"','','"+product.schedule_comment+"','"+product.advertising+"','"+rows1[0].advertising_img_url+"','RMB','"+product.visa_application_until+"','"+product.visa_comment+"','"+product.booking_note+"',"+product.created_by+",now(),now(),'"+product.cancellation_policy+"','"+product.payment_comment+"','"+product.comment+"','"+product.nights+"','"+product.cabin_comment+"','"+product.excursion_txt+"','"+product.productfeature+"','"+product.remark+"')";
                
                }else{
                 var insertSQL  = "insert into product (product_number,supplier_id,owner_id,type_id,status_id,ship_id,start_date,days,china_started,cruise_area_id,title,contact_person,contact_mobile_phone,contact_email,service_by_huiyou,customized_ship_description,description,schedule_comment,advertising,advertising_img_url,currency_code,visa_application_until,visa_comment,booking_note,created_by,created_at,published_at,cancellation_policy,payment_comment,comment,nights,cabin_comment,excursion_txt,productfeature,remark) values ('"+product.product_number+"',"+product.supplier_id+","+product.owner_id+","+product.type_id+",1,"+product.ship_id+",'"+product.start_date+"',"+product.days+","+product.china_started+","+product.cruise_area_id+",'"+product.title+"','"+product.contact_person+"','"+product.contact_mobile_phone+"','"+product.contact_email+"',"+product.service_by_huiyou+",'"+product.customized_ship_description+"','','"+product.schedule_comment+"','"+product.advertising+"','"+product.advertising_img_url+"','RMB','"+product.visa_application_until+"','"+product.visa_comment+"','"+product.booking_note+"',"+product.created_by+",now(),now(),'"+product.cancellation_policy+"','"+product.payment_comment+"','"+product.comment+"','"+product.nights+"','"+product.cabin_comment+"','"+product.excursion_txt+"','"+product.productfeature+"','"+product.remark+"')";
                   
                }
                nodeUtil.log(insertSQL);
                mysql.query(insertSQL,function (err, res) {
                    if (err){
                            nodeUtil.error(err + ": " + insertSQL);
                            return callback(new Error(err));
                    }
                    
                    
                    //需要将原产品下的相关文件的id改成新的产品的id
                    var changeSQL = "update product_files set product_id="+res.insertId+" where product_id="+id1;
                    mysql.query(changeSQL,function (err, res1) {
                        if (err){
                            nodeUtil.error(err + ": " + changeSQL);
                            return callback(new Error(err));
                        }
                    });
                    return callback(res);
                });
            });
            /*
            //根据id先删除included_fee
            var SQL2 = "delete from included_fee where product_id = "+id1;
            console.log(SQL2);
            mysql.query(SQL2,function (err, res2) {
                if (err){console.log(err);return callback("error");}
                //再删除product_files
                var SQL3 = "delete from product_files where product_id = "+id1;
                console.log(SQL3);
                mysql.query(SQL3,function (err, res3) {
                    if (err){console.log(err);return callback("error");}
                    //再删除travel_schedule
                    var SQL4 = "delete from travel_schedule where product_id = "+id1;
                    console.log(SQL4);
                    mysql.query(SQL4,function (err, res4) {
                        if (err){console.log(err);return callback("error");}
                        //先查找对应的booking表得到booking的id再删除booking_position
                        var SQL0 = "select * from booking where product_id = "+id1;
                        mysql.query(SQL0,function (err, rows2) {
                            if (err) {
                                console.log(err);
                                return callback("error");
                            }
                            var bid = 0;
                            if (!(isEmptyObject(rows2))) {
                                bid = rows2[0].id;
                            }
                            var SQL5 = "delete from booking_position where booking_id = "+bid;
                            console.log(SQL5);
                            mysql.query(SQL5,function (err, res5) {
                                if (err){console.log(err);return callback("error");}
                                //再删除booking
                                var SQL6 = "delete from booking where product_id = "+id1;
                                console.log(SQL6);
                                mysql.query(SQL6,function (err, res6) {
                                    if (err){console.log(err);return callback("error");}
                                    //再删除product_position
                                    var SQL7 = "delete from product_position where product_id = "+id1;
                                    console.log(SQL7);
                                    mysql.query(SQL7,function (err, res7) {
                                        if (err){console.log(err);return callback("error");}
                                        //最后删除project
                                        var SQL8 = "delete from product where id = "+id1;
                                        console.log(SQL8);
                                        mysql.query(SQL8,function (err, res8) {
                                            if (err){console.log(err);return callback("error");}
                                            //
                                            //保存
                                            var insertSQL  = "insert into product (product_number,supplier_id,owner_id,type_id,status_id,ship_id,start_date,days,china_started,cruise_area_id,title,contact_person,contact_mobile_phone,contact_email,service_by_huiyou,customized_ship_description,description,schedule_comment,advertising,advertising_img_url,currency_code,visa_application_until,visa_comment,booking_note,created_by,created_at,published_at,cancellation_policy,payment_comment,comment,nights,cabin_comment,excursion_txt) values ('"+product.product_number+"',"+product.supplier_id+","+product.owner_id+","+product.type_id+",1,"+product.ship_id+",'"+product.start_date+"',"+product.days+","+product.china_started+","+product.cruise_area_id+",'"+product.title+"','"+product.contact_person+"','"+product.contact_mobile_phone+"','"+product.contact_email+"',"+product.service_by_huiyou+",'"+product.customized_ship_description+"','','"+product.schedule_comment+"','"+product.advertising+"','"+product.advertising_img_url+"','RMB','"+product.visa_application_until+"','"+product.visa_comment+"','"+product.booking_note+"',"+product.created_by+",now(),now(),'"+product.cancellation_policy+"','"+product.payment_comment+"','"+product.comment+"','"+product.nights+"','"+product.cabin_comment+"','"+product.excursion_txt+"')";
                                            console.log(insertSQL);
                                            mysql.query(insertSQL,function (err, res) {
                                                if (err){
                                                    console.log(err);
                                                    return callback("error");
                                                }
                                                return callback(res);

                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });     
            });*/
        }else{
            //不存在，第一次新建，直接保存
            var insertSQL  = "insert into product (product_number,supplier_id,owner_id,type_id,status_id,ship_id,start_date,days,china_started,cruise_area_id,title,contact_person,contact_mobile_phone,contact_email,service_by_huiyou,customized_ship_description,description,schedule_comment,advertising,advertising_img_url,currency_code,visa_application_until,visa_comment,booking_note,created_by,created_at,published_at,cancellation_policy,payment_comment,comment,nights,cabin_comment,excursion_txt,productfeature,remark) values ('"+product.product_number+"',"+product.supplier_id+","+product.owner_id+","+product.type_id+",1,"+product.ship_id+",'"+product.start_date+"',"+product.days+","+product.china_started+","+product.cruise_area_id+",'"+product.title+"','"+product.contact_person+"','"+product.contact_mobile_phone+"','"+product.contact_email+"',"+product.service_by_huiyou+",'"+product.customized_ship_description+"','','"+product.schedule_comment+"','"+product.advertising+"','"+product.advertising_img_url+"','RMB','"+product.visa_application_until+"','"+product.visa_comment+"','"+product.booking_note+"',"+product.created_by+",now(),now(),'"+product.cancellation_policy+"','"+product.payment_comment+"','"+product.comment+"','"+product.nights+"','"+product.cabin_comment+"','"+product.excursion_txt+"','"+product.productfeature+"','"+product.remark+"')";
            nodeUtil.log(insertSQL);
            mysql.query(insertSQL,function (err, res) {
                if (err){
                    nodeUtil.error(err + ": " + insertSQL);
                    return callback(new Error(err));
                }
                return callback(res);

            });
        }
    });
}

Product.prototype.getbypnum = function get(callback) {
    var product = {
        pid :this.pid
    };
    var params = {
        ownerId : null,
        statusIdsInclude : null,
        statusIdsExclude : [5],
        productId : null,
        productNumber : product.pid,
        startAfterToday : false,
        startDate : null,
        cruiseAreaId : null,
        cruiseCompanyNo : null,
        shipId : null,
        travelScheduleLocation : null,
        productOrder :  "",
        orderByRetailPrice : true,
        offset : null,
        limit : null
    };
    var selectSQL  = _productList(params);
    //var selectSQL  = _productList(null, null, [5], null, product.pid, false, null, null, null, null, null, "", true, null, null);
    //"select * from product_list where status_id != 5 and product_number = '"+product.pid+"'";
    nodeUtil.log("product.js: getbypnum " + product.pid);
    console.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + selectSQL);
            return callback(new Error(err))
        }else{
            
            return callback(rows);
        }
    });
}

//我原来的方法被改掉了，导致报错，临时补救用
Product.prototype.getbypnum1 = function get(callback) {
    var product = {
        pid :this.pid
    };
    var selectSQL = "select * from product_list where product_number = '"+product.pid+"' and status_id != 5";
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + selectSQL);
            return callback(new Error(err))
        }else{

            return callback(rows);
        }
    });
}
/**
 *
 * @deprecated please use getByParameters
 * @param callback
 */
Product.prototype.get = function (callback) {
    var product = {
        type_id: this.type_id,
        numStart:this.numStart,
        pid :this.pid,
        datstart:this.datstart,
        limit : this.limit,
        cf:this.cf,
        mdd:this.mdd,
        departurePort: this.departurePort,
        txtCuriseCompany:this.txtCuriseCompany,
        ship_id:this.ship_id,
        pse2:this.pse2
    };
    var orderByRetailPrice = (product.pse2=="1");
    var orderByPrice = (product.pse2=="4");
    var orderBy = "";
    if(product.pse2=="2"){
        orderBy = " order by start_date asc ";
    }else if(product.pse2=="3"){
        orderBy = " order by created_at desc ";
    }
    var params = {
        typeId : product.type_id,
        ownerId : null,
        statusIdsInclude : [3],
        statusIdsExclude : null,
        productId : null,
        productNumber : null,
        startAfterToday : true,
        startDate : product.datstart,
        cruiseAreaId : product.cf,
        cruiseCompanyNo : product.txtCuriseCompany,
        shipId : product.ship_id,
        travelScheduleLocation : null,
        productOrder :  orderBy,
        orderByPrice : orderByPrice,
        orderByRetailPrice : orderByRetailPrice,
        offset : product.numStart,
        limit : (product.limit?product.limit:DEFAULT_LIMIT)
    };
    if ( product.mdd ) {
        params.travelScheduleLocation = product.mdd;
    } else if ( product.departurePort ) { // TODO search ticket product
        params.travelScheduleLocation = product.departurePort;
    }
    _get(params, callback);
}

/**
 * @param params
 {
 typeId : null,
 ownerId : '',
 statusIdsInclude : null,
 statusIdsExclude : null,
 productId : null,
 productNumber : null,
 startAfterToday : false,
 startDate : null,
 cruiseAreaId : null,
 cruiseCompanyNo : null,
 shipId : null,
 travelScheduleLocation : null, //filter products with travel_schedule.location
 productOrder : null,
 orderByRetailPrice : false,
 orderByPrice : false,
 offset : null,
 limit : null,
 columns : null //columns to select, available for tables product, product_status, user, company, cruise_company, ship
 }
 *
 * @param callback
 */
Product.prototype.getByParameters = function (params, callback){
    return _get(params, callback);
}

function _get(params, callback) {
    var selectSQL = _productList(params);
    nodeUtil.log("product.js: get ");
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        } else {
            return callback(rows);
        }
    });
}

/**
 * TODO not used? -> remove
 * @deprecated
 * @param callback
 */
Product.prototype.geth = function get(callback) {
//TODO select limit, offset?
    var params = {
        ownerId : null,
        statusIdsInclude : null,
        statusIdsExclude : null,
        productId : null,
        productNumber : null,
        startAfterToday : true,
        startDate : null,
        cruiseAreaId : null,
        cruiseCompanyNo : null,
        shipId : null,
        travelScheduleLocation : null,
        productOrder :  " order by last_updated_at desc, published_at desc ",
        orderByRetailPrice : false,
        offset : null,
        limit : null
    };
    var selectSQL  = _productList(params);
    //var selectSQL  = _productList(null, null, null, null, null, true, null, null, null, null, null, " order by last_updated_at desc ", false, null, null);
    //"select * from product_list  order by last_updated_at desc";
    nodeUtil.log("TODO: product.js: geth ");
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

Product.prototype.getbacksystemlist = function getbacksystemlist(callback) {
    var selectSQL  = "select u1.*,u2.name as approvename,u3.name as statusname1  from product u1 LEFT JOIN user u2 ON u1.approve_id = u2.id LEFT JOIN product_status u3 ON u1.status_id = u3.id where u1.status_id = 2 order by id desc";
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

/**
 * @deprecated pls use getTotal(params, callback)
 * @param callback
 */
Product.prototype.gettotal = function get(callback) {
    
    var product = {
        type_id:this.type_id,
        numStart:this.numStart,
        pid :this.pid,
        datstart:this.datstart,
        cf:this.cf,
        mdd:this.mdd,
        txtCuriseCompany:this.txtCuriseCompany,
        ship_id:this.ship_id,
        pse2:this.pse2
    };

    var params;
    if(product.mdd == ""){
        params = {
            typeId : product.type_id,
            ownerId : null,
            statusIdsInclude : [3],
            statusIdsExclude : null,
            productId : null,
            productNumber : null,
            startAfterToday : true,
            startDate : product.datstart,
            cruiseAreaId : product.cf,
            cruiseCompanyNo : product.txtCuriseCompany,
            shipId : product.ship_id,
            travelScheduleLocation : null,
            productOrder :  " order by published_at desc ",
            orderByRetailPrice : false,
            offset : null,
            limit : null
        };

    }else{
        params = {
            typeId : product.type_id,
            ownerId : null,
            statusIdsInclude : [3],
            statusIdsExclude : null,
            productId : null,
            productNumber : null,
            startAfterToday : true,
            startDate : product.datstart,
            cruiseAreaId : product.cf,
            cruiseCompanyNo : product.txtCuriseCompany,
            shipId : product.ship_id,
            travelScheduleLocation : product.mdd,
            productOrder :  " order by published_at desc ",
            orderByRetailPrice : false,
            offset : null,
            limit : null
        };

    }
    var selectSQL  = "select count(pl.id) as total from (" + _productList( params ) + ") as pl ";
    nodeUtil.log("product.js: gettotal ");
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": "+selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows[0].total);
        }
    });
}

Product.prototype.getTotal = function (params, callback) {

    var selectSQL  = "select count(pl.id) as total from (" + _productList( params ) + ") as pl ";
    nodeUtil.log("product.js: gettotal ");
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": "+selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows[0].total);
        }
    });
}
/**
 * TODO remove
 * @deprecated
 * @param callback
 */
Product.prototype.getcal = function get(callback) {
    //TODO limit one year
    var params = {
        ownerId : null,
        statusIdsInclude : [3, 6],
        statusIdsExclude : null,
        productId : null,
        productNumber : null,
        startAfterToday : false,
        startDate : null,
        cruiseAreaId : null,
        cruiseCompanyNo : null,
        shipId : null,
        travelScheduleLocation : null,
        productOrder :  " order by created_at desc ",
        orderByRetailPrice : false,
        offset : null,
        limit : null
    };
    var selectSQL  = _productList(params);
    //"select * from product_list where (status_id = 3 or status_id = 6) order by created_at desc";
    nodeUtil.log("TODO: product.js: getcal product_list limit one year");
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err+ ": "+selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

Product.prototype.getByOwnerId = function get(callback) {
    var product = {
        owner_id :this.owner_id
    };
    var params = {
        ownerId:product.owner_id, statusIdsInclude : null,
        statusIdsExclude : null,
        productId : null,
        productNumber : null,
        startAfterToday : false,
        startDate : null,
        cruiseAreaId : null,
        cruiseCompanyNo : null,
        shipId : null,
        travelScheduleLocation : null,
        productOrder : " order by published_at desc ",
        orderByRetailPrice : false,
        offset : null,
        limit : null};
    var selectSQL  = _productList(params);
    //"select * from product_list order by published_at desc";
    nodeUtil.log("product.js: getOwnerId owner id: " + product.owner_id);
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err+ ": "+selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

Product.prototype.publish = function publish(callback) {
    var product = {
        pid :this.pid
    };
    var selectSQL  = "update product set status_id = 2 where id = '"+product.pid+"'";
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err+ ": "+selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

/* 审核批准产品上架 */
Product.prototype.approve = function save(callback) {
    var product = {
        pid :this.pid,
        approve_id:this.approve_id
    };
    var q = 'update product set status_id = 3,approve_id = '+product.approve_id+' where id = '+product.pid;
    nodeUtil.log(q);
    mysql.query(q, function (err, result) {
        if (err){
            nodeUtil.error('product.approve: '+err + ': ' + q);
            return callback(new Error(err));
        }
        q = 'select owner_id, title from product where id='+product.pid;
        mysql.query(q, function(err, owner){
            if(err){
                nodeUtil.error('product.approve select owner_id: '+err + ": " +q);
                return callback(new Error(err));
            }
            return callback({'owner_id':owner[0].owner_id, 'title':owner[0].title});
        });               
    });
}

/**
 *
 * @param parameters
 {
 typeId : null,
 ownerId : '',
 statusIdsInclude : null,
 statusIdsExclude : null,
 productId : null,
 productNumber : null,
 startAfterToday : false,
 startDate : null,
 cruiseAreaId : null,
 cruiseCompanyNo : null,
 shipId : null,
 travelScheduleLocation : null, //filter products with travel_schedule.location
 productOrder : null,
 orderByRetailPrice : false,
 orderByPrice : false,
 offset : null,
 limit : null,
 columns : null //columns to select, available for tables product, product_status, user, company, cruise_company, ship
 }
 * @returns {string}
 * @private
 */
function _productList(parameters) {
    
    var tables = "";
    var where = "";

    var criteriaStatus = "" ;
    if ( parameters.statusIdsInclude && parameters.statusIdsInclude.length > 0 ) {
        for( var i in parameters.statusIdsInclude ) {
            if ( criteriaStatus ) criteriaStatus += " or ";
            criteriaStatus += " status_id = '" + parameters.statusIdsInclude[i] + "' ";
        }
    }
    if ( criteriaStatus ) {
        criteriaStatus = "(" + criteriaStatus + ")";
    }
    if ( parameters.statusIdsExclude && parameters.statusIdsExclude.length > 0 ) {
        for( var i in parameters.statusIdsExclude ) {
             if ( criteriaStatus ) criteriaStatus += " and ";
            criteriaStatus += " status_id != '" + parameters.statusIdsExclude[i] + "' ";
        }
    }

    var criteriaStartAfterToday = ( parameters.startAfterToday ? " start_date >= CURDATE() " : "");
    var criteriaStartDate = (parameters.startDate ? " start_date like '%" + parameters.startDate + "%' " : "" );
    var criteriaCruiseArea = (parameters.cruiseAreaId ? " cruise_area_id = '"+parameters.cruiseAreaId+"' " : "");
    var criteriaShipId;
    if(parameters.shipId && utils.isInt(parameters.shipId)) {
        criteriaShipId = "cruise_ship.id = '" + parameters.shipId + "' and product.ship_id =cruise_ship.id";
    }

    if ( parameters.ownerId ) {
        if ( where ) {
            where += " and ";
        }
        where += " owner_id='" + parameters.ownerId + "' ";
    }
    if ( parameters.cruiseCompanyNo ) {
        tables += ", cruise_company";
        if ( where ) {
            where += " and ";
        }
        if ( !criteriaShipId ) {
            tables += ", cruise_ship";
            where += " cruise_company.txtCompanyNo like '%" + parameters.cruiseCompanyNo + "%' and cruise_ship.txtCompanyNo = cruise_company.txtCompanyNo and product.ship_id = cruise_ship.id ";
        } else {
            where += " cruise_company.txtCompanyNo like '%" + parameters.cruiseCompanyNo + "%' and cruise_ship.txtCompanyNo = cruise_company.txtCompanyNo ";
        }
    } 
    if( criteriaShipId ) {
        tables += ", cruise_ship";
        if ( where ) {
            where += " and ";
        }
        where += criteriaShipId;
    }
    if ( parameters.travelScheduleLocation ) {
        tables += ", travel_schedule";
        if ( where ) {
            where += " and ";
        }
        where += " travel_schedule.location = '"+parameters.travelScheduleLocation+"' and travel_schedule.product_id = product.id and travel_schedule.day_number = 1 ";
    }

    if( criteriaStatus ) {
        if ( where ) {
            where += " and ";
        }
        where += criteriaStatus;
    }
    if ( parameters.productId ) {
        if ( where ) {
            where += " and ";
        }
        where += " id = '" + parameters.productId + "' ";
    }
    if ( parameters.productNumber ) {
        if ( where ) {
            where += " and ";
        }
        where += " product_number = '" + parameters.productNumber + "'";
    }
    if ( parameters.typeId ) {
        if ( where ) {
            where += " and ";
        }
        where += " type_id = '" + parameters.typeId + "'";
    }
    if( criteriaStartAfterToday ) {
        if ( where ) {
            where += " and ";
        }
        where += criteriaStartAfterToday;
    }
    if( criteriaStartDate ) {
        if ( where ) {
            where += " and ";
        }
        where += criteriaStartDate;
    }
    if( criteriaCruiseArea ) {
        if ( where ) {
            where += " and ";
        }
        where += criteriaCruiseArea;
    }

    if ( where ){
        where = " where " + where;
    }
    
    if (!parameters.productOrder) {
        parameters.productOrder = "";
    }

    var selectLimit = "";
    if( parameters.limit && parameters.offset ) {
        selectLimit = " limit " + parameters.offset + ", " + parameters.limit;
    } else if ( parameters.limit ) {
        selectLimit = " limit " + parameters.limit;
    }

    var selectProduct;

    if ( parameters.orderByRetailPrice || parameters.orderByPrice ) {
        var orderPrice;
        if ( parameters.orderByRetailPrice ) {
            orderPrice = "retail_price";
        } else {
            orderPrice = "price";
        }
        selectProduct = "SELECT distinct(pp.product_id), min(" + orderPrice + ") as price, product.* FROM product_position pp, product"+ tables
        + where + " and product.id=pp.product_id group by pp.product_id ORDER BY price ASC " + selectLimit;
    } else {
        selectProduct = "select product.* FROM product"+ tables + where + parameters.productOrder + selectLimit;
    }

    var selectColumns = "";
    if ( parameters.columns ) {
        if ( parameters.columns.product ){
            for ( var i in parameters.columns.product ) {
                if ( parameters.columns.product == "id" ) {
                    continue;
                }
                if ( selectColumns ) {
                    selectColumns += ", p."+parameters.columns.product[i];
                } else {
                    selectColumns = " p."+parameters.columns.product[i];
                }
            }
        }
        if ( parameters.columns.user ){
            for ( var i in parameters.columns.user ) {
                if ( selectColumns ) {
                    selectColumns += ", user."+parameters.columns.user[i];
                } else {
                    selectColumns = " user."+parameters.columns.user[i];
                }
                if ( parameters.columns.user[i] == "name" ) {
                    selectColumns += " as nameowner";
                }
            }
        }
        if ( parameters.columns.product_status ){
            for ( var i in parameters.columns.product_status ) {
                if ( selectColumns ) {
                    selectColumns += ", pstatus."+parameters.columns.product_status[i];
                } else {
                    selectColumns = " pstatus."+parameters.columns.product_status[i];
                }
            }
            if ( parameters.columns.product_status[i] == "name" ){
                selectColumns += " as statusname";
            }
        }
        if ( parameters.columns.cruise_ship ){
            for ( var i in parameters.columns.cruise_ship ) {
                if ( selectColumns ) {
                    selectColumns += ", ship."+parameters.columns.cruise_ship[i];
                } else {
                    selectColumns = " ship."+parameters.columns.cruise_ship[i];
                }
                if ( parameters.columns.cruise_ship[i] == "id" ){
                    selectColumns +=" as cid";
                }
            }
        }
        if ( parameters.columns.cruise_company ){
            for ( var i in parameters.columns.cruise_company ) {
                if ( selectColumns ) {
                    selectColumns += ", cruise_company."+parameters.columns.cruise_company[i];
                } else {
                    selectColumns = " cruise_company."+parameters.columns.cruise_company[i];
                }
            }
        }
        if ( parameters.columns.cruise_area ){
            for ( var i in parameters.columns.cruise_area ) {
                if ( selectColumns ) {
                    selectColumns += ", area."+parameters.columns.cruise_area[i];
                } else {
                    selectColumns = " area."+parameters.columns.cruise_area[i];
                }
            }
        }
        if ( parameters.columns.company ){
            for ( var i in parameters.columns.company ) {
                if ( selectColumns ) {
                    selectColumns += ", company."+parameters.columns.company[i];
                } else {
                    selectColumns = " company."+parameters.columns.company[i];
                }
            }
        }

    } else {
        selectColumns = "p.productfeature, p.product_number, p.supplier_id, p.owner_id, p.type_id, p.price_type_id, p.status_id, p.ship_id, " +
        " p.start_date, p.days, p.nights, p.end_date, p.china_started, p.cruise_area_id, p.title, p.contact_person," +
        " p.contact_mobile_phone, p.contact_email, p.service_by_huiyou, p.customized_ship_description, p.description, " +
        " p.schedule_comment, p.excursion_txt, p.cabin_comment, p.advertising, p.advertising_img_url, p.currency_code, " +
        " p.bookable_until, p.visa_application_until, p.visa_comment, p.booking_note, p.cancellation_policy, " +
        " p.payment_comment, p.comment, p.created_by, p.created_at, p.published_at, p.last_updated_at, " +
            //end product table
            //field list from other tables
        " user.name as nameowner, pstatus.name as statusname, ship.id as cid, ship.txtShipName, cruise_company.txtCompanyNo, cruise_company.txtCompanyName, cruise_company.rtfCompanyLogo, area.txtCruiseArea, " +
            // field list from company table
        " company.bank, company.account_number, company.account_name, company.logo, company.short_name, company.address, company.telephone, company.telephone_area_code, company.payment_transfer,  " +
        " company.payment_online_banking,  company.payment_alipay,  company.payment_cheque,  company.payment_cash ";
    }

    var sql =//begin field list from product table
        "SELECT DISTINCT(p.id), " + selectColumns +
        " FROM ( " + selectProduct + " ) AS p " +
        " LEFT JOIN cruise_ship AS ship ON p.ship_id=ship.id " +
        " LEFT JOIN cruise_company ON ship.txtCompanyNo = cruise_company.txtCompanyNo " +
        " LEFT JOIN company ON p.supplier_id = company.id " +
        " LEFT JOIN cruise_area AS area ON p.cruise_area_id = area.id " +
        " LEFT JOIN product_status pstatus ON p.status_id = pstatus.id " +
        " LEFT JOIN user ON p.owner_id = user.id";
        //nodeUtil.log(sql);
    return sql;
}