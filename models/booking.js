var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Booking(booking) {
    this.id = booking.id;
};
module.exports = Booking;

Booking.prototype.get = function get(callback) {
    var booking = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from booking_product where product_id = '+booking.id;
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

Booking.prototype.getbyid = function get(callback) {
    var booking = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from booking_product where id = '+booking.id +' order by created_at asc';
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

/**
 * TODO offset limit
 * @param callback
 */
Booking.prototype.getall = function getall(callback) {
    var selectSQL  = 'select * from booking_product order by created_at desc';
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

/**
 *
 * @param params
 {
    columns : [], // booking columns to select
    user_id : null // the booking.owner_id or booking.service_user_id or product.owner_id
 }
 * @param callback
 */
Booking.prototype.getByParameters = function (params, callback) {
    var columns = "";
    var where = "";
    if (params) {
        if (params.columns) {
            for (var i in params.columns) {
                if (columns) {
                    columns += ", ";
                }
                columns += "booking." + params.columns[i];
            }
        }
        if (params.user_id) {
            where += " booking.owner_id = " + params.user_id + " or product.owner_id = " + params.user_id +
            " or booking.service_user_id = " + params.user_id;
        }
    }
    if (!columns) {
        columns = "booking.*, "
    }
    if (where) {
        where = " where " + where;
    }
    var selectSQL = "SELECT " + columns + ", u1.company_id as supplier_id,u2.name as u2name,c1.short_name as sn, " +
        " product.service_by_huiyou, product.owner_id as owner_id1, booking_status.name as bname, " +
        " product.product_number, product.title, company.short_name, product.contact_person, product.contact_mobile_phone " +
        " FROM booking LEFT JOIN product ON booking.product_id=product.id " +
        " LEFT JOIN booking_status ON booking.status_id=booking_status.id " +
        " LEFT JOIN company ON product.supplier_id=company.id " +
        " LEFT JOIN user u1 ON booking.owner_id=u1.id " +
        " LEFT JOIN company c1  ON u1.company_id=c1.id  LEFT JOIN user u2 " +
        " ON booking.service_user_id=u2.id " + where + " order by booking.created_at desc";
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }

        return callback(rows);

    });
}








