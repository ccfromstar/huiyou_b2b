/**
 * Created by teng on 07.08.2014.
 */
var nodeUtil = require('util');
var settings = require('../settings.js');

var config = {
    host: settings.db.host,
    //host: '127.0.0.1',
    user: settings.db.user,
	password: settings.db.password,
    database: settings.db.database,
    port: settings.db.port,

    //------- node-mysql options ---
    dateStrings: true
    //------- pool options ------
    //acquireTimeout : 10000,
    //waitForConnections : true,
    //connectionLimit : 10,
    //queueLimit : 0
};

var mysql = require('mysql');
var pool = mysql.createPool(config);
nodeUtil.log('database config: ' + settings.db.host+':'+settings.db.port+"/"+settings.db.database);

function _query(sql, callback){

    if ( !pool || pool._closed ) {
        pool = mysql.createPool(config);
    }

    pool.getConnection(function(err, connection) {

        try {
            connection.query(sql, function (err, rows) {

                callback(err, rows);

                // And done with the connection.
                connection.release();

                // Don't use the connection here, it has been returned to the pool.
            });
        }catch(e) {
            console.log(e);
            callback(e);
            if ( connection ) {
                connection.release();
            }
        }
    });
};

exports.query = function(sql, callback){
    _query(sql, callback);
}

exports.queryE = function(sql, callback) {
    _query(sql, function (err, rows) {
        if (err) {
            nodeUtil.error(err + ': ' + q);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}