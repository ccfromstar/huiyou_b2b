/*需求信息需要发布人信息和公司信息*/
CREATE VIEW demand_user
AS
SELECT demand.*,user.company_id,user.name,company.short_name,company.logo
FROM demand
LEFT JOIN user
ON demand.owner_id=user.id
LEFT JOIN company
ON user.company_id = company.id;

DROP VIEW IF EXISTS `user_company`;
CREATE VIEW user_company
AS
SELECT a.*,b.departmentName as cdepname,b.name as cname,b.short_name as cshort_name,b.province as cprovince,b.city as ccity,b.address as caddress,b.telephone_area_code as ctelephone_area_code,b.telephone as ctelephone,b.fax as cfax,b.homepage as chomepage,b.logo as clogo,b.bank as cbank,b.account_number as caccount_number,b.account_name as caccount_name,b.role_seller as crole_seller
FROM user a
LEFT JOIN company b
ON a.company_id = b.id;

/*供应信息发布人信息和公司信息*/
CREATE VIEW supply_user
AS
SELECT supply.*,user.company_id,user.mobile_phone,user.name,company.short_name,cruise_ship.id as sid,cruise_ship.txtShipName,cabin_category.txtCabinName,company.logo,cruise_company.txtCompanyNo
FROM supply
LEFT JOIN user
ON supply.owner_id=user.id
LEFT JOIN company
ON user.company_id = company.id
LEFT JOIN cruise_ship
ON supply.ship_id = cruise_ship.id
LEFT JOIN cabin_category
ON supply.cabin_category_id = cabin_category.id
LEFT JOIN cruise_company
ON cruise_ship.txtCompanyNo = cruise_company.txtCompanyNo;

/*产品列表页*/
DROP VIEW IF EXISTS `product_list`;
CREATE VIEW product_list
AS
SELECT cruise_ship.rtfShipImg,pc.special,pc.early_booking,pc.cheap,pc.merchants,u2.name as approvename,u1.name as namewrite,travel_schedule.location as cfcity,user.name as nameowner,product_status.name as statusname,cruise_company.rtfCompanyLogo,product.*,cruise_ship.id as cid,cruise_ship.txtShipName,cruise_company.txtCompanyNo,cruise_company.txtCompanyName,company.bank,company.account_number,company.account_name,company.logo,company.short_name,cruise_area.txtCruiseArea,company.address,company.telephone,company.telephone_area_code,company.payment_transfer,company.payment_online_banking,company.payment_alipay,company.payment_cheque,company.payment_cash
FROM product
LEFT JOIN cruise_ship
ON product.ship_id=cruise_ship.id
LEFT JOIN cruise_company
ON cruise_ship.txtCompanyNo = cruise_company.txtCompanyNo
LEFT JOIN company
ON product.supplier_id = company.id
LEFT JOIN cruise_area
ON product.cruise_area_id = cruise_area.id
LEFT JOIN product_status
ON product.status_id = product_status.id
LEFT JOIN user
ON product.owner_id = user.id
LEFT JOIN user u2
ON product.approve_id = u2.id
LEFT JOIN user u1
ON product.created_by = u1.id
LEFT JOIN product_category pc
ON product.id = pc.product_id
LEFT JOIN travel_schedule
ON product.id = travel_schedule.product_id and day_number = 1;

CREATE VIEW product_cabin
AS
SELECT product_position.*,cabin_category.txtCabinNo,cabin_category.txtCabinName,cabin_category.numCanCheckIn
FROM product_position
LEFT JOIN cabin_category
ON product_position.cabin_category_id=cabin_category.id;

CREATE VIEW booking_product
AS
SELECT u1.company_id as supplier_id,u2.name as u2name,c1.short_name as sn,booking.*,product.service_by_huiyou,product.owner_id as owner_id1,booking_status.name as bname,product.product_number,product.title,company.short_name,product.contact_person,product.contact_mobile_phone
FROM booking
LEFT JOIN product
ON booking.product_id=product.id
LEFT JOIN booking_status
ON booking.status_id=booking_status.id
LEFT JOIN company
ON product.supplier_id=company.id
LEFT JOIN user u1
ON booking.owner_id=u1.id
LEFT JOIN company c1
ON u1.company_id=c1.id
LEFT JOIN user u2
ON booking.service_user_id=u2.id;


CREATE VIEW booking_temp_cabin
AS
SELECT booking_temp.*,cabin_category.txtCabinNo,cabin_category.txtCabinName,cabin_category.numCanCheckIn
FROM booking_temp
LEFT JOIN cabin_category
ON booking_temp.cabin_category_id=cabin_category.id;

