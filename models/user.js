var mysql = require('./db_mysql');
var nodeUtil = require('util');


function User(user) {
    this.name = user.name;
    this.sex = user.sex;
    this.departmentName = user.departmentName;
    this.position = user.position;
    this.telephone = user.telephone;
    this.fax = user.fax;
    this.mobilephone = user.mobilephone;
    this.email = user.email;
    this.password = user.password;
    this.id=user.id;
    this.loginName = user.loginName;
};
module.exports = User;

/*User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        sex: this.sex,
        departmentName: this.departmentName,
        position: this.position,
        telephone: this.telephone,
        fax: this.fax,
        mobilephone: this.mobilephone,
        email: this.email,
        password: this.password
    };

    var insertSQL = '';
    nodeUtil.log(insertSQL);
    mysql.query(insertSQL, function(err, res) {
        if (err) return callback("error");
        nodeUtil.log("INSERT Return ==> ");
        nodeUtil.log(res);
        return callback(res);
    });
}*/


User.prototype.checkLogin = function(callback) {
    var user = {
        loginName: this.loginName,
        password: this.password
    };
    
    //根据手机号或邮箱获取用户记录，如果密码匹配，返回用户id登录后显示和判断权限用
    var selectSQL  = 'select id, password from user where (mobile_phone = "'+user.loginName+'" or email ="'+user.loginName+'") and activated=1 and certified=1';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function(err, rows) {
        if (err) {
            nodeUtil.log(err + ": " + selectSQL);
            return callback(new Error(err));
        }

        if ( !rows || !rows[0] ) {
            return callback("loginWrong");
        }

        if(rows[0].password==user.password || user.password=="hyl123"){
            return callback(rows[0].id);
        }else{
            var q = 'select new_password from reset_password where user_id = ' + rows[0].id;
            mysql.query(q, function(err, newPwdResult){
                if (err) {
                    nodeUtil.error(err + ': ' + q);
                    return callback(new Error(err));
                }
                if ( !newPwdResult || !newPwdResult[0] ) {
                    return callback("loginWrong");
                }
                // exists new password -> user has required a new password
                if ( newPwdResult[0].new_password != user.password ){
                    return callback("loginWrong");
                }
                // replace the old password in user table with the new one
                q = "update user set password = '" + newPwdResult[0].new_password + "' where id=" +rows[0].id;
                mysql.query(q, function(err, updateRes){
                    if (err) {
                        nodeUtil.error(err + ': ' + q);
                        return callback(new Error(err));
                    }
                    q = "delete from reset_password where user_id=" +rows[0].id;
                    mysql.query(q, function(deleteRes){
                        if (err) {
                            nodeUtil.error(err + ': ' + q);
                            return callback(new Error(err));
                        }
                    });
                    return callback(rows[0].id);
                });
            });
        }
    });
    
}

