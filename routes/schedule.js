var permission = require('./permission.js');
var crypto = require('crypto');
var fs = require('fs');
var mysql = require('../models/db_mysql');
var chat = require('./socket/chat.js');
var utils = require('./utils.js');
var errHandler = require('./error.js');
var nodeUtil = require('util');

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

//超过开船日期的订单，除了已经上传完出团通知书的订单，其他 未走到这个状态的订单，都要变成 交易关闭状态
exports.checkBookingstatus = function () {
   //产品的出发日期<今天
   var sql1 = "select id from product where start_date < '" + getToday() + "'";
   mysql.query(sql1, function (err, rows1) {
            if (err){
                console.log(err);
                return false;
            }
            for(var i in rows1){
                //1.待出团-->已出团
                var sql2 = "update booking set status_id = 5 where status_id = 6 and product_id = "+rows1[i].id;
                mysql.query(sql2, function (err, rows2) {
                    if (err){
                        console.log(err);
                        return false;
                    }
                });
                
                //2.其他状态-->交易关闭
                var sql3 = "update booking set status_id = 4,reject_reason='已过出发日期，系统自动取消！' where (status_id = 1 or status_id = 2 or status_id = 7) and product_id = "+rows1[i].id;
                mysql.query(sql3, function (err, rows3) {
                    if (err){
                        console.log(err);
                        return false;
                    }
                });

            }
   });   
}

