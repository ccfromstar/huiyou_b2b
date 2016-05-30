var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Booking_temp(booking_temp) {
    this.id = booking_temp.id;
    this.userid = booking_temp.userid;
};
module.exports = Booking_temp;

Booking_temp.prototype.get = function get(callback) {
    var booking_temp = {
        id: this.id,
        userid:this.userid
    };
    //TODO
    var str1 = booking_temp.userid ? 'user_id= '+booking_temp.userid+' and':'';
    var selectSQL  = 'select * from booking_temp_cabin where '+str1+' product_id = '+booking_temp.id +' order by cabin_category_id asc';
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

Booking_temp.prototype.getall = function getall(callback) {
    //TODO
    var selectSQL  = 'select * from booking_temp_cabin ';
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








