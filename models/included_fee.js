var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Included_fee(included_fee) {
    this.id = included_fee.id;
};
module.exports = Included_fee;

Included_fee.prototype.get = function get(callback) {
    var included_fee = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from included_fee where product_id = '+included_fee.id;

    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

Included_fee.prototype.getall = function getall(callback) {
    //TODO
    var selectSQL  = 'select * from included_fee ';

    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

Included_fee.prototype.getByProductIds = function(productIds, callback) {
    //TODO
    var selectSQL  = "select * from included_fee where product_id in (" + productIds +")";

    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}








