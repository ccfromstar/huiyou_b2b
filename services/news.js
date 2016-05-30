/**
 * Created by teng on 08.12.2014.
 */
var Product = require('../models/product.js');
var Demand = require('../models/demand.js');
var Supply = require('../models/supply.js');
var nodeUtil = require('util');

exports.fetchNews = function(requiredByUser, params, callback) {

    new Product({}).getByParameters(
        {
            columns: {
                company: ['short_name'],
                product: ['id', 'published_at'],
                user: ['name']
            },
            limit: 6,
            statusIdsInclude : [3],
            productOrder:" order by published_at desc "
        },
        function (productResult) {
            if (nodeUtil.isError(productResult)) {
                var e = new Error("查询产品发生数据库错误！");
                e.stack = productResult;
                e.status = "500";
                return callback({error: e});
            }

            new Demand({}).getByParameters({limit: 6, status:2}, function (demandResult) {

                if (nodeUtil.isError(demandResult)) {
                    var e = new Error("查询需求发生数据库错误！");
                    e.stack = demandResult;
                    e.status = "500";
                    return callback({error: e});
                }

                new Supply({}).getByParameters({limit: 6, status:2}, function (supplyResult) {

                    if (nodeUtil.isError(supplyResult)) {
                        var e = new Error("查询尾舱发生数据库错误！");
                        e.stack = supplyResult;
                        e.status = "500";
                        return callback({error: e});
                    }

                    var result = [];

                    for (var i in productResult) {
                        result.push({
                            type: 'product',
                            title: productResult[i].short_name,
                            publisher: productResult[i].nameowner,
                            date: productResult[i].published_at,
                            id:productResult[i].id
                        });
                    }
                    for (var i in demandResult) {
                        result.push({
                            type: 'demand',
                            title: demandResult[i].short_name,
                            publisher: demandResult[i].name,
                            date: demandResult[i].published_at,
                            id:demandResult[i].id
                        });
                    }
                    for (var i in supplyResult) {
                        result.push({
                            type: 'supply',
                            title: supplyResult[i].short_name,
                            publisher: supplyResult[i].name,
                            date: supplyResult[i].published_at,
                            id:supplyResult[i].id
                        });
                    }
                    //for (var i in result) {
                    //    console.log('before sort: ' + result[i].id + ":" + result[i].type + ": " + result[i].title);
                    //}

                    result.sort(function (a, b) {
                        if (b.date > a.date) return 1;
                        if (b.date < a.date) return -1;
                        return 0;
                    });

                    if (result.length > 6) {
                        result = result.slice(0, 6);
                    }

                    //for (var i in result) {
                    //    console.log(result[i].id + ':' + result[i].type + ": " + result[i].title);
                    //}

                    return callback(result);
                });
            });
        });
}