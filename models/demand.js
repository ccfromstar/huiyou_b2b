var mysql = require('./db_mysql');
var nodeUtil = require('util');
var DEFAULT_LIMIT = 6;

function Demand(demand) {
    this.owner_id = demand.owner_id;
    this.description = demand.description;
    this.key = demand.key;
    this.numStart = demand.numStart;
};
module.exports = Demand;

Demand.prototype.save = function get(callback) {
    var demand = {
        owner_id: this.owner_id,
        description :this.description
    };
    //TODO
    var insertSQL  = "insert into demand (owner_id,description,status_id,created_at,published_at) values ('"+demand.owner_id+"','"+demand.description+"',2,now(),now())";
    nodeUtil.log(insertSQL);
    mysql.query(insertSQL,function (err, res) {
        if (err){
            nodeUtil.error(err + ": " + insertSQL);
            return callback(new Error(err));
        }
        return callback(res);

    });
}

Demand.prototype.get = function get(callback) {
    //TODO
    var selectSQL  = "select * from demand_user order by published_at desc";
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

Demand.prototype.getByParameters = function ( parameters, callback ){
    return _get(parameters, callback);
}

function _get(params, callback) {
    var selectSQL;
    var columns = "";
    if ( params.columns ){
        for ( var i in params.columns ){
            if ( columns ) {
                columns += ", ";
            }
            columns += ("d." + params.columns[i]);
        }
    }
    if ( !columns ){
        columns = "d.*";
    }
    columns += ", user.company_id, user.name, company.short_name, company.logo";
    var offset = "";
    if ( params.offset ){
        offset = params.offset + ", ";
    }
    var limit = "";
    if ( params.limit ) {
        limit = params.limit;
    } else {
        limit = DEFAULT_LIMIT;
    }
    var where = "";
    var statusId = parseInt(params.status);
    if ( statusId ) {
        where = " where status_id = " + params.status;
    }
    selectSQL = "select " + columns + " from (select * from demand "+ where +" order by published_at desc limit " + offset + limit + ") as d";
    selectSQL += " LEFT JOIN user ON d.owner_id=user.id LEFT JOIN company ON user.company_id = company.id";
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}

Demand.prototype.getbykey = function getbykey(callback) {
    //TODO
    var demand = {
        numStart:this.numStart,
        key:this.key
    };
    var selectSQL  = "select * from demand_user where status_id = 2 and  description like '%"+demand.key+"%' order by published_at desc limit "+demand.numStart+", 6 ";
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

Demand.prototype.getallbykey = function getallbykey(callback) {
    //TODO
    var demand = {
        numStart:this.numStart,
        key:this.key
    };
    var selectSQL  = "select * from demand_user where status_id = 2 and  description like '%"+demand.key+"%' order by published_at desc";
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

Demand.prototype.getallbyuser = function getallbyuser(callback) {
    //TODO
    var demand = {
        key:this.key
    };
    var selectSQL  = "select * from demand_user order by published_at desc";
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

Demand.prototype.getbyid = function getallbyuser(callback) {
    //TODO
    var demand = {
        key:this.key
    };
    var selectSQL  = "select * from demand where id ="+demand.key;
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
