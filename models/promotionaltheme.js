var mysql = require('./db_mysql');
var error = require('./error');

function PromotionalTheme() {
	
};


PromotionalTheme.prototype.get = function get(callback) {
	var selectSQL  = 'select * from promotional_theme';
	console.log(selectSQL);
	mysql.query(selectSQL, function(err, rows, fields) {
			
			if (err) {
				console.log("error:" + err);
				return callback(error.getErrorMessage(err));
			}
			return callback(rows);
	});
}

module.exports = PromotionalTheme;