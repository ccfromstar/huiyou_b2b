/**
 * 后台管理
 * Created by teng on 30.11.2014.
 */

$(function(){
    //后台管理用 ************************************
    if($('#tt')) {
        var urls = "";
        $('#tt').tree({
            onClick: function (node) {
                switch (node.text) {
                    case "注册审核":
                        urls = "b_user";
                        break;
                    case "产品审核":
                        urls = "b_product";
                        break;
                    default:
                    //do
                }
                $("#centerid").attr("src", urls);
            }
        });
    }
});