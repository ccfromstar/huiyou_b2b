var permission = require('./permission.js');
var User = require('../models/user.js');
var Med = require('../models/med.js');
var Cruisecompany = require('../models/cruisecompany.js');
var Cruiseship = require('../models/cruiseship.js');
var Product = require('../models/product.js');
var Province = require('../models/province.js');
var City = require('../models/city.js');
var Company = require('../models/company.js');
var Demand = require('../models/demand.js');
var Supply = require('../models/supply.js');
var Included_fee = require('../models/included_fee.js');
var Product_files = require('../models/product_files.js');
var Cabin_category = require('../models/cabin_category.js');
var Travel_schedule = require('../models/travel_schedule.js');
var Product_position = require('../models/product_position.js');
var Preset_schedule = require('../models/preset_schedule.js');
var Port = require('../models/port');
var TravelLocation = require('../models/travel_location.js');
var Booking = require('../models/booking.js');
var Booking_temp = require('../models/booking_temp.js');
var fs = require('fs');
var mysql = require('../models/db_mysql');
var news = require('../services/news.js');
var webservicesAuth = require('../services/public/webservicesAuth.js');
//var Common = require('../models/common.js');
var chat = require('./socket/chat.js');
var home = require('./home.js');
var booking = require('./booking.js');
var productCtr = require('./product_ctr.js');
var calendarCtr = require('./calendar_ctr.js');
var demandSupplyCtr = require('./demand_supply_ctr.js');
var userCtr = require('./user_ctr.js');
var email = require('./email.js');
var utils = require('./utils.js');
var errHandler = require('./error.js');
var nodeUtil = require('util');
var async = require('async');
var sms = require('./sms.js');
var setting = require('../models/setting.js');

/*function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)return;
    }
}*/

//function _responseJson(response, data){
//    response.setHeader("Cache-Control", "no-cache");
//    response.setHeader("Cache-Control", "no-store");
//    response.setHeader("Pragma", "no-cache");
//    response.json(data);
//}

exports.logout = function (req, res) {
    req.session.user = null;
    return res.redirect('/');
};

exports.useradmin = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('useradmin', {layout:"b_layout"});
};

exports.forgetpwd = function (req, res) {
    userCtr.forgetpwd(req, res);
}
/**
 * @deprecated
 */
exports.product = function (req, res, next) {
    productCtr.productView('product', req, res, next);
};

exports.productlist = function (req, res, next) {
    productCtr.productListView(req, res, next);
};
exports.productlistpublic = function (req, res, next) {
    productCtr.productListPublic(req, res, next);
};
exports.fetchProductsData = function (req, res, next) {
    var requiredByUser = (req.session&&req.session.user?true:false);
    productCtr.fetchProductsData(requiredByUser, req.query, function(result){
        res.json(result);
    });
};
exports.fetchProducts4Calendar = function (req, res, next) {
    console.log("req.session? " + (req.session?JSON.stringify(req.session):false));
    console.log("req.session.user? " + (req.session.user?req.session.user:false));
    var requiredByUser = (req.session&&req.query.user_id&&req.query.user_id>0&&req.session.user==req.query.user_id?true:false);
    var isPublic = !requiredByUser;
    console.log("isPublic? " + isPublic);
    calendarCtr.fetchProducts4Calendar(isPublic, function(result){
        res.json(result);
    });
};
exports.fetchNews = function (req, res, next) {
    var requiredByUser = (req.session&&req.session.user?true:false);
    news.fetchNews(requiredByUser, req.query, function(result){
        res.json(result);
    });
};
exports.getCityFilter = function (req, res, next) {
    new Port({}).getDeparturePortMap(function(map) {
        new TravelLocation({}).getStartLocation(function(cities) {
            res.json({cities: cities, port_map: map});
        });
    });
};
exports.getCruiseCompanyShipFilter = function (req, res, next) {
    new Cruisecompany({}).getNameWithCompanyNo(function (companies) {
        if (nodeUtil.isError(companies)) {
            errHandler.responseError(companies, req, res);
            return false;
        }
        new Cruiseship({}).getName2CompanyNo(function (ships) {
            if (nodeUtil.isError(ships)) {
                errHandler.responseError(ships, req, res);
                return false;
            }
            res.json({companies: companies, ships: ships});
        });
    });
};

exports.productoverseas = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
            } else {
                res.render('productoverseas', {layout: "layout", user: result, company: result1});
            }
        });
    });
}

