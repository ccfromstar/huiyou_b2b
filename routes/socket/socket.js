/**
 * Created by teng on 18.08.2014.
 */

var permission = require('../permission.js');
var IO_KEY = require('./io-keys');
var CHAT_CONSTANTS = require('./constants');
var SysMsg = require('../../models/sys_message');
var Chat = require('../../models/chat');
var User = require('../../models/user');
//var Port = require('../../models/port');
//var TravelLocation = require('../../models/travel_location.js');
//var Cruisecompany = require('../../models/cruisecompany.js');
//var Cruiseship = require('../../models/cruiseship.js');
//var ProductCtr = require('../product_ctr.js');
var Utils = require('../utils');
var email = require('../email.js');
var nodeUtil = require('util');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var onlineUsers = new Array();
var socketIds = new Array();
var io;

exports.listen = function(server) {

    io = require('socket.io').listen(server);

    // using middleware to validate socket
    io.use(function(socket, next) {
        try {
            var data = socket.handshake || socket.request;
            if ( !data.headers.cookie ) {
                return next(new Error(IO_KEY.INVALID_SOCKET));
            }
            //console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
            var cookies = cookie.parse(data.headers.cookie);
            //console.log('cookies parsed ( %s )', JSON.stringify(cookies));
            if ( !cookies[permission.config.cookie.name] ) {
                nodeUtil.error('Missing cookie ' + permission.config.cookie.name);
                return next(new Error(IO_KEY.INVALID_SOCKET));
            }
            var sid = cookieParser.signedCookie(cookies[permission.config.cookie.name], permission.config.cookie.secret);
            if ( !sid ) {
                nodeUtil.log('Cookie signature is not valid');
                return next(new Error(IO_KEY.INVALID_SOCKET));
            }

            //console.log('session ID ( %s )', sid);
            data.sid = sid;
            permission.config.session.store.get(sid, function( err, session ) {
                if ( err ) {
                    nodeUtil.error(err);
                    return next(err);
                }
                if ( !session ) {
                    //nodeUtil.error('session not found');
                    // force logout, client recieves this by using socket.on('error', function(msg))
                    return next(new Error(IO_KEY.INVALID_SOCKET));
                }
                data.session = session;
                next();
            });
        } catch (err) {
            nodeUtil.error('socket.io security check error: ' + err.stack);
            next(new Error('即时通讯服务器端发生错误'));
        }
    });
	
    io.on('connection', function(socket){

        socket.on(IO_KEY.ONLINE, function(msg){
            nodeUtil.log('User ' + msg.user_id + ' is online now!');
			
			io.emit(IO_KEY.ONLINE, {'user_id':msg.user_id});

            //通知该用户是否有新消息
            SysMsg.newSysMsgCount(msg.user_id, function(msgCount) {
                if ( msgCount.new_msg_count > 0 ) {
                    io.to(socket.id).emit(IO_KEY.NOTIFY_SYS_NEW, msgCount);
                }
            });
			var chat = new Chat({
				requiredBy : msg.user_id
			});
			chat.checkNew(function(res){
				if ( res.errMsg ) {
                    return false;
                }
				if ( res.new_msg_count > 0 ) {
                    io.to(socket.id).emit(IO_KEY.NOTIFY_MSG_NEW, {new_msg_count:res.new_msg_count});
                }
			});
			
			//add this user in online user list
            //check at first if this user exists already
            //TODO addOnlineUser add session and check session
            //var data = socket.handshake || socket.request;
            //data.session
            /*var sid = getSockets(msg.user_id);
            if ( sid ){ // this user is already online
                for( var i in sid ) {
                    io.to(sid[i]).emit(IO_KEY.WARNING,
                        '您的帐户在另外一个地方登陆了。如果您不知道是谁在用您的帐户登陆，可能您的帐户已被盗用，请尽快联系我们！');
                }
            }*/

			//addOnlineUser(msg.user_id, socket.id);
            addOnlineUser(msg.user_id, socket);
        });
		
		socket.on(IO_KEY.GET_ONLINE_USERS, function(msg){
			//tell this user who are online
			io.to(socket.id).emit(IO_KEY.GET_ONLINE_USERS, {'users':onlineUsers});
			//console.log('emit:'+IO_KEY.GET_ONLINE_USERS + msg.required_by);
			//console.log('online users:');
			//for( var i in onlineUsers){
				//console.log(onlineUsers[i]);
			//}
		});
		
		socket.on('disconnect', function(){
            removeOfflineUser(socket);
        });		

        socket.on(IO_KEY.SYS, function(msg){
            SysMsg.save(msg, function(res){
                if ( res.errMsg ) {
                    io.to(socket.id).emit(IO_KEY.NOTIFY_ERROR, res);
                    return false;
                }
                io.emit(IO_KEY.SYS, msg);
            });
        });

        socket.on(IO_KEY.URGENT, function(msg){
            io.emit(IO_KEY.URGENT, msg);
        });

        //转发用户对话, 接收者、发送者、发送内容都在参数msg里
        socket.on(IO_KEY.CHAT, function(msg){
            //console.log('emit:' + msg.recipient_id + ' message: ' + msg.message);

            var isNewTopic = true;
            if (msg.chat_id) {
                //有对话id->不是新话题
                isNewTopic = false;
            }
            //save into database
            var chat = new Chat( {
                chat_id: msg.chat_id,
                sender_id : msg.sender_id,
                recipient_id : msg.recipient_id,
                title : msg.title,
                message: msg.message,
                send_at : msg.date,
				ext_p_id : msg.ext_p_id,
				ext_type : msg.ext_type
            });
            
            chat.save(function(res) {
                if ( res.errMsg ) {
                    return false;
                }
                msg.chat_id = res.chat_id;
                msg.history_id = res.history_id;
				
				var sender = new User({id:msg.sender_id});
				sender.getContactShortInfo(function(contactShortInfo){
					//消息发给接收者
					msg.partner_company = contactShortInfo.company_short_name;
                    if ( isUserOnline(msg.recipient_id)){
                        // msg.recipient_id is the room of the recipient
                        io.to(msg.recipient_id).emit(IO_KEY.CHAT, msg);
                    }

					if ( isNewTopic ) {
						//通知发送者新主题已经创建
						var recipient = new User({id:msg.recipient_id});
						recipient.getCompanyShortName(function(company2){
						//io.to(socket.id).emit(IO_KEY.TOPIC_CREATED, // <- notify only this socket
                        // notify all sockets of this user
                        io.to(msg.sender_id).emit(IO_KEY.TOPIC_CREATED,
						{'chat_id':msg.chat_id, 'title':msg.title, 'partner_id':msg.recipient_id, 'partner_name':msg.recipient_name, 'partner_company':company2.short_name});
						});
					}
                    // send mail if recipient is offline
                    if ( !isUserOnline(msg.recipient_id) ) {
                        var recipient = new User({id:msg.recipient_id});
                        recipient.getContactShortInfo(function(recipientInfo) {
                            if( recipientInfo.email && !nodeUtil.isError(recipientInfo) ) {
                                email.sendSystemMail(recipientInfo.email,
                                    '荟邮轮系统通知-您收到一条新的即时消息',
                                    '尊敬的' + recipientInfo.user_name + '，您好！' +
                                    '<br>发送方：' + contactShortInfo.company_short_name + ' ' + contactShortInfo.user_name + ' 手机：' + contactShortInfo.mobile_phone +
                                    '<br>消息主题：' + msg.title +
                                    '<br>消息内容：' + msg.message +
                                    '<br>请尽快登陆荟邮轮处理您的即时消息，或者直接联系发送方。<br><br>荟邮轮');
                            }
                        });
                    }
				});
            });

        });

        socket.on(IO_KEY.RECEIVED, function(msg) {
            //save received date into database
            //msg.historyId, msg.receivedAt
            var chat = new Chat({
                chat_id : msg.chat_id,
                history_id : msg.history_id,
                received_at : msg.received_at
            });
            chat.received();
        });

        socket.on(IO_KEY.RECEIVED_ALL, function(msg) {
            //save received date into database
            //msg.historyId, msg.receivedAt
            var chat = new Chat({
                chat_id : msg.chat_id,
				requiredBy : msg.user_id,
                received_at : msg.received_at
            });
            chat.receivedAll();
        });

        //用户查询某个话题相关的对话记录
        socket.on(IO_KEY.GET_HISTORY, function(msg){
            //msg.chatId, msg.userId

            //retrieve messages from database
            var chat = new Chat(
                {
                    chat_id: msg.chat_id,
                    requiredBy: msg.user_id,
                    msg_offset_older: msg.msg_offset_older,
                    msg_offset_newer: msg.msg_offset_newer,
                    paging: msg.paging
                } );
            chat.getHistoryByChatId(function (res){
                //send retrieved messages to the user
                io.to(socket.id).emit(IO_KEY.GET_HISTORY,
                    //the messages from table chat_history
                    res );
            });

        });

        socket.on(IO_KEY.GET_SYS_MSG, function(msg){
            SysMsg.getSysMsg( msg.user_id, msg.msg_offset_older, msg.msg_offset_newer, msg.paging, function(sysMessages){
                if ( !Utils.isEmpty(sysMessages) ) {
                    io.to(socket.id).emit(IO_KEY.GET_SYS_MSG, sysMessages);
                }
            });
        });

        socket.on(IO_KEY.RECEIVED_ALL_SYS, function(msg){
            SysMsg.receivedAll(msg.user_id, msg.received_at, function(res){
                if ( res.errMsg ) {
                    io.to(socket.id).emit(IO_KEY.NOTIFY_ERROR, res);
                    return false;
                }
            });
        });
		
		socket.on(IO_KEY.PRODUCT_PUBLISHED, function(msg){            
            io.emit(IO_KEY.PRODUCT_PUBLISHED, msg);
        });
		
		socket.on(IO_KEY.PRODUCT_DELETED, function(msg){            
            io.emit(IO_KEY.PRODUCT_DELETED, msg);
        });
		
		socket.on(IO_KEY.SUPPLY_NEW, function(msg){            
            io.emit(IO_KEY.SUPPLY_NEW, msg);
        });
		
		socket.on(IO_KEY.DEMAND_NEW, function(msg){            
            io.emit(IO_KEY.DEMAND_NEW, msg);
        });
		socket.on(IO_KEY.SEARCH_TOPIC, function(msg){
			var chat = new Chat(
                {   requiredBy : msg.user_id,
                    date_from : msg.date_from,
					date_to : msg.date_to,
					search_text : msg.search_text
                } );
            chat.getTopicList(function (res){
                io.to(socket.id).emit(IO_KEY.SEARCH_TOPIC, res );
            });
		});
		socket.on(IO_KEY.MORE_TOPIC, function(msg){
			var chat = new Chat(
                {   requiredBy : msg.user_id,
                    date_from : msg.date_from,
					date_to : msg.date_to,
					topic_exclude : msg.topic_exclude
                } );
            chat.getTopicList(function (res){
                io.to(socket.id).emit(IO_KEY.MORE_TOPIC, res );
            });
		});
		socket.on(IO_KEY.LOOKUP_TOPIC, function(msg){
			var chat = new Chat(
				{ requiredBy : msg.user_id,
				  recipient_id: msg.recipient_id,
				  ext_p_id : msg.ext_p_id,
				  ext_type : msg.ext_type
				});
			chat.lookup(function (res){
				io.to(socket.id).emit(IO_KEY.LOOKUP_TOPIC, res);
			});
		});
        socket.on(IO_KEY.GET_USER, function(msg){
            if( !msg.user_id ) { //TODO something wrong from client
                return false;
            }
            var chat = new Chat({
                recipient_id : msg.user_id
            });
            chat.getUser(function(user){
				if( isUserOnline(user.id) ) {
					user.online = true;
				}
                io.to(socket.id).emit(IO_KEY.GET_USER, user);
            });
        });
        //socket.on(IO_KEY.GET_CITY_FILTER, function(msg){
        //    new Port({}).getDeparturePortMap(function(map) {
        //        new TravelLocation({}).getStartLocation(function(cities) {
        //            io.to(socket.id).emit(IO_KEY.GET_CITY_FILTER, {cities: cities, port_map: map});
        //        });
        //    });
        //});
        //socket.on(IO_KEY.GET_CRUISE_COMPANY_SHIP, function(msg){
        //    new Cruisecompany({}).getNameWithCompanyNo(function (companies) {
        //        if (nodeUtil.isError(companies)) {
        //            errHandler.responseError(companies, req, res);
        //            return false;
        //        }
        //        new Cruiseship({}).getName2CompanyNo(function (ships) {
        //            if (nodeUtil.isError(ships)) {
        //                errHandler.responseError(ships, req, res);
        //                return false;
        //            }
        //            io.to(socket.id).emit(IO_KEY.GET_CRUISE_COMPANY_SHIP, {companies: companies, ships: ships});
        //        });
        //    });
        //});

        //socket.on(IO_KEY.GET_PRODUCT_LIST, function(msg){
        //    ProductCtr.fetchProductsData(msg, function(result) {
        //        //nodeUtil.log('socket fetch product: ' + JSON.stringify(result, null, 2));
        //        io.to(socket.id).emit(IO_KEY.GET_PRODUCT_LIST, result);
        //    });
        //});

    });

}
exports.emit = function(ioKey, userId, message){
    var sid = getSockets(userId);
    if( sid ) {
        for( var i in sid ) {
            io.to(sid[i]).emit(ioKey, message);
        }
    }
}
exports.emitToAll = function(ioKey, message){
    io.emit(ioKey, message);
}
function addOnlineUser(userId, socket){
    socket.room = userId;
    socket.join(userId);
    var i = onlineUsers.indexOf(userId);
    if ( i < 0 ) {
        onlineUsers.push(userId);
        socketIds.push([socket.id]);
    } else {
        socketIds[i].push(socket.id);
    }
}
/**
 *
 * @param userId
 * @returns an array with socket.id
 */
