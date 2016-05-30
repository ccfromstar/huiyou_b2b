

module.exports = function (app, routes) {

    app.get('/',routes.welcome);

    /**ajax use**/
    app.post('/getbookingstatus',routes.getbookingstatus);

    /**b2b**/
    app.get('/homepage',routes.homepage);
    app.get('/homepagepublic',routes.homepagepublic);

    app.get('/home',routes.home);
    app.get('/aboutus',routes.aboutus);

    app.get('/help',routes.help);

    app.get('/publichome',routes.publichome);

    app.get('/redirect',routes.redirect);

    app.get('/optionweixin',routes.optionweixin);
    /**
     * not used currently
     * @deprecated
     */
    app.get('/product',routes.product);
    app.get('/productlist',routes.productlist);
    app.get('/productlistpublic',routes.productlistpublic);
    app.get('/fetchProductsData',routes.fetchProductsData);
    app.get('/getCityFilter',routes.getCityFilter);
    app.get('/getCruiseCompanyShipFilter',routes.getCruiseCompanyShipFilter);
    app.get('/fetchProducts4Calendar', routes.fetchProducts4Calendar);
    app.get('/fetchNews', routes.fetchNews);

    app.get('/linelist',routes.linelist);

    /**
     * not used currently. productlistpublic is used
     * @deprecated
     */
    app.get('/productpublic',routes.productpublic);
    app.post('/productpublic',routes.productpublicdo);

    app.post('/product',routes.productdo);
    app.get('/productoverseas',routes.productoverseas);
    app.get('/market',routes.market);
    app.get('/marketall',routes.marketall);
    app.post('/marketall',routes.marketalldo);
    app.post('/marketbuyall',routes.marketbuyalldo);
    app.get('/marketbuyall',routes.marketbuyall);

    app.get('/marketbuy',routes.marketbuy);
    app.post('/marketbuy',routes.marketbuydo);
    app.post('/market',routes.marketdo);

    app.get('/option',routes.option);
    app.post('/option',routes.optiondo);

    app.get('/optioncompany',routes.optioncompany);
    app.post('/optionpwd',routes.optionpwddo);

    app.get('/optionadmin',routes.optionadmin);
    app.get('/optionpwd',routes.optionpwd);

    app.get('/optionhistory',routes.optionhistory);

    app.get('/optionpublish',routes.optionpublish);
    app.get('/optionpublish1',routes.optionpublish1);
    app.get('/optionpublish2',routes.optionpublish2);
    app.post('/optionpublish2',routes.optionpublish2do);
    app.post('/optionpublish1',routes.optionpublish1do);
    app.post('/optionpublish',routes.optionpublishdo);

    app.get('/optionedit1',routes.optionedit1);
    app.post('/optionedit1',routes.optionedit1do);

    app.get('/optionedit2',routes.optionedit2);
    app.post('/optionedit2',routes.optionedit2do);

    app.get('/optionopen1',routes.optionopen1);
    app.get('/optionopen2',routes.optionopen2);

    app.get('/optionorder',routes.optionorder);
    app.get('/optionorderall',routes.optionorderall);
    app.get('/optionordersell',routes.optionordersell);
    app.get('/optionordersellall',routes.optionordersellall);

    app.get('/optionaccount',routes.optionaccount);

    app.post('/optionaccount',routes.optionaccountdo);
    app.post('/optioncompany',routes.optioncompanydo);

    app.get('/loading',routes.loading);

    app.get('/cover',loadinfo);
    app.get('/cover',routes.cover);

    app.get('/covert',loadinfo);
    app.get('/covert',routes.covert);

    app.get('/routedownload',loadinfo);
    app.get('/routedownload',routes.routedownload);

    app.get('/routedownloadpeer',loadinfo);
    app.get('/routedownloadpeer',routes.routedownloadpeer);


    app.get('/routedownloadpublic',loadinfo);
    app.get('/routedownloadpublic',routes.routedownloadpublic);
    //即时消息
    app.get('/message',routes.message);
    app.get('/message2',routes.message2);

    //登陆
	app.post('/',routes.logindo);

    //用户管理
    app.get('/useradmin',routes.useradmin);
    app.post('/useradmin',routes.useradmindo);

    app.get('/userregist',routes.userregist);
    app.post('/userregist',routes.regdo);

    app.post('/deleteuser', routes.deleteuser);
    //用户注册成功
    app.get('/regsuccess',routes.regsuccess);
    //忘记密码
    app.get('/forgetpwd',routes.forgetpwd);
    app.get('/userdominomanagement',routes.userdominomanagement);

    app.get('/b_user',routes.b_user);
    app.get('/b_product',routes.b_product);
    app.post('/getdata',routes.getdata);
    app.post('/getdata1',routes.getdata1);

    app.get('/reginfo',routes.reginfo);
    app.post('/reginfo',routes.reginfodo);

    app.get('/errorreturn',routes.errorreturn);

    app.get('/publishproduct',routes.publishproduct);
    app.post('/publishproduct',routes.publishproductdo);
    app.post('/publishproductedit',routes.publishproductdo);

    app.get('/publishproductedit',routes.publishproductedit);

    app.get('/publishproductyulan',routes.publishproductyulan);
    app.post('/publishproductyulan',routes.publishproductyulando);
    app.post('/publishproductread',routes.publishproductyulando);

    app.get('/productbookingprint',routes.productbookingprint);

    app.get('/publishproductsuccess',routes.publishproductsuccess);

    //产品详情
    app.get('/productdetail',routes.productdetail);

    app.post('/productdetailbooking', loadinfo);
    app.post('/productdetailbooking',routes.productdetaildo);

    app.get('/productbooking',routes.productbooking);
    app.post('/productbooking',loadinfo);
    app.post('/productbooking',routes.productbookingdo);

    app.get('/productbookingread',routes.productbookingread);

    app.get('/productbookingsuccess',routes.productbookingsuccess);
    app.get('/productbookingsavesuccess',routes.productbookingsavesuccess);

    app.get('/productdetailbooking',routes.productdetailbooking);

    app.get('/publishproductread',routes.publishproductread);

    app.get('/publishproductmenu',routes.publishproductmenu);

    app.get('/productbookingreadxs',routes.productbookingreadxs);

    app.post('/productbookingreadxs',routes.productbookingreadxsdo);

    app.post('/productbookingread',routes.productbookingreaddo);

    app.post('/b_product',routes.b_productdo);

    //接口
    app.post('/approveProduct',routes.approveProduct);

    //services
    app.get('/services/authuser',routes.servicesAuthUser);
    app.get('/services/getOption',routes.servicesgetOption);
    app.get('/services/setOption',routes.servicessetOption);
    app.get('/services/resetOption',routes.servicesresetOption);
};

function loadinfo(req,res,next){
    if(req.session.error){
        res.locals.user = req.session.user;
        res.locals.error = req.session.error;
        req.session.error = null;
    }else{
        res.locals.error = req.flash("error").toString();
    }
    next();
}