exports.market = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    var datstart = "";
    if (req.session.datstart) {
        res.locals.datstart = req.session.datstart;
        datstart = req.session.datstart;
    } else {
        res.locals.datstart = "*";
    }

    if (req.session.datstart == "*") {
        datstart = "";
    }

    req.session.datstart = "*";

    var pse2 = "";
    if (req.session.pse2) {
        pse2 = req.session.pse2;
    } else {
        pse2 = "3";
    }
    res.locals.pse2 = pse2;
    req.session.pse2 = "";

    var cf = "";
    if (req.session.cf) {
        res.locals.cf = req.session.cf;
        cf = req.session.cf;
    } else {
        res.locals.cf = "";
    }
    if (req.session.cf == "*") {
        cf = "";
    }

    req.session.cf = "";

    var mdd = "";
    if (req.session.mdd) {
        res.locals.mdd = req.session.mdd;
        mdd = req.session.mdd;
    } else {
        res.locals.mdd = "";
    }
    if (req.session.mdd == "*") {
        mdd = "";
    }

    req.session.mdd = "";

    var txtCuriseCompany = "";
    if (req.session.txtCuriseCompany) {
        res.locals.txtCuriseCompany = req.session.txtCuriseCompany;
        txtCuriseCompany = req.session.txtCuriseCompany;
    } else {
        res.locals.txtCuriseCompany = "";
    }
    if (req.session.txtCuriseCompany == "*") {
        txtCuriseCompany = "";
    }

    req.session.txtCuriseCompany = "";

    var ship_id = "";
    if (req.session.ship_id) {
        res.locals.ship_id = req.session.ship_id;
        ship_id = req.session.ship_id;
    } else {
        res.locals.ship_id = "";
    }
    if (req.session.ship_id == "-") {
        ship_id = "";
    }
    if (req.session.ship_id == "*") {
        ship_id = "";
    }

    req.session.ship_id = "*";

    req.session.error = null;
    //console.log(req.session.datstart);
    var numStart = "";
    if (req.session.numStart) {
        res.locals.numStart = req.session.numStart;
        numStart = req.session.numStart;
    } else {
        res.locals.numStart = "0";
        numStart = "0";
    }
    req.session.numStart = "0";
    // console.log("run2");
    var key1 = "";
    if (req.session.skey) {
        res.locals.skey = req.session.skey;
        key1 = req.session.skey;
    } else {
        res.locals.skey = "";
        key1 = "";
    }

    if (!req.session.user) {
        res.render('cerror', {layout: false});
        return false;
    }

    permission.checkUserCache(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }

            var supply = new Supply({
                numStart: numStart,
                key: key1,
                datstart: datstart,
                cf: cf,
                mdd: mdd,
                txtCuriseCompany: txtCuriseCompany,
                ship_id: ship_id,
                pse2: pse2
            });
            supply.getbykey(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }

                supply.getTotalByKey(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var cruiseship = new Cruiseship();
                    cruiseship.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }

                        var cabin_category = new Cabin_category();
                        cabin_category.get(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }

                            var sql0 = "select * from preset_line";
                            mysql.query(sql0, function (err, rows0) {
                                if (err) {
                                    nodeUtil.error(err + ": " + sql0);
                                    errHandler.responseError(new Error(err), req, res);
                                    return false;
                                }

                                var cc = new Cruisecompany();
                                cc.get(function (result6) {
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
                                        var sql2 = "select * from user_company";
                                        mysql.query(sql2, function (err, rows2) {
                                            if (err) {
                                                errHandler.logErrorAndResponse(err, sql2, req, res);
                                                return false;
                                            }
                                            //res.render('publishproduct', {layout: "layout",supplyuser:rows2, user: result, company: result1, cruisecompany: result2, cruiseship: result3, med: result4, port: result5, cac: result6, ps: result7, prj: rows1});
                                            res.render('market', {layout: "layout",supplyuser:rows2, user: result, company: result1, supply: result2, total: result3, cruiseship: result4, cabin_category: result5, pline: rows0, cruisecompany: result6, presetschedule: result7});
                                    
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

exports.marketall = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    var  datstart = "";
    if(req.session.datstart){
        res.locals.datstart = req.session.datstart;
        datstart = req.session.datstart;
    }else{
        res.locals.datstart = "*";
    }

    if(req.session.datstart == "*"){
        datstart = "";
    }

    var pse2 = "";
    if(req.session.pse2){
        pse2 = req.session.pse2;
    }else{
        pse2 = "3";
    }
    res.locals.pse2 = pse2;

    var  cf = "";
    if(req.session.cf){
        res.locals.cf = req.session.cf;
        cf = req.session.cf;
    }else{
        res.locals.cf = "";
    }
    if(req.session.cf == "*"){
        cf = "";
    }

    var  mdd = "";
    if(req.session.mdd){
        res.locals.mdd = req.session.mdd;
        mdd = req.session.mdd;
    }else{
        res.locals.mdd = "";
    }
    if(req.session.mdd == "*"){
        mdd = "";
    }

    var  txtCuriseCompany = "";
    if(req.session.txtCuriseCompany){
        res.locals.txtCuriseCompany = req.session.txtCuriseCompany;
        txtCuriseCompany = req.session.txtCuriseCompany;
    }else{
        res.locals.txtCuriseCompany = "";
    }
    if(req.session.txtCuriseCompany == "*"){
        txtCuriseCompany = "";
    }

    var  ship_id = "";
    if(req.session.ship_id){
        res.locals.ship_id = req.session.ship_id;
        ship_id = req.session.ship_id;
    }else{
        res.locals.ship_id = "";
    }
    if(req.session.ship_id == "-"){
        ship_id = "";
    }
    if(req.session.ship_id == "*"){
        ship_id = "";
    }

    req.session.error = null;
    //console.log(req.session.datstart);
    var numStart =  "";
    if(req.session.numStart){
        res.locals.numStart = req.session.numStart;
        numStart =  req.session.numStart;
    }else{
        res.locals.numStart = "0";
        numStart = "0";
    }

    var  key1 = "";
    if(req.session.skey){
        res.locals.skey = req.session.skey;
        key1 = req.session.skey;
    }else{
        res.locals.skey = "";
        key1 = "";
    }

    if ( !req.session.user ) {
        res.render('cerror', {layout:false});
        return false;
    }

    permission.checkUser(req, res, function (result) {

        var company = new Company({id:result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var supply = new Supply({
                numStart:numStart,
                key:key1,
                datstart:datstart,
                cf:cf,
                mdd:mdd,
                txtCuriseCompany:txtCuriseCompany,
                ship_id:ship_id,
                pse2:pse2
            });
            supply.getbykey(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                supply.getallbykey(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var cruiseship = new Cruiseship();
                    cruiseship.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var cabin_category = new Cabin_category();
                        cabin_category.get(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                errHandler.responseError(result5, req, res);
                                return false;
                            }

                            var sql0 = "select * from preset_line";
                            mysql.query(sql0,function (err, rows0) {
                                if (err) {
                                    nodeUtil.error(err + ": " + sql0);
                                    errHandler.responseError(new Error(err), req, res);
                                    return false;
                                }
                                var cc = new Cruisecompany();
                                cc.get(function (result6) {
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
                                        res.render('marketall', {layout:"layout",user:result,company:result1,supply:result2,total:result3.length,cruiseship:result4,cabin_category:result5,pline:rows0,cruisecompany:result6,presetschedule:result7});
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

exports.marketbuyall = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    var numStart = "";
    if (req.session.numStart) {
        res.locals.numStart = req.session.numStart;
        numStart = req.session.numStart;
    } else {
        res.locals.numStart = "0";
        numStart = "0";
    }

    var key1 = "";
    if (req.session.skey) {
        res.locals.skey = req.session.skey;
        key1 = req.session.skey;
    } else {
        res.locals.skey = "";
        key1 = "";
    }

    req.session.skey = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var demand = new Demand({
                numStart: numStart,
                key: key1
            });
            demand.getbykey(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                demand.getallbykey(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                    } else {
                        res.render('marketbuyall', {layout: "layout", user: result, company: result1, demand: result2, total: result3.length});
                    }
                });
            });

        });
    });
}

exports.marketbuy = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    var numStart = "";
    if (req.session.numStart) {
        res.locals.numStart = req.session.numStart;
        numStart = req.session.numStart;
    } else {
        res.locals.numStart = "0";
        numStart = "0";
    }
    req.session.numStart = "0";

    var key1 = "";
    if (req.session.skey) {
        res.locals.skey = req.session.skey;
        key1 = req.session.skey;
    } else {
        res.locals.skey = "";
        key1 = "";
    }

    req.session.skey = null;

    permission.checkUser(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var demand = new Demand({
                numStart: numStart,
                key: key1
            });
            demand.getbykey(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                demand.getallbykey(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    } else {
                        res.render('marketbuy', {layout: "layout", user: result, company: result1, demand: result2, total: result3.length});
                    }
                });
            });
        });
    });
}

exports.option = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUserCache(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                res.render('option', {layout: "layout", user: result, company: result1, user1: result2});

            });
        });
    });
}

exports.optioncompany = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    var e = req.session.error;
    console.log(e);
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                } else {
                    res.render('optioncompany', {layout: "layout", user: result, company: result1, user1: result2,e:e});
                }
            });
        });
    });
}

exports.optionhistory = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                } else {
                    res.render('optionhistory', {layout: "layout", user: result, company: result1, user1: result2});
                }
            });
        });
    });
}

exports.optionpublish = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                //2014-11-26把我的代码改错了
                /*
                var product = new Product({owner_id: req.session.user});
                product.getByOwnerId(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    //console.log("result3:"+result3);
                });
                */
                var sqltemp = "select * from product_list order by published_at desc";
                    mysql.query(sqltemp, function (err, result3) {
                        if (err) {
                                    errHandler.logErrorAndResponse(err, sqltemp, req, res);
                                    return false;
                        }else{
                                    res.render('optionpublish', {layout: "layout", user: result, company: result1, user1: result2, product: result3});
                    }
                });
                
            });
        });
    });
}

exports.optionpublish1 = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var supply = new Supply({key: req.session.user});
                supply.getallbyuser(function (result4) {
                    if (nodeUtil.isError(result4)) {
                        errHandler.responseError(result4, req, res);
                        return false;
                    }
                    res.render('optionpublish1', {layout: "layout", user: result, company: result1, user1: result2, supply: result4});

                });
            });
        });
    });
}