function getSockets(userId){
    var i = onlineUsers.indexOf(userId);
    if ( i < 0 ) {
        return null;
    }
    return socketIds[i];
}
function removeOfflineUser(socket){
    var userId = socket.room;
    var i = onlineUsers.indexOf(userId);

    if ( i < 0 ) {
        nodeUtil.error('removeOfflineUser: User ' + userId + ' is not online!');
        socket.leave(socket.room);
        nodeUtil.error('notify user is offline user id: ' + userId );
        io.emit(IO_KEY.OFFLINE, {'user_id': userId});
        return false;
    }

    if ( !socketIds[i] ){
        nodeUtil.error('removeOfflineUser: User ' + userId + ' has no registered socket! socketIds[' + i + ']=' + socketIds[i] );
        socket.leave(socket.room);
        socketIds.splice(i, 1);
        nodeUtil.error('no socket found for user id: ' + userId + ' -> disconnect');
        io.emit(IO_KEY.OFFLINE, {'user_id': userId});
        return false;
    }

    if ( socketIds[i].length > 1 ) { // user has more than 1 sockets
        var sidx = socketIds[i].indexOf(socket.id);
        if ( sidx >= 0 ) {
            socketIds[i].splice(sidx, 1);
        } else {
            nodeUtil.error('removeOfflineUser: the socket of user ' + userId + ' does not exist!');
        }
    } else {
        socketIds.splice(i, 1);
        userId = onlineUsers.splice(i, 1);
        nodeUtil.log('disconnected user id: ' + userId );
        io.emit(IO_KEY.OFFLINE, {'user_id': userId});
    }

    nodeUtil.log('user ' + userId + ' left room ' + socket.room );
    socket.leave(socket.room);
}
function isUserOnline(userId){
	return onlineUsers.indexOf(userId) >= 0;
}

