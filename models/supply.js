var mysql = require('./db_mysql');
var nodeUtil = require('util');
var DEFAULT_LIMIT = 6;

function Supply(supply) {
    this.owner_id = supply.owner_id;
    this.ship_id = supply.ship_id;
    this.departure_date = supply.departure_date;
    this.day = supply.day;
    this.cruise_route = supply.cruise_route;
    this.cabin_category_id = supply.cabin_category_id;
    this.amount = supply.amount;
    this.price_now = supply.price_now;
    this.price_old = supply.price_old;
    this.description = supply.description;
    this.img_url = supply.img_url;
    this.key = supply.key;
    this.numStart = supply.numStart;
    this.created_at = supply.created_at;
    this.datstart = supply.datstart;
    this.cf = supply.cf;
    this.mdd = supply.mdd;
    this.txtCuriseCompany = supply.txtCuriseCompany;
    this.ship_id = supply.ship_id;
    this.pse2 = supply.pse2;
};
module.exports = Supply;

Supply.prototype.save = function get(callback) {
    var supply = {
        owner_id: this.owner_id,
        ship_id: this.ship_id,
        departure_date :this.departure_date,
        day :this.day,
        cruise_route :this.cruise_route,
        cabin_category_id :this.cabin_category_id,
        amount :this.amount,
        price_now :this.price_now,
        price_old :this.price_old,
        description :this.description,
        img_url :this.img_url
    };
    //TODO
    var insertSQL  = "insert into supply (owner_id,ship_id,departure_date,days,cruise_route,cabin_category_id,amount,price_old,price_now,description,img_url,status_id,created_at,published_at) values ("+supply.owner_id+","+supply.ship_id+",'"+supply.departure_date+"',"+supply.day+",'"+supply.cruise_route+"',"+supply.cabin_category_id+","+supply.amount+","+supply.price_old+","+supply.price_now+",'"+supply.description+"','"+supply.img_url+"',2,now(),now())";
    nodeUtil.log(insertSQL);
    mysql.query(insertSQL,function (err, res) {
        if (err){
            nodeUtil.error(err + ": " + insertSQL);
            return callback(new Error(err));
        }
        return callback(res);

    });
}

Supply.prototype.upsave = function get(callback) {
    var supply = {
        owner_id: this.owner_id,
        ship_id: this.ship_id,
        departure_date :this.departure_date,
        day :this.day,
        cruise_route :this.cruise_route,
        cabin_category_id :this.cabin_category_id,
        amount :this.amount,
        price_now :this.price_now,
        price_old :this.price_old,
        description :this.description,
        img_url :this.img_url,
        created_at:this.created_at
    };
    //TODO
    var insertSQL  = "insert into supply (owner_id,ship_id,departure_date,days,cruise_route,cabin_category_id,amount,price_old,price_now,description,img_url,status_id,created_at,published_at) values ("+supply.owner_id+","+supply.ship_id+",'"+supply.departure_date+"',"+supply.day+",'"+supply.cruise_route+"',"+supply.cabin_category_id+","+supply.amount+","+supply.price_old+","+supply.price_now+",'"+supply.description+"','"+supply.img_url+"',2,'"+supply.created_at+"','"+supply.created_at+"')";
    nodeUtil.log(insertSQL);
    mysql.query(insertSQL,function (err, res) {
        if (err){
            nodeUtil.error(err + ": " + insertSQL);
            return callback(new Error(err));
        }
        return callback(res);

    });
}

/**
 * @deprecated
 * @param callback
 */
Supply.prototype.get = function get(callback) {
    //TODO
    var selectSQL  = "select * from supply_user order by published_at desc";
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

Supply.prototype.getByParameters = function ( parameters, callback ){
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
            columns += ("s." + params.columns[i]);
        }
    }
    if ( !columns ){
        columns = "s.*";
    }
    columns += ", user.company_id, user.mobile_phone, user.name, company.short_name, cruise_ship.id as sid, " +
    " cruise_ship.txtShipName, cabin_category.txtCabinName, company.logo, cruise_company.txtCompanyNo";
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
    selectSQL = "select " + columns + " from (select * from supply " + where + " order by published_at desc limit " + offset + limit + ") as s ";
    selectSQL += " LEFT JOIN user ON s.owner_id=user.id LEFT JOIN company ON user.company_id = company.id " +
    " LEFT JOIN cruise_ship ON s.ship_id = cruise_ship.id LEFT JOIN cabin_category ON s.cabin_category_id = cabin_category.id " +
    " LEFT JOIN cruise_company ON cruise_ship.txtCompanyNo = cruise_company.txtCompanyNo";
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows);
        }
    });
}

Supply.prototype.getbykey = function getbykey(callback) {
    //TODO
    var supply = {
        numStart:this.numStart,
        key:this.key,
        datstart:this.datstart,
        cf:this.cf,
        mdd:this.mdd,
        txtCuriseCompany:this.txtCuriseCompany,
        ship_id:this.ship_id,
        pse2:this.pse2
    };

    if(supply.pse2=="2"){
        pe2 = "departure_date";
        pe3 = "asc";
    }else if(supply.pse2=="3"){
        pe2 = "created_at";
        pe3 = "desc";
    }else if(supply.pse2=="1"){
        pe2 = "price_now";
        pe3 = "asc";
    }

    var selectSQL  = "select * from supply_user where status_id = 2 and departure_date like '%"+supply.datstart+"%' and txtCabinName like '%"+supply.cf+"%' and cruise_route like '%"+supply.mdd+"%' and txtCompanyNo like '%"+supply.txtCuriseCompany+"%' and sid like '%"+supply.ship_id+"%' order by "+pe2+" "+pe3+" limit "+supply.numStart+", 6 ";
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

Supply.prototype.getallbykey = function getallbykey(callback) {
    //TODO
    var supply = {
        numStart:this.numStart,
        key:this.key,
        datstart:this.datstart,
        cf:this.cf,
        mdd:this.mdd,
        txtCuriseCompany:this.txtCuriseCompany,
        ship_id:this.ship_id
    };
    var selectSQL  = "select * from supply_user where status_id = 2 and departure_date like '%"+supply.datstart+"%' and txtCabinName like '%"+supply.cf+"%' and cruise_route like '%"+supply.mdd+"%' and txtCompanyNo like '%"+supply.txtCuriseCompany+"%' and sid like '%"+supply.ship_id+"%' order by published_at desc";
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

Supply.prototype.getallbyuser = function getallbyuser(callback) {
    //TODO
    var supply = {
        key:this.key
    };
    var selectSQL  = "select * from supply_user order by published_at desc";
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

Supply.prototype.getbyid = function getallbyuser(callback) {
    //TODO
    var supply = {
        key:this.key
    };
    var selectSQL  = "select * from supply where id ="+supply.key;
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

Supply.prototype.getTotalByKey = function(callback) {
    //TODO
    var supply = {
        numStart:this.numStart,
        key:this.key,
        datstart:this.datstart,
        cf:this.cf,
        mdd:this.mdd,
        txtCuriseCompany:this.txtCuriseCompany,
        ship_id:this.ship_id
    };
    var selectSQL  = "select count(*) as total from supply_user where status_id = 2 and departure_date like '%"+supply.datstart+"%' and txtCabinName like '%"+supply.cf+"%' and cruise_route like '%"+supply.mdd+"%' and txtCompanyNo like '%"+supply.txtCuriseCompany+"%' and sid like '%"+supply.ship_id+"%' order by published_at desc";
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL,function (err, rows) {
        if (err){
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }else{
            return callback(rows[0].total);
        }
    });
}