exports.optionpublish2 = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var demand = new Demand({key: req.session.user});
                demand.getallbyuser(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                    } else {
                        res.render('optionpublish2', {layout: "layout", user: result, company: result1, user1: result2, demand: result3});
                    }
                });
            });
        });
    });
}

exports.optionorder = function (req, res) {
    booking.optionorder(req, res);

};

exports.optionordersell = function (req, res) {
    booking.optionordersell(req, res);
};

exports.optionaccount = function (req, res) {
    res.locals.user = req.session.user;
    var e = req.session.error;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                } else {
                    res.render('optionaccount', {layout: "layout", user: result, company: result1, user1: result2,e:e});
                }
            });
        });
    });
}

exports.optionweixin = function (req, res) {
    res.locals.user = req.session.user;
    var e = req.session.error;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                } else {
                    res.render('optionweixin', {layout: "layout", user: result, company: result1, user1: result2,e:e});
                }
            });
        });
    });
}

exports.help = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                mysql.query("select * from faq", function (err, rows2) {
                    res.render('help', {layout: "layout", user: result, company: result1, user1: result2, r: rows2});
                });
            });
        });
    });
}

exports.message2 = function (req, res) {
    chat.renderChat(req, res, 'chat/layout2');
};

exports.message = function (req, res) {
    chat.renderChat(req, res, 'chat/layout');
};

exports.welcome = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.user = null;
    //检查用户是否登陆过，如果登陆了就不需要重复登陆
        res.render('welcome', {layout:"home_layout"});
    
};

exports.useradmin = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('useradmin', {layout:"b_layout"});
};

exports.userregist = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var province = new Province();
    province.get(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        var city = new City();
        city.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
            } else {
                res.render('userregist', {layout: "home_layout", province: result, city: result1});
            }
        });
    });
}

//-------------------------do操作--------------------------------------------------

exports.logindo = function (req, res) {
    userCtr.login(req, res);
}

/* 发布尾舱需求信息 */
exports.marketbuydo = function (req, res) {
    demandSupplyCtr.publishDemand(req, res);
}

/* 发布尾舱供应信息 */
exports.marketdo = function (req, res) {
    demandSupplyCtr.publishSupply(req, res);
}

exports.regsuccess = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('regsuccess', {layout:"home_layout"});

};

exports.errorreturn = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('errorreturn', {layout:false});

};



exports.regdo = function (req, res) {
     userCtr.registNewUser(req, res);
};

exports.getuserdata = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var newUser = new User({});
    newUser.get(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
        } else {
            res.render('getuserdata', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.useradmindo = function (req, res) {
    var newUser = new User({
        docid: req.body['docid']
    });
    newUser.delete(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        res.redirect('/useradmin');
    });
}

exports.deleteuser = function (req, res) {
    var newUser = new User({
        docid:req.param("docid")
    });
    nodeUtil.log("delete user " + req.param("docid"));
    newUser.delete(function (result) {
        if (nodeUtil.isError(result)) {
            res.render('deleteuser', {layout:false,info:"删除失败！"});
        } else {
            res.render('deleteuser', {layout:false,info:"删除成功！"});
        }
    });
};

exports.getsearchdata = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var newUser = new User({
        docid: req.query.sid
    });
    newUser.getbykey(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        res.render('getuserdata', {datasource: result, layout: false, page: req.param("page"), rows: req.param("rows")});
    });
}

/*exports.useredit = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    var newUser = new User({
        docid: req.query.id
    });
    newUser.getbyid(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        res.render('useredit', {datasource: result, layout: "b_layout", title: '编辑'});

    });
}*/

/*exports.usereditdo = function (req, res) {

    var newUser = new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        loginname: req.body.loginname,
        activated: req.body.activated,
        certified: req.body.certified,
        docid:req.body.docid
    });
    newUser.update(function (err) {

        if (err == "error") {
            console.log("error!");

        }
        //req.session.user = newUser;
        nodeUtil.log("edit user successful!");
        req.session.error = "用户修改成功!";
        res.redirect('loading?page=success');
    });
};*/

exports.success = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('loading?page=success', {layout:"b_layout"});
};

exports.userdominomanagement = function (req, res) {
    if (req.query.id){
        req.session.user = req.query.id;
    }
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    if (req.session.user) {
        var newUser = new User({
            id: req.session.user
        });
        newUser.checkSysAdmin(function (result) {
            if (nodeUtil.isError(result)) {
                errHandler.responseError(result, req, res);
                return false;
            }
            if (result.is_sys_admin) {
                res.render('userdominomanagement', {
                    title: '管理员主界面',
                    layout: false
                });
            } else {
                res.render('cerror', {
                    title: '错误',
                    layout: false
                });
            }
        });

    } else {
        res.render('cerror', {
            title: '错误',
            layout: false
        });
    }
}

exports.b_product = function (req, res) {
    permission.checkAdmin(req, res, function(isAdmin) {
        if (isAdmin) {
            res.render('b_product', {layout: "b_layout"});
        } else {
            res.redirect('error');
        }
    });
};

exports.b_user = function (req, res) {
    permission.checkAdmin(req, res, function(isAdmin){
        if(isAdmin){
            res.render('b_user', {layout:"b_layout"});
        } else {
            res.redirect('error');
        }
    });
};

exports.getdata = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var user = new User({});
    user.getall(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
        } else {
            res.render('getdata', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.getdata1 = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var p = new Product({});
    p.getbacksystemlist(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
        } else {
            res.render('getdata1', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.reginfo = function (req, res) {
    res.locals.user = req.session.user;
    console.log(req.session.user);
    res.locals.error = req.session.error;
    req.session.error = null;
    var user = new User({id:req.query.id});
    user.get(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
        } else {
            var company = new Company({id:result[0].company_id});
            company.get(function (result1) {
                if (nodeUtil.isError(result1)) {
                    errHandler.responseError(result1, req, res);
                } else {
                    res.render('reginfo', {layout:false,user:result,company:result1});
                }
            });
        }
    });
};

/*验证用户*/
exports.reginfodo = function (req, res) {
    userCtr.confirmNewUser(req, res);
}

exports.publishproduct = function (req, res) {
    productCtr.publishproduct(req, res);
};

exports.publishproductdo = function (req, res) {
    productCtr.publishproductdo(req, res);
}

exports.publishproductyulan = function (req, res) {
    productCtr.publishproductyulan(req, res);
};

exports.publishproductyulando = function (req, res) {
    productCtr.publishproductyulando(req, res);
}

exports.publishproductsuccess = function (req, res) {
    productCtr.publishproductsuccess(req, res);
};

exports.productbookingsuccess = function (req, res) {
    booking.productbookingsuccess(req, res);
};

exports.productbookingsavesuccess = function (req, res) {
    booking.productbookingsavesuccess(req, res);
};

exports.productdetail = function (req, res) {
    productCtr.productdetail(req, res);
}

exports.productbooking = function (req, res) {
    booking.productbooking(req, res);
};

exports.productbookingdo = function (req, res) {
    booking.productbookingdo(req, res);
}

exports.optionpwddo = function (req, res) {
    userCtr.changePassword(req, res);
}

exports.optiondo = function (req, res) {
    userCtr.adminSubUser(req, res);
}

exports.productdetaildo = function (req, res) {
    //预定的时候清空所有的临时文件
    var sql2 = "delete from booking_temp where user_id = "+req.body.cuserid;
    mysql.query(sql2,function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + sql2);
            errHandler.responseError(err, req, res);
            return false;
        }
        //insert booking recorder
        var o = req.body;
        var a1 = o.cabin_type_id.split("@");
        var a2 = o.cabin_category_id.split("@");
        var a3 = o.retail_price.split("@");
        var a4 = o.retail_price_2.split("@");
        var a5 = o.price_child.split("@");
        var a6 = o.buynum.split("@");
        var a7 = o.product_position_id.split("@");
        for(var i=0;i<a1.length;i++){
            for(var j=0;j<Number(a6[i]);j++){
                var sql1 = "insert into booking_temp (user_id,product_position_id,product_id,cabin_type_id,cabin_category_id,retail_price,retail_price_2,price_child) values("+req.body.cuserid+","+ a7[i]+","+ o.product_id+","+a1[i]+","+a2[i]+","+a3[i]+","+a4[i]+","+a5[i]+")";
                mysql.query(sql1,function (err, rows) {
                    if (err) {
                        nodeUtil.error(err + ": " + sql1);
                        //TODO emit error to user
                        return false;
                    }
                });
            }
        }
        res.redirect("productbooking?p="+req.body.product_number);
    });
}

