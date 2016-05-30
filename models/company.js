var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Company(company) {
    this.id = company.id;
};
module.exports = Company;

Company.prototype.get = function get(callback) {
    var company = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from company where id = '+company.id;
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if ( err ){
            nodeUtil.error(err + ": "+ selectSQL);
            return callback(new Error(err));
        } else {
            return callback(rows);
        }
    });
}

