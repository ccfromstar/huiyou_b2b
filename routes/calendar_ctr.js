/**
 * Created by teng on 11.12.2014.
 */
var mysql = require('../models/db_mysql');
var utils = require('./utils.js');
var nodeUtil = require('util');

/**
 * 读取邮轮日历产品数据
 * @param isPublic true -> 游客, 显示市场价, false -> 用户,　显示结算价
 * @param callback
 */
exports.fetchProducts4Calendar = function (isPublic, callback) {

    var now = new Date();
    var next2Year = parseInt(utils.getDateFullYear(now))+2;
    var startDateFrom = utils.getDateFullYear(now) + '-' + utils.getDateMonth(now);
    var startDateTo = next2Year + '-' + utils.getDateMonth(now);

    var parameters = {
        startDate: null,
        startDateRange: [startDateFrom, startDateTo],
        statusIdsInclude: [3, 6],
        price_only: isPublic,
        columns: ['title', 'start_date', 'product_number', 'status_id']
    };

    var sql  = _lowestPriceStartCitySql(parameters);
    nodeUtil.log(sql);
    mysql.query(sql, function (err, products) {
        if (err){
            nodeUtil.error(err+ ": "+sql);
            return callback(new Error(err));
        }

        if (!products || !products[0]) {
            return callback({});
        }

        var productIds = "";
        for (var i in products) {
            if (productIds) productIds += ",";
            productIds += products[i].id;
        }
        var tsParams = {
            columns: ['product_id', 'day_number', 'location'],
            product_ids: productIds,
            day_number: 1
        };

        return callback({
            products: products
        });

    });
}

/**
 *
 * @param params
    {
    columns : ['title', 'start_date', 'product_number', 'status_id'],
    startDate: startDate  search product with start_date like startDate
    startDateRange:[startDateFrom, startDateTo] array of two start date
    }
 * @returns {string}
 * @private
 */
function _lowestPriceStartCitySql(params) {
    var columns = "";
    if ( params.columns ){
        for ( var i in params.columns ) {
            if (columns) columns += ", p.";
            columns += params.columns[i];
        }
    }

    if ( columns ) columns += ", ";
    if ( params.price_only ){
        columns += "MIN(pp.price) as price";
    } else {
        columns += "MIN(pp.retail_price) as retail_price";
    }

    var where = "";
    if ( params.product_ids ){
        where = " p.id in (" + params.product_ids + ")";
    }
    if ( params.statusIdsInclude && params.statusIdsInclude.length > 0 ) {
        var criteriaStatus = "";
        for( var i in params.statusIdsInclude ) {
            if ( criteriaStatus ) criteriaStatus += " or ";
            criteriaStatus += " status_id = '" + params.statusIdsInclude[i] + "' ";
        }
        criteriaStatus = "(" + criteriaStatus + ")";
        if ( where ) where += " and ";
        where += criteriaStatus;

    }
    if ( params.startDateRange && params.startDateRange.length == 2){
        if ( where ) where += " and ";
        where += " (start_date > '" + params.startDateRange[0] + "' and start_date < '"+ params.startDateRange[1]+"')";
    } else if (params.startDate) {
        if ( where ) where += " and ";
        where +=  " start_date like '%" + params.startDate + "%' ";
    }
    where = "where " + where;
    if ( columns ) columns = ", " + columns;
    //var sql = "SELECT p.id, p.title, MIN(pp.price) as price FROM product p " +
    //    " LEFT JOIN product_position pp ON p.id = pp.product_id " + where + " GROUP BY p.id";
    return "SELECT p.id" + columns + ", ts.location FROM product p " +
        " LEFT JOIN product_position pp ON p.id = pp.product_id " +
        " LEFT JOIN travel_schedule ts ON ts.product_id = p.id and ts.day_number = 1 " +
        where + " GROUP BY p.id";
}