exports.optionpublish2do = function (req, res) {
    var sql1 = "update demand set status_id =3 where id="+req.body.docid;
    mysql.query(sql1,function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + sql1);
            errHandler.responseError(err, req, res);
            return false;
        }
        req.session.error = "修改成功！";
        res.redirect("loading?page=optionpublish2");
    });
}

exports.optionpublish1do = function (req, res) {
    var sql1 = "update supply set status_id =3 where id="+req.body.docid;
    mysql.query(sql1,function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + sql1);
            errHandler.responseError(err, req, res);
            return false;
        }
        req.session.error = "修改成功！";
        res.redirect("loading?page=optionpublish1");
    });
}

exports.optionpublishdo = function (req, res) {
    if(req.body.stype=="down"){
        var sql1 = "update product set status_id =4 where id="+req.body.docid;
    }else if(req.body.stype=="close"){
        var sql1 = "update product set status_id =6 where id="+req.body.docid;
    }else if(req.body.stype=="delete"){
        var sql1 = "update product set status_id =5 where id="+req.body.docid;
    }

    mysql.query(sql1,function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + sql1);
            errHandler.responseError(err, req, res);
            return false;
        }
        req.session.error = "操作成功！";
        res.redirect("loading?page=optionpublish");
    });
}

exports.optionedit1do = function (req, res) {
    var sql1 = "update demand set description ='"+req.body.description+"' where id="+req.body.docid;
    mysql.query(sql1,function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + sql1);
            errHandler.responseError(new Error(err), req, res);
            return false;
        }
        req.session.error = "修改成功！";
        res.redirect("loading?page=optionpublish2");
    });
}

exports.optionedit1 = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var demand = new Demand({
                key: req.query.p
            });
            demand.getbyid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.error("optionedit1: demand.getbyid failed!" + result2);
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                res.render('optionedit1', {layout: "layout", user: result, company: result1, demand: result2});

            });
        });
    });
};

exports.optionedit2 = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var supply = new Supply({
                key: req.query.p
            });
            supply.getbyid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.error("optionedit2: supply.getbyid failed!");
                    errHandler.responseError(result2, req, res);
                    return false;
                }

                var cruiseship = new Cruiseship();
                cruiseship.get(function (result4) {
                    if (nodeUtil.isError(result4)) {
                        nodeUtil.error("optionedit2: cruiseship.get failed!");
                        errHandler.responseError(result4, req, res);
                        return false;
                    }
                    var cabin_category = new Cabin_category();
                    cabin_category.get(function (result5) {
                        if (nodeUtil.isError(result5)) {
                            nodeUtil.error("optionedit2: cabin_category.get failed!");
                            errHandler.responseError(result5, req, res);
                            return false;
                        }
                        res.render('optionedit2', {layout: "layout", user: result, company: result1, supply: result2, cruiseship: result4, cabin_category: result5});

                    });
                });

            });
        });
    });
};

exports.optionedit2do = function (req, res) {
    var n = utils.getNow();
    //得到图片格式后缀
    var a1 = req.files.img_url.name;

    var tmp1 = a1.split(".");
    var pic1 = "." + tmp1[tmp1.length - 1];

    var fname = n + "@" + req.body.unid + pic1;
    if (a1 == "") {
        fname = req.body.img_url_old;
    }

    var supply = new Supply({
        owner_id: req.body.owner_id,
        ship_id: req.body.ship_id,
        departure_date: req.body.departure_date,
        day: req.body.day,
        cruise_route: req.body.cruise_route,
        cabin_category_id: req.body.cabin_category_id,
        amount: req.body.amount,
        price_now: req.body.price_now,
        price_old: req.body.price_old,
        description: req.body.description,
        img_url: fname,
        created_at: req.body.created_at
    });
    var sql1 = "delete from supply where id=" + req.body.docid;
    mysql.query(sql1, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + sql1);
            errHandler.responseError(new Error(err), req, res);
            return false;
        }
        supply.upsave(function (result) {
            if (nodeUtil.isError(err)) {
                errHandler.responseError(result, req, res);
                return false;
            }
            if (req.files.img_url.name !== "") {
                //附件操作
                // 获得文件的临时路径
                var tmp_path = req.files.img_url.path;
                // 指定文件上传后的目录 - 示例为"images"目录。
                var target_path = './public/files/' + fname;
                // 移动文件
                fs.rename(tmp_path, target_path, function (err) {
                    if (err) {
                        nodeUtil.error(err);
                        errHandler.responseError(err, req, res);
                        return false;
                    }
                    // 删除临时文件夹文件,
                    fs.unlink(tmp_path, function () {
                        if (err) {
                            nodeUtil.error(err);
                            errHandler.responseError(err, req, res);
                            return false;
                        }
                        req.session.error = "修改成功！";
                        res.redirect('loading?page=optionpublish1');
                    });
                });
            } else {
                req.session.error = "修改成功！";
                res.redirect('loading?page=optionpublish1');
            }

        });
    });
}

exports.optionopen1 = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                nodeUtil.error("optionopen1: company.get failed!");
                errHandler.responseError(result1, req, res);
                return false;
            }
            var demand = new Demand({
                key: req.query.p
            });
            demand.getbyid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.error("optionopen1: demand.getbyid failed!");
                    errHandler.responseError(result2, req, res);
                } else {
                    res.render('optionopen1', {layout: "layout", user: result, company: result1, demand: result2});
                }
            });
        });
    });
};

exports.optionopen2 = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id:result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                nodeUtil.error("optionopen2: company.get failed!");
                errHandler.responseError(result1, req, res);
                return false;
            }
            var supply = new Supply({
                key:req.query.p
            });
            supply.getbyid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.error("optionopen2: supply.getbyid failed!");
                    errHandler.responseError(result2, req, res);
                    return false;
                }

                var cruiseship = new Cruiseship();
                cruiseship.get(function (result4) {
                    if (nodeUtil.isError(result4)) {
                        nodeUtil.error("optionopen2: cruiseship.get failed!");
                        errHandler.responseError(result4, req, res);
                        return false;
                    }
                    var cabin_category = new Cabin_category();
                    cabin_category.get(function (result5) {
                        if (nodeUtil.isError(result5)) {
                            nodeUtil.error("optionopen2: cabin_category.get failed!");
                            errHandler.responseError(result5, req, res);
                            return false;
                        }
                        res.render('optionopen2', {layout:"layout",user:result,company:result1,supply:result2,cruiseship:result4,cabin_category:result5});

                    });
                });

            });
        });
    });
};

