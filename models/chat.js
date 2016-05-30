/**
 * Created by teng on 09.07.2014.
 */

var CHAT_CONSTANTS = require('../routes/socket/constants');
var error = require('./error');
var mysql = require('./db_mysql');
var nodeUtil = require('util');

function Chat(chat) {
    this.chat_id=chat.chat_id;
    this.history_id = chat.history_id;
    this.requiredBy = chat.requiredBy; //提出数据请求的用户id
    this.recipient_id = chat.recipient_id;
    this.sender_id = chat.sender_id;
    this.title = chat.title;
    this.message = chat.message;
    this.send_at = chat.send_at;
    this.received_at = chat.received_at;
    this.msg_offset = chat.msg_offset;
    this.msg_offset_older = chat.msg_offset_older;
    this.msg_offset_newer = chat.msg_offset_newer;
    this.paging = chat.paging;
	//search topic by date
	this.date_from = chat.date_from;
	this.date_to = chat.date_to;
	this.topic_exclude = chat.topic_exclude;
	this.search_text = chat.search_text;
	this.ext_p_id = chat.ext_p_id;
	this.ext_type = chat.ext_type;
};
module.exports = Chat;

/**
 * return {chat_id, history_id} or errMsg
 * @param callback
 */
Chat.prototype.save = function save(callback) {
    var chat = {
        chat_id : this.chat_id,
        recipient_id : this.recipient_id,
        sender_id : this.sender_id,
        title : this.title,
        message : this.message,
        send_at : this.send_at,
		ext_p_id : this.ext_p_id,
		ext_type : this.ext_type
    };

    if ( chat.chat_id ) {
        return saveHistory(chat, callback);
    }

    var insertChat = 'insert into chat (title) values ("' + chat.title + '" )';

    mysql.query(insertChat, function (err, res) {
        if (err) {
            nodeUtil.error(err + ": " + insertChat);
            return callback(error.getErrorMessage(err));
        }
        // new id from database
        chat.chat_id = res.insertId;
		if ( chat.ext_p_id && chat.ext_type ) {
			var insertExt = 'insert into chat_ext (chat_id, recipient_id, sender_id, p_id, type) values ('+
				chat.chat_id+ ',' + chat.recipient_id + ',' + chat.sender_id + ',' + chat.ext_p_id + ',' + chat.ext_type + ')';
			
			mysql.query(insertExt, function (err, res) {
				if (err) {
					nodeUtil.error(err + ": " + insertExt);
					return callback(error.getErrorMessage(err));
				}
			});
		}

        return saveHistory(chat, callback);

    });
}

/**
 *
 * @param chatId
 * @param hasNew the message recipient_id
 */
function updateChatSetHasNew(chatId, hasNew) {
    var q = 'update chat set has_new = "' + hasNew + '" where id = ' + chatId;
    mysql.query(q, function (err, res) {
        if ( err ) {
            nodeUtil.error(err + ": " + q);
            return callback(error.getErrorMessage(err));
        }
    });
}

function saveHistory(chat, callback) {
    var insertChatHistory = 'insert into chat_history (chat_id, recipient_id, sender_id, message, sent_at) values ("' + chat.chat_id +
        '", "' + chat.recipient_id + '", "' + chat.sender_id + '", "' + chat.message + '", "' + chat.send_at + '")';

    mysql.query(insertChatHistory, function (err, res2){
        if (err) {
            nodeUtil.error(err + ": " + insertChatHistory);
            return callback(error.getErrorMessage(err));
        }

        updateChatSetHasNew(chat.chat_id, chat.recipient_id);

        // new id from database
        var chatHistoryId = res2.insertId;

        return callback( {'chat_id': chat.chat_id, 'history_id' : chatHistoryId});
    });
}

/**
 * save receiving date
 * @param callback
 */
Chat.prototype.received = function received(callback) {
    var chat = {
        chat_id : this.chat_id,
        history_id : this.history_id,
        received_at : this.received_at
    };

    var updateSql = 'update chat_history set received_at = "' + chat.received_at + '" where id = ' + chat.history_id;

    mysql.query(updateSql, function (err, res) {
        if (err) {
            nodeUtil.error(err + ": " + updateSql);
            return callback(error.getErrorMessage(err));
        }

        updateChatSetHasNew(chat.chat_id, '0');
    });
}

