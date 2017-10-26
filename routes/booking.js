/**
 * 预订
 */
var permission = require('./permission.js');
var errHandler = require('./error.js');
var mysql = require('../models/db_mysql');
var io = require('./socket/socket.js');
var IO_KEY = require('./socket/io-keys.js');
var email = require('./email.js');
var setting = require('../models/setting.js');
var User = require('../models/user.js');
var Med = require('../models/med.js');
var Product = require('../models/product.js');
var Province = require('../models/province.js');
var City = require('../models/city.js');
var Company = require('../models/company.js');
var Included_fee = require('../models/included_fee.js');
var Product_files = require('../models/product_files.js');
var Travel_schedule = require('../models/travel_schedule.js');
var Product_position = require('../models/product_position.js');
var Booking = require('../models/booking.js');
var Booking_temp = require('../models/booking_temp.js');
var Common = require('../models/common.js');
var utils = require('./utils.js');
var nodeUtil = require('util');
var sms = require('./sms.js');

var msgType = {
    MSG_NEW_BOOKING : 0,        //有新订单
    MSG_BOOKING_CONFIRMED : 1,  //卖家确认订单
    MSG_PAYED : 2,              //卖家已付款
    MSG_PAYMENT_CONFIRMED : 3,  //买家确认收款
    MSG_FILE_UPLOADED : 4,      //出团通知书已上传
    MSG_CANCELED_BY_BUYER : 5,  //买家取消订单
    MSG_CANCELED_BY_SELLER : 6,  //卖家取消订单
    MSG_UPDATED : 7,            //订单信息更新
    MSG_PAYMENT_INFO_ADDED : 8  //支付信息已录入
}

/* return { to: send to seller -> 'S' or buyer -> 'B'
 *          msg: the message
 *         }
 **/
function _msg(messageType, bookingNumber, additionalInfo) {
    switch(messageType) {
        case msgType.MSG_NEW_BOOKING : return {to:'S', msg:"您已有一张新订单NO."+bookingNumber+"，请尽快处理。"};
        case msgType.MSG_BOOKING_CONFIRMED : return {to:'B', msg:"卖家已确认您购买的订单NO."+bookingNumber+"，请登录荟邮轮查看。"};
        case msgType.MSG_PAYED : return {to:'S', msg:"您销售的订单NO."+bookingNumber+"买家已完成付款，请尽快确认收款。"};
        case msgType.MSG_PAYMENT_CONFIRMED : return {to:'B', msg:"您购买的订单NO."+bookingNumber+"卖家已确认收款。"};
        case msgType.MSG_FILE_UPLOADED : return {to:'B', msg:"您购买的订单NO."+bookingNumber+"卖家已上传出团通知书。"};
        case msgType.MSG_CANCELED_BY_BUYER : return {to:'S', msg:"您销售的订单NO."+bookingNumber+"买家已取消。"};
        case msgType.MSG_CANCELED_BY_SELLER : return {to:'B', msg:"您购买的订单NO."+bookingNumber+"卖家已取消。"};
        case msgType.MSG_UPDATED : return {to:'S', msg:"您销售的订单NO."+bookingNumber+"买家对游客信息进行了调整，请登录荟邮轮查看。"};
        case msgType.MSG_PAYMENT_INFO_ADDED : return {to:'S', msg:"您销售的订单买家已上传支付信息，请登录荟邮轮查看。<br/>销售订单号：NO."+bookingNumber+
            "<br/>支付金额：" + additionalInfo.amount + "元<br/>内容说明："+additionalInfo.comment + "<br/>付款日期："+additionalInfo.paid_at};
    }
    return null;
}

function _notifyCanceled(currentUser, bookingId){
    var q = "select owner_id from booking where id=" + bookingId;
    mysql.query(q, function(err, booking){
        if (err) {
            nodeUtil.error(err + ": " + q);
            return false;
        }
        if(currentUser==booking[0].owner_id) {
            _notifySeller(msgType.MSG_CANCELED_BY_BUYER, bookingId);
        } else {
            _notifyBuyer(msgType.MSG_CANCELED_BY_SELLER, bookingId);
        }
    });
}

function _notifyBuyer(messageType, bookingId) {
    //通知买家
    var q = "select booking_number, owner_id from booking where id = " + bookingId;
    mysql.query(q, function(err, booking) {
        if (err) {
            nodeUtil.error(err + ": " + q);
            return false;
        }
        if (booking[0] && booking[0].owner_id) {
            nodeUtil.log("notify buyer booking " + booking[0].booking_number + " status changed");
            _notify(messageType, booking[0].booking_number, booking[0].owner_id);
        }
    });
}

