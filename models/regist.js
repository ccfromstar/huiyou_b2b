var mysql = require('./db_mysql');
var nodeUtil = require('util');
var email = require('../routes/email.js');
var sms = require('../routes/sms.js');

function Regist(company, user) {
	this.name = company.name;
	this.short_name = company.short_name;
    this.province = company.province;
    this.city = company.city;
    this.address = company.address;
    this.telephone_area_code = company.telephone_area_code;
    this.telephone = company.telephone;
    this.fax = company.fax;
    this.payment_transfer = company.payment_transfer;
    this.payment_online_banking = company.payment_online_banking;
    this.payment_alipay = company.payment_alipay;
    this.payment_cheque = company.payment_cheque;
    this.payment_cash = company.payment_cash;
    this.bank = company.bank;
    this.accountNo = company.accountNo;
    this.logo = company.logo;
    this.account_name = company.account_name;

    this.user_name = user.name;
    this.user_departmentName = user.departmentName;
    this.user_position = user.position;
    this.user_telephone = user.telephone;
    this.user_fax = user.fax;
    this.user_mobilephone = user.mobilephone;
    this.user_email = user.email;
    this.user_password = user.password_md5;
    this.pwd = user.password;
    this.company_id = user.company_id;
    this.role_buyer = user.role_buyer;
    this.role_seller = user.role_seller;
    this.role_accountant = user.role_accountant;
};
module.exports = Regist;

function result(code, message) {
    nodeUtil.log("result ==> " + message);
    return {"resultCode":code, "resultMessage": message};
}

function isEmptyObject( obj ) {
    for ( var i in obj ) {
        return false;
    }
    return true;
}

Regist.prototype.save = function save(callback) {
    var company = {
        name: this.name,
        short_name: this.short_name,
        province: this.province,
        city: this.city,
        address: this.address,
        telephone_area_code: this.telephone_area_code,
        telephone: this.telephone,
        fax: this.fax,
        payment_transfer: this.payment_transfer,
        payment_online_banking: this.payment_online_banking,
        payment_alipay: this.payment_alipay,
        payment_cheque: this.payment_cheque,
        payment_cash: this.payment_cash,
        bank: this.bank,
        accountNo: this.accountNo,
        logo: this.logo,
        account_name: this.account_name
    };
    var user = {
        name: this.user_name,
        departmentName: this.user_departmentName,
        position: this.user_position,
        telephone: this.user_telephone,
        fax: this.user_fax,
        mobilephone: this.user_mobilephone,
        email: this.user_email,
        password: this.user_password,
        pwd: this.pwd
    };

    //注册页面确认保存数据
    //1. 检查公司是否存在: 'SELECT id FROM company WHERE name = ' +company.name; -> id != null
    //2. 如果公司不存在，保存公司数据　INSERT INTO company ...
    //3. 公司数据保存后，提取公司id: 'SELECT id FROM company WHERE name = ' +company.name;
    //4. 使用公司id保存用户数据: INSERT INTO user ( company_id, ...) values ( ...)
    //

    var selectCompanySQL = 'SELECT id FROM company WHERE name = "' + company.name + '" and departmentName = "'+user.departmentName+'"';

    nodeUtil.log(selectCompanySQL);
    mysql.query(selectCompanySQL, function (err, rows) {

        if (!(isEmptyObject(rows))) {
            return callback(result(1, "贵公司同一部门已有人注册成功，请致电400-998-6121"));
        }

        var checkUserAlreadyExistSQL =
            "SELECT id FROM user WHERE mobile_phone = '" + user.mobilephone + "' OR email = '" + user.email + "'";
        nodeUtil.log(checkUserAlreadyExistSQL);
        mysql.query(checkUserAlreadyExistSQL, function (err, rows3) {

            if (err) {
                nodeUtil.error(err + ": " + checkUserAlreadyExistSQL);
                return callback(new Error(err));
            }

            if (!(isEmptyObject(rows3))) {
                return callback(result(1, "用户已经存在！原因可能是您输入的邮箱地址或手机号已被其他用户使用．请检查您输入的用户信息！"));
            }

            var insertCompanySQL = 'INSERT INTO company ' +
                '( name, short_name, province, city, address, telephone_area_code, telephone, fax, logo, bank, account_number, payment_transfer, payment_online_banking,  payment_alipay, payment_cheque, payment_cash, registered_at,account_name,departmentName) ' +
                ' VALUES ( "' +
                company.name + '", "' + company.short_name + '", "' + company.province + '", "' + company.city + '", "' + company.address + '", "' + company.telephone_area_code + '", "' + company.telephone + '","' +
                company.fax + '", "' + company.logo + '" ,"' + company.bank + '", "' + company.accountNo + '", ' + company.payment_transfer + ',' + company.payment_online_banking + ', ' +
                company.payment_alipay + ', ' + company.payment_cheque + ', ' + company.payment_cash + ', now(),"' + company.account_name + '","'+user.departmentName+'");';
            console.log(insertCompanySQL);

            mysql.query(insertCompanySQL, function (err, rows1) {

                if (err) {
                    nodeUtil.error(err + ": " + insertCompanySQL);
                    return callback(new Error(err));
                }

                mysql.query(selectCompanySQL, function (err, rows2) {

                    if (err) {
                        nodeUtil.error(err + ": " + selectCompanySQL);
                        return callback(new Error(err));
                    }

                    var companyId = rows2[0].id;

                    var insertUserSQL =
                        'INSERT INTO user ( company_id, name, departmentName, position, email, mobile_phone, telephone, fax, ' +
                        ' password, role_company_admin, registered_at) ' +
                        'values ( ' +
                        companyId + ', "' + user.name + '","' + user.departmentName + '", "' +
                        user.position + '", "' + user.email + '", "' + user.mobilephone + '", "' + user.telephone + '", "' +
                        user.fax + '", "' + user.password + '", 1, now()' +
                        ')';
                    nodeUtil.log(insertUserSQL);
                    mysql.query(insertUserSQL, function (err, rows4) {
                        if (err) {
                            nodeUtil.error(err + ": " + insertUserSQL);
                            return callback(new Error(err));
                        }
                        return callback(result(0, "用户注册成功！"));
                    });

                });

            });
        });

    });
}