Chat.prototype.receivedAll = function receivedAll(callback) {
    var chat = {
        chat_id : this.chat_id,
		requiredBy : this.requiredBy,
        received_at : this.received_at
    };

    var updateSql = 'update chat_history set received_at = "' + chat.received_at +
        '" where chat_id = ' + chat.chat_id + ' and received_at is null and recipient_id =' + chat.requiredBy;

    mysql.query(updateSql, function (err, res1) {
        if (err) {
            nodeUtil.error(err + ": " + updateSql);
            return callback(error.getErrorMessage(err));
        }
        updateSql = 'update chat set has_new = "0" where id = ' + chat.chat_id;
        mysql.query(updateSql, function (err, res2) {
            if ( err ) {
                nodeUtil.error(err + ": " + updateSql);
                return callback(error.getErrorMessage(err));
            }
        });
    });
}

/**
 * retrieve the chat history record using chat id
 * @param callback
 * @return {partner:会话对象, chat_messages: 所有相关记录}
 */
Chat.prototype.getHistoryByChatId = function getHistoryByChatId(callback) {
    var chat = {
        chat_id : this.chat_id,
        requiredBy : this.requiredBy,
        msg_offset_older : this.msg_offset_older,
        msg_offset_newer : this.msg_offset_newer,
        paging : this.paging
    };

    var limit = CHAT_CONSTANTS.MSG_LIMIT;
    var offset = 0;
    var offsetNewer = parseInt(chat.msg_offset_newer);
    var offsetOlder = parseInt(chat.msg_offset_older);
    var showOlder = chat.paging == 'O' ? true : false;
    var showNewer = chat.paging == 'N' ? true : false;

    if ( showNewer ) {
        offset = offsetNewer;
    } else if ( showOlder ) {
        offset = offsetOlder;
    }

    var sql = 'select count(*) as msg_count from chat_history h where h.chat_id =' + chat.chat_id;
    mysql.query(sql, function(err, count) {
        if (err) {
            nodeUtil.error(err + ": " + sql);
            return callback(error.getErrorMessage(err));
        }

        // 查询相关对话记录
        sql = 'select * from (select s.name as sender, r.name as recipient, h.id, h.chat_id, h.message, h.sender_id, h.recipient_id, h.sent_at from user s, user r, chat_history h ' +
            'where h.chat_id =' + chat.chat_id + ' and s.id = h.sender_id and r.id = h.recipient_id order by h.id desc limit ' + offset + ', ' + limit + ')  as result order by id';
        mysql.query(sql, function (err, histories) {
            if (err) {
                nodeUtil.error('In chat.js: '+err + ": " + sql);
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
            // get the chat partner and chat id
            var partner;
            var chatId;
            for (var i in histories) {
                if (histories[i].recipient_id == chat.requiredBy) {
                    partner = histories[i].sender_id;
                } else {
                    partner = histories[i].recipient_id;
                }
                chatId = histories[i].chat_id;
                break;
            }

            //查询对话对象
            sql = "select u.id as user_id, u.name as user_name, u.telephone as telephone, u.mobile_phone, c.short_name as company, c.telephone_area_code from user u, company c where u.id = " + partner + " and u.company_id = c.id";
            mysql.query(sql, function (err, chatPartner) {
                if (err) {
                    nodeUtil.error('In chat.js: '+err + ": " + sql);
                    return callback(error.getErrorMessage(err));
                }
                //utils.log('chat_id:' + chatId + ' partner:' + chatPartner + ' chat_messages:' + histories + ' msg_offset_older:' + newOffsetOlder + ' msg_offset_newer:' +newOffsetNewer);
                return callback({'chat_id': chatId, 'partner': chatPartner, 'chat_messages': histories,
                    'msg_offset_older': newOffsetOlder, 'msg_offset_newer': newOffsetNewer, 'msg_count': count[0]});
            });

        });
    });
}

/**
 * 提供用户第一次打开消息窗口的数据
 * 返回{topicList: 所有当前用户相关的标题, topicTotalCount: 标题总数, userList: 用户}
 * 或者错误{errMsg}*/
Chat.prototype.getChatInitData = function getChatInitData(callback) {

    var chat = {
        requiredBy: this.requiredBy
    };

    var qRequiredBy = "select role_sys_user from user where id = " + chat.requiredBy;
    mysql.query(qRequiredBy, function (err, roleSysUser) {
        if (err) {
            nodeUtil.error(err + ": " + qRequiredBy);
            return callback(error.getErrorMessage(err));
        }

        var qTopic =
            'select distinct(cid) as id, title, has_new, partner, partner_id, partner_company from ( select c.id as cid, c.title, c.has_new, u.name as partner, u.id as partner_id, h.id as hid, f.short_name as partner_company from chat c, chat_history h, user u, company f where ((h.recipient_id ='
            + chat.requiredBy + ' and u.id=h.sender_id and u.company_id=f.id) or (h.sender_id = ' + chat.requiredBy +
            ' and u.id=h.recipient_id and u.company_id=f.id)) and c.id = h.chat_id order by c.has_new desc, hid desc) as r limit 0, ' + CHAT_CONSTANTS.TOPIC_LIMIT;
        mysql.query(qTopic, function (err, topicList) {
            if (err) {
                nodeUtil.error(err + ": " + qTopic);
                return callback(error.getErrorMessage(err));
            }

            var cTopic = 'select count(distinct(c.id)) as topic_count from chat c, chat_history h, user u where ((h.recipient_id = '
                + chat.requiredBy +
                ' and u.id=h.sender_id) or (h.sender_id = '
                + chat.requiredBy +
                ' and u.id=h.recipient_id)) and c.id = h.chat_id ';

            mysql.query(cTopic, function (err, topicTotalCount) {
                if (err) {
                    nodeUtil.error(err + ": " + cTopic);
                    return callback(error.getErrorMessage(err));
                }

                //query only users who have contacted this user
                var qUser;
                if (roleSysUser[0].role_sys_user == 1) {
                    qUser = "select distinct(u.id) as user_id, u.name as user_name, u.telephone, u.mobile_phone, c.id as company_id, c.short_name as company_name, c.logo, c.telephone_area_code " +
                    " from user u, company c where u.role_sys_user <> 1 and u.id <> " + chat.requiredBy + " and u.company_id = c.id limit 0, " + CHAT_CONSTANTS.USER_LIMIT;
                } else {
                    qUser = 'select distinct(u.id) as user_id, u.name as user_name, u.telephone, u.mobile_phone, c.id as company_id, c.short_name as company_name, c.logo, c.telephone_area_code ' +
                    ' from user u, company c where u.role_sys_user <> 1 and u.id <> ' + chat.requiredBy +
                    ' and (u.id in (select sender_id from chat_history where recipient_id = ' + chat.requiredBy +
                    ') or u.id in (select recipient_id from chat_history where sender_id = ' + chat.requiredBy + ')) and u.company_id = c.id limit 0, ' + CHAT_CONSTANTS.USER_LIMIT;
                }
                var qSysUser = 'select distinct(u.id) as user_id, u.name as user_name, u.telephone, u.mobile_phone, c.id as company_id, c.short_name as company_name, c.telephone_area_code ' +
                    ' from user u, company c where u.role_sys_user = 1 and u.id <> ' + chat.requiredBy + ' and u.company_id = c.id limit 0, ' + CHAT_CONSTANTS.USER_LIMIT;

                mysql.query(qUser, function (err, userList) {
                    if (err) {
                        nodeUtil.error(err + ": " + qUser);
                        return callback(error.getErrorMessage(err));
                    }
                    mysql.query(qSysUser, function (err, sysUserList) {
                        if (err) {
                            nodeUtil.error(err + ": " + qSysUser);
                            return callback(error.getErrorMessage(err));
                        }
                        checkSysNew(chat.requiredBy, function (err, newSysCount) {
                            if (err) {
                                nodeUtil.error("checkSysNew: " + err);
                                return callback(error.getErrorMessage(err));
                            }
                            return callback({
                                topicList: topicList,
                                newSysCount: newSysCount,
                                topic_total_count: topicTotalCount,
                                userList: userList,
                                sys_user_list: sysUserList
                            });
                        });

                    });
                });
            });
        });

    });
}

Chat.prototype.getTopicList = function getTopicList(callback) {

    var chat = {
        requiredBy : this.requiredBy,
		date_from : this.date_from,
		date_to : this.date_to,
		topic_exclude : this.topic_exclude,
		search_text : this.search_text
    };

	var subq = '';
	if ( chat.date_from && chat.date_to ) {
		subq = " and (h.sent_at < '"+ chat.date_to + "' and h.sent_at > '" + chat.date_from + "')";
	}
	
	if ( chat.topic_exclude && chat.topic_exclude.length > 0 ) {
		subq += ' and c.id not in (' + chat.topic_exclude + ')';
	}
	
	if ( chat.search_text ) {
		subq += " and (h.message like '%" + chat.search_text + "%' or c.title like '%" + chat.search_text + "%' or u.name like '%" + 
		chat.search_text + "%' or (f.short_name like '%" + chat.search_text + "%' )) ";
	}
	
    var qTopic = 
	"select distinct(cid) as chat_id, title, has_new, partner, partner_id, partner_company from ( select c.id as cid, c.title, c.has_new, u.name as partner, u.id as partner_id, h.id as hid, f.short_name as partner_company from chat c, chat_history h, user u, company f where ((h.recipient_id ="
        + chat.requiredBy + " and u.id=h.sender_id) or (h.sender_id = " + chat.requiredBy +
        " and u.id=h.recipient_id)) " + subq + " and f.id = u.company_id and c.id = h.chat_id order by c.has_new desc, hid desc) as r limit 0, " + CHAT_CONSTANTS.TOPIC_LIMIT;
	
    mysql.query(qTopic, function(err, topicList){
        if (err) {
            nodeUtil.error(err + ": " + qTopic);
            return callback(error.getErrorMessage(err));
        }
		
		return callback({ topicList: topicList});
    });
}
Chat.prototype.lookup = function lookup(callback){
	var chat = {
        requiredBy : this.requiredBy,
		recipient_id: this.recipient_id,
		ext_p_id : this.ext_p_id,
		ext_type : this.ext_type
    };
	var q = "select chat_id from chat_ext where p_id = '"+chat.ext_p_id+ "' and type=" +chat.ext_type+" and sender_id = "+chat.requiredBy+" and recipient_id = "+chat.recipient_id + ' limit 0, 1';
	
	mysql.query(q, function(err, res){
		if (err) {
            nodeUtil.error(err + ": " + q);
            return callback(error.getErrorMessage(err));
        }
		return callback(res[0]);
	});
}

Chat.prototype.checkNew = function checkNew(callback) {
	var chat = {
        requiredBy : this.requiredBy
    };
    //var q = 'select count(c.id) as count from chat_history c where c.recipient_id=' + chat.requiredBy + ' and c.received_at is null';
	var q = 'select count(distinct(c.id)) as count from chat c, chat_history h where c.has_new = ' + chat.requiredBy + ' and c.id=h.chat_id and h.recipient_id=c.has_new';
    mysql.query(q, function(err, msg_count) {
        if (err) {
            nodeUtil.error(err + ": " + q);
            return callback(error.getErrorMessage(err));
        }
        checkSysNew(chat.requiredBy, function (err, newSysCount) {
            return callback({'new_msg_count': parseInt(msg_count[0].count) + newSysCount});
        });
    });
}

function checkSysNew(requiredBy, callback){
    var q = "select count(distinct s.id) as count from system_message s where not exists (select r.id from sys_msg_received r where r.received_by="+requiredBy+ 
        " and s.id=r.sys_msg_id) and not exists (select r2.id from sys_msg_recipient r2 where s.id=r2.sys_msg_id and r2.recipient_id<>"+requiredBy+")";
    mysql.query(q, function(err, sys_count) {
        if (err) {
            nodeUtil.error(err + ": " + q);
            return callback(error.getErrorMessage(err));
        }
        return callback(false, parseInt(sys_count[0].count));

    });
}

Chat.prototype.getUser = function getUser(callback) {

    var chat = { recipient_id: this.recipient_id };
    var q = 'select distinct(u.id) as id, u.name as user_name, u.telephone, u.mobile_phone, c.id as company_id, c.short_name as company_name, c.logo, c.telephone_area_code ' +
        ' from user u, company c where u.id ='+chat.recipient_id+' and u.company_id = c.id';
    mysql.query(q, function(err, user) {
        if(err){
			nodeUtil.error('chat.getUser: '+err + ': ' + q);
            return callback(error.getErrorMessage(err));
        }
        if(user[0]) {
            return callback(user[0]);
        }
        return callback({ "errMsg": "用户"+chat.recipient_id+"不存在!"});
    });
}