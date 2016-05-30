var permission = require('./permission.js');
var errHandler = require('./error.js');
var io = require('./socket/socket.js');
var IO_KEY = require('./socket/io-keys.js');
var User = require('../models/user.js');
var Med = require('../models/med.js');
var Port = require('../models/port.js');
var Cruisecompany = require('../models/cruisecompany.js');
var Cruiseship = require('../models/cruiseship.js');
var Product = require('../models/product.js');
var Company = require('../models/company.js');
var Demand = require('../models/demand.js');
var Supply = require('../models/supply.js');
var Included_fee = require('../models/included_fee.js');
var Product_files = require('../models/product_files.js');
var Cabin_category = require('../models/cabin_category.js');
var Travel_schedule = require('../models/travel_schedule.js');
var Product_position = require('../models/product_position.js');
var Preset_schedule = require('../models/preset_schedule.js');
var setting = require('../models/setting.js');
var mysql = require('../models/db_mysql');
var nodeUtil = require('util');
var email = require('./email.js');
var async = require('async');

/*旧的产品列表页*/
/**
 * @deprecated
 */
exports.productView = function (view, req, res, next) {

    var pse2 = "";
    if (req.session.pse2) {
        pse2 = req.session.pse2;
    } else {
        pse2 = "3";
    }
    res.locals.pse2 = pse2;

    req.session.pse2 = "";

    var numStart = "";
    if (req.session.numStart1) {
        res.locals.numStart = req.session.numStart1;
        numStart = req.session.numStart1;
    } else {
        res.locals.numStart = "0";
        numStart = "0";
    }
    req.session.numStart1 = "0";

    var datstart = "";
    if (req.session.datstart1) {
        res.locals.datstart = req.session.datstart1;
        datstart = req.session.datstart1;
    } else {
        res.locals.datstart = "*";
    }

    if (req.session.datstart1 == "*") {
        datstart = "";
    }

    req.session.datstart1 = "";

    var cf = "";
    if (req.session.cf1) {
        res.locals.cf = req.session.cf1;
        cf = req.session.cf1;
    } else {
        res.locals.cf = "";
    }
    if (req.session.cf1 == "*") {
        cf = "";
    }

    req.session.cf1 = "";

    var mdd = "";
    if (req.session.mdd1) {
        res.locals.mdd = req.session.mdd1;
        mdd = req.session.mdd1;
    } else {
        res.locals.mdd = "";
    }
    if (req.session.mdd1 == "*") {
        mdd = "";
    }

    req.session.mdd1 = "";

    var txtCuriseCompany = "";
    if (req.session.txtCuriseCompany1) {
        res.locals.txtCuriseCompany = req.session.txtCuriseCompany1;
        txtCuriseCompany = req.session.txtCuriseCompany1;
    } else {
        res.locals.txtCuriseCompany = "";
    }
    if (req.session.txtCuriseCompany1 == "*") {
        txtCuriseCompany = "";
    }

    req.session.txtCuriseCompany1 = "";

    var ship_id = "";
    if (req.session.ship_id1) {
        res.locals.ship_id = req.session.ship_id1;
        ship_id = req.session.ship_id1;
    } else {
        res.locals.ship_id = "";
    }
    if (req.session.ship_id1 == "-") {
        ship_id = "";
    }

    if (req.session.ship_id1 == "*") {
        ship_id = "";
    }

    req.session.ship_id1 = "";

    permission.checkUserCache(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {

            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result, req, res);
                return false;
            }

            if (nodeUtil.isError(result1) || !result1 || !result1[0]) {
                errHandler.responseError(new Error("用户公司信息不存在！"), req, res);
                return false;
            }

            var product = new Product({
                numStart: numStart,
                datstart: datstart,
                cf: cf,
                mdd: mdd,
                txtCuriseCompany: txtCuriseCompany,
                ship_id: ship_id,
                pse2: pse2
            });


            var cc = new Cruisecompany({});
            cc.get(function (result8) {
                if (nodeUtil.isError(result8)) {
                    errHandler.responseError(result8, req, res);
                    return false;
                }
                var cs = new Cruiseship({});
                cs.get(function (result9) {
                    if (nodeUtil.isError(result9)) {
                        errHandler.responseError(result9, req, res);
                        return false;
                    }
                    var med = new Med({});
                    med.get(function (result10) {
                        if (nodeUtil.isError(result10)) {
                            errHandler.responseError(result10, req, res);
                            return false;
                        }
                        product.get(function (result2) {
                            if (nodeUtil.isError(result2)) {
                                var e = new Error("查询产品发生数据库错误！");
                                e.stack = result2;
                                e.status = "500";
                                errHandler.responseError(e, req, res);
                                return false;
                            }

                            if (!result2 || !result2[0]) {
                                res.render(view, {layout: "layout", user: result, company: result1, product: result2, total: 0, cruisecompany: result8, cruiseship: result9, med: result10});
                                return false;
                            }
                            var productIds = "";
                            for (var i in result2) {
                                if (productIds) productIds += ",";
                                productIds += result2[i].id;
                            }
                            var ts = new Travel_schedule({});
                            ts.getByProductIds(productIds, function (result3, err) {
                                if (nodeUtil.isError(result3)) {
                                    errHandler.responseError(result3, req, res);
                                    return false;
                                }
                                var inf = new Included_fee({});
                                inf.getByProductIds(productIds, function (result4, err) {
                                    if (nodeUtil.isError(result4)) {
                                        errHandler.responseError(result4, req, res);
                                        return false;
                                    }
                                    var pp = new Product_position({});
                                    pp.getByProductIds(productIds, function (result5) {
                                        if (nodeUtil.isError(result5)) {
                                            errHandler.responseError(result5, req, res);
                                            return false;
                                        }
                                        product.gettotal(function (result6) {
                                            if (nodeUtil.isError(result6)) {
                                                errHandler.responseError(result6, req, res);
                                                return false;
                                            }

                                            res.render(view, {layout: "layout", user: result, company: result1, product: result2, ts: result3, inf: result4, pp: result5, total: result6, cruisecompany: result8, cruiseship: result9, med: result10});

                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

/*产品列表页*/
exports.productListView = function (req, res, next) {

    permission.checkUserCache(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {

            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result, req, res);
                return false;
            }

            if (nodeUtil.isError(result1) || !result1 || !result1[0]) {
                errHandler.responseError(new Error("用户公司信息不存在！"), req, res);
                return false;
            }

            new Med({}).get(function (result10) {
                if (nodeUtil.isError(result10)) {
                    errHandler.responseError(result10, req, res);
                    return false;
                }
                res.render('productlist', {
                    layout: "layout",
                    user: result,
                    company: result1,
                    med: result10 //cruise area
                });
            });
        });
    });
}

exports.fetchProductsData = function (requiredByUser, params, callback) {

    var type = params.product_type;
    if (!type || type == '*') {
        type = '';
    }

    var orderBy = "";
    if (params.pse2 && params.pse2=="2") {
        orderBy = " order by start_date asc ";
    } else {
        orderBy = " order by created_at desc ";
    }

    var orderByRetailPrice = (params.pse2=="1");
    var orderByPrice = (params.pse2=="4");

    var numStart = params.offset;

    var datstart = params.datstart;

    if (!datstart || datstart == "*") {
        datstart = "";
    }

    var cf = params.cf;
    if (!cf || cf == "*") {
        cf = "";
    }

    var departureCities = params.mdd;
    if (!departureCities || departureCities == "*") {
        departureCities = "";
    }

    var txtCuriseCompany = params.cruise_company;
    if (!txtCuriseCompany || txtCuriseCompany == "*") {
        txtCuriseCompany = "";
    }

    var ship_id = params.ship_id;

    if (!ship_id || ship_id == "-" || ship_id == "*") {
        ship_id = "";
    }

    var parameters = {
        typeId : type,
        ownerId : null,
        statusIdsInclude : [3],
        statusIdsExclude : null,
        productId : null,
        productNumber : null,
        startAfterToday : true,
        startDate : datstart,
        cruiseAreaId : cf,
        cruiseCompanyNo : txtCuriseCompany,
        shipId : ship_id,
        travelScheduleLocation : departureCities,
        productOrder : orderBy,
        orderByPrice : orderByPrice,
        orderByRetailPrice : orderByRetailPrice,
        offset : params.offset,
        limit : null
    }

    new Product({}).getTotal(parameters, function (total) {
        if (nodeUtil.isError(total)) {
            return callback({error: total});
        }

        nodeUtil.log('fetch product result: ' + total);

        if (total == 0) {
            return callback({total: 0});
        }

        parameters.limit = 6;
        new Product({}).getByParameters(parameters, function (result2) {
            if (nodeUtil.isError(result2)) {
                var e = new Error("查询产品发生数据库错误！");
                e.stack = result2;
                e.status = "500";
                return callback({error: e});
            }

            if (!result2 || !result2[0]) { // something goes wrong
                return callback({total: 0});
            }
            var productIds = "";
            for (var i in result2) {
                if (productIds) productIds += ",";
                productIds += result2[i].id;
            }
            var ts = new Travel_schedule({});
            ts.getByProductIds(productIds, function (result3, err) {
                if (nodeUtil.isError(result3)) {
                    return callback({error: result3});
                }
                var inf = new Included_fee({});
                inf.getByProductIds(productIds, function (result4, err) {
                    if (nodeUtil.isError(result4)) {
                        return callback({error: result4});
                    }

                    new Product_position({}).getByProductIds(productIds, {withoutRetailPrice:(params.public || !requiredByUser)}, function (result5) {
                        if (nodeUtil.isError(result5)) {
                            return callback({error: result5});
                        }

                        return callback({
                            product: result2,
                            ts: result3,
                            inf: result4,
                            pp: result5,
                            total: total
                        });

                    });
                });
            });
        });
    });
}

exports.fetchProducts4Calendar = function (requiredByUser, params, callback) {

    var parameters = {
        datstart: params.datstart,
        statusIdsInclude: [3, 6]
    };

    new Product({}).getByParameters(parameters, function (result2) {
        if (nodeUtil.isError(result2)) {
            var e = new Error("查询产品发生数据库错误！");
            e.stack = result2;
            e.status = "500";
            return callback({error: e});
        }

        if (!result2 || !result2[0]) {
            return callback({});
        }

        var productIds = "";
        for (var i in result2) {
            if (productIds) productIds += ",";
            productIds += result2[i].id;
        }
        var ts = new Travel_schedule({});
        ts.getByParameters({columns:['product_id','day_number','location'], product_ids: productIds, day_number: 1}, function (result3, err) {
            if (nodeUtil.isError(result3)) {
                return callback({error: result3});
            }

            new Product_position({}).getByProductIds(productIds, {withoutRetailPrice: (params.public || !requiredByUser)}, function (result5) {
                if (nodeUtil.isError(result5)) {
                    return callback({error: result5});
                }

                return callback({
                    product: result2,
                    ts: result3,
                    pp: result5
                });

            });
        });
    });
}

/* 产品详情页 */
exports.productdetail = function (req, res) {
    permission.checkUser(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var product = new Product({pid: req.query.p});
            product.getbypnum1(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }

                var pf = new Product_files({id: result2[0].id});
                pf.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var inf = new Included_fee({id: result2[0].id});
                    inf.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var ts = new Travel_schedule({id: result2[0].id});
                        ts.getbynohh(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var pp = new Product_position({id: result2[0].id});
                            pp.get(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                var sql = "select * from product_insurance where product_id = " + result2[0].id;
                                mysql.query(sql, function (err, rows) {
                                    if (err) {
                                        nodeUtil.error(err + ": " + sql);
                                        errHandler.responseError(new Error(err), req, res);
                                        return false;
                                    }
                                    //插入log
                                    var sqllog = "insert into log_product_access (product_id,user_id,time) values ("+result2[0].id+","+result[0].id+",now())";
                                    mysql.query(sqllog, function (err, c) {
                                        if (err) {
                                            nodeUtil.error(err + ": " + sql);
                                            errHandler.responseError(new Error(err), req, res);
                                            return false;
                                        }
                                    });

                                    if (result2[0].service_by_huiyou == '1') {
                                        setting.getServiceManager(function (managerUserId) {
                                            if (nodeUtil.isError(managerUserId)) {
                                                errHandler.responseError(managerUserId, req, res);
                                                return false;
                                            }
                                            res.render('productdetail', {layout: "layout", user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, bx: rows, service_user_id: managerUserId});
                                        });
                                    } else {
                                        res.render('productdetail', {layout: "layout", user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, bx: rows});
                                    }
                                });

                            });

                        });

                    });

                });

            });

        });
    });
}

/* 审核批准产品上架 */
exports.approve = function (req, res) {

    var docid = req.body['docid'];
    var product = new Product({pid:docid,approve_id:req.session.user});
    product.approve(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        
        
        io.emitToAll(IO_KEY.PRODUCT_PUBLISHED,  {'pid':docid, 'owner_id':result.owner_id});

        new User({}).getMails({buyer_only:true}, function(recipientList){

            if(result && !nodeUtil.isError(recipientList)){

                var user = new User({
                    id:result.owner_id
                });
                
                user.getLabel(function(label) {
                    if( label && !nodeUtil.isError(label)) {
                        email.sendSystemMailMultiple(recipientList, '新邮轮产品发布：'+result.title, label.company_short_name + '的' + label.user_name + '发布了一个新产品。详情请登陆荟邮平台查看。');
                    }
                });
            }
        });
        

        res.redirect('/b_product');        
    });
};

//审核产品接口
exports.approveProduct = function (req, res) {

    var docid = parseInt(req.param['docid']);
    var approveid = parseInt(req.param['userid']);
    var product = new Product({pid:docid,approve_id:approveid});
    product.approve(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        
        
        io.emitToAll(IO_KEY.PRODUCT_PUBLISHED,  {'pid':docid, 'owner_id':result.owner_id});

        new User({}).getMails({buyer_only:true}, function(recipientList){

            if(result && !nodeUtil.isError(recipientList)){

                var user = new User({
                    id:result.owner_id
                });
                
                user.getLabel(function(label) {
                    if( label && !nodeUtil.isError(label)) {
                        email.sendSystemMailMultiple(recipientList, '新邮轮产品发布：'+result.title, label.company_short_name + '的' + label.user_name + '发布了一个新产品。详情请登陆荟邮平台查看。');
                    }
                });
            }
        });
        

        res.send('200');        
    });
};


