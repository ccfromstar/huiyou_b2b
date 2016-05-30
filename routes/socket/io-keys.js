/**
 * Created by teng on 22.07.2014.
 */

var IO_KEY = {
    CHAT : 'chat',/*传送一个消息*/
    GET_HISTORY : 'getHistory',/*通知接收所有信息*/
    RECEIVED : 'received',/*通知收到一个信息*/
    RECEIVED_ALL: 'receivedAll',/*通知收到某个主题的所有信息*/
    GET_TOPIC_LIST : 'getTopicList',/*接收主题*/
	MORE_TOPIC : 'moreTopic',
	SEARCH_TOPIC : 'searchTopic',
	LOOKUP_TOPIC : 'lookupTopic', /*搜寻是否有匹配的主题可以使用*/
    ONLINE: 'online',/*通知用户在线*/
    OFFLINE: 'offline',/*通知用户离线*/
    INVALID_SOCKET: 'invalidSocket',/*通知当前socket无效*/
	ONLINE_USERS: 'onlineUsers',
	GET_ONLINE_USERS : 'getOnlineUsers',
	GET_USER : 'getUser',
    TOPIC_CREATED : 'topicCreated', /*通知成功存储了新的主题*/
    SYS : 'sysMsg',/*系统消息*/
    NOTIFY_SYS_NEW : 'checkSysNew',/*通知有新系统消息*/
	NOTIFY_MSG_NEW : 'checkMsgNew',/*通知有新消息*/
    GET_SYS_MSG : 'getSysMsg',/*接收系统消息*/
    RECEIVED_ALL_SYS : 'receivedAllSys', /*客户端通知全部系统已经接收*/
    NOTIFY_ERROR : 'error',/*返回错误信息*/
    SYS_NOTIFICATION_TOP: 'sysNotificationTop',/*系统置顶通知*/
    PRODUCT_PUBLISHED: 'newProduct',/*通知发布的产品通过审核(状态:在售)*/
    PRODUCT_DELETED: 'delProduct',/*通知产品已经删除*/
    SUPPLY_NEW: 'supplyNew', /*通知有新的尾舱供应简讯*/
    DEMAND_NEW: 'demandNew', /*通知有新的需求简讯*/
    BOOKING_STATUS_CHANGED : 'bookingStatusChanged', /*通知订单状态*/
    GET_CITY_FILTER : 'getCityFilter',/*request departure cities, cruise area port map*/
    GET_CRUISE_COMPANY_SHIP : 'getComShip',/*cruise companies and ships*/
    GET_PRODUCT_LIST: 'getProductList', /*request products*/
    ERROR : 'error',
    WARNING : 'warning',
    URGENT : 'urgent' /*紧急通知, 仅发送在线用户, 不保存到数据库*/
}

module.exports = IO_KEY;