exports.optionadmin = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                nodeUtil.error("optionadmin: company.get failed!");
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.error("optionadmin: user1.getadminbycompid failed!");
                    errHandler.responseError(result2, req, res);
                    return false;
                } else {
                    res.render('optionadmin', {layout: "layout", user: result, company: result1, user1: result2});
                }
            });
        });
    });
};

exports.optionpwd = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                nodeUtil.error("optionpwd: company.get failed!");
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.error("optionpwd: user1.getadminbycompid failed!");
                    errHandler.responseError(result2, req, res);
                    return false;
                } else {
                    res.render('optionpwd', {layout: "layout", user: result, company: result1, user1: result2});
                }
            });

        });
    });
};

exports.publishproductedit = function (req, res) {
    productCtr.publishproductedit(req, res);
};

exports.productdetailbooking = function (req, res) {
    productCtr.productdetailbooking(req, res);
};

exports.publishproductread = function (req, res) {
    productCtr.publishproductread(req, res);
};

exports.b_productdo = function (req, res) {
    productCtr.approve(req, res);
};

exports.approveProduct = function (req, res) {
    productCtr.approveProduct(req, res);
};

exports.productbookingread = function (req, res) {
    booking.productbookingread(req, res);
};

exports.productbookingreadxs = function (req, res) {
    booking.productbookingreadxs(req, res);
};

exports.productbookingreadxsdo = function (req, res) {
    booking.productbookingreadxsdo(req, res);
}

exports.productbookingreaddo = function (req, res) {
    booking.productbookingreaddo(req, res);
}

exports.redirect = function (req, res) {
    console.log(req.session.user);
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            //save access info
            var insql = "insert into log_user_access(user_id,time,ip) values("+result[0].id+",'"+getNow()+"','"+getClientIp(req)+"')";
            console.log(insql);
            mysql.query(insql,function (err, rows) {
                res.render('redirect', {layout: false, user: result, company: result1});
            });
        });
    });
}

function getNow(){
    var date = new Date(); //日期对象
    var now = "";
    now = date.getFullYear()+"-";
    now = now + (date.getMonth()+1)+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
    now = now + date.getDate()+" ";
    now = now + date.getHours()+":";
    now = now + date.getMinutes()+":";
    now = now + date.getSeconds()+"";
    return now;
}

function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

exports.publishproductmenu = function (req, res) {
    productCtr.publishproductmenu(req, res);
};

exports.home = function(req, res){
    home.renderHome(req, res);
};

exports.productdo = function (req, res) {
        //判断是否有删选条件
        req.session.datstart1 = req.body.datStart;
        req.session.cf1 = req.body.cf;
        req.session.mdd1 = req.body.mdd;
        req.session.txtCuriseCompany1 = req.body.txtCuriseCompany;
        req.session.ship_id1 = req.body.ship_id;
        req.session.pse2 = req.body.orderby1;
        req.session.numStart1 = req.body.numStart;
        res.redirect('loading?page=product');
}

exports.loading = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    res.render('loading', {layout:false});
};

exports.publichome = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    res.render('publichome', {layout:false});
};



//exports.homepage = function (req, res) {
//
//    permission.checkUser(req, res, function (result) {
//
//            var p = new Product({});
//            p.getcal(function (result2) {
//                if (nodeUtil.isError(result2)) {
//                    errHandler.responseError(result2, req, res);
//                    return false;
//                }
//                var pp = new Product_position({});
//                pp.getall(function (result3) {
//                    if (nodeUtil.isError(result3)) {
//                        errHandler.responseError(result3, req, res);
//                        return false;
//                    }
//                    var ts = new Travel_schedule({});
//                    ts.getallbynohh(function (result4) {
//                        if (nodeUtil.isError(result4)) {
//                            errHandler.responseError(result4, req, res);
//                            return false;
//                        }
//                        var supply = new Supply({});
//                        supply.get(function (result5) {
//                            if (nodeUtil.isError(result5)) {
//                                errHandler.responseError(result5, req, res);
//                                return false;
//                            }
//                            var demand = new Demand({});
//                            demand.get(function (result6) {
//                                if (nodeUtil.isError(result6)) {
//                                    errHandler.responseError(result6, req, res);
//                                    return false;
//                                }
//                                res.render('homepage', {
//                                    layout: "layout", demand: result6, supply: result5,
//                                    p: result2, pp: result3, ts: result4
//                                });
//
//                            });
//                        });
//                    });
//                });
//            });
//        });
//}
exports.homepage = function (req, res) {
    permission.checkUser(req, res, function (result) {
            var myDate = new Date();
            var y = myDate.getFullYear(); 
            var m = (((myDate.getMonth()+1)+"").length==1)?"0"+(myDate.getMonth()+1):(myDate.getMonth()+1);
            var d = (((myDate.getDate())+"").length==1)?"0"+(myDate.getDate()):(myDate.getDate());
            var _today = y +"-"+ m +"-"+ d;
            var sql1 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and special = 1 order by start_date asc";
            var sql2 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and early_booking = 1 order by start_date asc";
            var sql3 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and cheap = 1 order by start_date asc";
            var sql4 = "select product_id,location from travel_schedule order by day_number asc";
            var sql5 = "select product_id,retail_price from product_position";
            mysql.query(sql1, function (err, rows1) {
                if (err) {
                    nodeUtil.error(err + ": " + sql1);
                    errHandler.responseError(new Error(err), req, res);
                    return false;
                }
                mysql.query(sql2, function (err, rows2) {
                    if (err) {
                        nodeUtil.error(err + ": " + sql2);
                        errHandler.responseError(new Error(err), req, res);
                        return false;
                    }
                    mysql.query(sql3, function (err, rows3) {
                        if (err) {
                            nodeUtil.error(err + ": " + sql3);
                            errHandler.responseError(new Error(err), req, res);
                            return false;
                        }
                        mysql.query(sql4, function (err, rows4) {
                            if (err) {
                                nodeUtil.error(err + ": " + sql4);
                                errHandler.responseError(new Error(err), req, res);
                                return false;
                            }
                            mysql.query(sql5, function (err, rows5) {
                                if (err) {
                                    nodeUtil.error(err + ": " + sql5);
                                    errHandler.responseError(new Error(err), req, res);
                                    return false;
                                }
                                res.render('homepage', {
                                    layout: "layout",
                                    user: result[0],
                                    p1:rows1,
                                    p2:rows2,
                                    p3:rows3,
                                    ts:rows4,
                                    pj:rows5
                                });
                            });    
                        });
                    });
                });
            });        
    });
}

/**
 * @deprecated
 */
exports.productpublic = function (req, res) {
    productCtr.productListViewPublic(req, res);
};


