var mysql = require('./db_mysql');
var error = require('./error');

function Question() {
	
};


Question.prototype.get = function get(callback) {
	var selectSQL  = 'select * from question';
	console.log(selectSQL);
	mysql.query(selectSQL, function(err, rows, fields) {
			
			if (err) {
				console.log("error:" + err);
				return callback(error.getErrorMessage(err));
			}
			return callback(rows);
	});
}

module.exports = Question;