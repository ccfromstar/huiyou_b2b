
var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Product_position(product_position) {
    this.id = product_position.id;
};
module.exports = Product_position;

Product_position.prototype.get = function get(callback) {
    var product_position = {
        id: this.id //<- product_id
    };

    var selectSQL  = //'select * from product_cabin where product_id = '+product_position.id+' order by cabin_category_id asc';
    _getQuery( " where product_id = " + product_position.id ) + " order by cabin_category_id asc";
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

Product_position.prototype.getall = function getall(callback) {
    //TODO
    var selectSQL  = _getQuery();
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

Product_position.prototype.getByProductIds = function(productIds, options, callback) {
    var selectSQL  = _getQuery( " where product_id in (" + productIds + ")", options );
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

function _getQuery(where, options) {
    if (!where) where="";
    var selectPP;
    if ( options && options.withoutRetailPrice ) {
        selectPP = "pp.id, pp.product_id, pp.cabin_type_id, pp.cabin_category_id, pp.price_condition, pp.price, " +
        "pp.price_2, pp.price_child, pp.amount, pp.tip, pp.comment,pp.retail_commission, ";
    } else {
        selectPP = "pp.id, pp.product_id, pp.cabin_type_id, pp.cabin_category_id, pp.price_condition, pp.price, pp.retail_price, " +
        "pp.price_2, pp.retail_price_2, pp.price_child, pp.retail_price_child, pp.amount, pp.tip, pp.comment,pp.retail_commission, ";
    }
    return "SELECT "+ selectPP + " cabin_category.txtCabinNo,cabin_category.txtCabinName,cabin_category.numCanCheckIn FROM (SELECT * FROM product_position "
        + where + ") AS pp LEFT JOIN cabin_category ON pp.cabin_category_id=cabin_category.id";
}







