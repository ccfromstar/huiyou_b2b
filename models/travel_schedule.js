/* 航线日程 */
var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Travel_schedule(travel_schedule) {
    this.id = travel_schedule.id;
};
module.exports = Travel_schedule;

Travel_schedule.prototype.get = function get(callback) {
    var travel_schedule = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from travel_schedule where product_id = '+travel_schedule.id +' order by day_number asc';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.log(err + ": " + selectSQL);
            return callback(new Error(err));
        } else {
            return callback(rows);
        }
    });
}

Travel_schedule.prototype.getall = function get(callback) {
    //TODO
    var selectSQL  = 'select * from travel_schedule';
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

Travel_schedule.prototype.getbynohh = function get(callback) {
    var travel_schedule = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from travel_schedule where product_id = '+travel_schedule.id +' order by day_number asc';
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

Travel_schedule.prototype.getallbynohh = function get(callback) {
    //TODO
    var selectSQL  = 'select * from travel_schedule order by day_number asc';
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

Travel_schedule.prototype.getByProductIds = function(productIds, callback) {
    //TODO
    var selectSQL  = "select * from travel_schedule where product_id in (" + productIds + ")  order by day_number asc";
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

Travel_schedule.prototype.getByParameters = function(params, callback) {
    var selectSQL;
    var select = "";
    var where = "";
    if (params.columns) {
        for (var i in params.columns) {
            if (select) {
                select += ", " + params.columns[i];
            } else {
                select = params.columns[i];
            }
        }
    }
    if (!select) {
        select = "*";
    }
    selectSQL = "select " + select + " from travel_schedule ";
    if (params.product_ids) {
        where = " where product_id in (" + params.product_ids + ") ";
    }
    if (params.day_number) {
        if ( where ) {
            where += " and day_number = " + params.day_number;
        } else {
            where = " where day_number = " + params.day_number;
        }
    }
    selectSQL += where + " order by product_id";
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        } else {
            return callback(rows);
        }
    });
}

Travel_schedule.prototype.getAllPorts = function(callback) {
    var now = new Date();
    var m = now.getMonth()+1;
    m = m +"";
    if(m.length==1){
        m = "0" + m;
    }
    var d = now.getDate();
    d= d +"";
    if(d.length==1){
        d = "0" + d;
    }
    var currentDate = now.getFullYear()+"-"+m+"-"+d;
    var q = "select distinct(location) from travel_schedule t, product p where p.status_id = 3 and t.product_id = p.id and p.start_date >= '"+currentDate+
    "' and location is not null and location <> '' and location <> '航海日' and day_number = 1";
    mysql.query(q, function(err, rows){
        if ( err ) {
            nodeUtil.error(err + ": " + q);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}



