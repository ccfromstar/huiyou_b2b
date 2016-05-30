/**
 * Created by teng on 29.10.2014.
 */

var mysql = require('../models/db_mysql');
var nodeUtil = require('util');
var email = require('./email.js');
var User = require('../models/user.js');

exports.notifyAll = function( subject, content ) {
    new User({}).getMails({}, function (recipientList) {
        if (recipientList && !nodeUtil.isError(recipientList)) {
            email.sendSystemMailMultiple(recipientList, subject, content);
        }
    });
}
exports.notifyAllBuyers = function( subject, content ) {
    new User({}).getMails({buyer_only: true}, function (recipientList) {
        if (recipientList && !nodeUtil.isError(recipientList)) {
            email.sendSystemMailMultiple(recipientList, subject, content);
        }
    });
}
exports.notifyAllSuppliers = function( subject, content ) {
    new User({}).getMails({supplier_only: true}, function (recipientList) {
        if (recipientList && !nodeUtil.isError(recipientList)) {
            email.sendSystemMailMultiple(recipientList, subject, content);
        }
    });
}