exports.publishproductread = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var product = new Product({pid: req.query.p});
            product.getbypnum1(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var pf = new Product_files({id: result2[0].id});
                pf.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var inf = new Included_fee({id: result2[0].id});
                    inf.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var ts = new Travel_schedule({id: result2[0].id});
                        ts.getbynohh(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var pp = new Product_position({id: result2[0].id});
                            pp.get(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                var sql = "select * from product_insurance where product_id = " + result2[0].id;
                                mysql.query(sql, function (err, rows) {
                                    if (err) {
                                        nodeUtil.error(err + ": " + sql);
                                        errHandler.responseError(new Error(err), req, res);
                                        return false;
                                    }
                                    res.render('publishproductread', {layout: "layout", user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, bx: rows});
                                });

                            });

                        });

                    });

                });

            });

        });
    });
}

exports.productdetailbooking = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var product = new Product({pid: req.query.p});
            product.getbypnum(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var pf = new Product_files({id: result2[0].id});
                pf.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var inf = new Included_fee({id: result2[0].id});
                    inf.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var ts = new Travel_schedule({id: result2[0].id});
                        ts.get(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var pp = new Product_position({id: result2[0].id});
                            pp.get(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                res.render('productdetailbooking', {layout: "layout", user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6});

                            });

                        });

                    });

                });

            });

        });
    });
}

