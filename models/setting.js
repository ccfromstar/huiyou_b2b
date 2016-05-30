/**
 * Created by teng on 13.10.2014.
 */

var mysql = require('../models/db_mysql');
var nodeUtil = require('util');

exports.getServiceManager = function(callback) {
    mysql.query("select value as user_id from setting where name = 'booking_manager'", function(err, result) {
        if( err ) {
            nodeUtil.error(err + ": select value as user_id from setting where name = 'booking_manager'");
            return callback(new Error(err));
        }
        return callback(result[0].user_id);
    });
}