var mysql = require('./db_mysql');
var nodeUtil = require('util');

//目的地
function Port() {
	
};

Port.prototype.get = function (callback) {
    var selectSQL = 'select p.txtPortCityName, p.txtCountry, p.txtPortCityInfo, p.rtfPortImg, ' +
        'a.txtCruiseArea, p.txtPortCityNameEn, p.txtLocation, p.txtisLine, p.txtSpecialPort from cruise_port p, cruise_area a, cruise_area_port ap ' +
        'where p.id = ap.port_id and a.id = ap.area_id order by p.rtfPortImg asc';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}

Port.prototype.getAreaPortMap = function (callback) {
    var selectSQL = 'select p.txtPortCityName port, a.id area from cruise_port p, cruise_area a, cruise_area_port ap ' +
        'where p.id = ap.port_id and a.id = ap.area_id order by p.range_number asc, p.txtPortCityName asc';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}

Port.prototype.getDeparturePortMap = function (callback) {
    var selectSQL = 'select p.txtPortCityName port, a.id area from cruise_port p, cruise_area a, cruise_area_port ap ' +
        'where p.is_departure_port = 1 and p.id = ap.port_id and a.id = ap.area_id order by p.range_number asc, p.txtPortCityName asc';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}
module.exports = Port;