exports.publishproductedit = function (req, res) {
    permission.checkUserCache(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var cruisecompany = new Cruisecompany();
            cruisecompany.get(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var cruiseship = new Cruiseship();
                cruiseship.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var med = new Med();
                    med.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var port = new Port();
                        port.get(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var cac = new Cabin_category();
                            cac.getall(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                var ps = new Preset_schedule();
                                ps.get(function (result7) {
                                    if (nodeUtil.isError(result7)) {
                                        errHandler.responseError(result7, req, res);
                                        return false;
                                    }
                                    var p = new Product({pid: req.query.p});
                                    p.getbypnum1(function (result8) {
                                        if (nodeUtil.isError(result8)) {
                                            errHandler.responseError(result8, req, res);
                                            return false;
                                        }
                                        var pp = new Product_position({id: result8[0].id});

                                        pp.get(function (result9) {
                                            if (nodeUtil.isError(result9)) {
                                                errHandler.responseError(result9, req, res);
                                                return false;
                                            }
                                            var ts = new Travel_schedule({id: result8[0].id});
                                            ts.get(function (result10) {
                                                if (nodeUtil.isError(result10)) {
                                                    errHandler.responseError(result10, req, res);
                                                    return false;
                                                }
                                                var sql1 = "select * from product";
                                                mysql.query(sql1, function (err, rows1) {
                                                    if (err) {
                                                        nodeUtil.error(err + ": " + sql1);
                                                        errHandler.responseError(new Error(err), req, res);
                                                        return false;
                                                    }
                                                    var sql2 = "select * from included_fee where product_id =" + result8[0].id;
                                                    mysql.query(sql2, function (err, rows2) {
                                                        if (err) {
                                                            nodeUtil.error(err + ": " + sql2);
                                                            errHandler.responseError(new Error(err), req, res);
                                                            return false;
                                                        }
                                                        var pf = new Product_files({id: result8[0].id});
                                                        pf.get(function (result11) {
                                                            if ( nodeUtil.isError(result11) ){
                                                                errHandler.responseError(result11, req, res);
                                                                return false;
                                                            }
                                                            var inf = new Included_fee({id: result8[0].id});
                                                            inf.get(function (result12) {
                                                                if ( nodeUtil.isError(result12) ){
                                                                    errHandler.responseError(result12, req, res);
                                                                    return false;
                                                                }
                                                                var sql3 = "select * from product_insurance where product_id =" + result8[0].id;
                                                                mysql.query(sql3, function (err, rows3) {
                                                                    if (err) {
                                                                        nodeUtil.error(err + ": " + sql3);
                                                                        errHandler.responseError(new Error(err), req, res);
                                                                        return false;
                                                                    } else {
                                                                        var sql11 = "select * from user_company where crole_seller = 1";
                                                                        mysql.query(sql11, function (err, rows11) {
                                                                            if (err) {
                                                                                    errHandler.logErrorAndResponse(err, sql11, req, res);
                                                                                    return false;
                                                                            }else{
                                                                               res.render('publishproductedit', {supplyuser:rows11,layout: "layout", pi: rows3, inf: result12, pf: result11, user: result, company: result1, cruisecompany: result2, cruiseship: result3, med: result4, port: result5, cac: result6, ps: result7, p: result8, pp: result9, ts: result10, prj: rows1, inf: rows2});
                                                                     
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            });

                                                        });
                                                    });
                                                });
                                            });
                                        });

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

    });
};

exports.publishproductsuccess = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            res.render('publishproductsuccess', {layout: "layout", user: result, company: result1});
        });
    });
};

exports.publishproductyulan = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var product = new Product({pid: req.query.p});
            product.getbypnum(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var pf = new Product_files({id: result2[0].id});
                pf.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var inf = new Included_fee({id: result2[0].id});
                    inf.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var ts = new Travel_schedule({id: result2[0].id});
                        ts.getbynohh(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var pp = new Product_position({id: result2[0].id});
                            pp.get(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                var sql = "select * from product_insurance where product_id = " + result2[0].id;
                                mysql.query(sql, function (err, rows) {
                                    if (err) {
                                        errHandler.logErrorAndResponse(err, sql, req, res);
                                        return false;
                                    }
                                    res.render('publishproductyulan', {layout: "layout", user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, bx: rows});
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.publishproductyulando = function (req, res) {
    var product = new Product({
        pid:req.body.product_number
    });

    product.publish(function (err) {
        if (nodeUtil.isError(err)) {
            errHandler.responseError(err, req, res);
            return false;
        }
        //发送邮件给booking@huiyoulun.com提示有新用户提交了注册信息
        email.sendSystemMail("booking@huiyoulun.com", 
        "荟邮轮提示信息",
        req.body.publishid + "发布了一条产品名称为"+req.body.publishname+"的产品需要审核！");
        res.redirect('loading?page=publishproductsuccess');
    });
}

exports.publishproductmenu = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var demand = new Demand({});
            demand.get(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var supply = new Supply({});
                supply.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    res.render('publishproductmenu', {layout: "layout", user: result, company: result1, demand: result2, supply: result3});

                });
            });
        });
    });
};

exports.publishproduct = function (req, res) {
    permission.checkUserCache(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var cruisecompany = new Cruisecompany();
            cruisecompany.get(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var cruiseship = new Cruiseship();
                cruiseship.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var med = new Med();
                    med.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var port = new Port();
                        port.get(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var cac = new Cabin_category();
                            cac.getall(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                var ps = new Preset_schedule();
                                ps.get(function (result7) {
                                    if (nodeUtil.isError(result7)) {
                                        errHandler.responseError(result7, req, res);
                                        return false;
                                    }
                                    //TODO optimize sql
                                    var sql1 = "select * from product"; 
                                    mysql.query(sql1, function (err, rows1) {
                                        if (err) {
                                            errHandler.logErrorAndResponse(err, sql1, req, res);
                                            return false;
                                        }
                                        var sql2 = "select * from user_company where crole_seller = 1";
                                        mysql.query(sql2, function (err, rows2) {
                                            if (err) {
                                                errHandler.logErrorAndResponse(err, sql2, req, res);
                                                return false;
                                            }
                                            res.render('publishproduct', {layout: "layout",supplyuser:rows2, user: result, company: result1, cruisecompany: result2, cruiseship: result3, med: result4, port: result5, cac: result6, ps: result7, prj: rows1});
                                        });    
                                    });

                                });
                            });
                        });
                    });
                });
            });
        });
    });
}


