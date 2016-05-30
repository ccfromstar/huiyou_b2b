/**
 * 该模块提供即时消息页面
 * Created by teng on 04.10.2014.
 */
var permission = require('../permission');
var User = require('../../models/user');
var Company = require('../../models/company.js');
var Chat = require('../../models/chat');
var IO_KEY = require('./io-keys');
var CHAT_CONSTANTS = require('./constants');
var nodeUtil = require('util');
var errHandler = require('../error.js');

exports.renderChat = function (req, res, layout) {

    permission.checkUser(req, res, function (currentUser) {
        
        var company = new Company({id:currentUser[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }

            var chat = new Chat({
                requiredBy : currentUser[0].id
            });
            chat.getChatInitData(function(result) {

                if (result[1] && result[1].errMsg) {
                    res.render('cerror', {layout: false});
                    return false;
                }

                //检查并查询对话对象
                if (req.query.talkTo) {
                    var talkToUser = new User({id: req.query.talkTo});
                    talkToUser.get(function (result2) {
                        if (nodeUtil.isError(result2)) {
                            errHandler.responseError(result2, req, res);
                            return false;
                        }
                        //替换标题里的空格
                        var msgTitle = req.query.title.replace(new RegExp('KGKG', 'g'), '&nbsp;');
                        console.log(msgTitle);
                        res.render('chat/message', {
                            layout: layout,
                            io_constants : CHAT_CONSTANTS,
                            user: currentUser,
                            company: result1,
                            talkTo: result2,
                            supplier_company: req.query.company,
                            title: msgTitle,
                            ext_p_id : req.query.ext_p_id,
                            ext_type : req.query.ext_type,
                            topicList: result.topicList,
                            newSysCount: result.newSysCount,
                            topic_total_count: result.topic_total_count,
                            userList: result.userList,
                            sys_user_list: result.sys_user_list
                        });
                    });

                } else {
                    res.render('chat/message', {
                        layout: layout,
                        io_constants : CHAT_CONSTANTS,
                        user: currentUser,
                        company: result1,
                        talkTo: false,
                        topicList: result.topicList,
                        newSysCount: result.newSysCount,
                        topic_total_count: result.topic_total_count,
                        userList: result.userList,
                        sys_user_list: result.sys_user_list
                    });
                }

            });
        });
    });

};
