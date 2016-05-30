/*创建基本信息数据库*/
CREATE database IF NOT EXISTS cds_b2b1 default charset utf8 COLLATE utf8_general_ci;
/*GRANT ALL PRIVILEGES ON cds_basicinfo.* TO 'root'@'%' IDENTIFIED BY 'password123' WITH GRANT OPTION;*/

Use cds_b2b1;

DROP TABLE IF EXISTS setting;
CREATE TABLE setting (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  value varchar(100),
  description varchar(100),
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO setting (name, value, description) VALUES ('booking_manager', '1', '订单服务经理, 有分配跟单权限, value->user_id');
/*------------ constant tables ------------*/
/*用户角色*/
DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO role (name) VALUES ('系统管理员');
INSERT INTO role (name) VALUES ('后台');
INSERT INTO role (name) VALUES ('公司账号管理员');
INSERT INTO role (name) VALUES ('销售');
INSERT INTO role (name) VALUES ('采购');
INSERT INTO role (name) VALUES ('财务');
INSERT INTO role (name) VALUES ('买家');
INSERT INTO role (name) VALUES ('卖家');

/*联系方式*/
DROP TABLE IF EXISTS contact_type;
CREATE TABLE contact_type (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO contact_type (name) VALUES ('电话');
INSERT INTO contact_type (name) VALUES ('传真');
INSERT INTO contact_type (name) VALUES ('邮政地址');
INSERT INTO contact_type (name) VALUES ('电子邮件');
INSERT INTO contact_type (name) VALUES ('QQ');
INSERT INTO contact_type (name) VALUES ('微信');

DROP TABLE IF EXISTS product_type;
CREATE TABLE product_type (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO product_type (name) VALUES ('单船票');
INSERT INTO product_type (name) VALUES ('团队游（一价全包）');
INSERT INTO product_type (name) VALUES ('自由行');

/*产品状态: 草稿、已发布、已预订、订单已确认*/
DROP TABLE IF EXISTS product_status;
CREATE TABLE product_status (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO product_status (name) VALUES ('草稿');
INSERT INTO product_status (name) VALUES ('审核中');
INSERT INTO product_status (name) VALUES ('在售');
INSERT INTO product_status (name) VALUES ('已下架');
INSERT INTO product_status (name) VALUES ('已删除');

DROP TABLE IF EXISTS demand_status;
CREATE TABLE demand_status (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO demand_status (name) VALUES ('草稿');
INSERT INTO demand_status (name) VALUES ('询价中');
INSERT INTO demand_status (name) VALUES ('询价结束');

DROP TABLE IF EXISTS supply_status;
CREATE TABLE supply_status (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO supply_status (name) VALUES ('草稿');
INSERT INTO supply_status (name) VALUES ('在售');
INSERT INTO supply_status (name) VALUES ('停售');

DROP TABLE IF EXISTS booking_status;
CREATE TABLE booking_status (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO booking_status (name) VALUES ('待确认');
INSERT INTO booking_status (name) VALUES ('待付款');
INSERT INTO booking_status (name) VALUES ('交易关闭');
INSERT INTO booking_status (name) VALUES ('交易关闭');
INSERT INTO booking_status (name) VALUES ('已出团');
INSERT INTO booking_status (name) VALUES ('待出团');
INSERT INTO booking_status (name) VALUES ('已付款');

/* 价格条件，供用户选择 */
DROP TABLE IF EXISTS price_condition;
CREATE TABLE price_condition (
	id int NOT NULL AUTO_INCREMENT,
	txtName varchar(50) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO price_condition (txtName) VALUES ('同舱第1、第2人');
INSERT INTO price_condition (txtName) VALUES ('同舱第3、第4人');
INSERT INTO price_condition (txtName) VALUES ('儿童价');
INSERT INTO price_condition (txtName) VALUES ('成人价');
INSERT INTO price_condition (txtName) VALUES ('统一价');

/* 货币单位表 */
DROP TABLE IF EXISTS currency;
CREATE TABLE currency (
  id int NOT NULL AUTO_INCREMENT,
  code varchar(10) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO currency (code, name) VALUES ('RMB', '人民币');
INSERT INTO currency (code, name) VALUES ('USD', '美元');
INSERT INTO currency (code, name) VALUES ('EUR', '欧元');

/*用户编辑产品时可供选择的费用名称*/
DROP TABLE IF EXISTS cost_type;
CREATE TABLE cost_type (
  id int NOT NULL AUTO_INCREMENT,
  txtName varchar(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO cost_type (txtName) VALUES ('港务费');
INSERT INTO cost_type (txtName) VALUES ('邮轮税');
INSERT INTO cost_type (txtName) VALUES ('邮轮小费');
INSERT INTO cost_type (txtName) VALUES ('保险');
INSERT INTO cost_type (txtName) VALUES ('签证费');
INSERT INTO cost_type (txtName) VALUES ('岸上游');
INSERT INTO cost_type (txtName) VALUES ('领队服务费');
INSERT INTO cost_type (txtName) VALUES ('其他费用');

DROP TABLE IF EXISTS price_type;
CREATE TABLE price_type (
  id int NOT NULL AUTO_INCREMENT,
  txtName varchar(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO price_type (txtName) VALUES ('体系价格');
INSERT INTO price_type (txtName) VALUES ('类别价格');
INSERT INTO price_type (txtName) VALUES ('导入价格');

DROP TABLE IF EXISTS payment_history_type;
CREATE TABLE payment_history_type (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO payment_history_type (name) VALUES ('订金');
INSERT INTO payment_history_type (name) VALUES ('余款');

/*------------ end constant tables ------------*/

/* 用户的公司 */
CREATE TABLE company (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,/*公司名*/
  short_name varchar(15),/*公司简称*/
  province varchar(20),/*省*/
  city varchar(20),/*市*/
  address varchar(200),/*详细地址*/
  telephone_area_code varchar(10), /*电话区号*/
  telephone varchar(50),/*公司电话*/
  fax varchar(50), /*传真*/
  homepage varchar(200),
  logo varchar(100),/*公司LOGO的路径*/
  bank varchar(100), 			/*银行名称*/
  account_number varchar(100),	/*帐号*/ 
  account_name varchar(50), /*银行帐户名*/
  payment_transfer tinyint(1), 		/*1->支付方式:转账, 0->不提供该方式*/
  payment_online_banking tinyint(1),/*1->支付方式:网银, 0->不提供该方式*/
  payment_alipay tinyint(1),		/*1->支付方式:支付宝, 0->不提供该方式*/
  payment_cheque tinyint(1),		/*1->支付方式:支票, 0->不提供该方式*/
  payment_cash tinyint(1),			/*1->支付方式:现金, 0->不提供该方式*/
  isSupplier tinyint(1) DEFAULT 0, 	/*1->是供应商, 0->是分销商, 这个由后台管理员验证确定*/  
  activated tinyint(1) DEFAULT 0,/*未激活=0, 已激活=1, 未激活公司的用户不能登录*/
  certified tinyint(1) DEFAULT 0,/*未验证=0, 已验证=1, 已验证的公司的用户自动标记为已验证？*/
  role_seller tinyint(1) DEFAULT 0,/*有供应商资质=1*/
  registered_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*注册时间，插入新的用户时使用 now()*/
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间*/
  PRIMARY KEY (id)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*用户*/
/*If sex is empty string: select * from user where sex = 0.*/
/*If sex is NULL: ...where sex = NULL.*/
/*Otherwise 男 => ...where sex=1, 女 => ...where sex=2*/
CREATE TABLE user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  company_id int NOT NULL,
  name varchar(50) NOT NULL, /*姓名*/
  sex ENUM('男', '女'), /*性别*/
  departmentName varchar(100), /*部门名称*/
  position varchar(50), /*职务*/
  email varchar(50) NOT NULL,
  picture varchar(100), /*头像图片路径*/
  mobile_phone varchar(50) NOT NULL,/*手机号*/
  telephone varchar(50),
  fax varchar(50), /*传真*/
  qq varchar(20), /*qq号*/
  weixin varchar(20), /*微信号*/ 
  password varchar(50) DEFAULT NULL,
  weixin_open_id varchar(28),/*微信openId*/
  role_sys_admin tinyint(1) DEFAULT 0,		/* =1->后台系统管理员*/
  role_sys_user tinyint(1) DEFAULT 0,		/* =1->后台用户*/
  role_company_admin tinyint(1) DEFAULT 0,	/* =1->公司帐户管理员权限*/
  role_buyer tinyint(1) DEFAULT 0,			/* =1->采购权限*/
  role_seller tinyint(1) DEFAULT 0,			/* =1->销售权限*/
  role_accountant tinyint(1) DEFAULT 0,		/* =1->财务权限*/
  activated tinyint(1) DEFAULT 0,/*未激活=0, 已激活=1, 未激活用户不能登录*/
  certified tinyint(1) DEFAULT 0,/*未验证=0, 已验证=1*/
  parent_id BIGINT,/*上级分销商或推荐者用户ID*/
  retail_level INT DEFAULT 0,/*非分销商->0， 一级分销商->1， 二级分销商->2*/
  registered_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*注册时间，插入新的用户时使用 now()*/
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改日期*/
  PRIMARY KEY (id),
  CONSTRAINT U_USER_EMAIL UNIQUE (email),
  CONSTRAINT U_USER_PHONE UNIQUE (mobile_phone),
  CONSTRAINT FK_USER_COMPANY_ID FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE reset_password (
  id bigint(20)  NOT NULL AUTO_INCREMENT,
  user_id bigint(20),
  new_password varchar(50),
  PRIMARY KEY (id),
  CONSTRAINT FK_RESET_PWD_ID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 用户角色关联表 */
/*
CREATE TABLE user_role (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  user_id bigint(20) NOT NULL, 
  role_id int NOT NULL, 
  PRIMARY KEY (id),
  CONSTRAINT U_USER_ROLE UNIQUE (user_id, role_id),
  CONSTRAINT FK_USER_ROLE_USER FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_USER_ROLE_ROLE FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

/*公司银行帐户扩展表 (每个公司允许多个账号)*/
CREATE TABLE ext_bank_account (
  id int NOT NULL AUTO_INCREMENT,
  company_id int NOT NULL,	/*公司*/
  bank varchar(100), 		/*银行名称*/
  account_number varchar(100),	/*帐号*/  
  PRIMARY KEY (id),
  CONSTRAINT FK_BANKACCOUNT_COMPANY FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*公司和用户的关联表*/
/*CREATE TABLE company_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  company_id int,
  user_id bigint(20),
  PRIMARY KEY (id),
  CONSTRAINT U_COMPANY_USER UNIQUE (company_id, user_id),
  CONSTRAINT FK_COMPANY_USER_C_ID FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_COMPANY_USER_U_ID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;*/

/*系统日志，供系统管理员使用*/
CREATE TABLE sys_log (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	txtLog varchar(200),
	log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*邮轮航区表 */
CREATE TABLE cruise_area (
  id int NOT NULL AUTO_INCREMENT,
  range_number int, /*用作排序的号码*/ 
  txtCruiseAreaNo varchar(10) NOT NULL,
  txtCruiseArea varchar(100) NOT NULL,
  txtCruiseAreaEn varchar(100) NOT NULL,
  rtfImg varchar(100) DEFAULT NULL,
  txtAreaGeneralSituation varchar(1000) DEFAULT NULL,
  txtSellingPoint_1 varchar(100) DEFAULT NULL,
  txtSellingPointExponent_1 varchar(1000) DEFAULT NULL,
  rtfImg_1 varchar(100) DEFAULT NULL,
  txtSellingPoint_2 varchar(100) DEFAULT NULL,
  txtSellingPointExponent_2 varchar(1000) DEFAULT NULL,
  rtfImg_2 varchar(100) DEFAULT NULL,
  txtSellingPoint_3 varchar(100) DEFAULT NULL,
  txtSellingPointExponent_3 varchar(1000) DEFAULT NULL,
  rtfImg_3 varchar(100) DEFAULT NULL,
  txtSellingPoint_4 varchar(100) DEFAULT NULL,
  txtSellingPointExponent_4 varchar(1000) DEFAULT NULL,
  rtfImg_4 varchar(100) DEFAULT NULL,
  txtOutTime mediumtext, /*最佳出游季节*/
  PRIMARY KEY (id),
  CONSTRAINT U_CRUISEAREA UNIQUE (txtCruiseAreaNo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*港口表 */
/*ALTER TABLE cruise_port DROP FOREIGN KEY FK_CRUISEPORT_CRUISEAREA;*/
CREATE TABLE cruise_port (
  id int NOT NULL AUTO_INCREMENT,  
  txtPortCityName varchar(100) NOT NULL,
  txtCountry varchar(100) NOT NULL,
  txtCruiseAreaNo varchar(10) NOT NULL,
  txtPortCityInfo mediumtext,
  rtfPortImg varchar(100) DEFAULT NULL,
  txtCruiseArea varchar(50) DEFAULT NULL,
  txtPortCityNameEn varchar(255) DEFAULT NULL,
  txtLocation varchar(500) DEFAULT NULL,
  txtisLine varchar(10) DEFAULT NULL,
  txtSpecialPort varchar(10) DEFAULT NULL,
  range_number int DEFAULT 9999,/*用作排序的号码*/ 
  is_departure_port tinyint(1) DEFAULT 0,/*1->出发港*/
  PRIMARY KEY (id),
  KEY FK_CRUISEPORT_CRUISEAREA (txtCruiseAreaNo),
  CONSTRAINT FK_CRUISEPORT_CRUISEAREA FOREIGN KEY (txtCruiseAreaNo) REFERENCES cruise_area (txtCruiseAreaNo) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*在cruise_port 和 cruise_area表数据已经存在的条件下建cruise_port cruise_area关联表*/
/*ALTER TABLE cruise_area_port drop foreign key FK_AREA_PORT;
ALTER TABLE cruise_area_port drop foreign key FK_PORT_AREA;*/
DROP TABLE IF EXISTS cruise_area_port;
CREATE TABLE cruise_area_port (
  id int NOT NULL AUTO_INCREMENT,
  port_id int NOT NULL, 
  area_id int NOT NULL, 
  PRIMARY KEY (id),
  CONSTRAINT FK_AREA_PORT FOREIGN KEY (port_id) REFERENCES cruise_port (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_PORT_AREA FOREIGN KEY (area_id) REFERENCES cruise_area (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
INSERT INTO cruise_area_port (port_id, area_id) SELECT p.id, a.id FROM cruise_port as p, cruise_area as a WHERE p.txtCruiseAreaNo = a.txtCruiseAreaNo;


/* 邮轮公司信息表 */
CREATE TABLE cruise_company (
  id int NOT NULL AUTO_INCREMENT,
  txtCompanyNo varchar(10) NOT NULL,
  txtCompanyName varchar(50) NOT NULL,
  txtCompanyAbstract varchar(1000) NOT NULL,
  rtfCompanyLogo varchar(100) NOT NULL,/*公司LOGO记录附件的路径*/
  txtCompanyWebSite varchar(50) NOT NULL,
  txtCompanyPolicy varchar(500) DEFAULT NULL,
  txtCompanyFeature_1 varchar(500) DEFAULT NULL,
  txtFeature_1 varchar(500) DEFAULT NULL,
  rtfImg_1 varchar(100) DEFAULT NULL,
  txtCompanyFeature_2 varchar(500) DEFAULT NULL,
  txtFeature_2 varchar(500) DEFAULT NULL,
  rtfImg_2 varchar(100) DEFAULT NULL,
  txtCompanyFeature_3 varchar(500) DEFAULT NULL,
  txtFeature_3 varchar(500) DEFAULT NULL,
  rtfImg_3 varchar(100) DEFAULT NULL,
  rtfCompanyImg varchar(100) DEFAULT NULL,
  txtCompanyEn varchar(100) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT U_CRUISECOMPANY UNIQUE (txtCompanyNo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 邮轮船只信息表 */
CREATE TABLE cruise_ship (
  id int NOT NULL AUTO_INCREMENT,
  company_id int, /*邮轮公司*/
  txtCompanyNo varchar(10) NOT NULL,
  txtShipNo varchar(10) NOT NULL,
  txtShipDescription varchar(1000), /*邮轮介绍,  HTML格式, 可以是单图片*/
  txtShipSeries varchar(50) DEFAULT NULL,
  txtShipNationality varchar(10) DEFAULT NULL,
  txtShipLevel varchar(50) DEFAULT NULL,
  txtShipName varchar(50) DEFAULT NULL,
  txtShipEnName varchar(50) DEFAULT NULL,
  txtShipAbstract varchar(2000) DEFAULT NULL,
  txtShipWeight varchar(10) DEFAULT NULL,
  txtPassengerTotal varchar(10) DEFAULT NULL,/*载客量*/
  txtMaidenVoyage varchar(10) DEFAULT NULL,/*首航*/
  txtShipRenovate varchar(10) DEFAULT NULL,
  txtShipLength varchar(10) DEFAULT NULL,
  txtShipWidth varchar(10) DEFAULT NULL,
  txtDeckFloorTotal varchar(10) DEFAULT NULL,
  txtRoomTotal varchar(100) DEFAULT NULL,
  txtRoomAbstract varchar(500) DEFAULT NULL,
  txtSeamanTotal varchar(10) DEFAULT NULL,
  txtShipSpeed varchar(10) DEFAULT NULL,
  rtfShipImg varchar(100) DEFAULT NULL,/*邮轮图片附件的路径*/
  rtfShipVideo varchar(100) DEFAULT NULL,/*视频附件的路径*/
  PRIMARY KEY (id),
  CONSTRAINT U_SHIP UNIQUE (txtShipNo),
  CONSTRAINT U_SHIP_NAME UNIQUE (txtShipName),
  CONSTRAINT FK_CRUISESHIP_CRUISECOMPANY FOREIGN KEY (txtCompanyNo) REFERENCES cruise_company (txtCompanyNo) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_SHIP_COMPANYID FOREIGN KEY (company_id) REFERENCES cruise_company (id) ON DELETE CASCADE ON UPDATE CASCADE;
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 邮轮图片, 注意: 舱房、餐饮、娱乐设施的图片都在各自的表格里 */
CREATE TABLE ship_image (
  id int NOT NULL AUTO_INCREMENT,
  ship_id int NOT NULL,
  img_name varchar(20) NOT NULL,
  order_number int DEFAULT 999, /* 图片顺序, 1->保留给默认图片 */
  PRIMARY KEY (id),
  CONSTRAINT FK_SHIPIMG_SHIP FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 邮轮公司和船的表格更新后执行以下脚本，删除并更新该关联表格 */
DROP TABLE IF EXISTS cruise_company_ship;
CREATE TABLE cruise_company_ship (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  company_id int NOT NULL,
  ship_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT U_COMPANY_SHIP UNIQUE (company_id, ship_id),
  CONSTRAINT FK_CRUISE_COMPANY_SHIP_COMPANY FOREIGN KEY (company_id) REFERENCES cruise_company (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_CRUISE_COMPANY_SHIP_SHIP FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;
INSERT INTO cruise_company_ship (company_id, ship_id) SELECT c.id, s.id FROM cruise_company as c, cruise_ship as s WHERE c.txtCompanyNo = s.txtCompanyNo; 

/*船只甲板表*/
CREATE TABLE ship_deck (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  txtShipNo varchar(10) NOT NULL,
  txtDeckFloorNo varchar(10) NOT NULL,
  rtfDeckImg varchar(100) NOT NULL,/*甲板平面图附件的路径*/
  PRIMARY KEY (id),
  KEY FK_SHIPDECK_CRUISESHIP (txtShipNo),
  CONSTRAINT FK_SHIPDECK_CRUISESHIP FOREIGN KEY (txtShipNo) REFERENCES cruise_ship (txtShipNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*船只娱乐及服务设施*/
CREATE TABLE ship_entertainment (
  id int(11) NOT NULL AUTO_INCREMENT,
  ship_id int NOT NULL,
  ship_code varchar(10) NOT NULL, 
  name varchar(500) DEFAULT NULL, /*txtPlaceName*/
  description varchar(5000) DEFAULT NULL, 
  rtfImg varchar(100) DEFAULT NULL, /*rtfPlaceImg*/
  txtLabel varchar(10) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_ENTERTAINMENT_SHIPID FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_ENTERTAINMENT_CRUISESHIP FOREIGN KEY (ship_code) REFERENCES cruise_ship (txtShipNo) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 餐饮设施表*/
CREATE TABLE ship_culinary (
  id int NOT NULL  AUTO_INCREMENT,
  ship_id int NOT NULL,
  ship_code varchar(10) NOT NULL, /*txtShipNo*/
  restaurant_name varchar(50) NOT NULL,
  deck_level varchar(10) DEFAULT NULL,
  type varchar(10) DEFAULT NULL,
  opening_time varchar(500) DEFAULT NULL,
  clothing varchar(200) DEFAULT NULL,
  fees varchar(200) DEFAULT NULL,
  reservation varchar(50) DEFAULT NULL,
  rtfRestaurantPlanImg varchar(100) DEFAULT NULL, /*rtfRestaurantPlanImg*/
  rtfImg varchar(100) DEFAULT NULL, /*rtfRestaurantImg*/
  txtLabel varchar(10) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_CULINARY_SHIPID FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_CULINARY_CRUISESHIP FOREIGN KEY (ship_code) REFERENCES cruise_ship (txtShipNo) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 舱房品种 原名ship_cabin，数据可以通过excel导入 */
CREATE TABLE cabin_category (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  txtShipNo varchar(10) NOT NULL,/* 邮轮代码，仅供导入数据使用，查询使用相关关联表格*/
  txtCabinNo varchar(10) NOT NULL,/* 舱房品种代码 */
  txtCabinName varchar(50) NOT NULL,/* 舱房名称，比如标准内舱双人房、高级内舱双人房*/
  txtCabinType varchar(50) NOT NULL,/* 舱房大类，比如阳台房、内舱房, 仅供导入数据使用 */
  txtDecks varchar(50) DEFAULT NULL, /* 楼层 */
  txtCabinSize varchar(50) DEFAULT NULL,/* 舱房面积，原名txtCabinArea */
  numBed int DEFAULT NULL, /* 床位数量 */
  numCanCheckIn int NOT NULL, /* 可入住人数 */
  txtCabinFacility varchar(1000) DEFAULT NULL,/* 舱房设施 */
  rtfCabinImg varchar(100) DEFAULT NULL,/*舱房平面图附件的路径*/
  PRIMARY KEY (id),
  CONSTRAINT U_SHIPCABIN UNIQUE (txtCabinNo, txtShipNo),
  KEY FK_SHIPCABIN_CRUISESHIP (txtShipNo),
  CONSTRAINT FK_CABINCAT_SHIPID FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_SHIPCABIN_CRUISESHIP FOREIGN KEY (txtShipNo) REFERENCES cruise_ship (txtShipNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 舱房大类， 比如阳台房、内舱房, 数据来源cabin_category */
CREATE TABLE cabin_type (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	ship_id int NOT NULL,
	txtCabinType varchar(50) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT U_CABIN_TYPE UNIQUE (ship_id, txtCabinType),
	CONSTRAINT FK_CABIN_TYPE_SHIP FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/* excel导入cabin_category后使用以下sql从cabin_category导入数据*/
/*INSERT INTO cabin_type (ship_id, txtCabinType) SELECT s.id, c.txtCabinType FROM cruise_ship s, cabin_category c 
WHERE s.txtShipNo = c.txtShipNo AND NOT EXISTS (SELECT id FROM cabin_type t WHERE t.ship_id = s.id AND t.txtCabinType = c.txtCabinType);*/

/* cabin_category, cabin_type关联表 */
CREATE TABLE r_cabin_category_type (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	cabin_category_id bigint(20) NOT NULL,
	cabin_type_id bigint(20) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT U_R_CABIN_CAT_TYPE UNIQUE (cabin_category_id, cabin_type_id),
	CONSTRAINT FK_R_CABINCATEGORY_TYPE_CAT FOREIGN KEY (cabin_category_id) REFERENCES cabin_category (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_R_CABINCATEGORY_TYPE_TYP FOREIGN KEY (cabin_type_id) REFERENCES cabin_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/* cabin_type数据导入后使用以下sql导入数据*/
/*INSERT INTO r_cabin_category_type (cabin_category_id, cabin_type_id) SELECT c.id, t.id FROM cabin_category c, cabin_type t 
WHERE c.txtCabinType = t.txtCabinType AND NOT EXISTS (SELECT id FROM r_cabin_category_type r WHERE r.cabin_category_id = c.id AND r.cabin_type_id = c.id);*/
/* 根据舱房大类比如'内舱房'查询舱房品种 */
/*SELECT * FROM cabin_category c 
WHERE EXISTS ( SELECT r.id FROM r_cabin_category_type r, cabin_type t 
WHERE r.cabin_category_id = c.id AND r.cabin_type_id = t.id AND t.txtCabinType = '内舱房' );*/

/*舱房号清单列表*/
CREATE TABLE cabin_list (
 id bigint(20) NOT NULL AUTO_INCREMENT,
 txtShipNo VARCHAR(10) NOT NULL,
 txtCabinRoomNo VARCHAR(10) NOT NULL,
 txtCabinNo VARCHAR(10) NOT NULL,
 numDeckLevel int NOT NULL,
 txtComment VARCHAR(200),
 PRIMARY KEY (id),
 CONSTRAINT U_CABINLIST UNIQUE (txtCabinRoomNo,txtShipNo),
 KEY FK_CABINLIST_CRUISESHIP (txtShipNo),
 CONSTRAINT FK_CABINLIST_CRUISESHIP FOREIGN KEY (txtShipNo) REFERENCES cruise_ship (txtShipNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*岸上游线路*/
CREATE TABLE excursion (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  txtCompanyNo varchar(10) NOT NULL,
  txtExcursionNo varchar(10) NOT NULL,/*原名txtOutingRouteNo*/
  txtExcursionName varchar(50) NOT NULL,/*原名txtOutingRouteName*/
  txtCountry varchar(10) NOT NULL,
  txtCity varchar(10) NOT NULL,
  txtDuration varchar(50) NOT NULL,/*原名txtOutingRouteTime*/
  txtExcursionMark varchar(50) DEFAULT NULL,/*原名txtOutingRouteMark*/
  txtExcursionFeature varchar(50) NOT NULL,/*原名txtRouteFeature*/
  txtHasDinner varchar(50) NOT NULL,
  txtFitHandicapped varchar(50) DEFAULT NULL,
  txtSuitable varchar(50) DEFAULT NULL,
  numLowerMember int(11) DEFAULT NULL,
  txtExcursionDetails varchar(1000) NOT NULL DEFAULT '',/*原名txtOutingRouteJourney*/
  txtCurrency varchar(10) NOT NULL,/*原名txtMonetaryUnit*/
  numAdult int(11) DEFAULT NULL,
  numChild int(11) DEFAULT NULL,
  rtfImg varchar(100) DEFAULT NULL,/*岸上游图片附件的路径 rtfLandImg*/
  PRIMARY KEY (id),
  KEY FK_OUTINGONLAND_CRUISECOMPANY (txtCompanyNo),
  CONSTRAINT FK_OUTINGONLAND_CRUISECOMPANY FOREIGN KEY (txtCompanyNo) REFERENCES cruise_company (txtCompanyNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*创建10.签证信息表*/
CREATE TABLE visainfo (
 id INT AUTO_INCREMENT NOT NULL,
 txtCode VARCHAR(10) NOT NULL, /*签证代码*/
 txtTargetCountry VARCHAR(50) NOT NULL,/*签证国家*/
 txtPriceReference VARCHAR(50) NOT NULL,/*价格参考*/
 txtWorkflow VARCHAR(500) NOT NULL,/*办理流程*/
 rtfFormular VARCHAR(100) NOT NULL, /*相关表格附件的路径*/
 txtComment VARCHAR(500),/*其他说明*/
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*航线基本信息表 由excel导入维护*/
CREATE TABLE cruise_line_info (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  txtCruiselineNo varchar(10) NOT NULL,/*航线号码*/
  txtCruiselineName varchar(50) NOT NULL,
  txtCompanyNo varchar(10) NOT NULL DEFAULT '',
  txtCompanyName varchar(50) NOT NULL DEFAULT '',
  txtShipNo varchar(10) NOT NULL,
  txtRoutingArea varchar(10) NOT NULL,
  txtDepartureArea varchar(50) NOT NULL,
  txtDepartureCity varchar(50) NOT NULL,
  txtDeparturePort varchar(50) NOT NULL,
  txtCruiselineALLPort varchar(500) NOT NULL DEFAULT '',
  txtArrivalCity varchar(500) NOT NULL DEFAULT '',/*目的城市*/
  txtCruiselineCountry varchar(200) NOT NULL,/*途径国家*/
  txtCruiselineDays varchar(50) NOT NULL,
  txtCruiselinePeriod varchar(50) DEFAULT '',/*航线周期*/
  txtCruiselineState varchar(50) NOT NULL,/*航线状态*/
  datCruiselineBegin date NOT NULL,/*航线开始日期*/
  datCruiselineEnd date NOT NULL,/*航线结束日期*/
  txtCVruiselineProperty varchar(50) DEFAULT NULL,/*线路属性*/
  rtfCruiselineJourneyImg varchar(100) DEFAULT NULL,/*行程图附件的路径*/
  txtSailingDate mediumtext,/*出航日期*/
  PRIMARY KEY (id),
  CONSTRAINT U_CRUISELINEINFO UNIQUE (txtCruiselineNo),
  KEY FK_CRUISELINEINFO_CRUISESHIP (txtShipNo),
  CONSTRAINT FK_CRUISELINEINFO_CRUISESHIP FOREIGN KEY (txtShipNo) REFERENCES cruise_ship (txtShipNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*航线行程表*/
CREATE TABLE cruise_line_route (
 id bigint(20) NOT NULL AUTO_INCREMENT,
  txtCruiselineNo varchar(10) NOT NULL,
  txtCruiselineDayNumber int NOT NULL,
  txtCruiselinePort varchar(50) NOT NULL,
  txtArrival varchar(10) NOT NULL,
  txtSailing varchar(10) NOT NULL,
  txtJourney varchar(500) DEFAULT NULL,
  txtBreakfast varchar(10) NOT NULL,
  txtLunch varchar(10) NOT NULL,
  txtDinner varchar(10) NOT NULL,
  PRIMARY KEY (id),
  KEY FK_CRUISELINEROUTE_CRUISELINEINFO (txtCruiselineNo),
  CONSTRAINT FK_CRUISELINEROUTE_CRUISELINEINFO FOREIGN KEY (txtCruiselineNo) REFERENCES cruise_line_info (txtCruiselineNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 航次表，仅用于导入excel数据 */
CREATE TABLE voyage_import (
 id bigint(20) NOT NULL AUTO_INCREMENT,
 txtCruiselineNo VARCHAR(10),
 datDeparture Date NOT NULL, /*cruise_line_info.txtSailingDate拆分出来的一个日期*/
 PRIMARY KEY (id),
 CONSTRAINT U_VOYAGE_IMPORT UNIQUE (txtCruiselineNo, datDeparture),
  CONSTRAINT FK_VOYAGE_CRUISELINEINFO_NO FOREIGN KEY (txtCruiselineNo) REFERENCES cruise_line_info (txtCruiselineNo) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*航次基本表 根据voyage_import表格使用sql插入数据*/
CREATE TABLE voyage (
 id bigint(20) NOT NULL AUTO_INCREMENT,
 cruise_line_id bigint(20),
 datDeparture Date NOT NULL, /*从cruise_line_info.txtSailingDate拆分出来的一个日期*/
 PRIMARY KEY (id),
 CONSTRAINT U_VOYAGE UNIQUE (cruise_line_id, datDeparture),
 CONSTRAINT FK_VOYAGE_CRUISELINEINFO_ID FOREIGN KEY (cruise_line_id) REFERENCES cruise_line_info (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/* excel导入voyage_import后使用以下语句插入数据*/
/*INSERT INTO voyage (cruise_line_id, datDeparture) SELECT c.id, v.datDeparture FROM voyage_import imp, cruise_line_info c 
WHERE imp.txtCruiselineNo = c.txtCruiselineNo AND NOT EXISTS (SELECT id FROM voyage v WHERE c.id = v.cruise_line_id AND imp.datDeparture = v.datDeparture); */

/*供应商产品基本信息*/
CREATE TABLE product (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	product_number varchar(25), /*产品编号, 系统自动生成*/
	supplier_id int, /*供应商, company表id*/
	owner_id bigint(20), 	/*产品所有人，user表id*/
	type_id int, 			/*产品类别表product_type，比如单船票*/
	price_type_id int,			/*报价类别*/
	status_id int,			/*产品状态*/
	ship_id int, 			/*邮轮id*/
	start_date DATE,		/*行程开始日期，出发日期*/
	days int,				/*行程天数*/
	nights int, 			/*晚*/
	end_date DATE, 			/*行程结束日期*/
	china_started tinyint(1),/*中国出发, 0->海外出发*/
	cruise_area_id int,		/*航区*/
	title varchar(100), 		/*产品名称*/	
	contact_person varchar(50), /*产品联系人姓名，默认插入产品创建人*/
	contact_mobile_phone varchar(50),
	contact_email varchar(50),
	service_by_huiyou tinyint(1), /*1->荟邮作为服务商*/	
	customized_ship_description varchar(1000), /*供应商自己的邮轮介绍, HTML格式, 可以是单图片*/
	description varchar(1000), /*供应商对产品的描述*/
	schedule_comment varchar(1000), /*行程说明备注*/
	excursion_txt text, /*岸上游*/
	cabin_comment varchar(1000), /*舱房备注*/
	advertising varchar(2000), /*供应商自撰广告标题文字*/
	advertising_img_url varchar(200), /*广告海报图片地址*/
	currency_code varchar(10),/*货币单位, 见currency表, 通过用户界面选择插入，和currency表格没有关联*/
	bookable_until DATE, /*预订截止日期*/
	visa_application_until DATE, /*签证资料截止日期*/
	visa_comment varchar(2000), /*签证说明*/
	booking_note varchar(5000), /*预订须知*/
	cancellation_policy varchar(2000), /*取消政策*/
	payment_comment varchar(1000), /*付款说明*/
  productfeature varchar(2000), /*产品亮点*/
	comment varchar(1000), /*其他说明*/ 
  created_by bigint(20), /*产品创建人，user表id*/
	created_at DATETIME NOT NULL,/*产品创建时间，创建时使用 now()*/
	published_at DATETIME,/*产品发布时间，发布时使用 now()*/
  updated_at DATETIME, /*产品最后修改时间，手动更新使用now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*产品最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_PRODUCT_SUPPLIER FOREIGN KEY (supplier_id) REFERENCES company (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_OWNER FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_CREATEDBY FOREIGN KEY (created_by) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_SHIP FOREIGN KEY (ship_id) REFERENCES cruise_ship (id)  ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_TYPE FOREIGN KEY (type_id) REFERENCES product_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_PRICE_TYPE FOREIGN KEY (price_type_id) REFERENCES price_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_AREA FOREIGN KEY (cruise_area_id) REFERENCES cruise_area (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_STATUS FOREIGN KEY (status_id) REFERENCES product_status (id) ON DELETE NO ACTION ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*计算几晚*
/*SELECT DATEDIFF(end_date, start_date) AS days FROM product;*/

/*费用包含、不包含*/
DROP TABLE IF EXISTS included_fee_ext;
DROP TABLE IF EXISTS included_fee;
CREATE TABLE included_fee (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	product_id bigint(20) NOT NULL,
	incl_cruise_ticket tinyint(1) DEFAULT 1, /*费用包含船票, 1->包含*/
	incl_cruise_ticket_comment varchar(200), /*船票费用说明*/
	port_tax_fee decimal(10,2), /*港务费*/
	incl_port_tax tinyint(1) DEFAULT 1, /*港务费, 1->包含*/
	incl_port_tax_comment varchar(200), /*港务费说明*/
	tip decimal(10,2), /*小费*/
	incl_tip tinyint(1) DEFAULT 0, /*1->包含小费*/
	incl_tip_comment varchar(500), /*小费说明*/
	visa_fee decimal(10,2), /*签证费*/
	incl_visa_fee tinyint(1) DEFAULT 1, /*是否包含签证费, 1->包含*/
	incl_visa_comment varchar(200), /*签证费说明*/
	tourist_guide_fee decimal(10,2), /*领队派遣费*/
	incl_tourist_guide tinyint(1) DEFAULT 1, /*是否包含领队派遣费, 1->包含*/
	incl_tourist_guide_comment varchar(200), /*领队派遣费说明*/
	excursion_fee decimal(10,2), /*岸上观光费*/
	incl_excursion tinyint(1) DEFAULT 1, /*是否包含岸上观光费, 1->包含*/
	incl_excursion_comment varchar(200), /*岸上观光费说明*/
	incl_meal_on_board tinyint(1) DEFAULT 0, /*邮轮免费餐厅用餐, 1->包含, 0->不包含*/
	incl_meal_on_board_comment varchar(200), /*邮轮免费餐厅说明*/	
	incl_entertainment tinyint(1) DEFAULT 1, /*邮轮免费娱乐活动*/
	incl_entertainment_comment varchar(200), /*邮轮免费娱乐活动说明*/
	incl_passport tinyint(1) DEFAULT 0, /*护照费*/
	incl_passport_comment varchar(200), /*护照费说明*/
	incl_transfer tinyint(1) DEFAULT 0, /*出发地至港口交通费*/
	incl_transfer_comment varchar(200), /*出发地至港口交通费说明*/
	incl_single_room_fee tinyint(1) DEFAULT 0, /*邮轮单人房差价费用, 1->包含, 0->不包含*/
	incl_single_room_fee_comment varchar(200), /*邮轮单人房差价费用说明*/
	incl_self_consumption tinyint(1) DEFAULT 0, /*邮轮上私人消费费用, 1->包含, 0->不包含*/
	incl_self_consumption_comment varchar(200), /*邮轮上私人消费费用说明*/
	incl_travel_insurance tinyint(1) DEFAULT 0, /*旅游保险费用*/
	incl_travel_insurance_comment varchar(200), /*旅游保险费用说明*/
	incl_fee_not_mentioned tinyint(1) DEFAULT 0, /*未提及的其他费用*/
	incl_fee_not_mentioned_comment varchar(200), /*未提及的其他费用说明*/
	fee_comment varchar(1000), /*其他费用说明*/
	PRIMARY KEY (id),
	CONSTRAINT FK_FEE_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*费用包含、不包含延伸表, 存储用户自己增加的费用说明*/
CREATE TABLE included_fee_ext(
	id bigint(20) NOT NULL AUTO_INCREMENT,
	included_fee_id bigint(20) NOT NULL,
	comment varchar(200),
	PRIMARY KEY (id),
	CONSTRAINT FK_FEE_ID FOREIGN KEY (included_fee_id) REFERENCES included_fee (id) ON DELETE NO ACTION ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*供应商产品单元, 即针对舱房的具体价格、返利、数量*/
DROP TABLE IF EXISTS booking_passenger;
DROP TABLE IF EXISTS booking_position;
DROP TABLE IF EXISTS price_ext;
DROP TABLE IF EXISTS product_position;
CREATE TABLE product_position (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	product_id bigint(20) NOT NULL,/*产品基本信息*/
	cabin_type_id bigint(20) NOT NULL,/*舱房类型*/
	cabin_category_id bigint(20), /*舱房细分类型*/
	price_condition varchar(50), /*价格条件，比如第几人价，儿童价*/	
	price decimal(10,2),/*1、2人价*/
	retail_price decimal(10,2),/*1、2人结算价*/
	price_2 decimal(10,2),/*3、4人价*/
	retail_price_2 decimal(10,2),/*3、4人结算价*/
	price_child decimal(10,2),/*3、4人儿童价*/
	retail_price_child decimal(10,2),/*3、4人儿童结算价*/
	amount int, /*可售数量*/
	tip decimal(10,2), /*小费*/
	comment varchar(500), /*备注*/
  retail_commission decimal(10,2), /*上级分销商或介绍人(推广者)的返点金额*/
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_PRODUCT_PRICE_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_PRICE_CABIN_TYPE FOREIGN KEY (cabin_type_id) REFERENCES cabin_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_PRODUCT_PRICE_CABIN_CAT FOREIGN KEY (cabin_category_id) REFERENCES cabin_category (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* product_position的价格延伸表，使用该表存储多个其他价格信息 */
CREATE TABLE price_ext (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	product_position_id bigint(20) NOT NULL,/*产品单元id，product_position表*/
	price decimal(10,2) NOT NULL,/*价格*/
	name varchar(20), /*费用名称，比如邮轮税、服务费，见cost_type表，也可以是供应商自定义的名称*/
	description varchar(500), /* 价格详细说明 */
	including tinyint(1) NOT NULL DEFAULT 0, /*包含=1, 不包含=0*/
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_PRICE_EXT_PRODUCT_POS FOREIGN KEY (product_position_id) REFERENCES product_position (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*产品的行程*/
CREATE TABLE travel_schedule (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	product_id bigint(20) NOT NULL,/*所属产品*/
	day_number int,/*第几天*/
	location varchar(100), /*地点, 停靠港、出发城市、达到城市、自定义*/
	departure_time TIME, 	/*出发时间*/
	arrival_time TIME,		/*到达时间*/
	description varchar(1000), /*行程内容*/
	breakfast varchar(10),/*早餐*/
	lunch varchar(10),/*中餐*/
	dinner varchar(10),/*晚餐*/
	overnight_stay varchar(10), /*住宿: 邮轮、酒店、自定义*/
	PRIMARY KEY (id),
	CONSTRAINT FK_SCHEDULE_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*预设行程*/
CREATE TABLE preset_schedule(
	id bigint(20) NOT NULL AUTO_INCREMENT,
	port_city_name varchar(100) NOT NULL, 	/*对应travel_schedule表的location*/
	description varchar(1000),				/*对应travel_schedule表的description*/
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*产品相关的上传文件*/
CREATE TABLE product_files (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	product_id bigint(20) NOT NULL,/*所属产品*/
	file_name varchar(50),  /*文件名*/
	file_path varchar(100), /*文件路径*/
	PRIMARY KEY (id),
	CONSTRAINT FK_FILES_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*产品保险信息表*/
CREATE TABLE product_insurance (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,
  type varchar(10) NOT NULL,/*险种*/
  description varchar(500) NOT NULL,/*说明*/
  price decimal(10,2), /*单价*/
  PRIMARY KEY (id),
  CONSTRAINT FK_PRODUCT_INSURANCE FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*预订*/
CREATE TABLE booking (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_number varchar(15), /*预订号码, 系统自动生成*/
	owner_id bigint(20) NOT NULL, /*user表，分销商用户id*/
	product_id bigint(20) NOT NULL, /*对应的产品product*/
	status_id int, /*订单状态*/
  c_status_id int, /*直客下的订单状态*/
  c_booker_name varchar(20), /*下订单直客姓名*/
  c_booker_telephone varchar(50), /*直客电话*/
  c_booker_email varchar(50), /*直客邮箱*/
  c_shipping_address varchar(100), /*直客快递地址*/
  c_booker_comment varchar(255), /*直客备注*/
	receipt_title varchar(100), /*发票抬头*/
	shipping_address varchar(100), /*快递地址*/
	recipient varchar(20), /*快递收件人*/
	recipient_telephone varchar(50), /*收件人联系电话*/
	booker_name varchar(20),		/*预订人(分销商)*/
	booker_telephone varchar(50),	/*预订人电话*/
	booker_email varchar(50),		/*预订人邮箱*/
	booker_company varchar(100),	/*预订人公司*/
	payment_until DATE, /*支付截止日期*/
	visa_application_until DATE, /*签证资料截止日期, 默认为product表里的值*/
	rebate decimal(10,2), /*折扣金额*/
	comment_supplier varchar(255), /*供应商备注*/
	comment_buyer varchar(255), /*分销商备注*/
	comment_price_change text, /*价格更改说明*/
  insurance_amount int, /*保险数量*/
	travel_group_file varchar(100), /*出团通知附件路径*/
	service_user_id bigint(20), /*客服*/
	payment_type tinyint(1) DEFAULT 0, /*付款类型, 1->全额,2->订金*/
	deposit decimal(10,2), /*订金金额*/
	deposit_until DATE, /*订金支付截止日期*/
	pay_balance_until DATE, /*余款支付截止日期*/
	reject_reason varchar(255), /*供应商拒绝订单理由*/
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_OWNER FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_BOOKING_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_BOOKING_STATUS FOREIGN KEY (status_id) REFERENCES booking_status (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_BOOKING_STATUS_C FOREIGN KEY (c_status_id) REFERENCES booking_status (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*预订单元, 对应product_position*/
CREATE TABLE booking_position (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	product_position_id bigint(20) NOT NULL,
	amount_adult int, /*成人数量*/	
	amount_child int, /*儿童数量*/
	deal_price decimal(10,2),      /*1、2人结算价, 默认=product_position.retail_price*/
	deal_price_2 decimal(10,2),    /*3、4人结算价, 默认=product_position.retail_price_2*/
	deal_price_child decimal(10,2),/*儿童结算价, 默认=product_position.retail_price_child*/
  price decimal(10,2),        /*1、2人价, 默认=product_position.price*/
  price_2 decimal(10,2),      /*3、4人价, 默认=product_position.price_2*/
  price_child decimal(10,2),  /*儿童价, 默认=product_position.price_child*/
	roomNo bigint(20) NOT NULL,
	booking_pos_total_price decimal(10,2), /*总价*/
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_POS_BOOKING FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_BOOKING_POS_PRODUCT_POS FOREIGN KEY (product_position_id) REFERENCES product_position (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*旅客信息*/
CREATE TABLE booking_passenger (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	passengerNo bigint(20) NOT NULL,
	booking_pos_id bigint(20) NOT NULL,
	name varchar(20),/*姓名*/
	name_pinyin varchar(50), /*姓名拼音*/
	firstname varchar(50),
	lastname varchar(50),
	firstname_en varchar(50),
	lastname_en varchar(50),
	birthday date,/*出生日期*/
	pass_number varchar(20),/*护照号码*/
	pass_issue_place varchar(50),/*护照签发地*/
	pass_issue_at date,/*护照签发日期*/
	pass_valid_until date,/*护照有效日期*/
	pass_valid_period int default 10, /*护照有效期*/
	pass_file_path varchar(100), /*护照附件路径*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_PASSENGER FOREIGN KEY (booking_pos_id) REFERENCES booking_position (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS booking_status_date;
CREATE TABLE booking_status_date (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	date_wait_confirm DATETIME,/*待确认*/
	date_confirmed DATETIME,/*已确认*/
	date_wait_payment DATETIME,/*待付款*/
	date_paid DATETIME,/*已收款*/
	date_wait_group DATETIME,/*待出团*/
	date_group_finished DATETIME,/*已出团*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_STATUS_DATE FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*预订相关的上传文件*/
CREATE TABLE booking_files (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL,/*所属产品*/
	file_name varchar(50),  /*文件名*/
	file_path varchar(100), /*文件路径*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_FILE FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table payment_history (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	amount decimal(10,2), /*金额*/
	paid_at TIMESTAMP,/*支付时间，支付时使用 now()*/
	type_id int, /*支付类型*/
  comment text, /*支付内容说明*/
  file_path varchar(100),/*支付水单附件路径*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_HISTORY FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_BOOKING_HISTORY_TYPE FOREIGN KEY (type_id) REFERENCES payment_history_type (id) ON DELETE CASCADE ON UPDATE CASCADE	
);

/*预订相关的修改记录，供后台和管理员使用*/
/*CREATE TABLE booking_log (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20),
	txtLog varchar(200),
	logTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_LOG_B_ID FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;*/
/*预订临时表*/
DROP TABLE IF EXISTS booking_temp;
CREATE TABLE booking_temp (
 id bigint(20) NOT NULL AUTO_INCREMENT,
 user_id bigint(20) NOT NULL ,
 product_position_id bigint(20) NOT NULL,
 product_id bigint(20) NOT NULL,/*产品基本信息*/
 cabin_type_id bigint(20) NOT NULL,/*舱房类型*/
 cabin_category_id bigint(20), /*舱房细分类型*/
 retail_price decimal(10,2),/*1、2人结算价*/
 retail_price_2 decimal(10,2),/*3、4人结算价*/
 price_child decimal(10,2) NOT NULL,/*儿童价*/
 last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
 PRIMARY KEY (id),
 CONSTRAINT FK_BOOKINGTEMP_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*需求信息表*/
CREATE TABLE demand (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	owner_id bigint(20) NOT NULL, /*需求信息创建人*/
	description varchar(300) NOT NULL,
	status_id int,
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	published_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*发布时间，发布时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_DEMAND_OWNER FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_DEMAND_STATUS FOREIGN KEY (status_id) REFERENCES demand_status (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*供应信息表*/
CREATE TABLE supply (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	owner_id bigint(20) NOT NULL, /*供应信息创建人*/
	ship_id int,/*邮轮名称*/
	departure_date date,/*出航日期*/
	days int, /*天数*/
	cruise_route varchar(500),/*航线*/
	cabin_category_id bigint(20),/*舱房类型 txtCabinName*/
	amount int, /*数量*/
	price_old decimal(10,2),
	price_now decimal(10,2),
	description varchar(300),
	img_url varchar(200),
	status_id int,
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	published_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*发布时间，发布时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_SUPPLY_CABINCATEGORY_NAME FOREIGN KEY (cabin_category_id) REFERENCES cabin_category (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_SUPPLY_OWNER FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_SUPPLY_STATUS FOREIGN KEY (status_id) REFERENCES supply_status (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE preset_line (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	name varchar(255),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*------------------- 信息中心 -------------------*/
/*用户对话, 每个对话下面有多个对话记录(见chat_history)*/
DROP TABLE IF EXISTS chat_last_visited;
DROP TABLE IF EXISTS chat_ext;
DROP TABLE IF EXISTS chat_history;
DROP TABLE IF EXISTS chat;
CREATE TABLE chat (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	title varchar(100),/*对话标题, 比如产品名称*/
	has_new bigint(20), /*有新消息, 接收方用户id*/
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*对话记录*/
DROP TABLE IF EXISTS chat_history;
CREATE TABLE chat_history (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	chat_id bigint(20) NOT NULL,
	recipient_id bigint(20) NOT NULL,/*收信人*/
	sender_id bigint(20) NOT NULL,/*发信人*/
	message varchar(500),	/*对话内容*/
	sent_at DATETIME NOT NULL,/*发送时间*/
	received_at DATETIME,/*接收时间*/
	PRIMARY KEY (id),
	CONSTRAINT FK_CHATHISTORY FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CHAT_RECIPIENT FOREIGN KEY (recipient_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CHAT_SENDER FOREIGN KEY (sender_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*对话延伸表:对话和产品或供应或需求的匹配表*/
DROP TABLE IF EXISTS chat_ext;
CREATE TABLE chat_ext (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	chat_id bigint(20) NOT NULL,
	recipient_id bigint(20) NOT NULL,/*the recipient at creating new chat*/
	sender_id bigint(20) NOT NULL,/*the sender at creating new chat*/
	p_id bigint(20) NOT NULL,/*product.id or supply.id or demand.id, depends on type*/
	p_number varchar(25),/*product.product_number*/
	type tinyint(1) NOT NULL,/*1->product, 2->supply, 3->demand*/
	PRIMARY KEY (id),
	CONSTRAINT FK_CHATEXT_C FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CHATEXT_R FOREIGN KEY (recipient_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_CHATEXT_S FOREIGN KEY (sender_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*CREATE TABLE chat_last_visited (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	chat_id bigint(20) NOT NULL,
	user_id bigint(20) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_VISITED_CHAT_C FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_VISITED_CHAT_U FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;*/

/*系统消息*/
DROP TABLE IF EXISTS sys_msg_recipient;
DROP TABLE IF EXISTS sys_msg_received;
DROP TABLE IF EXISTS system_message;
CREATE TABLE system_message (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	title varchar(100), /*标题*/
	message varchar(500),	/*内容*/
	sent_by bigint(20), /*发消息的系统或后台用户id*/
	sent_at DATETIME NOT NULL,/*发送时间*/
  type varchar(10),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*系统消息发送的目标用户及接收的时间*/
DROP TABLE IF EXISTS sys_msg_recipient;
CREATE TABLE sys_msg_recipient (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	sys_msg_id bigint(20) NOT NULL, /*系统消息*/
	recipient_id bigint(20) NOT NULL,/*消息接收人*/
	received_at DATETIME,/*接收时间*/
	PRIMARY KEY (id),
	CONSTRAINT FK_SYS_MSG_RECIPIENT FOREIGN KEY (sys_msg_id) REFERENCES system_message (id) ON DELETE CASCADE  ON UPDATE CASCADE,
	CONSTRAINT FK_SYS_MSG_RECIPIENT_REC FOREIGN KEY (recipient_id) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*发送给所有用户的系统消息接收的记录*/
DROP TABLE IF EXISTS sys_msg_received;
CREATE TABLE sys_msg_received (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	sys_msg_id bigint(20) NOT NULL, /*系统消息*/
	received_by bigint(20) NOT NULL,/*消息接收人*/
	received_at DATETIME,/*接收时间*/
	PRIMARY KEY (id),
	CONSTRAINT FK_SYS_MSG_RECEIVED FOREIGN KEY (sys_msg_id) REFERENCES system_message (id) ON DELETE CASCADE  ON UPDATE CASCADE,
	CONSTRAINT FK_SYS_MSG_RECEIVED_REC FOREIGN KEY (received_by) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*记录用户最后一次打开某个产品的时间*/
DROP TABLE IF EXISTS log_product_user;
CREATE TABLE log_product_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,/*产品*/
  user_id bigint(20) NOT NULL,/*用户*/
  read_at DATETIME, /*打开产品的时间*/
  PRIMARY KEY (id),
  CONSTRAINT FK_LOG_PRODUCT_USER_P FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE  ON UPDATE CASCADE,
  CONSTRAINT FK_LOG_PRODUCT_USER_U FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*记录用户最后一次打开相关订单的时间*/
DROP TABLE IF EXISTS log_booking_user;
CREATE TABLE log_booking_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  booking_id bigint(20) NOT NULL,/*订单*/
  user_id bigint(20) NOT NULL,/*用户*/
  read_at DATETIME, /*打开的时间*/
  PRIMARY KEY (id),
  CONSTRAINT FK_LOG_BOOKING_USER_B FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE  ON UPDATE CASCADE,
  CONSTRAINT FK_LOG_BOOKING_USER_U FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*记录用户最后一次打开某个需求信息的时间*/
DROP TABLE IF EXISTS log_demand_user;
CREATE TABLE log_demand_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  demand_id bigint(20) NOT NULL,/*需求*/
  user_id bigint(20) NOT NULL,/*用户*/
  read_at DATETIME, /*打开的时间*/
  PRIMARY KEY (id),
  CONSTRAINT FK_LOG_DEMAND_USER_B FOREIGN KEY (demand_id) REFERENCES demand (id) ON DELETE CASCADE  ON UPDATE CASCADE,
  CONSTRAINT FK_LOG_DEMAND_USER_U FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*记录用户最后一次打开某个尾舱信息的时间*/
DROP TABLE IF EXISTS log_supply_user;
CREATE TABLE log_supply_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  supply_id bigint(20) NOT NULL,/*供应*/
  user_id bigint(20) NOT NULL,/*用户*/
  read_at DATETIME, /*打开的时间*/
  PRIMARY KEY (id),
  CONSTRAINT FK_LOG_SUPPLY_USER_B FOREIGN KEY (supply_id) REFERENCES supply (id) ON DELETE CASCADE  ON UPDATE CASCADE,
  CONSTRAINT FK_LOG_SUPPLY_USER_U FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE faq (
	id int NOT NULL AUTO_INCREMENT,
	role_id int,
	type varchar(20),
	title varchar(100),
	answer text,
	PRIMARY KEY (id),
	CONSTRAINT FK_FAQ_ROLE FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE NO CASCADE ON UPDATE NO CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS log_product_access;
CREATE TABLE log_product_access (
  id int NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,
  user_id bigint(20) NOT NULL,
  time DATETIME NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_LOG_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_LOG_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*行程地点*/
CREATE TABLE travel_location (
  id int NOT NULL AUTO_INCREMENT,  
  name varchar(100) NOT NULL,
  country varchar(100),
  range_number int DEFAULT 99999,/*用作排序的号码*/ 
  start_location tinyint(1) DEFAULT 0,/*1->出发地*/  
  PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS log_db_change;
CREATE TABLE log_db_change (
  id int NOT NULL AUTO_INCREMENT,
  user_id bigint(20) NOT NULL,
  table_name varchar(50),
  column_name varchar(50),
  old_value varchar(200),
  new_value varchar(200),
  time DATETIME NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_LOG_DB_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS product_category;
CREATE TABLE product_category(
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,
  special int DEFAULT 0, /*特色航线*/
  early_booking int DEFAULT 0,/*早订优惠*/
  cheap int DEFAULT 0,/*特惠*/
  PRIMARY KEY (id),
  CONSTRAINT FK_PRODUCT_SPECIAL_PID FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*参考产品, b2c导入产品*/
DROP TABLE IF EXISTS product_ref;
CREATE TABLE product_ref (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_number varchar(25), /*产品编号*/
  owner_id bigint(20),  /*产品所有人，user表id*/
  type_id int,      /*产品类别表product_type，比如单船票*/
  ship_id int,      /*邮轮id*/
  china_started tinyint(1),/*中国出发, 0->海外出发*/
  start_date DATE,    /*行程开始日期，出发日期*/
  days int,       /*行程天数*/
  nights int,       /*晚*/
  end_date DATE,      /*行程结束日期*/
  cruise_area_id int,   /*航区*/
  title varchar(100),     /*产品名称*/
  price1 decimal(10,2),/*内舱房起价*/
  price2 decimal(10,2),/*海景房起价*/
  price3 decimal(10,2),/*阳台房起价*/  
  price4 decimal(10,2),/*套房起价*/
  contact_person varchar(50), /*产品联系人姓名，默认插入产品创建人*/
  contact_mobile_phone varchar(50),
  contact_email varchar(50),
  description varchar(1000), /*产品描述*/
  schedule_comment varchar(1000), /*行程说明备注*/
  excursion_txt text, /*岸上游*/
  currency_code varchar(10),/*货币单位, 见currency表, 通过用户界面选择插入，和currency表格没有关联*/
  booking_note varchar(5000), /*预订须知*/
  cancellation_policy varchar(2000), /*取消政策*/
  productfeature varchar(2000), /*产品亮点*/
  comment varchar(1000), /*其他说明*/ 
  created_by bigint(20), /*产品创建人，user表id*/
  created_at DATETIME,/*产品创建时间，创建时使用 now()*/
  updated_at DATETIME, /*产品最后修改时间，手动更新使用now()*/
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*产品最后的修改时间, mysql自动更新*/
  PRIMARY KEY (id),
  CONSTRAINT FK_PRODUCT_REF_OWNER FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_PRODUCT_REF_CREATEDBY FOREIGN KEY (created_by) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_PRODUCT_REF_SHIP FOREIGN KEY (ship_id) REFERENCES cruise_ship (id)  ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_PRODUCT_REF_TYPE FOREIGN KEY (type_id) REFERENCES product_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_PRODUCT_REF_AREA FOREIGN KEY (cruise_area_id) REFERENCES cruise_area (id) ON DELETE NO ACTION ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*参考产品的行程*/
DROP TABLE IF EXISTS product_ref_schedule;
CREATE TABLE product_ref_schedule (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,/*所属产品*/
  day_number int,/*第几天*/
  location varchar(100), /*地点, 停靠港、出发城市、达到城市、自定义*/
  departure_time TIME,  /*出发时间*/
  arrival_time TIME,    /*到达时间*/
  description varchar(1000), /*行程内容*/
  breakfast varchar(10),/*早餐*/
  lunch varchar(10),/*中餐*/
  dinner varchar(10),/*晚餐*/
  overnight_stay varchar(10), /*住宿: 邮轮、酒店、自定义*/
  PRIMARY KEY (id),
  CONSTRAINT FK_SCHEDULE_PRODUCT_REF FOREIGN KEY (product_id) REFERENCES product_ref (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*参考产品价格*/
DROP TABLE IF EXISTS product_ref_position;
CREATE TABLE product_ref_position (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,/*参考产品表id*/
  cabin_type_id bigint(20) NOT NULL,/*舱房类型*/
  cabin_category_id bigint(20), /*舱房细分类型*/
  price decimal(10,2),/*1、2人价*/
  price_2 decimal(10,2),/*3、4人价*/
  price_child decimal(10,2),/*3、4人儿童价*/
  comment varchar(500), /*备注*/
  created_at DATETIME,/*创建时间，创建时使用 now()*/
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
  PRIMARY KEY (id),
  CONSTRAINT FK_PRODUCT_REF_PRICE_PRODUCT FOREIGN KEY (product_id) REFERENCES product_ref (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_PRODUCT_REF_PRICE_CABIN_TYPE FOREIGN KEY (cabin_type_id) REFERENCES cabin_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_PRODUCT_REF_PRICE_CABIN_CAT FOREIGN KEY (cabin_category_id) REFERENCES cabin_category (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* b2c booking */
/* b2c 预订 */
DROP TABLE IF EXISTS booking_b2c;
CREATE TABLE booking_b2c (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_number varchar(15), /*预订号码, 系统自动生成*/
	distributor_id bigint(20) NOT NULL, /*user表，分销商用户id*/
	product_id bigint(20) NOT NULL, /*对应的产品product*/
	status_id int, /*订单状态*/
	booker_name varchar(20),		/*预订人*/
	booker_telephone varchar(50),	/*预订人电话*/
	booker_email varchar(50),		/*预订人邮箱*/
	booker_comment varchar(255), /*预订人备注*/
  payment_until DATE, /*支付截止日期*/
	rebate decimal(10,2), /*折扣金额*/
	comment_supplier varchar(255), /*供应商备注*/
	comment_distributor varchar(255), /*分销商备注*/
	insurance_amount int, /*保险数量*/
	travel_group_file varchar(100), /*出团通知附件路径*/
	service_user_id bigint(20), /*客服*/
	payment_type tinyint(1) DEFAULT 0, /*付款类型, 1->全额,2->订金*/
	deposit decimal(10,2), /*订金金额*/
	deposit_until DATE, /*订金支付截止日期*/
	pay_balance_until DATE, /*余款支付截止日期*/
	reject_reason varchar(255), /*拒绝订单理由*/
	created_at DATETIME,/*创建时间，创建时使用 now()*/
	updated_at DATETIME,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_B2C_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE NO ACTION ON UPDATE CASCADE,
	CONSTRAINT FK_BOOKING_B2C_STATUS FOREIGN KEY (status_id) REFERENCES booking_status (id) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*预订单元, 对应product_position*/
CREATE TABLE booking_b2c_position (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  booking_b2c_id bigint(20) NOT NULL, /*预订表id*/
  product_position_id bigint(20) NOT NULL,
  amount_adult int, /*成人数量*/  
  amount_child int, /*儿童数量*/
  amount_room int NOT NULL,
  price decimal(10,2),        /*1、2人价, 默认=product_position.price*/
  price_2 decimal(10,2),      /*3、4人价, 默认=product_position.price_2*/
  price_child decimal(10,2),  /*儿童价, 默认=product_position.price_child*/
  booking_pos_total_price decimal(10,2), /*总价*/
  created_at DATETIME NOT NULL,/*创建时间，创建时使用 now()*/
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
  PRIMARY KEY (id),
  CONSTRAINT FK_BOOKING_B2C_POS_BOOKING FOREIGN KEY (booking_b2c_id) REFERENCES booking_b2c (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_BOOKING_B2C_POS_PRODUCT_POS FOREIGN KEY (product_position_id) REFERENCES product_position (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TRIGGER `BOOKING_B2C_INSERT` BEFORE INSERT ON `booking_b2c`
FOR EACH ROW BEGIN
        -- Set the creation date
    SET new.created_at = now();

        -- Set the udpate date
    Set new.updated_at = now();
END;

CREATE TRIGGER `BOOKING_B2C_UPDATE` BEFORE UPDATE ON `booking_b2c`
FOR EACH ROW BEGIN
        -- Set the udpate date
    Set new.updated_at = now();
END;