Regist.prototype.savezi = function save(callback) {
    var user = {
        name: this.user_name,
        departmentName: this.user_departmentName,
        position: this.user_position,
        telephone: this.user_telephone,
        fax: this.user_fax,
        mobilephone: this.user_mobilephone,
        email: this.user_email,
        password: this.user_password,
        pwd: this.pwd,
        company_id: this.company_id,
        role_buyer: this.role_buyer,
        role_seller: this.role_seller,
        role_accountant: this.role_accountant,
        user_password:this.user_password
    };

    var companyId = user.company_id;

    var checkUserAlreadyExistSQL =
        "SELECT id FROM user WHERE mobile_phone = '" + user.mobilephone + "' OR email = '" + user.email + "'";

    mysql.query(checkUserAlreadyExistSQL, function (err, rows3) {

        if (err) {
            nodeUtil.error(err + ": " + checkUserAlreadyExistSQL);
            return callback(new Error(err));
        }

        if (!(isEmptyObject(rows3))) {
            return callback(result(1, "用户已经存在！原因可能是您输入的邮箱地址或手机号已被其他用户使用．请检查您输入的用户信息！"));
        }

        var sysrole = 0;
        if (companyId == "33") {
            sysrole = 1;
        }

        var insertUserSQL =
            'INSERT INTO user ( company_id, name, departmentName, position, email, mobile_phone, telephone, fax, ' +
            ' password, role_company_admin, registered_at,activated,certified,role_buyer,role_seller,role_accountant,role_sys_user) ' +
            'values ( ' +
            companyId + ', "' + user.name + '","' + user.departmentName + '", "' +
            user.position + '", "' + user.email + '", "' + user.mobilephone + '", "' + user.telephone + '", "' +
            user.fax + '", "' + user.pwd + '", 0, now(),1,1,' + user.role_buyer + ',' + user.role_seller + ',' + user.role_accountant + ',' + sysrole +
            ')';
        nodeUtil.log(insertUserSQL);
        mysql.query(insertUserSQL, function (err, rows4) {
            if (err) {
                nodeUtil.error(err + ": " + insertUserSQL);
                return callback(new Error(err));
            }
            //用户开设子账户，子账户的邮件需要收到邮件通知
            //发邮件
            email.sendSystemMail(user.email,
                        "欢迎注册荟邮轮",
                            "尊敬的" + user.name + "，您好！<br/>您的管理员已为您成功开通荟邮轮！<br/><b>您的账号：" + user.email + "<br/>密码：</b><b style='color:#FF0000'>" + user.user_password + "</b><br/>您可以在[个人中心]-[账户管理]里修改您的登陆密码。");
            sms.sendSMS(user.mobilephone,"您好！您的管理员已为您成功开通荟邮轮！账号："+user.email+"，密码："+user.user_password+"。");
            return callback(result(0, "用户添加成功！"));

        });
    });

}
