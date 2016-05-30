/**
 * Created by teng on 18.10.2014.
 */
var nodeUtil = require('util');

exports.responseError = function( err, req, res ) {
    if (nodeUtil.isError(err)) {
        res.render('errorpage', {
            message: err.message,
            error: err
        });
    } else {//err should be a string
        res.render('errorpage', {
            message: err
        });
    }
}
exports.logErrorAndResponse = function( errMessage, errStack, req, res ) {
    nodeUtil.error(errMessage + ": " + errStack);
    res.render('errorpage', {
        message: errMessage,
        error: errStack
    });
}