function _notify(messageType, bookingNumber, userId, additionalInfo) {
    nodeUtil.log("notify seller booking " + bookingNumber + " status changed");
    var message = _msg(messageType, bookingNumber, additionalInfo);
    if (!message) {
        return false;
    }
    var insertSysMsg = "insert into system_message (title, message, sent_at, type) values ('" + bookingNumber + "', '" + message.msg + "', now(), 'booking')";
    nodeUtil.log(insertSysMsg);
    mysql.query(insertSysMsg, function (err, newSysMsg) {
        if (err) {
            nodeUtil.error(err + ": " + insertSysMsg);
            return false;
        }
        var insertRecipient = "insert into sys_msg_recipient (sys_msg_id, recipient_id) values(" + newSysMsg.insertId + ", " + userId + ")";
        nodeUtil.log(insertRecipient);
        mysql.query(insertRecipient, function (err, newSysRec) {
            if (err) {
                //rollback
                mysql.query("delete from system_message where id = " + newSysMsg.insertId, function (err, del) {
                    
                });

            }
        });

    });
    io.emit(IO_KEY.BOOKING_STATUS_CHANGED, userId, message);
    mysql.query("select email,mobile_phone from user where id=" + userId, function (err, userEmail) {
        if (err) {
            nodeUtil.error(err + ": select email from user where id");
            return false;
        }
        if (userEmail[0].email) {
            email.sendSystemMail(userEmail[0].email,
                    "订单NO." + bookingNumber,
                    "您好！" + message.msg);
        }
        if(userEmail[0].mobile_phone){
            console.log("userEmail[0].mobile_phone:"+userEmail[0].mobile_phone);
            sms.sendSMS(userEmail[0].mobile_phone,"您好！" + message.msg);
        }
    });
    return true;
}

function _notifySeller(messageType, bookingId, additionalInfo) {
    //通知卖家
    var q = "select booking_number, service_user_id, product_id, status_id from booking where id = " + bookingId;
    mysql.query(q, function (err, booking) {
        if (err || !booking[0].booking_number) {
            nodeUtil.error( err + ": " + q);
            return false;
        }
        q = "select service_by_huiyou from product where id=" + booking[0].product_id;
        mysql.query(q, function(err, product) {
            if ( err ) {
                nodeUtil.error(err + ": " + q);
                return false;
            }

            if (product[0].service_by_huiyou=='1' && booking[0].status_id && parseInt(booking[0].status_id) < 2) {//this is new booking waiting confirmation by seller
                setting.getServiceManager(function(managerUserId){
                    _notify(messageType, booking[0].booking_number, managerUserId, additionalInfo);
                });
            } else if (booking[0].service_user_id) { // notify service user
                return _notify(messageType, booking[0].booking_number, booking[0].service_user_id, additionalInfo);
            } else { // notify owner
                q = "select p.owner_id as id from product p, booking b where b.id=" + bookingId + " and b.product_id = p.id";
                mysql.query(q, function (err, pOwner) {
                    if (err) {
                        nodeUtil.error(err + ": " + q);
                        return false;
                    }
                    return _notify(messageType, booking[0].booking_number, pOwner[0].id, additionalInfo);
                });
            }
        });

    });
}

exports.productbookingreadxsdo = function (req, res) {
    //判断
    if(req.body.sa1=="save"){
        //确认订单
        var rebate = req.body.change?"rebate="+req.body.change+",":"";
        var deposit = req.body.deposit?"deposit="+req.body.deposit+",":"";
        var serviceUserId = req.body.service_user_id?"service_user_id="+req.body.service_user_id+",":"";
        var sql1;
        if(req.body.payment_type == "1"){
            sql1 = "update booking set status_id =2,payment_until='"+req.body.payment_until+"',visa_application_until='"+req.body.visa_application_until+"', "+rebate+" payment_type='"+req.body.payment_type+"',"+deposit+" comment_supplier='"+req.body.comment+"', "+serviceUserId+" comment_price_change='"+req.body.comment_price_change+"' where id="+req.body.docid;
        }else{
            sql1 = "update booking set deposit_until='"+req.body.deposit_until+"',pay_balance_until='"+req.body.pay_balance_until+"',status_id =2,visa_application_until='"+req.body.visa_application_until+"', "+rebate+" payment_type='"+req.body.payment_type+"', "+deposit+" comment_supplier='"+req.body.comment+"', "+serviceUserId+" comment_price_change='"+req.body.comment_price_change+"' where id="+req.body.docid;
        }            
        
        nodeUtil.log(sql1);
        mysql.query(sql1,function (err, rows) {
            if (err) {
                nodeUtil.error(sql1 + " failed! " + err);
                errHandler.responseError(err, req, res);
                return false;
            }
            //插入已确认时间
            var sql0 = "update booking_status_date set date_confirmed = now() where id = " + req.body.bsdid;
            mysql.query(sql0,function (err, rows0) {
                if (err) {
                    nodeUtil.error(err + ": " + sql0);
                    errHandler.responseError(err, req, res);
                    return false;
                }
            	//通知买家
                _notifyBuyer(msgType.MSG_BOOKING_CONFIRMED, req.body.docid);
                
            });
            res.redirect(req.body.beforetmp);
        });
    }else if(req.body.sa1=="pay"){
        //支付状态->已收款（待出团）
        //插入已确认时间
        var sql0 = "update booking_status_date set date_paid = now() where id = " + req.body.bsdid;
        mysql.query(sql0,function (err, rows0) {});

        //product_position房间数量扣除
        var sql1 = "update booking set status_id = 6 where id="+req.body.docid;
        nodeUtil.log(sql1);
        mysql.query(sql1,function (err, rows) {
            if (err) {
                nodeUtil.error(err + ": " +sql1);
                errHandler.responseError("数据库错误: 更新订单状态失败！ "+err, req, res);
                return false;
            }
            //扣除房间数
            var pnum = req.body.plus1;
            var tmpp =  pnum.split("@");
            for(var i=0;i<tmpp.length;i++){
                 var sql2 = "select * from product_position where id = " + tmpp[i];
                 //nodeUtil.log(sql2);
                 mysql.query(sql2,function (err, rows1) {
                      var id1 = rows1[0].amount;
                      nodeUtil.log(rows1[0].id);
                      nodeUtil.log(id1);
                      var sql3 = "update product_position set amount = "+ (id1-1)+" where id=" + rows1[0].id;
                     mysql.query(sql3,function (err, rows2) {
                           //success
                     });
                 });
            }

            // 通知买家
            _notifyBuyer(msgType.MSG_PAYMENT_CONFIRMED, req.body.docid);

            res.redirect(req.body.beforetmp);
        });
    }else if(req.body.sa1=="nopass"){
        var sql1 = "update booking set status_id = 3,reject_reason='"+req.body.reject_reason+"' where id="+req.body.docid;
        nodeUtil.log(sql1);
        mysql.query(sql1,function (err, rows) {
            if (err) {
                nodeUtil.error( sql1 + " failed! "+ err);
                errHandler.responseError("数据库错误: 拒绝订单失败! "+err, req, res);
                return false;
            }

            // 通知买家
            _notifyBuyer(msgType.MSG_CANCELED_BY_SELLER, req.body.docid);

            res.redirect(req.body.beforetmp);
        });
    }else if(req.body.sa1=="upload"){
        var op = req.files; 
        if(op.travel_group_file){
             var fql = "update booking set travel_group_file = '"+op.travel_group_file.path.replace("public\\files\\","").replace("public/files/","")+"'  where id = " + req.body.docid;
                mysql.query(fql,function (err, rownull) {});   
        }
        var sql0 = "update booking_status_date set date_wait_group = now() where id = " + req.body.bsdid; 
        mysql.query(sql0,function (err, rows) {
            if (err) {
                nodeUtil.error(err);
                var e = new Error("数据库错误: 上传失败! ");
                e.stack = err;
                e.status = "500";
                errHandler.responseError(e, req, res);
                return false;
            }
            // 通知买家
            _notifyBuyer(msgType.MSG_FILE_UPLOADED, req.body.docid);
            res.redirect(req.body.beforetmp);
        });
    }

}

