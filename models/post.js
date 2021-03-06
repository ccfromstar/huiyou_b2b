var mysql = require('./db_mysql');
var nodeUtil = require('util');

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function Post(username, post, time) {
	this.user = username;
	this.post = post;
	if (time) {
		this.time = time;
	} else {
		this.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
	}
};
module.exports = Post;

Post.prototype.save = function save(callback) {
	var post = {
		user: this.user,
		post: this.post,
		time: this.time
	};
	var insertSQL = 'insert into post(username,post,time) values("'+post.user+'","'+post.post+'","'+post.time+'")';
	nodeUtil.log(insertSQL);
	mysql.query(insertSQL, function(err, res) {
			if (err) {
                nodeUtil.error(err + ": " + insertSQL);
                return callback(new Error(err));
            }
			return callback(res);
	});
}

Post.prototype.get = function get(callback) {
	var selectSQL  = 'select * from post';
	nodeUtil.log(selectSQL);
	mysql.query(selectSQL, function(err, rows, fields) {
			if (err) {
                nodeUtil.error(err + ": " + selectSQL);
                return callback(new Error(err));
			}
			return callback(rows);
	});
}