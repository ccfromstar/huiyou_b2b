/**
 * Created by teng on 17.11.2014.
 */
var nodeUtil = require('util');
var User = require('../../models/user.js');
var mysql = require('../../models/db_mysql');
var utils = require('../../routes/utils.js');

exports.getOption = function(req, res){
    var userid = parseInt(req.param('id'));
    var openid = (req.param('openid'));
    var sql3 = "select cshort_name as companyname,name,mobile_phone as telephone, weixin_companyname,weixin_name,weixin_tel from user_company where id = " + userid +" and weixin_open_id= '"+openid+"'";
    //console.log(sql3);
    mysql.query(sql3, function(err, result) {
        return res.json(result[0]);
    });    
}

exports.setOption = function(req, res){
    var weixin_companyname = req.param('weixin_companyname');
    var weixin_name = req.param('weixin_name');
    var weixin_tel = req.param('weixin_tel');
    var userid = parseInt(req.param('id'));
    var sql4 = "update user set weixin_companyname = '"+weixin_companyname+"',weixin_name = '"+weixin_name+"',weixin_tel='"+weixin_tel+"' where id = "+userid;
    mysql.query(sql4, function(err, result) {
        if(err){
          return res.json(err);
        }else{
          return res.json("success");
        }
        
    });    
}

exports.resetOption = function(req, res){
    var userid = parseInt(req.param('id'));
    var openid = (req.param('openid'));
    var sql4 = "update user set weixin_companyname = NULL,weixin_name = NULL,weixin_tel = NULL where id = "+userid +" and weixin_open_id= '"+openid+"'";
    mysql.query(sql4, function(err, result) {
        if(err){
          return res.json(err);
        }else{
          return res.json("success");
        }
        
    });   
}

exports.bindWeChat = function(req, res){

    var pwd = req.param('password');
    var login = req.param('loginName');
    var openId = req.param('openId');

    if ( !openId || !pwd || !login ) {
        return res.json({error: 'missing required parameters! Error code: BIND001'});
    }

    var user = new User({
        loginName: login,
        password: utils.md5(pwd)
    });

    user.checkLogin(function (result) {
        if ( nodeUtil.isError(result) || result == "loginWrong" ) {
            nodeUtil.log("webservicesAuth bindWeChat: login wrong!");
            res.json({error: 'failed to bind WeChat! Error code: BIND003'});
            return false;
        }
        
        user.id = result;
        var sql = "SELECT u.id, u.name, c.short_name AS company, u.departmentName AS department, u.mobile_phone AS mobilePhone FROM user u, company c WHERE u.id=" + user.id + " AND u.company_id = c.id";
        mysql.query(sql, function(err, resUser) {
            if (err) {
                nodeUtil.log("webservicesAuth bindWeChat: failed to get user!" + err);
                res.json({error: 'failed to bind WeChat! Error code: BIND004. ' + err});
                return false;
            }
            if ( resUser && resUser.length > 0) {
                sql = "UPDATE user SET weixin_open_id = '" + openId + "' WHERE id = " + user.id;
                mysql.query(sql, function(err2, resUpdateOpenId){
                    if(err2) {
                        nodeUtil.log('failed to update user: ' + err2);
                        return res.json({error: 'failed to bind WeChat! Error code: BIND002 ' + err2});
                    }
                    return res.json(resUser[0]);
                });
                
            }

            return res.json({error: 'user not found!'});

        });

    });
    
}

exports.authUser = function(req, res){

    var pwd = req.param('password');
    var login = req.param('loginName');
    var openId = req.param('openId');

    if ( openId ) {

        var sql = "SELECT u.id, u.name, c.short_name AS company, u.departmentName AS department, u.mobile_phone AS mobilePhone FROM user u, company c WHERE u.id=" + user.id + " AND u.weixin_open_id='" + openId + "' AND u.company_id = c.id";
        mysql.query(sql, function(err, resUser) {
            if (err) {
                nodeUtil.log("webservicesAuth authUser: failed to get user!" + err);
                res.json({error: 'auth failed! Error code: AUTH001'});
                return false;
            }
            if ( resUser && resUser.length > 0) {
                return res.json(resUser[0]);
            }
            return res.json({error: 'auth failed! Error code: AUTH002'});
        });

    } else {

        if (!pwd || !login) {
            return res.json({error: 'missing required parameters!'});
        }

        // login using pwd
        var user = new User({
            loginName: login,
            password: utils.md5(pwd)
        });

        user.checkLogin(function (result) {
            if (nodeUtil.isError(result) || result == "loginWrong") {
                res.json({error: 'login failed!'});
                return false;
            }

            user.id = result;
            var sql = "SELECT u.id, u.name, c.short_name AS company, u.departmentName AS department, u.mobile_phone AS mobilePhone FROM user u, company c WHERE u.id=" + user.id + " AND u.company_id = c.id";
            mysql.query(sql, function (err, resUser) {
                if (err) {
                    nodeUtil.log("webservicesAuth: failed to get user!");
                    res.json({error: err});
                    return false;
                }
                if (resUser && resUser.length > 0) {
                    return res.json(resUser[0]);
                }

                return res.json({error: 'user not found!'});

            });

        });
    }
}