exports.productbookingdo = function (req, res) {
    console.log("Run");
    var o = req.body;
    var idb = 0;
    var stateid1 = "1";
    var no1 = utils.getNow() + "-";
    if (o.stype == "save") {
        stateid1 = "5";
    }
    var sql = "insert into booking (insurance_amount,comment_buyer,booking_number,owner_id,product_id,status_id,receipt_title,shipping_address,recipient,recipient_telephone,created_at,booker_name,booker_telephone,booker_email,booker_company) values (" + (o.insurance_amount?o.insurance_amount:0) + ",'" + o.comment_buyer + "','" + o.booking_number + "'," + o.owner_id + "," + o.product_id + "," + stateid1 + ",'" + o.receipt_title + "','" + o.shipping_address + "','" + o.recipient + "','" + o.recipient_telephone + "',now(),'" + o.booker_name + "','" + o.booker_telephone + "','" + o.booker_email + "','" + o.booker_company + "')";
    nodeUtil.log(sql);
    mysql.query(sql, function (err, newBooking) {
        if (err) {
            nodeUtil.error(err);
            var e = new Error("数据库错误: 创建订单失败! ");
            e.stack = err;
            e.status = "500";
            errHandler.responseError(e, req, res);
            return false;
        }

        var bookid = newBooking.insertId;
        idb = newBooking.insertId;
        //插入附件
        //nodeUtil.log(req.files);
        var op = req.files;

        if (op.file1) {
            var fql = "insert into booking_files (booking_id,file_name,file_path) values (" + bookid + ",'" + o.filename1 + "','" + op.file1.path.replace("public\\files\\", "").replace("public/files/", "") + "')";
            mysql.query(fql, function (err, rownull) {
            });
        }

        if (op.file2) {
            var fql = "insert into booking_files (booking_id,file_name,file_path) values (" + bookid + ",'" + o.filename2 + "','" + op.file2.path.replace("public\\files\\", "").replace("public/files/", "") + "')";
            mysql.query(fql, function (err, rownull) {
            });
        }

        if (op.file3) {
            var fql = "insert into booking_files (booking_id,file_name,file_path) values (" + bookid + ",'" + o.filename3 + "','" + op.file3.path.replace("public\\files\\", "").replace("public/files/", "") + "')";
            mysql.query(fql, function (err, rownull) {
            });
        }

        if (op.file4) {
            var fql = "insert into booking_files (booking_id,file_name,file_path) values (" + bookid + ",'" + o.filename4 + "','" + op.file4.path.replace("public\\files\\", "").replace("public/files/", "") + "')";
            mysql.query(fql, function (err, rownull) {
            });
        }

        if (op.file5) {
            var fql = "insert into booking_files (booking_id,file_name,file_path) values (" + bookid + ",'" + o.filename5 + "','" + op.file5.path.replace("public\\files\\", "").replace("public/files/", "") + "')";
            mysql.query(fql, function (err, rownull) {
            });
        }

        //插入预定流程每步的操作时间
        var sql0 = "insert into booking_status_date (booking_id,date_wait_confirm) values (" + bookid + ",now())";
        nodeUtil.log(sql0);
        mysql.query(sql0, function (err, rows1) {
        });
        var a1 = o.zd1.split("@");
        var a2 = o.zd2.split("@");
        var a3 = o.zd3.split("@");
        var a4 = o.zd4.split("@");
        var a5 = o.zd5.split("@");
        var a6 = o.zd6.split("@");
        var a7 = o.zd7.split("@");
        var k = 0;
        var roomNo = 0;
        var b1 = o.pas1.split("@");
        var b2 = o.pas2.split("@");
        var b3 = o.pas3.split("@");
        var b4 = o.pas4.split("@");
        var b5 = o.pas5.split("@");
        var b6 = o.pas6.split("@");
        var b7 = o.pas7.split("@");
        var b8 = o.pas8.split("@");

        var b9 = o.pas9.split("@");
        var b10 = o.pas10.split("@");

        var b11 = o.pas11.split("@");

        for (var i = 0; i < a1.length; i++) {
            (function (i) {
                roomNo = roomNo + 1;
                //插入预定的房间
                var sql2 = "insert into booking_position (roomNo,booking_id,product_position_id,amount_adult,amount_child,deal_price,deal_price_2,deal_price_child,booking_pos_total_price,created_at) values(" + roomNo + "," + bookid + "," + a1[i] + "," + a5[i] + "," + a6[i] + "," + a2[i] + "," + a3[i] + "," + a4[i] + "," + a7[i] + ",now())";
                nodeUtil.log(sql2);
                mysql.query(sql2, function (err, rows) {
                    if (err) {
                        nodeUtil.error(err);
                        io.emit(IO_KEY.ERROR, o.owner_id, "数据库错误: 新订单部分数据存储失败! ");
                        return false;
                    }
                    var bp_id = rows.insertId;

                    nodeUtil.log("bp_id:" + bp_id);
                    //nodeUtil.log("i:"+i);
                    //插入游客信息
                    k = k + 1;
                    if (o.pas1 != "") {
                        var t = 0;
                        for (var j = 0; j < b1.length; j++) {
                            if (b1[j] == i + 1) {
                                t = t + 1;
                                var pfp = "";
                                //nodeUtil.log("b11[j]:"+b11[j]);
                                //nodeUtil.log("j:"+(j+1)-i*);
                                var c = new Common({id: b11[j], op: op});
                                pfp = c.getFP();
                                //pfp = getFP(b11[j]);
                                var sql3 = "insert into booking_passenger (booking_pos_id,lastname,firstname,passengerNo,lastname_en,firstname_en,pass_file_path) values('" + bp_id + "','" + b2[j] + "','" + b3[j] + "'," + t + ",'" + b9[j] + "','" + b10[j] + "','" + pfp + "')";
                                nodeUtil.log(sql3);
                                mysql.query(sql3, function (err, rows) {
                                    if (err) {
                                        nodeUtil.error(err);
                                        io.emit(IO_KEY.ERROR, o.owner_id, "数据库错误: 新订单部分旅客数据存储失败! ");
                                        return false;
                                    }
                                });
                            }

                        }
                    }
                });
            })(i);
        }
        //sleep(3000);

        //插入游客信息
        /*
         if(o.pas1!=""){
         var b1 = o.pas1.split("@");
         var b2 = o.pas2.split("@");
         var b3 = o.pas3.split("@");
         var b4 = o.pas4.split("@");
         var b5 = o.pas5.split("@");
         var b6 = o.pas6.split("@");
         var b7 = o.pas7.split("@");
         var b8 = o.pas8.split("@");
         for(var j=0;j<b1.length;j++){
         var ggg = no1 + b1[j];
         var sql3 = "insert into booking_passenger (booking_pos_id,name,name_pinyin,birthday,pass_number,pass_issue_place,pass_issue_at,pass_valid_period) values('"+ggg+"','"+b2[j]+"','"+b3[j]+"','"+b4[j]+"','"+b5[j]+"','"+b6[j]+"','"+b7[j]+"',"+b8[j]+")";
         nodeUtil.log(sql3);
         mysql.query(sql3,function (err, rows) {
         if (err) throw err;
         });
         }
         }
         */

        _notifySeller(msgType.MSG_NEW_BOOKING, bookid);

        if (o.stype == "save") {
            res.redirect('productbookingsavesuccess');
        } else {
            req.session.bn = o.booking_number;
            req.session.bnid = idb;
            res.redirect('productbookingsuccess');
        }
    });
}

