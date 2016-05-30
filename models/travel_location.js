/**
 * Created by teng on 03.12.2014.
 */

var mysql = require('./db_mysql');
var nodeUtil = require('util');

function TravelLocation() {
}

TravelLocation.prototype.getStartLocation = function (callback) {
    var selectSQL = 'select name, country from travel_location where start_location = 1 order by range_number asc, name asc';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}

module.exports = TravelLocation;