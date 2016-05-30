/**
 * Created by teng on 29.10.2014.
 */
var io = require('./socket/socket.js');
var IO_KEY = require('./socket/io-keys.js');
var mysql = require('../models/db_mysql');
var errHandler = require('./error.js');
var utils = require('./utils.js');
var nodeUtil = require('util');
var emailCtr = require('./email_ctr.js');
var User = require('../models/user.js');
var Demand = require('../models/demand.js');
var Supply = require('../models/supply.js');

/* 发布尾舱需求信息 */
//exports.marketbuydo = function (req, res) {
exports.publishDemand = function (req, res) {
    if(req.body.sType == "fb") {
        var demand = new Demand({
            owner_id: req.body.owner_id,
            description: req.body.description
        });

        demand.save(function (err) {
            if (nodeUtil.isError(err)) {
                errHandler.responseError(err, req, res);
                return false;
            }

            //notify online users
            io.emitToAll(IO_KEY.DEMAND_NEW, {'did': ''});

            //notify supplier
            var user = new User({
                id: demand.owner_id
            });
            user.getLabel(function (label) {
                if (label && !nodeUtil.isError(label)) {
                    var mailContent = label.company_short_name + '的' + label.user_name + '发布了一条新的需求消息。' +
                        '了解详情或联系需求发布商请登陆<a href="www.huiyoulun.com">荟邮轮</a>。' +
                        '<br>需求描述：' + demand.description;
                    emailCtr.notifyAllSuppliers('邮轮尾舱需求信息', mailContent);
                }
            });

            res.redirect('loading?page=marketbuy' + req.body.sType1);
        });
    } else{
        req.session.numStart = req.body.numStart;
        req.session.skey = req.body.skey;
        res.redirect('loading?page=marketbuy');
    }
}

/* 发布尾舱供应信息 */
//exports.marketdo = function (req, res) {
exports.publishSupply = function (req, res) {
    if(req.body.sType == "fb") {
        var n = utils.getNow();
        var op = req.files;
        var logopath = "";

        if (op.img_url) {
            logopath = op.img_url.path.replace("public\\files\\", "").replace("public/files/", "");
        }

        var supply = new Supply({
            owner_id: req.body.owner_id,
            ship_id: req.body.ship_id1,
            departure_date: req.body.departure_date,
            day: req.body.day,
            cruise_route: req.body.cruise_route,
            cabin_category_id: req.body.cabin_category_id,
            amount: req.body.amount,
            price_now: req.body.price_now,
            price_old: req.body.price_old,
            description: req.body.description,
            img_url: logopath
        });

        supply.save(function (err) {
            if (nodeUtil.isError(err)) {
                errHandler.responseError(err, req, res);
                return false;
            }

            //notify online users
            io.emitToAll(IO_KEY.SUPPLY_NEW, {'sid':''});

            //notify through email
            var user = new User({
                id: supply.owner_id
            });
            user.getLabel(function (label) {
                if (label && !nodeUtil.isError(label)) {
                    var template = label.company_short_name + '的' + label.user_name + '发布了一条新的尾舱供应消息。' +
                        '了解详情或联系供应商请登陆<a href="www.huiyoulun.com">荟邮轮</a>。'+
                        '<br>产品描述：'+ (supply.description?supply.description:'')+
                        '<br>邮轮名称：ship_name'+
                        '<br>出航日期：'+(supply.departure_date?supply.departure_date:'') +
                        '<br>天数：'+(supply.day?supply.day:'') +
                        '<br>航线：'+(supply.cruise_route?supply.cruise_route:'')+
                        '<br>舱房类型：cabin_name'+
                        '<br>数量：'+(supply.amount!=-1?supply.amount:'不限')+
                        '<br>现价：'+(supply.price_now?supply.price_now:'')+
                        '<br>原价：'+(supply.price_old?supply.price_old:'');
                    /*
                    if ( supply.ship_id ) {
                        var q;
                        
                        if ( supply.cabin_category_id ) {
                            q = "select s.txtShipName as ship_name, c.txtCabinName as cabin_name from cruise_ship s left join cabin_category c on c.txtShipNo = s.txtShipNo where s.id = "+ supply.ship_id +" and c.id = "+supply.cabin_category_id;
                        } else {
                            q = "select s.txtShipName as ship_name from cruise_ship s where s.id = "+ supply.ship_id;
                        }
                        //var q = "select txtShipName as ship_name,txtCabinName as cabin_name from supply_user where ship_id = "+supply.ship_id; 
                       // console.log("run1");
                        //mysql.query(q, function(shipInfo){
                         //   console.log(q);
                         //   console.log(shipInfo);
                         //   if(shipInfo && !nodeUtil.isError(shipInfo)) {
                                var mailContent = template.replace('ship_name', (shipInfo[0].ship_name ? shipInfo[0].ship_name : ''));
                                mailContent = mailContent.replace('cabin_name', (shipInfo[0].cabin_name ? shipInfo[0].cabin_name : ''));
                                console.log("run2");
                                emailCtr.notifyAll('邮轮尾舱供应信息', mailContent);
                          //  }

                        });
                    } else {
                        var mailContent = template.replace('ship_name', (shipInfo[0].ship_name?shipInfo[0].ship_name:''));
                        mailContent = mailContent.replace('cabin_name', (shipInfo[0].cabin_name?shipInfo[0].cabin_name:''));
                        emailCtr.notifyAll('邮轮尾舱供应信息', mailContent);
                    }*/
                    //console.log(template);
                    var q1 = "select txtShipName from cruise_ship where id = " + supply.ship_id;
                    //console.log(q1);
                    mysql.query(q1, function(err,res1){
                        //console.log(err);
                        //console.log(res1);
                        var q2 = "select * from cabin_category where id = " + supply.cabin_category_id ;
                        //console.log(q2);
                        mysql.query(q2, function(err,res2){
                            //console.log(res2);
                            var mailContent = template.replace('ship_name', (res1[0].txtShipName?res1[0].txtShipName:''));
                            mailContent = mailContent.replace('cabin_name', (res2[0].txtCabinName?res2[0].txtCabinName:''));
                            emailCtr.notifyAll('邮轮尾舱供应信息', mailContent);
                            console.log(mailContent);
                        });
                    });
                }
            });

            res.redirect('/market' + req.body.sType1);
        });
    } else{
        //判断是否有删选条件
        req.session.datstart = req.body.datStart;
        req.session.cf = req.body.cf;
        req.session.mdd = req.body.mdd;
        req.session.txtCuriseCompany = req.body.txtCuriseCompany;
        req.session.ship_id = req.body.ship_id;
        req.session.pse2 = req.body.orderby1;
        req.session.numStart = req.body.numStart;
        req.session.skey = "";
        res.redirect('loading?page=market');
    }
}
