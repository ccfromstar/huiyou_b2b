/**
 * user controller
 */
var mysql = require('../models/db_mysql');
var User = require('../models/user.js');
var Regist = require('../models/regist.js');
var email = require('./email.js');
var utils = require('./utils.js');
var errHandler = require('./error.js');
var nodeUtil = require('util');
var sms = require('./sms.js');

exports.login = function (req, res) {
    var pwd = "hyl123";
    if(req.body.password!=pwd){
        pwd = utils.md5(req.body.password);
    }
    var user = new User({
        loginName: req.body.username,
        password: pwd
    });

    user.checkLogin(function (result) {
        if ( nodeUtil.isError(result) ) {
            return res.redirect('/login');
        }
        if ( result == "loginWrong" ) {
            nodeUtil.log("user " + result + " login wrong");
            req.session.error = "用户名或密码错误!";
            return res.redirect('/');
        }
        nodeUtil.log("user " + result + " login successful!");
        req.session.success = "用户登录成功!";
        req.session.user = result;
        console.log(req.session.user);
        res.redirect('/redirect');
    });
}

exports.forgetpwd = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var user = new User({
        id: req.query.p
    });
    user.getpwd(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError(result, req, res);
            return false;
        }
        if (utils.isEmpty(result)) {
            res.render('forgetpwd', {layout: "false", info: "对不起，您填写的邮箱不是您账户注册的邮箱！"});
        } else {
            //生成随机密码
            var pwd = makePasswd(result[0].email, result[0].mobile_phone);
            //对密码进行md5加密
            var pwdmd5 = utils.md5(pwd);
            mysql.query("delete from reset_password where user_id = " + result[0].id, function( err, deleteRes) {
                mysql.query("insert into reset_password (user_id, new_password) values ("+ result[0].id + ", '" + pwdmd5 + "')", function (err, rows) {
                //mysql.query("update user set password='" + pwdmd5 + "' where id=" + result[0].id, function (err, rows) {
                    mysql.query("select name, email from user where id=" + result[0].id, function (err, rows2) {
                        //发邮件
                        email.sendSystemMail(result[0].email,
                            "密码找回",
                            "尊敬的" + rows2[0].name + "，您好！<br/><b>您的新的登陆密码：</b><b style='color:#FF0000'>" + pwd + "</b><br/>注意，您的旧密码在使用新密码后才失效。您可以在[个人中心]-[账户管理]里修改您的密码。",
                            function(sendMailRessponse){
                                if ( nodeUtil.isError(sendMailRessponse) ){
                                    res.render('forgetpwd', {layout: "false", info: "对不起！发送密码到您的邮箱时系统发生错误，请您稍候再试或者联系我们！"});
                                } else {
                                    res.render('forgetpwd', {layout: "false", info: "密码已发送到您注册时填写的邮箱！"});
                                }
                            });
                    });
                });
            });
        }
    });
}
exports.registNewUser = function (req, res) {
    //判断用户注册信息是否注册成功
    //生成随机密码
    var pwd = makePasswd(req.body.useremail,req.body.userTel);
    //对密码进行md5加密
    var pwdmd5 = utils.md5(pwd);

    var op = req.files;

    var logopath = "";

    if(op.logo){
        logopath = op.logo.path.replace("public\\files\\","").replace("public/files/","");
    }

    var regist = new Regist(
        {
            name:req.body.txtCompanyName,
            short_name:req.body.shortname,
            province:req.body.province,
            city:req.body.city,
            address:req.body.address,
            telephone_area_code:req.body.zone,
            telephone:req.body.txtTel,
            fax:req.body.txtFax,
            payment_transfer:req.body.payment_transfer,
            payment_online_banking:req.body.payment_online_banking,
            payment_alipay:req.body.payment_alipay,
            payment_cheque:req.body.payment_cheque,
            payment_cash:req.body.payment_cash,
            bank:req.body.bank,
            accountNo:req.body.accountNo,
            logo:logopath,
            account_name:req.body.account_name
        },{
            name:req.body.username,
            departmentName:req.body.departmentName,
            position:req.body.position,
            telephone:req.body.usertelephone,
            fax:req.body.userFax,
            mobilephone:req.body.userTel,
            email:req.body.useremail,
            password:"",
            password_md5:""
        }
    );
    regist.save(function (result) {
        if (nodeUtil.isError(result)) {
            errHandler.responseError("注册失败！ " + result, req, res);
            return false;
        } else {
            var code = result.resultCode;
            var msg = result.resultMessage;
            if(code == 0){
                //发送邮件给booking@huiyoulun.com提示有新用户提交了注册信息
                email.sendSystemMail("booking@huiyoulun.com",
                    "荟邮轮提示信息",
                    "有新用户注册了需要审核！");

                res.redirect('regsuccess');
            }else{
                req.session.error = msg;
                nodeUtil.log(msg);
                res.redirect('errorreturn');
            }
        }
    });
};
/*验证用户*/
exports.confirmNewUser = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    if(req.body.type=="yes"){
        var pwd = makePasswd(req.body.email,req.body.userTel);
        //对密码进行md5加密
        var pwdmd5 = utils.md5(pwd);
        var q = "update user set activated = 1,certified=1,approve_id="+req.session.user+",password='"+pwdmd5+"' where id="+req.body.id;
        mysql.query(q, function (err, rows) {
            if (err){
                nodeUtil.error(err + ": " + q);
                errHandler.responseError(new Error(err), req, res);
                return false;
            }
            mysql.query("update company set activated = 1,certified=1 where id="+req.body.company_id,function (err, rows1) {
                if (err){
                    nodeUtil.error(err + ": " + q);
                    errHandler.responseError(new Error(err), req, res);
                    return false;
                }
                mysql.query("select * from user where id="+req.body.id,function (err, rows2) {
                    if (err){
                        nodeUtil.error(err + ": " + q);
                        errHandler.responseError(new Error(err), req, res);
                        return false;
                    }
                    //发送密码给用户的邮箱
                    email.sendSystemMail(req.body.email,
                        "欢迎注册荟邮轮",
                        "尊敬的"+rows2[0].name+"，您好！<br/>恭喜您已成功开通荟邮轮！<br/><b>您的账号："+rows2[0].email+"，密码：</b><b style='color:#FF0000'>"+pwd+"</b><br/>您可以在[个人中心]-[账户管理]里修改您的登陆密码。<br/>当前开通的账号为荟邮轮分销商（买家）权限，可进行邮轮产品信息查询及预订。<br/>如您需要发布邮轮产品信息，请联系荟邮轮开通供应商（卖家）权限。");
                    sms.sendSMS(rows2[0].mobile_phone,"您好！恭喜您已成功开通荟邮轮！账号："+rows2[0].email+"，密码："+pwd+"。");
                    res.redirect('/b_user');
                });
            });
        });

    }else{

        //审核不通过
        var pwd = makePasswd(req.body.email,req.body.userTel);
        //对密码进行md5加密
        var pwdmd5 = utils.md5(pwd);
        var q = "update user set activated = 0,certified=0,password='"+pwdmd5+"' where id="+req.body.id;
        mysql.query(q, function (err, rows) {
            if (err){
                nodeUtil.error(err + ": " + q);
                errHandler.responseError(new Error(err), req, res);
                return false;
            }
            mysql.query("update company set activated = 0,certified=0 where id="+req.body.company_id,function (err, rows1) {
                if (err){
                    nodeUtil.error(err + ": " + q);
                    errHandler.responseError(new Error(err), req, res);
                    return false;
                }
                mysql.query("select * from user where id="+req.body.id,function (err, rows2) {
                    if (err){
                        nodeUtil.error(err + ": " + q);
                        errHandler.responseError(new Error(err), req, res);
                        return false;
                    }
                    //发送密码给用户的邮箱
                    email.sendSystemMail(req.body.email,
                        "欢迎注册荟邮轮",
                        "尊敬的"+rows2[0].name+"，您好！<br/>很抱歉地通知您，您的注册未通过。<br/>详细原因请咨询荟邮轮客服。");

                    res.redirect('/b_user');
                });
            });
        });
    }
}
//子用户管理
exports.adminSubUser = function (req, res) {
    var regist = new Regist(
        {}, {
            name: req.body.username,
            departmentName: req.body.departmentName,
            position: req.body.position,
            telephone: req.body.usertelephone,
            fax: req.body.userFax,
            mobilephone: req.body.userTel,
            email: req.body.useremail,
            password: utils.md5(req.body.password2),
            company_id: req.body.company_id,
            role_buyer: req.body.role_buyer,
            role_seller: req.body.role_seller,
            role_accountant: req.body.role_accountant,
            password_md5:req.body.password2
        }
    );

    if (req.body.stype == "new") {
        //新注册子用户
        regist.savezi(function (result) {
            if (nodeUtil.isError(result)) {
                errHandler.responseError(result, req, res);
                return false;
            }
            var code = result.resultCode;
            var msg = result.resultMessage;
            if (code == 0) {
                req.session.error = "用户添加成功！";
                res.redirect('/option');
            } else {
                req.session.error = msg;
                res.redirect('/errorreturn');
            }
        });
    } else if (req.body.stype == "delete") {
        //删除子用户
        var sql1 = "delete from user where id=" + req.body.docid;
        mysql.query(sql1, function (err, rows) {
            if (err) {
                errHandler.logErrorAndResponse(err, sql1, req, res);
                return false;
            }
            req.session.error = "删除成功！";
            res.redirect('/option');
        });
    } else {
        //更新子用户
        var sql1 = "update user set name = '" + req.body.username + "',departmentName ='" + req.body.departmentName + "',position='" + req.body.position + "',telephone='" + req.body.usertelephone + "',fax='" + req.body.userFax + "',role_buyer=" + req.body.role_buyer + ",role_seller=" + req.body.role_seller + ",role_accountant=" + req.body.role_accountant + " where id=" + req.body.docid;
        mysql.query(sql1, function (err, rows) {
            if (err) {
                errHandler.logErrorAndResponse(err, sql1, req, res);
                return false;
            }
            req.session.error = "修改成功！";
            res.redirect('loading?page=option');
        });
    }
}
exports.changePassword = function (req, res) {
    var strength = utils.checkPwdStrength(req.body.password2);
    if ( req.body.password2.length < 6 || !strength ) {
        req.session.error = "您选择的密码不符合安全要求，请选择另外的密码（至少6个字符，建议密码由大小写字母、数字及特殊字符混合组成）！";
        res.redirect('optionpwd');
        return false;
    }
    if ( strength == "weak" ) {
        strength = "您选择的密码安全性不强，建议选择由大小写字母、数字及特殊字符混合组成的密码";
    } else {
        strength = "";
    }

    var user = new User({
        password:utils.md5(req.body.password2),
        id:req.session.user
    });
    user.changepwd(function (err) {
        if (nodeUtil.isError(err)) {
            errHandler.responseError(err, req, res);
            return false;
        }
        req.session.error = "密码修改成功！" + strength;
        res.redirect('optionpwd');
    });
}

function makePasswd(email, phone) {
    //通过手机号随机生成6位密码
    var passwd = '';
    var chars = phone;
    for (i=1;i<7;i++) {
        var c = Math.floor(Math.random()*chars.length + 1);
        passwd += chars.charAt(c)
    }
    return passwd;
}