exports.productbookingreaddo = function (req, res) {
    var o =req.body;
    var op = req.files;
    if(o.sType == "cancel"){
        var sql1 = "update booking set status_id =4,reject_reason='"+req.body.canreason+"' where id="+req.body.docid;
        mysql.query(sql1,function (err, rows) {
            if ( err ) {
                nodeUtil.error(err);
                var e = new Error("取消订单失败！")
                e.stack = err;
                e.status = 500;
                errHandler.responseError(e, req, res);
                return false;
            }
            _notifyCanceled(req.session.user, req.body.docid);
            req.session.error = "订单取消成功！";
            res.redirect(req.body.beforetmp);
        });
    }else if(o.sType == "append"){
        nodeUtil.log(op);
        if(op.file1){
            var fql = "insert into booking_files (booking_id,file_name,file_path) values ("+o.docid+",'"+o.filename1+"','"+op.file1.path.replace("public\\files\\","").replace("public/files/","")+"')";
            mysql.query(fql,function (err, rownull) {
                if ( err ) {
                    nodeUtil.error(err);
                    io.emit(IO_KEY.ERROR, req.session.user, "数据库错误: 存储订单相关文件失败！");
                }
            });
        }

        if(op.file2){
            var fql = "insert into booking_files (booking_id,file_name,file_path) values ("+o.docid+",'"+o.filename2+"','"+op.file2.path.replace("public\\files\\","").replace("public/files/","")+"')";
            mysql.query(fql,function (err, rownull) {
                if ( err ) {
                    nodeUtil.error(err);
                    io.emit(IO_KEY.ERROR, req.session.user, "数据库错误: 存储订单相关文件失败！");
                }
            });
        }

        if(op.file3){
            var fql = "insert into booking_files (booking_id,file_name,file_path) values ("+o.docid+",'"+o.filename3+"','"+op.file3.path.replace("public\\files\\","").replace("public/files/","")+"')";
            mysql.query(fql,function (err, rownull) {
                if ( err ) {
                    nodeUtil.error(err);
                    io.emit(IO_KEY.ERROR, req.session.user, "数据库错误: 存储订单相关文件失败！");
                }
            });
        }

        if(op.file4){
            var fql = "insert into booking_files (booking_id,file_name,file_path) values ("+o.docid+",'"+o.filename4+"','"+op.file4.path.replace("public\\files\\","").replace("public/files/","")+"')";
            mysql.query(fql,function (err, rownull) {
                if ( err ) {
                    nodeUtil.error(err);
                    io.emit(IO_KEY.ERROR, req.session.user, "数据库错误: 存储订单相关文件失败！");
                }
            });
        }

        if(op.file5){
            var fql = "insert into booking_files (booking_id,file_name,file_path) values ("+o.docid+",'"+o.filename5+"','"+op.file5.path.replace("public\\files\\","").replace("public/files/","")+"')";
            mysql.query(fql,function (err, rownull) {
                if ( err ) {
                    nodeUtil.error(err);
                    io.emit(IO_KEY.ERROR, req.session.user, "数据库错误: 存储订单相关文件失败！");
                }
            });
        }

        var tmp1 = o.pas1.split("@");
        var tmp2 = o.pas2.split("@");
        var tmp3 = o.pas3.split("@");
        var tmp4 = o.pas4.split("@");
        var tmp5 = o.pas5.split("@");
        var tmp6 = o.pas6.split("@");
        for(var i=0;i<tmp1.length;i++){
            nodeUtil.log(tmp6[i]);
            var c = new Common({id:tmp6[i],op:op});
            pfp = c.getFP();
            if(pfp.indexOf(".")!=-1){
                var sql2 = "update booking_passenger set lastname ='"+tmp2[i]+"',firstname='"+tmp3[i]+"',lastname_en='"+tmp4[i]+"',firstname_en='"+tmp5[i]+"',pass_file_path='"+pfp+"' where id="+tmp1[i];
            }else{
                var sql2 = "update booking_passenger set lastname ='"+tmp2[i]+"',firstname='"+tmp3[i]+"',lastname_en='"+tmp4[i]+"',firstname_en='"+tmp5[i]+"' where id="+tmp1[i];

            }
            nodeUtil.log(sql2);
            mysql.query(sql2,function (err, rows) {
                if ( err ) {
                    nodeUtil.error(err);
                    io.emit(IO_KEY.ERROR, req.session.user, "数据库错误: 修改游客信息失败！");
                }
            });
        }
        _notifySeller(msgType.MSG_UPDATED, req.body.docid);
        req.session.error = "游客信息修改成功！";
        res.redirect("loading?page=productbookingread?p="+o.docid);
    }else if(o.sType == "pay"){
        //插入付款时间
        mysql.query("update booking_status_date set date_wait_payment = now() where id = " + req.body.bsdid, function (err, rows0) {
            if( err ) {
                nodeUtil.error(err);
                var e = new Error("数据库错误: 确认付款失败！")
                e.stack = err;
                e.status = 500;
                errHandler.responseError(e, req, res);
                return false;
            }
            mysql.query("update booking set status_id =7 where id="+req.body.docid,function (err, rows) {
                if( err ) {
                    nodeUtil.error(err);
                    var e = new Error("数据库错误: 确认付款失败！")
                    e.stack = err;
                    e.status = 500;
                    errHandler.responseError(e, req, res);
                    return false;
                }
                _notifySeller(msgType.MSG_PAYED, req.body.docid);
                req.session.error = "付款成功！";
                res.redirect(req.body.beforetmp);
            });
        });
    }else if(o.sType == "uploadpaymenthistory") {
        //插入支付水单记录
        var op = req.files;
        var logopath = "";
        if (op.filezf) {
            logopath = op.filezf.path.replace("public\\files\\", "").replace("public/files/", "");
        }
        var sqlzf = "insert into payment_history (booking_id,amount,paid_at,type_id,comment,file_path)  values (" + o.docid + "," + o.zfamount + ",'" + o.zfpaid_at + "',1,'" + o.zfcomment + "','" + logopath + "')";
        mysql.query(sqlzf, function (err, rows) {
            if (err) {
                nodeUtil.error(err);
                var e = new Error("数据库错误: 上传失败！")
                e.stack = err;
                e.status = 500;
                errHandler.responseError(e, req, res);
                return false;
            }
            _notifySeller(msgType.MSG_PAYMENT_INFO_ADDED, req.body.docid, {amount:(o.zfamount? o.zfamount:''), comment:(o.zfcomment?o.zfcomment:''), paid_at:(o.zfpaid_at?o.zfpaid_at:'')});
            req.session.error = "上传成功！";
            res.redirect("loading?page=productbookingread?p=" + o.docid);
        });
    } else if(o.sType == "delpayhistory"){
        //删除支付水单记录
        var sqlzfd = "delete from payment_history where id= "+o.delid;
         mysql.query(sqlzfd,function (err, rows) {
                if( err ) {
                    nodeUtil.error(err);
                    var e = new Error("数据库错误: 删除失败！")
                    e.stack = err;
                    e.status = 500;
                    errHandler.responseError(e, req, res);
                    return false;
                }
                req.session.error = "删除成功！";
                res.redirect("loading?page=productbookingread?p="+o.docid);
            });
    }

    //插入游客信息
    /*
     var b1 = o.pas1.split("@");
     var b2 = o.pas2.split("@");
     var b3 = o.pas3.split("@");
     var b4 = o.pas4.split("@");
     var b5 = o.pas5.split("@");
     var b6 = o.pas6.split("@");
     var b7 = o.pas7.split("@");
     var b8 = o.pas8.split("@");
     for(var j=0;j<b1.length;j++){
     var ggg = b1[j];
     var sql3 = "insert into booking_passenger (booking_pos_id,name,name_pinyin,birthday,pass_number,pass_issue_place,pass_issue_at,pass_valid_period) values('"+ggg+"','"+b2[j]+"','"+b3[j]+"','"+b4[j]+"','"+b5[j]+"','"+b6[j]+"','"+b7[j]+"',"+b8[j]+")";
     nodeUtil.log(sql3);
     mysql.query(sql3,function (err, rows) {
     res.redirect("/productbookingread?p="+req.body.bid);
     });
     }
     */

}

