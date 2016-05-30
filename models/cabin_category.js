var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Cabin_category(cabin_category) {

};
module.exports = Cabin_category;

Cabin_category.prototype.get = function get(callback) {
    //TODO
    var selectSQL  = 'select * from cabin_category ';
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

Cabin_category.prototype.getall = function get(callback) {
    //TODO
    var selectSQL  = 'select * from cabin_category where id != 9999 order by txtCabinType desc';
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