exports.homepagepublic = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    var p = new Product({});
    p.getcal(function (result2) {
        if (nodeUtil.isError(result2)) {
            errHandler.responseError(result2, req, res);
            return false;
        }
        var pp = new Product_position({});
        pp.getall(function (result3) {
            if (nodeUtil.isError(result3)) {
                errHandler.responseError(result3, req, res);
                return false;
            }
            var ts = new Travel_schedule({});
            ts.getallbynohh(function (result4) {
                if (nodeUtil.isError(result4)) {
                    errHandler.responseError(result4, req, res);
                    return false;
                }
    //TODO need supply demand?
                var supply = new Supply({});
                supply.get(function (result5) {
                    if (nodeUtil.isError(result5)) {
                        errHandler.responseError(result5, req, res);
                        return false;
                    }
                    var demand = new Demand({});
                    demand.get(function (result6) {
                        if (nodeUtil.isError(result6)) {
                            errHandler.responseError(result6, req, res);
                            return false;
                        }
                        res.render('homepagepublic', {layout: false, p: result2, demand: result6, supply: result5, pp: result3, ts: result4});

                    });
                });
            });
        });
    });
}

/**
 * @deprecated
 */
exports.productpublicdo = function (req, res) {
        //判断是否有删选条件
        req.session.datstart1 = req.body.datStart;
        req.session.cf1 = req.body.cf;
        req.session.mdd1 = req.body.mdd;
        req.session.txtCuriseCompany1 = req.body.txtCuriseCompany;
        req.session.ship_id1 = req.body.ship_id;
        req.session.pse2 = req.body.orderby1;
        req.session.numStart1 = req.body.numStart;
        res.redirect('loading?page=productpublic');
}

