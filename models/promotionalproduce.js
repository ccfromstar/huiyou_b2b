var mysql = require('./db_mysql');
var error = require('./error');

function PromotionalProduce(docid) {
    this.docid = docid;
};


PromotionalProduce.prototype.get = function get(callback) {
	var selectSQL  = 'select * from promotional_produce';
	console.log(selectSQL);
	mysql.query(selectSQL, function(err, rows, fields) {
			if (err) {
				console.log("error:" + err);
				return callback(error.getErrorMessage(err));
			}
			return callback(rows);
	});
}

PromotionalProduce.prototype.getByid = function get(callback) {
    var pp = {
        docid: this.docid
    };
    var selectSQL  = 'select * from promotional_produce where id = ' + pp.docid;
    console.log(selectSQL);
    mysql.query(selectSQL, function(err, rows, fields) {

            if (err) {
                console.log("error:" + err);
                return callback(error.getErrorMessage(err));
            }
            return callback(rows);
    });
}

module.exports = PromotionalProduce;