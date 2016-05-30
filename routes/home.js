/**
 * render home page after user logged in
 */
var permission = require('./permission');
var setting = require('../models/setting.js');
var User = require('../models/user');
var Company = require('../models/company.js');
var Booking = require('../models/booking.js');
var IO_KEY = require('./socket/io-keys');
var errHandler = require('./error.js');
var nodeUtil = require('util');

exports.renderHome = function (req, res) {

    permission.checkUser(req, res, function (result) {

        var company = new Company({id: result[0].company_id});
        company.get(function (result1) {
            if (nodeUtil.isError(result1)) {
                errHandler.responseError(result1, req, res);
                return false;
            }

            //计算购买订单和销售订单
            var booking = new Booking({});
            booking.getByParameters({user_id:result[0].id, columns:['owner_id', 'status_id', 'service_user_id']}, function (result4) {
                if (nodeUtil.isError(result4)) {
                    errHandler.responseError(result4, req, res);
                    return false;
                }

                setting.getServiceManager(function (managerUserId) {
                    res.render('home', {
                        layout: "framelayout",
                        user: result,
                        company: result1,
                        io_keys: IO_KEY,
                        booking: result4,
                        service_user_id: managerUserId
                    });
                });

            });
        });
    });

}