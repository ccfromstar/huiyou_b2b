/**
 * 使用该模块检查用户权限
 *
 * Created by teng on 04.10.2014.
 */
 var User = require('../models/user.js');
var nodeUtil = require('util');
var errHandler = require('./error.js');


/* 检查用户权限，无权限用户被转到登陆页面 */
function _checkUser(req, res, cache, callback) {
    if (req.query.id){
        req.session.user = req.query.id;
    }
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    if ( !cache ) {
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Pragma", "no-cache");
    }

    if ( !req.session.user ) {
        res.render('cerror', {layout:false});
        return false;
    }

    var user = new User({
        id:req.session.user
    });
    user.get(function (currentUser) {
        if (nodeUtil.isError(currentUser)) {
            nodeUtil.log("checkUser: failed to get user!");
            res.render('cerror', {layout:false});
            return false;
        }
        return callback(currentUser);
    });
}

exports.checkUserCache = function (req, res, callback) {
    return _checkUser(req, res, true, callback);
}
exports.checkUser = function(req, res, callback){
    return _checkUser(req, res, false, callback);
}

exports.checkAdmin = function(req, res, callback) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    if (req.session.user) {
        var user = new User({
            id: req.session.user
        });
        user.checkSysAdmin(function (result) {
            if (nodeUtil.isError(result)) {
                errHandler.responseError(result, req, res);
                return false;
            }
            return callback(result.is_sys_admin);
        });
    } else {
        return callback(false);
    }
};

exports.config = {
    cookie: {
        name: 'cds',// modified in app.js
        secret: 'cds'// modified in app.js
    },
    session: {
        store: null // initialized in app.js
    }
}