exports.productbookingread = function (req, res) {
    permission.checkUser(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if ( nodeUtil.isError(result1) ) {
                nodeUtil.error("productbookingread: company.get failed!");
                errHandler.responseError("数据库错误: 查询订单失败！"+result1, req, res);
                return false;
            }
            var booking = new Booking({id: req.query.p});
            booking.getbyid(function (result10) {
                if (nodeUtil.isError(result10)) {
                    nodeUtil.error("productbookingread: booking.getbyid failed!");
                    errHandler.responseError("数据库错误: 查询订单失败！"+result10, req, res);
                    return false;
                }

                //TODO replace product.getbypnum with product.getbyid
                var product = new Product({pid: result10[0].product_number});
                product.getbypnum(function (result2) {
                    if (nodeUtil.isError(result2)) {
                        nodeUtil.error("productbookingread: product.getbypnum failed!");
                        errHandler.responseError("数据库错误: 查询订单失败！"+result2, req, res);
                        return false;
                    }
                    var pf = new Product_files({id: result2[0].id});
                    pf.get(function (result3) {
                        if (nodeUtil.isError(result3)) {
                            nodeUtil.log("productbookingread: product_files.get failed!");
                            return false;
                        }
                        var inf = new Included_fee({id: result2[0].id});
                        inf.get(function (result4) {
                            if (nodeUtil.isError(result4)) {
                                nodeUtil.log("productbookingread: Included_fee.get failed!");
                                return false;
                            }
                            var ts = new Travel_schedule({id: result2[0].id});
                            ts.get(function (result5) {
                                if (nodeUtil.isError(result5)) {
                                    nodeUtil.log("productbookingread: Travel_schedule.get failed!");
                                    return false;
                                }
                                var pp = new Product_position({id: result2[0].id});
                                pp.get(function (result6) {
                                    if (nodeUtil.isError(result6)) {
                                        nodeUtil.log("productbookingread: Product_position.get failed!");
                                        return false;
                                    }
                                    var qq = new Booking_temp({id: result2[0].id,userid:req.session.user});
                                    qq.get(function (result7) {
                                        if (nodeUtil.isError(result7)) {
                                            nodeUtil.log("productbookingread: Booking_temp.get failed!");
                                            return false;
                                        }
                                        var province = new Province();
                                        province.get(function (result8) {
                                            if (nodeUtil.isError(result8)) {
                                                nodeUtil.log("productbookingread: Province.get failed!");
                                                return false;
                                            }
                                            var city = new City();
                                            city.get(function (result9) {
                                                if (nodeUtil.isError(result9)) {
                                                    nodeUtil.log("productbookingread: City.get failed!");
                                                    return false;
                                                }
                                                var sql1 = "select * from booking_position_proid where booking_id = " + req.query.p + " order by roomNo asc";
                                                mysql.query(sql1, function (err, rows) {
                                                    if (err) {
                                                        nodeUtil.error(err);
                                                        errHandler.responseError(new Error(err), req, res);
                                                        return false;
                                                    }
                                                    var sql2 = "select * from booking_passenger";
                                                    mysql.query(sql2, function (err, rows1) {
                                                        if (err) {
                                                            nodeUtil.error(err);
                                                            errHandler.responseError(new Error(err), req, res);
                                                            return false;
                                                        }
                                                        var sql3 = "select * from user where role_sys_user = 1";
                                                        nodeUtil.log(sql3);
                                                        mysql.query(sql3, function (err, rows2) {
                                                            if (err) {
                                                                nodeUtil.error(err);
                                                                errHandler.responseError(new Error(err), req, res);
                                                                return false;
                                                            }
                                                            var sql4 = "select * from booking_status_date where booking_id = " + req.query.p;
                                                            mysql.query(sql4, function (err, rows3) {
                                                                if (err) {
                                                                    nodeUtil.error(err);
                                                                    errHandler.responseError(new Error(err), req, res);
                                                                    return false;
                                                                }
                                                                var sql5 = "select * from booking_files where booking_id = " + req.query.p;
                                                                mysql.query(sql5, function (err, rows4) {
                                                                    if (err) {
                                                                        nodeUtil.error(err);
                                                                        errHandler.responseError(new Error(err), req, res);
                                                                        return false;
                                                                    }
                                                                    var sql6 = "select * from product_insurance where product_id = " + result2[0].id;
                                                                    mysql.query(sql6, function (err, rows5) {
                                                                        var sql7 = "select * from payment_history where booking_id = " + req.query.p + " order by paid_at asc";
                                                                        mysql.query(sql7, function (err, rows6) {
                                                                            if ( result2[0].service_by_huiyou == 1) {
                                                                                setting.getServiceManager(function (managerUserId) {
                                                                                    if (nodeUtil.isError(managerUserId)) {
                                                                                        errHandler.responseError(managerUserId, req, res);
                                                                                        return false;
                                                                                    }
                                                                                    res.render('productbookingread', {layout: "layout", ph: rows6, pi: rows5, bf: rows4, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, no: utils.getNow(), qq: result7, province: result8, city: result9, booking: result10, cc: rows, cc1: rows1, ccc2: rows2, bsd: rows3, service_manager:managerUserId});
                                                                                });
                                                                            } else {
                                                                                res.render('productbookingread', {layout: "layout", ph: rows6, pi: rows5, bf: rows4, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, no: utils.getNow(), qq: result7, province: result8, city: result9, booking: result10, cc: rows, cc1: rows1, ccc2: rows2, bsd: rows3});
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

        });
    });
}

exports.productbookingreadxs = function (req, res) {

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
                                    var qq = new Booking_temp({id: result2[0].id,userid:req.session.user});
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
                                                        nodeUtil.error(err);
                                                        errHandler.responseError(new Error(err), req, res);
                                                        return false;
                                                    }
                                                    var sql2 = "select * from booking_passenger";
                                                    mysql.query(sql2, function (err, rows1) {
                                                        if (err) {
                                                            nodeUtil.error(err);
                                                            errHandler.responseError(new Error(err), req, res);
                                                            return false;
                                                        }
                                                        var sql3 = "select * from user where role_sys_user = 1";
                                                        mysql.query(sql3, function (err, rows2) {
                                                            if (err) {
                                                                nodeUtil.error(err);
                                                                errHandler.responseError(new Error(err), req, res);
                                                                return false;
                                                            }
                                                            var sql4 = "select * from booking_status_date where booking_id = " + req.query.p;
                                                            mysql.query(sql4, function (err, rows3) {
                                                                if (err) {
                                                                    nodeUtil.error(err);
                                                                    errHandler.responseError(new Error(err), req, res);
                                                                    return false;
                                                                }
                                                                var sql5 = "select * from booking_files where booking_id = " + req.query.p;
                                                                mysql.query(sql5, function (err, rows4) {
                                                                    if (err) {
                                                                        nodeUtil.error(err);
                                                                        errHandler.responseError(new Error(err), req, res);
                                                                        return false;
                                                                    }
                                                                    var sql6 = "select * from product_insurance where product_id = " + result2[0].id;
                                                                    mysql.query(sql6, function (err, rows5) {
                                                                        if (err) {
                                                                            nodeUtil.error(err);
                                                                            errHandler.responseError(new Error(err), req, res);
                                                                            return false;
                                                                        }
                                                                        nodeUtil.log(req.query.p);
                                                                        var sql7 = "select * from payment_history where booking_id = " + req.query.p + " order by paid_at asc";
                                                                        nodeUtil.log(sql7);
                                                                        mysql.query(sql7, function (err, rows6) {
                                                                            nodeUtil.log(rows6);
                                                                            res.render('productbookingreadxs', {layout: "layout", ph: rows6, pi: rows5, bf: rows4, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, no: utils.getNow(), qq: result7, province: result8, city: result9, booking: result10, cc: rows, cc1: rows1, cc2: rows2, bsd: rows3});
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
    });
}

/* 购买方订单列表 */
exports.optionorder = function (req, res) {

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
                            nodeUtil.error(err);
                            errHandler.responseError(new Error(err), req, res);
                            return false;
                        }
                        var sql2 = "select * from booking_passenger";
                        mysql.query(sql2, function (err, rows1) {
                            if (err) {
                                nodeUtil.error(err);
                                errHandler.responseError(new Error(err), req, res);
                                return false;
                            }
                            var sql4 = "select * from booking_status_date";
                            mysql.query(sql4, function (err, rows3) {
                                res.render('optionorder', {layout: "layout", bsd: rows3, user: result, company: result1, user1: result2, booking: result3, cc: rows, cc1: rows1});
                            });
                        });
                    });
                });
            });
        });
    });
}

/* 销售方订单列表 */
exports.optionordersell = function (req, res) {
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
                            nodeUtil.error(err);
                            errHandler.responseError(new Error(err), req, res);
                            return false;
                        }
                        var sql2 = "select * from booking_passenger";
                        mysql.query(sql2, function (err, rows1) {
                            if (err) {
                                nodeUtil.error(err);
                                errHandler.responseError(new Error(err), req, res);
                                return false;
                            }
                            var sql4 = "select * from booking_status_date";
                            mysql.query(sql4, function (err, rows3) {
                                res.render('optionordersell', {layout: "layout", bsd: rows3, user: result, company: result1, user1: result2, booking: result3, cc: rows, cc1: rows1});
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.productbooking = function (req, res) {
    //permission.checkUser(req, res, function (result) {
        var result = [{
            id: 87
        }];
        var company = new Company({id: 231});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                nodeUtil.log("productbooking: company.get failed!");
                errHandler.responseError(result1, req, res);
                return false;
            }
            var product = new Product({pid: req.query.p});
            product.getbypnum(function (result2) {
                if (nodeUtil.isError(result2)) {
                    nodeUtil.log("productbooking: product.getbypnum failed!");
                    errHandler.responseError(result2, req, res);
                    return false;
                }
                var pf = new Product_files({id: result2[0].id});
                pf.get(function (result3) {
                    if (nodeUtil.isError(result3)) {
                        nodeUtil.log("productbooking: Product_files.get failed!");
                        errHandler.responseError(result3, req, res);
                        return false;
                    }
                    var inf = new Included_fee({id: result2[0].id});
                    inf.get(function (result4) {
                        if (nodeUtil.isError(result4)) {
                            nodeUtil.log("productbooking: Included_fee.get failed!");
                            errHandler.responseError(result4, req, res);
                            return false;
                        }
                        var ts = new Travel_schedule({id: result2[0].id});
                        ts.get(function (result5) {
                            if (nodeUtil.isError(result5)) {
                                nodeUtil.log("productbooking: Travel_schedule.get failed!");
                                errHandler.responseError(result5, req, res);
                                return false;
                            }
                            var pp = new Product_position({id: result2[0].id});
                            pp.get(function (result6) {
                                if (nodeUtil.isError(result6)) {
                                    nodeUtil.log("productbooking: Product_position.get failed!");
                                    errHandler.responseError(result6, req, res);
                                    return false;
                                }
                                var qq = new Booking_temp({id: result2[0].id,userid:req.session.user});
                                qq.get(function (result7) {
                                    if (nodeUtil.isError(result7)) {
                                        nodeUtil.log("productbooking: booking_temp.get failed!");
                                        errHandler.responseError(result7, req, res);
                                        return false;
                                    }
                                    var province = new Province();
                                    province.get(function (result8) {
                                        if (nodeUtil.isError(result8)) {
                                            nodeUtil.log("productbooking: Province.get failed!");
                                            errHandler.responseError(result8, req, res);
                                            return false;
                                        }
                                        var city = new City();
                                        city.get(function (result9) {
                                            if (nodeUtil.isError(result9)) {
                                                nodeUtil.log("productbooking: City.get failed!");
                                                errHandler.responseError(result9, req, res);
                                                return false;
                                            }
                                            var sql = "select * from product_insurance where product_id = " + result2[0].id;
                                            mysql.query(sql, function (err, rows) {
                                                if (err) {
                                                    nodeUtil.log(err + ": " + sql);
                                                    errHandler.responseError(new Error(err), req, res);
                                                    return false;
                                                }
                                                res.render('productbooking', {layout: "layout", pi: rows, user: result, company: result1, product: result2, pf: result3, inf: result4, ts: result5, pp: result6, no: utils.getNow(), qq: result7, province: result8, city: result9});
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
    //});
};

exports.productbookingsavesuccess = function (req, res) {
    permission.checkUser(req, res, function (result) {
        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }
            res.render('productbookingsavesuccess', {layout: "layout", user: result, company: result1});
        });
    });
};

exports.productbookingsuccess = function (req, res) {

    res.locals.bn = req.session.bn;
    res.locals.bnid = req.session.bnid;

    //permission.checkUser(req, res, function (result) {
        //var company = new Company({id: result[0].company_id});
        var result = [{
            id: 87
        }];
        var company = new Company({id: 231});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            } else {
                res.render('productbookingsuccess', {layout: "layout", user: result, company: result1});
            }
        });
    //});
};