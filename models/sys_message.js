/**
 * Created by teng on 08.08.2014.
 */
var CHAT_CONSTANTS = require('../routes/socket/constants');
var error = require('./error');
var nodeUtil = require('util');
var mysql = require('./db_mysql');

/* filter sys messages which visible for current user */
function _sysMsgFilter(currentUserId){
    return " (r.recipient_id = " +currentUserId+ " and r.sys_msg_id = m.id) or m.type is null ";
    //" not exists (select r2.id from sys_msg_recipient r2 where m.id=r2.sys_msg_id and r2.recipient_id<>" + currentUserId + ")";
}
/* filter sys messages which already received by current user */
function _sysMsgReceived(currentUserId){
    return " select r2.sys_msg_id from sys_msg_received r2 where r2.received_by=" + currentUserId + " and r2.sys_msg_id = m.id";
}

exports.newSysMsgCount = function(userId, callback) {
    mysql.query('select count(distinct(m.id)) as msg_count from system_message m, sys_msg_recipient r where ' + _sysMsgFilter(userId) + ' and not exists('+_sysMsgReceived(userId)+')', function(err, count) {
        if (err) {
            nodeUtil.log(err);
            return callback(error.getErrorMessage(err));
        }
        return callback({
            'new_msg_count' : count[0].msg_count
        });
    });
}

exports.getSysMsg = function(user_id, msg_offset_older, msg_offset_newer, paging, callback) {
    var limit = CHAT_CONSTANTS.MSG_LIMIT;
    var offset = 0;
    var offsetNewer = parseInt(msg_offset_newer);
    var offsetOlder = parseInt(msg_offset_older);
    var showOlder = paging == 'O' ? true : false;
    var showNewer = paging == 'N' ? true : false;
    if ( showNewer ) {
        offset = offsetNewer;
    } else if ( showOlder ) {
        offset = offsetOlder;
    }

    var sql = 'select count(distinct(m.id)) as msg_count from system_message m, sys_msg_recipient r where ' + _sysMsgFilter(user_id);
    // count all sys messages which visible for current user
    mysql.query(sql, function(err, count) {
        if (err) {
            nodeUtil.error(sql);
            nodeUtil.error(err);
            return callback(error.getErrorMessage(err));
        }

        // select all sys messages which visible for current user
        sql = 'select * from (select distinct(m.id) as id, m.title, m.message, m.sent_at from system_message m, sys_msg_recipient r where '+_sysMsgFilter(user_id)+' order by m.id desc limit ' + offset + ', ' + limit +
        ') as result order by id';
        mysql.query(sql, function (err, sysMessages) {
            if (err) {
                nodeUtil.error(sql);
                nodeUtil.error(err);
                return callback(error.getErrorMessage(err));
            }

            //计算新的offset
            var msgTotal = count[0].msg_count;
            var newOffsetOlder = offsetOlder;
            var newOffsetNewer = offsetNewer;

            if (msgTotal > limit) {
                if (showNewer) {
                    newOffsetNewer = offsetNewer - limit > 0 ? offsetNewer - limit : 0;
                    newOffsetOlder = offsetOlder - limit;
                    if ( msgTotal - newOffsetOlder < limit ) {
                        newOffsetOlder = msgTotal - limit;
                    }
                } else if (showOlder) {
                    newOffsetOlder = offsetOlder + limit < msgTotal ? offsetOlder + limit : msgTotal;
                    if ( msgTotal > newOffsetOlder && msgTotal - newOffsetOlder < limit ) {
                        newOffsetOlder = msgTotal - limit;
                    }
                    newOffsetNewer = newOffsetOlder - 2*limit > 0 ? newOffsetOlder - 2*limit : 0;
                } else {//first time
                    newOffsetOlder = offsetOlder + limit;
                    if ( msgTotal - newOffsetOlder < limit ) {
                        newOffsetOlder = msgTotal - limit;
                    }
                }
            }
            // count new sys message
            sql = 'select count(distinct(m.id)) as msg_count from system_message m, sys_msg_recipient r where '+_sysMsgFilter(user_id)+' and not exists('+_sysMsgReceived(user_id)+')';
            mysql.query(sql, function(err, newMsgCount) {
                if (err) {
                    nodeUtil.error(sql);
                    nodeUtil.error(err);
                    return callback(error.getErrorMessage(err));
                }
                return callback({
                    'msg_offset_older': newOffsetOlder,
                    'msg_offset_newer': newOffsetNewer,
                    'msg_count': count[0],
                    'messages': sysMessages,
                    'new_msg_count':newMsgCount[0].msg_count
                });
            });
        });
    });
}

exports.save = function save(msg, callback) {
    mysql.query('insert into system_message (title, message, sent_by, sent_at) values ( "' +
        msg.title + '","' + msg.message + '","' + msg.sender_id + '","' + msg.date + '")',
        function(err, res) {
            if (err) {
                nodeUtil.log(err);
                return callback(error.getErrorMessage(err));
            }
            return callback(res);
        });
}

exports.receivedAll = function receivedAll(user_id, received_at, callback) {
    mysql.query('insert into sys_msg_received (sys_msg_id, received_by, received_at) ' +
        'select distinct(m.id) as id, ' + user_id + ', "' + received_at + '" from system_message m, sys_msg_recipient r where '+_sysMsgFilter(user_id)+' and not exists('+_sysMsgReceived(user_id)+')',
        function(err, res){
            if (err) {
                nodeUtil.log(err);
                return callback(error.getErrorMessage(err));
            }
            return callback(res);
        });
}