exports.publishproductdo = function (req, res) {

    var op = req.files;
    var logosql = "";
    var logopath = "";

    if(op.advertising_img_url.name!=""){
        logopath = op.advertising_img_url.path.replace("public\\files\\","").replace("public/files/","");
        logosql = ",logo='"+logopath+"'";
    }

    //判断是否包含例:
    var c1 = req.body.advertising;
    var c2 = req.body.visa_comment;
    var c3 = req.body.booking_note;

    var c4 = req.body.cancellation_policy;
    var c5 = req.body.payment_comment;
    var c6 = req.body.comment;

    if(c1.indexOf("例:")!=-1){
        c1 = "";
    }
    if(c2.indexOf("例:")!=-1){
        c2 = "";
    }
    if(c3.indexOf("例:")!=-1){
        c3 = "";
    }
    if(c4.indexOf("例:")!=-1){
        c4 = "";
    }
    if(c5.indexOf("例:")!=-1){
        c5 = "";
    }
    if(c6.indexOf("例:")!=-1){
        c6 = "";
    }
    var product = new Product({
        product_number: req.body.product_number,
        supplier_id: req.body.companyID,
        owner_id:req.body.userID,
        type_id:req.body.ptype,
        ship_id:req.body.ship_id,
        start_date:req.body.start_date,
        days:req.body.days,
        china_started:req.body.gotype,
        cruise_area_id:req.body.txtPlace,
        title:req.body.title,
        contact_person:req.body.contact_person,
        contact_mobile_phone:req.body.contact_mobile_phone,
        contact_email:req.body.contact_email,
        service_by_huiyou:req.body.servicetype,
        customized_ship_description:"",    //邮轮介绍
        schedule_comment:req.body.schedule_comment,
        advertising:c1,
        advertising_img_url:logopath,     //广告海报图片地址
        visa_application_until:req.body.visa_application_until,
        visa_comment:c2,
        booking_note:c3,
        cancellation_policy:c4,
        payment_comment:c5,
        comment:c6,
        created_by:req.body.cuserID,
        nights:req.body.wan,
        cabin_comment:req.body.cabin_comment,
        excursion_txt:req.body.excursion_txt,
        productfeature:req.body.productfeature,
        remark:req.body.remark
    });

    product.save(function (err) {
        if (nodeUtil.isError(err)) {
            errHandler.responseError(err, req, res);
            return false;
        }

        var psql = "select id from product where status_id !=5 and product_number = '"+req.body.product_number+"'";
        mysql.query(psql,function (err, rows1) {
            if (err) {
                errHandler.logErrorAndResponse(err, psql, req, res);
                return false;
            }
            console.log(rows1[0].id);
            //插入签证文件
            if(op.file1){
                var fql = "insert into product_files (product_id,file_name,file_path) values ("+rows1[0].id+",'"+req.body.filename1+"','"+op.file1.path.replace("public\\files\\","").replace("public/files/","")+"')";
                mysql.query(fql,function (err, rownull) {});
            }
            if(op.file2){
                var fql = "insert into product_files (product_id,file_name,file_path) values ("+rows1[0].id+",'"+req.body.filename2+"','"+op.file2.path.replace("public\\files\\","").replace("public/files/","")+"')";
                mysql.query(fql,function (err, rownull) {});
            }
            if(op.file3){
                var fql = "insert into product_files (product_id,file_name,file_path) values ("+rows1[0].id+",'"+req.body.filename3+"','"+op.file3.path.replace("public\\files\\","").replace("public/files/","")+"')";
                mysql.query(fql,function (err, rownull) {});
            }

            var o = req.body;
            //插入保险
            var sql5 = "insert into product_insurance(product_id,type,description,price) values ("+rows1[0].id+",'"+o.bxtype+"','"+o.bxdescription+"',"+o.bxprice+")";
            console.log(sql5);
            mysql.query(sql5,function (err, rows) {
                if (err) {
                    errHandler.logErrorAndResponse(err, sql5, req, res);
                    return false;
                }
            });
            //插入是否包含

            var sql1 = "insert into included_fee (product_id,incl_cruise_ticket,incl_cruise_ticket_comment,incl_port_tax,port_tax_fee,incl_port_tax_comment,incl_visa_fee,visa_fee,incl_visa_comment,incl_tourist_guide,tourist_guide_fee,incl_tourist_guide_comment,incl_excursion,excursion_fee,incl_excursion_comment,incl_meal_on_board,incl_meal_on_board_comment,incl_entertainment,incl_entertainment_comment,incl_passport,incl_passport_comment,incl_transfer,incl_transfer_comment,incl_single_room_fee,incl_single_room_fee_comment,incl_self_consumption,incl_self_consumption_comment,incl_travel_insurance,incl_travel_insurance_comment,incl_fee_not_mentioned,incl_fee_not_mentioned_comment,fee_comment,incl_tip,tip,incl_tip_comment) values("+rows1[0].id+","+ o.bh1+",'"+ o.cc1+"',"+ o.bh2+",'"+ o.cc2+"','"+ o.cc3+"',"+ o.bh3+",'"+ o.cc4+"','"+ o.cc5+"',"+ o.bh4+",'"+ o.cc6+"','"+ o.cc7+"',"+ o.bh5+",'"+ o.cc8+"','"+ o.cc9+"',"+ o.bh6+",'"+ o.cc10+"',"+ o.bh7+",'"+ o.cc11+"',"+ o.bh8+",'"+ o.cc12+"',"+ o.bh9+",'"+ o.cc13+"',"+ o.bh10+",'"+ o.cc14+"',"+ o.bh11+",'"+ o.cc15+"',"+ o.bh12+",'"+ o.cc16+"',"+ o.bh13+",'"+ o.cc17+"','"+o.cc18+"',"+ o.bh14+","+ o.cc19+",'"+ o.cc20+"')";
            console.log(sql1);
            mysql.query(sql1,function (err, rows) {
                if (err) {
                    //TODO rollback?
                    errHandler.logErrorAndResponse(err, sql1, req, res);
                    return false;
                }
            });
            //插入行程
            var tmp1 = o.day_number0.split("@");
            var tmp2 = o.location0.split("@");
            var tmp3 = o.departure_time0.split("@");
            var tmp4 = o.arrival_time0.split("@");
            var tmp5 = o.description0.split("@");
            var tmp6 = o.breakfast0.split("@");
            var tmp7 = o.lunch0.split("@");
            var tmp8 = o.dinner0.split("@");
            var tmp9 = o.overnight_stay0.split("@");
            for(var i=0;i<tmp1.length;i++){
                var sql2 = "insert into travel_schedule (product_id,day_number,location,departure_time,arrival_time,description,breakfast,lunch,dinner,overnight_stay) values ("+rows1[0].id+","+tmp1[i]+",'"+tmp2[i]+"','"+tmp3[i]+"','"+tmp4[i]+"','"+tmp5[i]+"','"+tmp6[i]+"','"+tmp7[i]+"','"+tmp8[i]+"','"+tmp9[i]+"')";
                console.log(sql2);
                mysql.query(sql2,function (err, rows) {
                    if (err) {
                        //TODO io.emit err to user
                        nodeUtil.error(err + ": " +sql2);
                    }
                });
            }
            //插入价格体系
            /*
            console.log("----------------");
            console.log(o.dh1);
            console.log("----------------");
            console.log(o.dh2);
            console.log("----------------");
            console.log(o.dh3);
            console.log("----------------");
            console.log(o.dh4);
            console.log("----------------");
            console.log(o.dh5);
            console.log("----------------");
            console.log(o.dh6);
            console.log("----------------");
            console.log(o.dh7);
            console.log("----------------");
            console.log(o.dh8);
            console.log("----------------");
            console.log(o.dh9);
            console.log("----------------");
            console.log(o.dh0);
            console.log("----------------");
            */
            var tmp1 = o.dh1.split("@");
            var tmp2 = o.dh2.split("@");
            var tmp3 = o.dh3.split("@");
            var tmp4 = o.dh4.split("@");
            var tmp5 = o.dh5.split("@");
            var tmp6 = o.dh6.split("@");
            var tmp7 = o.dh7.split("@");
            var tmp8 = o.dh8.split("@");
            var tmp9 = o.dh9.split("@");
            var tmp0 = o.dh0.split("@");
            for(var i=0;i<tmp1.length;i++){
                var t= "";var t1 = tmp2[i];
                if(tmp1[i]=="内舱房"){t = "1";}
                else if(tmp1[i]=="海景房"){t = "2";}
                else if(tmp1[i]=="阳台房"){t = "3";}
                else if(tmp1[i]=="套房"){t = "4";}
                else if(tmp1[i]=="皇家大道景观房"){t = "5";}
                if(tmp2[i]==""){t1 = "9999";}
                if(tmp8[i]!="0" && tmp3[i]!="0" && tmp4[i]!="0"){
                    var sql3 = "insert into product_position (product_id,cabin_type_id,cabin_category_id,price,retail_price,price_2,retail_price_2,price_child,amount,retail_price_child,created_at,retail_commission) values ("+rows1[0].id+","+t+","+t1+","+tmp3[i]+","+tmp4[i]+","+tmp5[i]+","+tmp6[i]+","+tmp7[i]+","+tmp8[i]+","+tmp9[i]+",now(),"+tmp0[i]+")";
                    console.log(sql3);
                    mysql.query(sql3,function (err, rows) {
                        if (err) {
                            //TODO io.emit err to user
                            nodeUtil.error(err + ": " +sql2);
                        }
                    });
                }

            }
            if(req.body.redirurl=="null"){
                res.redirect('loading?page=publishproductyulan?p='+req.body.product_number);
            }else{
                res.redirect('optionpublish');
            }
            
        });
    });
}