exports.productbookingprint = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var booking = new Booking({id: req.query.p});
            booking.getbyid(function (result10) {
                if (nodeUtil.isError(result10)) {
                    errHandler.responseError(result10, req, res);
                    return false;
                }
                var product = new Product({pid: result10[0].product_number});
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
                                    var qq = new Booking_temp({id: result2[0].id});
                                    qq.get(function (result7) {
                                        if (nodeUtil.isError(result7)) {
                                            errHandler.responseError(result7, req, res);
                                            return false;
                                        }
                                        var province = new Province();
                                        province.get(function (result8) {
                                            if (nodeUtil.isError(result8)) {
                                                errHandler.responseError(result8, req, res);
                                                return false;
                                            }
                                            var city = new City();
                                            city.get(function (result9) {
                                                if (nodeUtil.isError(result9)) {
                                                    errHandler.responseError(result9, req, res);
                                                    return false;
                                                }
                                                var sql1 = "select * from booking_position_proid where booking_id = " + req.query.p + " order by roomNo asc";
                                                mysql.query(sql1, function (err, rows) {
                                                    if (err) {
                                                        nodeUtil.error(err + ": " + sql1);
                                                        errHandler.responseError(new Error(err), req, res);
                                                        return false;
                                                    }
                                                    var sql2 = "select * from booking_passenger";
                                                    mysql.query(sql2, function (err, rows1) {
                                                        if (err) {
                                                            nodeUtil.error(err + ": " + sql2);
                                                            errHandler.responseError(new Error(err), req, res);
                                                            return false;
                                                        }
                                                        var sql3 = "select * from user where role_sys_user = 1";
                                                        mysql.query(sql3, function (err, rows2) {
                                                            if (err) {
                                                                nodeUtil.error(err + ": " + sql3);
                                                                errHandler.responseError(new Error(err), req, res);
                                                                return false;
                                                            }
                                                            var sql4 = "select * from booking_status_date where booking_id = " + req.query.p;
                                                            mysql.query(sql4, function (err, rows3) {
                                                                if (err) {
                                                                    nodeUtil.error(err + ": " + sql4);
                                                                    errHandler.responseError(new Error(err), req, res);
                                                                    return false;
                                                                }
                                                                var sql5 = "select * from booking_files where booking_id = " + req.query.p;
                                                                mysql.query(sql5, function (err, rows4) {
                                                                    if (err) {
                                                                        nodeUtil.error(err + ": " + sql5);
                                                                        errHandler.responseError(new Error(err), req, res);
                                                                        return false;
                                                                    }
                                                                    var sql6 = "select * from product_insurance where product_id = " + result2[0].id;
                                                                    mysql.query(sql6, function (err, rows5) {
                                                                        if (err) {
                                                                            nodeUtil.error(err + ": " + sql6);
                                                                            errHandler.responseError(new Error(err), req, res);
                                                                            return false;
                                                                        }
                                                                        res.render('productbookingprint', {layout: false, pi: rows5, bf: rows4, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, no: utils.getNow(), qq: result7, province: result8, city: result9, booking: result10, cc: rows, cc1: rows1, cc2: rows2, bsd: rows3});
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
    });
}

exports.optionorderall = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {

                var company = new Company({id:result[0].company_id});
                company.get(function (result1) {
                    if (nodeUtil.isError(result1)) {
                        errHandler.responseError(result1, req, res);
                        return false;
                    }
                        var user1 = new User({id:result[0].company_id});
                        user1.getadminbycompid(function (result2) {
                            if (nodeUtil.isError(result2)) {
                                errHandler.responseError(result2, req, res);
                                return false;
                            }
                                var booking = new Booking({});
                                booking.getall(function (result3) {
                                    if (nodeUtil.isError(result3)) {
                                        errHandler.responseError(result3, req, res);
                                        return false;
                                    }
                                        var sql1 = "select * from booking_position_proid order by txtCabinName desc";
                                        mysql.query(sql1,function (err, rows) {
                                            if (err) {
                                                nodeUtil.error(err + ": " + sql1);
                                                errHandler.responseError(new Error(err), req, res);
                                                return false;
                                            }
                                            var sql2 = "select * from booking_passenger";
                                            mysql.query(sql2,function (err, rows1) {
                                                if (err){
                                                    nodeUtil.error(err + ": " + sql2);
                                                    errHandler.responseError(new Error(err), req, res);
                                                    return false;
                                                }
                                                 var sql4 = "select * from booking_status_date";
                                                 mysql.query(sql4,function (err, rows3) {
                                                     if (err){
                                                         nodeUtil.error(err + ": " + sql4);
                                                         errHandler.responseError(new Error(err), req, res);
                                                         return false;
                                                     }
                                                    res.render('optionorderall', {layout:"layout",bsd:rows3,user:result,company:result1,user1:result2,booking:result3,cc:rows,cc1:rows1});
                                                 });
                                            });
                                        });
                                });
                        });

                });
        });
};

exports.optionordersellall = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            var user1 = new User({id: result[0].company_id});
            user1.getadminbycompid(function (result2) {
                if (nodeUtil.isError(result2)) {
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var booking = new Booking({});
                booking.getall(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var sql1 = "select * from booking_position_proid order by txtCabinName desc";
                    mysql.query(sql1, function (err, rows) {
                        if (err) {
                            nodeUtil.error(err + ": " + sql1);
                            errHandler.responseError(new Error(err), req, res);
                            return false;
                        }
                        var sql2 = "select * from booking_passenger";
                        mysql.query(sql2, function (err, rows1) {
                            if (err) {
                                nodeUtil.error(err + ": " + sql2);
                                errHandler.responseError(new Error(err), req, res);
                                return false;
                            }
                            var sql4 = "select * from booking_status_date";
                            mysql.query(sql4, function (err, rows3) {
                                if (err) {
                                    nodeUtil.error(err + ": " + sql4);
                                    errHandler.responseError(new Error(err), req, res);
                                    return false;
                                }
                                res.render('optionordersellall', {layout: "layout", bsd: rows3, user: result, company: result1, user1: result2, booking: result3, cc: rows, cc1: rows1});
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.aboutus = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");

    res.render('aboutus', {layout:false});
};

exports.marketalldo = function (req, res) {
    var sql1 = "update supply set status_id = 4 where id="+req.body.docid;
    mysql.query(sql1,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + sql1);
            errHandler.responseError(new Error(err), req, res);
            return false;
        }
        req.session.error = "删除成功！";
        res.redirect("loading?page=marketall");
    });
}

exports.marketbuyalldo = function (req, res) {
    var sql1 = "update demand set status_id = 4 where id="+req.body.docid;
    mysql.query(sql1,function (err, rows) {
        if (err){
            errHandler.logErrorAndResponse(err, sql1, req, res);
            return false;
        }
        req.session.error = "删除成功！";
        res.redirect("loading?page=marketbuyall");
    });
}

exports.linelist = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
            } else {
                var q = "select * from line_list";
                mysql.query(q, function (err, rows2) {
                    if (err){
                        errHandler.logErrorAndResponse(err, q, req, res);
                        return false;
                    }
                    res.render('linelist', {layout: "layout", user: result, company: result1, r: rows2});
                });
            }
        });
    });
}

exports.optionaccountdo = function (req, res) {
    var sql1 = "update company set account_name = '"+req.body.account_name+"',account_number='"+req.body.account_number+"',bank='"+req.body.bank+"' where id="+req.body.docid;
    mysql.query(sql1,function (err, rows) {
        if (err){
            errHandler.logErrorAndResponse(err, sql1, req, res);
            return false;
        }
        //发送邮件给booking@huiyoulun.com提示用户修改了公司财务信息
        email.sendSystemMail("booking@huiyoulun.com", 
        "荟邮轮提示信息",
        req.body.publishid + "修改了公司的财务信息，请注意查看");
        req.session.error = "修改成功！";
        console.log(req.session.error);
        res.redirect("optionaccount");
    });
}

exports.optioncompanydo = function (req, res) {
    var op = req.files; 
    
    var logopath = "";

    var logosql = "";



    if(op.logo.name!=""){
        logopath = op.logo.path.replace("public\\files\\","").replace("public/files/","");
        logosql = ",logo='"+logopath+"'";
    }

    var sql1 = "update company set short_name = '"+req.body.short_name+"',address='"+req.body.address+"',telephone_area_code='"+req.body.telephone_area_code+"',telephone='"+req.body.telephone+"',fax='"+req.body.fax+"'"+logosql+" where id="+req.body.docid;
    console.log(sql1);
    mysql.query(sql1,function (err, rows) {
        if (err){
            errHandler.logErrorAndResponse(err, sql1, req, res);
            return false;
        }
         //发送邮件给booking@huiyoulun.com提示用户修改了公司信息
        email.sendSystemMail("booking@huiyoulun.com", 
        "荟邮轮提示信息",
        req.body.publishid + "修改了公司的信息，请注意查看");
        req.session.error = "修改成功！";
        res.redirect("optioncompany");
    });
}

//优化前的routedownload
/*
exports.routedownload = function (req, res) {
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
                                        nodeUtil.error(err + ": " + sql);
                                        errHandler.responseError(new Error(err), req, res);
                                        return false;
                                    }
                                    if (result2[0].service_by_huiyou == '1') {
                                        setting.getServiceManager(function (managerUserId) {
                                            if (nodeUtil.isError(managerUserId)) {
                                                errHandler.responseError(managerUserId, req, res);
                                                return false;
                                            }
                                            res.render('routedownload', {layout: false, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, bx: rows, service_user_id: managerUserId});
                                        });
                                    } else {
                                        res.render('routedownload', {layout: false, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, bx: rows});
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
*/

//waterfall优化后的routedownload
exports.routedownload = function (req, res) {
    //如果是游客，查看到的信息就是游客的
    if(!req.session.user){
        req.session.user = "24";
    }
    async.waterfall([
        function(callback){
            permission.checkUser(req, res, function (result) {
                res.locals.user = result;
                callback(null,result);
            });
        },
        function(result,callback){
            var company = new Company({id: result[0].company_id});
            company.get(function (result1) {
                nodeUtil.isError(result1)?callback(result1):res.locals.company = result1;callback(null,result1);
            });
        },
        function(result1,callback){
            var product = new Product({pid: req.query.p});
            product.getbypnum(function (result2) {
                nodeUtil.isError(result2)?callback(result2):res.locals.product = result2;callback(null,result2);
            });
        },
        function(result2,callback){
            var pf = new Product_files({id: result2[0].id});
            pf.get(function (result3) {
                nodeUtil.isError(result3)?callback(result3):res.locals.pf = result3;callback(null,result2);
            });
        },
        function(result2,callback){
            var inf = new Included_fee({id: result2[0].id});
            inf.get(function (result4) {
                nodeUtil.isError(result4)?callback(result4):res.locals.inf = result4;callback(null,result2);
            });
        },
        function(result2,callback){
            var ts = new Travel_schedule({id: result2[0].id});
            ts.getbynohh(function (result5) {
                nodeUtil.isError(result5)?callback(result5):res.locals.ts = result5;callback(null,result2);
            });
        },
        function(result2,callback){
            var pp = new Product_position({id: result2[0].id});
            pp.get(function (result6) {
                nodeUtil.isError(result6)?callback(result6):res.locals.pp = result6;callback(null,result2);
            });
        },
        function(result2,callback){
            var sql = "select * from product_insurance where product_id = " + result2[0].id;
            mysql.query(sql, function (err, rows) {
                err?callback(new Error(nodeUtil.error(err + ": " + sql))):res.locals.bx = rows;callback(null,result2);
            });
        },
        function(result2,callback){
            if (result2[0].service_by_huiyou == '1') {
                setting.getServiceManager(function (managerUserId) {
                    nodeUtil.isError(managerUserId)?callback(managerUserId):res.locals.service_user_id = managerUserId;callback(null,result2);
                });
            }else{
                callback(null,result2);
            }
        }
    ],function(err){
        err ? errHandler.responseError(err, req, res) : res.render('routedownload', {layout: false});
    });
}

exports.routedownloadpeer = function (req, res) {
    //如果是游客，查看到的信息就是游客的
    if(!req.session.user){
        req.session.user = "24";
    }
    async.waterfall([
        function(callback){
            permission.checkUser(req, res, function (result) {
                res.locals.user = result;
                callback(null,result);
            });
        },
        function(result,callback){
            var company = new Company({id: result[0].company_id});
            company.get(function (result1) {
                nodeUtil.isError(result1)?callback(result1):res.locals.company = result1;callback(null,result1);
            });
        },
        function(result1,callback){
            var product = new Product({pid: req.query.p});
            product.getbypnum(function (result2) {
                nodeUtil.isError(result2)?callback(result2):res.locals.product = result2;callback(null,result2);
            });
        },
        function(result2,callback){
            var pf = new Product_files({id: result2[0].id});
            pf.get(function (result3) {
                nodeUtil.isError(result3)?callback(result3):res.locals.pf = result3;callback(null,result2);
            });
        },
        function(result2,callback){
            var inf = new Included_fee({id: result2[0].id});
            inf.get(function (result4) {
                nodeUtil.isError(result4)?callback(result4):res.locals.inf = result4;callback(null,result2);
            });
        },
        function(result2,callback){
            var ts = new Travel_schedule({id: result2[0].id});
            ts.getbynohh(function (result5) {
                nodeUtil.isError(result5)?callback(result5):res.locals.ts = result5;callback(null,result2);
            });
        },
        function(result2,callback){
            var pp = new Product_position({id: result2[0].id});
            pp.get(function (result6) {
                nodeUtil.isError(result6)?callback(result6):res.locals.pp = result6;callback(null,result2);
            });
        },
        function(result2,callback){
            var sql = "select * from product_insurance where product_id = " + result2[0].id;
            mysql.query(sql, function (err, rows) {
                err?callback(new Error(nodeUtil.error(err + ": " + sql))):res.locals.bx = rows;callback(null,result2);
            });
        },
        function(result2,callback){
            if (result2[0].service_by_huiyou == '1') {
                setting.getServiceManager(function (managerUserId) {
                    nodeUtil.isError(managerUserId)?callback(managerUserId):res.locals.service_user_id = managerUserId;callback(null,result2);
                });
            }else{
                callback(null,result2);
            }
        }
    ],function(err){
        err ? errHandler.responseError(err, req, res) : res.render('routedownloadpeer', {layout: false});
    });
}

exports.routedownloadpublic = function (req, res) {
    //如果是游客，查看到的信息就是游客的
    if(!req.session.user){
        req.session.user = "24";
    }
    async.waterfall([
        function(callback){
            permission.checkUser(req, res, function (result) {
                res.locals.user = result;
                callback(null,result);
            });
        },
        function(result,callback){
            var company = new Company({id: result[0].company_id});
            company.get(function (result1) {
                nodeUtil.isError(result1)?callback(result1):res.locals.company = result1;callback(null,result1);
            });
        },
        function(result1,callback){
            var product = new Product({pid: req.query.p});
            product.getbypnum(function (result2) {
                nodeUtil.isError(result2)?callback(result2):res.locals.product = result2;callback(null,result2);
            });
        },
        function(result2,callback){
            var pf = new Product_files({id: result2[0].id});
            pf.get(function (result3) {
                nodeUtil.isError(result3)?callback(result3):res.locals.pf = result3;callback(null,result2);
            });
        },
        function(result2,callback){
            var inf = new Included_fee({id: result2[0].id});
            inf.get(function (result4) {
                nodeUtil.isError(result4)?callback(result4):res.locals.inf = result4;callback(null,result2);
            });
        },
        function(result2,callback){
            var ts = new Travel_schedule({id: result2[0].id});
            ts.getbynohh(function (result5) {
                nodeUtil.isError(result5)?callback(result5):res.locals.ts = result5;callback(null,result2);
            });
        },
        function(result2,callback){
            var pp = new Product_position({id: result2[0].id});
            pp.get(function (result6) {
                nodeUtil.isError(result6)?callback(result6):res.locals.pp = result6;callback(null,result2);
            });
        },
        function(result2,callback){
            var sql = "select * from product_insurance where product_id = " + result2[0].id;
            mysql.query(sql, function (err, rows) {
                err?callback(new Error(nodeUtil.error(err + ": " + sql))):res.locals.bx = rows;callback(null,result2);
            });
        },
        function(result2,callback){
            if (result2[0].service_by_huiyou == '1') {
                setting.getServiceManager(function (managerUserId) {
                    nodeUtil.isError(managerUserId)?callback(managerUserId):res.locals.service_user_id = managerUserId;callback(null,result2);
                });
            }else{
                callback(null,result2);
            }
        }
    ],function(err){
        err ? errHandler.responseError(err, req, res) : res.render('routedownloadpublic', {layout: false});
    });
}

/*优化前的cover
exports.cover = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
            } else {
                res.render('cover', {layout: false, user: result, company: result1});
            }
        });
    });
}*/

//waterfall优化后的cover
exports.cover = function (req, res) {
    async.waterfall([
        function(callback){
            permission.checkUser(req, res, function (result) {
                res.locals.user = result;
                callback(null,result);
            });
        },
        function(result,callback){
            var company = new Company({id: result[0].company_id});
            company.get(function (result1) {
                nodeUtil.isError(result1)?callback(result1):res.locals.company = result1;callback(null,result1);
            });
        }
    ],function(err){
        err ? errHandler.responseError(err, req, res) : res.render('cover', {layout: false});
    });
}

exports.covert = function (req, res) {
    async.waterfall([
        function(callback){
            permission.checkUser(req, res, function (result) {
                res.locals.user = result;
                callback(null,result);
            });
        },
        function(result,callback){
            var company = new Company({id: result[0].company_id});
            company.get(function (result1) {
                nodeUtil.isError(result1)?callback(result1):res.locals.company = result1;callback(null,result1);
            });
        }
    ],function(err){
        err ? errHandler.responseError(err, req, res) : res.render('covert', {layout: false});
    });
}

exports.getbookingstatus = function (req, res) {
    //get booking number in each status
    var userid = parseInt(req.param("userid"));
    var booking = new Booking({});
    booking.getByParameters({user_id:userid, columns:['owner_id', 'status_id', 'service_user_id']}, function (result4) {
        if (nodeUtil.isError(result4)) {
            errHandler.responseError(result4, req, res);
            return false;
        }
        //compute number
        /*计算当前用户的购买订单和销售订单数量*/
        //销售订单
        var sell1 = 0; //待确认
        var sell2 = 0; //待付款
        var sell3 = 0; //交易关闭
        var sell4 = 0; //已出团
        var sell5 = 0; //待出团
        var sell6 = 0; //已付款
        //购买订单
        var buy1 = 0; //待确认
        var buy2 = 0; //待付款
        var buy3 = 0; //交易关闭
        var buy4 = 0; //已出团
        var buy5 = 0; //待出团
        var buy6 = 0; //已付款
        for(var i in result4){
            if((result4[i].owner_id1 == userid &&  result4[i].service_by_huiyou == 0)||result4[i].service_user_id == userid ){
                if(result4[i].status_id==1){
                    sell1 = sell1 + 1;
                }
                if(result4[i].status_id==2){
                    sell2 = sell2 + 1;
                }
                if(result4[i].status_id==3 || result4[i].status_id==4){
                    sell3 = sell3 + 1;
                }
                if(result4[i].status_id==5){
                    sell4 = sell4 + 1;
                }
                if(result4[i].status_id==6){
                    sell5 = sell5 + 1;
                }
                if(result4[i].status_id==7){
                    sell6 = sell6 + 1;
                }
            }

            if(result4[i].owner_id == userid){
                if(result4[i].status_id==1){
                    buy1 = buy1 + 1;
                }
                if(result4[i].status_id==2){
                    buy2 = buy2 + 1;
                }
                if(result4[i].status_id==3 || result4[i].status_id==4){
                    buy3 = buy3 + 1;
                }
                if(result4[i].status_id==5){
                    buy4 = buy4 + 1;
                }
                if(result4[i].status_id==6){
                    buy5 = buy5 + 1;
                }
                if(result4[i].status_id==7){
                    buy6 = buy6 + 1;
                }
            }
        }
        var r = {
            "sell1":sell1,"sell2":sell2,"sell3":sell3,"sell4":sell4,"sell5":sell5,"sell6":sell6,
            "buy1":buy1,"buy2":buy2,"buy3":buy3,"buy4":buy4,"buy5":buy5,"buy6":buy6
        };
        res.json(r);
    });
}

exports.servicesAuthUser = function ( req, res ){
    webservicesAuth.authUser(req, res);
}

exports.servicesgetOption = function ( req, res ){
    webservicesAuth.getOption(req, res);
}

exports.servicessetOption = function ( req, res ){
    webservicesAuth.setOption(req, res);
}

exports.servicesresetOption = function ( req, res ){
    webservicesAuth.resetOption(req, res);
}





