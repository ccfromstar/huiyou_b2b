var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Product_files(product_files) {
    this.id = product_files.id;
};
module.exports = Product_files;

Product_files.prototype.get = function get(callback) {
    var product_files = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from product_files where product_id = '+product_files.id;
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}








