var mysql = require('./db_mysql');
var error = require('./error');

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

function CruiselineinfosearchbyKey(key) {
	this.key = key;
};


CruiselineinfosearchbyKey.prototype.get = function get(callback) {
	var cruiselineinfosearchbyKey = {
		key: this.key
	};
	var selectSQL  = "select * from cruise_line_info where txtCruiselineNo like '%"+cruiselineinfosearchbyKey.key+"%'";
	console.log(selectSQL);
	mysql.query(selectSQL, function(err, rows, fields) {
			
			if (err) {
				console.log("error:" + err);
				return callback(error.getErrorMessage(err));
			}
			return callback(rows);
	});
}

module.exports = CruiselineinfosearchbyKey;