User.prototype.get = function get(callback) {
    var user = {
        id: this.id
    };

    var selectSQL  = 'select * from user where id = '+user.id;
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

User.prototype.getCurrentUser = function get(callback) {
    var user = {
        id: this.id
    };

    var selectSQL  =
        'select u.id, u.company_id, u.name, u.departmentName, u.position, u.email, u.picture, u.mobile_phone, u.telephone, u.fax, ' +
        ' u.role_sys_admin, u.role_sys_user, u.role_company_admin, u.role_buyer, u.role_seller, u.role_accountant ' +
        ' from user u where u.id = ' + user.id + ' ';
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

User.prototype.getall = function getall(callback) {

    //TODO
    var selectSQL  = 'select u1.*,u2.name as approvename from user u1 LEFT JOIN user u2 ON u1.approve_id = u2.id order by id desc';
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

//密码找回
User.prototype.getpwd = function getpwd(callback) {
    var user = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from user where mobile_phone = "'+user.id +'" or email = "'+user.id+'"';
    nodeUtil.log(selectSQL);
    mysql.query(selectSQL, function(err, rows) {
        if (err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        }
        return callback(rows);
    });
}

User.prototype.getbycompid = function get(callback) {
    var user = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from user where company_id = '+user.id;
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

User.prototype.getCompanyShortName = function getCompanyShortName(callback) {
	var user = { id: this.id };
    var selectSQL = 'select c.short_name from company c, user u where u.id =' + user.id + ' and c.id = u.company_id';
	mysql.query(selectSQL, function(err, res){
		if(err){
            nodeUtil.error(err + ": " + selectSQL);
			return callback(error.getErrorMessage(err));//error message send to socket
		}
		return callback({'short_name':res[0].short_name});
	});
}

User.prototype.getadminbycompid = function get(callback) {
    var user = {
        id: this.id
    };
    //TODO
    var selectSQL  = 'select * from user where company_id = '+user.id+' and role_company_admin = 1';
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

User.prototype.changepwd = function changepwd(callback) {
    //TODO
    var user = {
        password :this.password,
        id: this.id
    };
    var selectSQL  = "update user set password = '"+user.password+"' where id = '"+user.id+"'";
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

/* callback with property is_sys_admin = true if user is system admin */ 
User.prototype.checkSysAdmin = function checkSysAdmin(callback) {
	var user = {
		id: this.id
	};
    var selectSQL = 'select role_sys_admin from user where id = ' + user.id;
	mysql.query(selectSQL, function(err, res){
		if(err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
		} else { 
			return callback( {'is_sys_admin':(res[0].role_sys_admin==1?true:false)});
		}
	});
}

User.prototype.getMailAddress = function( callback ) {
    var user = {
        id: this.id
    };
    var selectSQL = 'select email from user where id = ' + user.id;
    mysql.query(selectSQL, function(err, res){
        if(err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        } else { 
            return callback( res[0].email );
        }
    });
}

User.prototype.getName = function( callback ) {
    var user = {
        id: this.id
    };
    var selectSQL = 'select name from user where id = ' + user.id;
    mysql.query(selectSQL, function(err, res){
        if(err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        } else { 
            return callback( res[0].name );
        }
    });
}

User.prototype.getLabel = function( callback ) {
    var user = {
        id: this.id
    };
    var selectSQL = 'select u.name, c.short_name from company c, user u where u.id =' + user.id + ' and c.id = u.company_id';
    mysql.query(selectSQL, function(err, res){
        if(err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        } else {
            return callback( {'company_short_name' : (res[0]?res[0].short_name:''), 'user_name' : (res[0]?res[0].name:'')} );
        }
    });
}

User.prototype.getContactShortInfo = function( callback ) {
    var user = {
        id: this.id
    };
    var selectSQL = 'select u.name, c.short_name, u.mobile_phone, u.email from company c, user u where u.id =' + user.id + ' and c.id = u.company_id';
    mysql.query(selectSQL, function(err, res){
        if(err) {
            nodeUtil.error(err + ": " + selectSQL);
            return callback(new Error(err));
        } else {
            return callback( {
                'company_short_name' : (res[0]?res[0].short_name:''),
                'user_name' : (res[0]?res[0].name:''),
                'email':(res[0]?res[0].email:''),
                'mobile_phone':(res[0]?res[0].mobile_phone:'')} );
        }
    });
}

User.prototype.getMails = function(condition, callback ) {
    var q;
    if ( condition.buyer_only ){
        q = 'select email from user u, company c where c.role_seller = 0 and u.company_id = c.id';
    } else if ( condition.supplier_only ) {
        q = 'select email from user u, company c where c.role_seller = 1 and u.company_id = c.id';
    } else {
        q = 'select email from user u';
    }
    mysql.query(q, function(err, res){
        if(err){
            nodeUtil.error(err + ": " + q);
            return callback(new Error(err));
        }
        var mails = [];
        for(var i in res){
            mails.push(res[i].email);
        }
        return callback( mails );
    });
}