/**
 * @deprecated
 */
exports.productListViewPublic = function (req, res) {

    var pse2 = "";
    if (req.session.pse2) {
        pse2 = req.session.pse2;
    } else {
        pse2 = "3";
    }
    res.locals.pse2 = pse2;

    var numStart = "";
    if (req.session.numStart1) {
        res.locals.numStart = req.session.numStart1;
        numStart = req.session.numStart1;
    } else {
        res.locals.numStart = "0";
        numStart = "0";
    }

    var datstart = "";
    if (req.session.datstart1) {
        res.locals.datstart = req.session.datstart1;
        datstart = req.session.datstart1;
    } else {
        res.locals.datstart = "*";
    }

    if (req.session.datstart1 == "*") {
        datstart = "";
    }

    var cf = "";
    if (req.session.cf1) {
        res.locals.cf = req.session.cf1;
        cf = req.session.cf1;
    } else {
        res.locals.cf = "";
    }
    if (req.session.cf1 == "*") {
        cf = "";
    }

    var mdd = "";
    if (req.session.mdd1) {
        res.locals.mdd = req.session.mdd1;
        mdd = req.session.mdd1;
    } else {
        res.locals.mdd = "";
    }
    if (req.session.mdd1 == "*") {
        mdd = "";
    }

    var txtCuriseCompany = "";
    if (req.session.txtCuriseCompany1) {
        res.locals.txtCuriseCompany = req.session.txtCuriseCompany1;
        txtCuriseCompany = req.session.txtCuriseCompany1;
    } else {
        res.locals.txtCuriseCompany = "";
    }
    if (req.session.txtCuriseCompany1 == "*") {
        txtCuriseCompany = "";
    }

    var ship_id = "";
    if (req.session.ship_id1) {
        res.locals.ship_id = req.session.ship_id1;
        ship_id = req.session.ship_id1;
    } else {
        res.locals.ship_id = "";
    }
    if (req.session.ship_id1 == "-") {
        ship_id = "";
    }

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    var product = new Product({
        numStart: numStart,
        datstart: datstart,
        cf: cf,
        mdd: mdd,
        txtCuriseCompany: txtCuriseCompany,
        ship_id: ship_id,
        pse2: pse2
    });
    product.get(function (result2) {
        if (nodeUtil.isError(result2)) {
            errHandler.responseError(result2, req, res);
            return false;
        }
        if ( !result2 || !result2[0] ) {
            var ps = new Preset_schedule({});
            ps.get(function (result7) {
                if (nodeUtil.isError(result7)) {
                    errHandler.responseError(result7, req, res);
                    return false;
                }
                var cc = new Cruisecompany({});
                cc.get(function (result8) {
                    if (nodeUtil.isError(result8)) {
                        errHandler.responseError(result8, req, res);
                        return false;
                    }
                    var cs = new Cruiseship({});
                    cs.get(function (result9) {
                        if (nodeUtil.isError(result9)) {
                            errHandler.responseError(result9, req, res);
                            return false;
                        }
                        var med = new Med({});
                        med.get(function (result10) {
                            if (nodeUtil.isError(result10)) {
                                errHandler.responseError(result10, req, res);
                                return false;
                            }
                            res.render('productpublic', {layout: false, product: result2, presetschedule:result7, total: 0, cruisecompany: result8, cruiseship: result9, med: result10});

                        });
                    });
                });
            });
            return false;
        }
        var productIds = "";
        for (var i in result2) {
            if (productIds) productIds += ",";
            productIds += result2[i].id;
        }
        var ts = new Travel_schedule({});
            ts.getByProductIds(productIds, function (result3) {
                if (nodeUtil.isError(result3)) {
                    errHandler.responseError(result3, req, res);
                    return false;
                }
                var inf = new Included_fee({});
                inf.getByProductIds(productIds, function (result4) {
                    if (nodeUtil.isError(result4)) {
                        errHandler.responseError(result4, req, res);
                        return false;
                    }
                    var pp = new Product_position({});
                    pp.getByProductIds(productIds, function (result5) {
                        if (nodeUtil.isError(result5)) {
                            errHandler.responseError(result5, req, res);
                            return false;
                        }
                        product.gettotal(function (result6) {
                            if (nodeUtil.isError(result6)) {
                                errHandler.responseError(result6, req, res);
                                return false;
                            }
                            var ps = new Preset_schedule({});
                            ps.get(function (result7) {
                                if (nodeUtil.isError(result7)) {
                                    errHandler.responseError(result7, req, res);
                                    return false;
                                }
                                var cc = new Cruisecompany({});
                                cc.get(function (result8) {
                                    if (nodeUtil.isError(result8)) {
                                        errHandler.responseError(result8, req, res);
                                        return false;
                                    }
                                    var cs = new Cruiseship({});
                                    cs.get(function (result9) {
                                        if (nodeUtil.isError(result9)) {
                                            errHandler.responseError(result9, req, res);
                                            return false;
                                        }
                                        var med = new Med({});
                                        med.get(function (result10) {
                                            if (nodeUtil.isError(result10)) {
                                                errHandler.responseError(result10, req, res);
                                                return false;
                                            }
                                            res.render('productpublic', {
                                                layout: false,
                                                product: result2,
                                                ts: result3,
                                                inf: result4,
                                                pp: result5,
                                                total: result6,
                                                presetschedule: result7,
                                                cruisecompany: result8,
                                                cruiseship: result9,
                                                med: result10
                                            });

                                        });
                                    });
                                });
                            });
                        });
                    });
                });
        });
    });
}
exports.productListPublic = function (req, res) {

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    new Med({}).get(function (cruiseAreas) {
        if (nodeUtil.isError(cruiseAreas)) {
            errHandler.responseError(cruiseAreas, req, res);
            return false;
        }
        res.render('productlistpublic', {layout: false, med: cruiseAreas});

    });

}