DROP VIEW IF EXISTS `booking_position_proid`;
CREATE VIEW `booking_position_proid` AS 
 select `booking_position`.`id` AS `id`,
 `booking_position`.`booking_id` AS `booking_id`,
 `booking_position`.`product_position_id` AS `product_position_id`,
 `booking_position`.`amount_adult` AS `amount_adult`,
 `booking_position`.`amount_child` AS `amount_child`,
 `booking_position`.`deal_price` AS `deal_price`,
 `booking_position`.`deal_price_2` AS `deal_price_2`,
 `booking_position`.`deal_price_child` AS `deal_price_child`,
 `booking_position`.`booking_pos_total_price` AS `booking_pos_total_price`,
 `booking_position`.`created_at` AS `created_at`,
 `booking_position`.`last_updated_at` AS `last_updated_at`,
 `booking_position`.`roomNo` AS `roomNo`,
 `booking`.`product_id` AS `product_id`,
 `cabin_category`.`txtCabinName` AS `txtCabinName` from 
 (((`booking_position` left join `booking` on((`booking_position`.`booking_id` = `booking`.`id`))) 
 	left join `product_position` on((`booking_position`.`product_position_id` = `product_position`.`id`))) 
 left join `cabin_category` on((`product_position`.`cabin_category_id` = `cabin_category`.`id`)));

/*---------------------------2014-11-21--------------------------------*/
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

DROP VIEW IF EXISTS `log_product_user_company`;
CREATE VIEW log_product_user_company
AS
SELECT p.title,c.short_name,u.name,l.time
FROM log_product_access l
LEFT JOIN user u
ON l.user_id=u.id
LEFT JOIN company c
ON u.company_id = c.id
LEFT JOIN product p
ON l.product_id = p.id;

/*-----------------------2014-12-9-----------------------*/
alter table user add column approve_id bigint(20); /*审核人ID*/
alter table product add column approve_id bigint(20); /*审核人ID*/
alter table product add column productfeature mediumtext; /*产品亮点*/

