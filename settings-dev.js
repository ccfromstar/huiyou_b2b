/**
 * global settings
 */

module.exports = {
	development : true,
	is_local : false,//true -> 本地开发环境, false -> 测试和正式服务器
	debug : false,
	http : 1227,
	https : 1226,
	db : {
		host: '',
		//host: '127.0.0.1',
		user: '',
		password: '',
		database: '',
		port: 3306
	},
	email : {
		TEST_RECIPIENT : ''
	}
};