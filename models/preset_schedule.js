var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Preset_schedule(preset_schedule) {

};
module.exports = Preset_schedule;

Preset_schedule.prototype.get = function get(callback) {
    var q  = 'select * from preset_schedule';
    mysql.query(q,function (err, rows) {
        if (err){
        	nodeUtil.error( err + ": " + q );
        	return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