/*-----------------------2014-12-29-----------------------*/
DROP TABLE IF EXISTS log_user_access;
CREATE TABLE log_user_access (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	time DATETIME NOT NULL,
	ip VARCHAR(255),
	PRIMARY KEY (id),
	CONSTRAINT FK_USER_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP VIEW IF EXISTS `log_user`;
CREATE VIEW log_user
AS
SELECT c.short_name,u.name,l.time,l.ip
FROM log_user_access l
LEFT JOIN user u
ON l.user_id=u.id
LEFT JOIN company c
ON u.company_id = c.id;

DROP TABLE IF EXISTS log_update;
CREATE TABLE log_update (
	id int NOT NULL AUTO_INCREMENT,
	time DATE NOT NULL,
	text VARCHAR(5000),
	moduleid int,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS passenger;
CREATE TABLE passenger (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	name VARCHAR(255),
	contact VARCHAR(255),
	content VARCHAR(5000),
	schedule VARCHAR(255),
	time DATETIME NOT NULL,
	type int,
	PRIMARY KEY (id),
	CONSTRAINT FK_PASSENGER_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS file;
CREATE TABLE file (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	name VARCHAR(255),
	time DATETIME NOT NULL,
	type int,
	fpath VARCHAR(255),
	PRIMARY KEY (id),
	CONSTRAINT FK_FILE_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP VIEW IF EXISTS `ship_cabin`;
CREATE VIEW ship_cabin
AS
SELECT a.*,b.txtShipName
FROM cabin_category a
LEFT JOIN cruise_ship b
ON a.ship_id = b.id;

DROP VIEW IF EXISTS `ship_company`;
CREATE VIEW ship_company
AS
SELECT a.*,b.txtCompanyName
FROM cruise_ship a
LEFT JOIN cruise_company b
ON a.company_id = b.id;

//短信发送记录
DROP TABLE IF EXISTS smsrecord;
CREATE TABLE smsrecord (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	m_telephone VARCHAR(20),
	content VARCHAR(500),
	time DATETIME NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_SMSRECORD_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

//客户信息表
DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	col0 VARCHAR(255),
	col1 VARCHAR(255),
	col2 VARCHAR(255),
	col3 VARCHAR(255),
	col4 VARCHAR(255),
	col5 VARCHAR(255),
	col6 VARCHAR(255),
	col7 VARCHAR(255),
	col8 VARCHAR(255),
	col9 VARCHAR(255),
	PRIMARY KEY (id),
	CONSTRAINT FK_CUSTOMER_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP VIEW IF EXISTS `customer_user`;
CREATE VIEW customer_user
AS
SELECT a.*,b.name
FROM customer a
LEFT JOIN user b
ON a.user_id = b.id;

//供应商，分销商联系报告
DROP TABLE IF EXISTS excelB;
CREATE TABLE excelB (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	col0 VARCHAR(255),
	col1 VARCHAR(255),
	col2 VARCHAR(255),
	col3 VARCHAR(255),
	col4 VARCHAR(255),
	col5 VARCHAR(255),
	col6 VARCHAR(255),
	col7 VARCHAR(255),
	col8 VARCHAR(255),
	col9 VARCHAR(255),
	col10 VARCHAR(255),
	col11 VARCHAR(255),
	col12 VARCHAR(255),
	col13 VARCHAR(255),
	PRIMARY KEY (id),
	CONSTRAINT FK_EXCELB_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

//客户咨询及订单记录 28列
DROP TABLE IF EXISTS excelA;
CREATE TABLE excelA (
	id int NOT NULL AUTO_INCREMENT,
	user_id bigint(20) NOT NULL,
	col0 VARCHAR(255),
	col1 VARCHAR(255),
	col2 VARCHAR(255),
	col3 VARCHAR(255),
	col4 VARCHAR(255),
	col5 VARCHAR(255),
	col6 VARCHAR(255),
	col7 VARCHAR(255),
	col8 VARCHAR(255),
	col9 VARCHAR(255),
	col10 VARCHAR(255),
	col11 VARCHAR(255),
	col12 VARCHAR(255),
	col13 VARCHAR(255),
	col14 VARCHAR(255),
	col15 VARCHAR(255),
	col16 VARCHAR(255),
	col17 VARCHAR(255),
	col18 VARCHAR(255),
	col19 VARCHAR(255),
	col20 VARCHAR(255),
	col21 VARCHAR(255),
	col22 VARCHAR(255),
	col23 VARCHAR(255),
	col24 VARCHAR(255),
	col25 VARCHAR(255),
	col26 VARCHAR(255),
	col27 VARCHAR(255),
	PRIMARY KEY (id),
	CONSTRAINT FK_EXCELA_USERID FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP VIEW IF EXISTS `excelA_user`;
CREATE VIEW excelA_user
AS
SELECT a.*,b.name
FROM excelA a
LEFT JOIN user b
ON a.user_id = b.id;

DROP VIEW IF EXISTS `excelB_user`;
CREATE VIEW excelB_user
AS
SELECT a.*,b.name
FROM excelB a
LEFT JOIN user b
ON a.user_id = b.id;

DROP VIEW IF EXISTS `log_user_company_temp`;
CREATE VIEW log_user_company_temp
AS
SELECT c.short_name,u.name,l.time,l.ip,c.role_seller,u.activated,u.certified,c.name as cname,u.id as uid
FROM log_user_access l
LEFT JOIN user u
ON l.user_id=u.id
LEFT JOIN company c
ON u.company_id = c.id;

DROP VIEW IF EXISTS `price_temp`;
CREATE VIEW price_temp
AS 
SELECT b.product_number,b.title,d.name,c.txtCabinName,p.price,p.retail_price
FROM product_position p
LEFT JOIN product b
ON p.product_id=b.id
LEFT JOIN cabin_category c
ON p.cabin_category_id=c.id
LEFT JOIN company d
ON b.supplier_id=d.id
WHERE (p.price = (p.retail_price+100) or p.price < (p.retail_price+100)) and b.start_date > "2015-03-03" and b.status_id = 3;

//需要调价的舱房
DROP VIEW IF EXISTS `adjustprice_temp`;
CREATE VIEW adjustprice_temp
AS 
SELECT b.product_number,b.title,d.name,c.txtCabinName,p.price,p.retail_price
FROM product_position p
LEFT JOIN product b
ON p.product_id=b.id
LEFT JOIN cabin_category c
ON p.cabin_category_id=c.id
LEFT JOIN company d
ON b.supplier_id=d.id
WHERE (p.price > (p.retail_price+100)) and b.start_date > "2015-03-03" and b.status_id = 3;

//调价SQL
UPDATE product_position p 
LEFT JOIN product b
ON p.product_id=b.id
LEFT JOIN cabin_category c
ON p.cabin_category_id=c.id
LEFT JOIN company d
ON b.supplier_id=d.id
SET p.retail_price = p.retail_price+100
WHERE (p.price > (p.retail_price+100)) and b.start_date > "2015-03-03" and b.status_id = 3;

DROP TABLE IF EXISTS email_weixin;
CREATE TABLE email_weixin (
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(50),
	tel VARCHAR(50),
	email VARCHAR(50),
	product VARCHAR(50),
	toName VARCHAR(50),
	PRIMARY KEY (id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

//招行订单记录表
DROP TABLE IF EXISTS CMB;
CREATE TABLE CMB (
	id int NOT NULL AUTO_INCREMENT,
	BillNo VARCHAR(10),
	Amount VARCHAR(10),
	DatePay VARCHAR(8),
	remark VARCHAR(255),
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


