var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Province() {
	
};


Province.prototype.get = function get(callback) {
	var selectSQL  = 'select * from province';
	nodeUtil.log(selectSQL);
	mysql.query(selectSQL, function(err, rows, fields) {
			if (err) {
                nodeUtil.error(err + ": " + selectSQL);
                return callback(new Error(err));
			}
			return callback(rows);
	});
}

module.exports = Province;